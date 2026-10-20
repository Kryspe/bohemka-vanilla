# E2E Test Infrastructure & Architecture

**Project:** TJ Bohemians Praha (Plavecký oddíl Klokani) — Vanilla Web & Supabase Integration  
**Framework:** Pure Node.js (v18+) Native E2E Test Harness  
**Dependencies:** 0 npm packages, 0 CDN bundles, 100% standard Node.js APIs (`node:vm`, `node:assert`, `node:fs`, `node:path`, `node:events`, `node:child_process`)  
**Status:** Active & Ready for Milestone Verification

---

## 1. Architectural Philosophy & Zero-Dependency Design

To maintain strict alignment with the project's **Vanilla Web & Repository Constraints** (R4 in `ORIGINAL_REQUEST.md`), the E2E test track operates without external npm testing dependencies (`jest`, `mocha`, `playwright`, `puppeteer`, `jsdom`).

The testing system provides an ultra-fast, independent test runner and execution sandbox that loads, executes, and evaluates the actual client-side JavaScript (`js/data.js`, `js/supabase.js`, `js/store.js`, `js/app.js`) and presentation documents (`admin.html`, `intranet.html`, `zavody.html`, `aktuality.html`, `pro-rodice.html`, `index.html`).

```
                    ┌────────────────────────────────────────────────────────┐
                    │               scripts/e2e/runner.js                    │
                    │         (CLI, ANSI Reporter, JSON Output)              │
                    └──────────────────────────┬─────────────────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
     Tier 1: Feature Matrix         Tier 2: Boundary/Corner         Tier 3: Pairwise Combos
   (F1-F12 Isolation Checks)      (Empty, Malformed, Network)     (Admin->Feed, Intranet->CSV)
               │                               │                               │
               └───────────────────────────────┼───────────────────────────────┘
                                               ▼
                                  Tier 4: Real-World Journeys
                                (Full Club Lifecycles, E2E Sync)
                                               │
                                               ▼
                    ┌────────────────────────────────────────────────────────┐
                    │               scripts/e2e/harness.js                   │
                    │  - In-Memory DOM / Window / Document (MockElement)     │
                    │  - LocalStorage / SessionStorage (MockStorage)         │
                    │  - EventTarget & CustomEvent Bus ("boh:data-updated")  │
                    │  - PostgREST Mock Server & Network Failure Simulator   │
                    │  - Live Cloud Supabase REST Proxy Mode (--live)        │
                    └────────────────────────────────────────────────────────┘
```

---

## 2. Test Harness Components (`scripts/e2e/harness.js`)

1. **`MockStorage`**: Fully functional in-memory implementation of the Web Storage API (`getItem`, `setItem`, `removeItem`, `clear`, `key`, `length`).
2. **`MockElement` & DOM Sandbox**: Lightweight DOM element tree simulation supporting attribute handling, CSS class manipulation, innerHTML parsing, child element traversal, and click dispatch.
3. **`MockPostgrestServer`**: In-process PostgREST query engine modeling the 8 Supabase database tables (`news`, `events`, `event_entries`, `parent_messages`, `trainers`, `records`, `yearbooks`, `users`). Accurately handles REST CRUD requests, query parameter filtering (`select=*`, `eq.<col>`, `order=<col>`), response status codes (200, 201, 204, 400, 404 PGRST205), and error injection (500, 503, 429).
4. **Network & Disconnect Simulator**: Toggleable network state (`sandbox.setOffline(boolean)`). When offline, `fetch` throws `TypeError: Failed to fetch` and dispatches `offline` / `online` events on `window`, testing outbox queue buffering and auto-drain.
5. **Script & HTML Runner**: Uses `node:vm` to execute application source files inside isolated sandboxes, isolating test states while executing the real production code.

---

## 3. Four-Tier Methodology & Coverage Scope

