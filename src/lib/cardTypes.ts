export interface CardData {
  fullName: string;
  initials: string;
  /** Member photo as a data URL; null falls back to initials. */
  photoUrl: string | null;
  membershipNumber: string;
  category: string;
  tier: string;
  season: string;
  issueDate: string;
  validThru: string;
  chapter: string;
  matchdayAccess: string;
  verifyUrl: string;
  stamp: string; // full hex stamp
}
