import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";
import { club, formatNaira, registrationFeeNaira } from "@/lib/config";

export const metadata: Metadata = { title: "Join the Club" };
export const dynamic = "force-dynamic"; // fee comes from env at runtime

export default function RegisterPage() {
  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)] flex flex-col items-center relative overflow-hidden">
      <div className="flex flex-col w-full relative">
        <div className="w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl flex flex-col items-center">
          <div className="w-full max-w-[720px] text-center mb-space-lg flex flex-col items-center">
            <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Membership
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight">Join the Club.</h1>
            <p className="font-body-lg text-body-lg text-secondary mt-space-xs max-w-md">
              Complete the form below to become a member of {club.name}.
            </p>
            <div className="mt-space-sm flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm text-outline tracking-normal font-normal">
                Fields marked with an asterisk (<span className="text-primary font-bold">*</span>) are required.
              </span>
            </div>
          </div>

          <RegistrationForm feeLabel={formatNaira(registrationFeeNaira())} />

          <div className="w-full max-w-[720px] mt-space-xl p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wide">Need Help?</h3>
                <p className="font-body-sm text-body-sm text-secondary">Our membership desk is active 24/7 on match weeks.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-space-md">
              <a
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors shadow-sm"
                href={`mailto:${club.email}`}
              >
                <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                <span>{club.email}</span>
              </a>
              <a
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface hover:text-primary transition-colors shadow-sm"
                href={club.whatsappLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                <span>{club.whatsappDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