| Tier | Name | Target Scope | Key Verification Areas |
| :---: | :--- | :--- | :--- |
| **Tier 1** | **Feature Coverage (F1–F12)** | Individual feature isolation | • F1: Supabase cloud schema DDL & live table availability<br>• F2: RLS policy definitions on all 8 tables<br>• F3: REST endpoint health (`/rest/v1/<table_name>?select=*`)<br>• F4: Native REST client interface contract without `@supabase/supabase-js`<br>• F5: Store contract & parameter mapping (`perex`/`excerpt`, `text`/`body`, `misto`/`place`)<br>• F6: Frontend deletion integration (`deleteNews`, `deleteEvent`, `deleteAlert`, `cancelSignup`)<br>• F7: Event bus dispatch (`boh:data-updated`)<br>• F8: Script tag loading, CSP connect-src, service worker caching<br>• F9: Offline mutation queue (`boh-offline-queue`)<br>• F10: Graceful fallback to `data.js` and `localStorage`<br>• F11: Programmatic CRUD script contract (`scripts/verify_supabase.js`)<br>• F12: Static code health (`node -c`, HTML inline scripts, CSS balance) |
| **Tier 2** | **Boundary & Corner Cases** | Edge cases & adversarial inputs | • Empty strings, missing parameters, `null`/`undefined` IDs<br>• Invalid data types (non-array disciplines, non-string IDs, malformed dates)<br>• Corrupted `localStorage` JSON recovery<br>• Oversized payloads (10KB title, 100KB body) without memory leaks<br>• Czech diacritics & UTF-8 preservation (`Příliš žluťoučký kůň 🏊‍♂️`)<br>• XSS neutralization via `escapeHtml`<br>• CSV formula injection defense (`=cmd`, `@SUM`, `+`, `-`, `%`)<br>• Network disconnects & HTTP 500, 503, 429 status resiliency |
| **Tier 3** | **Cross-Feature Combinations** | Pairwise and multi-module flows | • **Pair 1**: Admin `addEvent` &rarr; `zavody.html` calendar render &rarr; `deleteEvent` removal<br>• **Pair 2**: Swimmer `signupSwimmer` &rarr; coach roster retrieval &rarr; ČSPS CSV export &rarr; `removeSwimmerEntry`<br>• **Pair 3**: Admin `addNews` &rarr; `aktuality.html` chronological feed &rarr; `deleteNews`<br>• **Pair 4**: Coach `addAlert` &rarr; `pro-rodice.html` display &rarr; update &rarr; archive removal<br>• **Pair 5**: Offline mutation buffering in `boh-offline-queue` &rarr; online reconnection &rarr; sequential sync replay |
| **Tier 4** | **Real-World Scenarios** | Complete user journeys | • **Journey 1**: New season race registration & ČSPS entry file generation lifecycle<br>• **Journey 2**: Coach emergency announcement & parent multi-view board lifecycle<br>• **Journey 3**: Mobile offline race sign-up with delayed reconnection and zero data loss |

---

## 4. Test Runner Invocation & CLI Reference

### Basic Execution
```bash
# Run complete test suite (Tiers 1-4)
./scripts/e2e/run_tests.sh

# Or directly via Node.js
node scripts/e2e/runner.js
```

### CLI Flags & Filtering
```bash
# Run specific tier(s)
./scripts/e2e/run_tests.sh --tier=1
./scripts/e2e/run_tests.sh --tier=2
./scripts/e2e/run_tests.sh --tier=3,4

# Run against live Supabase cloud endpoints
./scripts/e2e/run_tests.sh --live

# Filter by test title keyword or regex
./scripts/e2e/run_tests.sh --filter="offline"
./scripts/e2e/run_tests.sh --filter="F12"

# Verbose output with execution details
./scripts/e2e/run_tests.sh -v

# Stop immediately on first failure
./scripts/e2e/run_tests.sh --bail

# Generate machine-readable JSON report
./scripts/e2e/run_tests.sh --json
```

### Exit Codes
- `0`: All executed test assertions passed successfully.
- `1`: One or more test assertions failed (or unhandled execution error).

---

## 5. Coverage Thresholds & Quality Gates

For Milestone M5 (Final E2E Verification & Adversarial Hardening):
- **Tier 1 (Feature Coverage)**: 100% pass rate (12/12 features verified).
- **Tier 2 (Boundary & Corner Cases)**: 100% pass rate (4/4 test suites verified).
- **Tier 3 (Cross-Feature Combinations)**: 100% pass rate (5/5 pairwise flows verified).
- **Tier 4 (Real-World Application Scenarios)**: 100% pass rate (3/3 user journeys verified).
- **Static Code Health**: 0 syntax errors on `node -c`, 0 duplicate DOM IDs, 100% balanced CSS braces.
