import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { lang as toSugarHighLang } from "sugar-high/lang";
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
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Checkbox } from "./ui/checkbox";
import { CodeBlock } from "./code-block";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

const LANGUAGE_MAP: Record<string, string> = {
	js: "JavaScript",
	jsx: "JavaScript",
	ts: "TypeScript",
	tsx: "TypeScript",
	python: "Python",
	py: "Python",
	html: "HTML",
	css: "CSS",
	scss: "SCSS",
	json: "JSON",
	md: "Markdown",
	markdown: "Markdown",
	bash: "Bash",
	sh: "Shell",
	yaml: "YAML",
	yml: "YAML",
	sql: "SQL",
	go: "Go",
	rust: "Rust",
	java: "Java",
	cpp: "C++",
	c: "C",
	php: "PHP",
	ruby: "Ruby",
	swift: "Swift",
	kotlin: "Kotlin",
};

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

const toText = (children: React.ReactNode): string =>
	React.Children.toArray(children)
		.map((child) => (typeof child === "string" ? child : ""))
		.join("");

function Code({ children, className, ...props }: React.ComponentProps<"code">) {
	// Posts checked out on Windows can have CRLF endings, which render as blank lines
	const codeText = toText(children).replace(/\r\n?/g, "\n");

	// Fenced blocks get the header + copy button; highlighting stays on the server
	if (className?.startsWith("language-")) {
		const code = codeText.trim();
		const lang = className.replace("language-", "");
		return (
			<CodeBlock
				className={className}
				code={code}
				html={highlight(code, { lang: toSugarHighLang(lang) })}
				language={LANGUAGE_MAP[lang.toLowerCase()] ?? lang.toUpperCase()}
			/>
		);
	}

	return (
		<code
			{...props}
			className={className}
			dangerouslySetInnerHTML={{ __html: highlight(codeText) }}
		/>
	);
}

const components: MDXRemoteProps["components"] = {
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
	// GFM task-list items are static content, not form controls
	input: (props: React.ComponentProps<typeof Checkbox>) => (
		<Checkbox {...props} disabled aria-readonly />
	),
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
};

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [
						rehypeSlug,
						[
							rehypeAutolinkHeadings,
							{
								properties: {
									className: ["anchor"],
									ariaHidden: true,
									tabIndex: -1,
								},
							},
						],
					],
				},
			}}
			components={{ ...components, ...(props.components || {}) }}
		/>
	);
}
