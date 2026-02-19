# Prompt: Feature Branch Workflow

Use this before starting any task — code changes, new articles, SEO updates, UI fixes.
**Never push directly to `main`.**

---

## Instructions for the AI Agent

You are about to start a task on traviteja.com. Before touching any files, create a feature branch.

The task is: **[TASK DESCRIPTION]**

---

### Step 1 — Sync with Main

Make sure you are starting from a clean, up-to-date main:

```bash
git checkout main
git pull origin main
```

---

### Step 2 — Create a Feature Branch

Branch naming convention: `type/short-description`

| Type | When to use |
|---|---|
| `feat/` | New feature or page |
| `post/` | New blog article |
| `fix/` | Bug fix |
| `seo/` | SEO improvements |
| `style/` | UI / design changes |
| `chore/` | Dependency updates, config changes |

Examples:
- `post/prompt-engineering-to-agents`
- `feat/contact-page`
- `seo/meta-descriptions`
- `fix/mobile-nav-overflow`
- `style/blog-card-layout`

Create and switch to the branch:

```bash
git checkout -b [type/short-description]
```

---

### Step 3 — Do the Work

Make all changes on this branch. Follow the project guidelines in `AGENTS.md`.

Run `npm run build` before committing to confirm no errors.

---

### Step 4 — Commit on the Branch

Stage only the files relevant to this task:

```bash
git add [specific files]
git commit -m "type: clear description of what changed"
```

Commit message format:
- `feat: add contact page with email form`
- `post: new article on Apache Spark optimisation`
- `fix: correct mobile nav overflow on small screens`
- `seo: add TechArticle schema to blog posts`

---

### Step 5 — Push the Branch

```bash
git push origin [branch-name]
```

---

### Step 6 — Open a Pull Request

```bash
gh pr create \
  --title "[Short title of the change]" \
  --body "$(cat <<'EOF'
## What changed
- [bullet point summary]

## How to test
- Run `npm run build` — should complete with no errors
- Visit [relevant page URL] locally to verify

## Checklist
- [ ] `npm run build` passes
- [ ] No direct changes to unrelated files
- [ ] Sitemap updated (if new page or post added)
EOF
)"
```

---

### Step 7 — Merge and Clean Up

After the PR is reviewed and approved:

```bash
# Merge via GitHub UI (Squash and merge recommended for clean history)
# Then locally:
git checkout main
git pull origin main
git branch -d [branch-name]
```

---

## Quick Reference

```bash
# Start a new task
git checkout main && git pull origin main
git checkout -b feat/my-task

# After work is done
npm run build
git add [files]
git commit -m "feat: description"
git push origin feat/my-task
gh pr create --title "feat: description"
```
