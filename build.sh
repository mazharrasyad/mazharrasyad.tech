#!/usr/bin/env bash
# Builds the SvelteKit frontend and the Go backend, and stages the runtime
# data the server needs. Run after `git pull` to deploy a new version, then
# `systemctl restart mazharrasyad-web`.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> building frontend"
cd frontend
npm ci
npm run build
cd ..

echo "==> staging project data for the server"
mkdir -p data
cp frontend/src/lib/data/projects.json data/projects.json

echo "==> building backend"
cd backend
go build -o ../bin/server ./cmd/server
go build -o ../bin/csphash ./cmd/csphash
cd ..

echo "==> computing CSP script hashes for this build"
./bin/csphash frontend/build data/csp-script-hashes.txt

echo "==> done. binary at ./bin/server"
