---
sidebar_position: 1
title: Server Restart Procedure
---

# Server Restart Procedure

## When to Use
- After AWS instance reboot
- After system updates
- When services are unresponsive

## Steps

### 1. SSH into server
```bash
ssh -i ~/Downloads/iam-platform-key.pem ubuntu@3.25.125.195
```

### 2. Check Docker services
```bash
cd ~/iam-platform/infra/docker
docker compose ps
```

If any service is down:
```bash
docker compose up -d
```

### 3. Check auto-tracker API
```bash
pm2 status
```

If not running:
```bash
cd ~/auto-tracker/api
pm2 start "npx ts-node src/index.ts" --name auto-tracker-api
pm2 save
```

### 4. Verify all endpoints
```bash
curl -s http://localhost:3001/health
curl -sk https://keycloak.3.25.125.195.sslip.io/health/ready
curl -sk https://app.3.25.125.195.sslip.io | head -3
```

### 5. Check Keycloak realm
If iam-platform realm is missing after restart:
```bash
TOKEN=$(curl -s -k -X POST "https://keycloak.3.25.125.195.sslip.io/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin_secret&grant_type=password&client_id=admin-cli" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

curl -s -k -X POST "https://keycloak.3.25.125.195.sslip.io/admin/realms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @/home/ubuntu/iam-platform/iam/keycloak/realms/iam-platform-realm.json
```

## Service Health Checklist

| Service | Check | Expected |
|---------|-------|---------|
| Traefik | `docker compose ps` | Up |
| Keycloak | `/health/ready` | `{"status":"UP"}` |
| PostgreSQL | `docker compose ps` | healthy |
| Nginx/Frontend | Browser | React app loads |
| n8n | Browser | n8n UI loads |
| auto-tracker | `pm2 status` | online |
