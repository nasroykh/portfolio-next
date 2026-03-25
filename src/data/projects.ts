export type ProjectCategory = "template" | "ai" | "saas" | "ecommerce" | "devtool";
export type ProjectStatus = "production" | "in-progress" | "archived";

export type TechItem = {
	name: string;
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type MetricItem = {
	label: string;
	before?: string;
	after: string;
};

export type CaseStudy = {
	headline: string;
	snapshot: {
		challenge: string;
		result: string;
	};
	situation: string;
	task: string;
	action: string[];
	results: MetricItem[];
	resultSummary: string;
};

export type ProjectItem = {
	id: string;
	title: string;
	whatItSolves: string;
	techStack: TechItem[];
	keyAchievement: string;
	codeUrl: string;
	faqs: FaqItem[];
	bootstrapCommand?: string;
	category: ProjectCategory;
	status: ProjectStatus;
	year: string;
	images?: string[];
	caseStudy: CaseStudy;
};

export const projects: ProjectItem[] = [
	{
		id: "website-template",
		title: "Website Template",
		whatItSolves:
			"A modern, high-performance Next.js website template built with focus on SEO, performance and developer experience.",
		techStack: [
			{ name: "Next.js" },
			{ name: "TypeScript" },
			{ name: "React" },
			{ name: "Tailwind CSS" },
			{ name: "Shadcn UI" },
			{ name: "Jotai" },
			{ name: "Motion" },
			{ name: "Docker" },
		],
		keyAchievement:
			"Reduced initial setup time from weeks to a few hours while keeping launch-ready quality checks consistent across new projects.",
		codeUrl: "https://github.com/nasroykh/website_template",
		bootstrapCommand: "npx foxmayn-cli website [directory]",
		category: "template",
		status: "production",
		year: "2024",
		images: [],
		faqs: [
			{
				question: "Who is this built for?",
				answer:
					"Frontend-heavy teams needing faster delivery of portfolio, marketing, and SaaS frontends without reinventing baseline tooling.",
			},
			{
				question: "What was the biggest bottleneck it solves?",
				answer:
					"It eliminated repetitive setup decisions and prevented inconsistent folder structure, linting, and deployment conventions across projects.",
			},
			{
				question: "How is quality preserved while being fast?",
				answer:
					"With standardized linting, format checks, and production-minded conventions at the template boundary before local launch.",
			},
		],
		caseStudy: {
			headline: "How a Single Template Cut Project Setup from Weeks to Hours",
			snapshot: {
				challenge:
					"Repetitive project scaffolding with inconsistent conventions",
				result:
					"Launch-ready projects in hours with 56 pre-built UI components",
			},
			situation:
				"Every new frontend project — whether a portfolio, marketing site, or SaaS landing page — required the same tedious setup: configuring Next.js with App Router, wiring Tailwind CSS, installing UI primitives, setting up SEO metadata generators, and writing Docker deployment configs. Each project started with days of boilerplate work, and across multiple projects, conventions drifted: folder structures diverged, linting rules varied, and deployment setups were inconsistent.",
			task: "Build a production-grade, opinionated starter template that eliminates repetitive setup decisions while enforcing consistent quality standards — so new projects start with the same architecture, linting, SEO tooling, and deployment pipeline from day one.",
			action: [
				"Architected the template on Next.js 16 with React 19 and TypeScript, using the App Router pattern for modern server/client component separation.",
				"Integrated 56 atomic UI components from shadcn/ui built on Radix primitives, providing accessible, composable building blocks out of the box.",
				"Added Jotai for lightweight atomic state management with persistent storage support, plus a pre-built shopping cart UI and Cmd+K command menu.",
				"Built comprehensive SEO infrastructure: dynamic sitemaps, robots.txt, JSON-LD structured data, and Open Graph metadata — all auto-generated from page data.",
				"Created multi-stage Docker builds optimized for Next.js standalone output (~150-200MB images), with non-root security hardening, health checks, and resource limits.",
				"Published as a one-command scaffold via npx foxmayn-cli, so new projects inherit the full stack instantly.",
			],
			results: [
				{ label: "Setup time", before: "1-2 weeks", after: "2-3 hours" },
				{ label: "Pre-built components", after: "56 UI components" },
				{ label: "Docker image size", after: "~150-200MB (optimized)" },
				{ label: "SEO tooling", after: "Sitemap + robots + JSON-LD + OG tags" },
			],
			resultSummary:
				"New projects now ship with consistent architecture, enforced code quality, complete SEO tooling, and production-ready Docker deployment — eliminating the setup drift that previously caused integration issues across projects.",
		},
	},
	{
		id: "app-template",
		title: "App Template",
		whatItSolves:
			"A comprehensive, type-safe full-stack web application starter kit built with a monorepo architecture.",
		techStack: [
			{ name: "Node.js" },
			{ name: "Hono" },
			{ name: "oRPC" },
			{ name: "TypeScript" },
			{ name: "React" },
			{ name: "Vite" },
			{ name: "Tanstack Query / Router" },
			{ name: "PostgreSQL" },
			{ name: "Drizzle ORM" },
			{ name: "Docker" },
			{ name: "Turborepo" },
			{ name: "Nodemailer" },
		],
		keyAchievement:
			"Reduced integration regressions by enforcing clear service boundaries and shared schema contracts across apps, APIs, and worker processes.",
		codeUrl: "https://github.com/nasroykh/app_template",
		bootstrapCommand: "npx foxmayn-cli app [directory]",
		category: "template",
		status: "production",
		year: "2024",
		images: [],
		faqs: [
			{
				question: "Why Turborepo?",
				answer:
					"It centralizes task orchestration and caching, making multi-package refactors and dependency updates safer across the stack.",
			},
			{
				question: "How does this improve developer reliability?",
				answer:
					"Consistent conventions and reproducible containers reduce divergence between local, CI, and production behavior.",
			},
			{
				question: "Is this team scalable?",
				answer:
					"Yes. Shared interfaces and explicit package boundaries minimize cognitive overhead when new engineers onboard into complex application lines.",
			},
		],
		caseStudy: {
			headline:
				"How a Monorepo Starter Kit Eliminated Integration Regressions Across Full-Stack Projects",
			snapshot: {
				challenge:
					"Type mismatches and integration failures between frontend, API, and database layers",
				result:
					"End-to-end type safety with shared schema contracts across the entire stack",
			},
			situation:
				"Building full-stack web applications from scratch meant juggling separate frontend and backend repos with no shared type contracts. API changes would silently break the frontend, database schema updates wouldn't propagate to the ORM layer, and authentication logic was re-implemented differently in every project. Each new project also required re-solving the same infrastructure problems: Docker setups, email services, database migrations, and CI orchestration.",
			task: "Create a monorepo starter kit that enforces end-to-end type safety from database to UI, with pre-configured authentication, email, and deployment infrastructure — so teams can start building features immediately instead of fighting integration issues.",
			action: [
				"Designed a Turborepo monorepo with clearly separated workspaces: apps/api (Hono backend), apps/app (React + Vite frontend), and packages/db (shared Drizzle ORM schemas and types).",
				"Implemented end-to-end type safety using oRPC, ensuring that API contracts are shared at compile time — a type change in the backend immediately surfaces as a TypeScript error in the frontend.",
				"Built robust authentication using Better Auth with email OTP, organization support, and admin roles, shared across the stack via the db package.",
				"Configured TanStack Router for type-safe file-based routing and TanStack Query for server state management, both wired to oRPC for seamless data fetching.",
				"Set up Drizzle ORM with PostgreSQL including migration tooling (generate, migrate, push) and Zod schema generation for runtime validation.",
				"Added multi-stage Docker builds, Nodemailer integration for transactional emails, and shared ESLint/TypeScript configs to enforce consistency.",
			],
			results: [
				{ label: "Type safety coverage", after: "End-to-end (DB → API → UI)" },
				{ label: "Auth system", after: "Email OTP + Orgs + Admin (pre-built)" },
				{
					label: "Integration regressions",
					before: "Frequent",
					after: "Caught at compile time",
				},
				{ label: "Codebase", after: "81% TypeScript" },
			],
			resultSummary:
				"Teams using this template start with a fully typed, production-ready stack where API changes are validated across the entire codebase at compile time — eliminating the class of integration bugs that previously only surfaced in staging or production.",
		},
	},
	{
		id: "foxmayn-ai",
		title: "Foxmayn AI",
		whatItSolves:
			"Foxmayn AI is a professional, full-stack application designed for managing knowledge bases through a complete RAG (Retrieval-Augmented Generation) pipeline. It provides a robust, type-safe architecture for indexing documents and generating AI responses with high precision.",
		techStack: [
			{ name: "PostgreSQL" },
			{ name: "Docker" },
			{ name: "RAG" },
			{ name: "Qdrant" },
			{ name: "Redis/BullMQ" },
			{ name: "OpenRouter" },
		],
		keyAchievement:
			"Reduced hallucinated outputs by adding retrieval checkpoints and reranking logic before final synthesis, increasing answer precision in enterprise use cases.",
		codeUrl: "https://github.com/nasroykh/foxmayn_ai",
		category: "ai",
		status: "production",
		year: "2025",
		images: [],
		faqs: [
			{
				question: "How are generated answers grounded?",
				answer:
					"Queries are routed through retrieval, reranking, and context injection before model completion, so results remain tied to source data.",
			},
			{
				question: "What safeguards are included?",
				answer:
					"Source-aware prompts and post-generation validation flow keep responses auditable and easier to monitor in production.",
			},
			{
				question: "What business outcome does this unlock?",
				answer:
					"It enables safe internal copilots and documentation agents while reducing time spent validating knowledge retrieval at scale.",
			},
		],
		caseStudy: {
			headline:
				"How a Full RAG Pipeline Reduced AI Hallucinations and Made Knowledge Retrieval Production-Safe",
			snapshot: {
				challenge:
					"LLM-generated answers untethered from source data, producing hallucinated outputs",
				result:
					"Grounded, auditable AI responses via retrieval checkpoints and reranking",
			},
			situation:
				"Organizations wanted to deploy internal AI assistants over their proprietary documents — knowledge bases, SOPs, product docs — but off-the-shelf LLMs hallucinated freely when asked domain-specific questions. Answers sounded authoritative but referenced non-existent policies or fabricated data points. Without retrieval grounding, these AI tools were liabilities rather than productivity gains, especially in enterprise contexts where wrong answers have real consequences.",
			task: "Build a complete RAG platform that retrieves, ranks, and injects the right source context before any LLM completion — so every generated answer is traceable back to actual documents and auditable in production.",
			action: [
				"Architected a monorepo with shared packages: @repo/db for Drizzle ORM models (Auth + RAG modules), @repo/llm for OpenRouter SDK chat and batch embeddings, and @repo/qdrant for high-performance vector storage.",
				"Built a multi-strategy RAG pipeline with customizable RAG Profiles — each profile defines retrieval parameters, reranking logic, and context window sizing for different use cases.",
				"Implemented BullMQ-powered background workers for document ingestion: parsing, chunking, embedding generation, and vector indexing happen asynchronously without blocking the API.",
				"Added multi-tenant authentication via Better Auth with API keys, organization scoping, and admin roles — so different teams can manage isolated knowledge bases.",
				"Built a React 19 frontend with TanStack Router and Jotai for real-time document management, RAG profile configuration, and conversational AI interaction.",
				"Designed the Hono API core to be serverless-adaptable, with ORPC ensuring end-to-end type safety across the entire stack.",
			],
			results: [
				{
					label: "Hallucination rate",
					before: "Uncontrolled",
					after: "Grounded via retrieval + reranking",
				},
				{ label: "Document ingestion", after: "Async via BullMQ workers" },
				{
					label: "Multi-tenancy",
					after: "Org-scoped knowledge bases with API keys",
				},
				{ label: "Codebase", after: "88% TypeScript, fully type-safe" },
			],
			resultSummary:
				"The platform enables safe deployment of internal copilots and documentation agents. Every AI response is traceable to source documents, making it suitable for enterprise environments where accuracy and auditability are non-negotiable.",
		},
	},
	{
		id: "foxmayn-frappe-cli",
		title: "ffc — Foxmayn Frappe CLI",
		whatItSolves:
			"Manage Frappe/ERPNext sites entirely from the terminal — CRUD operations, schema inspection, report execution, and RPC calls without touching the web UI. Built for automation, scripting, and CI/CD pipelines.",
		techStack: [
			{ name: "Go" },
			{ name: "Cobra" },
			{ name: "Frappe" },
			{ name: "goreleaser" },
		],
		keyAchievement:
			"Cross-platform CLI with one-liner installers, multiple output formats (table/JSON/YAML), and full Frappe document lifecycle coverage.",
		codeUrl: "https://github.com/nasroykh/foxmayn_frappe_cli",
		category: "devtool",
		status: "production",
		year: "2026",
		images: [],
		faqs: [
			{
				question: "Who is this for?",
				answer:
					"Frappe/ERPNext developers who want to automate site management, run scripts in CI/CD, or just avoid switching to the browser for routine operations.",
			},
			{
				question: "What output formats does it support?",
				answer:
					"Table (default), JSON, and YAML — so output can be piped directly into other tools or scripts.",
			},
			{
				question: "How is it installed?",
				answer:
					"One-liner install scripts for Linux and macOS, with cross-platform binaries published via goreleaser.",
			},
		],
		caseStudy: {
			headline:
				"How a Go CLI Brought Full Frappe/ERPNext Management to the Terminal",
			snapshot: {
				challenge:
					"Managing Frappe sites required constant browser context-switching",
				result:
					"Full CRUD, schema inspection, and report execution from the terminal",
			},
			situation:
				"Frappe/ERPNext developers spend significant time in the web UI for routine operations: creating documents, inspecting schemas, running reports, and executing server methods. This workflow breaks developer flow — every operation requires opening a browser, navigating menus, and clicking through forms. For automation and CI/CD scenarios, there was no scriptable interface to interact with Frappe sites programmatically.",
			task: "Build a minimal, cross-platform CLI that covers the full Frappe document lifecycle — from CRUD operations to schema introspection and report execution — with machine-readable output formats for scripting and automation.",
			action: [
				"Built the CLI in Go using Cobra for command structure, providing sub-commands for every Frappe document operation: get-doc, list-docs, create-doc, update-doc, delete-doc, and count-docs.",
				"Added schema introspection commands (list-doctypes, get-schema) so developers can explore DocType structures and field metadata without leaving the terminal.",
				"Implemented advanced operations: call-method for executing whitelisted server procedures, and list-reports/run-report for running Frappe reports with custom filters.",
				"Built an interactive TUI setup wizard and settings manager using Charmbracelet components, with support for multiple site profiles and configurable number/date formats.",
				"Added three output formats — table (with lipgloss formatting), JSON, and YAML — so output can be piped directly into jq, yq, or other automation tools.",
				"Published cross-platform binaries via goreleaser with one-liner install scripts for Linux, macOS, and Windows.",
			],
			results: [
				{
					label: "Operations covered",
					after: "Full CRUD + schema + reports + RPC",
				},
				{ label: "Output formats", after: "Table, JSON, YAML" },
				{ label: "Platforms", after: "Linux, macOS, Windows" },
				{ label: "Installation", after: "One-liner scripts + go install" },
			],
			resultSummary:
				"Frappe developers can now manage sites, automate document operations, and integrate Frappe into CI/CD pipelines without ever opening a browser — cutting context-switching and enabling scriptable workflows that were previously impossible.",
		},
	},
	{
		id: "foxmayn-frappe-manager",
		title: "ffm — Foxmayn Frappe Manager",
		whatItSolves:
			"Eliminates the friction of setting up local Frappe development environments by wrapping frappe_docker's devcontainer compose pattern into a single command — no manual YAML editing required.",
		techStack: [
			{ name: "Go" },
			{ name: "Docker Compose" },
			{ name: "MariaDB" },
			{ name: "Redis" },
			{ name: "Traefik" },
			{ name: "goreleaser" },
		],
		keyAchievement:
			"Spins up fully configured Frappe benches with smart port allocation, image caching for fast rebuilds, and automatic domain routing at <bench>.localhost via Traefik.",
		codeUrl: "https://github.com/nasroykh/foxmayn_frappe_manager",
		category: "devtool",
		status: "production",
		year: "2026",
		images: [],
		faqs: [
			{
				question: "What problem does this solve?",
				answer:
					"Setting up Frappe locally normally requires editing docker-compose YAML files manually. This wraps all of that into a single CLI command.",
			},
			{
				question: "How are multiple benches handled?",
				answer:
					"Smart port allocation prevents conflicts between benches, and each one gets its own subdomain routed automatically by Traefik.",
			},
			{
				question: "Is image caching built in?",
				answer:
					"Yes — subsequent bench creation reuses cached images, making startup significantly faster after the first run.",
			},
		],
		caseStudy: {
			headline:
				"How a Single Command Replaced Hours of Manual Frappe Environment Setup",
			snapshot: {
				challenge:
					"Manual Docker Compose YAML editing for each Frappe development bench",
				result:
					"Single-command bench creation with auto-routing and image caching",
			},
			situation:
				"Setting up a local Frappe/ERPNext development environment is notoriously painful. Developers must manually edit docker-compose YAML files, configure MariaDB and Redis connections, manage port allocations to avoid conflicts between benches, and set up reverse proxies for local domain routing. The official frappe_docker devcontainer approach works but requires significant Docker knowledge and manual configuration for each new bench.",
			task: "Wrap the entire Frappe bench lifecycle — creation, startup, shell access, app installation, and teardown — into a single CLI tool that handles Docker orchestration, port management, and domain routing automatically.",
			action: [
				"Built a Go CLI with commands for the full bench lifecycle: create, start, stop, shell, logs, delete — each generating and managing Docker Compose configurations automatically.",
				"Implemented smart port auto-allocation that scans for available ports across all benches, eliminating manual port conflict resolution.",
				"Added a shared Traefik reverse proxy that routes <bench>.localhost domains to the correct bench containers, so developers access each bench via clean URLs.",
				"Built Docker image layer caching: the first bench build downloads and configures the Frappe image, but subsequent benches with the same Frappe branch reuse cached layers — reducing creation time from minutes to seconds.",
				"Pre-configured the bench shell environment with zsh, zinit, starship prompt, syntax highlighting, and Go toolchain — plus automatic foxmayn-frappe-cli (ffc) installation for API-level management.",
				"Added multi-app installation support for both public apps (ERPNext, HRMS) and private repos via SSH/HTTPS, plus reverse proxy config generation for Caddy and Nginx.",
			],
			results: [
				{
					label: "Bench setup time",
					before: "30-60 minutes (manual)",
					after: "~2 minutes (single command)",
				},
				{
					label: "Subsequent bench creation",
					after: "Seconds (cached images)",
				},
				{
					label: "Port conflicts",
					before: "Manual resolution",
					after: "Auto-allocated",
				},
				{
					label: "Domain routing",
					after: "Auto via Traefik (<bench>.localhost)",
				},
			],
			resultSummary:
				"Frappe developers can now spin up isolated development environments in seconds, with automatic port management, domain routing, and a pre-configured shell — eliminating the Docker expertise barrier that previously made local Frappe development inaccessible to many teams.",
		},
	},
	{
		id: "jinja-template-renderer",
		title: "Jinja Template Renderer",
		whatItSolves:
			"Preview and iterate on Jinja2 templates without wiring up a real backend. It auto-extracts template variables via AST parsing and generates matching mock data automatically.",
		techStack: [
			{ name: "Python" },
			{ name: "Jinja2" },
			{ name: "AST parsing" },
			{ name: "Frappe" },
		],
		keyAchievement:
			"Live-reload template previewing with auto-generated contextual mock data including Frappe-specific DocMock objects, eliminating all manual test data setup.",
		codeUrl: "https://github.com/nasroykh/jinja_template_renderer",
		category: "template",
		status: "in-progress",
		year: "2026",
		images: [],
		faqs: [
			{
				question: "How does mock data generation work?",
				answer:
					"The tool parses the template's AST to extract all variable references, then auto-generates plausible mock values for each — no manual setup needed.",
			},
			{
				question: "What is DocMock?",
				answer:
					"A Frappe-aware mock object that simulates Frappe document fields and methods, useful for previewing report or print format templates.",
			},
			{
				question: "Who benefits from this?",
				answer:
					"Frappe developers building custom print formats or reports who need fast feedback without spinning up real documents.",
			},
		],
		caseStudy: {
			headline:
				"How AST-Powered Mock Generation Eliminated Manual Test Data for Jinja Templates",
			snapshot: {
				challenge:
					"Previewing Jinja templates required wiring up real backends or writing manual test data",
				result:
					"Instant live-reload previews with auto-generated mock data from AST parsing",
			},
			situation:
				"Frappe developers building custom print formats, email templates, and report layouts in Jinja2 had no way to preview their work without connecting to a real Frappe instance. Testing a template change meant creating real documents in the system, which was slow and cumbersome. Alternatively, developers would write manual JSON mock data files, but keeping them in sync with evolving templates was error-prone and tedious.",
			task: "Build a standalone renderer that automatically understands what data a Jinja template expects — and generates matching mock data on the fly — so developers can preview and iterate on templates instantly without any backend.",
			action: [
				"Built an AST parser that walks the Jinja2 template tree to extract all variable paths, iterable references, and loop variable mappings — using the actual parser, not fragile regex patterns.",
				"Implemented automatic mock data generation: the parser infers variable types from usage context and generates plausible values (strings, numbers, dates, lists) without manual configuration.",
				"Created DocMock, a Frappe-aware mock object that simulates Frappe document fields and methods, enabling realistic previews of print formats and report templates.",
				"Added a live-reload development server with file watching — changes to templates or data files trigger instant browser refresh via injected polling.",
				"Included French-locale number formatting support and JSON context export for debugging and sharing template data.",
			],
			results: [
				{
					label: "Template preview setup",
					before: "Real Frappe instance required",
					after: "Standalone, zero dependencies",
				},
				{
					label: "Mock data creation",
					before: "Manual JSON files",
					after: "Auto-generated from AST",
				},
				{ label: "Feedback loop", after: "Live-reload on file save" },
				{
					label: "Template features",
					after: "Includes, extends, macros, loops",
				},
			],
			resultSummary:
				"Frappe template developers now iterate on print formats and reports with instant visual feedback and zero backend dependencies — the tool understands what data each template needs and generates it automatically.",
		},
	},
	{
		id: "foxmayn-ai-cli",
		title: "Foxmayn AI CLI",
		whatItSolves:
			"A keyboard-driven terminal chat interface for multiple AI models via OpenRouter — no browser required, with streaming responses and Markdown rendering directly in the terminal.",
		techStack: [{ name: "Go" }, { name: "Bubble Tea" }, { name: "OpenRouter" }],
		keyAchievement:
			"Full TUI chat app with streaming Markdown-rendered responses, in-app model picker, and slash-command autocomplete supporting 7 models including Gemini, DeepSeek, and OpenAI variants.",
		codeUrl: "https://github.com/nasroykh/foxmayn_ai_cli",
		category: "ai",
		status: "in-progress",
		year: "2026",
		images: [],
		faqs: [
			{
				question: "Which models are supported?",
				answer:
					"7 models via OpenRouter including Gemini Flash, DeepSeek, and OpenAI variants — switchable with the in-app model picker.",
			},
			{
				question: "Why a TUI instead of a web app?",
				answer:
					"Stays in the terminal where developers already work — no context switching, full keyboard control, and no browser overhead.",
			},
			{
				question: "How are responses rendered?",
				answer:
					"Streamed in real time with Markdown rendering (code blocks, bold, lists) using Bubble Tea and Lip Gloss.",
			},
		],
		caseStudy: {
			headline:
				"How a Terminal-Native AI Chat Eliminated Browser Context-Switching for Developers",
			snapshot: {
				challenge:
					"Using AI assistants required leaving the terminal for web-based interfaces",
				result:
					"Full AI chat with streaming Markdown and 7 models — entirely in the terminal",
			},
			situation:
				"Developers who live in the terminal had to break their workflow every time they needed to interact with an AI assistant. Web-based chat interfaces (ChatGPT, Claude, etc.) require opening a browser, navigating to the app, and context-switching away from the code they're working on. For quick questions, code reviews, or brainstorming, this overhead adds up — and copy-pasting between terminal and browser strips formatting and context.",
			task: "Build a full-featured terminal chat application that brings multi-model AI conversations directly into the developer's existing workflow — with proper Markdown rendering, streaming responses, and no browser dependency.",
			action: [
				"Built an alt-screen TUI application in Go using Bubble Tea (Elm architecture) with a scrollable viewport, text input, and real-time streaming display.",
				"Integrated OpenRouter's API for multi-model support: 7 models including Google Gemini, DeepSeek, Grok, and OpenAI variants — switchable via an in-app /model picker.",
				"Implemented streaming response rendering with full Markdown support: code blocks, bold, italic, lists, and headers — all formatted with Lip Gloss directly in the terminal.",
				"Added slash-command autocomplete (/model, /clear, /quit) for quick actions without leaving the conversation flow.",
				"Configured hot-reload development via watchexec and simple .env-based API key management.",
			],
			results: [
				{
					label: "Supported models",
					after: "7 (Gemini, DeepSeek, Grok, OpenAI)",
				},
				{
					label: "Response rendering",
					after: "Streaming Markdown in terminal",
				},
				{
					label: "Context switching",
					before: "Terminal → Browser → Terminal",
					after: "Never leaves terminal",
				},
				{ label: "Built with", after: "Go + Bubble Tea (Elm architecture)" },
			],
			resultSummary:
				"Developers can now chat with multiple AI models without leaving the terminal. Streaming Markdown rendering, in-app model switching, and slash commands keep the entire AI workflow within the same context where code is being written.",
		},
	},
];
