import { getDb } from "@/lib/firebase/admin";
import { PaystackGateway } from "./paystack";
import { SquadGateway } from "./squad";
import type { GatewayId, PaymentGateway } from "./types";

/** To add a provider: implement PaymentGateway in its own file and register it here. */
const ADAPTERS: Record<GatewayId, PaymentGateway> = {
  squad: new SquadGateway(),
  paystack: new PaystackGateway(),
};

export function getGateway(id: string): PaymentGateway | undefined {
  return (ADAPTERS as Record<string, PaymentGateway>)[id];
}

const isGatewayId = (x: unknown): x is GatewayId => typeof x === "string" && x in ADAPTERS;

// ---- Which gateway to try first? -------------------------------------------------------------
// Priority (highest first):
//   1. Firestore doc  settings/payments  { order: ["paystack", "squad"] }   <- flip live from the Firebase console, no redeploy
//   2. env            PAYMENT_GATEWAYS=squad,paystack
//   3. default        ["squad"]
// A gateway that just failed is demoted for a minute (simple circuit breaker) so we stop hammering a provider that is down.

let settingsCache: { at: number; order: GatewayId[] | null } | undefined;
const SETTINGS_TTL_MS = 30_000;
const BREAKER_MS = 60_000;
const trippedUntil = new Map<GatewayId, number>();

async function configuredOrder(): Promise<GatewayId[]> {
  if (!settingsCache || Date.now() - settingsCache.at > SETTINGS_TTL_MS) {
    let order: GatewayId[] | null = null;
    try {
      const snap = await getDb().collection("settings").doc("payments").get();
      const raw = snap.data()?.order;
      if (Array.isArray(raw)) order = raw.filter(isGatewayId);
    } catch (e) {
      console.warn("[payments] could not read settings/payments, using env", (e as Error).message);
    }
    settingsCache = { at: Date.now(), order };
  }
  if (settingsCache.order?.length) return settingsCache.order;
  const fromEnv = (process.env.PAYMENT_GATEWAYS ?? "squad").split(",").map((s) => s.trim()).filter(isGatewayId);
  return fromEnv.length ? fromEnv : ["squad"];
}

export async function getGatewayOrder(now = Date.now()): Promise<PaymentGateway[]> {
  const usable = (await configuredOrder()).map((id) => ADAPTERS[id]).filter((g) => g.isConfigured());
  const healthy = usable.filter((g) => (trippedUntil.get(g.id) ?? 0) <= now);
  const tripped = usable.filter((g) => (trippedUntil.get(g.id) ?? 0) > now);
  return [...healthy, ...tripped]; // tripped ones stay as a last resort
}

export function markGatewayDown(id: GatewayId) {
  trippedUntil.set(id, Date.now() + BREAKER_MS);
}

export function markGatewayUp(id: GatewayId) {
  trippedUntil.delete(id);
}

/** test helper */
export function _resetRegistryForTests() {
  settingsCache = { at: Date.now(), order: null };
  trippedUntil.clear();
}
