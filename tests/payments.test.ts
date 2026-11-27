import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { beforeEach, describe, it } from "node:test";

process.env.SQUAD_SECRET_KEY = "sandbox_sk_testkey";
process.env.PAYSTACK_SECRET_KEY = "sk_test_paystack";
process.env.CARD_SIGNING_SECRET = "unit-test-signing-secret-123456";
process.env.REGISTRATION_FEE_NGN = "5000";
process.env.APP_URL = "https://example.test";
process.env.PAYMENT_GATEWAYS = "squad,paystack";

import { __setDbForTests } from "../src/lib/firebase/admin";
import { FakeFirestore } from "./fakeFirestore";
import { initiatePayment } from "../src/lib/initiate";
import { getPhoto, upsertPendingMember } from "../src/lib/members";
import { _resetRegistryForTests } from "../src/lib/payments/registry";
import { SquadGateway } from "../src/lib/payments/squad";
import { PaystackGateway } from "../src/lib/payments/paystack";
import { PaymentUnavailableError } from "../src/lib/payments/types";
import { isValidCardKey, cardAccessKey } from "../src/lib/card";
import { settlePayment } from "../src/lib/settle";
import { registrationSchema } from "../src/lib/validation";

type Handler = (url: string, init?: RequestInit) => { status?: number; body: unknown } | Error;
let handler: Handler;
const calls: string[] = [];

globalThis.fetch = (async (url: any, init?: RequestInit) => {
  calls.push(`${init?.method ?? "GET"} ${url}`);
  const r = handler(String(url), init);
  if (r instanceof Error) throw r;
  return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
}) as typeof fetch;

const TINY_JPEG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2Q==";

const validForm = {
  photo: TINY_JPEG,
  first_name: "Toyin", last_name: "Ibitoye", email: "Toyin@Example.com ", phone: "+234 800 000 0000",
  dob: "1990-05-01", gender: "female", address_1: "1 Main St", city: "Abuja", state: "FCT", country: "NG",
  referral_source: "instagram", agree_disclaimer: true, agree_privacy: true, agree_terms: true,
};

let db: FakeFirestore;
beforeEach(() => {
  db = new FakeFirestore();
  __setDbForTests(db);
  _resetRegistryForTests();
  calls.length = 0;
});

describe("validation", () => {
  it("normalises email and rejects missing consent / honeypot", () => {
    const ok = registrationSchema.safeParse(validForm);
    assert.ok(ok.success);
    assert.equal(ok.data.email, "toyin@example.com");
    assert.equal(registrationSchema.safeParse({ ...validForm, agree_terms: false }).success, false);
    assert.equal(registrationSchema.safeParse({ ...validForm, website: "http://spam" }).success, false);
    assert.equal(registrationSchema.safeParse({ ...validForm, dob: "2999-01-01" }).success, false);
  });

  it("requires a real, reasonably small JPEG photo", () => {
    const bad = (photo: unknown) => registrationSchema.safeParse({ ...validForm, photo }).success;
    assert.equal(bad(undefined), false);
    assert.equal(bad(""), false);
    assert.equal(bad("data:image/png;base64,iVBORw0KGgo="), false); // wrong type
    assert.equal(bad("data:image/jpeg;base64," + Buffer.from("<script>alert(1)</script>").toString("base64")), false); // not a JPEG
    assert.equal(bad("data:image/jpeg;base64,/9j/" + "A".repeat(200_000)), false); // too big
    assert.equal(bad("https://evil.example/x.jpg"), false);
    assert.equal(bad(TINY_JPEG), true);
  });

  it("stores the photo separately and re-uses it on retry", async () => {
    const id = await upsertPendingMember(registrationSchema.parse(validForm));
    assert.equal(await getPhoto(id), TINY_JPEG);
    assert.equal(db.data.get("members")!.get(id)!.photo, undefined); // not embedded in the member doc
    const newer = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2Q==AAAA".replace("==AAAA", "==");
    const id2 = await upsertPendingMember(registrationSchema.parse({ ...validForm, photo: newer }));
    assert.equal(id2, id);
  });
});

