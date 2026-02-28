---
sidebar_position: 2
title: Gitpod/Codespaces Port Visibility
---

# Issue: Port Visibility Locked in GitHub Codespaces

## Date
February 21-22, 2026

## Context
During initial development, we used GitHub Codespaces as the browser-based IDE. Keycloak was running on port 8080 and the React app on port 5173.

## Problem
GitHub Codespaces under an organization account locks port visibility to **Private** by default. The UI does not allow changing visibility to Public, making services inaccessible from the browser.

## Root Cause
GitHub requires a **Teams or Enterprise plan** to manage port visibility policies at the org level. On the free org plan, ports are locked private.

## What We Tried
1. Changing visibility in the Ports tab — UI was locked
2. Running `gp ports visibility 8080:public` — command not available
3. Adding `"visibility": "public"` to devcontainer.json — ignored by org policy
4. Changing org Codespaces ownership to "User ownership" — did not fix port restrictions

## Resolution
Migrated from GitHub Codespaces to **AWS EC2 t3.micro** (free tier). AWS has no port restrictions — we control the security group directly and can open any port.

## Lesson Learned
For development environments that need public port access, self-hosted infrastructure gives more control than managed cloud IDEs under org accounts.

## Prevention
Always verify port accessibility requirements before choosing a development environment. For IAM development specifically, browser-accessible ports are essential for testing OAuth/OIDC flows.
