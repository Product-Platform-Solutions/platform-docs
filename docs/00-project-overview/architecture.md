---
sidebar_position: 3
title: Architecture
---

# Architecture

## High-Level Architecture
```
Internet
    ↓
Traefik (Reverse Proxy + TLS Termination)
    ↓
┌─────────────────────────────────────────┐
│           Docker Network                │
│                                         │
│  ┌──────────┐  ┌──────────────────┐    │
│  │  Nginx   │  │    Keycloak      │    │
│  │ (React)  │  │  (IAM Core)      │    │
│  └──────────┘  └────────┬─────────┘    │
│                          │              │
│                   ┌──────▼──────┐      │
│                   │ PostgreSQL  │      │
│                   │ (Database)  │      │
│                   └─────────────┘      │
│                                         │
│  ┌──────────┐  ┌──────────────────┐    │
│  │   n8n    │  │  auto-tracker    │    │
│  │(Workflow)│  │     (API/PM2)    │    │
│  └──────────┘  └──────────────────┘    │
└─────────────────────────────────────────┘
```

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| React App | https://app.15.134.72.92.sslip.io | Frontend |
| Keycloak | https://keycloak.15.134.72.92.sslip.io | IAM Admin |
| n8n | https://n8n.15.134.72.92.sslip.io | Automation |
| Docs | https://docs.15.134.72.92.sslip.io | Documentation |
| Auto-tracker API | http://15.134.72.92:3001 | Ticket API |

## Authentication Flow
```
User visits app.15.134.72.92.sslip.io
    ↓
React app initializes Keycloak JS
    ↓
Redirect to keycloak.15.134.72.92.sslip.io/realms/iam-platform
    ↓
User enters credentials
    ↓
Keycloak validates + issues JWT token
    ↓
Redirect back to React app with token
    ↓
React app reads token (username, email, roles)
    ↓
User is authenticated ✅
```

## CI/CD Flow
```
Developer pushes code
    ↓
GitHub Actions triggers
    ↓
CI Pipeline (validate structure, lint)
    ↓
Track Event (send to auto-tracker API)
    ↓
auto-tracker API enriches with Groq AI
    ↓
GitHub Issue created automatically
```

## Network Architecture

- All traffic enters on ports 80/443 via Traefik
- HTTP automatically redirected to HTTPS
- TLS certificates auto-provisioned via Let's Encrypt
- Internal services communicate on Docker bridge network
- PostgreSQL only accessible internally (no external port)
