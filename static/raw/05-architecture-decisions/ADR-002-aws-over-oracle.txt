---
sidebar_position: 2
title: ADR-002 - AWS over Oracle Cloud
---

# ADR-002: Choosing AWS over Oracle Cloud Free Tier

## Status
Accepted

## Date
February 22, 2026

## Context
We needed a free cloud server to host all services permanently. Two main candidates: Oracle Cloud Always Free and AWS Free Tier.

## Decision
Use **AWS EC2 t3.micro** on the free tier.

## Alternatives Considered

| Provider | Free Offering | Issue |
|----------|--------------|-------|
| Oracle Cloud | 4 ARM cores, 24GB RAM, permanent | Signup blocked by fraud detection |
| AWS | t3.micro, 1GB RAM, 12 months | Works, but time-limited |
| GCP | e2-micro, permanent | Less generous |
| Railway | Container hosting | Less control |

## Rationale
Oracle Cloud's Always Free tier is technically superior (more resources, permanent). However, Oracle's signup process repeatedly failed with "Error processing transaction" despite using valid payment information. AWS signup worked immediately.

## Consequences
- AWS free tier expires after 12 months (Oracle is permanent)
- Only 1GB RAM (mitigated with 2GB swap)
- Need to migrate to Oracle or upgrade before 12 months
- Benefit: Working immediately, familiar tooling, excellent documentation

## Migration Plan
Attempt Oracle signup again in future. All services are containerized so migration is straightforward — export Docker volumes, import on new server.
