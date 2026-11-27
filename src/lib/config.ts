/** Single source of truth for club details and business rules. */

export const club = {
  name: "ArsenalFansClubNigeria",
  longName: "Arsenal Fans Club Nigeria",
  motto: "One Club, One Family",
  email: "info@arsenalfansclubnigeria.com",
  whatsappLink: "https://wa.me/2349127183212",
  whatsappDisplay: "+234 912 718 3212",
};

/** Hosted crest used on the e-ID card. Drop a file in /public and point this at it ("/crest.png"). */
export const CREST_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBeoiPhJc7ht-RK5A_eHt8SdHMC4tehPBVkkeI1lSF2tNrrIBZ3V0ioJr4hOdOVN8DsRn8g-AHEcZ34Q59ws5C9Tjs0k05gENPW8fAyLRd58BFXrtnq1Lzsp2wM-DLnRMDfmkDZllU13FZaM374X5ksSl57vE2TbmfQWQWu5AE1Cot0hW8QT10XhWXh0qjkJCj6Kxd_6iUoWOXgLAnUWpADtOlKxJulOlxcpw-qWwk398RGyvI8Awjx";

export const card = {
  category: "STANDARD GUNNER",
  tier: "TIER 01 • PREMIUM",
  matchdayAccess: "VIP Clubhouse & Ballots",
  idPrefix: "AFCN",
};

function intEnv(name: string, fallback: number): number {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Registration fee in naira. The amount charged is ALWAYS taken from here, never from the browser. */
export function registrationFeeNaira(): number {
  return intEnv("REGISTRATION_FEE_NGN", 5000);
}

export function registrationFeeKobo(): number {
  return registrationFeeNaira() * 100;
}

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function membershipValidityMonths(): number {
  return intEnv("MEMBERSHIP_VALIDITY_MONTHS", 12);
}

/** Public base URL used for payment callbacks and QR links. */
export function appUrl(fallbackOrigin?: string): string {
  const url = process.env.APP_URL || fallbackOrigin;
  if (!url) throw new Error("APP_URL is not set");
  return url.replace(/\/+$/, "");
}
