import type { Metadata } from "next";
import PaymentStatus from "@/components/PaymentStatus";

export const metadata: Metadata = { title: "Confirming your payment", robots: { index: false } };

export default async function CallbackPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  return (
    <main className="w-full pt-20 bg-surface flex-1 flex items-center justify-center px-margin py-space-xl">
      <PaymentStatus reference={reference} />
    </main>
  );
}
