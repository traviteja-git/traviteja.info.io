---
title: "Claude Agent Skills: The Complete Guide"
description: "Skills are reusable SKILL.md files that teach Claude Code to handle tasks automatically. This guide covers everything: creating skills, matching, advanced config, sharing, and troubleshooting."
date: "2026-04-23"
tags: ["claude", "agents", "developer-tools", "llm", "productivity"]
image: "../../assets/blog/claude/claude-skills.png"
draft: false
---

Every time you ask Claude to review a PR, you explain how you want feedback structured. Every commit message, you remind it of your preferred format. Every debugging session, you re-describe what level of detail you need.

You're not using Claude badly. You're just missing skills.

A skill is a markdown file that teaches Claude how to do something once. Claude applies that knowledge automatically whenever it recognises the situation — no re-prompting, no slash commands, no ceremony. If you find yourself explaining the same thing to Claude repeatedly, that's a skill waiting to be written.

![Claude Agent Skills: The Complete Guide — creating, configuring, sharing, and troubleshooting SKILL.md files](../../assets/blog/claude/claude-skills.png)

---

## What Skills Are

Skills are folders of instructions that Claude Code can discover and use to handle tasks more accurately. Each skill is a directory containing a `SKILL.md` file with two parts:

1. **Frontmatter** — `name` and `description` between `---` markers
2. **Instructions** — everything below the frontmatter that Claude follows when the skill activates

```
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed.

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
```

The `description` is the matching criteria — it tells Claude when to use the skill, not what the skill does. Write it as a clear statement of the situations it should activate in.

---

## Where Skills Live

Skills go in different directories depending on who needs them:

| Scope | Location |
|---|---|
| **Personal** (follows you across all projects) | `~/.claude/skills/` |
| **Project** (shared with everyone who clones the repo) | `.claude/skills/` inside the repository root |
| **Windows personal** | `C:/Users/<your-user>/.claude/skills/` |

**Personal skills** travel with you. Your commit message style, your preferred code explanation format, your debugging approach — these work in every project without any setup.

**Project skills** get committed to version control alongside your code. Anyone who clones the repo gets them automatically. This is where team standards belong: PR review checklists, brand guidelines, framework-specific conventions.

---

## Creating Your First Skill

Let's build a personal PR description skill step by step.

**Step 1 — Create the skill directory.** The directory name should match the skill name:

```bash
mkdir -p ~/.claude/skills/pr-description
```

**Step 2 — Create the SKILL.md file** inside that directory:

```
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed.

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
```

**Step 3 — Restart Claude Code.** Skills load at startup. New skills and edits to existing ones don't take effect until you restart.

After restarting, make some changes on a branch and ask "write a PR description for my changes." Claude will match the request to the skill, prompt you to confirm loading it, then produce a description in your exact format — same structure every time.

To update a skill, edit its `SKILL.md`. To remove one, delete its directory. Always restart after any change.

<div class="callout callout-tip">Use specific names. Instead of "review", use "frontend-review" or "api-review". Generic names conflict more easily with team or enterprise skills at higher priority levels.</div>

---

## How Skill Matching Works

When Claude Code starts, it scans four skill locations and loads only the `name` and `description` from each skill — not the full content. The full `SKILL.md` reads on demand.

![Agent Skills progressive disclosure — descriptions always pre-loaded, full SKILL.md reads on demand, result flows back](/diagrams/agent-skills-loading.svg)

When you send a request, Claude compares your message against all available skill descriptions using **semantic matching** — it's intent matching, not keywords. "Explain what this function does" would match a skill described as "explain code with visual diagrams" because the intent overlaps.

Once a match is found, Claude prompts you to confirm before loading the full skill content. After you confirm, it reads the complete `SKILL.md` and follows its instructions.

This on-demand loading is what makes skills practical at scale: your PR review checklist doesn't need to be in context when you're debugging — it loads only when you actually ask for a review.

---

## Metadata Fields

`name` and `description` are required. Two optional fields do a lot of work:

**`allowed-tools`** restricts which tools Claude can use when the skill is active. Useful for read-only or security-sensitive workflows:

```
---
name: codebase-onboarding
description: Helps new developers understand how the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---
```

When this skill is active, Claude can only use those four tools without prompting — no editing, no writing. If you omit `allowed-tools` entirely, the skill doesn't restrict anything; Claude uses its normal permission model.

