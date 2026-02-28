---
sidebar_position: 1
title: Ecosystem Overview
---

# The Ecosystem

## What This Is

A complete open source enterprise technology ecosystem where every business domain has a production-ready reference implementation built on reusable platform products.

The closest real-world equivalent is what HashiCorp did for infrastructure or Atlassian did for developer tools — except this is fully open source, AI-native, covers every business domain, and costs nothing to run.

---

## Layer 1 — Platform Products

| Product | Tagline | Status |
|---------|---------|--------|
| iam-platform | Open source Okta | Active |
| auto-tracker | AI ticket automation | Live |
| ai-debug-agent | AI error analysis | Live |
| platform-docs | Self-writing documentation | Active |
| platform-analytics | Dashboards without querying | Planned |
| grc-bridge | Log API for GRC/SIEM tools | Planned |
| pki-platform | Open source PKI | Planned |
| i18n-engine | Multilingual support | Planned |
| test-forge | PRD to TDD + BDD + screen recording | Planned |
| platform-core | One command to run everything | Planned |
| foundation-ai | LLM built from absolute zero | Long term |

---

## Layer 2 — Domain Implementations

| Domain | What It Is |
|--------|-----------|
| fintech-platform | Banking, payments, lending |
| healthtech-platform | EHR, telehealth, pharmacy |
| edtech-platform | LMS, assessments, certifications |
| hrtech-platform | HRIS, payroll, recruiting |
| ecommerce-platform | Storefront, inventory, orders |
| legaltech-platform | Case management, contracts |
| proptech-platform | Property management, listings |
| logistics-platform | Supply chain, fleet, warehousing |
| govtech-platform | Citizen services, permits, compliance |

---

## GitHub Org Structure
```
pps-platform/     ← platform products
pps-domains/      ← domain implementations
pps-ai/           ← foundation-ai and AI research
```

Each org is like a separate company. Products in pps-platform are consumed by implementations in pps-domains.

---

## The One-Command Install Vision
```bash
curl -fsSL https://install.pps.dev/iam | bash
```

Checks prerequisites, pulls stack, asks 3 questions, starts everything, opens browser. Every product follows this pattern.

---

## Core Principles

- Plug and Play — every product works standalone
- Zero Cost — free tiers or self-hosted open source
- API First — everything exposed via REST
- From Scratch Where It Matters — no black boxes
- Self-Documenting — machine writes the docs
- Multilingual — any human language from day one
- Open Source Everything — every line public

---

## The Long-Term Goal

Business owner thinks out loud. Sees software built, tested, deployed, documented on screen.

1. Describe what you want in plain English
2. test-forge generates requirements, BDD, test suites
3. Code generated and reviewed
4. CI runs tests, screen recordings prove journeys work
5. auto-tracker moves tickets through the board
6. platform-docs writes documentation
7. Everything deployed to production
8. ai-debug-agent monitors and self-heals

foundation-ai is the key. When we own the AI layer completely, this becomes possible.
