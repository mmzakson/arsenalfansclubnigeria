"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";

const inputCls =
  "w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-low transition-colors shadow-sm";
const selectCls = inputCls + " pl-3.5 pr-10 appearance-none cursor-pointer";
const labelCls = "font-label-md text-label-md text-on-surface";

type FieldErrors = Record<string, string[] | undefined>;

function Field({ id, label, required, optional, error, children }: {
  id?: string; label: string; required?: boolean; optional?: boolean; error?: string; children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      <label className={labelCls} htmlFor={id}>
        {label} {required && <span className="text-primary">*</span>}
        {optional && <span className="font-normal text-secondary">(Optional)</span>}
      </label>
      {children}
      {error && <p className="font-body-sm text-body-sm text-error" role="alert">{error}</p>}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary pointer-events-none text-[20px]">expand_more</span>
    </div>
  );
}

function GroupHeader({ title, step }: { title: string; step: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-headline-sm text-label-md uppercase tracking-wider text-primary font-bold">{title}</span>
      <span className="font-label-sm text-label-sm text-outline font-mono">{step} / 05</span>
    </div>
  );
}

const Divider = () => <div className="w-full h-[1px] bg-surface-variant"></div>;

function Consent({ name, error, children }: { name: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
        <input className="mt-1 h-4 w-4 rounded accent-primary cursor-pointer shrink-0" name={name} required type="checkbox" />
        <span className="font-body-sm text-body-sm text-on-surface leading-snug">{children}</span>
      </label>
      {error && <p className="font-body-sm text-body-sm text-error mt-1" role="alert">{error}</p>}
    </div>
  );
}


const PHOTO_W = 360;
const PHOTO_H = 450; // 4:5 portrait, matches the e-ID card frame
const MAX_PHOTO_CHARS = 190_000; // server limit is 200k

/** Centre-crops to 4:5 (biased towards the top so faces stay in frame), resizes, and returns a small JPEG data URL. */
async function toPassportJpeg(file: File): Promise<string> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const target = PHOTO_W / PHOTO_H;
  let sw = bmp.width, sh = bmp.height, sx = 0, sy = 0;
  if (bmp.width / bmp.height > target) {
    sw = bmp.height * target;
    sx = (bmp.width - sw) / 2;
  } else {
    sh = bmp.width / target;
    sy = (bmp.height - sh) * 0.25;
  }
  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_W;
  canvas.height = PHOTO_H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, PHOTO_W, PHOTO_H);
  ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, PHOTO_W, PHOTO_H);
  bmp.close();
  for (const q of [0.85, 0.75, 0.65, 0.55]) {
    const url = canvas.toDataURL("image/jpeg", q);
    if (url.length <= MAX_PHOTO_CHARS) return url;
  }
  throw new Error("too large");
}

function PhotoField({ value, onChange, error }: { value: string | null; onChange: (v: string | null) => void; error?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [problem, setProblem] = useState<string | null>(null);

  async function pick(file: File | undefined) {
    setProblem(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) return setProblem("Please choose an image file (JPG or PNG).");
    if (file.size > 15 * 1024 * 1024) return setProblem("That image is too large. Please choose one under 15 MB.");
    try {
      onChange(await toPassportJpeg(file));
    } catch {
      setProblem("We couldn't read that image. Try a different photo (JPG or PNG).");
    }
  }

  const msg = problem ?? error;
  return (
    <div className="flex flex-col gap-space-xs">
      <span className={labelCls}>Passport Photograph <span className="text-primary">*</span></span>
      <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg">
        <div className="w-20 h-[6.25rem] shrink-0 rounded-lg overflow-hidden bg-surface-container-highest flex items-center justify-center shadow-sm">
          {value ? (
            <img src={value} alt="Your photo preview" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-outline text-[36px]">person</span>
          )}
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            A clear, front-facing photo with a plain background. This will appear on your e-ID card.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface hover:text-primary shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">upload</span>
              {value ? "Change photo" : "Choose photo"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  if (input.current) input.current.value = "";
                }}
                className="px-3 py-2 rounded-lg font-label-md text-label-md text-secondary hover:text-on-surface transition-colors cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
          <input ref={input} type="file" accept="image/*" className="sr-only" tabIndex={-1} onChange={(e) => pick(e.target.files?.[0])} />
        </div>
      </div>
      {msg && <p className="font-body-sm text-body-sm text-error" role="alert">{msg}</p>}
    </div>
  );
}

