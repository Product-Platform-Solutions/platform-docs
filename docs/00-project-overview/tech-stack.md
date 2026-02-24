---
sidebar_position: 2
title: Tech Stack
---

# Tech Stack

Every tool in this stack is open source and free.

## Core Infrastructure

| Layer | Tool | Purpose | Cost |
|-------|------|---------|------|
| Cloud | AWS EC2 t3.micro | Server hosting | Free tier |
| OS | Ubuntu 24.04 LTS | Server OS | Free |
| Containers | Docker + Docker Compose | Service orchestration | Free |
| Reverse Proxy | Traefik v2.11 | HTTPS, routing, load balancing | Free |
| TLS | Let's Encrypt | SSL certificates | Free |
| DNS | sslip.io | Domain resolution | Free |

## IAM Stack

| Component | Tool | Purpose |
|-----------|------|---------|
| IAM Core | Keycloak 23.0 | SSO, OIDC, SAML, RBAC, MFA, SCIM |
| Database | PostgreSQL 15 | Keycloak data persistence |
| Directory | OpenLDAP (planned) | LDAP federation |

## Application Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Frontend | React + Vite + TypeScript | Web application |
| Auth SDK | keycloak-js + @react-keycloak/web | OIDC integration |
| Static Serving | Nginx Alpine | Production file serving |

## Developer Tools

| Tool | Purpose |
|------|---------|
| GitHub | Source control, CI/CD, Issues |
| GitHub Actions | Automated pipelines |
| GitHub Codespaces | Browser-based development |
| PM2 | Node.js process management |

## AI & Automation

| Tool | Purpose | Cost |
|------|---------|------|
| Groq API (Llama 3.1) | AI ticket enrichment, doc generation | Free tier |
| n8n | Workflow automation, integrations | Free (self-hosted) |
| auto-tracker API | Custom ticket automation engine | Built by us |

## Documentation

| Tool | Purpose |
|------|---------|
| Docusaurus | Documentation site | Free |
| platform-docs repo | Documentation source | Free |

## Planned (Roadmap)

| Tool | Purpose |
|------|---------|
| K3s | Lightweight Kubernetes | Free |
| Grafana | Metrics dashboards | Free |
| Loki | Log aggregation | Free |
| Prometheus | Metrics collection | Free |
| ai-debug-agent | AI-powered log analysis | Built by us |
