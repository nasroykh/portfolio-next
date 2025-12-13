import type { Metadata } from "next";
import { League_Spartan, Nova_Square } from "next/font/google";
import { WithContext, WebSite } from "schema-dts";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import JsonLd from "@/components/json-ld";

const pathUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;

const novaSquare = Nova_Square({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-nova",
});
const leagueSpartan = League_Spartan({
	subsets: ["latin"],
	variable: "--font-league",
});

export const metadata: Metadata = {
	metadataBase: new URL(pathUrl),
	title: {
		default: "Nas - AI/LLM Specialist & Software Engineer",
		template: "%s | Nas",
	},
	description:
		"AI/LLM Specialist and Software Engineer specializing in RAG systems, custom AI assistants, eCommerce platforms, and SEO optimization. Building production-ready AI solutions and high-performance web applications.",
	openGraph: {
		title: "Nas - AI/LLM Specialist & Software Engineer",
		description:
			"AI/LLM Specialist and Software Engineer specializing in RAG systems, custom AI assistants, eCommerce platforms, and SEO optimization. Building production-ready AI solutions and high-performance web applications.",
		url: pathUrl,
		siteName: "Nas Portfolio",
		locale: "en_US",
		type: "website",
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
	alternates: {
		canonical: pathUrl,
	},
};

const jsonLdContent: WithContext<WebSite> = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Nas Portfolio",
	url: pathUrl,
	description:
		"AI/LLM Specialist and Software Engineer specializing in RAG systems, custom AI assistants, eCommerce platforms, and SEO optimization. Building production-ready AI solutions and high-performance web applications.",
	author: {
		"@type": "Person",
		name: "Nasr Eddine Yakhou",
		url: pathUrl,
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Nas" />
				<JsonLd content={jsonLdContent} />
			</head>
			<body
				className={`${novaSquare.variable} ${leagueSpartan.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<NextIntlClientProvider messages={messages}>
						{children}
						<Toaster />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
