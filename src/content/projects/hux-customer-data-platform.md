---
title: "Hux — Customer Data Platform"
description: "Batch ingestion pipeline and microservices suite for a large-scale Customer Data Platform on GCP and Azure, delivering 25% cost reduction and 20% scalability increase."
tech: ["Apache Airflow", "GCP", "BigQuery", "Python", "Cloud Composer", "C#", "MongoDB", "Azure", "AKS", "GKE"]
featured: true
---

## Overview

Engineered the data ingestion layer and identity resolution microservices for Hux, Deloitte's enterprise Customer Data Platform. The platform consolidates customer data from multiple sources into unified profiles for analytics and marketing activation, deployed across Azure and GCP.

## Microservices Suite

Built and productised the following real-time microservices, each available as both Console applications and REST APIs:

- **Cleanse** — data quality and hygiene
- **Convert** — schema and format transformation
- **CASS** — address standardisation (USPS CASS certified)
- **Pinning** — geographic data enrichment
- **Stitch** — cross-source identity linking and resolution

## Key Contributions

- Engineered batch ingestion DAGs with Apache Airflow (Cloud Composer) collecting data from 10+ source systems into BigQuery
- Productised all microservices as both Console applications and REST APIs for multi-client deployment
- Deployed scalable microservice architectures on Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE)
- Implemented data quality validation gates before loading into BigQuery
- Optimised pipeline scheduling to reduce processing windows and cloud compute costs

## Impact

- **25%** reduction in cloud infrastructure costs
- **20%** increase in pipeline scalability
- Reduced time-to-insight for business analysts from days to hours
- Delivered data hygiene, address normalisation, identity resolution and data governance for enterprise clients

## Awards

Received Outstanding Performance Award for successfully delivering, deploying and providing continuous client support throughout the engagement.