describe("squad adapter", () => {
  const squad = new SquadGateway();
  const body = JSON.stringify({ Event: "charge_successful", TransactionRef: "AFCABC123", Body: { amount: 500000 } });
  const sign = (s: string) => createHmac("sha512", "sandbox_sk_testkey").update(s).digest("hex").toUpperCase();

  it("accepts a correctly signed webhook and rejects tampering", () => {
    assert.deepEqual(squad.parseWebhook(body, new Headers({ "x-squad-encrypted-body": sign(body) })), { reference: "AFCABC123" });
    const tampered = body.replace("AFCABC123", "AFCOTHER99"); // same signature, different reference
    assert.equal(squad.parseWebhook(tampered, new Headers({ "x-squad-encrypted-body": sign(body) })), null);
    assert.equal(squad.parseWebhook(body, new Headers()), null);
    assert.equal(squad.parseWebhook(body, new Headers({ "x-squad-encrypted-body": "DEADBEEF" })), null);
  });

  it("accepts a signature computed over the re-serialised JSON", () => {
    const spaced = JSON.stringify(JSON.parse(body), null, 2);
    assert.deepEqual(squad.parseWebhook(spaced, new Headers({ "x-squad-encrypted-body": sign(body) })), { reference: "AFCABC123" });
  });

  it("initialises against the sandbox host with a Bearer key and kobo amount", async () => {
    let seen: any;
    handler = (url, init) => {
      seen = { url, init, body: JSON.parse(String(init?.body)) };
      return { body: { status: 200, data: { checkout_url: "https://sandbox-pay.squadco.com/X" } } };
    };
    const r = await squad.initialize({ reference: "AFC1", email: "a@b.co", customerName: "A B", amountKobo: 500000, currency: "NGN", callbackUrl: "https://x/cb" });
    assert.equal(r.checkoutUrl, "https://sandbox-pay.squadco.com/X");
    assert.equal(seen.url, "https://sandbox-api-d.squadco.com/transaction/initiate");
    assert.equal((seen.init.headers as any).Authorization, "Bearer sandbox_sk_testkey");
    assert.equal(seen.body.amount, 500000);
    assert.equal(seen.body.transaction_ref, "AFC1");
  });

  it("maps verify statuses, and an unknown reference (400) to pending", async () => {
    handler = () => ({ body: { data: { transaction_status: "Success", transaction_amount: 500000, transaction_currency_id: "NGN" } } });
    assert.deepEqual(await squad.verify("R"), { status: "success", amountKobo: 500000, currency: "NGN" });
    handler = () => ({ body: { data: { transaction_status: "Abandoned" } } });
    assert.equal((await squad.verify("R")).status, "failed");
    handler = () => ({ status: 400, body: { success: false, message: "Invalid transaction reference", data: {} } });
    assert.equal((await squad.verify("R")).status, "pending");
  });
});

describe("paystack adapter", () => {
  it("validates lowercase hex webhook signatures", () => {
    const p = new PaystackGateway();
    const body = JSON.stringify({ event: "charge.success", data: { reference: "AFCZ9" } });
    const sig = createHmac("sha512", "sk_test_paystack").update(body).digest("hex");
    assert.deepEqual(p.parseWebhook(body, new Headers({ "x-paystack-signature": sig })), { reference: "AFCZ9" });
    assert.equal(p.parseWebhook(body, new Headers({ "x-paystack-signature": "00" })), null);
  });
});

