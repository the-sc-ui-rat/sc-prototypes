#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$REPO_ROOT/hub/dist"

echo "▶ SC Prototypes Hub — unified build"
echo "  REPO_ROOT: $REPO_ROOT"
echo "  DIST:      $DIST"

mkdir -p "$DIST/login" "$DIST/admin" "$DIST/hris"

# ── 1. Email-less/app → /login/ ──────────────────────────────────────────────
echo ""
echo "▶ [1/3] Email-less/app → /login/"
cd "$REPO_ROOT/Email-less/app"
npm install --silent
npx vite build --base=/login/
cp -r dist/* "$DIST/login/"
echo "✓ login built"

# ── 2. HRIS Email-less → /hris/ ──────────────────────────────────────────────
echo ""
echo "▶ [2/3] HRIS Email-less → /hris/"
cd "$REPO_ROOT/HRIS Email-less"
npm install --silent
npx vite build --base=/hris/
cp -r dist/* "$DIST/hris/"
echo "✓ hris built"

# ── 3. quick-secure-auth/web → /admin/ ───────────────────────────────────────
echo ""
echo "▶ [3/3] quick-secure-auth/web → /admin/"
cd "$REPO_ROOT/quick-secure-auth/web"

if ! command -v pnpm &> /dev/null; then
  echo "  pnpm not found, installing…"
  npm install -g pnpm --silent
fi

if [[ -z "${GITHUB_PACKAGES_TOKEN:-}" ]]; then
  echo "  ⚠ GITHUB_PACKAGES_TOKEN not set — SC private packages may fail"
fi

pnpm install --silent
pnpm exec vite build --config app/vite.config.ts --base=/admin/
cp -r app/dist/* "$DIST/admin/"
echo "✓ admin built"

# ── Hub landing page ──────────────────────────────────────────────────────────
echo ""
echo "▶ Copying hub landing page…"
cp "$REPO_ROOT/hub/landing.html" "$DIST/index.html"

echo ""
echo "✅ Build complete → hub/dist"
