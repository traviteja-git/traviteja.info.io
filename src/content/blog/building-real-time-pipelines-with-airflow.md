---
title: "Building Real-Time Data Pipelines with Apache Airflow on GCP"
description: "How I designed and deployed production-grade orchestration workflows using Cloud Composer on Google Cloud Platform."
date: "2026-02-10"
tags: ["airflow", "gcp", "data-engineering", "python"]
draft: false
---

## Overview

Orchestrating data workflows at scale is one of the core challenges in modern data engineering.
In this article I'll walk through how we use **Apache Airflow** (via Google Cloud Composer) at Deloitte
to manage complex, dependency-driven pipelines across BigQuery, Dataflow, and Spark.

## Why Cloud Composer?

Cloud Composer is the managed Airflow service on GCP. It removes the operational burden of
managing the Airflow scheduler, workers, and metadata database, letting you focus on writing DAGs.

Key advantages:
- Native integration with BigQuery, GCS, Dataflow, and Pub/Sub operators
- IAM-based access control
- Auto-scaling worker pools
- Built-in logging to Cloud Logging

## Structuring DAGs for maintainability

One pattern that scaled well for us is separating **task logic** from **DAG definition**:

```python
# tasks/bq_tasks.py
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator

def build_transform_task(dag, task_id: str, sql: str):
    return BigQueryInsertJobOperator(
        task_id=task_id,
        configuration={"query": {"query": sql, "useLegacySql": False}},
        dag=dag,
    )
```

This keeps DAG files concise and makes unit testing individual tasks straightforward.

## Handling dependencies and SLAs

Airflow's `depends_on_past` and `sla` parameters give you fine-grained control:

```python
task = BigQueryInsertJobOperator(
    task_id="daily_aggregation",
    depends_on_past=True,
    sla=timedelta(hours=2),
    ...
)
```

## Lessons learned

- **Idempotency** — every task should be safe to re-run. Write transforms as `CREATE OR REPLACE`.
- **Small DAGs** — break large workflows into focused DAGs with clear ownership.
- **Sensors vs triggers** — use `ExternalTaskSensor` for cross-DAG dependencies, not shared state.
- **Monitoring** — set up alerting on `failed` and `sla_miss` events from the start.

## Wrapping up

Cloud Composer makes it easy to start, but production-grade pipelines demand careful design.
Focus on idempotency, modularity, and observability from day one and you'll avoid the most
common pain points.
