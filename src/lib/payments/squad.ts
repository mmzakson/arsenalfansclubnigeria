import { gatewayFetch } from "./http";
import { hmacSha512Hex, safeEqualHex } from "./signature";
import {
  GatewayError,
  type InitializeInput,
  type InitializeResult,
  type PaymentGateway,
  type VerifyResult,
  type WebhookEvent,
} from "./types";

/**
 * Squad (GTCO) hosted checkout. Docs: https://docs.squadco.com
 *  - POST {base}/transaction/initiate       -> data.checkout_url
 *  - GET  {base}/transaction/verify/{ref}   -> data.transaction_status
 *  - Webhook header x-squad-encrypted-body = uppercase HMAC-SHA512(secretKey, body)
 * Amounts are in kobo. Sandbox keys start with "sandbox_sk_".
 */
export class SquadGateway implements PaymentGateway {
  readonly id = "squad" as const;
  readonly label = "Squad";

  private get secret(): string {
    return process.env.SQUAD_SECRET_KEY ?? "";
  }

  private get baseUrl(): string {
    if (process.env.SQUAD_BASE_URL) return process.env.SQUAD_BASE_URL.replace(/\/+$/, "");
    return this.secret.startsWith("sandbox_") ? "https://sandbox-api-d.squadco.com" : "https://api-d.squadco.com";
  }

  private get headers() {
    return { Authorization: `Bearer ${this.secret}`, "Content-Type": "application/json" };
  }

  isConfigured(): boolean {
    return this.secret.length > 0;
  }

  async initialize(input: InitializeInput): Promise<InitializeResult> {
    const { body } = await gatewayFetch(this.id, `${this.baseUrl}/transaction/initiate`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        amount: input.amountKobo,
        email: input.email,
        currency: input.currency,
        initiate_type: "inline",
        transaction_ref: input.reference,
        callback_url: input.callbackUrl,
        customer_name: input.customerName,
        metadata: input.metadata,
      }),
    });
    const url: string | undefined = body?.data?.checkout_url;
    if (!url) throw new GatewayError(this.id, `no checkout_url in response: ${JSON.stringify(body).slice(0, 200)}`);
    return { checkoutUrl: url };
  }

  async verify(reference: string): Promise<VerifyResult> {
    // 400 = unknown reference (customer never reached the checkout) -> treat as still pending.
    const { status, body } = await gatewayFetch(
      this.id,
      `${this.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: this.headers, allowStatuses: [400, 404] },
    );
    if (status !== 200 || !body?.data) return { status: "pending" };
    const d = body.data;
    const s = String(d.transaction_status ?? "").toLowerCase();
    return {
      status: s === "success" ? "success" : s === "failed" || s === "abandoned" ? "failed" : "pending",
      amountKobo: typeof d.transaction_amount === "number" ? d.transaction_amount : undefined,
      currency: d.transaction_currency_id ?? d.currency,
    };
  }

  parseWebhook(rawBody: string, headers: Headers): WebhookEvent | null {
    if (!this.isConfigured()) return null;
    const sig = headers.get("x-squad-encrypted-body");
    // Squad's samples hash JSON.stringify(body); accept either the exact bytes or the re-serialised form.
    const candidates = [rawBody];
    try {
      candidates.push(JSON.stringify(JSON.parse(rawBody)));
    } catch {
      return null;
    }
    if (!candidates.some((c) => safeEqualHex(sig, hmacSha512Hex(this.secret, c)))) return null;

    const evt = JSON.parse(rawBody);
    if (evt?.Event !== "charge_successful") return null;
    const reference = evt.TransactionRef ?? evt.Body?.transaction_ref;
    return typeof reference === "string" && reference ? { reference } : null;
  }
}
