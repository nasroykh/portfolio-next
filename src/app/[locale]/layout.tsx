import type { Metadata } from "next";
import {
	IBM_Plex_Sans_Arabic,
	League_Spartan,
	Noto_Kufi_Arabic,
	Nova_Square,
} from "next/font/google";
import { WithContext, WebSite } from "schema-dts";
import { Toaster } from "sonner";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";
import { DirectionProvider } from "@/components/direction-provider";
import JsonLd from "@/components/json-ld";
import { AIAssistant } from "@/components/ai-assistant";
import { routing } from "@/i18n/routing";
import { getDirection } from "@/i18n/config";
import {
	AUTHOR_NAME,
	SITE_NAME,
	SITE_URL,
	openGraphBase,
} from "@/lib/site";

import "../globals.css";

const novaSquare = Nova_Square({
	subsets: ["latin"],
	weight: ["400"],
});
const leagueSpartan = League_Spartan({
	subsets: ["latin"],
});
// Arabic glyphs (the Latin fonts have none). Their unicode-range means browsers only download them
// when a page contains Arabic text, so they are not preloaded.
const kufiArabic = Noto_Kufi_Arabic({ subsets: ["arabic"], preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({
	subsets: ["arabic"],
	weight: ["400", "500", "600", "700"],
	preload: false,
});

type NextFont = { style: { fontFamily: string } };
const families = (font: NextFont) =>
	font.style.fontFamily.split(",").map((name) => name.trim());

// "Latin font, Arabic font, then the size-adjusted fallbacks". next/font puts a local Arial
// fallback right after each font; Arial has Arabic glyphs, so with the plain CSS variables
// Arabic text would render in Arial and never reach the Arabic fonts.
const fontStack = (latin: NextFont, arabic: NextFont) => {
	const [latinFace, ...latinFallbacks] = families(latin);
	const [arabicFace, ...arabicFallbacks] = families(arabic);
	return [latinFace, arabicFace, ...latinFallbacks, ...arabicFallbacks].join(", ");
};

const FONT_STACKS = {
	"--font-sans-stack": fontStack(leagueSpartan, plexArabic),
	"--font-display-stack": fontStack(novaSquare, kufiArabic),
	"--font-arabic-face": families(plexArabic)[0],
} as React.CSSProperties;

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: Omit<Props, "children">): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	const title = t("siteTitle");
	const description = t("siteDescription");

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: title,
			template: "%s | Nas",
		},
		description,
		applicationName: "Nas",
		appleWebApp: { title: "Nas" },
		openGraph: {
			...openGraphBase(locale),
			title,
			description,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			creator: "@nas_codes",
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		keywords: [
			"AI/LLM Specialist",
			"RAG Systems",
			"Retrieval-Augmented Generation",
			"OpenAI",
			"Custom AI Assistants",
			"eCommerce Development",
			"SEO Optimization",
			"Technical SEO",
			"Full Stack Developer",
			"Next.js",
			"React",
			"Node.js",
			"PostgreSQL",
			"Payment Integration",
			"Stripe",
			"PayPal",
			"Web Scraping",
			"Puppeteer",
			"Playwright",
		],
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	// Enables static rendering for every page below this layout
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "meta" });
	const dir = getDirection(locale);

	const jsonLdContent: WithContext<WebSite> = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		url: SITE_URL,
		description: t("siteDescription"),
		inLanguage: locale,
		author: {
			"@type": "Person",
			name: AUTHOR_NAME,
			url: SITE_URL,
		},
	};

	return (
		<html
			lang={locale}
			dir={dir}
			style={FONT_STACKS}
			suppressHydrationWarning
		>
			<body
				className="antialiased"
			>
				<JsonLd content={jsonLdContent} />
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<DirectionProvider dir={dir}>
						<NextIntlClientProvider>
							{children}
							{/* Mounted once here so the chat survives client-side navigation */}
							<AIAssistant />
							<Toaster />
						</NextIntlClientProvider>
					</DirectionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
