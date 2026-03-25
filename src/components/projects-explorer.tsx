"use client";

import { useState, useMemo } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
	Search,
	Terminal,
	ChevronRight,
	FilterX,
	Check,
} from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CardAction,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

import { useTranslations } from "next-intl";
import { projects, ProjectItem, ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./ui/tooltip-wrapper";

const ITEMS_PER_PAGE = 4;

const CATEGORIES: { labelKey: string; value: ProjectCategory | "all" }[] = [
	{ labelKey: "filterAll", value: "all" },
	{ labelKey: "filterTemplates", value: "template" },
	{ labelKey: "filterAI", value: "ai" },
	{ labelKey: "filterSaaS", value: "saas" },
	{ labelKey: "filterDevtools", value: "devtool" },
	{ labelKey: "filterEcommerce", value: "ecommerce" },
];

export function ProjectsExplorer() {
	const t = useTranslations("projects");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
		"all",
	);
	const [currentPage, setCurrentPage] = useState(1);

	const populatedCategories = useMemo(() => {
		const counts = new Map<ProjectCategory | "all", number>();
		counts.set("all", projects.length);
		for (const project of projects) {
			counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
		}
		return CATEGORIES.filter((cat) => (counts.get(cat.value) ?? 0) > 0);
	}, []);

	const filteredProjects = useMemo(() => {
		const q = searchQuery.toLowerCase();
		return projects.filter((project) => {
			const matchesSearch =
				project.title.toLowerCase().includes(q) ||
				project.whatItSolves.toLowerCase().includes(q) ||
				project.techStack.some((tech) => tech.name.toLowerCase().includes(q));

			const matchesCategory =
				activeCategory === "all" || project.category === activeCategory;

			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, activeCategory]);

	const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
	const paginatedProjects = filteredProjects.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleCategoryChange = (category: ProjectCategory | "all") => {
		setActiveCategory(category);
		setCurrentPage(1);
	};

	const clearFilters = () => {
		setSearchQuery("");
		setActiveCategory("all");
		setCurrentPage(1);
	};

	return (
		<div className="space-y-8 py-4">
			{/* Search and Filters */}
			<div className="flex flex-col gap-6">
				<div className="relative group">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
					<Input
						placeholder={t("searchPlaceholder")}
						className="pl-10 h-11 bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 focus-visible:ring-primary/20"
						value={searchQuery}
						onChange={handleSearch}
					/>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					{populatedCategories.map((cat) => (
						<button
							key={cat.value}
							onClick={() => handleCategoryChange(cat.value)}
							className={cn(
								"px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
								activeCategory === cat.value
									? "bg-primary text-primary-foreground border-primary shadow-sm"
									: "bg-background text-muted-foreground border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:text-foreground",
							)}
						>
							{t(cat.labelKey)}
						</button>
					))}

					<div className="ml-auto text-xs text-muted-foreground font-mono">
						{t("resultsCount", {
							count: filteredProjects.length,
							total: projects.length,
						})}
					</div>
				</div>
			</div>

			{/* Project Grid */}
			<AnimatePresence mode="popLayout">
				{filteredProjects.length > 0 ? (
					<motion.div
						layout
						className="grid grid-cols-1 md:grid-cols-2 items-start gap-6"
					>
						{paginatedProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.3,
									delay: index * 0.05,
									ease: [0.23, 1, 0.32, 1],
								}}
								layout
							>
								<ProjectCard project={project} />
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Empty className="py-12">
							<EmptyMedia variant="icon">
								<FilterX className="size-6 text-muted-foreground" />
							</EmptyMedia>
							<EmptyHeader>
								<EmptyTitle>{t("noResults")}</EmptyTitle>
								<EmptyDescription>{t("noResultsHint")}</EmptyDescription>
							</EmptyHeader>
							<Button variant="outline" onClick={clearFilters} className="mt-4">
								{t("clearFilters")}
							</Button>
						</Empty>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Pagination */}
			{totalPages > 1 && (
				<Pagination className="mt-8">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								className={cn(
									"cursor-pointer",
									currentPage === 1 && "pointer-events-none opacity-50",
								)}
							/>
						</PaginationItem>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={currentPage === page}
									onClick={() => setCurrentPage(page)}
									className="cursor-pointer"
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								className={cn(
									"cursor-pointer",
									currentPage === totalPages &&
										"pointer-events-none opacity-50",
								)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
}

function ProjectCard({ project }: { project: ProjectItem }) {
	const t = useTranslations("projects");
	const { copied, copy } = useCopyToClipboard();

	return (
		<Card
			id={project.id}
			className="h-full p-0 flex flex-col group hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-card/40 backdrop-blur-sm overflow-hidden"
		>
			{project.images && project.images.length > 0 && (
				<div className="relative border-b border-neutral-100 dark:border-neutral-800">
					<Carousel
						className="w-full"
						aria-label={`${project.title} screenshots`}
					>
						<CarouselContent>
							{project.images.map((image, i) => (
								<CarouselItem key={i}>
									<AspectRatio ratio={16 / 9}>
										<Image
											src={image}
											alt={t("imageAlt", {
												title: project.title,
												index: i + 1,
											})}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
										/>
									</AspectRatio>
								</CarouselItem>
							))}
						</CarouselContent>
						{project.images.length > 1 && (
							<>
								<CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm size-8" />
								<CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm size-8" />
							</>
						)}
					</Carousel>
				</div>
			)}

			<CardHeader>
				<div className="flex items-start justify-between pt-6">
					<div className="space-y-1">
						<CardTitle className="text-xl group-hover:text-primary transition-colors">
							{project.title}
						</CardTitle>
						<CardDescription className="text-xs font-mono">
							{project.category.toUpperCase()}
						</CardDescription>
					</div>
					<CardAction>
						<Button
							variant="secondary"
							size="icon"
							className="size-8 rounded-full"
							asChild
						>
							<Link href={`/projects/${project.id}`}>
								<ChevronRight className="size-4" />
								<span className="sr-only">{t("projectDetails")}</span>
							</Link>
						</Button>
					</CardAction>
				</div>
			</CardHeader>

			<CardContent className="flex-1 space-y-4">
				<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
					{project.whatItSolves}
				</p>

				<div className="flex flex-wrap gap-2">
					{project.techStack.map((tech) => (
						<Badge
							key={tech.name}
							variant="secondary"
							className="text-[10px] bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-none px-2 py-0"
						>
							{tech.name}
						</Badge>
					))}
				</div>
			</CardContent>

			<CardFooter className="pt-2 pb-6 flex flex-col gap-3">
				<div className="w-full h-px bg-neutral-100 dark:bg-neutral-800 mb-1" />
				<div className="flex items-center justify-between w-full">
					<div className="flex gap-2">
						<Button
							size="sm"
							variant="outline"
							className="h-8 text-xs gap-2 rounded-md"
							asChild
						>
							<a href={project.codeUrl} target="_blank" rel="noreferrer">
								<IconBrandGithub className="size-3.5" />
								{t("viewCode")}
							</a>
						</Button>
						{project.bootstrapCommand && (
							<TooltipWrapper content={project.bootstrapCommand}>
								<Button
									size="sm"
									variant="secondary"
									className="h-8 text-[10px] font-mono gap-2 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer"
									onClick={() =>
										project.bootstrapCommand && copy(project.bootstrapCommand)
									}
								>
									{copied ? (
										<Check className="size-3 text-emerald-500" />
									) : (
										<Terminal className="size-3" />
									)}
									{copied ? t("copied") : t("bootstrap")}
								</Button>
							</TooltipWrapper>
						)}
					</div>

					<Button
						size="sm"
						variant="ghost"
						className="h-8 px-2 text-primary hover:bg-primary/5 hover:text-primary rounded-md group/link"
						asChild
					>
						<Link
							href={`/projects/${project.id}`}
							className="flex items-center gap-1.5"
						>
							<span className="text-xs">{t("caseStudy")}</span>
							<ChevronRight className="size-3 group-hover/link:translate-x-0.5 transition-transform" />
						</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
