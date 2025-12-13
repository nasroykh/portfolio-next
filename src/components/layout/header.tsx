"use client";

import Link from "next/link";
import { SettingsDropdown } from "../settings-dropdown";
import { Logo } from "../logo";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export const NAV_ITEMS = [
	{
		name: "home",
		path: "/",
	},
	{
		name: "about",
		path: "/about",
	},
	{
		name: "experience",
		path: "/experience",
	},
	{
		name: "blog",
		path: "/blog",
	},
	{
		name: "contact",
		path: "/contact",
	},
	{
		name: "resume",
		path: "/resume",
	},
] as const;

function MenuIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	);
}

export function Header({
	activePath,
}: {
	activePath?: (typeof NAV_ITEMS)[number]["name"];
}) {
	const [open, setOpen] = useState(false);
	const t = useTranslations("nav");

	return (
		<header className="py-4 sticky top-0 bg-background z-50">
			<nav className="flex flex-row items-center justify-between" id="nav">
				<Link
					href="/"
					className="size-10 sm:size-12 flex items-center justify-center shrink-0"
					aria-label="Home"
				>
					<Logo />
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex flex-row tracking-tight">
					{NAV_ITEMS.map(({ name, path }) => {
						const isActive = activePath === name;
						return (
							<Link
								key={path}
								href={path}
								className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
									isActive
										? "text-neutral-800 dark:text-neutral-200"
										: "text-neutral-500 dark:text-neutral-400"
								}`}
							>
								{t(name)}
							</Link>
						);
					})}
				</div>

				{/* Settings & Mobile Menu */}
				<div className="flex items-center gap-2 shrink-0">
					<SettingsDropdown />

					{/* Mobile Controls */}
					<div className="flex md:hidden items-center gap-0">
						<Sheet open={open} onOpenChange={setOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="size-9"
									aria-label="Open menu"
								>
									<MenuIcon />
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[280px] sm:w-[320px] px-4 py-16"
							>
								<div className="flex flex-col gap-4">
									{NAV_ITEMS.map(({ name, path }) => {
										const isActive = activePath === name;
										return (
											<Link
												key={path}
												href={path}
												onClick={() => setOpen(false)}
												className={`text-lg py-2 px-4 rounded-md transition-all ${
													isActive
														? "text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800"
														: "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
												}`}
											>
												{t(name)}
											</Link>
										);
									})}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</header>
	);
}
