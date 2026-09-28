import type { MetadataRoute } from "next";
import { getBlogPosts, parsePublishedAt } from "@/lib/blog";
import { projects } from "@/data/projects";
import { locales } from "@/i18n/config";
import { absoluteUrl, localizedPath } from "@/lib/site";

const STATIC_ROUTES = [
	{ path: "/", priority: 1 },
	{ path: "/about", priority: 0.8 },
	{ path: "/experience", priority: 0.8 },
	{ path: "/projects", priority: 0.8 },
	{ path: "/blog", priority: 0.8 },
	{ path: "/contact", priority: 0.6 },
	{ path: "/resume", priority: 0.6 },
] as const;

const languageAlternates = (path: string) => ({
	languages: {
		...Object.fromEntries(
			locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))]),
		),
		"x-default": absoluteUrl(path),
	},
});

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getBlogPosts();
	const latestPost = posts[0]
		? parsePublishedAt(posts[0].metadata.publishedAt)
		: undefined;

	return [
		// Translated pages: one entry per locale, each listing all language versions
		...STATIC_ROUTES.flatMap(({ path, priority }) =>
			locales.map((locale) => ({
				url: absoluteUrl(localizedPath(locale, path)),
				lastModified: path === "/blog" || path === "/" ? latestPost : undefined,
				changeFrequency: "monthly" as const,
				priority,
				alternates: languageAlternates(path),
			})),
		),
		// Posts and case studies only exist in English
		...posts.map((post) => ({
			url: absoluteUrl(`/blog/${post.slug}`),
			lastModified: parsePublishedAt(post.metadata.publishedAt),
			changeFrequency: "yearly" as const,
			priority: 0.7,
		})),
		...projects.map((project) => ({
			url: absoluteUrl(`/projects/${project.id}`),
			changeFrequency: "yearly" as const,
			priority: 0.7,
		})),
	];
}
