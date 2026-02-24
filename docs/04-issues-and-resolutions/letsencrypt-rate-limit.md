---
sidebar_position: 3
title: Let's Encrypt Rate Limit on sslip.io/nip.io
---

# Issue: Let's Encrypt Rate Limit on Shared Domains

## Date
February 22-23, 2026

## Problem
When configuring Traefik with Let's Encrypt for HTTPS, certificate requests failed with:
```
429 Too Many Certificates: too many certificates already issued for "sslip.io" 
in the last 168h
```

This happened for both `nip.io` and `sslip.io` domains.

## Root Cause
Let's Encrypt enforces a limit of **50 certificates per registered domain per week**. Since `nip.io` and `sslip.io` are shared wildcard DNS services used by thousands of developers, they frequently hit this limit.

## Resolution
Switched to Let's Encrypt **staging environment** for development:
```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      caServer: "https://acme-staging-v02.api.letsencrypt.org/directory"
```

Staging has no rate limits. Certificates are not browser-trusted but work for development.

## Long-term Resolution
Register a real domain name. Free options:
- afraid.org — free subdomains
- DuckDNS — free dynamic DNS

## Lesson Learned
Never use shared wildcard DNS services (nip.io, sslip.io, xip.io) for production Let's Encrypt certificates. Use a real domain.
