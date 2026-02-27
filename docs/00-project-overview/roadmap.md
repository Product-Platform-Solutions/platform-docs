---
sidebar_position: 2
title: Roadmap
---

# Roadmap

## Current Sprint — Iteration 1 (Feb 23 - Mar 9, 2026)

### In Progress
- iam-platform MFA (TOTP) ✅ Done
- auto-tracker GitHub Projects board sync ✅ Done
- platform-docs auto-deploy ✅ Done
- doc-engine (self-writing documentation) 🔄 Building now

### Next
- SCIM provisioning in Keycloak
- LDAP federation
- IAM Platform UX (account settings, user onboarding)

---

## Phase 1 — Platform Foundation
**Goal:** Every platform product has a working v1.0

### iam-platform v1.0
- [x] SSO (OIDC/SAML)
- [x] RBAC
- [x] MFA (TOTP)
- [ ] SCIM provisioning
- [ ] LDAP federation
- [ ] B2B federation
- [ ] Account settings UI
- [ ] User onboarding flow
- [ ] Admin dashboard
- [ ] Audit logs
- [ ] Multilingual UI
- [ ] install.sh

### auto-tracker v1.0
- [x] GitHub Issues adapter
- [x] Groq AI enrichment
- [x] GitHub Projects board sync
- [x] Iteration assignment
- [ ] Jira adapter
- [ ] Azure DevOps adapter
- [ ] Linear adapter
- [ ] Status transitions (in_review, done)
- [ ] PR merge → close ticket
- [ ] install.sh

### ai-debug-agent v1.0
- [x] Docker log watching
- [x] Pattern matching engine
- [x] Groq AI analysis
- [x] Zero dependencies
- [ ] Kubernetes log support
- [ ] REST API for log export
- [ ] Webhook notifications (Slack, email)
- [ ] Dashboard
- [ ] install.sh

### platform-docs v1.0
- [x] Docusaurus site
- [x] Auto-deploy on push
- [ ] doc-engine (auto-write from events)
- [ ] Daily dev journal (scheduled)
- [ ] Incident reports (from ai-debug-agent)
- [ ] Multi-project support
- [ ] Search

### grc-bridge v0.1
- [ ] Unified log aggregation API
- [ ] CEF/SIEM compatible event format
- [ ] Syslog forwarding
- [ ] Compliance report generation
- [ ] REST API

### platform-analytics v0.1
- [ ] Real-time service health dashboard
- [ ] Auth event dashboard
- [ ] Error rate trends
- [ ] Pre-built reports
- [ ] PDF/CSV export
- [ ] Scheduled email reports

### pki-platform v0.1
- [ ] Certificate Authority management
- [ ] Certificate issuance and renewal
- [ ] Private key management
- [ ] mTLS support
- [ ] Integration with iam-platform

### i18n-engine v0.1
- [ ] Language detection
- [ ] Translation management UI
- [ ] React SDK
- [ ] REST API
- [ ] RTL support
- [ ] AI-powered translation

### test-forge v0.1
- [ ] PRD parser
- [ ] TDD test generator
- [ ] BDD/Gherkin generator
- [ ] E2E test generator
- [ ] Screen recording in CI
- [ ] Attach recording to GitHub Issue
- [ ] REST API

### platform-core v0.1
- [ ] Single docker-compose for all services
- [ ] Shared Traefik config
- [ ] One command installer
- [ ] Health dashboard

---

## Phase 2 — Domain Implementations
**Goal:** First domain implementation (fintech) production ready

### fintech-platform v0.1
- [ ] Uses iam-platform for auth
- [ ] Uses pki-platform for transaction signing
- [ ] Uses grc-bridge for PCI-DSS reporting
- [ ] Uses platform-analytics for dashboards
- [ ] Uses test-forge for compliance tests
- [ ] Core banking features
- [ ] Payment processing
- [ ] KYC/AML integration

---

## Phase 3 — AI Integration
**Goal:** Replace all external AI with foundation-ai

### foundation-ai v0.1
- [ ] Tensor library (our numpy)
- [ ] Autograd engine
- [ ] BPE tokenizer
- [ ] Transformer architecture
- [ ] Training pipeline
- [ ] Inference engine
- [ ] Fine-tuned for DevOps/IAM domain
- [ ] Replaces Groq in all projects

---

## Ongoing Agenda Items

### Technical Debt
- Containerize auto-tracker API (currently PM2)
- Separate each product's docker-compose
- Move all repos to proper org structure (pps-platform, pps-domains)
- Add install.sh to each product
- Add CONTRIBUTING.md to each repo

### Features Requested
- Screen recording as part of BDD definition of done
- GRC log export API
- Multilingual support across all products
- PKI/certificate management
- Reporting dashboards without manual querying
- Robust IAM UX (account settings, onboarding)
- Automated agile flow end to end

### Research Items
- foundation-ai architecture design
- 32GB laptop setup for local LLM
- Kubernetes migration (K3s)
- Grafana + Loki + Prometheus monitoring stack
- Hardware Security Module (HSM) for pki-platform
