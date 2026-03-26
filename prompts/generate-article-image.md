# Prompt: Generate Hero Image for Blog Article

Use this prompt to generate a feature image for any new blog post on traviteja.com.

---

## Image Specifications

| Property | Value |
|---|---|
| **Dimensions** | 1200 × 630 px |
| **Format** | PNG |
| **Target file size** | Under 150kb (compress after generation) |
| **Filename** | SEO-descriptive name (e.g. `how-to-prompt-claude.png`) — not `hero.png` |
| **Save location** | `src/assets/blog/[slug]/[seo-descriptive-filename].png` |

**Why these specs:**
- 1200 × 630 is the standard for Twitter `summary_large_image` and LinkedIn/Facebook OG cards (your BaseLayout uses `summary_large_image`)
- In the article body, the image scales down to ~720px wide (max-w-3xl minus padding) — 1200px source looks sharp at that size
- PNG preserves quality for text/UI screenshots without compression artefacts
- Blog card thumbnails (80×80 and 120×80) use `object-fit: cover` — the image crops from the center, so keep the key visual in the middle

---

## Visual Communication First

The #1 job of the hero image: **a reader should understand the article's core idea just by looking at it — before reading a single word.**

Ask before designing: *"If someone saw only this image in a Twitter feed, would they know what this article teaches?"*

Good: a before/after showing messy vs structured pipeline config → reader instantly gets "this is about fixing something"
Bad: a generic dark background with floating code snippets → looks like every other tech blog

---

## Color variety rule — read this first

**Do not reuse the same palette across articles.** The blog listing shows all hero images together — if every image uses the same dark navy + blue, the whole blog looks like one repeated post.

Before choosing colors, ask: what did the last 2–3 articles use? Then pick something different.

Quick palette checklist — use each one across the blog, not the same one repeatedly:
- Dark navy + blue (`#0d1b2a` + `#2563eb`) — architecture/technical deep-dives
- Warm off-white + bold accent (`#faf8f5` + strong color) — career/productivity/opinion
- Split-tinted dark (two hues signaling contrast) — before/after, good/bad comparisons
- Dark slate + amber (`#0f172a` + `#f59e0b`) — tools/productivity with warm energy
- Clean white + minimal color (`#ffffff` + one accent) — concept explanations, "what is X"
- Dark terminal + green output (`#0e0e10` + `#50fa7b`) — tutorials, installation guides

If the last article used dark navy, use a light or warm palette this time. Variety is required.

---

## Theme Selection — Pick by Article Type

Do NOT default to dark every time. Choose the theme that best communicates the article's mood and content.

### Type A — "How it works" / Architecture deep-dive
- **Theme:** Blueprint or diagram aesthetic
- **Feel:** Structured, layered, informational
- **Visual:** A clean flow diagram, architecture layers, or annotated system map — the structure *is* the message
- **Color ideas:** Deep navy or slate background, white/light-blue lines, yellow or teal highlights for key nodes
- **Example articles:** Airflow architecture, how Claude works, pipeline internals

### Type B — Tutorial / Step-by-step
- **Theme:** Progress — before → after, input → output
- **Feel:** Clear, guided, satisfying
- **Visual:** A two-panel split (broken → fixed, empty → complete), a numbered step sequence, or a terminal showing a clean result
- **Color ideas:** Light or white background with a clean two-column split; OR dark terminal with green/white output
- **Example articles:** Airflow installation, Docker Compose setup, debugging a DAG

### Type C — Comparison / "X vs Y"
- **Theme:** Side-by-side contrast
- **Feel:** Decisive, analytical
- **Visual:** Two clearly labeled panels with a bold divider — each side shows a distinct state, tool, or approach
- **Color ideas:** Cool blue vs warm orange split; or neutral background with colored labels per side
- **Example articles:** Claude vs ChatGPT, sync vs async API, Spark vs Airflow

### Type D — Productivity / Career / Opinion
- **Theme:** Human, approachable, slightly warmer
- **Feel:** Relatable, energetic — not corporate
- **Visual:** A metaphor made visual (a checklist, a growth bar, a dashboard with a single winning metric highlighted)
- **Color ideas:** Warm cream or off-white background, bold accent colors, minimal text
- **Example articles:** 7 skills to master AI, career tips, collaboration patterns

