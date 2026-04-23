---
title: "Claude Agent Skills: Teach Claude Once, Use Everywhere"
description: "Agent Skills are reusable SKILL.md packages that give Claude repeatable expertise — no repeated prompting. Here's how they work, how to build them, and when to use skills vs subagents."
date: "2026-04-23"
tags: ["claude", "agents", "developer-tools", "llm", "productivity"]
image: "../../assets/blog/claude-agent-skills/claude-agent-skills-guide.png"
draft: false
---

Every developer who uses Claude long enough hits the same wall.

You've figured out the right way to ask for a code review. You know the exact phrasing that makes Claude check for security issues, not just style. You've tuned the prompt over dozens of sessions. And then you open a new chat — and type it all again from scratch.

That's the problem Agent Skills solve.

![Claude Agent Skills: Teach Claude Once, Use Everywhere — how SKILL.md files give Claude repeatable expertise](../../assets/blog/claude-agent-skills/claude-agent-skills-guide.png)

---

## What Skills Are

A Skill is a `SKILL.md` file — a short YAML header plus markdown instructions — that teaches Claude how to perform a specific task, every time, without re-prompting.

The analogy that clicked for me: writing a skill is less like writing a prompt and more like writing a runbook. You write it once, you hand it to Claude, and now Claude knows the procedure. Whether you ask naturally, invoke it by name, or Claude recognises it's relevant on its own — the procedure runs.

Skills live in `.claude/skills/<skill-name>/SKILL.md` for project-specific use, or `~/.claude/skills/<skill-name>/SKILL.md` for personal use across every project. Project skills take priority over personal ones when names conflict.

---

## How Skills Load: Progressive Disclosure

This is the part most people miss, and it's what makes skills practical at scale.

Claude doesn't load every skill in full at the start of every conversation. It loads only the descriptions. The full `SKILL.md` content loads on demand — when Claude determines the skill is relevant, or when you invoke it directly.

![Agent Skills progressive disclosure — descriptions always pre-loaded, full SKILL.md reads on demand, result flows back](/diagrams/agent-skills-loading.svg)

Three stages:

1. **Discovery** — All skill descriptions are always in Claude's context. Compact, max 1,536 characters each. No context window cost regardless of how many skills you have.
2. **Loading** — When a skill is relevant, the full `SKILL.md` is read — instructions, output format, templates, examples.
3. **Execution** — The skill runs, and the result returns to your conversation in exactly the format you defined.

You can have dozens of skills available without slowing anything down. The descriptions are always there; the details arrive only when needed.

---

## The SKILL.md Format

Every skill needs a `SKILL.md` with YAML frontmatter between `---` markers, followed by the actual instructions. The minimum viable skill looks like this:

```yaml
---
name: code-review
description: Review code for bugs, security issues, and style violations. Use for PR reviews and pre-merge checks.
---

When reviewing code, always check for:
1. Security issues — injection, exposed secrets, improper validation
2. Logic errors and edge cases
3. Missing error handling
4. Performance problems in hot paths

Return a structured report:
CRITICAL: [list]
HIGH: [list]
SUGGESTIONS: [list]
VERDICT: approve | request-changes
```

The key frontmatter fields:

| Field | What it does |
|---|---|
| `name` | Skill identifier. Becomes the `/skill-name` slash command. |
| `description` | What the skill does and when to use it. Claude reads this to decide whether to auto-invoke. |
| `disable-model-invocation: true` | Only you can invoke it — prevents Claude from auto-running anything with side effects. |
| `allowed-tools` | Pre-approve specific tools so the skill runs without permission prompts. |
| `context: fork` | Run the skill in an isolated subagent context, keeping main conversation clean. |
| `model` | Override which Claude model this skill uses. |

Most skills only need `name`, `description`, and the instructions. The rest is optional, and you'll know when you need it.

---

## Three Ways to Invoke a Skill

**Automatic** — Claude reads all skill descriptions and auto-loads any skill that matches the current task. You don't do anything; it activates on its own.

**Manual slash command** — You type `/code-review src/api/payments.ts` and Claude runs that skill directly on your input.

**Natural language** — You say "can you review this file for security issues?" and Claude figures out the `code-review` skill matches and loads it.

The `description` field determines when Claude auto-invokes. Write it clearly and specifically — vague descriptions lead to either no auto-invocation or too many false positives.

<div class="callout callout-warning">Add <code>disable-model-invocation: true</code> to any skill that commits code, sends messages, deploys, or takes any irreversible action. Those should be explicitly triggered, not auto-run because Claude thought it was helpful.</div>

