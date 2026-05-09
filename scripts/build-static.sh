#!/usr/bin/env bash
# Builds a static export of the demo app into _site/.
#
# Preconditions (must be installed before running this script):
#   - npm ci                                      (at repo root)
#   - composer install --no-dev (in packages/demo)
#
# Requires: php >= 8.2, node, npm, wget, curl

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEMO_DIR="$ROOT/packages/demo"
OUT_DIR="$ROOT/_site"
PORT="${PORT:-8765}"
SERVER_LOG="$(mktemp)"
URL_FILE=""
SERVER_PID=""

cleanup() {
    if [ -n "$SERVER_PID" ]; then
        kill "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
    fi
    [ -n "$URL_FILE" ] && rm -f "$URL_FILE"
    rm -f "$SERVER_LOG"
}
trap cleanup EXIT

echo "→ Building UI package"
(cd "$ROOT" && npm run build)

echo "→ Building demo Vite assets"
(cd "$ROOT" && npm run build:demo)

echo "→ Cleaning $OUT_DIR"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "→ Starting prod server on 127.0.0.1:$PORT"
APP_ENV=prod APP_DEBUG=0 \
    php -S "127.0.0.1:$PORT" -t "$DEMO_DIR/public" "$DEMO_DIR/public/index.php" \
    > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

for _ in $(seq 1 60); do
    if curl -sSf "http://127.0.0.1:$PORT/" -o /dev/null 2>/dev/null; then
        break
    fi
    sleep 0.5
done
if ! curl -sSf "http://127.0.0.1:$PORT/" -o /dev/null 2>/dev/null; then
    echo "✗ Server didn't come up. Log:" >&2
    cat "$SERVER_LOG" >&2
    exit 1
fi

echo "→ Generating URL list"
URL_FILE="$(mktemp)"
php "$DEMO_DIR/bin/list-static-urls.php" "http://127.0.0.1:$PORT" > "$URL_FILE"
URL_COUNT=$(wc -l < "$URL_FILE" | tr -d ' ')
echo "  $URL_COUNT URLs to crawl"

echo "→ Crawling"
wget --quiet \
     --input-file="$URL_FILE" \
     --adjust-extension \
     --force-directories \
     --no-host-directories \
     --directory-prefix="$OUT_DIR" \
     -e robots=off

echo "→ Copying built assets"
cp -R "$DEMO_DIR/public/build" "$OUT_DIR/build"

echo "✓ Static site built at $OUT_DIR ($URL_COUNT pages)"