### Type E — Concept explanation / "What is X"
- **Theme:** Clarity — the concept made visible
- **Feel:** Educational, clean
- **Visual:** The core concept represented as a single clear diagram or metaphor — not a product screenshot, not abstract art
- **Color ideas:** White or light background, one or two accent colors max, generous whitespace
- **Example articles:** What is Claude AI, what is a context window, what is prompt caching

---

## Fixed Rules (apply to all themes)

- No people, no hands, no stock photography
- No AI-cliché visuals: no glowing brains, no floating robot heads, no neural network node art
- No random floating code that doesn't connect to the article's point
- Keep all text and key visuals within the inner **1120 × 550 px** safe zone (40px margin all sides)
- Headline must be readable at 600px wide
- No more than 2 text elements (headline + label)
- The main visual should make the concept clear at a glance — if it could belong to any article, redesign it

---

## How to Generate the Gemini Prompt After Writing an Article

After the article is written, extract:

1. **Article title** — exact title from frontmatter
2. **Core concept** — the single main idea the article teaches (1 sentence)
3. **Article type** — pick from A / B / C / D / E above
4. **Key visual metaphor** — the most concrete, visual thing in the article that makes the concept click
5. **Target keywords** — 3–4 keywords from the article's SEO focus

Then fill in the template below.

### Gemini-ready prompt template

```
Generate a 1200 × 630 px PNG hero image for a technical blog post.

Article title: [ARTICLE TITLE]
Topic: [CORE CONCEPT IN ONE SENTENCE]

Canvas: 1200 × 630 px.

Background: [CHOOSE based on article type — e.g. "Deep navy (#0d1b2a)" for architecture, "Clean white (#ffffff)" for tutorial, "Warm off-white (#faf8f5)" for career/opinion]

Main visual: [DESCRIBE EXACTLY what should be shown — be specific about layout, labels, colors, and what it communicates. The visual must make the article's point without words. E.g. "A two-panel split: left shows a single-node pipeline with a red failure indicator; right shows a three-stage pipeline with green checkmarks on each node — visually showing redundancy fixes the failure."]

Typography (left-aligned, inside safe zone):
- Large bold headline: [ARTICLE TITLE — keep under 50 chars if possible]
- Small label underneath: [3–4 keywords separated by · dots, in monospace style]

Colors: [SPECIFY based on chosen theme — at least: background color, headline color, accent color, label color]

Rules:
- No people, no hands, no stock imagery
- No floating code unrelated to the article's concept
- No generic "tech" visuals — make the main visual specific to this article
- Keep all text and visuals within the inner 1120 × 550 px safe zone
- Headline must be readable at 600px wide
- Output: 1200 × 630 px PNG
```

---

## Examples

### Example 1 — Architecture deep-dive (Type A)
**Article:** How Claude Actually Works — Architecture Deep Dive
**Core concept:** Every Claude response flows through a fixed pipeline: input → tokenize → transformer → SSE stream
**Type:** A — How it works
**Key visual:** A clean 6-step vertical pipeline with labeled stages and a loop arrow on the inference step

```
Generate a 1200 × 630 px PNG hero image for a technical blog post.

Article title: How Claude Actually Works
Topic: A step-by-step breakdown of Claude's request lifecycle — from tokenization to streamed output.

Canvas: 1200 × 630 px.

Background: Deep navy (#0d1b2a). Subtle horizontal scanline texture at very low opacity. No glow effects.

Main visual: A horizontal pipeline of 6 labeled steps connected by arrows, centered on the canvas:
  [Input] → [Tokenize] → [Context Window] → [Transformer] → [Sample] → [Stream]
Each step is a clean rounded rectangle. The [Transformer] step is highlighted in soft blue (#60a5fa) with a small curved arrow looping back to itself labeled "×N tokens" in teal — showing the autoregressive loop. All other steps are muted (#1e3a5f). Labels in white monospace.

Typography (left-aligned, inside safe zone):
- Large bold headline: How Claude Actually Works
- Small monospace label: tokenization · transformer · context window · tool use

Colors: #0d1b2a background, #60a5fa highlight, #ffffff headline, #94a3b8 label, #2dd4bf teal accent.

Rules:
- The pipeline diagram must be the dominant visual — not decorative background
- Labels on each step must be legible
- No people, no hands, no stock imagery
- Keep all text and visuals within the inner 1120 × 550 px safe zone
- Output: 1200 × 630 px PNG
```