**`model`** specifies which Claude model to use for the skill. A research-heavy skill might warrant Opus; a quick formatter can run on Sonnet.

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Lowercase, hyphens only, max 64 chars. Should match directory name. |
| `description` | Yes | Max 1,024 chars. The most important field — Claude uses it for matching. |
| `allowed-tools` | No | Comma-separated list of tools the skill can use without permission prompts. |
| `model` | No | Override which Claude model runs this skill. |

---

## Writing Descriptions That Actually Trigger

If your skill isn't triggering when you expect, the description is almost always the cause.

A good description answers two questions: *What does the skill do?* and *When should Claude use it?* Be explicit — "help with docs" is too vague. "Writes API reference documentation in JSDoc format. Use when documenting functions, methods, or modules" is specific enough to match.

Add trigger phrases that reflect how you actually phrase requests. If your skill doesn't fire when you say "profile this code" or "why is this slow?", add those phrases to the description. The description is the only signal Claude has for deciding whether to match.

---

## Progressive Disclosure: Structuring Larger Skills

Skills share Claude's context window with your conversation. When a skill activates, its `SKILL.md` loads into context. For complex skills, cramming everything into one file creates two problems: it wastes context on content that isn't needed for the current request, and it becomes difficult to maintain.

Progressive disclosure solves this. Keep essential instructions in `SKILL.md` and put detailed reference material in separate files that Claude reads only when needed.

The standard directory structure:

```
~/.claude/skills/my-skill/
  SKILL.md              ← Required. Core instructions + frontmatter.
  references/           ← Detailed docs Claude reads when needed.
  scripts/              ← Executable scripts.
  assets/               ← Templates, data files.
```

In `SKILL.md`, link to supporting files with explicit loading instructions:

```
Refer to references/architecture-guide.md only when the user
asks about system design or where to add a new component.
```

This keeps the context window lightweight. Claude loads `architecture-guide.md` only when someone asks about system design — not for every request that activates the skill.

**A practical rule:** keep `SKILL.md` under 500 lines. If you're exceeding that, some content should be in a reference file.

**Scripts:** Scripts in the `scripts/` directory run without loading their source into context — only the output consumes tokens. The key instruction in your `SKILL.md` is to tell Claude to *run* the script, not *read* it. Use scripts for environment validation, data transformations that need to be consistent, or operations that are more reliable as tested code than generated code.

---

## Skills vs. Everything Else

Claude Code has five customisation mechanisms. They solve different problems and work best in combination.

| | CLAUDE.md | Skills | Subagents | Hooks | MCP servers |
|---|---|---|---|---|---|
| **When it activates** | Every conversation | On demand, when request matches | When you delegate a task | On events (file saves, tool calls) | When called as a tool |
| **Context** | Shared with main session | Shared with main session | Isolated — separate context | No context (runs externally) | External tools |
| **Good for** | Project-wide standards, always-on constraints | Task-specific expertise and procedures | Delegated work, parallel tasks | Automated side effects | External integrations |

**CLAUDE.md** loads into every conversation. Put things that always apply here: TypeScript strict mode, "never modify the database schema directly", your project's architecture overview.

**Skills** load on demand when they match your request. Put task-specific procedures here: your PR review checklist, your commit format, your documentation template. It loads only when relevant — no context bloat when you're doing unrelated work.

**Subagents** run in an isolated context. They receive a task, work independently, and return results. Use them when you want to delegate work that shouldn't pollute your main conversation, or when you need different tool access than the main session.

**Hooks** are event-driven. A hook might run a linter every time Claude saves a file, or validate input before certain tool calls. They fire on events, not on what you're asking.

**MCP servers** provide external tools and integrations — a different category entirely from skills.

<div class="callout callout-info">Skills don't replace CLAUDE.md — they complement it. A typical setup: CLAUDE.md for always-on project standards, skills for task-specific expertise, hooks for automated operations, subagents for isolated delegation. Use each for what it's designed for.</div>

---

## Priority Hierarchy

When two skills share the same name, there's a fixed precedence order:

```
Enterprise  →  Personal  →  Project  →  Plugins
(highest)                              (lowest)
```

Enterprise skills win over everything. Personal skills override project skills. Project skills override plugins.

This design lets organisations enforce mandatory standards through enterprise skills while developers still customise locally. If your company has an enterprise `code-review` skill and you write a personal `code-review` skill, the enterprise version runs every time.

The practical advice: use specific, descriptive names to avoid conflicts. "frontend-review" conflicts with fewer things than "review".

---

## Sharing Skills

**Git (simplest).** Put skills in `.claude/skills` in your repository and commit them. Anyone who clones the repo gets the skills automatically. When you push updates, everyone gets them on the next pull. Use this for team coding standards, project-specific workflows, skills that reference your codebase structure.

