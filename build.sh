#!/usr/bin/env bash
# Builds the prerendered SvelteKit site and reloads nginx, which serves
# frontend/build directly. Run after `git pull` to deploy a new version.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> building frontend"
(cd frontend && npm ci && npm run build)

echo "==> computing CSP script hashes for this build"
node scripts/csp-hashes.mjs frontend/build nginx/csp.conf

echo "==> reloading nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "==> done. nginx now serves frontend/build"
