# traviteja.com — Agent & Contributor Guide

Personal portfolio and technical blog of **Raviteja Tholupunoori**, Senior Data Engineer & Cloud Architect, 9+ years at Deloitte. Apache Airflow Champion. Featured on the Astronomer podcast.

**Live site:** https://traviteja.com
**GitHub repo:** https://github.com/traviteja-git/traviteja.info.io
**Google Search Console:** verified (meta tag in BaseLayout.astro)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Astro 5 — fully static, zero JS by default |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js`) |
| Content | Astro Content Collections — Markdown files in `src/content/blog/` |
| Deployment | GitHub Actions (`npm ci` + `npm run build`) → GitHub Pages |
| Analytics | GA4 (`G-BFNWX56LLL`) + GTM (`GTM-PRT2DF43`) — both in BaseLayout |
| Ads | Google AdSense (`ca-pub-3842671548593949`) — script in BaseLayout |

---

## Project Structure

```
src/
  content/
    blog/              ← Blog posts (.md) — the ONLY content collection in active use
    projects/          ← Exists in schema but NOT used for rendering — ignore
  content.config.ts    ← Defines blog + projects collection schemas
  data/
    projects.ts        ← ALL project data lives here (hardcoded TypeScript array)
  layouts/
    BaseLayout.astro   ← Shell for every page: <head>, SEO, JSON-LD, GA, GTM, theme
    BlogLayout.astro   ← Wraps blog posts: breadcrumb schema, share buttons, related posts
  pages/
    index.astro        ← Homepage: hero, Featured In, recent blog posts, projects modal
    about.astro        ← Full portfolio: experience timeline, skills, certs, recommendations
    blog/
      index.astro      ← Blog index with tag filters (client-side JS)
      [slug].astro     ← Dynamic blog post route — reads from content collection
    projects/
      index.astro      ← Projects page — renders from src/data/projects.ts (NOT content collection)
      [slug].astro     ← Exists but only banking-sales-platform has a .md file
    podcast.astro      ← Podcast appearance page (static)
  components/
    Header.astro       ← Nav with mobile hamburger, dark/light theme toggle
    Footer.astro
    BlogCard.astro     ← Used on blog index and homepage recent posts section
  styles/
    global.css         ← CSS custom properties: --bg, --fg, --fg-muted, --accent, --border, --bg-subtle
public/
  sitemap.xml          ← MANUAL static sitemap — update when adding blog posts (see below)
  robots.txt           ← Allow all, references /sitemap.xml
  images/
    blog/              ← Hero images, one subfolder per post slug
    logos/             ← Company/cert logos used on About and projects
  og-default.png       ← Default OG image (1200×630) used when no post image
  avatar.jpg           ← Profile photo used on homepage hero
  CNAME                ← traviteja.com
  ads.txt              ← AdSense publisher verification
  manifest.json        ← PWA manifest
```

---

## Critical Architecture Facts

### Projects — Modal Only, NOT Pages
Projects data lives exclusively in `src/data/projects.ts` as a typed TypeScript array. They render as **click-to-open modals** on the homepage and projects index — they are NOT standalone pages. The `src/content/projects/` collection and `src/pages/projects/[slug].astro` route exist but are effectively unused.

**Do NOT add project URLs to `public/sitemap.xml`** — they return 404. This was a bug that was fixed: all project slugs except `banking-sales-platform` had no rendered page, and even that one was removed from the sitemap.

### Sitemap — Manual, Static
`public/sitemap.xml` is a hand-maintained file. It contains only:
- Core pages: `/`, `/about/`, `/blog/`, `/projects/`, `/podcast/`
- Blog posts: one `<url>` block per post

**When adding a new blog post**, copy an existing `<url>` block and update `<loc>` and `<lastmod>`. Use `<changefreq>monthly</changefreq>` and `<priority>0.8</priority>`.

No auto-generated sitemap (`@astrojs/sitemap`) — it was attempted but caused CI failures due to cross-platform `package-lock.json` issues and was reverted.

### CI — npm ci, Lock File Sensitive
The GitHub Actions workflow uses `npm ci` with `cache: npm`. The `package-lock.json` **must stay in sync with `package.json`**.

**Known CI failure pattern:** Installing new npm packages on macOS can break CI because:
1. `@types/node` version conflicts between packages cause `npm ci` sync errors
2. Platform-specific optional deps (e.g. `@rollup/rollup-linux-x64-gnu`) are excluded from macOS-generated lock files, causing build failures on the Linux CI runner

**If CI breaks after `npm install`:** Do not try `--include=optional` or changing `npm ci` to `npm install` — these have been attempted and still failed. The safest approach is to revert the package change and find an alternative.

---

## SEO Architecture (fully implemented)

All SEO logic lives in `src/layouts/BaseLayout.astro` and `src/layouts/BlogLayout.astro`.

### BaseLayout.astro — Every Page Gets:
- `<link rel="canonical">` — dynamic from `Astro.url.pathname + Astro.site`
- `<meta name="description">` — from props, with fallback default
- Full Open Graph tags: `og:locale`, `og:site_name`, `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:image:width` (1200), `og:image:height` (630)
- `article:published_time` and `article:author` — when `type="article"`
- Twitter/X card: `twitter:card`, `twitter:site` (@raviteja0096), `twitter:creator` (@raviteja0096), `twitter:title`, `twitter:description`, `twitter:image`
- **WebSite JSON-LD** schema
- **Person JSON-LD** schema with `sameAs`: LinkedIn (`www.linkedin.com/in/raviteja0096`), GitHub, Medium
- **TechArticle JSON-LD** — only on blog posts (`type="article"`), includes `datePublished`, `dateModified`, publisher as `Organization` with logo
- Named `<slot name="head" />` — for page-specific schema injection (used by BlogLayout)
- Google Search Console verification meta tag
- GA4 + GTM scripts (async)
- AdSense script (async)
- Theme flash prevention (inline script reads localStorage before paint)

### BlogLayout.astro — Blog Posts Also Get:
- Makes `image` URL absolute via `new URL(image, Astro.site)` before passing to BaseLayout
- **BreadcrumbList JSON-LD** injected via `slot="head"` (Home → Blog → Article title)
- Share buttons (LinkedIn + X/Twitter) with encoded URLs
- Related posts section (passed in from `[slug].astro`)
- Reading time display

### OG Image Handling
- Default: `https://traviteja.com/og-default.png` (absolute, hardcoded in BaseLayout)
- Blog posts: relative path from frontmatter (e.g. `/images/blog/slug/hero.png`) → made absolute in BlogLayout before passing to BaseLayout
- Never pass a relative path directly to BaseLayout from any other page

