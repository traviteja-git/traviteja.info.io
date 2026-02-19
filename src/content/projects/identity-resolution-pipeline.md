---
title: "Identity Resolution Pipeline"
description: "Multi-cloud identity resolution pipeline processing 800M records with Apache Spark on Databricks, delivering 70% performance improvement over the legacy .NET system."
tech: ["Apache Spark", "Databricks", "Python", "Apache Airflow", "GCP", "Azure", "AWS", "C#", "MongoDB"]
featured: true
---

## Overview

Designed and engineered a large-scale identity resolution platform for Deloitte's Converge Consumer Innovation suite, enabling enterprise clients to match, deduplicate and unify customer records across multiple data sources. The pipeline processes **800 million records** per run across AWS, Azure and GCP.

## Architecture

- **Ingestion**: Multi-cloud source connectors reading from S3, Azure Blob and GCS
- **Processing**: Distributed matching with Apache Spark on Databricks — configurable rule engine (exact, fuzzy, ML-based)
- **Microservices**: Cleanse, Convert, CASS, Pinning, Stitch — each independently deployable as console apps or REST APIs
- **Orchestration**: Apache Airflow managing pipeline execution and dependency resolution
- **Deployment**: Automated single-click deployment across AWS and Azure via DevOps pipelines

## Key Contributions

- Migrated core pipeline from legacy .NET code to Apache Spark, achieving a **70% increase in job performance**
- Engineered a custom Spark pipeline processing **800M records**, reducing processing time by **50%** vs. the previous system
- Rewrote a critical identity matching microservice, improving throughput by **5×**
- Collaborated with DevOps to implement single-click multi-cloud deployments across AWS and Azure within 3 months
- Built real-time microservices delivering data hygiene, address normalisation, identity resolution and data governance

## Impact

- **70%** performance improvement — legacy .NET → Apache Spark migration
- **50%** reduction in processing time for 800M record pipeline runs
- **5×** throughput gain on rewritten identity matching microservice
- Multi-cloud (AWS + Azure) support delivered within 3 months

## Awards

Received Applause Award for successfully migrating the legacy .NET codebase to Apache Spark within the specified timeframe.
