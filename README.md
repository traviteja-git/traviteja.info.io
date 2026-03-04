# traviteja.com

Personal portfolio and technical blog of **Raviteja Tholupunoori** — Senior Data Engineer & Cloud Architect, Apache Airflow Champion at Deloitte.

**Live:** https://traviteja.com · **Repo:** https://github.com/traviteja-git/traviteja.info.io

---

## Tech Stack

| | |
|---|---|
| Framework | [Astro 5](https://astro.build) — static site generation |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Content | Astro Content Collections (Markdown) |
| Deployment | GitHub Actions → GitHub Pages |
| Analytics | GA4 + Google Tag Manager |

---

## Project Structure

```
src/
  content/blog/        ← Blog posts (.md files, Astro content collection)
  data/projects.ts     ← Project data (TypeScript array, renders as modals — NOT pages)
  layouts/
    BaseLayout.astro   ← Every page: SEO meta, OG, JSON-LD schemas, GA, GTM, theme
    BlogLayout.astro   ← Blog posts: breadcrumb schema, share buttons, related posts
  pages/
    index.astro        ← Homepage
    about.astro        ← Portfolio: experience, skills, certs, recommendations
    blog/index.astro   ← Blog index with tag filters
    blog/[slug].astro  ← Dynamic blog post route
    projects/index.astro ← Projects page (data from src/data/projects.ts)
    podcast.astro      ← Podcast appearance
  components/          ← Header, Footer, BlogCard
  styles/global.css    ← CSS custom properties (--bg, --fg, --accent, --border, etc.)
public/
  sitemap.xml          ← Manual sitemap — update when adding new blog posts
  robots.txt
  images/blog/         ← Blog hero images (one subfolder per post slug)
  og-default.png       ← Default OG image (1200×630)
```

---

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server at http://localhost:4321
npm run build      # Production build → ./dist/
npm run preview    # Preview the build locally
```

---

## Adding a Blog Post

1. Create `src/content/blog/[seo-slug].md`:

```markdown
---
title: "Post Title"
description: "150–160 char description with target keywords."
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
image: "/images/blog/[slug]/hero.png"
draft: false
---
```

2. Add hero image to `public/images/blog/[slug]/`
3. Add a `<url>` entry to `public/sitemap.xml`
4. `npm run build` — verify no errors
5. Push on a feature branch (`post/[slug]`) and open a PR

> See `AGENTS.md` for full workflow, SEO rules, writing style guide, and CI gotchas.

---

## Deployment

Every push to `main` triggers GitHub Actions:
1. `npm ci` — install from lock file
2. `npm run build` — generates `dist/`
3. `dist/` deployed to GitHub Pages

**Note:** The `package-lock.json` is sensitive — installing new packages on macOS can cause CI failures on the Linux runner due to platform-specific optional dependencies. Always verify CI passes after adding packages.

---

## Git Workflow

Never push directly to `main`. Use feature branches + PRs.

```bash
git checkout main && git pull origin main
git checkout -b feat/my-change
# make changes, then:
npm run build
git add [specific files]
git commit -m "feat: description"
git push origin feat/my-change
gh pr create && gh pr merge --merge
```