---

## Blog Post Format

File: `src/content/blog/[seo-slug].md`

```markdown
---
title: "Full title — keyword rich, under 60 chars ideally"
description: "150–160 character meta description with long-tail keywords. Used verbatim as meta description and OG description."
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/[slug]/hero.png"
draft: false
---

Article content...
```

### Slug rules
- Lowercase, hyphen-separated, keyword-rich
- Example: `apache-airflow-architecture-simplified` not `airflow-post`
- Must match the image subfolder: `public/images/blog/[slug]/`

### Title format
- Blog posts: `{Title} — Raviteja` (BlogLayout appends this automatically)
- Pages: `Raviteja Tholupunoori | {Keyword}` or `{Topic} — Raviteja Tholupunoori`

---

## Workflow: Adding a New Blog Post

1. Create `src/content/blog/[slug].md` with correct frontmatter
2. Add hero image to `public/images/blog/[slug]/` (SEO filename, e.g. `airflow-architecture-diagram.png`)
3. Add a `<url>` block to `public/sitemap.xml` (copy existing, update `<loc>` + `<lastmod>`)
4. Run `npm run build` — must pass with 0 errors
5. Commit on a feature branch (`post/[slug]`) and open a PR
6. After merge, resubmit sitemap in Google Search Console

---

## Writing Style Guide

All content is first-person, from Raviteja's direct experience as a senior data engineer.

**Voice:** Conversational, opinionated, technically credible. Not corporate. Not AI-sounding.

**Do:**
- First-person ("I", "my", "in my experience")
- Short paragraphs (2–4 lines). Single-sentence paragraphs for emphasis.
- Varied sentence length — mix punchy and longer sentences
- Real examples: Deloitte, LG Electronics, CDP, Spark, specific metrics ("400GB+ daily", "60+ hours to 2 minutes")
- Honest takes: admit what was hard, what failed, what you're still figuring out

**Don't:**
- "It is important to note", "Let's explore", "In conclusion", "To summarize"
- "This is not just X, it is Y" — classic AI tell
- Generic documentation summaries
- Uniform bullet-point lists where prose works better

---

## Git Workflow

**Never push directly to `main`.** Every change gets its own branch + PR.

```bash
git checkout main && git pull origin main
git checkout -b post/my-new-article   # or feat/, fix/, seo/, style/, chore/

# make changes
npm run build          # must pass
git add [specific files]
git commit -m "post: article on [topic]"
git push origin post/my-new-article
gh pr create --title "post: [topic]"
gh pr merge --merge
```

Branch naming: `feat/`, `post/`, `fix/`, `seo/`, `style/`, `chore/`

---

## Do Not

- Push directly to `main`
- Add project URLs to `sitemap.xml` — they render as modals, not pages, and return 404
- Install new npm packages without verifying CI passes — lock file cross-platform issues have broken CI before
- Use `@astrojs/sitemap` — attempted and reverted due to CI failures
- Pass a relative `og:image` path to BaseLayout from non-blog pages — use absolute URLs
- Run `git add .` or `git add -A` — always add specific files to avoid committing secrets or binaries
- Commit without running `npm run build` first
