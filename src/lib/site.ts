export const SITE_URL = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME || "nascodes.dev"}`;

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

export const BASE_OPEN_GRAPH = {
	siteName: SITE_NAME,
	locale: "en_US",
} as const;

/** Page metadata with its own canonical URL and Open Graph tags (Next does not merge openGraph). */
export const pageMetadata = ({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}) => ({
	title,
	description,
	alternates: { canonical: path },
	openGraph: {
		...BASE_OPEN_GRAPH,
		type: "website" as const,
		title: `${title} | Nas`,
		description,
		url: path,
	},
});
