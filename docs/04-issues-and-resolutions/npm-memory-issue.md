---
sidebar_position: 4
title: npm Install Hanging on t3.micro
---

# Issue: npm Install Hanging Due to Insufficient Memory

## Date
February 22, 2026

## Problem
Running `npm install` on the AWS t3.micro instance would hang indefinitely with no output or error.

## Root Cause
t3.micro has only **1GB RAM**. With Keycloak + PostgreSQL + Traefik already consuming ~700MB, only ~300MB remained. npm requires at least 512MB to run dependency resolution.

## Resolution
Added a **2GB swap file** to the server:
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

This gives the server effectively 3GB of memory. npm installs now complete successfully.

## Lesson Learned
Always add swap to small cloud instances running multiple services. 2GB swap on a 1GB RAM instance is a safe baseline.
