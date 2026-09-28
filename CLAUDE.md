# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js with Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint (next/core-web-vitals + typescript)
```

No test framework is configured. Lint/type-check before shipping: `pnpm lint && npx tsc --noEmit`.

## Architecture

This is a **Next.js 16** portfolio site using the App Router, React 19, Tailwind CSS 4, and `next-intl` for i18n.

### Internationalization

- Cookie-based locale detection (no route prefixes) via `next-intl`
- Locale stored in a `locale` cookie; defaults to `en`
- Supported locales: `en`, `fr` — constants in `src/i18n/config.ts` (client-safe), request config in `src/i18n/request.ts` (unknown cookie values fall back to `en`)
- Translation JSON files in `messages/{en,fr}.json`
- Server components: `getTranslations()` / Client components: `useTranslations()`

### Layout & Routing

- Shared layout wrapper: `src/components/layout/layout.tsx` (Header + Footer); the Header derives the active nav item from `usePathname()`
- `AIAssistant` is mounted once in `src/app/layout.tsx` so the chat survives client-side navigation
- Site-wide constants (URL, author, social links, OG helper) live in `src/lib/site.ts` — never hardcode the domain
- Each page sets its own `alternates.canonical`; `/og?title=` (`src/app/og/route.tsx`) renders fallback OG images
- Nav items defined in `src/components/layout/header.tsx` (`NAV_ITEMS` array)
- Pages: `/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/resume`

### Projects & Case Studies

- Project data and types defined in `src/data/projects.ts`
- Types: `ProjectItem`, `CaseStudy`, `MetricItem`, `FaqItem`, `TechItem`
- Categories: `template`, `ai`, `saas`, `ecommerce`, `devtool`
- Project listing page: `src/app/projects/page.tsx` with `ProjectsExplorer` client component
- Dynamic case study pages: `src/app/projects/[slug]/page.tsx` — STAR framework (Situation, Task, Action, Results)
- Case study data is embedded in each `ProjectItem` via the `caseStudy` field
- `ProjectsExplorer` receives `ProjectSummary[]` (`toProjectSummary`) from the server page so case-study content is not shipped to the client

### Blog System

- MDX files in `src/app/blog/posts/`; files prefixed with `_draft_` are excluded
- Parsed with `gray-matter` via `src/app/blog/utils.ts` (`getBlogPosts()` is sorted newest-first and memoized per request; dates formatted with `Intl` in the active locale)
- Code blocks are highlighted on the server with `sugar-high`; `CodeBlock` is a client component only for the copy button
- Rendered with `next-mdx-remote` in `src/components/mdx.tsx`

### AI Assistant (RAG)

- Chat API at `src/app/api/route.ts` — zod-validated body (only `user`/`assistant` roles), in-memory rate limit, NDJSON streaming via OpenRouter (Gemini Flash Lite); limits shared with the UI in `src/lib/chat.ts`
- RAG pipeline: prompt enhancement -> keyword search against Qdrant vectors -> augmented system prompt
- DB initialization endpoint at `src/app/api/init-db/route.ts` — `POST` only, requires `Authorization: Bearer $INIT_DB_SECRET`; re-embeds `NAS.md`
- Vector store: Qdrant (`@qdrant/js-client-rest`, `QDRANT_URL`/`QDRANT_API_KEY`), embeddings via OpenRouter
- Env vars: see `.env.example`
- Client component: `src/components/ai-assistant.tsx`

### UI Components

- shadcn/ui components in `src/components/ui/` (Radix primitives + CVA + tailwind-merge)
- Utility: `cn()` from `src/lib/utils.ts`
- Fonts: Nova Square (`--font-nova`, headings) and League Spartan (`--font-league`, body / `font-sans`); `font-mono` is the system monospace stack
- `@tailwindcss/typography` is NOT installed: `.prose` is styled by hand in `globals.css`, so `prose-*` modifier classes do nothing
- Animations use `motion` (`import { motion } from "motion/react"`)
- Dark theme by default via `next-themes`

### Path Aliases

`@/*` maps to `./src/*`
