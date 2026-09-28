import type { MetadataRoute } from "next";
import { getBlogPosts, parsePublishedAt } from "@/app/blog/utils";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

const STATIC_ROUTES = [
	{ path: "/", priority: 1 },
	{ path: "/about", priority: 0.8 },
	{ path: "/experience", priority: 0.8 },
	{ path: "/projects", priority: 0.8 },
	{ path: "/blog", priority: 0.8 },
	{ path: "/contact", priority: 0.6 },
	{ path: "/resume", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getBlogPosts();
	const latestPost = posts[0]
		? parsePublishedAt(posts[0].metadata.publishedAt)
		: undefined;

	return [
		...STATIC_ROUTES.map(({ path, priority }) => ({
			url: absoluteUrl(path),
			lastModified: path === "/blog" || path === "/" ? latestPost : undefined,
			changeFrequency: "monthly" as const,
			priority,
		})),
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