const legalLink = "text-primary font-semibold underline underline-offset-2 hover:opacity-80";

export default function RegistrationForm({ feeLabel }: { feeLabel: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<FieldErrors>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const err = (name: string) => fields[name]?.[0];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setFields({});
    if (!photo) {
      setFields({ photo: ["Please add your photo"] });
      setError("Please correct the highlighted fields.");
      return;
    }
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    form.forEach((v, k) => (body[k] = v));
    body.photo = photo;
    for (const k of ["agree_disclaimer", "agree_privacy", "agree_terms"]) body[k] = form.get(k) === "on";

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl); // hand over to the payment gateway
        return; // keep the button locked while redirecting
      }
      setError(data.error ?? "Something went wrong. Please try again.");
      if (data.fields) setFields(data.fields);
    } catch {
      setError("Network problem. Please check your connection and try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="w-full max-w-[720px] bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
      <div className="h-1.5 w-full bg-primary"></div>
      <form className="p-space-md sm:p-space-lg md:p-space-xl flex flex-col gap-space-lg" onSubmit={onSubmit} noValidate={false}>
        {/* Honeypot: hidden from people, bots fill it */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        {/* GROUP A */}
        <div className="flex flex-col gap-space-md">
          <GroupHeader title="Group A • Personal Information" step="01" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="first_name" label="First Name" required error={err("first_name")}>
              <input className={inputCls} id="first_name" name="first_name" placeholder="e.g. Thierry" required type="text" autoComplete="given-name" />
            </Field>
            <Field id="last_name" label="Last Name" required error={err("last_name")}>
              <input className={inputCls} id="last_name" name="last_name" placeholder="e.g. Henry" required type="text" autoComplete="family-name" />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="email" label="Email Address" required error={err("email")}>
              <input className={inputCls} id="email" name="email" placeholder="gunner@arsenalfansclubnigeria.com" required type="email" autoComplete="email" />
            </Field>
            <Field id="phone" label="Phone / Mobile" required error={err("phone")}>
              <input className={inputCls} id="phone" name="phone" placeholder="+234 800 000 0000" required type="tel" autoComplete="tel" />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="dob" label="Date of Birth" required error={err("dob")}>
              <input className={inputCls} id="dob" name="dob" required type="date" max={new Date().toISOString().slice(0, 10)} autoComplete="bday" />
            </Field>
            <div className="flex flex-col gap-space-xs">
              <span className={labelCls}>Sex <span className="text-primary">*</span></span>
              <div className="grid grid-cols-2 gap-3 h-11">
                {[{ v: "male", icon: "male", l: "Male" }, { v: "female", icon: "female", l: "Female" }].map((o, i) => (
                  <label key={o.v} className="relative flex items-center justify-center p-2 rounded-lg bg-surface-container-lowest cursor-pointer select-none transition-all shadow-sm has-[:checked]:bg-primary has-[:checked]:text-on-primary">
                    <input className="sr-only" name="gender" required type="radio" value={o.v} defaultChecked={i === 0} />
                    <span className="font-label-md text-label-md flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">{o.icon}</span>
                      {o.l}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <PhotoField value={photo} onChange={setPhoto} error={err("photo")} />
        </div>
        <Divider />

        {/* GROUP B */}
        <div className="flex flex-col gap-space-md">
          <GroupHeader title="Group B • Address Details" step="02" />
          <Field id="address_1" label="Address Line 1" required error={err("address_1")}>
            <input className={inputCls} id="address_1" name="address_1" placeholder="Street address or P.O. Box" required type="text" autoComplete="address-line1" />
          </Field>
          <Field id="address_2" label="Address Line 2" optional>
            <input className={inputCls} id="address_2" name="address_2" placeholder="Apartment, suite, unit, building, floor, etc." type="text" autoComplete="address-line2" />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="city" label="City" required error={err("city")}>
              <input className={inputCls} id="city" name="city" placeholder="e.g. Lagos" required type="text" autoComplete="address-level2" />
            </Field>
            <Field id="state" label="State / Province" required error={err("state")}>
              <input className={inputCls} id="state" name="state" placeholder="e.g. Lagos State" required type="text" autoComplete="address-level1" />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="zip_code" label="Postal / Zip Code">
              <input className={inputCls} id="zip_code" name="zip_code" placeholder="100001" type="text" autoComplete="postal-code" />
            </Field>
            <Field id="country" label="Country" required error={err("country")}>
              <SelectWrap>
                <select className={selectCls} id="country" name="country" required defaultValue="NG">
                  <option value="NG">Nigeria</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GH">Ghana</option>
                  <option value="KE">Kenya</option>
                  <option value="ZA">South Africa</option>
                  <option value="IE">Ireland</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="OTHER">Other Country</option>
                </select>
              </SelectWrap>
            </Field>
          </div>
        </div>
        <Divider />

        {/* GROUP C */}
        <div className="flex flex-col gap-space-md">
          <GroupHeader title="Group C • Academic & Professional" step="03" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <Field id="qualification" label="Highest Qualification">
              <SelectWrap>
                <select className={selectCls} id="qualification" name="qualification" defaultValue="">
                  <option value="">Select Qualification</option>
                  <option value="bachelor">Bachelor&apos;s Degree</option>
                  <option value="master">Master&apos;s Degree</option>
                  <option value="doctorate">Doctorate / Ph.D.</option>
                  <option value="hnd">Higher National Diploma (HND)</option>
                  <option value="ond">Ordinary National Diploma (OND)</option>
                  <option value="secondary">Secondary School / O-Level</option>
                  <option value="other">Other</option>
                </select>
              </SelectWrap>
            </Field>
            <Field id="occupation" label="Occupation / Vocation">
              <input className={inputCls} id="occupation" name="occupation" placeholder="e.g. Software Engineer, Broadcaster" type="text" />
            </Field>
          </div>
        </div>
        <Divider />

        {/* GROUP D */}
        <div className="flex flex-col gap-space-md">
          <GroupHeader title="Group D • Referral Information" step="04" />
          <Field id="referral_source" label="How did you hear about us?" required error={err("referral_source")}>
            <SelectWrap>
              <select className={selectCls} id="referral_source" name="referral_source" required defaultValue="">
                <option value="" disabled>Select discovery channel</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="whatsapp">WhatsApp Group / Status</option>
                <option value="friends_family">Friends &amp; Family</option>
                <option value="youtube">YouTube</option>
                <option value="blogs">Sports Blogs / News</option>
                <option value="linkedin">LinkedIn</option>
                <option value="other">Other Channel</option>
              </select>
            </SelectWrap>
          </Field>
          <Field id="referral_code" label="Referral Code" optional>
            <input className={inputCls + " uppercase font-mono"} id="referral_code" name="referral_code" placeholder="AFC-XXXXX" type="text" />
          </Field>
        </div>
        <Divider />

        {/* GROUP E */}
        <div className="flex flex-col gap-space-md">
          <GroupHeader title="Group E • Required Consents" step="05" />
          <div className="flex flex-col gap-3.5">
            <Consent name="agree_disclaimer" error={err("agree_disclaimer")}>
              I agree to the <a className={legalLink} href="#">Disclaimer</a> policy of ArsenalFansClubNigeria.
            </Consent>
            <Consent name="agree_privacy" error={err("agree_privacy")}>
              I agree to the <a className={legalLink} href="#">Privacy Policy</a> and data retention principles.
            </Consent>
            <Consent name="agree_terms" error={err("agree_terms")}>
              I agree to the official <a className={legalLink} href="#">Terms and Conditions</a> of fan membership.
            </Consent>
          </div>
        </div>
        <div className="w-full h-[1px] bg-surface-variant mt-space-sm"></div>

        {/* SUBMISSION */}
        <div className="flex flex-col gap-space-md pt-space-xs">
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Registration Fee</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-bold text-primary">{feeLabel}</span>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
              {error}
            </div>
          )}

          <button
            className="w-full h-14 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl font-bold uppercase tracking-wider shadow-lg hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={submitting}
            type="submit"
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Taking you to payment...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
          <p className="font-body-sm text-body-sm text-secondary text-center flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
            You will be taken to a secure payment gateway to complete your registration.
          </p>
        </div>
      </form>
    </div>
  );
}
