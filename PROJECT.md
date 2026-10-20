# Project: TJ Bohemians Praha — Supabase Cloud Integration & Bidirectional Sync

## Architecture
- **Data Layer (Cloud)**: Supabase PostgreSQL instance `https://xjvpyznywisuuykwsedd.supabase.co` exposing REST endpoints via PostgREST with Row Level Security (RLS) for 8 core tables: `news`, `events`, `event_entries`, `parent_messages`, `trainers`, `records`, `yearbooks`, `users`.
- **Client Transport Layer (Vanilla)**: Lightweight native `fetch` REST client in `js/supabase.js` operating with zero npm/CDN dependencies, handling API headers, pagination, error states, and connection health diagnostics.
- **Frontend State & Store Layer**: `js/store.js` (`window.BohStore`) managing unified data models for admin, coach, and swimmer operations, optimistic local UI updates, and synchronization dispatch.
- **Offline & Resilience Layer**: Persistent offline mutation outbox (`boh-offline-queue` in `localStorage`), automatic queue replay on reconnection (`window.addEventListener("online")`), and static data fallback to `js/data.js` and `localStorage`.
- **UI & Presentation Layer**: Vanilla HTML5/CSS3 pages (`index.html`, `aktuality.html`, `zavody.html`, `pro-rodice.html`, `admin.html`, `intranet.html`) with cross-tab and real-time DOM reactivity via unified `boh:data-updated` event broadcasts.
- **Automated Verification Layer**: Standalone Node.js verification script (`scripts/verify_supabase.js` / `.sh`) performing live schema validation and programmatic CRUD cycles, plus static lint/syntax verification (`scripts/test_static.sh`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Supabase Cloud Database Provisioning | Execute/provision all 8 tables (`news`, `events`, `event_entries`, `parent_messages`, `trainers`, `records`, `yearbooks`, `users`) on `xjvpyznywisuuykwsedd.supabase.co` | M1 | ORIGINAL_REQUEST §R1 |
| F2 | RLS Policies Alignment | Configure Row Level Security on all 8 tables for public SELECT, validated INSERT/UPDATE, and authorized/test DELETE | M1 | ORIGINAL_REQUEST §R1 |
| F3 | REST Endpoint Health Check | Verify GET `/rest/v1/<table_name>?select=*` returns HTTP 200 with valid JSON array and 0 PGRST205 errors for all 8 tables | M1 | ORIGINAL_REQUEST §Acceptance Criteria |
| F4 | Native PostgREST REST Client | Implement zero-dependency native `fetch` REST client in `js/supabase.js` supporting GET, POST, PATCH, DELETE | M2 | ORIGINAL_REQUEST §R2, Survey 2 |
| F5 | Store Contract & Signature Bridge | Correct all field mapping and method signature mismatches in `js/store.js` (`saveAdminItem`, `saveSignup`, `cancelSignup`, `signupSwimmer`) | M2 | ORIGINAL_REQUEST §R2, Survey 2 |
| F6 | Frontend Deletion Integration | Connect `deleteNews`, `deleteEvent`, `deleteAlert`, `cancelSignup` in `js/store.js` to cloud Supabase deletion endpoints | M2 | ORIGINAL_REQUEST §R2, Survey 2 |
| F7 | Event Broadcast & Reactivity | Standardize on `boh:data-updated` event across `js/supabase.js`, `js/store.js`, and attach listeners in `intranet.html` and public pages | M2 | ORIGINAL_REQUEST §R2, Survey 2 |
| F8 | Script Loading & CSP Configuration | Load `js/supabase.js` in `index.html`, `aktuality.html`, `zavody.html`, `pro-rodice.html`; update CSP in `server.cjs` and `api/db.php`; update `sw.js` cache | M2 | ORIGINAL_REQUEST §R2, Survey 2, 3 |
| F9 | Offline Mutation Outbox Queue | Implement `boh-offline-queue` in `localStorage` to capture offline mutations and drain sequentially on `online` event | M3 | ORIGINAL_REQUEST §R2 |
| F10 | Graceful Offline Fallback | Guarantee 100% offline fallback to `localStorage` and `js/data.js` without unhandled JS exceptions or UI breakage | M3 | ORIGINAL_REQUEST §R2, §Acceptance Criteria |
| F11 | Programmatic CRUD Verification Script | Build `scripts/verify_supabase.js` and `scripts/verify_supabase.sh` testing full insert, read, update, delete, verify cleanup cycle with exit code 0 | M4 | ORIGINAL_REQUEST §R3 |
| F12 | Static Code Health Verification | Implement `scripts/test_static.sh` to verify syntax (`node -c`), HTML inline scripts, CSS balance, 0 errors | M4 | ORIGINAL_REQUEST §Acceptance Criteria, Survey 3 |
| F13 | Independent E2E Test Suite (Tiers 1-4) | Comprehensive opaque-box test suite verifying all features, boundary cases, pairwise interactions, and real-world workflows | E2E Track | ORIGINAL_REQUEST §Acceptance Criteria |
| F14 | 100% E2E Pass & Adversarial Hardening | Pass 100% of E2E test suite (Tiers 1-4) and harden edge-case coverage via Tier 5 adversarial stress testing | M5 | Project Pattern Final Milestone |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Cloud Database Schema & RLS Provisioning | Provision all 8 tables in Supabase cloud project `xjvpyznywisuuykwsedd`. Configure RLS policies for public read, validated write, and authorized/test deletion. | none | DONE |
| M2 | Vanilla REST Client & Frontend Sync | Zero-dependency native fetch client in `js/supabase.js`, fix `js/store.js` contract mismatches, connect deletions, unify event bus on `boh:data-updated`, update HTML/CSP/SW. | M1 | DONE |
| M3 | Offline Fallback & Mutation Outbox | Persistent `boh-offline-queue`, auto-reconciliation on `online`, zero unhandled exceptions on network loss or missing keys. | M2 | DONE |
| M4 | Automated Programmatic Verification | `scripts/verify_supabase.js` (R3 CRUD test with exit code 0), `scripts/verify_supabase.sh`, and `scripts/test_static.sh` (node -c, HTML syntax). | M1, M2 | DONE |
| M5 | Final Milestone: 100% E2E Pass & Adversarial Hardening | Pass 100% of E2E tests (Tiers 1-4) from E2E Testing Track, followed by Phase 2 adversarial coverage hardening (Tier 5). | M1, M2, M3, M4, E2E Track | DONE |

## Parallel Track: E2E Testing Track
- **Role**: Independent, opaque-box E2E test suite creation derived from `ORIGINAL_REQUEST.md`.
- **Deliverables**: Test infrastructure (`scripts/e2e/`), test cases covering Tiers 1-4, `TEST_INFRA.md`, and `TEST_READY.md`.

## Interface Contracts

### `js/supabase.js` (`window.KlokaniSupabase`) ↔ `js/store.js` (`window.BohStore`)
- `KlokaniSupabase.getNews()` &rarr; `Promise<Array<NewsItem>>`
  - NewsItem: `{ id: string, title: string, slug: string, author: string, date: string, excerpt: string, body: Array<string|object>, image_url: string }`
- `KlokaniSupabase.saveNews(newsItem)` &rarr; `Promise<{ success: boolean, item?: NewsItem, error?: string }>`
- `KlokaniSupabase.deleteNews(id: string)` &rarr; `Promise<{ success: boolean, error?: string }>`
- `KlokaniSupabase.getEvents()` &rarr; `Promise<Array<EventItem>>`
  - EventItem: `{ id: string, name: string, place: string, date: string, deadline: string|null, type: string, kind: string, status: string, disciplines: Array<string>, note: string }`
- `KlokaniSupabase.saveEvent(eventItem)` &rarr; `Promise<{ success: boolean, item?: EventItem, error?: string }>`
- `KlokaniSupabase.deleteEvent(id: string)` &rarr; `Promise<{ success: boolean, error?: string }>`
- `KlokaniSupabase.signupSwimmer(eventIdOrObj, swimmerName, disciplines, note, groupName)` &rarr; `Promise<{ success: boolean, entry?: object, error?: string }>`
  - Must accept either positional arguments OR single object `{ event_id, swimmer_name, disciplines, note, group_name }`.
- `KlokaniSupabase.cancelSignup(entryIdOrEventId, swimmerName)` &rarr; `Promise<{ success: boolean, error?: string }>`
- `KlokaniSupabase.saveMessage(messageItem)` &rarr; `Promise<{ success: boolean, item?: object, error?: string }>`
  - MessageItem: `{ id?: number, text: string, category?: string, title?: string, author?: string, date?: string }`
- `KlokaniSupabase.deleteMessage(id: number|string)` &rarr; `Promise<{ success: boolean, error?: string }>`
- `KlokaniSupabase.testConnection()` &rarr; `Promise<{ ok: boolean, status: number, details?: string }>`

### Event Bus Contract
- Event Name: `"boh:data-updated"`
- Detail: `{ kind: "news" | "events" | "messages" | "signups" | "all", action: "create" | "update" | "delete" | "sync", item?: object }`

### Programmatic CRUD Script Contract (`scripts/verify_supabase.js`)
- Invocation: `node scripts/verify_supabase.js`
- Exit Code: `0` on complete success, non-zero on any failure.
- Output: Structured JSON / console logs with PASS/FAIL for each step.
- Test ID Format: `test-crud-${Date.now()}` with mandatory deletion cleanup.

## Code Layout
- `js/supabase.js`: Native PostgREST REST client, CRUD APIs, connection tester, offline sync manager.
- `js/store.js`: Local storage manager, optimistic UI updates, outbox queue, event dispatcher.
- `js/app.js`: Application logic, DOM renderers, event listeners.
- `js/data.js`: Fallback static club data.
- `scripts/verify_supabase.js`: Automated programmatic verification script (R3).
- `scripts/verify_supabase.sh`: Executable bash wrapper for verification.
- `scripts/test_static.sh`: Static code health validator (syntax, HTML, CSS).
- `scripts/e2e/`: Independent E2E test suite runner and test cases.
- `admin.html`, `intranet.html`, `index.html`, `aktuality.html`, `zavody.html`, `pro-rodice.html`: Presentation pages.
- `server.cjs`: Local development server with updated CSP headers.
- `sw.js`: Service worker with updated cache manifest.
- `supabase_schema.sql`: Authoritative PostgreSQL schema and RLS definitions.
