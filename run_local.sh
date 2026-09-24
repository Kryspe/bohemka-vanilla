#!/usr/bin/env bash
# ============================================================
# Klokani — Spuštění lokálního webového serveru
# ============================================================

cd "$(dirname "$0")"

PORT=8080

echo "============================================================"
echo "Spoustim Klokani — TJ Bohemians Praha (Vanilla verze)"
echo "============================================================"

if command -v php >/dev/null 2>&1; then
    echo "Nalezeno PHP. Spoustim PHP vestaveny server s podporou SQLite API..."
    echo "Otevrete v prohlizeci: http://localhost:$PORT"
    echo "============================================================"
    exec php -S "localhost:$PORT"
elif command -v python3 >/dev/null 2>&1; then
    echo "PHP neni nainstalovano. Spoustim Python HTTP server (LocalStorage rezim)..."
    echo "Otevrete v prohlizeci: http://localhost:$PORT"
    echo "============================================================"
    exec python3 -m http.server "$PORT"
else
    echo "Nebyl nalezen zadny server (PHP ani Python3)."
    echo "Stranky muzete otevrit primo poklepanim na 'index.html'."
    exit 1
fi
