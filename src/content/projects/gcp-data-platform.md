---
title: "GCP Data Platform"
description: "End-to-end cloud-native data platform on Google Cloud using BigQuery, Cloud Composer, and Dataflow for real-time analytics."
tech: ["GCP", "BigQuery", "Cloud Composer", "Airflow", "Dataflow", "Python"]
featured: true
---

## Overview

A fully managed data platform built on Google Cloud Platform that powers business analytics
for enterprise clients. The platform ingests data from 15+ source systems and delivers
analytics-ready datasets to 300+ end users.

## Stack

- **Ingestion**: Cloud Pub/Sub + Dataflow for streaming; GCS + Composer DAGs for batch
- **Storage**: BigQuery as the central data warehouse with partitioned/clustered tables
- **Orchestration**: Cloud Composer (Airflow) managing 80+ production DAGs
- **Serving**: Looker Studio + BigQuery BI Engine for sub-second dashboard queries

## Highlights

- Designed the core data model supporting multi-tenant client data isolation
- Reduced average query latency by 60% through clustering and materialised views
- Implemented automated data quality checks gating downstream consumption