**Plugins.** Plugins are designed to distribute skills across repositories via marketplaces. In your plugin project, create a `skills/` directory that mirrors the `.claude/` structure — each skill gets its own folder with a `SKILL.md` inside. Other developers discover and install it from a marketplace. Use this when your skills aren't project-specific and could be useful to the broader community.

**Enterprise managed settings.** Administrators deploy skills organisation-wide through managed settings. Enterprise skills take the highest priority — they override all personal, project, and plugin skills with the same name. Managed settings also support `strictKnownMarketplaces` to control where plugins can be installed from:

```json
"strictKnownMarketplaces": [
  { "source": "github", "repo": "acme-corp/approved-plugins" },
  { "source": "npm", "package": "@acme-corp/compliance-plugins" }
]
```

Use enterprise deployment for mandatory standards, security requirements, compliance workflows, and practices that must be consistent across the entire organisation.

---

## Skills and Subagents

Here's something that catches people out: **subagents don't automatically see your skills.**

When you delegate a task to a subagent, it starts with a fresh, clean context — your skills aren't loaded into it.

Two more important distinctions:
- **Built-in agents** (Explorer, Plan, Verify) can't access skills at all
- **Custom subagents** you define *can* use skills, but only when you explicitly list them in the agent's frontmatter

To create a custom subagent with specific skills, create an agent file in `.claude/agents/`. The frontmatter includes a `skills` field:

```
---
name: frontend-security-reviewer
description: "Use this agent when reviewing frontend code for accessibility and security issues."
tools: Bash, Glob, Grep, Read, WebFetch
model: sonnet
skills: accessibility-audit, performance-check
---
```

When you delegate to this subagent, both skills are loaded at startup and applied to every review. The skills must already exist in your `.claude/skills/` directory.

This pattern works well when different subagents need different expertise (a frontend reviewer vs. a backend reviewer), or when you want to enforce standards in delegated work without relying on prompts.

---

## Troubleshooting

**Start with the validator.** The agent skills verifier command catches structural problems before you spend time debugging anything else. Install it via `uv` and run it against your skill directory.

**Skill doesn't trigger.** The cause is almost always the description. Claude uses semantic matching — if there's not enough overlap between your request and the description, no match. Check your description against how you're actually phrasing requests. Add trigger phrases like "help me profile this", "why is this slow?", "make this faster". If any variation fails to trigger, add those keywords.

**Skill doesn't load.** Two structural requirements:
- The `SKILL.md` file must be inside a named directory, not at the skills root
- The filename must be exactly `SKILL.md` — all caps, lowercase extension

Run `claude --debug` to see loading errors. Look for messages mentioning your skill name.

**Wrong skill gets used.** Descriptions are too similar. Make them more distinct — be specific about the domain, language, or situation. This also prevents conflicts with future skills.

**Priority conflict.** If your personal skill is being ignored, an enterprise or project skill with the same name is overriding it. Check the priority order. Your options: rename your skill to something more specific, or raise the conflict with the skill owner.

**Plugin skills not appearing.** Clear the cache, restart Claude Code, reinstall the plugin. If skills still don't appear, the plugin's directory structure is likely wrong — run the validator on it.

**Runtime errors.** Three common causes: missing dependencies (if your skill uses external packages, they must be installed), permission issues (scripts need execute permission — run `chmod +x`), path separators (use forward slashes everywhere, including on Windows).

**Quick checklist:**

| Symptom | Fix |
|---|---|
| Skill doesn't trigger | Improve description, add trigger phrases |
| Skill doesn't load | Check path, filename (`SKILL.md`), YAML syntax |
| Wrong skill used | Make descriptions more distinct |
| Skill gets shadowed | Check priority hierarchy, rename if needed |
| Plugin skills missing | Clear cache, reinstall plugin |
| Runtime failure | Check dependencies, `chmod +x` scripts, use `/` paths |

---

## The Rule

Every time you explain your team's coding standards to Claude, you're repeating yourself. Every PR review, you re-describe how you want feedback structured. Every commit message, you remind Claude of your preferred format.

Skills fix this permanently. Write the skill once. The tenth time it runs, you've already paid back the 15 minutes it took to write. And it runs exactly the same procedure every time, for every team member who has the skill.

Pick the task you've re-explained to Claude the most. Write the skill for that one thing first.

---

*Official resources: [Claude Code Skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills) · [Free Agent Skills course on Skilljar](https://anthropic.skilljar.com/introduction-to-agent-skills) · [Claude Code Subagents deep dive](/blog/claude-code-subagents)*
