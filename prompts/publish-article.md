# Prompt: Publish an Existing Draft Article

Use this when a draft article is ready to go live.

---

## Instructions for the AI Agent

You are helping Raviteja Tholupunoori publish a draft blog article on traviteja.com.

Read `AGENTS.md` first for full project context.

The slug of the article to publish is: **[SLUG]**

---

### Step 1 — Find and Review the Article

Read the file at: `src/content/blog/[SLUG].md`

Check:
- `draft: true` is set (confirm this is still a draft)
- `title`, `description`, `date`, `tags` are all filled in
- `description` is 150–160 characters (good meta description length)
- `image` field points to a file that exists in `public/images/blog/[SLUG]/`
- The article has proper H2/H3 structure
- No placeholder text or TODOs remain

Report any issues found before proceeding.

---

### Step 2 — Set draft: false

In `src/content/blog/[SLUG].md`, change:

```
draft: true
```

to:

```
draft: false
```

---

### Step 3 — Update the Sitemap

Open `public/sitemap.xml` and confirm there is no existing entry for this slug.

If missing, add inside the Blog posts section:

```xml
<url>
  <loc>https://traviteja.com/blog/[SLUG]/</loc>
  <changefreq>yearly</changefreq>
  <priority>0.8</priority>
</url>
```

---

### Step 4 — Verify Build

Run:
```
npm run build
```

Confirm it completes with no errors. If there are errors, fix them before pushing.

---

### Step 5 — Commit and Push

```
git add src/content/blog/[SLUG].md public/sitemap.xml
git commit -m "Publish: [article title]"
git push origin main
```

---

### Step 6 — Remind the User

After pushing:
- Article will be live at: `https://traviteja.com/blog/[SLUG]/`
- Go to **Google Search Console → Sitemaps** and resubmit `sitemap.xml`
- Share the article on LinkedIn and any relevant communities
