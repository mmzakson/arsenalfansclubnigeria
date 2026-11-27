import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { card as cardConfig, membershipValidityMonths } from "./config";

function secret(): string {
  const s = process.env.CARD_SIGNING_SECRET;
  if (!s || s.length < 16) throw new Error("CARD_SIGNING_SECRET must be set (16+ random characters)");
  return s;
}

const hmac = (msg: string) => createHmac("sha256", secret()).update(msg).digest();

/** Unguessable access key for a member's e-card URL. Deterministic, so nothing extra is stored and the
 *  link can be re-derived after a webhook-first payment. Only works for paid members (checked by the page). */
export function cardAccessKey(memberId: string): string {
  return hmac("card:" + memberId).toString("base64url");
}

export function isValidCardKey(memberId: string, key: string | undefined): boolean {
  if (!key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(cardAccessKey(memberId));
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Printed on the card back; ties the visual card to the membership number. */
export function securityStamp(membershipNumber: string): string {
  return hmac("stamp:" + membershipNumber).toString("hex").toUpperCase();
}

export function formatMembershipNumber(sequence: number, date: Date): string {
  return `${cardConfig.idPrefix}-${date.getUTCFullYear()}-${String(sequence).padStart(5, "0")}`;
}

/** Arsenal season runs August to May: Sept 2026 -> "2026/2027", March 2027 -> "2026/2027". */
export function seasonLabel(date: Date): string {
  const y = date.getUTCFullYear();
  return date.getUTCMonth() >= 7 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

export function validThru(paidAt: Date): Date {
  return addMonths(paidAt, membershipValidityMonths());
}

export function fmtDay(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Africa/Lagos" })
    .toUpperCase();
}

export function fmtMonthYear(iso: string): string {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-GB", { month: "2-digit", year: "numeric", timeZone: "Africa/Lagos" }).formatToParts(d);
  const m = parts.find((p) => p.type === "month")!.value;
  const y = parts.find((p) => p.type === "year")!.value;
  return `${m} / ${y}`;
}
