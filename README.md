# Project: portfolio_next

## Overview

A Next.js 16 portfolio application featuring project case studies, a blog, professional experience, and an interactive AI assistant. Built with the App Router, TypeScript, Tailwind CSS 4, and full i18n support (English/French).

## Tech Stack

- **Framework**: Next.js 16.3 / React 19.3
- **Language**: TypeScript 6.0
- **Styling**: Tailwind CSS 4
- **UI Library**: Radix UI primitives (via shadcn/ui) + CVA + tailwind-merge
- **Animations**: Motion, tw-animate-css
- **Content Management**: MDX (next-mdx-remote), gray-matter
- **AI Integration**: OpenRouter (openai SDK), LangChain text splitter, Qdrant vector search
- **i18n**: next-intl (cookie-based, `en`/`fr`)
- **Icons**: Lucide React, Tabler Icons
- **Theming**: next-themes (dark mode default)

## Directory Structure

- **`src/app`**: App Router pages and API routes.
  - `/projects`: Project listing with filterable explorer.
  - `/projects/[slug]`: Dynamic case study pages (STAR framework).
  - `/blog`, `/blog/[slug]`: Blog listing and MDX post pages.
  - `/about`, `/contact`, `/experience`, `/resume`: Content pages.
  - `/api`: AI chat API and vector DB initialization.
- **`src/data`**: Typed project data with case study content (`projects.ts`).
- **`src/components`**: React components.
  - `ui/`: shadcn/ui base components (only the ones in use; add more with `pnpm dlx shadcn@latest add <name>`).
  - `projects-explorer.tsx`: Client-side project filtering, search, and pagination.
  - `ai-assistant.tsx`: AI chat interface component.
  - `mdx.tsx`: MDX component mapping.
  - `layout/`: Shared layout (Header, Footer).
- **`src/lib`**: `cn` class merging, site constants (`site.ts`), shared chat limits (`chat.ts`).
- **`src/hooks`**: Custom React hooks (`use-copy-to-clipboard`).
- **`src/i18n`**: Internationalization config.
- **`messages/`**: Translation files (`en.json`, `fr.json`).

## Key Features

- **Project Case Studies**: STAR framework pages (Situation, Task, Action, Results) with metrics, FAQs, and prev/next navigation.
- **Project Explorer**: Filterable by category (Templates, AI/ML, Dev Tools, SaaS, eCommerce) with search and pagination.
- **MDX Blog**: Markdown content with custom React components, code highlighting.
- **AI Assistant**: RAG-powered chat with streaming responses via OpenRouter + Qdrant vectors.
- **i18n**: Full English/French support via cookie-based locale detection.
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4.
- **Dark Mode**: Built-in theme support via `next-themes`.
- **SEO**: Per-page canonical URLs, sitemap (static pages, posts, case studies), robots.txt, dynamic OG images (`/og`), JSON-LD, llms.txt.

## Scripts

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Environment

Copy `.env.example` to `.env.local` and fill in the values. To (re)build the assistant's vector index from `NAS.md`:

```bash
curl -X POST -H "Authorization: Bearer $INIT_DB_SECRET" https://<domain>/api/init-db
```
