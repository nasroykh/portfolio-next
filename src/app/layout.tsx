import type { Metadata } from "next";
import { League_Spartan, Nova_Square } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
	metadataBase: new URL("https://nascodes.dev"),
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
		url: "https://nascodes.dev",
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
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Nas" />
			</head>
			<body
				className={`${novaSquare.variable} ${leagueSpartan.variable} antialiased max-w-xl md:max-w-2xl mx-auto mt-4 md:mt-8 px-4 sm:px-6`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
