import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness probe for the hosting platform. Deliberately has no database or gateway dependency. */
export function GET() {
  return NextResponse.json({ ok: true });
}
