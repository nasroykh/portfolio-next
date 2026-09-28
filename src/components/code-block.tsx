"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

type CodeBlockProps = {
	code: string;
	/** Pre-highlighted HTML produced on the server */
	html: string;
	language: string;
	className?: string;
};

export function CodeBlock({ code, html, language, className }: CodeBlockProps) {
	const t = useTranslations("codeBlock");
	const { copied, copy } = useCopyToClipboard();

	return (
		<>
			<div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
				<span className="text-xs font-medium text-muted-foreground">
					{language}
				</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => copy(code)}
					className="h-7 px-2 text-xs"
					aria-live="polite"
				>
					{copied ? (
						<>
							<Check className="me-1 h-3 w-3" aria-hidden />
							{t("copied")}
						</>
					) : (
						<>
							<Copy className="me-1 h-3 w-3" aria-hidden />
							{t("copy")}
						</>
					)}
				</Button>
			</div>
			<div className="overflow-x-auto p-2 px-3">
				<code
					className={cn("code-block", className)}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</>
	);
}
