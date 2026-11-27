import { z } from "zod";

export const COUNTRIES = ["NG", "GB", "US", "CA", "GH", "KE", "ZA", "IE", "AE", "OTHER"] as const;
export const QUALIFICATIONS = ["bachelor", "master", "doctorate", "hnd", "ond", "secondary", "other"] as const;
export const REFERRAL_SOURCES = [
  "instagram", "facebook", "whatsapp", "friends_family", "youtube", "blogs", "linkedin", "other",
] as const;

const text = (max: number) => z.string().trim().min(1, "Required").max(max);
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

/** Passport photo: the browser crops/resizes to a ~360x450 JPEG data URL (roughly 30-60 KB). */
export const MAX_PHOTO_CHARS = 200_000;
const photoSchema = z
  .string("Please add your photo")
  .max(MAX_PHOTO_CHARS, "Photo is too large")
  .regex(/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/, "Photo must be a JPEG image")
  .refine((d) => {
    const head = Buffer.from(d.slice("data:image/jpeg;base64,".length, "data:image/jpeg;base64,".length + 8), "base64");
    return head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff; // real JPEG signature
  }, "Photo must be a JPEG image");

export const registrationSchema = z.object({
  first_name: text(60),
  last_name: text(60),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")).pipe(z.string().max(120)),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number"),
  dob: z.iso
    .date("Enter a valid date")
    .refine((d) => d >= "1900-01-01" && d <= new Date().toISOString().slice(0, 10), "Enter a valid date of birth"),
  gender: z.enum(["male", "female"]),
  photo: photoSchema,
  address_1: text(160),
  address_2: optionalText(160),
  city: text(80),
  state: text(80),
  zip_code: optionalText(20),
  country: z.enum(COUNTRIES),
  qualification: z.union([z.enum(QUALIFICATIONS), z.literal("")]).optional().default(""),
  occupation: optionalText(100),
  referral_source: z.enum(REFERRAL_SOURCES),
  referral_code: z.string().trim().toUpperCase().max(20).optional().default(""),
  agree_disclaimer: z.literal(true, "You must accept this to continue"),
  agree_privacy: z.literal(true, "You must accept this to continue"),
  agree_terms: z.literal(true, "You must accept this to continue"),
  /** Honeypot: real users never see or fill this. */
  website: z.string().max(0).optional().default(""),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
