# E2E Test Suite Readiness & Verification Report

**Project:** TJ Bohemians Praha (Plavecký oddíl Klokani) — Vanilla Web & Supabase Integration  
**Test Suite Location:** `scripts/e2e/`  
**Execution Command:** `./scripts/e2e/run_tests.sh`  
**Report Generated:** 2026-10-20  
**Overall Test Runner Status:** **17 / 24 Tests Passing** (7 failing due to un-implemented Milestones M1–M4 & known codebase bugs)

---

## 1. Test Execution Commands

```bash
# Execute the full 4-tier E2E test suite
./scripts/e2e/run_tests.sh

# Run specific tiers
./scripts/e2e/run_tests.sh --tier=1       # Feature coverage (F1-F12)
./scripts/e2e/run_tests.sh --tier=2       # Boundary & corner cases
./scripts/e2e/run_tests.sh --tier=3       # Cross-feature combinations
./scripts/e2e/run_tests.sh --tier=4       # Real-world application scenarios

# Execute against live cloud Supabase instance
./scripts/e2e/run_tests.sh --live

# Generate JSON report for CI/CD pipelines
./scripts/e2e/run_tests.sh --json
```

---

## 2. Tier Coverage & Current Status Table

| Tier | Test Case | Target Feature | Status | Notes / Root Cause |
| :---: | :--- | :---: | :---: | :--- |
| **Tier 1** | **F1: Supabase Cloud Database Provisioning** | F1 | **PASS** (Mock) / FAIL (Live) | Schema DDL verified. Live DB returns 404 PGRST205 pending M1 SQL migration. |
| **Tier 1** | **F2: RLS Policies Alignment** | F2 | **PASS** | RLS enabled on all 8 tables; SELECT, INSERT, UPDATE, DELETE policies verified. |
| **Tier 1** | **F3: REST Endpoint Health Check** | F3 | **PASS** (Mock) / FAIL (Live) | PostgREST contract verified. Live DB returns 404 pending M1 migration. |
| **Tier 1** | **F4: Native PostgREST REST Client** | F4 | **FAIL** | `KlokaniSupabase.deleteEvent` missing; `@supabase/supabase-js` decoupling pending M2. |
| **Tier 1** | **F5: Store Contract & Signature Bridge** | F5 | **PASS** | `saveAdminItem` mappings and `signupSwimmer` parameter bridge verified. |
| **Tier 1** | **F6: Frontend Deletion Integration** | F6 | **FAIL** | `BohStore.deleteNews` / `deleteEvent` do not invoke cloud deletion endpoints (pending M2). |
| **Tier 1** | **F7: Event Broadcast & Reactivity** | F7 | **PASS** | `boh:data-updated` event dispatch verified across mutations. |
| **Tier 1** | **F8: Script Loading & CSP Configuration** | F8 | **FAIL** | `<script src="js/supabase.js"></script>` missing in `index.html` (pending M2). |
| **Tier 1** | **F9: Offline Mutation Outbox Queue** | F9 | **FAIL** | `boh-offline-queue` persistence not yet implemented in `js/store.js` (pending M3). |
| **Tier 1** | **F10: Graceful Offline Fallback** | F10 | **PASS** | Seamless fallback to `data.js` and `localStorage` with zero unhandled exceptions. |
| **Tier 1** | **F11: Programmatic CRUD Verification Script** | F11 | **FAIL** | `scripts/verify_supabase.js` not yet created (pending M4). |
| **Tier 1** | **F12: Static Code Health Verification** | F12 | **PASS** | `node -c` on all JS files: 0 errors; CSS braces: 100% balanced. |
| **Tier 2** | **T2.1: Empty Inputs & Missing Fields Handling** | Boundary | **PASS** | Tolerates empty objects, empty titles, empty disciplines without crashes. |
| **Tier 2** | **T2.2: Invalid Types & Malformed Data Sanitization** | Boundary | **PASS** | Normalizes non-array disciplines, handles numeric IDs and corrupted JSON. |
| **Tier 2** | **T2.3: Oversized Content & Adversarial Payloads** | Adversarial | **PASS** | 100KB body tested; Czech diacritics preserved; XSS escaped; CSV formulas sanitized. |
| **Tier 2** | **T2.4: Network Disconnect & Error Resilience** | Network | **PASS** | Handles total network loss, HTTP 500, 503, 429 with fallback data. |
| **Tier 3** | **T3.1: Admin Event Creation & Calendar Presentation** | Pairwise | **PASS** | `addEvent` &rarr; `getEvents()` in `zavody.html` &rarr; `deleteEvent()` verified. |
| **Tier 3** | **T3.2: Swimmer Signup & CSV Roster Export** | Pairwise | **PASS** | `addSwimmerEntry` &rarr; `getRosterForEvent` &rarr; `exportSignupsCsv` &rarr; cancellation verified. |
| **Tier 3** | **T3.3: Admin News Publishing & News Feed** | Pairwise | **PASS** | `addNews` &rarr; `getNews()` in `aktuality.html` &rarr; `deleteNews()` verified. |
| **Tier 3** | **T3.4: Coach Announcement & Parent Board** | Pairwise | **PASS** | `addAlert` &rarr; `getParentsNotes()` in `pro-rodice.html` &rarr; update &rarr; removal verified. |
| **Tier 3** | **T3.5: Offline Outbox Queue & Online Synchronization** | Pairwise | **FAIL** | Pending Milestone M3 implementation of `boh-offline-queue`. |
| **Tier 4** | **T4.1: New Season Race Registration Flow** | Journey | **PASS** | Full lifecycle: race creation &rarr; 2 swimmer signups &rarr; ČSPS CSV &rarr; cancellation. |
| **Tier 4** | **T4.2: Coach Announcement & Parent Multi-View Journey** | Journey | **PASS** | Full lifecycle: urgent schedule notice &rarr; parent board &rarr; update &rarr; archive. |
| **Tier 4** | **T4.3: Mobile Offline Race Sign-up & Delayed Sync Journey** | Journey | **FAIL** | Offline buffering into `boh-offline-queue` pending Milestone M3. |

