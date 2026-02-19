---
title: "LGE Customer Data Platform"
description: "Data ingestion architecture for LG Electronics using Talend and Apache Airflow on GCP, reducing manual processing from 18–20 days to 2–3 days and a data feed from 13 hours to 1 hour."
tech: ["Talend", "Apache Airflow", "GCP", "BigQuery", "PostgreSQL", "Python", "Docker", "ETL"]
featured: false
---

## Overview

Designed and implemented the data ingestion and curation architecture for LG Electronics' Customer Data Platform at Deloitte. The platform consolidated customer data from heterogeneous regional systems into a centralised GCP data warehouse for global analytics.

## Pipeline Architecture

- **Source**: Dovetail files (>400GB) downloaded from GCP buckets across multiple file formats
- **Processing**: Talend Big Data jobs — decryption, decompression, CSV conversion, cleansing
- **Orchestration**: Apache Airflow scheduling and managing Talend job execution based on business rules
- **Destination**: PostgreSQL staging layer → Google BigQuery for analytics consumption

## Key Contributions

- Built configurable automation Talend jobs to process >400GB dovetail files end-to-end: GCP download → decryption → unzipping → CSV conversion → cleansing → reload to GCP
- Reduced a manually-operated **18–20 day** process down to **2–3 days** through full automation
- Used Apache Airflow to orchestrate Talend jobs, enforcing business rules and dependencies
- Developed complex Talend jobs fetching data from GCP buckets across multiple file formats and loading into PostgreSQL and BigQuery
- Proposed and implemented a performance fix reducing a critical data feed runtime from **>13 hours to 1 hour**
- Configured automation jobs for Cleanse, Convert, CASS and Pinning on differential historical data

## Impact

- **18–20 days → 2–3 days** for the full data processing cycle
- **>13 hours → 1 hour** for the critical data feed runtime
- Eliminated manual file processing, freeing the team for higher-value work
- Established the foundation for LG Electronics' future GCP data platform

## Awards

Received Applause Award for taking ownership of multiple project elements across different tech stacks and delivering milestones within the given timeframe.
