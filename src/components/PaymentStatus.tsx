"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { club } from "@/lib/config";

type State = "checking" | "success" | "failed" | "timeout" | "missing";

const MAX_ATTEMPTS = 15; // ~45 seconds
const DELAY_MS = 3000;

export default function PaymentStatus({ reference }: { reference: string }) {
  const [state, setState] = useState<State>("checking");
  const [attempt, setAttempt] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // React strict-mode double invoke
    started.current = true;
    let cancelled = false;

    (async () => {
      for (let i = 1; i <= MAX_ATTEMPTS && !cancelled; i++) {
        setAttempt(i);
        try {
          const res = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference }),
          });
          const data = await res.json();
          if (data.status === "success") {
            setState("success");
            window.location.replace(data.ecardPath); // straight to the e-ID card
            return;
          }
          if (data.status === "failed") return setState("failed");
          if (data.status === "not_found") return setState("missing");
        } catch {
          /* network blip: try again */
        }
        await new Promise((r) => setTimeout(r, DELAY_MS));
      }
      if (!cancelled) setState("timeout");
    })();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  const box = "w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden text-center";
  const help = (
    <p className="font-body-sm text-body-sm text-secondary mt-space-md">
      Need help? Email <a className="text-primary underline" href={`mailto:${club.email}`}>{club.email}</a> and quote reference{" "}
      <span className="font-mono">{reference}</span>.
    </p>
  );

  if (state === "checking" || state === "success") {
    return (
      <div className={box}>
        <div className="h-1.5 bg-primary" />
        <div className="p-space-xl">
          <span className="material-symbols-outlined animate-spin text-primary text-[40px]">progress_activity</span>
          <h1 className="font-headline-md text-headline-md text-on-surface mt-space-md">
            {state === "success" ? "Payment confirmed. Opening your e-ID card..." : "Confirming your payment..."}
          </h1>
          <p className="font-body-sm text-body-sm text-secondary mt-space-xs">
            Please don&apos;t close this page.{attempt > 3 && " This is taking a little longer than usual."}
          </p>
        </div>
      </div>
    );
  }

  const content = {
    failed: {
      icon: "error",
      title: "Payment was not completed",
      text: "No money was taken, or it will be returned by your bank. You can try again.",
      cta: true,
    },
    timeout: {
      icon: "schedule",
      title: "We're still waiting for confirmation",
      text: "If you were debited, don't pay again. Your e-ID card will be ready as soon as the bank confirms. Refresh this page in a minute.",
      cta: false,
    },
    missing: {
      icon: "search_off",
      title: "We couldn't find this payment",
      text: "The link may be incomplete. Please start your registration again.",
      cta: true,
    },
  }[state];

  return (
    <div className={box}>
      <div className="h-1.5 bg-primary" />
      <div className="p-space-xl">
        <span className="material-symbols-outlined text-primary text-[40px]">{content.icon}</span>
        <h1 className="font-headline-md text-headline-md text-on-surface mt-space-md">{content.title}</h1>
        <p className="font-body-sm text-body-sm text-secondary mt-space-xs">{content.text}</p>
        <div className="mt-space-lg flex flex-col gap-space-sm items-center">
          {state === "timeout" && (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-colors"
            >
              Check again
            </button>
          )}
          {content.cta && (
            <Link
              href="/register"
              className="inline-flex items-center justify-center font-label-md text-label-md uppercase tracking-wider bg-primary text-on-primary px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-colors"
            >
              Back to registration
            </Link>
          )}
        </div>
        {help}
      </div>
    </div>
  );
}
