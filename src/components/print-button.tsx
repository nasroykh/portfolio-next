"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";

export function PrintButton({ label }: { label: string }) {
	return (
		<Button onClick={() => window.print()} className="gap-2">
			<Download className="w-4 h-4" aria-hidden />
			{label}
		</Button>
	);
}
