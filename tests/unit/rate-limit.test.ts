import { describe, expect, it } from "vitest";
import { isRateLimited } from "@/app/api/utils/rate-limit";

describe("isRateLimited", () => {
	it("allows 10 requests per minute, then blocks", () => {
		const now = 1_000_000;
		const results = Array.from({ length: 12 }, () => isRateLimited("client-a", now));

		expect(results.slice(0, 10)).toEqual(Array(10).fill(false));
		expect(results.slice(10)).toEqual([true, true]);
	});

	it("tracks clients separately", () => {
		const now = 2_000_000;
		for (let i = 0; i < 11; i++) isRateLimited("client-b", now);

		expect(isRateLimited("client-b", now)).toBe(true);
		expect(isRateLimited("client-c", now)).toBe(false);
	});

	it("starts a new window after a minute", () => {
		const start = 3_000_000;
		for (let i = 0; i < 11; i++) isRateLimited("client-d", start);

		expect(isRateLimited("client-d", start + 59_999)).toBe(true);
		expect(isRateLimited("client-d", start + 60_000)).toBe(false);
	});
});
