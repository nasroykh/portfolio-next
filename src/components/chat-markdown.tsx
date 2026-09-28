"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMarkdown({ children }: { children: string }) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
			}}
		>
			{children}
		</ReactMarkdown>
	);
}
