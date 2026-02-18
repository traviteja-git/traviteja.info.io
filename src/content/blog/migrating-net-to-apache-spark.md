---
title: "Migrating a Legacy .NET Data Pipeline to Apache Spark"
description: "Lessons learned from rewriting a batch processing system from .NET to PySpark on Databricks — achieving 10x throughput improvement."
date: "2025-11-18"
tags: ["spark", "databricks", "python", "migration"]
draft: false
---

## The problem

Our Identity Resolution pipeline was built on a legacy .NET application that processed hundreds of
millions of records nightly. As data volumes grew, the pipeline's single-threaded design couldn't keep up.
Nightly jobs that used to finish in 2 hours were now taking 14+ hours.

## Why Spark?

Apache Spark was the natural choice:
- Native distributed processing on Databricks
- PySpark API maps cleanly to our existing Python transformation logic
- Delta Lake for reliable, ACID-compliant storage
- Deep integration with our GCP and Azure environments

## Migration strategy

We took a **strangler fig** approach — running the old and new systems in parallel until we had
confidence in the Spark output, then cutting over.

### Phase 1: Data model translation

Every .NET `IEnumerable<T>` transformation became a Spark `DataFrame` operation:

```python
# Before (.NET logic equivalent)
result = df.filter(col("status") == "active") \
           .groupBy("entity_id") \
           .agg(collect_list("record_id").alias("records"))
```

### Phase 2: Parallelism tuning

Getting partition count right was critical. Too few and you don't use the cluster. Too many
and shuffle costs dominate.

```python
# Rule of thumb: 2-4x number of CPU cores
df = df.repartition(800, "entity_id")
```

### Phase 3: Validation

We built a reconciliation job that compared record counts and spot-checked output rows between
the old and new systems. Any discrepancy > 0.001% triggered an alert.

## Results

| Metric        | .NET   | Spark (Databricks) |
|---------------|--------|--------------------|
| Runtime       | 14 hrs | 1.2 hrs            |
| Cost/run      | $180   | $42                |
| Data freshness| Daily  | Every 3 hours      |

## Key takeaways

- **Profile before optimising** — we found 80% of the time was spent in two join operations.
- **Delta Lake > Parquet** for mutable datasets (upserts, schema evolution).
- **Broadcast joins** for small lookup tables saved significant shuffle time.
- **Gradual cutover** meant zero production incidents during the migration.
