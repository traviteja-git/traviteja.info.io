# Prompt: New Blog Article (Full Workflow)

Use this prompt to go from topic idea to published article in one pass.

---

## Instructions for the AI Agent

You are helping Raviteja Tholupunoori write and publish a new blog article on traviteja.com.

Read `AGENTS.md` first for full project context, writing style rules, and SEO requirements.

The topic for this article is: **[TOPIC]**

---

### Step 1 — Research

Search the web for:
- Recent developments, news, or discussions about [TOPIC]
- Real-world examples, benchmarks, or case studies
- Common questions people ask about [TOPIC] (check Reddit, Stack Overflow, dev blogs)
- Statistics or data that support key points

Summarise what you found before writing. Identify 3–5 key angles worth covering.

---

### Step 2 — SEO Planning

Before writing, decide:

1. **Slug**: lowercase, hyphen-separated, keyword-rich (e.g. `apache-spark-performance-tuning-tips` not `spark-post`)
2. **Title**: specific and keyword-rich. Format: `"Topic — Raviteja"` or a punchy declarative title
3. **Description**: 150–160 characters, include long-tail keywords (specific tools, use cases, numbers)
4. **Tags**: 3–5 lowercase tags
5. **Target keyword**: the main phrase someone would search to find this article

---

### Step 3 — Write the Article

Follow the writing style from `AGENTS.md` strictly:

- First-person, conversational, opinionated
- Tie content to Raviteja's real experience where possible (Airflow, Spark, CDP, Deloitte, GCP, identity resolution)
- Vary sentence length — short and long, mixed naturally
- Short paragraphs (2–4 lines max)
- Use H2 for main sections, H3 for subsections
- Include a comparison table or code snippet if it adds genuine value
- Do NOT write in a way that sounds AI-generated (no "It is worth noting", no "In conclusion", no perfect parallel lists)

Aim for 800–1500 words. Quality over length.

---

### Step 4 — Create the Markdown File

Create the file at: `src/content/blog/[slug].md`

Use this frontmatter:

```markdown
---
title: "[Full title]"
description: "[150–160 char description with long-tail keywords]"
date: "[YYYY-MM-DD today's date]"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/[slug]/hero.png"
draft: false
---
```

Add `![Descriptive alt text with keywords](/images/blog/[slug]/hero.png)` as the first line after frontmatter if an image exists.

---

### Step 5 — Update the Sitemap

Open `public/sitemap.xml` and add a new `<url>` block inside the Blog posts section:

```xml
<url>
  <loc>https://traviteja.com/blog/[slug]/</loc>
  <changefreq>yearly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### Step 6 — Verify & Push

1. Run `npm run build` — confirm it passes with no errors
2. Commit with a clear message:
   ```
   Add new blog post: [title]

   - Article on [topic], [word count] words
   - Hero image: [filename]
   - Sitemap updated
   ```
3. Push to `origin main`

---

### Step 7 — Remind the User

After pushing, remind Raviteja to:
- Add a hero image to `public/images/blog/[slug]/` if not already done (SEO-optimised filename)
- Resubmit `sitemap.xml` in Google Search Console
