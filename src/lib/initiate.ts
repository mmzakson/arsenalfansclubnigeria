import "server-only";
import { registrationFeeKobo } from "./config";
import { createPayment, newReference, updatePayment } from "./members";
import { getGatewayOrder, markGatewayDown, markGatewayUp } from "./payments/registry";
import { PaymentUnavailableError } from "./payments/types";

/**
 * Starts a payment, automatically falling back to the next configured gateway if the first one is
 * down. Each attempt gets its own reference and is recorded BEFORE the network call, so a webhook that
 * arrives early can always find its payment.
 */
export async function initiatePayment(args: {
  memberId: string;
  email: string;
  customerName: string;
  origin: string;
}): Promise<{ checkoutUrl: string; gateway: string; reference: string }> {
  const amountKobo = registrationFeeKobo();
  const gateways = await getGatewayOrder();

  for (const gateway of gateways) {
    const reference = newReference();
    await createPayment(reference, { memberId: args.memberId, gateway: gateway.id, amountKobo, currency: "NGN" });
    try {
      const { checkoutUrl } = await gateway.initialize({
        reference,
        email: args.email,
        customerName: args.customerName,
        amountKobo,
        currency: "NGN",
        callbackUrl: `${args.origin}/payment/callback/${reference}`,
        metadata: { member_id: args.memberId },
      });
      markGatewayUp(gateway.id);
      return { checkoutUrl, gateway: gateway.id, reference };
    } catch (e) {
      console.error(`[payments] ${gateway.id} failed to initialise, trying next gateway:`, (e as Error).message);
      markGatewayDown(gateway.id);
      await updatePayment(reference, { status: "init_failed", note: (e as Error).message.slice(0, 300) }).catch(() => {});
    }
  }
  throw new PaymentUnavailableError();
}
