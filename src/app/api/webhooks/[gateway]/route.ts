import { NextResponse } from "next/server";
import { getGateway } from "@/lib/payments/registry";
import { settlePayment } from "@/lib/settle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Point each gateway's dashboard at its own URL:
 *   Squad    -> https://YOUR-DOMAIN/api/webhooks/squad
 *   Paystack -> https://YOUR-DOMAIN/api/webhooks/paystack
 * This is what grants the e-card if the customer pays but closes the tab before returning to the site.
 */
export async function POST(req: Request, ctx: { params: Promise<{ gateway: string }> }) {
  const { gateway: id } = await ctx.params;
  const gateway = getGateway(id);
  if (!gateway) return NextResponse.json({ error: "unknown gateway" }, { status: 404 });

  const raw = await req.text(); // signature is computed over the exact bytes, so read it as text
  const event = gateway.parseWebhook(raw, req.headers);
  if (!event) return NextResponse.json({ error: "invalid signature or event" }, { status: 401 });

  try {
    // Don't trust the payload: settlePayment re-verifies with the gateway before granting anything.
    await settlePayment(event.reference);
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[webhook] settle failed", id, event.reference, e);
    return NextResponse.json({ error: "temporary failure" }, { status: 500 }); // gateway will retry
  }
}
