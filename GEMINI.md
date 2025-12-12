# Project: portfolio_next

## Overview

This is a Next.js 16 portfolio application featuring a blog, professional experience section, and an interactive AI assistant. The project utilizes the App Router and is built with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16.0.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: Radix UI primitives (via Shadcn UI patterns)
- **Animations**: Framer Motion, tw-animate-css
- **Content Management**: MDX (next-mdx-remote)
- **AI Integration**: OpenAI, LangChain, Qdrant
- **Icons**: Lucide React, Tabler Icons

## Directory Structure

- **`src/app`**: Main application routes (App Router).
  - `/blog`: Blog listing and post pages.
  - `/about`, `/contact`, `/experience`, `/resume`: Static content pages.
  - `/api`: Backend API routes.
- **`src/components`**: React components.
  - `ui/`: Reusable base UI components (Buttons, Dialogs, etc.).
  - `ai-assistant.tsx`: The AI chat interface component.
  - `mdx.tsx`: MDX component mapping and configuration.
  - `theme-toggle.tsx`: Dark/light mode switcher.
- **`src/lib`**: Utility functions (e.g., `cn` for class merging).

## Key Features

- **MDX Blog**: Renders markdown content with custom React components.
- **AI Assistant**: Integrated chat interface for user interaction.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Dark Mode**: Built-in theme support using `next-themes`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint.
