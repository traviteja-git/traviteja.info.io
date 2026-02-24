# Prompt: Generate Hero Image for Blog Article

Use this prompt to generate a feature image for any new blog post on traviteja.com.

---

## Image Specifications

| Property | Value |
|---|---|
| **Dimensions** | 1200 × 630 px |
| **Format** | PNG |
| **Target file size** | Under 150kb (compress after generation) |
| **Filename** | `hero.png` |
| **Save location** | `public/images/blog/[slug]/hero.png` |

**Why these specs:**
- 1200 × 630 is the standard for Twitter `summary_large_image` and LinkedIn/Facebook OG cards (your BaseLayout uses `summary_large_image`)
- In the article body, the image scales down to ~720px wide (max-w-3xl minus padding) — 1200px source looks sharp at that size
- PNG preserves quality for text/UI screenshots without compression artefacts
- Blog card thumbnails (80×80 and 120×80) use `object-fit: cover` — the image crops from the center, so keep the key visual in the middle

---

## Site Visual Style

Match the traviteja.com aesthetic:

- **Light mode palette:** white background (`#ffffff`), dark text (`#111111`), blue accent (`#2563eb`)
- **Dark mode palette:** near-black background (`#0f0f0f`), light text (`#f0f0f0`), soft blue accent (`#60a5fa`)
- **Font feel:** system sans-serif, clean, minimal — no decorative or display fonts
- **Mood:** technical, professional, calm — not loud or over-designed

---

## Image Generation Prompt Template

Replace `[ARTICLE TITLE]`, `[TOPIC]`, and `[KEYWORDS]` before using.

---

> **Canvas:** 1200 × 630 px.
>
> **Background:** Clean dark background (`#0f0f0f`). Subtle grid or dot pattern overlay at very low opacity to add texture without clutter. Soft blue radial glow (`#2563eb` at 10–15% opacity) fading in from one corner or the center — not dominant, just depth.
>
> **Main visual:** A minimal, flat illustration or UI mockup directly related to [TOPIC]. Keep it abstract enough to feel conceptual, not literal. Examples: a file tree, a terminal window, a pipeline diagram, a code editor snippet. Use clean geometric shapes. Avoid stock-photo-style illustrations or anything that looks generic.
>
> **Typography (left-aligned, inside safe zone):**
> - Large bold headline: `[ARTICLE TITLE]`
> - Small monospace label underneath: `[KEYWORDS]` — styled like a code tag or terminal command
>
> **Colors to use:** `#0f0f0f` background, `#60a5fa` (soft blue) for accents and glows, `#f0f0f0` for headline text, `#a0a0a0` for secondary text/labels, `#2dd4bf` (teal) sparingly for highlights if needed.
>
> **Typography rules:**
> - Headline: bold, large, white — readable at 600px wide
> - Labels: monospace font, muted gray
> - No more than 2 text elements total
>
> **Safe zone:** Keep all text and key visuals within the inner **1120 × 550 px** area (40px margin on all sides). Twitter and LinkedIn may crop the outer edges.
>
> **Style:** Flat dark UI aesthetic. No gradients that look AI-generated. No people, no hands, no stock imagery. Clean, technical, like a high-quality engineering blog — not a SaaS landing page.
>
> **Output:** 1200 × 630 px PNG. Compress to under 150kb before saving.

---

## SEO Checklist After Saving the Image

- [ ] Filename is `hero.png` (matches frontmatter `image` field)
- [ ] Saved at `public/images/blog/[slug]/hero.png`
- [ ] Alt text in the markdown is descriptive and keyword-rich:
  ```markdown
  ![How to get better AI code suggestions by fixing your repo structure — GitHub Copilot, Cursor, Claude](/images/blog/[slug]/hero.png)
  ```
- [ ] File size is under 150kb (use [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com) if needed)

---

## Example — Current Article

**Article:** How to Get Better AI Code Suggestions: Fix Your Repo, Not the Model
**Slug:** `make-your-repo-ai-ready`
**Keywords:** github copilot · cursor · claude · repo structure

**Filled prompt excerpt:**
> Main visual: a VS Code-style file explorer panel showing filenames like `CLAUDE.md`, `streak_calculator.py`, `.github/copilot-instructions.md` — two or three lines glowing teal to suggest they are "AI-readable". On the right, a ghost autocomplete suggestion in muted purple completing a typed Python function signature with type hints.
>
> Headline: `How to Get Better AI Code Suggestions`
> Label: `copilot · cursor · claude · any stack`
