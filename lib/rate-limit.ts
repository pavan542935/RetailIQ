import "server-only";

/*
 * In-memory fixed-window rate limiter with abuse strikes.
 *
 * Scope: per serverless instance. On Vercel each warm lambda keeps its own
 * counters, so the effective global limit is (limit × concurrent instances).
 * That is acceptable as a cost backstop for this app; for hard global
 * guarantees swap the Map for Upstash Redis (@upstash/ratelimit) — the
 * call sites below would not change shape.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60_000;
const MAX_KEYS = 10_000; // memory bound

const buckets = new Map<string, Bucket>();
const strikes = new Map<string, Bucket>();

function take(
  store: Map<string, Bucket>,
  key: string,
  limit: number
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Bound memory: prune expired entries once the store grows large.
  if (store.size > MAX_KEYS) {
    for (const [k, b] of store) {
      if (now >= b.resetAt) store.delete(k);
    }
  }

  const bucket = store.get(key);
  if (!bucket || now >= bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }
  if (bucket.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count++;
  return { ok: true, retryAfterSec: 0 };
}

/** Per-key request limit within a 60s window. */
export function rateLimit(key: string, limit: number) {
  return take(buckets, key, limit);
}

/**
 * Abuse strikes: clients that keep sending malformed/invalid requests get
 * temporarily blocked even below the request rate limit.
 */
export function recordStrike(key: string, maxStrikes: number) {
  return take(strikes, `strike:${key}`, maxStrikes);
}

/** First hop of x-forwarded-for — set by Vercel's proxy, trustworthy there. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