---

## 3. Discovered Implementation Defects (Escalated to Orchestrator)

1. **Defect 1 (M1 Dependency): Live Cloud Tables Not Provisioned (`PGRST205`)**
   - *Symptom:* Live HTTP query to `https://xjvpyznywisuuykwsedd.supabase.co/rest/v1/news?select=*` returns HTTP 404 with PostgREST error `PGRST205` (table not in schema cache).
   - *Target Milestone:* M1 (Database Schema & RLS Provisioning).
2. **Defect 2 (M2 Contract): Missing `deleteEvent` in `js/supabase.js`**
   - *Symptom:* `KlokaniSupabase.deleteEvent` is `undefined`.
   - *Target Milestone:* M2 (Vanilla REST Client & Frontend Sync).
3. **Defect 3 (M2 Contract): Missing Cloud Deletion Calls in `js/store.js`**
   - *Symptom:* `BohStore.deleteNews` and `deleteEvent` only modify local storage and do not invoke `KlokaniSupabase.deleteNews` or `deleteEvent`.
   - *Target Milestone:* M2 (Vanilla REST Client & Frontend Sync).
4. **Defect 4 (M2 Setup): Missing Script Tags in Public Pages**
   - *Symptom:* `<script src="js/supabase.js"></script>` is missing from `index.html`.
   - *Target Milestone:* M2 (Script Loading & CSP Configuration).
5. **Defect 5 (M3 Dependency): Missing Offline Outbox Queue (`boh-offline-queue`)**
   - *Symptom:* Offline mutations are not queued in `localStorage` under `boh-offline-queue`, preventing replay on reconnection.
   - *Target Milestone:* M3 (Offline Fallback & Outbox Queue).
6. **Defect 6 (M4 Dependency): Missing `scripts/verify_supabase.js`**
   - *Symptom:* Automated programmatic verification script is not yet created.
   - *Target Milestone:* M4 (Automated Programmatic Verification).
7. **Defect 7 (Sanitization): `sanitizeCsv` in `js/store.js` Strips `\t` and `\r`**
   - *Symptom:* Line 48 runs `const str = String(val).trim();` before checking formula injection regex `/^[=+\-@\t\r%]/.test(str)`. Leading tabs or carriage returns are stripped before the test, allowing tabbed injection payloads to pass without single-quote prefix.
   - *Target Milestone:* M2 / Store Security Polish.
