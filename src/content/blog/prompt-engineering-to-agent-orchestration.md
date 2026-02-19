---
title: "From Prompt Engineering to Orchestrating AI Agents"
description: "A developer's personal journey from replacing Stack Overflow with ChatGPT to orchestrating multi-agent systems with MCP servers — how AI changed the way we actually build software."
date: "2026-02-19"
tags: ["ai", "agents", "prompt-engineering", "llm", "developer-tools"]
image: "/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png"
draft: false
---

![AI Development: From Prompt Engineering to Multi-Agent Systems — what changed, why it matters, and the future for Data Engineers and Cloud Architects](/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png)

About a year ago, something quietly changed in how I worked.

I stopped opening Stack Overflow first.

It wasn't a conscious decision. One day I just noticed I was typing my question into ChatGPT instead, and the tab I used to always have pinned was just... not there anymore. That small habit shift turned out to be the beginning of something much bigger.

---

## Stage 1: ChatGPT Replaced Stack Overflow

When ChatGPT came out, the immediate reaction from most developers I knew was somewhere between impressed and skeptical. Sure, it could answer questions — but could you actually trust it?

Turns out, yes. Mostly. Enough.

The difference from Stack Overflow wasn't just speed. It was the conversation. Instead of hunting through five different threads hoping someone had the exact same problem, you could just... describe your situation. Get an answer. Ask a follow-up. Get a better answer. It felt less like searching documentation and more like having a very fast, very patient colleague who happened to know everything.

Within a few months, my whole search behaviour had shifted. Stack Overflow became the backup, not the first stop.

---

## Stage 2: It Moved Into the IDE

Once the novelty wore off, the next question was obvious: why am I switching context to a browser tab when I could just have this inside my editor?

GitHub Copilot, then Cursor, then a wave of others. Suddenly the AI wasn't something you consulted — it was something sitting right next to your code, watching what you were doing, offering to finish your sentences.

This felt different. More integrated. Less like asking for help and more like having a pair programmer who never got tired and never judged you for forgetting the exact syntax of something you've written a hundred times.

The productivity jump was real. The annoying boilerplate that used to eat twenty minutes was done in two. Tests for functions I'd already written would just appear. I started spending more time on the parts of problems that actually needed thinking.

---

## Stage 3: Discovering That Prompts Actually Matter

Here's where it got interesting.

I started noticing that the same question, asked differently, gave wildly different results. Not just in quality — in direction, structure, assumptions. Small changes in how I phrased something would completely change what came back.

So I started paying attention. Adding context. Specifying format. Telling it what role to take. "Explain this like I'm debugging it" versus "Write this as if it's going into production" — completely different outputs.

This is what people started calling prompt engineering, though at the time it felt less like a discipline and more like just learning how to communicate better with something that interpreted language very literally.

The key insight: **the quality of your output is a direct function of the quality of your input.** Garbage in, garbage out, but in a much more nuanced way than that phrase usually implies.

---

## Stage 4: Prompt Templates Across Teams

Once you figure out that prompts matter, the next realisation is that your best prompts are worth sharing.

We started doing this on my team — saving prompts that consistently produced good results, sharing them the way you'd share a useful script or a good config file. A prompt for writing PR descriptions. A prompt for summarising a dense document. A prompt for reviewing code against our internal standards.

Prompt templates. Reusable, shareable, improvable over time.

This was the moment AI stopped being an individual productivity tool and started becoming something embedded in how a team worked. The good prompts became shared infrastructure. New team members could get productive faster because the tribal knowledge of "how to get good output" was written down and usable from day one.

---

## Stage 5: Multiple Agents, Working in Parallel

Then agents showed up properly, and the game changed again.

The difference between a prompt and an agent is that an agent can take actions. It doesn't just generate text — it can run code, search the web, read files, call APIs. And crucially, you can run multiple agents at once, each working on a different part of a problem simultaneously.

For the first time, I wasn't the bottleneck. I could hand off a whole task — not just a question — and come back to a result. Or split a larger piece of work across agents and have different pieces done in parallel, then stitched together.

The productivity shift here was qualitatively different from everything before it. It wasn't faster answers. It was a different category of work delegation entirely.

---

## Stage 6: Where I Am Now — MCP Servers and Everything Connected

The current state of things, at least for me, is something I wouldn't have predicted a year ago.

I'm using MCP (Model Context Protocol) servers to connect my AI tools directly to the applications I work with every day — Docker, Git, Jira, Confluence. Everything talking to everything else through a common protocol, with the AI sitting in the middle as the thing that actually understands what I'm asking for and which tool to use.

Instead of context-switching between five different tabs to get a full picture of something, I can pull all of it into one place. Ask a question that spans tools. "What Jira tickets are blocked because of the open Docker issue?" — and get an answer that would have previously required me to manually cross-reference two systems.

Different tasks get different agents. Different agents have different skills. I've started thinking about this less like using a tool and more like managing a small team where each member has a specific role and you're the one deciding what to prioritise and who to hand it to.

---

## What's Actually Changed

Looking back at that progression — Stack Overflow → ChatGPT → IDE integration → prompt engineering → templates → agents → MCP — each step felt incremental at the time. But the cumulative shift is significant.

A year ago, AI was something I used occasionally to answer questions. Now it's embedded in how I work at almost every level — writing, reviewing, searching, summarising, executing tasks across tools.

The developers who are going to be most effective in the next few years aren't necessarily the ones who know the most. They're the ones who get good at orchestrating — deciding what to delegate, how to describe it, and how to verify the result.

That's a learnable skill. And honestly, the learning curve is not that steep. You just have to actually use it, not just read about it.

Start with one thing. Let it do one task you currently do manually. See what comes back. Adjust. Try something harder next time.

That's all it is, really. The compounding effect takes care of the rest.
