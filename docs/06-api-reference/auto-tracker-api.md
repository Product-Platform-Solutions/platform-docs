---
sidebar_position: 1
title: Auto-Tracker API
---

# Auto-Tracker API Reference

## Base URL
```
http://3.25.125.195:3001
```

## Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "UP",
  "service": "auto-tracker-api",
  "version": "1.0.0",
  "timestamp": "2026-02-24T03:09:36.923Z"
}
```

### Process GitHub Event
```
POST /events/github
```

**Request Body:**
```json
{
  "event": "push",
  "status": "in_progress",
  "branch": "feat/IAM-001-add-sso-login",
  "commit": "a1b2c3d",
  "author": "username",
  "repo": "org/repo-name",
  "ticket_id": "IAM-001",
  "pr_url": "",
  "pr_title": "",
  "timestamp": "2026-02-24T03:00:00Z"
}
```

**Status Values:**

| Status | Trigger |
|--------|---------|
| `in_progress` | Push to feature branch |
| `in_review` | PR opened |
| `done` | PR merged |
| `ci_passed` | CI pipeline succeeded |
| `ci_failed` | CI pipeline failed |

**Response:**
```json
{
  "status": "processed",
  "ticket": {
    "title": "Add SSO Login",
    "description": "Full markdown description...",
    "type": "Feature",
    "priority": "Medium",
    "labels": ["feat", "medium"],
    "acceptanceCriteria": ["..."],
    "ticketId": "IAM-001"
  },
  "adapter": "github-issues",
  "timestamp": "2026-02-24T03:10:44.712Z"
}
```

## Branch Naming Convention

The API parses branch names to extract ticket information:
```
{type}/{TICKET-ID}-{description}
```

Examples:
- `feat/IAM-001-add-sso-login`
- `fix/IAM-002-token-expiry-bug`
- `hotfix/IAM-003-critical-auth-failure`
- `chore/IAM-004-update-dependencies`

## Supported Types

| Prefix | Type | Priority |
|--------|------|---------|
| `feat` | Feature | Medium |
| `fix` | Bug Fix | High |
| `hotfix` | Hotfix | Critical |
| `chore` | Chore | Low |
| `docs` | Documentation | Low |
| `refactor` | Refactor | Medium |

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|---------|
| `PORT` | API port (default: 3001) | No |
| `GROQ_API_KEY` | Groq API key for AI enrichment | No (falls back to rule-based) |
| `GROQ_MODEL` | Groq model (default: llama-3.1-8b-instant) | No |
| `GITHUB_TOKEN` | GitHub PAT for issue creation | Yes |
| `TRACKER_ADAPTER` | Adapter to use (default: github-issues) | No |
