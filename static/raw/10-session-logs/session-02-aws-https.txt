---
sidebar_position: 2
title: "Session 2 - AWS & HTTPS"
---

# Session 2 — AWS Migration & HTTPS
**Date:** February 22, 2026

## Why We Migrated

Codespaces port visibility permanently locked under org plan. OAuth/OIDC flows require publicly accessible redirect URLs. Migrated to AWS EC2 — self-hosted means we control every port.

---

## AWS Setup

- Instance: t3.micro (free tier)
- OS: Ubuntu 24.04 LTS
- IP: 3.25.125.195
- Storage: 30GB SSD

### Why Not Oracle Cloud
Oracle Always Free tier is better (4 ARM cores, 24GB RAM, permanent). But Oracle signup repeatedly failed with "Error processing transaction" despite valid payment info. AWS worked immediately.

**Consequence:** AWS free tier expires after 12 months. Migration needed before expiry.

---

## Swap File Added

t3.micro has 1GB RAM. Keycloak + PostgreSQL + Traefik consume ~700MB, leaving 300MB for npm — not enough.
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

Result: Effective memory = 3GB. npm installs complete reliably.

---

## Let's Encrypt Rate Limit

First attempt used nip.io domain. Let's Encrypt returned:
```
429 Too Many Certificates: too many certificates already issued for "nip.io"
```

Same issue with sslip.io. Both are shared DNS services hitting the 50 certs/week limit.

**Solution:** Use Let's Encrypt staging environment (no rate limits, not browser-trusted).

---

## Keycloak HTTPS Required Error

**Problem:** Accessing Keycloak via HTTP showed "HTTPS required".

**Fix:** Tell Keycloak it's behind a trusted reverse proxy:
```yaml
KC_PROXY: edge
KC_HTTP_ENABLED: "true"
KC_HOSTNAME_STRICT: "false"
```

---

## React Frontend

- React + Vite + TypeScript
- keycloak-js for OIDC
- Served via Nginx Alpine through Traefik

### SSO Flow
```
User visits app → Keycloak JS initializes → redirect to login
→ credentials entered → JWT issued → redirect back with token
→ React reads username, email, roles ✅
```

---

## Services Running

| Service | URL |
|---------|-----|
| React App | https://app.3.25.125.195.sslip.io |
| Keycloak | https://keycloak.3.25.125.195.sslip.io |
| n8n | https://n8n.3.25.125.195.sslip.io |
| Docs | https://docs.3.25.125.195.sslip.io |

---

## What Was Learned

1. Always add swap to small cloud instances
2. Use Let's Encrypt staging for development
3. Keycloak behind reverse proxy always needs KC_PROXY: edge
4. Build React app outside the server, copy dist folder over