---

## Real Examples Worth Building

**Code reviewer.** Bake your team's standards into the skill — the specific checks you always forget to do manually, the security patterns your stack is vulnerable to, the output format your team actually reads.

**Documentation generator.** A skill that writes JSDoc comments in a consistent format, with your output schema locked in. Tell it to return a JSON array with no extra commentary, and it returns exactly that, every time.

**PR summary writer.** Combine a skill with dynamic context injection — shell commands that execute before Claude sees the prompt:

```yaml
---
name: pr-summary
description: Summarize the current pull request for a team Slack update
disable-model-invocation: true
allowed-tools: Bash(gh *)
---

## Pull request context
- Diff: !`gh pr diff`
- Comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

Summarize this pull request for the team Slack channel.
Focus on: what changed, why it matters, what reviewers should test.
```

The `` !`command` `` syntax runs shell commands before Claude sees anything. By the time the model processes this, the actual diff is already there — not the command, the output.

**Commit message writer.** A skill that pulls the current diff automatically, enforces your commit format, and outputs only the message. Nothing else.

<div class="callout callout-tip">Start with a skill that fixes something you already repeat manually. If you've typed the same prompt three times in different sessions, that's a skill waiting to be written.</div>

---

## Skills vs. Subagents

The distinction trips people up. Here's the practical version:

| | Skills | Subagents |
|---|---|---|
| **What they are** | Instructions Claude uses | Mini-agents with isolated context |
| **Context** | Shares main conversation | Completely separate window |
| **Best for** | Consistent tasks, style guides, reference | Complex multi-step work, bulk operations |
| **Invocation** | Auto or `/skill-name` | Delegated from main session |
| **Output noise** | Stays in main context | Contained — only summary returns |

Think of it this way: **skills make Claude better at a task** — they're training. **Subagents handle a task separately** — they're delegation.

A code-review skill tells Claude how to review code. A code-review subagent runs the review in its own context so your main session doesn't fill up with 30 file reads.

You can combine them. Add `context: fork` to a skill's frontmatter and it runs as a subagent — isolated context, same `SKILL.md` instructions. Best of both.

---

## Context Fork: Skills in Isolation

When a skill reads a lot of files or generates intermediate output you don't need cluttering your main conversation, add `context: fork`:

```yaml
---
name: deep-review
description: Review the full codebase for a specific security concern
context: fork
agent: Explore
allowed-tools: Read Grep Glob
---

Review all files in src/ for:
- Hardcoded credentials or secrets
- Raw SQL string concatenation
- Missing input validation at API boundaries

Return a prioritized list with file:line references.
Do not return intermediate findings — final list only.
```

This spawns a subagent with the skill content as its task. It does the work in isolation and returns only the result. Your main session sees the summary, not the 40-file traversal.

---

## What Makes a Good Skill

The skills that actually get used share a few traits:

1. **A specific trigger** — the `description` is clear enough that Claude knows exactly when to invoke it
2. **A defined output format** — the instructions tell Claude exactly what to return, not just what to think about
3. **A narrow scope** — one skill, one job. A skill that tries to be a code reviewer, docs writer, and refactoring tool works poorly at all three
4. **Explicit blockers** — tell the skill what to do when it can't complete the task:

```
If the target file is not specified or cannot be found, respond:
BLOCKED: [reason]
NEEDS: [what would unblock you]
Do not proceed past a blocker.
```

This is better than getting a confident-sounding output that's quietly wrong.

<div class="callout callout-info">Anthropic offers a free certification course on Agent Skills at <a href="https://anthropic.skilljar.com/introduction-to-agent-skills">anthropic.skilljar.com</a> — covers building, configuring, and sharing skills with no prior coding required.</div>

---

## The Payoff

The investment is asymmetric. Writing a good skill takes 20 minutes once. Running it costs nothing. The tenth time you invoke it, you've already paid back the time. And it's been running exactly the same procedure every time.

That consistency is the real value — not the time saved, but the guarantee that the same skill means the same thing across every session, every project, every team member who works in the same codebase.

The developers I've seen get the most out of this aren't building elaborate skill libraries. They identify one repeated, annoying task, write a skill for it, and move on. Then they do it again next week. Over six months, the compounding is real.

Pick the task you've re-explained to Claude the most times. Write the skill. That's the whole playbook.

---

*Official resources: [Claude Code Skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills) · [Free Agent Skills course on Skilljar](https://anthropic.skilljar.com/introduction-to-agent-skills) · [Claude Code Subagents guide](/blog/claude-code-subagents)*