---

### Example 2 — Tutorial (Type B)
**Article:** Airflow Installation with Docker Compose
**Core concept:** Three commands get a production-ready Airflow stack running locally
**Type:** B — Tutorial
**Key visual:** A terminal window showing `docker compose up` → green "healthy" status on all services

```
Generate a 1200 × 630 px PNG hero image for a technical blog post.

Article title: Airflow on Docker Compose
Topic: Three commands to get a full Airflow stack running locally with Docker Compose.

Canvas: 1200 × 630 px.

Background: Near-black terminal background (#0e0e10). Clean, no texture.

Main visual: A realistic terminal window UI (dark title bar, three dots top-left). Inside, three numbered command lines in white monospace:
  1. curl -LfO airflow/docker-compose.yaml
  2. docker compose up -d
  3. open http://localhost:8080
Below the commands, a status block showing four services (postgres, redis, webserver, scheduler) each with a green ✓ "healthy" badge. The green checkmarks are the payoff — they should be visually prominent.

Typography (left-aligned, inside safe zone):
- Large bold headline: Airflow on Docker Compose
- Small label: airflow · docker · local setup · 3 commands

Colors: #0e0e10 background, #f8f8f2 terminal text, #50fa7b green for checkmarks, #ffffff headline, #6b7280 label.

Rules:
- Terminal must look realistic, not decorative
- The green checkmarks are the key message — make them clear
- No people, no hands, no stock imagery
- Keep all text and visuals within the inner 1120 × 550 px safe zone
- Output: 1200 × 630 px PNG
```

---

### Example 3 — Productivity / Opinion (Type D)
**Article:** 7 Skills to Master AI in 2026
**Core concept:** A ranked skill map showing what actually matters for working effectively with AI tools
**Type:** D — Career / Productivity
**Key visual:** A clean skill card grid — 7 cards, each with an icon and label, one card highlighted as the most important

```
Generate a 1200 × 630 px PNG hero image for a technical blog post.

Article title: 7 Skills to Master AI in 2026
Topic: The specific skills that separate engineers who use AI well from those who don't.

Canvas: 1200 × 630 px.

Background: Warm off-white (#faf8f5). Clean, minimal, open.

Main visual: A 3-column grid of 7 skill cards centered on the canvas. Each card has a simple icon and a short label (e.g. "Prompt Design", "Context Management", "Tool Selection"). One card — "Prompt Design" — is slightly larger and has a bold blue border (#2563eb) to signal it's #1. The others are lighter, muted. The grid feels like a skills map, not a list.

Typography (left-aligned, inside safe zone):
- Large bold headline: 7 Skills to Master AI in 2026  (dark text #111827)
- Small label: productivity · ai tools · career · 2026

Colors: #faf8f5 background, #111827 headline, #2563eb accent card border, #374151 card labels, #6b7280 secondary label.

Rules:
- Cards must be clearly readable
- Warm and approachable — not cold/corporate
- No people, no hands, no stock imagery
- Keep all text and visuals within the inner 1120 × 550 px safe zone
- Output: 1200 × 630 px PNG
```

---

## SEO Checklist After Saving the Image

- [ ] Filename is SEO-descriptive (e.g. `how-to-prompt-claude.png`) — not `hero.png`
- [ ] Saved at `src/assets/blog/[slug]/[seo-descriptive-filename].png`
- [ ] Frontmatter `image` field uses relative path: `../../assets/blog/[slug]/[seo-descriptive-filename].png`
- [ ] Alt text in the markdown body is descriptive and keyword-rich
- [ ] File size is under 150kb (use squoosh.app or tinypng.com if needed)
