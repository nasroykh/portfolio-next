import { describe, expect, it } from "vitest";
import { localeAlternates, localizedPath, pageMetadata } from "@/lib/site";
import { locales } from "@/i18n/config";

describe("localizedPath", () => {
	it("leaves the default locale unprefixed", () => {
		expect(localizedPath("en", "/")).toBe("/");
		expect(localizedPath("en", "/about")).toBe("/about");
	});

	it("prefixes other locales", () => {
		expect(localizedPath("fr", "/")).toBe("/fr");
		expect(localizedPath("ar", "/about")).toBe("/ar/about");
		expect(localizedPath("es", "/blog")).toBe("/es/blog");
	});
});

describe("localeAlternates", () => {
	it("declares every locale plus x-default for translated pages", () => {
		const alternates = localeAlternates("ar", "/about");

		expect(alternates.canonical).toBe("/ar/about");
		expect(alternates.languages).toEqual({
			en: "/about",
			fr: "/fr/about",
			ar: "/ar/about",
			es: "/es/about",
			"x-default": "/about",
		});
		expect(Object.keys(alternates.languages ?? {})).toHaveLength(locales.length + 1);
	});

	it("points English-only pages at the English URL without alternates", () => {
		expect(localeAlternates("fr", "/blog/post", false)).toEqual({
			canonical: "/blog/post",
		});
	});
});

describe("pageMetadata", () => {
	it("builds a per-page canonical and Open Graph block", () => {
		const metadata = pageMetadata({
			title: "Contact",
			description: "Get in touch",
			path: "/contact",
			locale: "es",
		});

		expect(metadata.alternates.canonical).toBe("/es/contact");
		expect(metadata.openGraph.url).toBe("/es/contact");
		expect(metadata.openGraph.locale).toBe("es_ES");
		expect(metadata.openGraph.title).toBe("Contact | Nas");
	});
});
