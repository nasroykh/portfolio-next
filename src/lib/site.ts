import { defaultLocale, isLocale, locales, OG_LOCALES } from "@/i18n/config";

export const SITE_URL =`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || "nascodes.dev"}`;

export const SITE_NAME = "Nas Portfolio";
export const AUTHOR_NAME = "Nasr Eddine Yakhou";
export const CONTACT_EMAIL = "nascodes@protonmail.com";

export const SOCIAL_LINKS = [
	{ name: "GitHub", url: "https://github.com/nasroykh" },
	{ name: "LinkedIn", url: "https://www.linkedin.com/in/nas-y/" },
	{ name: "Medium", url: "https://medium.com/@nascodes" },
	{ name: "Instagram", url: "https://instagram.com/nascodes" },
	{ name: "X (Twitter)", url: "https://x.com/nas_codes" },
] as const;

export const absoluteUrl = (path = "/") =>
	path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`;

export const ogImageUrl = (title: string) =>
	`${SITE_URL}/og?title=${encodeURIComponent(title)}`;

/** Path of a page in the given locale: the default locale has no prefix ("/about", "/fr/about"). */
export const localizedPath = (locale: string, path: string) =>
	locale === defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;

export const openGraphBase = (locale: string) => ({
	siteName: SITE_NAME,
	locale: isLocale(locale) ? OG_LOCALES[locale] : OG_LOCALES[defaultLocale],
});

/**
 * Canonical and hreflang links for a page. Pages whose main content only exists in English
 * (blog posts, case studies) set `translated: false`: every locale then points its canonical
 * at the English URL and no alternates are declared.
 */
export const localeAlternates = (
	locale: string,
	path: string,
	translated = true,
) =>
	translated
		? {
				canonical: localizedPath(locale, path),
				languages: {
					...Object.fromEntries(
						locales.map((l) => [l, localizedPath(l, path)]),
					),
					"x-default": path,
				},
			}
		: { canonical: path };

/** Page metadata with its own canonical URL and Open Graph tags (Next does not merge openGraph). */
export const pageMetadata = ({
	title,
	description,
	path,
	locale,
}: {
	title: string;
	description: string;
	path: string;
	locale: string;
}) => ({
	title,
	description,
	alternates: localeAlternates(locale, path),
	openGraph: {
		...openGraphBase(locale),
		type: "website" as const,
		title: `${title} | Nas`,
		description,
		url: localizedPath(locale, path),
	},
});
