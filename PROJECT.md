# Project: TJ Bohemians Praha — Complete Audit, Intranet & Bidirectional Sync

## Architecture
- **Data Layer (Cloud)**: Supabase PostgreSQL instance `https://xjvpyznywisuuykwsedd.supabase.co` exposing REST endpoints via PostgREST with Row Level Security (RLS) for 8 core tables: `news`, `events`, `event_entries`, `parent_messages`, `trainers`, `records`, `yearbooks`, `users`.
- **Data Layer (Local SQLite)**: Embedded SQLite database in `data/bohemka.sqlite` in 1:1 data parity with Supabase.
- **Backend & API Layer (PHP 8.2 & Node.js)**:
  - `server.cjs`: Fast local Node.js development and runtime server on port 8080 handling clean URLs, API endpoints, and CSP headers.
  - `api/*.php` & `includes/db.php`: Standard PHP 8.2 REST backend with PDO SQLite handlers and `syncToSupabase` cloud sync webhooks.
  - `router.php`: PHP built-in server routing with clean URL redirects (exempting `/api/`).
- **Client Transport Layer (Vanilla JS)**: Lightweight native `fetch` REST client in `js/supabase.js` operating with zero npm/CDN dependencies.
- **Frontend State & Store Layer**: `js/store.js` (`window.BohStore`) managing unified data models for admin, coach, and swimmer operations, optimistic local UI updates, and synchronization dispatch.
- **Offline & Resilience Layer**: Persistent offline mutation outbox (`boh-offline-queue` in `localStorage`), automatic queue replay on reconnection (`window.addEventListener("online")`), and static data fallback to `js/data.js` and `localStorage`.
- **UI & Presentation Layer**: Vanilla HTML5/CSS3 pages (`index.html`, `aktuality.html`, `pro-rodice.html`, `oddil.html`, `zavody.html`, `rekordy.html`, `statistika.html`, `foto.html`, `ke-stazeni.html`, `kontakt.html`, `admin.html`, `intranet.html`) with cross-tab and real-time DOM reactivity via unified `boh:data-updated` event broadcasts.
- **Automated Verification Layer**: Standalone Node.js verification script (`scripts/e2e/verify_crud.js`), E2E test runner (`scripts/e2e/run_tests.sh`), and static lint/syntax verification (`scripts/test_static.sh`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Supabase Cloud Database Provisioning | Provision all 8 tables (`news`, `events`, `event_entries`, `parent_messages`, `trainers`, `records`, `yearbooks`, `users`) on Supabase | M1 | ORIGINAL_REQUEST §R1 |
| F2 | RLS Policies Alignment | Configure Row Level Security on all 8 tables for public SELECT, validated INSERT/UPDATE, DELETE | M1 | ORIGINAL_REQUEST §R1 |
| F3 | REST Endpoint Health Check | Verify GET `/rest/v1/<table_name>?select=*` returns HTTP 200/206 with valid JSON | M1 | ORIGINAL_REQUEST §Acceptance Criteria |
| F4 | Native PostgREST REST Client | Zero-dependency native `fetch` REST client in `js/supabase.js` | M2 | ORIGINAL_REQUEST §R2 |
| F5 | Store Contract & Signature Bridge | Correct all field mapping and method signature bridges in `js/store.js` | M2 | ORIGINAL_REQUEST §R2 |
| F6 | Frontend Deletion Integration | Connect deletions in `js/store.js` to cloud Supabase deletion endpoints | M2 | ORIGINAL_REQUEST §R2 |
| F7 | Event Broadcast & Reactivity | Standardize on `boh:data-updated` event across `js/supabase.js`, `js/store.js`, intranet, public pages | M2 | ORIGINAL_REQUEST §R2 |
| F8 | Script Loading & CSP Configuration | Load `js/supabase.js` across pages, configure CSP in `server.cjs` and `api/db.php` | M2 | ORIGINAL_REQUEST §R2 |
| F9 | Offline Mutation Outbox Queue | Implement `boh-offline-queue` in `localStorage` to capture offline mutations | M3 | ORIGINAL_REQUEST §R2 |
| F10 | Graceful Offline Fallback | Guarantee 100% offline fallback to `localStorage` and `js/data.js` | M3 | ORIGINAL_REQUEST §R2 |
| F11 | Programmatic CRUD Verification Script | Build `scripts/e2e/verify_crud.js` testing full insert, read, update, delete cycle | M4 | ORIGINAL_REQUEST §R3 |
| F12 | Static Code Health Verification | Implement `scripts/test_static.sh` to verify syntax (`node -c`), HTML scripts, CSS balance | M4 | ORIGINAL_REQUEST §Acceptance Criteria |
| F13 | Independent E2E Test Suite (Tiers 1-4) | Comprehensive test suite verifying features, boundaries, combinations, and workflows | E2E Track | ORIGINAL_REQUEST §Acceptance Criteria |
| F14 | Visual Audit & Design Integrity (R1) | Fix `ke-stazeni.html` downloads to local `assets/downloads/`, fix `foto.html` photobank banner width, Polish `index.html` countdown Czech declension | M1 | ORIGINAL_REQUEST (2026-10-24) §R1, Survey 1 |
| F15 | Member Intranet & CMS Enhancements (R2) | Add interactive discipline dialog in `intranet.html`, add Lenex 3.0 export in `intranet.html`, restore QR payment card (VS 214) with `assets/QR_plavani214.jpg` in `intranet.html` and `pro-rodice.html`, align `admin_items` kind filter in `js/store.js` for `'oznameni'` | M1 | ORIGINAL_REQUEST (2026-10-24) §R2, Survey 2 |
| F16 | PHP Router & Dual Server Parity (R3) | Update `router.php` to exempt `/api/` from clean URL redirects (`!str_starts_with($uri, '/api/')`) for clean POST/DELETE handling on PHP server | M1 | ORIGINAL_REQUEST (2026-10-24) §R3, Survey 3 |
| F17 | Automated Regression Verification (R4) | Add E2E tests for Lenex 3.0 export in intranet, QR payment card VS 214, local PDF downloads, and verify 100% pass across `./scripts/e2e/run_tests.sh --live`, `node scripts/e2e/verify_crud.js`, and `scripts/test_static.sh` | M2 | ORIGINAL_REQUEST (2026-10-24) §R4, Project Pattern |

## Milestones (Current Request: 2026-10-24)
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Web, Intranet & Sync Optimization (R1, R2, R3) | Fix download URLs to local assets, fix banner width, polish countdown declension, add discipline picker modal and Lenex 3.0 export in intranet, restore QR payment card (VS 214) with `assets/QR_plavani214.jpg`, fix `'oznameni'` in `js/store.js`, and exempt `/api/` in `router.php`. | none | DONE |
| M2 | Final Milestone: Regression Verification & Adversarial Hardening (R4) | Phase 1: 100% E2E test pass across all tiers (T1-T4), verify CRUD and static health. Phase 2: Adversarial coverage hardening (Tier 5). | M1 | DONE |

## Interface Contracts

### QR Payment Contract (SPAYD standard)
- Bank Account: ČSOB `351416278/0300`
- IBAN: `CZ3603000000000351416278`
- Variable Symbol (VS): `214`
- Asset Path: `assets/QR_plavani214.jpg`
- SPAYD String: `SPD*1.0*ACC:CZ3603000000000351416278*DT:20260907*CC:CZK*X-VS:214*MSG:Plavání jméno `

### Lenex 3.0 Export Contract
- File Name: `bohemians_lenex_prihlasky_<timestamp>.xml`
- Format: XML `<LENEX version="3.0">`
- Root elements: `CONSTRUCTOR`, `MEETS`, `MEET` (`course="SCM"`), `CLUBS`, `CLUB` (`code="BOH"`, `name="TJ Bohemians Praha"`, `nation="CZE"`), `ATHLETES`, `ENTRIES`.

### ČSPS CSV Export Contract
- Delimiter: `;`
- Encoding: UTF-8 with BOM (`\uFEFF`)
- Columns: `"Závod";"Datum";"Místo";"Jméno plavce";"Ročník";"Pohlaví";"Kategorie/Skupina";"Přihlášené disciplíny";"Poznámka / Odhláška"`
- Formula injection defense: `sanitizeCsv` prefixing `'` for `[=+\-@\t\r%]`.

### Clean URL & API Routing Contract
- URL rewriting: Clean URLs without `.html` redirect with 301 to clean form.
- API exemption: Requests to `/api/*` are never redirected with 301.

## Code Layout
- `js/supabase.js`: Native PostgREST REST client, CRUD APIs, connection tester, offline sync manager.
- `js/store.js`: Local storage manager, optimistic UI updates, outbox queue, event dispatcher, ČSPS CSV generator.
- `js/app.js`: Application logic, DOM renderers, calendar, race modal.
- `js/intranet.js`: Member Intranet logic, entries, schedules, announcements, QR payments.
- `js/data.js`: Fallback static club data and 18 standard disciplines.
- `router.php`: PHP built-in server router.
- `api/*.php`: PHP 8.2 SQLite and Supabase sync endpoints.
- `server.cjs`: Local development Node.js server.
- `scripts/e2e/`: Independent E2E test suite runner and test cases.
- `assets/downloads/`: Authentic club PDFs (2026/27).
- `assets/QR_plavani214.jpg`: Authentic SPAYD QR payment image.
