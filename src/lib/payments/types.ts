export type GatewayId = "squad" | "paystack";

export interface InitializeInput {
  /** Unique per attempt. Alphanumeric only so every gateway accepts it. */
  reference: string;
  email: string;
  customerName: string;
  /** Smallest currency unit (kobo). */
  amountKobo: number;
  currency: "NGN";
  /** Where the gateway sends the customer after paying. */
  callbackUrl: string;
  metadata?: Record<string, string>;
}

export interface InitializeResult {
  checkoutUrl: string;
}

export type VerifyStatus = "success" | "failed" | "pending";

export interface VerifyResult {
  status: VerifyStatus;
  amountKobo?: number;
  currency?: string;
}

export interface WebhookEvent {
  /** Our transaction reference. */
  reference: string;
}

/**
 * Every payment provider implements this. The rest of the app only talks to this interface,
 * so adding or swapping a provider is one new file plus one line in registry.ts.
 */
export interface PaymentGateway {
  readonly id: GatewayId;
  readonly label: string;
  isConfigured(): boolean;
  initialize(input: InitializeInput): Promise<InitializeResult>;
  /** Server-to-server status check. This is the source of truth, never the redirect or webhook body. */
  verify(reference: string): Promise<VerifyResult>;
  /** Returns the event if the signature is valid and it is a successful-charge event, otherwise null. */
  parseWebhook(rawBody: string, headers: Headers): WebhookEvent | null;
}

export class GatewayError extends Error {
  constructor(
    public readonly gateway: GatewayId,
    message: string,
  ) {
    super(`[${gateway}] ${message}`);
  }
}

export class PaymentUnavailableError extends Error {
  constructor() {
    super("No payment gateway is currently available");
  }
}
