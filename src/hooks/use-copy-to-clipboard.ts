import { useState, useEffect, useRef } from "react";

export function useCopyToClipboard(resetAfterMs = 2000) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const copy = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
		});
	};

	return { copied, copy };
}
