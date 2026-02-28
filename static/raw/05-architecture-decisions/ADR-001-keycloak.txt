---
sidebar_position: 1
title: ADR-001 - Keycloak as IAM Core
---

# ADR-001: Choosing Keycloak as IAM Core

## Status
Accepted

## Date
February 21, 2026

## Context
We needed an open source IAM solution that covers the full feature set of commercial tools like Okta and Azure AD — SSO, SAML, OIDC, SCIM, LDAP, RBAC, MFA, B2B federation, audit logs.

## Decision
Use **Keycloak 23.0** as the IAM core.

## Alternatives Considered

| Tool | Pros | Cons |
|------|------|------|
| Keycloak | Full featured, widely adopted, Red Hat backed | Java, memory hungry |
| Authentik | Modern, Python-based, beautiful UI | Less enterprise features |
| Authelia | Lightweight, simple | Limited B2B features |
| Zitadel | Modern, Go-based | Less mature |
| Okta | Best in class | $10-15/user/month |

## Rationale
Keycloak is the only open source tool that covers 100% of enterprise IAM requirements out of the box. It's used in production by large enterprises and is backed by Red Hat. Every feature we need — SAML, OIDC, SCIM, JIT, LDAP, MFA, B2B — is built in with no plugins required.

## Consequences
- Higher memory usage (~400MB baseline)
- Requires Java runtime
- Learning curve for realm/client configuration
- Benefit: No feature gaps, production proven, extensive documentation
