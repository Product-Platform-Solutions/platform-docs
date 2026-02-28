---
sidebar_position: 1
title: "Session 1 - The Beginning"
---

# Session 1 — The Beginning
**Date:** February 21, 2026

## The Starting Point

This is where it all began. The goal stated in the very first message:

> *"I want to focus only on building a project from scratch to production ready with minimal/zero cost. I want to reimagine my work project end to end with all complexities involved. Reverse proxy, SaaS apps, UMS, all the B2B connections, protocols, JIT, SCIM, SSO, RBAC, audit logs, LDAP, Kubernetes, CI/CD, Angular/React, Figma, Jira ticketing, pros, agile. I want to do this end to end from ground up. But with all open source tools. No cost involved. Also it should take care of all features of any industry grade IAM tool like Okta, Azure, Ping One."*

Zero budget. Full enterprise feature set. Production grade. Built from scratch.

---

## Decisions Made

### GitHub Free Account Created
- Organization: product-platform-solutions
- First repo: IAM
- Branch protection enabled on main

### Tool Selection

| Requirement | Tool Chosen | Why |
|-------------|-------------|-----|
| IAM Core | Keycloak | Only open source tool covering 100% of Okta feature set |
| Reverse Proxy | Traefik | Auto TLS, Docker-native, free |
| Kubernetes | K3s | Lightweight, production-grade, free |
| CI/CD | GitHub Actions | Free for public repos |
| Frontend | React + TypeScript | Industry standard, free |
| Database | PostgreSQL | Best open source relational DB |
| Monitoring | Grafana + Loki + Prometheus | Complete observability stack |
| Browser IDE | GitHub Codespaces | No local install needed |

### Monorepo Structure
```
iam-platform/
├── apps/frontend/
├── apps/backend/
├── infra/docker/
├── infra/k8s/
├── infra/traefik/
├── iam/keycloak/realms/
├── iam/keycloak/themes/
├── iam/ldap/
├── iam/scim/
├── ci-cd/github-actions/
├── monitoring/grafana/
├── monitoring/loki/
├── monitoring/prometheus/
└── docs/adr/
```

---

## Environment Setup

### GitHub Codespaces Selected
- Gitpod ran out of OCU credits mid-session
- Migrated to GitHub Codespaces
- Class: Regular (4 vCPU, 8GB RAM)
- Issue discovered: Port visibility locked under org plan

### Initial CI Pipeline
First GitHub Actions workflow created — validates folder structure on every push. Green from day one.

---

## Keycloak First Steps

- Realm created: iam-platform
- First client: iam-web-app
- RBAC roles: app-admin, app-user, app-readonly
- Test user: testuser
- SSO verified via Keycloak account console

---

## Key Issue: Port Visibility

**Problem:** GitHub Codespaces under org plan locks port visibility to Private.

**Attempted fixes:**
- Changing visibility in Ports tab — UI locked
- gp ports visibility 8080:public — command unavailable
- visibility: public in devcontainer.json — ignored by org policy

**Resolution:** Migrated to AWS EC2 in Session 2.

---

## What Was Learned

1. Keycloak realm exports should always be version controlled
2. Browser-based OAuth flows require publicly accessible ports
3. Docker Compose is the right starting point before Kubernetes
4. GitHub Actions CI should be set up from day one
