interface LimitEntry {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
}

const cache = new Map<string, LimitEntry>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

function getEntry(key: string): LimitEntry {
  const current = cache.get(key);
  if (current) {
    return current;
  }

  const initial: LimitEntry = {
    count: 0,
    windowStartedAt: Date.now()
  };
  cache.set(key, initial);
  return initial;
}

export function enforceRateLimit(
  key: string,
  options: {
    maxAttempts: number;
    windowMs: number;
    blockMs: number;
  }
): RateLimitResult {
  const now = Date.now();
  const entry = getEntry(key);

  if (entry.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000)
    };
  }

  if (now - entry.windowStartedAt > options.windowMs) {
    entry.count = 0;
    entry.windowStartedAt = now;
    entry.blockedUntil = undefined;
  }

  entry.count += 1;

  if (entry.count > options.maxAttempts) {
    entry.blockedUntil = now + options.blockMs;
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(options.blockMs / 1000)
    };
  }

  return {
    allowed: true
  };
}

export function resetRateLimit(key: string): void {
  cache.delete(key);
}
