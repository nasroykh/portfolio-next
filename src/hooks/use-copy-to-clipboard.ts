import { useState, useEffect, useRef } from "react";

export function useCopyToClipboard(resetAfterMs = 2000) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	/** Resolves to false when the Clipboard API is unavailable or permission is denied. */
	const copy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			return false;
		}

		setCopied(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
		return true;
	};

	return { copied, copy };
}
