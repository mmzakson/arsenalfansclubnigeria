import "server-only";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cached: Firestore | undefined;

/** Accepts the key as pasted into a host dashboard: with or without wrapping quotes, literal "\n" or real newlines. */
function normalisePrivateKey(raw: string): string {
  return raw.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

/**
 * Firestore via the Admin SDK. All reads/writes happen on the server; the browser never talks to
 * Firestore directly (firestore.rules denies all client access).
 *
 * Credentials: FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY,
 * or Application Default Credentials (Firebase App Hosting / Cloud Run / emulator).
 */
export function getDb(): Firestore {
  if (cached) return cached;
  const existing = getApps()[0];
  const app =
    existing ??
    (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY
      ? initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: normalisePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
          }),
        })
      : initializeApp({
          credential: applicationDefault(),
          projectId: process.env.FIREBASE_PROJECT_ID,
        }));
  cached = getFirestore(app);
  return cached;
}

/** Test hook: lets unit tests swap in an in-memory fake. */
export function __setDbForTests(db: unknown) {
  cached = db as Firestore;
}
