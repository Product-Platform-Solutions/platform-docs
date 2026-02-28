---
sidebar_position: 1
title: Vision & Goals
---

# Vision & Goals

## The Problem

Enterprise Identity & Access Management (IAM) tools like Okta, Azure AD, and Ping Identity cost $10-15 per user per month. For startups and growing companies, this is a significant expense that locks them into vendor ecosystems with limited customization.

## The Vision

Build a **production-grade, enterprise-level IAM platform** using 100% open source tools at **zero cost**. Every feature that Okta or Azure AD offers — SSO, SAML, OIDC, SCIM, JIT, LDAP federation, RBAC, MFA, audit logs, B2B connections — built and owned entirely by us.

## Goals

### Technical Goals
- Full SSO (Single Sign-On) via OIDC & SAML 2.0
- RBAC (Role Based Access Control)
- SCIM 2.0 User Provisioning
- JIT (Just-In-Time) Provisioning
- LDAP & Active Directory Federation
- MFA (Multi-Factor Authentication)
- B2B Identity Federation
- Complete Audit Logging
- Kubernetes-ready architecture

### Engineering Goals
- Zero vendor lock-in
- Everything as code (infrastructure, config, identity)
- Automated CI/CD from day one
- Self-writing documentation
- AI-assisted development and debugging

### Cost Goals
- Infrastructure: AWS Free Tier ($0)
- IAM Core: Keycloak ($0)
- CI/CD: GitHub Actions ($0)
- Documentation: Docusaurus ($0)
- AI enrichment: Groq Free Tier ($0)
- **Total: $0/month**

## Scope

This platform is designed to serve as:
1. A **B2B IAM solution** for enterprise customers
2. A **reference architecture** for open source IAM
3. A **learning platform** for modern DevOps and security engineering

## Non-Goals

- Building a commercial product (this is open source)
- Supporting legacy protocols beyond LDAP
- Mobile SDK development (Phase 2)
