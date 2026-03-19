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
image: "../../assets/blog/[post-slug]/[seo-descriptive-filename].png"
draft: false
---
```

Hero images go in `src/assets/blog/[post-slug]/`. Use a descriptive SEO filename (e.g. `how-to-prompt-claude.png`), not `hero.png`. OG images must be 1200×630px and use absolute paths (BlogLayout handles the conversion).

### Tags — use consistently

Pick 3–5 tags from this list (add new ones sparingly):

- **Topics**: `ai`, `data-engineering`, `airflow`, `spark`, `etl`, `pipelines`, `architecture`
- **Tools**: `claude`, `chatgpt`, `github-copilot`, `cursor`, `docker`, `kubernetes`, `gcp`, `aws`, `azure`
- **Skills**: `prompt-engineering`, `productivity`, `career`, `certification`, `community`
- **Types**: `developer-tools`, `llm`, `agents`

### Callout blocks — use in article body

Available in any `.md` file via raw HTML:

```html
<div class="callout callout-tip">Practical tip or shortcut.</div>
<div class="callout callout-info">Background context worth surfacing.</div>
<div class="callout callout-warning">Production gotcha, wrong default, common mistake.</div>
<div class="callout callout-danger">Security risk, data loss, irreversible action.</div>
```

Aim for 1–3 callouts per article. Only add where content genuinely warrants it.

### Inline SVG diagrams — create when concepts need visual explanation

SVG diagrams go in `public/diagrams/` and are referenced in markdown as:

```markdown
![Alt text describing the diagram](/diagrams/filename.svg)
```

**When to create a diagram** — ask: "Would a diagram help the reader grasp this faster than text alone?" Good candidates:
- Multi-step flows or processes (pipelines, architectures, request/response)
- Comparisons between options (tiers, modes, approaches)
- Conceptual frameworks with named parts (the four-part prompt pattern)
- Timelines showing progression or evolution
- "What's visible vs invisible" spatial concepts

**When NOT to create a diagram:**
- Simple lists that read fine as text
- When a screenshot already exists and covers it
- Personal/narrative sections (career stories, opinions)

**How to create SVGs:**
- Canvas size: 900px wide, height as needed (300–480px typical)
- Background: `#f8faff`, border: `#e4e4e7`, accent: `#2563eb`
- Font: `system-ui, -apple-system, sans-serif` via `<style>` in `<defs>`
- Save to `public/diagrams/[descriptive-name].svg`
- Reference immediately after introducing the concept in the article
- Aim for 1–2 diagrams per article — don't over-diagram

Existing diagrams in `public/diagrams/` for reference:
- `prompt-engineering-evolution.svg` — expanding bars timeline
- `prompt-pattern-four-parts.svg` — four connected boxes with arrows
- `ai-context-window.svg` — two-zone visible/invisible layout
- `7-skills-map.svg` — three-column grouped cards
- `claude-model-tiers.svg` — staircase tiers with badges

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
