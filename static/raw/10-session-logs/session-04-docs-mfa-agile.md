---
sidebar_position: 4
title: "Session 4 - Docs, MFA & AI Debug"
---

# Session 4 — Docs, MFA, Agile Board & AI Debug Agent
**Date:** February 27, 2026

## What We Built

1. platform-docs — self-writing documentation site
2. MFA — TOTP two-factor authentication in Keycloak
3. GitHub Project board automation — full agile flow
4. ai-debug-agent v1.0 — zero dependencies, AI error analysis

---

## platform-docs

- Docusaurus 3.9.2
- Auto-deploy via GitHub Actions on every push
- Live at https://docs.3.25.125.195.sslip.io

### Issues During Setup
- Default sample blog posts referenced unknown author key → delete sample content
- Homepage linked to nonexistent /docs/intro → update homepage link
- onBrokenLinks: throw blocked build → change to warn
- SSH key had % at end (no trailing newline) → re-paste with blank line at end

---

## MFA — TOTP

### OTP Policy Settings
- Type: Time Based (TOTP)
- Algorithm: SHA1
- Digits: 6
- Period: 30 seconds
- Look ahead window: 3 (increased from 1 to fix invalid code errors)

### Per-User Enrollment
Users → select user → Required User Actions → add Configure OTP → Save

### Authenticator Apps
- Google Authenticator: Failed
- Authy: Failed
- FreeOTP+: Works reliably (recommended)

Root cause of failures: clock tolerance. Look ahead window 3 = allows 90 seconds drift.

---

## GitHub Project Board Automation

### Problem
Issues created but not appearing on board or in current iteration.

### Solution
New github-projects.ts adapter using GitHub GraphQL API:
- Adds issue to project board automatically
- Sets status field
- Sets priority field
- Assigns to current iteration (auto-detected by date)

### Status Mapping

| Git Event | Board Column |
|-----------|-------------|
| in_progress | In Progress |
| in_review | In Review |
| done | Done |

### Current Iterations (14 days each)
- Iteration 1: Feb 23 → Mar 9 (current)
- Iteration 2: Mar 9 → Mar 23
- Iteration 3: Mar 23 → Apr 6
- Iteration 4: Apr 6 → Apr 20
- Iteration 5: Apr 20 → May 4

### Issue
GitHub token needed project and read:project scopes. Fix: update token at github.com/settings/tokens

---

## ai-debug-agent v1.0

### Zero Dependencies Philosophy
Everything built from scratch using only Node.js built-ins:
- HTTP client: raw https module
- Config loader: manual .env parser
- Event bus: our own pub/sub
- Log watcher: child_process.spawn
- Pattern matcher: our own regex engine
- Error deduplicator: token bucket
- Console reporter: raw ANSI codes

Only external dependency: Groq API for AI intelligence.
Plan: replace with foundation-ai when built.

### 17 Error Patterns
CRITICAL: OOM kill, fatal crash, database down
ERROR: Auth failure, SSL error, port in use, file not found, connection refused, timeout, disk full, permission denied
WARNING: Deprecation, high memory, slow query
Keycloak-specific: realm errors, KC exceptions
Docker-specific: unexpected container exits

### Live Demo Result
Stopped iam-postgres → agent detected immediately:
- Severity: CRITICAL
- Error: Database Unreachable
- AI Cause: PostgreSQL system is shut down
- AI Fix: docker restart iam-postgres
- AI Prevention: Set restart policy to always in docker-compose

---

## Ecosystem Vision Defined

### The Long-Term Goal
Business owner thinks out loud → sees software built, tested, deployed, documented on screen. Zero engineers needed for routine feature delivery.

### Products Defined
11 platform products + 9 domain implementations. See Ecosystem section.

### foundation-ai
Build LLM from absolute zero — no libraries, no imports. Pure Python, pure math. Replace all Groq calls eventually.

### test-forge
PRD → TDD tests + BDD scenarios + screen recordings automatically. Screen recording = definition of done.

### Documentation Philosophy
Docs written at: code events, planning events, operations events, people events, time-based events, manual triggers. Not just git pushes.

---

## Platform Status End of Session 4

### PM2
- auto-tracker-api: online
- ai-debug-agent: online

### Docker
- iam-traefik: Up 3 days
- iam-keycloak: Up 3 days
- iam-postgres: healthy
- iam-frontend: Up 3 days
- iam-n8n: Up 3 days
- iam-docs: Up 2 days
