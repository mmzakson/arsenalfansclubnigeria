import "server-only";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/firebase/admin";
import type { RegistrationInput } from "./validation";

export type MemberStatus = "pending_payment" | "paid";

export interface MemberDoc {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: "male" | "female";
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  qualification: string;
  occupation: string;
  referralSource: string;
  referralCode: string;
  consents: { disclaimer: boolean; privacy: boolean; terms: boolean; acceptedAt: string };
  status: MemberStatus;
  createdAt: string;
  updatedAt: string;
  // set when payment succeeds
  membershipNumber?: string;
  paidAt?: string;
  validThru?: string;
  paymentReference?: string;
}

export type PaymentStatus = "initiated" | "init_failed" | "success" | "failed" | "mismatch";

export interface PaymentDoc {
  memberId: string;
  gateway: string;
  amountKobo: number;
  currency: "NGN";
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  note?: string;
}

const members = () => getDb().collection("members");
const payments = () => getDb().collection("payments");
const photos = () => getDb().collection("photos");
const now = () => new Date().toISOString();

export function newReference(): string {
  // alphanumeric only: accepted by every gateway
  return "AFC" + randomBytes(12).toString("hex").toUpperCase();
}

export async function findPaidMemberByEmail(email: string): Promise<boolean> {
  const snap = await members().where("email", "==", email).where("status", "==", "paid").limit(1).get();
  return !snap.empty;
}

/** Re-uses an unpaid registration for the same email so retries don't pile up duplicates. */
export async function upsertPendingMember(input: RegistrationInput): Promise<string> {
  const data: Omit<MemberDoc, "createdAt" | "status"> = {
    firstName: input.first_name,
    lastName: input.last_name,
    email: input.email,
    phone: input.phone,
    dob: input.dob,
    gender: input.gender,
    address1: input.address_1,
    address2: input.address_2,
    city: input.city,
    state: input.state,
    zipCode: input.zip_code,
    country: input.country,
    qualification: input.qualification,
    occupation: input.occupation,
    referralSource: input.referral_source,
    referralCode: input.referral_code,
    consents: { disclaimer: true, privacy: true, terms: true, acceptedAt: now() },
    updatedAt: now(),
  };
  const existing = await members().where("email", "==", input.email).where("status", "==", "pending_payment").limit(1).get();
  let id: string;
  if (!existing.empty) {
    await existing.docs[0].ref.update(data);
    id = existing.docs[0].id;
  } else {
    id = (await members().add({ ...data, status: "pending_payment", createdAt: now() })).id;
  }
  // Photo lives in its own collection so member documents stay small and list queries stay cheap.
  await photos().doc(id).set({ dataUrl: input.photo, updatedAt: now() });
  return id;
}

export async function getPhoto(memberId: string): Promise<string | null> {
  const snap = await photos().doc(memberId).get();
  return snap.exists ? ((snap.data() as { dataUrl: string }).dataUrl ?? null) : null;
}

export async function createPayment(reference: string, p: Omit<PaymentDoc, "createdAt" | "updatedAt" | "status">) {
  await payments().doc(reference).set({ ...p, status: "initiated", createdAt: now(), updatedAt: now() } satisfies PaymentDoc);
}

export async function updatePayment(reference: string, patch: Partial<Pick<PaymentDoc, "status" | "note">>) {
  await payments().doc(reference).update({ ...patch, updatedAt: now() });
}

export async function getPayment(reference: string): Promise<PaymentDoc | null> {
  const snap = await payments().doc(reference).get();
  return snap.exists ? (snap.data() as PaymentDoc) : null;
}

export async function getMember(id: string): Promise<MemberDoc | null> {
  const snap = await members().doc(id).get();
  return snap.exists ? (snap.data() as MemberDoc) : null;
}

export async function getPaidMemberByNumber(number: string): Promise<MemberDoc | null> {
  const snap = await members().where("membershipNumber", "==", number).where("status", "==", "paid").limit(1).get();
  return snap.empty ? null : (snap.docs[0].data() as MemberDoc);
}
