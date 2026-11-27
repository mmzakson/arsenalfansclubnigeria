import "server-only";
import { getDb } from "@/lib/firebase/admin";
import { cardAccessKey, formatMembershipNumber, validThru } from "./card";
import { getMember, getPayment, updatePayment, type MemberDoc } from "./members";
import { getGateway } from "./payments/registry";

export type SettleResult =
  | { status: "success"; ecardPath: string }
  | { status: "pending" }
  | { status: "failed"; reason?: string }
  | { status: "not_found" };

const ecardPath = (memberId: string) => `/ecard/${memberId}?k=${cardAccessKey(memberId)}`;

/**
 * The one place a payment turns into a paid membership. Called from BOTH the browser callback and the
 * gateway webhook, so it is idempotent: whichever arrives first does the work, the other just reads the result.
 * It never trusts the redirect or webhook body: it asks the gateway directly, then checks amount and currency.
 */
export async function settlePayment(reference: string): Promise<SettleResult> {
  const payment = await getPayment(reference);
  if (!payment) return { status: "not_found" };

  if (payment.status === "success") return { status: "success", ecardPath: ecardPath(payment.memberId) };
  if (payment.status === "init_failed") return { status: "failed", reason: "gateway_unavailable" };

  const gateway = getGateway(payment.gateway);
  if (!gateway) return { status: "failed", reason: "unknown_gateway" };

  const v = await gateway.verify(reference); // throws on network error -> caller returns 5xx, safe to retry
  if (v.status === "pending") return { status: "pending" };
  if (v.status === "failed") {
    await updatePayment(reference, { status: "failed" });
    return { status: "failed", reason: "payment_failed" };
  }

  if (v.amountKobo !== payment.amountKobo || (v.currency && v.currency.toUpperCase() !== payment.currency)) {
    const note = `expected ${payment.amountKobo} ${payment.currency}, gateway reported ${v.amountKobo} ${v.currency}`;
    console.error(`[settle] amount mismatch for ${reference}: ${note}`);
    await updatePayment(reference, { status: "mismatch", note });
    return { status: "failed", reason: "amount_mismatch" };
  }

  const db = getDb();
  const memberRef = db.collection("members").doc(payment.memberId);
  const paymentRef = db.collection("payments").doc(reference);
  const counterRef = db.collection("counters").doc("membership");

  await db.runTransaction(async (tx) => {
    const [memberSnap, paySnap] = await Promise.all([tx.get(memberRef), tx.get(paymentRef)]);
    if (!memberSnap.exists) throw new Error(`member ${payment.memberId} missing for payment ${reference}`);
    if (paySnap.data()?.status === "success") return; // the other path already did it

    const member = memberSnap.data() as MemberDoc;
    const at = new Date();
    if (member.status === "paid") {
      // A second successful payment for an already-active member (e.g. two tabs). Record it, don't issue another ID.
      tx.update(paymentRef, { status: "success", note: "duplicate payment, member already active", updatedAt: at.toISOString() });
      return;
    }
    const counterSnap = await tx.get(counterRef);
    const next = ((counterSnap.data()?.value as number | undefined) ?? 0) + 1;
    tx.set(counterRef, { value: next });
    tx.update(memberRef, {
      status: "paid",
      membershipNumber: formatMembershipNumber(next, at),
      paidAt: at.toISOString(),
      validThru: validThru(at).toISOString(),
      paymentReference: reference,
      updatedAt: at.toISOString(),
    });
    tx.update(paymentRef, { status: "success", updatedAt: at.toISOString() });
  });

  const member = await getMember(payment.memberId);
  if (member?.status !== "paid") return { status: "failed", reason: "finalise_failed" };
  return { status: "success", ecardPath: ecardPath(payment.memberId) };
}
