import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	// Skip API routes, the OG image route, Next internals and files with an extension
	// (sitemap.xml, robots.txt, llms.txt, icons, images)
	matcher: "/((?!api|og|_next|_vercel|.*\\..*).*)",
};
