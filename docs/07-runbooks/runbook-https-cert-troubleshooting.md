---
sidebar_position: 1
title: HTTPS Certificate Troubleshooting
---

# Runbook: HTTPS Certificate Troubleshooting

## Symptoms
- `curl` returns `unable to get local issuer certificate`
- Browser shows "Your connection is not private"
- External tools cannot fetch URLs from the docs site
- Let's Encrypt not issuing new certificates

---

## Root Causes We Hit (In Order)

### 1. Staging Certificate
**Symptom:** SSL error in browser and curl without -k flag
**Cause:** traefik.yml had `caServer: "https://acme-staging-v02.api.letsencrypt.org/directory"`
**Fix:**
```bash
sed -i '/caServer/d' ~/iam-platform/infra/traefik/traefik.yml
```

### 2. Old Staging Cert Cached in Docker Volume
**Symptom:** Removed caServer line but cert still untrusted
**Cause:** Traefik reads acme.json from a named Docker volume, not a bind mount file
**Fix:**
```bash
cd ~/iam-platform/infra/docker
docker compose down
docker volume rm docker_letsencrypt
docker compose up -d
```

### 3. Traefik API Not Accessible
**Symptom:** `curl localhost:8080/api/rawdata` returns empty
**Cause:** `api.insecure: false` in traefik.yml blocks API access
**Fix (temporary for debugging):**
```bash
sed -i 's/insecure: false/insecure: true/' ~/iam-platform/infra/traefik/traefik.yml
docker restart iam-traefik
# Verify routers are registered:
docker exec iam-traefik wget -q -O- http://localhost:8080/api/rawdata 2>/dev/null | python3 -m json.tool | grep "rule"
# Set back to false after debugging:
sed -i 's/insecure: true/insecure: false/' ~/iam-platform/infra/traefik/traefik.yml
```

### 4. Docker Socket Permission Denied
**Symptom:** Traefik starts but discovers no containers, no routers registered
**Cause:** Docker socket group (988) not accessible inside Traefik container
**Fix:**
```bash
sudo chmod 666 /var/run/docker.sock
docker restart iam-traefik
```

### 5. Cert Already Issued But Not Loaded
**Symptom:** acme.json has valid certs but curl still fails
**Cause:** Traefik container needs restart to load new certs from volume
**Fix:**
```bash
docker restart iam-traefik
sleep 15
curl -s https://docs.3.25.125.195.sslip.io | head -3
```

---

## Verification Commands
```bash
# Check if cert is trusted (no -k flag)
curl -s https://docs.3.25.125.195.sslip.io | head -3

# Check cert details
curl -sv https://docs.3.25.125.195.sslip.io 2>&1 | grep -E "issuer|subject|SSL|certificate"

# Check Traefik logs
docker logs iam-traefik --tail 30

# Check registered routers
docker exec iam-traefik wget -q -O- http://localhost:8080/api/rawdata 2>/dev/null | python3 -m json.tool | grep "rule"

# Check acme.json for issued certs
docker exec iam-traefik cat /letsencrypt/acme.json | python3 -m json.tool | grep "main"

# Check port 80 is reachable (required for HTTP challenge)
curl -v http://3.25.125.195/.well-known/acme-challenge/test 2>&1 | grep -E "Connected|HTTP"
```

---

## Full Reset Procedure

If nothing works, full reset:
```bash
# 1. Remove staging caServer line
sed -i '/caServer/d' ~/iam-platform/infra/traefik/traefik.yml

# 2. Fix Docker socket permissions
sudo chmod 666 /var/run/docker.sock

# 3. Enable API for debugging
sed -i 's/insecure: false/insecure: true/' ~/iam-platform/infra/traefik/traefik.yml

# 4. Tear down and remove old cert volume
cd ~/iam-platform/infra/docker
docker compose down
docker volume rm docker_letsencrypt

# 5. Start fresh
docker compose up -d

# 6. Wait for postgres health check
sleep 15

# 7. Trigger cert issuance by hitting all domains
curl -k https://app.3.25.125.195.sslip.io > /dev/null 2>&1
curl -k https://keycloak.3.25.125.195.sslip.io > /dev/null 2>&1
curl -k https://docs.3.25.125.195.sslip.io > /dev/null 2>&1
curl -k https://n8n.3.25.125.195.sslip.io > /dev/null 2>&1

# 8. Wait for certs to issue
sleep 60

# 9. Verify
curl -s https://docs.3.25.125.195.sslip.io | head -3
```

---

## Key Facts

- Let's Encrypt staging certs are NOT browser trusted — for dev only
- Let's Encrypt production is the default when caServer line is absent
- sslip.io has been hit by rate limits on staging but production works fine
- Traefik only requests a cert when it first receives an HTTPS request for a domain
- The letsencrypt volume is named (docker_letsencrypt) not a bind mount — clearing the file on disk does nothing
- Docker socket must be chmod 666 or Traefik must run as root to discover containers
- HTTP port 80 must be open in AWS Security Group for HTTP challenge to work
