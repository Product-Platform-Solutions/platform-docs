---
sidebar_position: 3
title: MFA - TOTP
---

# Multi-Factor Authentication (TOTP)

## Overview
IAM Platform supports TOTP (Time-based One-Time Password) MFA out of the box via Keycloak. Compatible with FreeOTP+, Google Authenticator, and Authy.

## Configuration

### Enable MFA for a User
1. Go to Keycloak Admin → iam-platform realm
2. **Authentication** → **Required Actions** → Enable **Configure OTP**
3. **Users** → select user → **Required User Actions** → add **Configure OTP** → Save

### OTP Policy Settings
- **Type:** Time Based (TOTP)
- **Algorithm:** SHA1
- **Digits:** 6
- **Period:** 30 seconds
- **Look ahead window:** 3 (recommended for clock tolerance)

## Recommended Authenticator Apps
- **FreeOTP+** (recommended — works most reliably with Keycloak)
- Google Authenticator
- Authy

## Troubleshooting

### Invalid authenticator code
- Increase look ahead window to 3 in OTP Policy
- Ensure phone time is set to automatic
- Wait for code to fully refresh before entering
- Use FreeOTP+ if other apps fail

## Next Steps
- Enforce MFA for all users via Browser flow
- Add MFA grace period for new users
- Add SMS-based MFA (requires SMS provider)
