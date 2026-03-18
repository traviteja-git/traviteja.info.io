# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build → ./dist/ (must pass before any PR)
npm run preview   # Preview the production build locally
```

No test runner is configured. Use `npm run build` to validate changes.

## Git Workflow

Never push directly to `main`. All changes go through feature branches and PRs.

```bash
git checkout -b feat/my-change   # branch prefixes: feat/, post/, fix/, seo/, style/, chore/
npm run build                    # must pass
git add src/path/to/changed/file # add specific files, never git add -A or git add .
git commit -m "type: description"
git push origin feat/my-change
gh pr create && gh pr merge --merge
```

## Architecture

**Astro 5** static site with **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js`). All routing is file-based in `src/pages/`.

### Content

- `src/content/blog/` — Blog posts (`.md`). Frontmatter schema defined in `src/content.config.ts`.
- `src/data/projects.ts` — All project/work experience data as a TypeScript array. Rendered as **modals**, not pages.
- `src/content/projects/` and `src/pages/projects/[slug].astro` exist but are **unused**.

### Layouts

- `src/layouts/BaseLayout.astro` — Shell for every page. Injects SEO meta tags, JSON-LD schemas (WebSite, Person, TechArticle), GA4, GTM, AdSense, theme flash prevention.
- `src/layouts/BlogLayout.astro` — Wraps blog posts. Adds BreadcrumbList schema, share buttons, related posts, reading time. Converts relative image URLs to absolute before passing to BaseLayout.

### Styling

Theme is defined via CSS custom properties in `src/styles/global.css` (light/dark). Use `var(--accent)`, `var(--bg)`, `var(--fg)`, `var(--fg-muted)`, `var(--border)` for consistency.

## Blog Post Format

```markdown
---
title: "Post Title"
description: "150–160 character description with target keywords"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
image: "/images/blog/[post-slug]/hero.png"
draft: false
---
```

Hero images go in `public/images/blog/[post-slug]/`. OG images must be 1200×630px and use absolute paths (BlogLayout handles the conversion).

## Sitemap — Manual, Must Update

`public/sitemap.xml` is **manually maintained**. `@astrojs/sitemap` is intentionally not used (caused CI failures). When adding a blog post, copy an existing `<url>` block and update `<loc>` and `<lastmod>`.

## CI/CD Sensitivity

The GitHub Actions pipeline (`.github/workflows/deploy.yml`) runs on Linux with `npm ci`. Installing new packages on macOS can produce a `package-lock.json` incompatible with the Linux CI runner — especially `@types/node` version mismatches. Prefer avoiding new dependencies when possible.

## SEO Rules

- OG images must be absolute URLs (1200×630px). BlogLayout converts them automatically; raw pages must use absolute paths.
- Every page must have a canonical URL, unique `<title>`, and `<meta name="description">`.
- Do not add `<script>` tags or client-side JS without strong justification — this is a static site.

## Prompts Directory

`prompts/` contains AI workflow templates for common tasks: drafting articles, publishing, creating feature branches, and generating hero images. Refer to these before starting those workflows.
