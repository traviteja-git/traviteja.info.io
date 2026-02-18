---
title: "Apache Airflow Architecture Simplified"
description: "A clear breakdown of Apache Airflow's core components — Web Server, Scheduler, Executor, Workers, Metadata DB, and Message Broker — and how they collaborate to orchestrate data workflows."
date: "2024-07-18"
tags: ["airflow", "data-engineering", "architecture"]
draft: false
---

> Originally published on [Medium – Apache Airflow publication](https://medium.com/apache-airflow/airflow-architecture-simplified-3d582fc3ccb0).

[Apache Airflow](https://airflow.apache.org/) is an open-source platform designed to orchestrate complex data workflows. It uses **Directed Acyclic Graphs (DAGs)** to define a series of tasks and their dependencies. Airflow is made up of several microservices that collaborate to execute these tasks. Here's a straightforward breakdown of the key components of Airflow's architecture.

![Apache Airflow Architecture Overview](/images/blog/architecture/overview.gif)

## Components

### Web Server 🌐

The Airflow UI where you can monitor and manage DAGs, Variables, Connections, and check logs. It provides a dashboard that helps you visualise your data workflows, check their progress, and troubleshoot any issues.

![Web Server](/images/blog/architecture/webserver.gif)

### Scheduler 🕰️

Responsible for managing the execution of tasks. It monitors the DAGs and schedules tasks based on their dependencies and timing configurations, making sure that tasks are executed in the right order and at the right time.

![Scheduler](/images/blog/architecture/scheduler.gif)

### Executor ⚙️

The Executor's primary role involves executing tasks actively. It interacts with the Scheduler to obtain task details and initiates the required processes or containers for task execution.

Airflow offers various Executor types like `LocalExecutor`, `CeleryExecutor`, and `KubernetesExecutor` — each tailored to specific infrastructure setups and operational needs.

![Executor](/images/blog/architecture/executor.gif)

### Worker 👷

The Worker is a component that performs the tasks assigned by the Executor. Depending on the chosen Executor, it can be a separate process or container. Workers are responsible for executing the actual code or scripts defined in your tasks and reporting their status back to the Executor.

![Worker](/images/blog/architecture/worker.gif)

### Metadata Database 🛢

This is where Airflow keeps track of all your workflows, including details about the tasks you've set up and how they've run in the past. It's like a central hub for storing and organising everything related to your scheduled tasks — helping you keep an eye on progress and troubleshoot any issues that come up.

Airflow supports different databases like PostgreSQL, MySQL, or SQLite, depending on what works best for your setup.

![Metadata Database](/images/blog/architecture/metadata-db.gif)

### Message Broker ✉️ (Optional)

In setups where the `CeleryExecutor` is used for distributing tasks, a message broker plays a crucial role. Brokers like RabbitMQ or Redis act as a middleman between the Scheduler and the Workers — passing task details from the Scheduler to the Workers, ensuring tasks are executed reliably and efficiently across the distributed system.

![Message Broker](/images/blog/architecture/message-broker.gif)

---

If you like the diagrams, all designs (GIFs, images, and draw.io templates) are available in my GitHub repository:

**Repo:** [https://github.com/raviteja-git/Airflow/tree/main/Airflow%20Architecture](https://github.com/raviteja10096/Airflow/tree/main/Airflow_Architecture)

Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/raviteja0096/) if you have any questions or want to learn more about Airflow!
