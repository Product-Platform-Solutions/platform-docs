---
sidebar_position: 1
title: Prerequisites
---

# Prerequisites

## Required Accounts

| Account | URL | Purpose | Cost |
|---------|-----|---------|------|
| GitHub | github.com | Source control, CI/CD | Free |
| AWS | aws.amazon.com | Cloud hosting | Free tier |
| Groq | console.groq.com | AI enrichment | Free tier |

## Required Tools (Local Machine)

| Tool | Purpose | Install |
|------|---------|---------|
| Terminal (Mac) | Command line | Built-in |
| Chrome | Browser | chrome.google.com |
| SSH key | Server access | Generated during AWS setup |

## Server Requirements

AWS EC2 t3.micro (free tier):
- 2 vCPU
- 1GB RAM
- 30GB storage
- Ubuntu 24.04 LTS

With swap configured:
- 2GB swap file added
- Effective memory: 3GB

## Software on Server

All installed automatically:
- Docker 29.2.1
- Docker Compose v2.40.3
- Node.js 20.x
- npm 10.x
- PM2 (process manager)
- Git

## Knowledge Prerequisites

- Basic command line comfort
- Understanding of web concepts (HTTP, HTTPS, DNS)
- No prior Kubernetes or IAM experience required
