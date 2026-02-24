---
sidebar_position: 3
title: ADR-003 - Groq for AI Enrichment
---

# ADR-003: Choosing Groq Free Tier for AI Enrichment

## Status
Accepted

## Date
February 24, 2026

## Context
The auto-tracker system needed an AI layer to enrich GitHub events into meaningful ticket descriptions and acceptance criteria. Several options were evaluated.

## Decision
Use **Groq API free tier** with **Llama 3.1 8B Instant** model.

## Alternatives Considered

| Option | Cost | Issues |
|--------|------|--------|
| Claude API | ~$0.001/call | Requires payment setup |
| Ollama (local) | Free | t3.micro too small (needs 4GB+ RAM) |
| Google Gemini | Free tier | Requires credit card |
| Groq Free Tier | Free, no card | 14,400 req/day limit |
| Rule-based only | Free | Less natural output |

## Rationale
Groq offers 14,400 free requests per day with no credit card required. Llama 3.1 8B Instant is fast and produces good quality structured output for ticket enrichment. The system gracefully falls back to rule-based enrichment if Groq is unavailable.

## Consequences
- 14,400 requests/day limit (far more than needed)
- Data goes to Groq's servers (privacy consideration)
- Model quality: good but not GPT-4 level
- Benefit: Zero cost, no credit card, immediate setup
