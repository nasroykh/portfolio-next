# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Next.js with Turbopack)
pnpm build        # Production build
pnpm lint         # ESLint (next/core-web-vitals + typescript)
```

No test framework is configured.

## Architecture

This is a **Next.js 16** portfolio site using the App Router, React 19, Tailwind CSS 4, and `next-intl` for i18n.

### Internationalization

- Cookie-based locale detection (no route prefixes) via `next-intl`
- Locale stored in a `locale` cookie; defaults to `en`
- Supported locales: `en`, `fr` — config in `src/i18n/request.ts`
- Translation JSON files in `messages/{en,fr}.json`
- Server components: `getTranslations()` / Client components: `useTranslations()`

### Layout & Routing

- Shared layout wrapper: `src/components/layout/layout.tsx` (Header + Footer + AIAssistant)
- Pages pass `activePath` prop to `<Layout>` to highlight active nav item
- Nav items defined in `src/components/layout/header.tsx` (`NAV_ITEMS` array)
- Pages: `/`, `/about`, `/experience`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/resume`

### Projects & Case Studies

- Project data and types defined in `src/data/projects.ts`
- Types: `ProjectItem`, `CaseStudy`, `MetricItem`, `FaqItem`, `TechItem`
- Categories: `template`, `ai`, `saas`, `ecommerce`, `devtool`
- Project listing page: `src/app/projects/page.tsx` with `ProjectsExplorer` client component
- Dynamic case study pages: `src/app/projects/[slug]/page.tsx` — STAR framework (Situation, Task, Action, Results)
- Case study data is embedded in each `ProjectItem` via the `caseStudy` field
- `src/components/projects-section.tsx` re-exports types for backwards compatibility

### Blog System

- MDX files in `src/app/blog/posts/`; files prefixed with `_draft_` are excluded
- Parsed with `gray-matter` at build time via `src/app/blog/utils.ts`
- Rendered with `next-mdx-remote` in `src/components/mdx.tsx`

### AI Assistant (RAG)

- Chat API at `src/app/api/route.ts` — streaming responses via OpenRouter (Gemini Flash Lite)
- RAG pipeline: prompt enhancement -> keyword search against Qdrant vectors -> augmented system prompt
- DB initialization endpoint at `src/app/api/init-db/route.ts`
- Vector store: Qdrant (`@qdrant/js-client-rest`), embeddings via OpenRouter
- Client component: `src/components/ai-assistant.tsx`

### UI Components

- shadcn/ui components in `src/components/ui/` (Radix primitives + CVA + tailwind-merge)
- Utility: `cn()` from `src/lib/utils.ts`
- Fonts: Nova Square (`--font-nova`) and League Spartan (`--font-league`)
- Dark theme by default via `next-themes`

### Path Aliases

`@/*` maps to `./src/*`
