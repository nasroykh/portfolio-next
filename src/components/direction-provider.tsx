"use client";

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

/** Tells Radix primitives (menus, sheet) and the carousel whether the page is right-to-left. */
export function DirectionProvider({
	dir,
	children,
}: {
	dir: "ltr" | "rtl";
	children: React.ReactNode;
}) {
	return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
