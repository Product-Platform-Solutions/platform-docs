---
sidebar_position: 3
title: AI Context File
---

# Context File — Read This First

This file is written for AI assistants starting a new session.
Read this + Vision + Roadmap and you have full context to continue.

## Who I Am
Ananga M Chatterjee — building a complete open source enterprise technology ecosystem from scratch, zero cost, production grade.

## Server
- AWS EC2 t3.micro
- IP: 3.25.125.195
- SSH: ssh -i ~/Downloads/iam-platform-key.pem ubuntu@3.25.125.195
- OS: Ubuntu 24.04

## Live Services
- React App: https://app.3.25.125.195.sslip.io
- Keycloak: https://keycloak.3.25.125.195.sslip.io
- n8n: https://n8n.3.25.125.195.sslip.io
- Docs: https://docs.3.25.125.195.sslip.io
- Auto-tracker API: http://3.25.125.195:3001

## PM2 Services
- auto-tracker-api (port 3001)
- ai-debug-agent (watching all Docker containers)

## Docker Containers
- iam-traefik, iam-keycloak, iam-postgres, iam-frontend, iam-n8n, iam-docs
- All in ~/iam-platform/infra/docker/docker-compose.yml

## Key Repos (Product-Platform-Solutions org)
- iam-platform
- auto-tracker
- ai-debug-agent
- platform-docs

## GitHub Project Board
- Project: IAM Platform
- ID: PVT_kwDOD6r-NM4BP_iI
- URL: github.com/orgs/Product-Platform-Solutions/projects/3
- Status Field: PVTSSF_lADOD6r-NM4BP_iIzg-Pa_4
- Priority Field: PVTSSF_lADOD6r-NM4BP_iIzg-PbDA
- Iteration Field: PVTIF_lADOD6r-NM4BP_iIzg-PbDk
- Current Iteration: Iteration 1 (Feb 23 - Mar 9 2026), ID: 381c7c80

## Status Options
- Backlog: f75ad846
- Ready: e18bf179
- In Progress: 47fc9ee4
- In Review: aba860b9
- Done: 98236657

## Env Files
- ~/auto-tracker/api/.env (GITHUB_TOKEN, GROQ_API_KEY)
- ~/ai-debug-agent/.env (GROQ_API_KEY)

## Completed This Far
- SSO with OIDC (Keycloak + React)
- RBAC (roles: app-admin, app-user, app-readonly)
- MFA with TOTP (FreeOTP+ works, look ahead window 3)
- Traefik reverse proxy with HTTPS (Let's Encrypt staging)
- auto-tracker: GitHub Issues + Groq AI + board sync + iteration assignment
- ai-debug-agent: zero deps, 17 patterns, Groq analysis, PM2
- platform-docs: Docusaurus, auto-deploy on push
- GitHub Actions: build CI, auto-deploy docs, event tracking

## Immediate Next Tasks (in order)
1. Build doc-engine (auto-write docs from events, scheduler, incidents)
2. SCIM provisioning in Keycloak
3. LDAP federation
4. IAM Platform UX (account settings, user onboarding, admin dashboard)
5. grc-bridge (log API for external GRC/SIEM)
6. platform-analytics (dashboards)
7. Restructure GitHub orgs (pps-platform, pps-domains, pps-ai)
8. test-forge v0.1 (PRD to TDD + BDD + screen recording)
9. pki-platform
10. i18n-engine

## Long-Term Goals
- foundation-ai: build LLM from zero, no libraries
- Replace Groq across all products with foundation-ai
- Natural language → software (business owner thinks out loud, sees it built)
- 9 domain implementations (fintech, healthtech, edtech, hrtech, ecommerce, legaltech, proptech, logistics, govtech)

## Key Decisions Made
- Every product is plug and play — standalone, no hard dependencies
- API first — everything exposed via REST
- Zero cost — free tiers or self-hosted only
- From scratch where it matters — understand every layer
- Screen recording = definition of done for BDD
- doc-engine needs multiple triggers: code events, scheduler, incidents, manual
- GitHub org structure: pps-platform / pps-domains / pps-ai

## How to Resume
At start of next session, fetch these 3 URLs:
- https://docs.3.25.125.195.sslip.io/docs/00-project-overview/context
- https://docs.3.25.125.195.sslip.io/docs/00-project-overview/vision
- https://docs.3.25.125.195.sslip.io/docs/00-project-overview/roadmap
