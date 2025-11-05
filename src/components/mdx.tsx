import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import {
	Table as TableUI,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";
import remarkGfm from "remark-gfm";
import { Checkbox } from "./ui/checkbox";
import { CodeBlock } from "./code-block";

function CustomLink(props: React.ComponentProps<typeof Link>) {
	const href = props.href.toString();

	if (href.startsWith("/")) {
		return (
			<Link {...props} href={href}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} href={href} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} href={href} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
	return <Image {...props} className="rounded-lg" alt={props.alt || ""} />;
}

function Code({ children, ...props }: React.ComponentProps<"code">) {
	const codeText = children as string;
	const isCodeBlock = props.className?.startsWith("language-");

	// Code blocks get the full CodeBlock component with header
	if (isCodeBlock) {
		return <CodeBlock className={props.className}>{codeText}</CodeBlock>;
	}

	// Inline code gets simple highlighting
	const codeHTML = highlight(codeText);
	return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />;
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/&/g, "-and-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
	const Heading = ({ children }: { children: React.ReactNode }) => {
		const slug = slugify(children as string);
		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
}

const components: MDXRemoteProps["components"] = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
	table: TableUI,
	th: TableHead,
	td: TableCell,
	tr: TableRow,
	tbody: TableBody,
	thead: TableHeader,
	caption: TableCaption,
	input: (props: React.ComponentProps<typeof Checkbox>) => (
		<Checkbox {...props} disabled={false} />
	),
};

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
			components={{ ...components, ...(props.components || {}) }}
		/>
	);
}
