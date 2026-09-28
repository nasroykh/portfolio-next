import { defineRouting } from "next-intl/routing";
import { defaultLocale, LOCALE_COOKIE, locales } from "./config";

export const routing = defineRouting({
	locales,
	defaultLocale,
	// English stays at "/", other locales get a prefix ("/fr/about")
	localePrefix: "as-needed",
	localeCookie: { name: LOCALE_COOKIE, maxAge: 60 * 60 * 24 * 365 },
	// hreflang is emitted per page in metadata: blog posts and case studies are English only
	alternateLinks: false,
});
