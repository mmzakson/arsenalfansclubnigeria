import type { Metadata } from "next";
import { fmtMonthYear } from "@/lib/card";
import { getPaidMemberByNumber } from "@/lib/members";

export const metadata: Metadata = { title: "Verify Membership", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** Public page behind the QR code on the card. Deliberately shows very little personal data. */
export default async function VerifyPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const membershipNumber = decodeURIComponent(number).toUpperCase();
  const member = /^[A-Z]+-\d{4}-\d{5,}$/.test(membershipNumber) ? await getPaidMemberByNumber(membershipNumber) : null;
  const expired = member?.validThru ? new Date(member.validThru) < new Date() : false;

  return (
    <main className="w-full pt-20 bg-surface flex-1 flex items-center justify-center px-margin py-space-xl">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden text-center">
        <div className={`h-1.5 ${member && !expired ? "bg-emerald-600" : "bg-primary"}`} />
        <div className="p-space-xl">
          {member ? (
            <>
              <span className={`material-symbols-outlined text-[44px] ${expired ? "text-primary" : "text-emerald-600"}`}>
                {expired ? "event_busy" : "verified"}
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface mt-space-sm">
                {expired ? "Membership expired" : "Valid membership"}
              </h1>
              <p className="font-headline-sm text-headline-sm text-on-surface mt-space-md">
                {member.firstName} {member.lastName[0]}.
              </p>
              <p className="font-mono text-body-sm text-primary mt-1">{membershipNumber}</p>
              <p className="font-body-sm text-body-sm text-secondary mt-space-sm">
                {member.state} Chapter · Valid thru {fmtMonthYear(member.validThru!)}
              </p>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[44px] text-primary">gpp_bad</span>
              <h1 className="font-headline-md text-headline-md text-on-surface mt-space-sm">Not found</h1>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xs">
                We couldn&apos;t find an active membership with that number.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
