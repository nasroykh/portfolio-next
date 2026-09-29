import { describe, expect, it } from "vitest";
import { formatDate, getBlogPosts, parsePublishedAt } from "@/lib/blog";

describe("parsePublishedAt", () => {
	it("treats front matter dates without an offset as UTC", () => {
		expect(parsePublishedAt("2026-05-13 11:00").toISOString()).toBe(
			"2026-05-13T11:00:00.000Z",
		);
	});

	it("keeps an explicit offset", () => {
		expect(parsePublishedAt("2026-05-13 11:00+02:00").toISOString()).toBe(
			"2026-05-13T09:00:00.000Z",
		);
	});
});

describe("formatDate", () => {
	it("formats in the active locale", () => {
		expect(formatDate("2026-05-13 11:00", "en")).toBe("May 13, 2026");
		expect(formatDate("2026-05-13 11:00", "fr")).toBe("13 mai 2026");
	});

	it("uses Western digits in Arabic", () => {
		const formatted = formatDate("2026-05-13 11:00", "ar");
		expect(formatted).toContain("2026");
		expect(formatted).not.toMatch(/[٠-٩]/);
	});

	it("does not shift the day near midnight UTC", () => {
		expect(formatDate("2026-01-01 00:30", "en")).toBe("Jan 1, 2026");
	});
});

describe("getBlogPosts", () => {
	const posts = getBlogPosts();

	it("excludes drafts", () => {
		expect(posts.length).toBeGreaterThan(0);
		expect(posts.some((post) => post.slug.startsWith("_draft_"))).toBe(false);
	});

	it("is sorted newest first", () => {
		const times = posts.map((post) =>
			parsePublishedAt(post.metadata.publishedAt).getTime(),
		);
		expect(times).toEqual([...times].sort((a, b) => b - a));
	});

	it("has the front matter every page relies on", () => {
		for (const { slug, metadata } of posts) {
			expect(metadata.title, slug).toBeTruthy();
			expect(metadata.summary, slug).toBeTruthy();
			expect(Number.isNaN(parsePublishedAt(metadata.publishedAt).getTime()), slug).toBe(
				false,
			);
		}
	});
});
