---
sidebar_position: 2
title: Product Definitions
---

# Product Definitions

---

## iam-platform
**Open source Okta — self-hosted enterprise IAM**

Delivered: SSO, OIDC, SAML, RBAC, MFA, Keycloak 23.0, React frontend

Roadmap: SCIM, LDAP federation, B2B federation, account settings, user onboarding, admin dashboard, audit logs, multilingual UI, install.sh

---

## auto-tracker
**AI-powered project tracking for any ticket tool**

Delivered: GitHub Issues adapter, rule-based enrichment, Groq AI, GitHub Projects board sync, iteration assignment, PM2

Roadmap: Jira, Azure DevOps, Linear, Trello adapters, PR merge closes ticket

---

## ai-debug-agent
**AI error analysis for any Docker or Kubernetes environment**

Delivered: Docker log watching, 17 error patterns, Groq AI analysis, zero external libraries, fallback mode

Roadmap: Kubernetes support, REST API for log export, Slack/email notifications, error trend dashboard

---

## platform-docs
**Self-writing documentation for all projects**

Delivered: Docusaurus 3 site, auto-deploy on push, retroactive session documentation

Roadmap: doc-engine (auto-write from events), daily dev journal, incident reports, sprint retrospectives, multi-project support

---

## grc-bridge
**Expose logs and events to any GRC or SIEM tool**

Planned: Unified log aggregation, CEF format output, REST API, syslog forwarding, Splunk/QRadar/Elastic integration, compliance reports (SOC2, ISO27001, GDPR, PCI-DSS), real-time risk scoring

---

## platform-analytics
**Reporting and dashboards without querying**

Planned: Real-time service health, auth event dashboard, error trends, pre-built reports, PDF/CSV export, scheduled email reports, embeddable widgets

---

## pki-platform
**Open source PKI and cryptography**

Planned: CA management, certificate issuance/renewal/revocation, private key management, mTLS, code signing, S/MIME, HSM support, iam-platform integration

---

## i18n-engine
**Multilingual support as a service**

Planned: Language detection, translation management UI, React SDK, REST API, RTL support, AI-powered translation

---

## test-forge
**From PRD to passing tests automatically**

Planned: PRD parser, TDD generator, BDD/Gherkin generator, E2E generator, screen recording in CI, recording attached to GitHub Issue, REST API

Example input:
```
Users should be able to login with email and password.
Failed attempts should lock account after 3 tries.
```

Example output:
```javascript
describe('Authentication', () => {
  it('should login with valid credentials')
  it('should lock account after 3 failed attempts')
})
```
```gherkin
Feature: User Authentication
  Scenario: Successful login
    Given a user with valid credentials
    When they submit the login form
    Then they should be authenticated
```

---

## platform-core
**Optional orchestration layer**

Planned: Single docker-compose for all services, shared Traefik, one command for full suite, service discovery, shared auth via iam-platform

---

## foundation-ai
**LLM built from absolute zero**

No libraries. No imports. Pure Python with only built-in math, random, and file I/O.

Build order:
1. Tensor library (our numpy)
2. Autograd engine
3. BPE tokenizer
4. Embedding layer
5. Self-attention mechanism
6. Multi-head attention
7. Feed-forward network
8. Layer normalization
9. Full transformer model
10. Training pipeline
11. Inference engine
12. Fine-tuning on IAM/DevOps data

Hardware: 32GB RAM laptop for development, Vast.ai/RunPod for training runs (~$0.20-0.50/hr)

End goal: Replace all Groq API calls across all platform products with local inference.
