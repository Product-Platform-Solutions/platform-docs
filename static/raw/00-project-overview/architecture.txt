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
| React App | https://app.3.25.125.195.sslip.io | Frontend |
| Keycloak | https://keycloak.3.25.125.195.sslip.io | IAM Admin |
| n8n | https://n8n.3.25.125.195.sslip.io | Automation |
| Docs | https://docs.3.25.125.195.sslip.io | Documentation |
| Auto-tracker API | http://3.25.125.195:3001 | Ticket API |

## Authentication Flow
```
User visits app.3.25.125.195.sslip.io
    ↓
React app initializes Keycloak JS
    ↓
Redirect to keycloak.3.25.125.195.sslip.io/realms/iam-platform
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
