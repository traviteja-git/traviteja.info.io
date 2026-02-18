---
title: "Identity Resolution Pipeline"
description: "Distributed entity matching pipeline processing 500M+ records daily across AWS and Azure infrastructure using Apache Spark on Databricks."
tech: ["Apache Spark", "Databricks", "Python", "Delta Lake", "Azure", "AWS"]
featured: true
---

## Overview

A large-scale identity resolution system that matches and deduplicates customer records across
multiple data sources in real time. The pipeline handles 500M+ records per daily run.

## Architecture

The system follows a medallion architecture (Bronze → Silver → Gold) on Databricks with
Delta Lake storage:

- **Bronze**: Raw ingestion from source systems (S3, Azure Blob) via Auto Loader
- **Silver**: Cleansed and standardised records with schema enforcement
- **Gold**: Resolved entities with confidence scores and match metadata

## Key features

- Multi-cloud support (AWS + Azure) from a single codebase
- Incremental processing via Delta Lake Change Data Feed
- Configurable matching rules (exact, fuzzy, ML-based)
- Audit trail and lineage tracking for compliance

## Impact

Migrated from legacy .NET system achieving a **10x throughput improvement** and **77% cost reduction** per run.
