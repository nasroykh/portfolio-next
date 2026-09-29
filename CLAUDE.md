# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js with Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint (next/core-web-vitals + typescript)
pnpm test         # Unit tests (vitest, tests/unit): rate limit, dates, SEO helpers, translation key parity
pnpm test:e2e     # Smoke tests (Playwright, tests/e2e) against a production build: run `pnpm build` first
```

Before shipping: `pnpm lint && npx tsc --noEmit && pnpm test && pnpm build && pnpm test:e2e`. The e2e tests use the locally installed Chrome (`channel: "chrome"`), no Playwright browser download needed; the chat test mocks `/api`, so no OpenRouter key is required.

## Architecture

This is a **Next.js 16** portfolio site using the App Router, React 19, Tailwind CSS 4, and `next-intl` for i18n.

### Internationalization

- Locale-prefixed routes via `next-intl` routing (`localePrefix: "as-needed"`): English at `/about`, other locales prefixed (`/fr/about`, `/ar/about`, `/es/about`); `/en/...` redirects to the unprefixed URL. Locales: `en`, `fr`, `ar` (right-to-left), `es`
- All pages live under `src/app/[locale]/` and are statically generated: every page and layout must call `setRequestLocale(locale)` before using next-intl
- `src/proxy.ts` (Next 16 middleware) handles detection and redirects: `locale` cookie first, then `Accept-Language`; it skips `/api`, `/og` and files with an extension
- Config: locales, native names, OG codes and `getDirection()` (RTL-ready) in `src/i18n/config.ts`; routing in `src/i18n/routing.ts`; request config in `src/i18n/request.ts`
- ALWAYS import `Link`, `usePathname`, `useRouter`, `redirect` from `@/i18n/navigation`, not from `next/link` / `next/navigation`
- Translation JSON files in `messages/{en,fr,ar,es}.json` (page titles/descriptions in the `meta` namespace); keep all files at the same keys and placeholders
- Right-to-left (Arabic): `<html dir>` comes from `getDirection()`, Radix and the carousel get it through `DirectionProvider`. Use logical Tailwind classes only (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`/`border-s`/`text-start`), never `ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-` (except centering with `left-1/2 -translate-x-1/2`). Directional icons (arrows, chevrons) get `rtl:-scale-x-100`. English-only content (posts, case studies, project cards) gets `dir="auto"` / `dir="ltr"` so it stays left-to-right inside Arabic pages
- Server components: `getTranslations()` / Client components: `useTranslations()`
- Adding a locale: add it to `locales`, `LOCALE_NAMES` and `OG_LOCALES` in `src/i18n/config.ts` and create `messages/<locale>.json`

### Layout & Routing

- Shared layout wrapper: `src/components/layout/layout.tsx` (Header + Footer); the Header derives the active nav item from `usePathname()`
- `src/app/[locale]/layout.tsx` is the root layout (`<html lang dir>`, fonts, providers); `AIAssistant` is mounted once there so the chat survives client-side navigation
- Site-wide constants (URL, author, social links, OG helper) live in `src/lib/site.ts` — never hardcode the domain
- Each page builds its metadata with `pageMetadata()` / `localeAlternates()` from `src/lib/site.ts` (canonical + hreflang). Blog posts and case studies are English only, so they pass `translated: false` and every locale points its canonical at the English URL; `/og?title=` (`src/app/og/route.tsx`) renders fallback OG images, only for titles of real posts and case studies (anything else gets the default card)
- Nav items defined in `src/components/layout/header.tsx` (`NAV_ITEMS` array)
- Unknown paths hit `src/app/[locale]/[...rest]/page.tsx` and render the localized `src/app/[locale]/not-found.tsx`; runtime errors render the localized `src/app/[locale]/error.tsx` (client component, so everything in `Layout` must stay non-async — `Footer` uses `useTranslations`), and `src/app/global-error.tsx` covers failures of the root layout itself
- Pages (each also under `/fr`, `/ar`, `/es`): `/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/resume`

### Projects & Case Studies

- Project data and types defined in `src/data/projects.ts`
- Types: `ProjectItem`, `CaseStudy`, `MetricItem`, `FaqItem`, `TechItem`
- Categories: `template`, `ai`, `saas`, `ecommerce`, `devtool`
- Project listing page: `src/app/[locale]/projects/page.tsx` with `ProjectsExplorer` client component
- Dynamic case study pages: `src/app/[locale]/projects/[slug]/page.tsx` — STAR framework (Situation, Task, Action, Results)
- Case study data is embedded in each `ProjectItem` via the `caseStudy` field
- `ProjectsExplorer` receives `ProjectSummary[]` (`toProjectSummary`) from the server page so case-study content is not shipped to the client

### Blog System

- MDX files in `src/content/blog/`; files prefixed with `_draft_` are excluded
- Parsed with `gray-matter` via `src/lib/blog.ts` (`getBlogPosts()` is sorted newest-first and memoized per request; dates formatted with `Intl` in the active locale)
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
- Fonts: Nova Square (headings) and League Spartan (body / `font-sans`), with Noto Kufi Arabic / IBM Plex Sans Arabic for Arabic glyphs. The stacks are built in `src/app/[locale]/layout.tsx` (`--font-display-stack`, `--font-sans-stack`) as "Latin face, Arabic face, fallbacks" because next/font puts an Arial fallback (which has Arabic glyphs) right after each font; `font-mono` is the system monospace stack
- `@tailwindcss/typography` is NOT installed: `.prose` is styled by hand in `globals.css`, so `prose-*` modifier classes do nothing
- Animations use `motion` (`import { motion } from "motion/react"`)
- Dark theme by default via `next-themes`

### Path Aliases

`@/*` maps to `./src/*`
