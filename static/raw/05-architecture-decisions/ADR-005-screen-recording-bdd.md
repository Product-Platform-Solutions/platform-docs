---
sidebar_position: 5
title: ADR-005 - Screen Recording as Definition of Done
---

# ADR-005: Screen Recording as Part of BDD Definition of Done

## Status
Planned

## Date
February 27, 2026

## Context
BDD defines user journeys as scenarios. When a scenario passes, the feature is done. But "tests pass" is abstract — stakeholders cannot verify it themselves.

## The Insight
Anything that gets done has to be demonstrated — a video of the screens captured for the user journey. That should be part of the BDD.

This is how the best engineering teams operate. You don't just say it's done. You show it.

## Decision
In test-forge, every BDD scenario automatically produces a screen recording as part of CI. Recording attached to GitHub Issue. Issue moves to Done only when recording exists.

## How It Works
```
BDD scenarios generated from PRD
        ↓
CI runs E2E tests (Playwright headless)
        ↓
Xvfb virtual display + ffmpeg records session
        ↓
Recording uploaded to GitHub Issue
        ↓
Issue moved to Done automatically
```

## What This Enables
- Non-technical stakeholders watch the user journey
- QA has video evidence without manual testing
- Auditors have timestamped proof of delivery
- Regression — recordings show last known-good state
- Documentation — recordings become part of feature docs

## Consequences
- CI runs take longer
- Storage needed for video artifacts
- Benefit: Zero-ambiguity definition of done
