---
title: "From Prompt Engineering to Orchestrating AI Agents"
description: "How AI development has evolved from crafting single prompts to orchestrating multi-agent systems — what changed, why it matters, and what it means for engineers building data and cloud pipelines."
date: "2026-02-19"
tags: ["ai", "agents", "prompt-engineering", "llm", "data-engineering"]
image: "/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png"
draft: false
---


A couple of years ago, if you told me that "prompt engineering" would become a job title, I'd have laughed. Now it already feels dated.

That's how fast things are moving.

I've been building data pipelines for close to a decade — Airflow DAGs, Spark jobs, ETL systems that process hundreds of millions of records. For most of that time, AI was something I used as a tool to help me write faster. A smarter autocomplete. Then at some point, without me really noticing, it stopped being a tool I used and started being something I *orchestrate*. That shift is what I want to talk about.

---
![AI Development: From Prompt Engineering to Multi-Agent Systems — what changed, why it matters, and the future for Data Engineers and Cloud Architects](/images/blog/ai-agents/prompt-engineering-to-multi-agent-systems.png)

## It Started With Getting Good at Prompts

When GPT-3 and then ChatGPT came out, the first thing everyone figured out was that how you asked mattered enormously. Ask the same question two different ways, get wildly different answers. So people started treating prompt writing like a craft.

You'd learn tricks — "add 'think step by step' at the end", "give it three examples before the real question", "tell it to roleplay as a senior engineer." These worked. Genuinely. The output quality gap between a naive prompt and a well-crafted one was significant enough that it was worth investing time in.

I used this constantly. Writing boilerplate Airflow operators, generating test data, explaining a gnarly SQL query to a teammate — the prompt was the lever. Get the prompt right, get the output you need.

But there was always this ceiling. You'd do great work *within* a single exchange, then hit a wall the moment the task needed more than one step, or needed to check something, or needed to remember what you said three messages ago. The model was brilliant but fundamentally forgetful and passive. It waited for you. It couldn't *do* anything on its own.

---

## The Pipeline Phase: Chaining Things Together

The next thing that happened was developers started connecting LLM calls together. Instead of one prompt → one answer, you'd have a sequence: generate a plan, then execute each step of the plan, then summarize the results.

LangChain became popular around this time, and suddenly you could build things like: take a user question → find relevant documents → stuff them into a prompt → generate an answer grounded in actual data. RAG — retrieval-augmented generation — was the pattern that made LLMs genuinely useful for private, domain-specific data.

For me this clicked immediately. As a data engineer, this was just... a pipeline. Input, transform, output. The LLM was one node in a DAG, not the whole system.

I remember building a small internal tool at this stage that would take a pipeline failure log, search through our internal runbooks, and generate a probable root cause. Saved a lot of time. But it was fragile. The sequence was fixed. If step two failed, the whole thing broke and there was no recovery. It was smarter than a single prompt, but still fundamentally dumb about *adapting*.

---

## Agents Changed the Mental Model Entirely

Here's where it gets interesting.

The difference between a pipeline and an agent is that a pipeline follows a fixed path. An agent decides its own path. You give it a goal, it figures out what to do, tries something, looks at the result, and decides what to do next. It loops until it's done — or until it decides it's stuck and asks for help.

What makes this possible is **tool use**. An agent isn't just generating text, it's taking actions: running code, searching the web, reading files, calling APIs. The LLM is the brain; the tools are the hands.

The first time I actually experienced this — not read about it, but *used* it — it was genuinely weird. I described a task, the model wrote some code to solve part of it, ran the code, read the output, noticed an error, fixed the error, ran it again, confirmed it worked, then moved on to the next part. I hadn't told it to do any of that step by step. I just described the end goal.

It felt less like using a tool and more like working with a junior engineer who could move fast but needed clear direction.

---

## Multi-Agent Systems: When One Isn't Enough

The next step — and where things get genuinely complex — is multiple agents working together. One agent plans. Another executes. A third reviews the output and pushes back if something looks wrong. Each has a specific role, a specific set of tools, and they communicate with each other.

I find it useful to think about this like a data pipeline architecture. You have producers, consumers, transformation layers, validation checks. In a multi-agent system, each agent is a node, and the messages between them are the data flowing through the system. The orchestration logic — who talks to who, in what order, what happens on failure — is the DAG.

That framing actually makes it less intimidating. If you can design a reliable ETL pipeline, you can design a reliable agent system. The failure modes are different, but the discipline of thinking about them upfront is the same.

The hard parts, in my experience:
- Agents getting into loops where they keep retrying something that's never going to work
- Cost spiraling because you didn't set a stopping condition
- Debugging — when something goes wrong across three agents, finding *where* it went wrong is painful unless you've logged everything

That last one especially. Log everything. Every tool call, every decision, every input and output from every agent. You cannot debug what you cannot see. This is the same lesson I learned the hard way building Airflow pipelines — observability is not optional, it's the whole game.

---

## What's Actually Different for Data Engineers

Here's my honest take: data engineers are better positioned for this shift than most people realise.

The skills that matter in agentic AI systems — pipeline design, fault tolerance, state management, thinking about what happens when things fail — are skills data engineers already have. The tooling is different. The abstraction level is higher. But the thinking is familiar.

What's changing is *what* those pipelines are doing. More and more, the transformation logic inside a pipeline step is not hand-written code — it's an agent figuring out what code to write. The engineer's job shifts from writing every transformation to designing the system that decides what transformations are needed.

That's not a smaller job. It's a different one.

---

## Where Most People Are Right Now

Honestly? Most production AI usage is still in the early prompt-chaining phase. Pure prompt engineering has faded. RAG is mature and widely deployed. Single-agent systems with tool use are becoming standard for internal tooling.

True multi-agent orchestration in production — reliable, observable, cost-controlled — is still hard and most teams are figuring it out as they go. The frameworks are good but they're evolving fast. What worked six months ago might not be the right approach today.

My advice: don't wait for the tooling to stabilize before learning the concepts. The concepts are stable. Agents, tools, memory, orchestration — these ideas will outlast any specific framework. Learn how to think about them, build something small, break it, understand why it broke. That's the only real way through.

---

The gap between prompt engineering and agent orchestration isn't a technical one so much as a conceptual one. Once you stop thinking of the LLM as something you query and start thinking of it as something you *deploy* — as a component in a larger system with inputs, outputs, failure modes, and observability requirements — the rest follows naturally.

At least, that's been my experience. Still figuring out the rest.
