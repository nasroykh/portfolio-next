import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`;
	const appDir = path.join(process.cwd(), "src", "app");

	// Function to recursively find page files
	const getRoutes = (dir: string, basePath = ""): string[] => {
		let routes: string[] = [];

		// Handle case where directory might not exist (though app dir should exist)
		if (!fs.existsSync(dir)) return routes;

		const entries = fs.readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				// Ignore special folders like (groups), [dynamic], _private, and api
				if (
					!entry.name.startsWith("(") &&
					!entry.name.startsWith("[") &&
					!entry.name.startsWith("_") &&
					entry.name !== "api"
				) {
					routes = [
						...routes,
						...getRoutes(fullPath, `${basePath}/${entry.name}`),
					];
				}
			} else if (entry.name.match(/^page\.(tsx|ts|jsx|js)$/)) {
				routes.push(basePath || "/");
			}
		}
		return routes;
	};

	const routes = getRoutes(appDir);

	const generatedSitemap: MetadataRoute.Sitemap = routes.map((route) => ({
		url: `${baseUrl}${route === "/" ? "" : route}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: route === "/" ? 1 : 0.8,
	}));

	// You can override or append to the generated sitemap here
	const overrides: MetadataRoute.Sitemap = [
		// {
		// 	url: `${baseUrl}/manual-page`,
		// 	lastModified: new Date(),
		// 	changeFrequency: "yearly",
		// 	priority: 0.5,
		// },
	];

	return [...generatedSitemap, ...overrides];
}
