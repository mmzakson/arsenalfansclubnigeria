import { NextResponse } from "next/server";
import { z } from "zod";
import { appUrl } from "@/lib/config";
import { initiatePayment } from "@/lib/initiate";
import { findPaidMemberByEmail, upsertPendingMember } from "@/lib/members";
import { PaymentUnavailableError } from "@/lib/payments/types";
import { registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }
  const input = parsed.data;

  try {
    if (await findPaidMemberByEmail(input.email)) {
      return NextResponse.json(
        { error: "A membership already exists for this email address. Please contact the membership desk if you need help." },
        { status: 409 },
      );
    }

    const memberId = await upsertPendingMember(input);
    const { checkoutUrl } = await initiatePayment({
      memberId,
      email: input.email,
      customerName: `${input.first_name} ${input.last_name}`,
      origin: appUrl(new URL(req.url).origin),
    });
    return NextResponse.json({ checkoutUrl });
  } catch (e) {
    if (e instanceof PaymentUnavailableError) {
      return NextResponse.json(
        { error: "Our payment service is temporarily unavailable. Your details are saved. Please try again in a few minutes." },
        { status: 503 },
      );
    }
    console.error("[register] failed", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
