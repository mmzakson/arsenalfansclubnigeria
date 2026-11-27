import "server-only";
import { card as cfg, appUrl } from "./config";
import { fmtDay, fmtMonthYear, seasonLabel, securityStamp } from "./card";
import type { CardData } from "./cardTypes";
import type { MemberDoc } from "./members";

/** Builds the display data for a PAID member. Throws if the member has not paid. */
export function buildCardData(m: MemberDoc, photoUrl: string | null, origin?: string): CardData {
  if (m.status !== "paid" || !m.membershipNumber || !m.paidAt || !m.validThru) throw new Error("member is not active");
  const fullName = `${m.firstName} ${m.lastName}`.trim();
  const initials = ((m.firstName[0] ?? "") + (m.lastName[0] ?? "")).toUpperCase();
  return {
    fullName,
    initials,
    photoUrl,
    membershipNumber: m.membershipNumber,
    category: cfg.category,
    tier: cfg.tier,
    season: seasonLabel(new Date(m.paidAt)),
    issueDate: fmtDay(m.paidAt),
    validThru: fmtMonthYear(m.validThru),
    chapter: `${m.state} Chapter`.toUpperCase(),
    matchdayAccess: cfg.matchdayAccess,
    verifyUrl: `${appUrl(origin)}/verify/${encodeURIComponent(m.membershipNumber)}`,
    stamp: securityStamp(m.membershipNumber),
  };
}
