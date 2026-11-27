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
 * Paystack, included as the standby gateway. Docs: https://paystack.com/docs/api
 *  - POST /transaction/initialize          -> data.authorization_url
 *  - GET  /transaction/verify/:reference   -> data.status
 *  - Webhook header x-paystack-signature = HMAC-SHA512(secretKey, rawBody)
 * NOT yet exercised against a real account: test it in sandbox before relying on it.
 */
export class PaystackGateway implements PaymentGateway {
  readonly id = "paystack" as const;
  readonly label = "Paystack";
  private readonly baseUrl = "https://api.paystack.co";

  private get secret(): string {
    return process.env.PAYSTACK_SECRET_KEY ?? "";
  }

  private get headers() {
    return { Authorization: `Bearer ${this.secret}`, "Content-Type": "application/json" };
  }

  isConfigured(): boolean {
    return this.secret.length > 0;
  }

  async initialize(input: InitializeInput): Promise<InitializeResult> {
    const { body } = await gatewayFetch(this.id, `${this.baseUrl}/transaction/initialize`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: input.email,
        amount: input.amountKobo,
        currency: input.currency,
        reference: input.reference,
        callback_url: input.callbackUrl,
        metadata: { customer_name: input.customerName, ...input.metadata },
      }),
    });
    const url: string | undefined = body?.data?.authorization_url;
    if (!url) throw new GatewayError(this.id, `no authorization_url in response: ${JSON.stringify(body).slice(0, 200)}`);
    return { checkoutUrl: url };
  }

  async verify(reference: string): Promise<VerifyResult> {
    const { status, body } = await gatewayFetch(
      this.id,
      `${this.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: this.headers, allowStatuses: [400, 404] },
    );
    if (status !== 200 || !body?.data) return { status: "pending" };
    const s = String(body.data.status ?? "").toLowerCase();
    return {
      status: s === "success" ? "success" : s === "failed" || s === "abandoned" || s === "reversed" ? "failed" : "pending",
      amountKobo: body.data.amount,
      currency: body.data.currency,
    };
  }

  parseWebhook(rawBody: string, headers: Headers): WebhookEvent | null {
    if (!this.isConfigured()) return null;
    if (!safeEqualHex(headers.get("x-paystack-signature"), hmacSha512Hex(this.secret, rawBody))) return null;
    try {
      const evt = JSON.parse(rawBody);
      const reference = evt?.data?.reference;
      return evt?.event === "charge.success" && typeof reference === "string" ? { reference } : null;
    } catch {
      return null;
    }
  }
}
