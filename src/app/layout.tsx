import type { Metadata } from "next";
import { League_Spartan, Nova_Square } from "next/font/google";
import { WithContext, WebSite } from "schema-dts";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";
import JsonLd from "@/components/json-ld";
import { AIAssistant } from "@/components/ai-assistant";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const novaSquare = Nova_Square({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-nova",
});
const leagueSpartan = League_Spartan({
	subsets: ["latin"],
	variable: "--font-league",
});

const DESCRIPTION =
	"AI/LLM Specialist and Software Engineer specializing in RAG systems, custom AI assistants, eCommerce platforms, and SEO optimization. Building production-ready AI solutions and high-performance web applications.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Nas - AI/LLM Specialist & Software Engineer",
		template: "%s | Nas",
	},
	description: DESCRIPTION,
	applicationName: "Nas",
	appleWebApp: { title: "Nas" },
	openGraph: {
		title: "Nas - AI/LLM Specialist & Software Engineer",
		description: DESCRIPTION,
		url: "/",
		siteName: SITE_NAME,
		locale: "en_US",
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

const jsonLdContent: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: SITE_NAME,
	url: SITE_URL,
	description: DESCRIPTION,
	author: {
		"@type": "Person",
		name: AUTHOR_NAME,
		url: SITE_URL,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${novaSquare.variable} ${leagueSpartan.variable} antialiased`}
			>
				<JsonLd content={jsonLdContent} />
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<NextIntlClientProvider>
						{children}
						{/* Mounted once here so the chat survives client-side navigation */}
						<AIAssistant />
						<Toaster />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
