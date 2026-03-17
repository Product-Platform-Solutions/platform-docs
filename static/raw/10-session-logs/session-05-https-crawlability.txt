---
sidebar_position: 5
title: "Session 5 - HTTPS & Crawlability"
---

# Session 5 — HTTPS & Crawlability
**Date:** February 28, 2026

## What We Fixed

Two infrastructure problems that were blocking the core vision — AI assistants fetching docs to resume sessions automatically.

---

## Problem 1: Staging SSL Certificates

All services were running on Let's Encrypt **staging** certificates — not browser-trusted, rejected by external tools and AI fetchers.

### Root Cause Chain
1. `traefik.yml` had `caServer: staging URL` — intentionally set during development to avoid rate limits
2. Removing the line wasn't enough — old cert was cached in a **named Docker volume** (`docker_letsencrypt`), not a bind-mount file
3. Clearing the file on disk did nothing — Traefik reads from the volume

### Fix
```bash
# Remove staging caServer line
sed -i '/caServer/d' ~/iam-platform/infra/traefik/traefik.yml

# Delete the volume (not just the file)
docker compose down
docker volume rm docker_letsencrypt
docker compose up -d
```

### Key Learning
Traefik's `letsencrypt` storage is a **named Docker volume**. Editing the bind-mounted file does nothing. Always delete the volume to reset certificates.

---

## Problem 2: Docusaurus SPA — Not Crawlable

Docusaurus is a React Single Page Application. Crawlers and AI fetchers get an empty HTML shell — the content is loaded via JavaScript which fetchers don't execute.

### Solution: Raw Markdown Endpoint

Added a `prebuild` script that copies all markdown files to `static/raw/` as `.txt` files before every build:
```bash
# copy-raw.sh
find docs -name "*.md" | while read f; do
  dest="static/raw/${f#docs/}.txt"  # renamed to .txt
  mkdir -p "$(dirname "$dest")"
  cp "$f" "$dest"
done
```

Hooked into `package.json`:
```json
"prebuild": "bash ./copy-raw.sh"
```

Every `npm run build` automatically regenerates all raw files. New docs appear at `/raw/` instantly — no manual step.

### Nginx MIME Type Fix

`.txt` files in `/raw/` were being served as `application/octet-stream` (binary). Fixed in `docs.conf`:
```nginx
location /raw/ {
    types { }
    default_type "text/plain; charset=utf-8";
}
```

---

## The Result

Every doc is now accessible as plain text:
```
https://docs.3.25.125.195.sslip.io/raw/00-project-overview/context.txt
https://docs.3.25.125.195.sslip.io/raw/00-project-overview/vision.txt
https://docs.3.25.125.195.sslip.io/raw/00-project-overview/roadmap.txt
```

### How to Start Any New Session
Paste these URLs directly into a new chat:

> Please fetch these 3 URLs as context before we continue:
> - https://docs.3.25.125.195.sslip.io/raw/00-project-overview/context.txt
> - https://docs.3.25.125.195.sslip.io/raw/00-project-overview/vision.txt
> - https://docs.3.25.125.195.sslip.io/raw/00-project-overview/roadmap.txt

The AI fetches them, reads full context, and continues exactly where we left off. No pasting. No re-explaining. No lost context.

---

## What Was Learned

1. **Named Docker volumes ≠ bind-mount files** — clearing the file does nothing, delete the volume
2. **Docusaurus is a SPA** — crawlers need static files, not JavaScript-rendered HTML
3. **prebuild hook** is the right pattern — raw files always stay in sync with docs automatically
4. **Nginx default_type on a location block** overrides MIME for all files in that path
5. **User-provided URLs are fetchable** — AI fetchers allow URLs you provide directly, but block self-initiated fetches to unknown domains
6. **The vision works** — once URLs are user-provided, the AI fetches full context and resumes seamlessly

---

## Files Changed
- `~/iam-platform/infra/traefik/traefik.yml` — removed staging caServer
- `~/iam-platform/infra/nginx/docs.conf` — added /raw/ text/plain block
- `~/platform-docs/copy-raw.sh` — created prebuild script
- `~/platform-docs/package.json` — added prebuild hook
- `~/platform-docs/static/robots.txt` — added to allow crawling
