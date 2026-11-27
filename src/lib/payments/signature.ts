import { createHmac, timingSafeEqual } from "node:crypto";

export function hmacSha512Hex(secret: string, payload: string): string {
  return createHmac("sha512", secret).update(payload).digest("hex");
}

/** Case-insensitive, constant-time comparison of two hex signatures. */
export function safeEqualHex(a: string | null | undefined, b: string): boolean {
  if (!a) return false;
  const x = Buffer.from(a.trim().toLowerCase());
  const y = Buffer.from(b.toLowerCase());
  return x.length === y.length && timingSafeEqual(x, y);
}
