"use client";

import React from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { highlight } from "sugar-high";

interface CodeBlockProps {
	children: string;
	language?: string;
	className?: string;
}

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

export function CodeBlock({ children, language, className }: CodeBlockProps) {
	const [copied, setCopied] = React.useState(false);
	const codeText = children.trim();
	const codeHTML = highlight(codeText);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(codeText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Extract language from className (e.g., "language-typescript")
	const lang = language || className?.replace("language-", "") || "text";
	const displayLanguage =
		LANGUAGE_MAP[lang.toLowerCase()] || lang.toUpperCase();

	return (
		<>
			{/* Header */}
			<div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
				<span className="text-xs font-medium text-muted-foreground">
					{displayLanguage}
				</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="h-7 px-2 text-xs"
				>
					{copied ? (
						<>
							<Check className="mr-1 h-3 w-3" />
							Copied
						</>
					) : (
						<>
							<Copy className="mr-1 h-3 w-3" />
							Copy
						</>
					)}
				</Button>
			</div>
			{/* Code Content */}
			<div className="overflow-x-auto p-2 px-3">
				<code
					className={className}
					dangerouslySetInnerHTML={{ __html: codeHTML }}
				/>
			</div>
		</>
	);
}
