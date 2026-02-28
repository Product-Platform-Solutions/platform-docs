---
sidebar_position: 3
title: "Session 3 - Auto-Tracker & n8n"
---

# Session 3 — Auto-Tracker & n8n
**Date:** February 23-24, 2026

## What We Built

Complete automated ticket tracking system. Every git push automatically creates a GitHub Issue with AI-generated descriptions and acceptance criteria, placed on the project board.

---

## New Repositories

- product-platform-solutions/auto-tracker
- product-platform-solutions/ai-debug-agent

---

## n8n Deployment

Self-hosted workflow automation (like Zapier but free). Added to Docker Compose, live at https://n8n.3.25.125.195.sslip.io

---

## auto-tracker API

Express.js + TypeScript REST API. More control than n8n alone — version controlled, testable, reusable.

### Rule-Based Enrichment

Parses branch names to extract ticket information.

Input: feat/IAM-002-add-mfa-support

Output:
- Type: Feature
- Priority: Medium
- Ticket ID: IAM-002
- Labels: [feat, medium]
- Acceptance criteria auto-generated

### Type to Priority Mapping

| Prefix | Type | Priority |
|--------|------|---------|
| hotfix | Hotfix | Critical |
| fix | Bug Fix | High |
| feat | Feature | Medium |
| refactor | Refactor | Medium |
| chore | Chore | Low |
| docs | Documentation | Low |

---

## Groq AI Integration

### Why Groq

| Option | Decision |
|--------|---------|
| Claude API | Requires payment |
| Ollama local | t3.micro too small |
| Google Gemini | Requires credit card |
| Groq free tier | Selected — free, no card, 14400 req/day |

### Model Issue
Initial model llama3-8b-8192 returned 400 Bad Request. Queried available models, selected llama-3.1-8b-instant.

### AI Enrichment Result

Before (rule-based): Title: "Add ldap federation", generic description

After (Groq): Natural language description, domain-specific acceptance criteria with LDAP-specific checkboxes

---

## GitHub Issues Adapter

Creates issues with full markdown body including description and acceptance criteria checkboxes.

---

## PM2 Process Management
```bash
pm2 start "npx ts-node src/index.ts" --name auto-tracker-api
pm2 save
pm2 startup
```

Survives server reboots.

---

## GitHub Actions Tracker Workflow

Fires on every push, sends event to auto-tracker API.

Secret TRACKER_API_URL = http://3.25.125.195:3001/events/github

---

## Issues Encountered

| Issue | Fix |
|-------|-----|
| Exit code 60 SSL error | Add -k flag to curl |
| Exit code 28 timeout | Add --max-time 30 |
| Port 3001 not accessible | Open port in AWS Security Group |
| n8n container conflict | docker rm -f iam-n8n |

---

## What Was Learned

1. Rule-based + AI hybrid — works without AI, better with it
2. PM2 is essential for Node.js services on a server
3. Add --max-time to all CI curl commands
4. GitHub token needs project scope for Projects API
5. Always verify Groq model names — they change
