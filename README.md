# Design Systems Interview Handbook

A senior-level, first-principles handbook for Frontend Engineers interviewing
with Design Systems teams — design tokens, component architecture,
accessibility, styling architecture, tooling (Storybook, monorepos,
packaging), governance, and manager-round interview prep. 15 chapters,
each following the same template: definition → problem it solves → how it
works → architecture (with diagrams) → production-grade code → tradeoffs →
common mistakes → interview & manager-level Q&A.

Built with Next.js (App Router) + MDX + Tailwind CSS. Diagrams render with
[Mermaid](https://mermaid.js.org/), code blocks are syntax-highlighted with
[Shiki](https://shiki.style/) via `rehype-pretty-code`.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> **Note:** this project pins the Webpack bundler (`next dev --webpack` /
> `next build --webpack`, see `package.json`) rather than Turbopack. The
> chapter Mermaid-diagram pipeline uses a local, non-serializable remark
> plugin (`next.config.ts`), which Turbopack cannot yet load — see the
> "Using Plugins with Turbopack" note in the Next.js MDX guide. Webpack
> handles it natively.

## Content

Every chapter lives at `src/content/chapters/<slug>.mdx`. The chapter list,
order, and topic coverage are defined in `src/lib/chapters.ts`. The full
authoring contract (structure, required sections, custom MDX components,
tone) is documented in [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md).

## Deploying

This app is a standard Next.js App Router project — deploy it on
[Vercel](https://vercel.com/new) by importing this repository. No
environment variables are required. Vercel will run `npm run build`
(the Webpack-pinned build script) automatically.

## Stack

- **Next.js** (App Router, static generation for every chapter route)
- **MDX** (`@next/mdx`) for chapter content with custom global components
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Shiki** (`rehype-pretty-code`) for syntax highlighting
- **Mermaid** for architecture / relationship diagrams
- Local-only reading progress tracking (`localStorage`, no backend)
