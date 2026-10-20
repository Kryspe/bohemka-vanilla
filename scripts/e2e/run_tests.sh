#!/usr/bin/env bash
# ==============================================================================
# TJ Bohemians Praha — E2E Test Suite Launcher
# Pure Node.js (v18+) without npm dependencies.
# Exit code: 0 on success, non-zero on failure.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

export NODE_NO_WARNINGS=1

node "${SCRIPT_DIR}/runner.js" "$@"
