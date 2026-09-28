// Fixed-window, in-memory limiter. Good enough for a single long-running Node server;
// on serverless/multi-instance deployments each instance has its own window, so use a shared
// store (e.g. Redis/Upstash) there instead.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_TRACKED_CLIENTS = 10_000;

const hits = new Map<string, { count: number; windowStart: number }>();

export const isRateLimited = (key: string, now = Date.now()) => {
	const entry = hits.get(key);

	if (!entry || now - entry.windowStart >= WINDOW_MS) {
		hits.delete(key);
		if (hits.size >= MAX_TRACKED_CLIENTS) {
			for (const [k, v] of hits) {
				if (now - v.windowStart >= WINDOW_MS) hits.delete(k);
			}
			// Still full: drop the oldest entry (Map keeps insertion order) to keep memory bounded
			if (hits.size >= MAX_TRACKED_CLIENTS) {
				const oldest = hits.keys().next().value;
				if (oldest !== undefined) hits.delete(oldest);
			}
		}
		hits.set(key, { count: 1, windowStart: now });
		return false;
	}

	entry.count += 1;
	return entry.count > MAX_REQUESTS_PER_WINDOW;
};
