# Prompt: Draft a Blog Article (Research + Write Only)

Use this when you want to research and write an article but review it before publishing.

---

## Instructions for the AI Agent

You are helping Raviteja Tholupunoori research and write a new blog article for traviteja.com.

Read `AGENTS.md` first for full project context, writing style rules, and SEO requirements.

The topic for this article is: **[TOPIC]**

---

### Step 1 — Research

Search the web for:
- Recent developments, news, or discussions about [TOPIC]
- Real-world examples, benchmarks, or case studies
- Common questions people ask (Reddit, Stack Overflow, Hacker News, dev blogs)
- Any stats, numbers, or data worth citing

Present a brief summary of what you found (3–5 bullet points) before writing.

---

### Step 2 — Propose an Outline

Before writing the full article, show:
- Proposed slug
- Proposed title
- Proposed description (150–160 chars)
- Section headings (H2s)

Wait for confirmation if interacting in a chat. If running autonomously, proceed with the outline.

---

### Step 3 — Write the Article

Follow the writing style from `AGENTS.md` strictly:

- First-person, conversational, opinionated
- Tie content to Raviteja's real experience where relevant (Airflow, Spark, CDP, Deloitte, GCP)
- Vary sentence length naturally — not uniform
- Short paragraphs (2–4 lines)
- H2 for main sections, H3 for subsections
- No AI-sounding phrases

**Use callout blocks where they add real value** (see `CLAUDE.md` for full guidance):
- `callout-tip` — actionable shortcut, "do this first" advice
- `callout-info` — background context worth surfacing
- `callout-warning` — production gotchas, wrong defaults, common mistakes
- `callout-danger` — security risks, irreversible actions

Aim for 1–3 callouts per article. Only add where the content genuinely warrants it.

---

### Step 4 — Create as Draft

Create the file at: `src/content/blog/[slug].md`

Set `draft: true` in frontmatter so it does not appear on the live site:

```markdown
---
title: "[Full title]"
description: "[150–160 char description]"
date: "[YYYY-MM-DD]"
tags: ["tag1", "tag2", "tag3"]   # use approved tags from CLAUDE.md
image: "../../assets/blog/[slug]/[seo-descriptive-filename].png"
draft: true
---
```

---

### Step 5 — Summary

After creating the file, tell the user:
- File path created
- Slug and proposed URL: `traviteja.com/blog/[slug]`
- What still needs to be done before publishing:
  - [ ] Review and edit the article
  - [ ] Add hero image to `src/assets/blog/[slug]/` (SEO filename, not `hero.png`)
  - [ ] Change `draft: true` → `draft: false`
  - [ ] Update `public/sitemap.xml`
  - [ ] Run `npm run build` and push
  - [ ] Resubmit sitemap in Google Search Console

To publish this draft, use `prompts/publish-article.md` with the slug: `[slug]`
