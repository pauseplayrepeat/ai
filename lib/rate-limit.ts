import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function rateLimit(identifier: string) {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10000, "1 s"),
    analytics: false,
    prefix: "@upstash/ratelimit",
  });

  return await ratelimit.limit(identifier);
};