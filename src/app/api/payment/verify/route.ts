import { NextResponse } from "next/server";
import { settlePayment } from "@/lib/settle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Called by the /payment/callback page after the customer returns from the gateway. */
export async function POST(req: Request) {
  const { reference } = (await req.json().catch(() => ({}))) as { reference?: unknown };
  if (typeof reference !== "string" || !/^[A-Za-z0-9]{8,64}$/.test(reference)) {
    return NextResponse.json({ status: "not_found" }, { status: 400 });
  }
  try {
    return NextResponse.json(await settlePayment(reference));
  } catch (e) {
    console.error("[verify] failed", reference, e);
    // The gateway or database hiccuped; the page keeps polling, and the webhook can still finish the job.
    return NextResponse.json({ status: "pending" }, { status: 502 });
  }
}
