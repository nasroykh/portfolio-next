import { ImageResponse } from "next/og";
import { getBlogPosts } from "@/lib/blog";
import { projects } from "@/data/projects";
import { AUTHOR_NAME, SITE_URL } from "@/lib/site";

const MAX_TITLE_LENGTH = 120;
const DEFAULT_TITLE = "Nas";

// Only titles of real posts and case studies are rendered, so the route cannot be used to put
// arbitrary text on an image served (and cached for a year) from this domain
const knownTitles = () =>
	new Set([
		...getBlogPosts().map((post) => post.metadata.title),
		...projects.map((project) => project.title),
	]);

// Dynamic Open Graph card used by blog posts and case studies without a cover image
export function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const requested = searchParams.get("title")?.trim() ?? "";
	const rawTitle = knownTitles().has(requested) ? requested : DEFAULT_TITLE;
	const title =
		rawTitle.length > MAX_TITLE_LENGTH
			? `${rawTitle.slice(0, MAX_TITLE_LENGTH - 1)}…`
			: rawTitle;

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px",
					background: "#11151a",
					color: "#eeeeee",
				}}
			>
				<div style={{ display: "flex", fontSize: 32, opacity: 0.7 }}>
					{new URL(SITE_URL).host}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: title.length > 60 ? 56 : 72,
						fontWeight: 700,
						lineHeight: 1.15,
						letterSpacing: "-0.02em",
					}}
				>
					{title}
				</div>
				<div style={{ display: "flex", fontSize: 28, opacity: 0.7 }}>
					{AUTHOR_NAME} · Software Engineer - AI/LLM Specialist
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			headers: {
				"Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
			},
		},
	);
}