describe("gateway failover", () => {
  const squadOk = { body: { data: { checkout_url: "https://squad/pay" } } };
  const paystackOk = { body: { status: true, data: { authorization_url: "https://paystack/pay" } } };

  async function member() {
    return upsertPendingMember(registrationSchema.parse(validForm));
  }

  it("uses the first gateway when it is healthy", async () => {
    handler = (url) => (url.includes("squadco") ? squadOk : new Error("should not be called"));
    const r = await initiatePayment({ memberId: await member(), email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    assert.equal(r.gateway, "squad");
    assert.ok(r.reference.startsWith("AFC"));
  });

  it("falls over to Paystack when Squad is down, and records both attempts", async () => {
    handler = (url) => (url.includes("squadco") ? { status: 503, body: { message: "down" } } : paystackOk);
    const r = await initiatePayment({ memberId: await member(), email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    assert.equal(r.gateway, "paystack");
    assert.equal(r.checkoutUrl, "https://paystack/pay");
    const pays = [...db.data.get("payments")!.values()];
    assert.deepEqual(pays.map((p) => `${p.gateway}:${p.status}`).sort(), ["paystack:initiated", "squad:init_failed"]);
  });

  it("then skips the tripped gateway on the next request (circuit breaker)", async () => {
    handler = (url) => (url.includes("squadco") ? new Error("ECONNRESET") : paystackOk);
    const m = await member();
    await initiatePayment({ memberId: m, email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    calls.length = 0;
    await initiatePayment({ memberId: m, email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    assert.ok(calls.every((c) => c.includes("paystack")), `unexpected calls: ${calls}`);
  });

  it("throws PaymentUnavailableError when every gateway fails", async () => {
    handler = () => new Error("offline");
    await assert.rejects(
      async () => initiatePayment({ memberId: await member(), email: "t@e.co", customerName: "T I", origin: "https://example.test" }),
      PaymentUnavailableError,
    );
  });

  it("can be re-ordered live from Firestore settings/payments", async () => {
    await db.collection("settings").doc("payments").set({ order: ["paystack", "squad"] });
    handler = (url) => (url.includes("paystack") ? paystackOk : new Error("squad should not be called first"));
    const r = await initiatePayment({ memberId: await member(), email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    assert.equal(r.gateway, "paystack");
  });
});

describe("settlePayment", () => {
  async function started() {
    handler = () => ({ body: { data: { checkout_url: "https://squad/pay" } } });
    const memberId = await upsertPendingMember(registrationSchema.parse(validForm));
    const r = await initiatePayment({ memberId, email: "t@e.co", customerName: "T I", origin: "https://example.test" });
    return { memberId, reference: r.reference };
  }
  const verifyOk = (amount = 500000) => () => ({ body: { data: { transaction_status: "success", transaction_amount: amount, transaction_currency_id: "NGN" } } });

  it("stays pending until the gateway confirms, and grants nothing", async () => {
    const { reference, memberId } = await started();
    handler = () => ({ body: { data: { transaction_status: "pending" } } });
    assert.deepEqual(await settlePayment(reference), { status: "pending" });
    assert.equal(db.data.get("members")!.get(memberId)!.status, "pending_payment");
  });

  it("issues a membership number once, is idempotent, and returns a valid card link", async () => {
    const { reference, memberId } = await started();
    handler = verifyOk();
    const a = await settlePayment(reference);
    const b = await settlePayment(reference);
    assert.equal(a.status, "success");
    assert.deepEqual(a, b);
    const m = db.data.get("members")!.get(memberId)!;
    assert.equal(m.status, "paid");
    assert.match(m.membershipNumber, /^AFCN-\d{4}-00001$/);
    assert.equal(db.data.get("counters")!.get("membership")!.value, 1);
    const url = new URL("https://x" + (a as any).ecardPath);
    assert.equal(url.pathname, `/ecard/${memberId}`);
    assert.ok(isValidCardKey(memberId, url.searchParams.get("k")!));
    assert.equal(isValidCardKey(memberId, "forged"), false);
    assert.equal(isValidCardKey("other-member", cardAccessKey(memberId)), false);
  });

  it("numbers members sequentially", async () => {
    const one = await started();
    handler = verifyOk();
    await settlePayment(one.reference);
    db.data.get("members")!.get(one.memberId)!.email = "first@example.com";
    const two = await started();
    handler = verifyOk();
    await settlePayment(two.reference);
    assert.match(db.data.get("members")!.get(two.memberId)!.membershipNumber, /-00002$/);
  });

  it("rejects an underpayment (amount mismatch) and does not activate the member", async () => {
    const { reference, memberId } = await started();
    handler = verifyOk(50000);
    const r = await settlePayment(reference);
    assert.deepEqual(r, { status: "failed", reason: "amount_mismatch" });
    assert.equal(db.data.get("members")!.get(memberId)!.status, "pending_payment");
    assert.equal(db.data.get("payments")!.get(reference)!.status, "mismatch");
  });

  it("marks failed payments as failed", async () => {
    const { reference } = await started();
    handler = () => ({ body: { data: { transaction_status: "failed" } } });
    assert.equal((await settlePayment(reference)).status, "failed");
  });

  it("returns not_found for an unknown reference", async () => {
    assert.deepEqual(await settlePayment("AFCNOPE"), { status: "not_found" });
  });
});
