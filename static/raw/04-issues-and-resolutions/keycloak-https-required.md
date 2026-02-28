---
sidebar_position: 5
title: Keycloak HTTPS Required Error
---

# Issue: Keycloak Requiring HTTPS for Admin Console

## Date
February 22, 2026

## Problem
Attempting to access Keycloak admin console via HTTP resulted in:
```
We are sorry... HTTPS required
```

## Root Cause
Keycloak enforces HTTPS by default for security. When accessing via plain HTTP IP address, it rejects the connection.

## Resolution
Configured Keycloak to work behind Traefik reverse proxy with proper environment variables:
```yaml
KC_HOSTNAME_STRICT: "false"
KC_HOSTNAME_STRICT_HTTPS: "false"
KC_HTTP_ENABLED: "true"
KC_PROXY: edge
```

The `KC_PROXY: edge` setting tells Keycloak it's behind a trusted reverse proxy that handles TLS termination. Traefik handles HTTPS externally and forwards HTTP internally.

## Lesson Learned
When running Keycloak behind a reverse proxy, always set `KC_PROXY: edge`. This is the standard production configuration.
