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

# ── 3. quick-secure-auth/web → /admin/ (pre-built, no SC private packages) ───
echo ""
echo "▶ [3/3] quick-secure-auth/web → /admin/ (using pre-built assets)"
cp -r "$REPO_ROOT/hub/pre-built/admin/"* "$DIST/admin/"
echo "✓ admin copied"

# ── Hub landing page ──────────────────────────────────────────────────────────
echo ""
echo "▶ Copying hub landing page…"
cp "$REPO_ROOT/hub/landing.html" "$DIST/index.html"

echo ""
echo "✅ Build complete → hub/dist"
