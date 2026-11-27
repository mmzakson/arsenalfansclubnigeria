import { GatewayError, type GatewayId } from "./types";

/** fetch with a timeout, JSON parsing and uniform errors, so a hung gateway fails fast and we can fail over. */
export async function gatewayFetch<T = any>(
  gateway: GatewayId,
  url: string,
  init: RequestInit & { allowStatuses?: number[] } = {},
): Promise<{ status: number; body: T }> {
  const { allowStatuses = [], ...rest } = init;
  let res: Response;
  try {
    res = await fetch(url, { ...rest, signal: AbortSignal.timeout(12_000), cache: "no-store" });
  } catch (e) {
    throw new GatewayError(gateway, `network error: ${(e as Error).message}`);
  }
  const text = await res.text();
  let body: any = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON error page */
  }
  if (!res.ok && !allowStatuses.includes(res.status)) {
    throw new GatewayError(gateway, `HTTP ${res.status}: ${(body?.message ?? text).toString().slice(0, 200)}`);
  }
  return { status: res.status, body };
}
