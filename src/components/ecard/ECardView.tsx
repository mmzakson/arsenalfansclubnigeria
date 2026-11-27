"use client";

import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import type { CardData } from "@/lib/cardTypes";
import { CardBack, CardFront } from "./ECardFaces";

export default function ECardView({ card, firstName }: { card: CardData; firstName: string }) {
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  async function download() {
    if (busy || !frontRef.current || !backRef.current) return;
    setBusy(true);
    try {
      for (const [name, node] of [["front", frontRef.current], ["back", backRef.current]] as const) {
        const url = await toPng(node, { pixelRatio: 3, cacheBust: true });
        const a = document.createElement("a");
        a.href = url;
        a.download = `${card.membershipNumber}-${name}.png`;
        a.click();
        await new Promise((r) => setTimeout(r, 250)); // let the browser start the first download
      }
      notify("Your e-ID card was downloaded.");
    } catch (e) {
      console.error(e);
      notify("Download failed. Try again, or take a screenshot of your card.");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("Link copied. Keep it safe: it opens your card.");
    } catch {
      notify("Couldn't copy. Bookmark this page instead.");
    }
  }

  const tab = (active: boolean) =>
    `px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
      active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <div className="font-inter">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-arsenal-red text-xs font-semibold tracking-wide uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Official Verified Gunner Identity
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">Welcome to the club, {firstName}!</h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2">
          Your payment is confirmed. Present this digital identification at official Arsenal Fans Club Nigeria clubhouses, match-day
          screenings, and partner venues.
        </p>
        <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-xl shadow-inner border border-slate-300/70" role="tablist">
          <button className={tab(!flipped)} onClick={() => setFlipped(false)} role="tab" aria-selected={!flipped}>Front View</button>
          <button className={tab(flipped)} onClick={() => setFlipped(true)} role="tab" aria-selected={flipped}>Back &amp; Security Specs</button>
        </div>
      </div>

      <div className="flex justify-center items-center py-2 sm:py-4">
        <div className="card-perspective-container w-full max-w-[680px]">
          <div className={`relative w-full aspect-[85.6/53.98] min-h-[380px] sm:min-h-[428px] ${flipped ? "card-is-flipped" : ""}`}>
            <CardFront card={card} className="card-face card-face-front" />
            <CardBack card={card} className="card-face card-face-back" />
          </div>
        </div>
      </div>

      {/* Off-screen, flat copies used only for the PNG download (the visible card is 3D-flipped) */}
      <div aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, pointerEvents: "none" }}>
        <div ref={frontRef} style={{ position: "relative", width: 680, height: 428 }}>
          <CardFront card={card} />
        </div>
        <div ref={backRef} style={{ position: "relative", width: 680, height: 428 }}>
          <CardBack card={card} />
        </div>
      </div>

      <section className="mt-10 sm:mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Save your card</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Download your e-ID card as images, and keep this page&apos;s link: it&apos;s your personal link back to your card.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm transition-all"
              type="button"
            >
              Copy my card link
            </button>
            <button
              onClick={download}
              disabled={busy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-arsenal-red hover:bg-arsenal-darkred disabled:opacity-60 text-white text-xs font-semibold shadow-sm transition-all"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              {busy ? "Preparing..." : "Download Digital ID"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          {[
            ["Verification Status", "Active & Certified", true],
            ["Registered Chapter", card.chapter, false],
            ["Matchday Access", card.matchdayAccess, false],
            ["Security Stamp", `AFCN-SEC-${card.stamp.slice(0, 8)}`, false],
          ].map(([label, value, dot]) => (
            <div key={label as string} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{label}</span>
              <div className="flex items-center space-x-1.5 mt-1">
                {dot && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                <p className="text-xs font-bold text-slate-800 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
