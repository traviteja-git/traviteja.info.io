---
title: "From Prompt Engineering to Orchestrating AI Agents"
description: "A developer's journey from replacing Stack Overflow with ChatGPT to orchestrating multi-agent systems with MCP servers — how AI changed the way we actually build software."
date: "2026-02-19"
tags: ["ai", "agents", "prompt-engineering", "llm", "developer-tools"]
image: "/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png"
draft: false
---

![AI Development: From Prompt Engineering to Multi-Agent Systems — what changed, why it matters, and the future for Data Engineers and Cloud Architects](/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png)

A year ago, a developer needed to understand their code, their framework, and their tools.

Today, that same developer needs to understand how to decompose a goal into tasks, assign those tasks to the right agents, design the tools those agents can use, handle failures across a distributed system of AI workers, and connect all of it to the external applications their team already runs on.

That is a staggering expansion in scope. And it happened in roughly twelve months.

---

## It Started Simple: Just Ask the Question

When ChatGPT arrived, the shift for developers was minimal at first. You had a question, you typed it, you got an answer. The only new skill was knowing where to go — and that was just replacing one tab with another.

Stack Overflow needed the exact right question. ChatGPT let you describe the problem conversationally and iterate. Faster, more flexible, lower friction. Most developers adopted it almost immediately, without thinking much about it.

**Scope at this stage:** your code + knowing how to ask a clear question.

---

## The IDE Integration: Context Started to Matter

Then AI moved into the editor. GitHub Copilot, Cursor, and others put the model right next to the code. Now the AI wasn't just answering questions — it was watching what you were building and offering to help in real time.

This introduced a new consideration most developers hadn't thought about before: *context*. What does the model see? What does it not see? How does the surrounding code affect what it suggests? Getting good results wasn't just about the question anymore — it was about what information the model had access to when it answered.

**Scope at this stage:** your code + the context the model can see + how to shape that context.

---

## Prompt Engineering: Language Became a Technical Skill

The next layer of understanding arrived when developers noticed something: the same question, phrased two different ways, could give wildly different results. Phrasing wasn't cosmetic — it was functional. How you described a problem directly determined the quality of the output.

This turned language into a technical skill. Developers started thinking about prompts the way they'd think about function signatures — precision mattered, structure mattered, the assumptions you made explicit versus the ones you left implicit mattered.

Teams began building prompt libraries. Shared templates for recurring tasks — code review, PR descriptions, summarising documentation. The best prompts became team infrastructure, passed around and improved the same way useful scripts get shared.

**Scope at this stage:** your code + context + deliberate language + shared prompt systems.

---

## Agents: From Answering Questions to Taking Actions

Then agents entered the picture, and the scope jumped significantly.

An agent isn't just a model that responds — it's a model that can *act*. Run code. Call APIs. Search the web. Read and write files. The model stopped being an advisor and started being an executor. You weren't asking it questions anymore; you were giving it goals.

This required a fundamentally different way of thinking. Designing what tools an agent should have access to. Deciding how to break a large goal into smaller steps. Thinking about what happens when one step fails. Handling the fact that the same goal might produce a different sequence of actions on different runs.

Suddenly, developers needed to think about agent behaviour the way they'd think about any distributed system — with real consideration for failure modes, state management, and observability.

**Scope at this stage:** goals + task decomposition + tool design + failure handling + observability.

---

## Multi-Agent Systems: Coordination Became the Job

The evolution didn't stop at one agent. As the tooling matured, it became possible — and then practical — to run multiple agents in parallel, each specialised for a different kind of work, coordinating with each other to complete tasks that no single agent could handle alone.

Think about what that requires a developer to understand: not just how one agent behaves, but how a *system* of agents behaves. Who talks to who. In what order. What happens when agents produce conflicting outputs. How to prevent one agent from undoing what another just finished. How to keep costs from spiralling when agents run in loops.

This is system architecture. Not AI-specific system architecture — just system architecture, applied to a new domain.

**Scope at this stage:** system design + agent coordination + inter-agent communication + cost control.

---

## MCP Servers: Everything Connected

The current frontier for a lot of developers is MCP — Model Context Protocol. A standard that lets AI tools connect directly to the external systems a team already uses. Git. Docker. Jira. Confluence. Your database. Your CI pipeline.

Instead of context-switching between applications to piece together a full picture of something, the AI sits in the middle with access to all of it. Ask a question that spans systems. Kick off a task that touches multiple tools. Route different types of work to different agents based on what each one is good at.

What a developer manages at this stage looks less like "using an AI tool" and more like running a small, distributed team — one where the team members are agents, the communication protocol is structured, and you are the one deciding priorities, tooling, and what gets delegated.

**Scope at this stage:** connected systems + protocol design + orchestration + delegation + validation.

---

## What This Actually Means

Draw a line from where we started to where we are now:

- **2023:** Ask ChatGPT instead of Stack Overflow.
- **2024:** Write prompts carefully. Save the good ones. Share them.
- **2025:** Design agents. Give them tools. Run them in parallel.
- **2026:** Orchestrate systems of agents connected to everything your team uses.

Each step expanded what a developer needed to understand — not just in terms of tooling, but in terms of *thinking*. The mental models required at each stage are genuinely different from the ones before.

The developers who are navigating this well aren't necessarily the ones who were best at writing code. They're the ones who are good at systems thinking, clear communication, and knowing how to break a complex goal into well-defined pieces. Those skills have always mattered. AI just moved them to the top of the stack.

The pace of this change is the part worth paying attention to. This entire arc — from "just ask the question" to "orchestrate a system of agents connected to your entire toolchain" — happened in about a year.

Whatever comes next will probably happen faster.

---

*If you're curious about where to start with agents or MCP, the best move is to just pick one thing you do manually and try delegating it. The learning curve is shorter than it looks — and the compounding is real.*
