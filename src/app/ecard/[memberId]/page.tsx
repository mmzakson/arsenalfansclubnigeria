import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ECardView from "@/components/ecard/ECardView";
import { isValidCardKey } from "@/lib/card";
import { buildCardData } from "@/lib/cardData";
import { getMember, getPhoto } from "@/lib/members";

export const metadata: Metadata = { title: "Your Membership E-ID Card", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ECardPage({
  params,
  searchParams,
}: {
  params: Promise<{ memberId: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const [{ memberId }, { k }] = await Promise.all([params, searchParams]);

  // Both checks must pass: a valid access key AND a paid membership. Anything else looks like "not found".
  if (!isValidCardKey(memberId, k)) notFound();
  const member = await getMember(memberId);
  if (!member || member.status !== "paid") notFound();

  const photo = await getPhoto(memberId);

  return (
    <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 bg-[#F4F6F9]">
      <div className="max-w-5xl mx-auto">
        <ECardView card={buildCardData(member, photo)} firstName={member.firstName} />
      </div>
    </main>
  );
}
