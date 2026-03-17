---
slug: dev-journal-day-6
title: "Day 6: Doc-Engine Goes Live — Confluence, Webhooks and the Infinite Loop"
authors: [ananga]
tags: [doc-engine, confluence, github, automation]
date: 2026-03-01
---

The day doc-engine went from a single-destination publisher to a dual-destination system — and nearly took down the server in the process.

<!-- truncate -->

Day 6 started with a clear goal: extend doc-engine to publish simultaneously to both Docusaurus and Confluence Cloud. By end of day, we had achieved that — but not before an infinite loop consumed the EC2 instance and required a hard stop.

## Setting Up Confluence

First task was creating a Confluence Cloud free tier account at product-platform-solutions.atlassian.net, space key PPS. Then built confluence.js — a publisher that converts markdown to Confluence storage format (XHTML) and creates or updates pages via the REST API v2. The markdown-to-Confluence conversion handles headings, bold, code blocks, and bullet points — enough for our doc types.

Added a publishers/index.js orchestration layer with a publishAll() function that fans out to both GitHub and Confluence simultaneously. Every writer — journal, changelog, incident, doc-updater — was updated to call publishAll() instead of publishDoc().

## Registering Webhooks

Registered webhooks on all 5 repos (iam-platform, auto-tracker, ai-debug-agent, platform-docs, doc-engine) pointing to http://15.134.72.92:3002/webhook/github. Added HMAC signature verification. Updated webhook.js to trigger on the develop branch in addition to main and master.

## The Infinite Loop

This is where the day got interesting. Tested the webhook by pushing a README change to one of the repos. Doc-engine received it, wrote a changelog, committed to platform-docs. Platform-docs has a webhook. That webhook fired back to doc-engine. Doc-engine wrote another changelog. Committed again. Another webhook. Another changelog. 50+ changelog writes in under 2 minutes.

The t3.micro has 1GB RAM. It ran out. Server became unresponsive. Had to hard stop the EC2 instance from the AWS console, wait for it to come back up, and assess the damage.

The fix was straightforward once we understood the problem: check the commit message and author before processing. Any commit with [doc-engine] in the message gets skipped. Any commit from github-actions[bot] gets skipped. All doc-engine commits now include [doc-engine] in the message. Loop prevention working.

## Frontmatter Sanitization

During testing, Docusaurus build failures started appearing. Groq was occasionally generating malformed frontmatter — missing closing ---, tags as a string instead of a YAML array, closing --- in the wrong position. Added sanitizeMarkdown() to journal.js and changelog.js: strips code fences, detects missing frontmatter closer, inserts --- at the correct position.

Day ended with dual publishing working, loop prevention solid, and the docs site building cleanly.
