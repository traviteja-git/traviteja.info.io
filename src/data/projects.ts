export interface Project {
  title: string;
  company: string;
  role: string;
  period: string;
  logo: string;
  endYear: number | null;
  tech: string[];
  description: string;
  highlights: string[];
}

export function relativeTime(endYear: number | null): string {
  if (!endYear) return 'Currently active';
  const now = new Date();
  const end = new Date(endYear, 11, 31);
  const diffMs = now.getTime() - end.getTime();
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  if (diffYears < 1) {
    const months = Math.max(1, Math.floor(diffYears * 12));
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(diffYears);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

export const projects: Project[] = [
  {
    title: "Banking & Sales Platform (RBC)",
    company: "Capgemini Technology Services",
    role: "Software Engineer",
    period: "2017 – 2018",
    logo: "/images/logos/capgemini.png",
    endYear: 2018,
    tech: ["C#", "VB.Net", ".NET", "MVC", "TFS"],
    description: "Web-based sales platform for a major financial institution to sell products to customers, with configurable multi-environment deployment.",
    highlights: [
      "Assisted in development and maintenance of a web-based sales platform enabling a major financial institution to sell products to customers.",
      "Developed and maintained an Application Launch Pad module for managing and refocusing application windows across the platform.",
      "Created configurable environment-detection files to assign respective parameters across dev, staging, and production environments.",
    ],
  },
  {
    title: "Tech Modernization – Microservices Re-engineering",
    company: "Deloitte",
    role: "Business Technology Analyst",
    period: "2018 – 2019",
    logo: "/images/logos/deloitte.png",
    endYear: 2019,
    tech: ["C#", ".NET Core", "MongoDB", "Docker", "TFS"],
    description: "Re-engineered near real-time microservices from a legacy monolith — bulk processing dropped from 60+ hours to 2 minutes for 1M records.",
    highlights: [
      "Re-engineered near real-time microservices for data cleaning, address standardization, identity resolution, and data governance from legacy monolithic systems.",
      "Containerized all services using Docker for consistent and portable deployments across environments.",
      "Improved data loading performance from 30 minutes → 1.3 minutes for 100K records.",
      "Improved bulk processing performance from 60+ hours → 2 minutes for 1M records.",
    ],
  },
  {
    title: "HP CX Transformation",
    company: "Deloitte",
    role: "Business Technology Analyst",
    period: "2019",
    logo: "/images/logos/deloitte.png",
    endYear: 2019,
    tech: ["C#", "MS SQL", ".NET Core", "SSIS"],
    description: "Created SSIS packages to populate data from multiple data feeds into databases using advanced transformations.",
    highlights: [
      "Created SSIS packages populating data from multiple feeds using lookup, derived column, and conditional split transformations.",
      "Developed custom SSIS script components using C# for complex data manipulation.",
    ],
  },
  {
    title: "CDP Implementation (LGE)",
    company: "Deloitte",
    role: "Business Technology Analyst",
    period: "2019 – 2020",
    logo: "/images/logos/deloitte.png",
    endYear: 2020,
    tech: ["GCP", "PostgreSQL", "Talend", "Apache Airflow", "Python", "Docker", "Linux"],
    description: "Built a configurable automation pipeline processing 400GB+ files daily, reducing processing time from 18–20 days to 2–3 days.",
    highlights: [
      "Built a configurable automation pipeline to process 400GB+ files (download, decrypt, unzip, cleanse, load to cloud storage), reducing processing time from 18–20 days to 2–3 days.",
      "Orchestrated data curation jobs using Apache Airflow for business rule-based execution.",
      "Proposed and implemented a performance optimisation that reduced a critical data feed runtime from 13+ hours to under 1 hour.",
      "Developed multi-format data ingestion pipelines from cloud storage into relational and analytical databases.",
    ],
  },
  {
    title: "EDI & ERP Data Integration Platform",
    company: "Strategic Technology Resources International",
    role: "Full Stack Developer",
    period: "2020",
    logo: "/images/logos/stri.png",
    endYear: 2020,
    tech: [".NET Core", "Java", "MSSQL", "SSIS", "Azure"],
    description: "Developed an application enabling data flow through ERP systems to identify customers and generate appropriate output files.",
    highlights: [
      "Developed an application enabling data flow through ERP systems to identify customers and generate appropriate output files.",
      "Created configurable automation console apps, Windows applications, and web services to process XML files into Azure-hosted database tables.",
      "Enabled user authentication via LDAP integration and migrated existing web and Java applications to Azure and Windows platforms.",
      "Developed complex SQL stored procedures and views to fetch and transform data from CSV and XML sources.",
    ],
  },
  {
    title: "Full Stack Web Application Development",
    company: "Strategic Technology Resources International",
    role: "Full Stack Developer",
    period: "2020 – 2021",
    logo: "/images/logos/stri.png",
    endYear: 2021,
    tech: ["Angular", "AngularJS", "Node.js", "Asana", "Bitbucket"],
    description: "Built modern single-page applications using AngularJS and Node.js with modularised, maintainable front-end architecture.",
    highlights: [
      "Built modern SPAs using AngularJS and Node.js with highly modularised and maintainable front-end architecture.",
      "Acted as interface between development team and client, ensuring crisp communication and timely delivery.",
      "Cooperated with back-end developers in building and integrating RESTful APIs.",
    ],
  },
  {
    title: "CDM Microservices – Identity & Data Quality",
    company: "Deloitte",
    role: "Sr. Product Engineer",
    period: "2021 – 2023",
    logo: "/images/logos/deloitte.png",
    endYear: 2023,
    tech: ["C#", "Python", "MongoDB", "Docker", "Kubernetes", "Azure", "GCP", "ArgoCD", "Grafana"],
    description: "Developed and productized near real-time microservices for data cleaning, address standardization, and PII-based identity unification on Azure and GCP.",
    highlights: [
      "Developed and productized near real-time microservices — Cleanse, Convert, CASS, Pinning, and Stitch — as Console applications and REST APIs.",
      "Delivered scalable microservice architectures for diverse deployments using Airflow for orchestration on Azure and GCP container platforms.",
      "Implemented multi-threading in the digital presence-based identity unification microservice — 4× performance boost, resolving a critical production blocker.",
      "Resolved multi-threading issues in the PII-based identity unification microservice — 8× performance boost.",
      "Refactored identity microservices to product standards, releasing multiple versions with 10–12% incremental performance improvements.",
      "Resolved all security scan vulnerabilities (WhiteSource, JFrog Xray) across identity microservices, releasing hardened versions.",
      "Enabled TLS across identity and unification microservices for secure communication.",
      "Implemented dynamic runtime statistics for microservices as the foundation for platform UI metrics.",
    ],
  },
  {
    title: "Apache Airflow – Batch Ingestion Pipeline",
    company: "Deloitte",
    role: "Sr. Product Engineer",
    period: "2023 – 2024",
    logo: "/images/logos/deloitte.png",
    endYear: 2024,
    tech: ["Apache Airflow", "Python", "GCP", "Azure Kubernetes Service", "ArgoCD", "Grafana"],
    description: "Engineered a batch ingestion pipeline orchestrating data quality and identity microservices, reducing operational costs by 25% and improving scalability by 20%.",
    highlights: [
      "Architected and led the implementation of an end-to-end functional test suite for the orchestration layer.",
      "Engineered a batch ingestion pipeline to orchestrate data quality and identity microservices, reducing operational costs by 25% and improving scalability by 20%.",
      "Integrated a data splitting microservice into the orchestration pipeline after identifying and resolving integration gaps.",
      "Deployed the orchestration layer on AKS and resolved multithreading issues post-deployment.",
      "Created Grafana monitoring dashboards for consolidated Pod metrics and log monitoring across environments.",
      "Deployed platform APIs using ArgoCD and built near real-time monitoring dashboards.",
    ],
  },
  {
    title: "Identity Resolution – Cloud Agnostic Platform",
    company: "Deloitte",
    role: "Sr. Product Engineer",
    period: "2023 – Present",
    logo: "/images/logos/deloitte.png",
    endYear: null,
    tech: ["Apache Spark", "Apache Airflow", "Python", "GCP", "AWS", "Azure", "Databricks", "MongoDB", "PostgreSQL", "Docker", "Kubernetes"],
    description: "Migrated legacy .NET identity resolution pipeline to Apache Spark processing 800M records, then expanded to AWS and Azure (Databricks) — full multi-cloud support within 3 months.",
    highlights: [
      "Migrated legacy .NET identity resolution pipeline to Apache Spark, achieving a 70% performance improvement.",
      "Designed and implemented a custom data pipeline capable of processing 800 million records, reducing processing time by 50%.",
      "Developed a self-service portal reducing IDR deployment time from weeks to hours.",
      "Coordinated deployments across multiple cloud environments, streamlining to a single-click deployment process.",
      "Ported the identity resolution platform to AWS and Azure (Databricks), enabling multi-cloud support within 3 months.",
      "Identified and resolved dynamic resource allocation issues in Autopilot clusters by enhancing the orchestration layer to allocate Pod resources dynamically.",
      "Upgraded core infrastructure components (Orchestration, NoSQL DB, Relational DB) to newer versions and performed E2E validation.",
      "Built an embedded analytics dashboard within Databricks, eliminating the need for a separate UI and reducing architecture complexity.",
      "Authored runbooks, HLD documents, and deployment guides across AWS, Azure, and Databricks environments.",
      "Resolved critical production issues including database crashes, service connectivity failures, and data processing blockers across multiple enterprise deployments.",
      "Delivered secure non-root containerisation solutions, enabling delivery teams to independently build and manage hardened containers.",
      "Remediated high-impact security vulnerabilities across identity and unification microservices, improving audit compliance and security posture.",
      "Resolved address standardization reliability issues, data type failures, and hanging processes across production environments.",
      "Supported PII-based and digital presence-based identity resolution pipelines across retail, healthcare, and financial services verticals.",
    ],
  },
  {
    title: "Customer Segmentation – 3P Data & MRD Pipeline",
    company: "Deloitte",
    role: "Sr. Product Engineer",
    period: "2025 – Present",
    logo: "/images/logos/deloitte.png",
    endYear: null,
    tech: ["PySpark", "Databricks", "Feature Foundry", "Jupyter Notebooks", "GCP"],
    description: "Designed a PySpark-based Data Prep Pipeline with advanced data quality checks to generate Final MRD for segmentation analysis.",
    highlights: [
      "Designed and implemented a PySpark-based Data Prep Pipeline with advanced data quality checks to generate Final MRD for segmentation analysis.",
      "Automated the third-party data pipeline and delivered it to UAT, significantly reducing manual effort.",
      "Enabled analysts to transform raw data into MRD-ready data via self-serve Jupyter notebooks.",
      "Designed an automated notebook deployment approach for seamless integration without manual intervention.",
      "Achieved 90% code coverage and implemented static analysis feedback, improving performance and maintainability across segmentation and clustering modules.",
    ],
  },
];
