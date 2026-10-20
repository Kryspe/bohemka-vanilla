#!/usr/bin/env node
/**
 * TJ Bohemians Praha — Supabase Cloud & Programmatic CRUD Verification Script
 * Milestone M4 (Requirement R3 / F11)
 *
 * Architecture: Pure Vanilla Node.js (v18+) | Zero external npm dependencies.
 *
 * Strict Live Mode:
 * Operates exclusively and strictly against the live Supabase cloud project
 * (https://xjvpyznywisuuykwsedd.supabase.co). All mock servers and loopback
 * simulations have been permanently removed.
 *
 * Phases:
 * 1. Endpoint & Table Health Check:
 *    - Validates GET /rest/v1/<table_name>?select=*&limit=1 across all 8 core tables:
 *      news, events, event_entries, parent_messages, trainers, records, yearbooks, users.
 *    - Asserts HTTP 200 with valid JSON array and 0 PGRST205 errors.
 *    - Fails immediately with exit code 1 if any table is unprovisioned.
 * 2. Programmatic Full CRUD Cycle (Requirement R3):
 *    - Executes CREATE, READ, UPDATE, DELETE, and VERIFY CLEANUP against live cloud REST API.
 *    - Guaranteed cleanup in finally block.
 *
 * Exit code: 0 on 100% live verified success, 1 on any error or unprovisioned state.
 */

const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");

const TABLES = [
  "news",
  "events",
  "event_entries",
  "parent_messages",
  "trainers",
  "records",
  "yearbooks",
  "users"
];

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m"
};

function parseArgs(argv) {
  const opts = {
    live: true, // Strict live cloud verification is universal
    json: false,
    quiet: false,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--live") opts.live = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--quiet" || arg === "-q") opts.quiet = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function printHelp() {
  console.log(`
${COLORS.bold}TJ Bohemians Praha — Supabase Programmatic Verification Script (F11 / R3)${COLORS.reset}

Usage:
  node scripts/verify_supabase.js [options]
  bash scripts/verify_supabase.sh [options]

Options:
  --live         Strict live cloud database verification (default)
  --json         Output detailed verification results as JSON
  --quiet, -q    Minimal console output
  --help, -h     Show this help message

Exit codes:
  0: Live cloud database provisioned and CRUD cycle verified clean
  1: Cloud tables unprovisioned (PGRST205), invalid credentials, or test failure
`);
}

function resolveCredentials() {
  let url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !key) {
    try {
      const clientPath = path.resolve(__dirname, "../js/supabase.js");
      if (fs.existsSync(clientPath)) {
        const clientCode = fs.readFileSync(clientPath, "utf-8");
        const urlMatch = clientCode.match(/DEFAULT_SUPABASE_URL\s*=\s*["']([^"']+)["']/);
        const keyMatch = clientCode.match(/DEFAULT_SUPABASE_ANON_KEY\s*=\s*["']([^"']+)["']/);
        if (!url && urlMatch) url = urlMatch[1];
        if (!key && keyMatch) key = keyMatch[1];
      }
    } catch (_) {}
  }

  if (!url) url = "https://xjvpyznywisuuykwsedd.supabase.co";
  if (!key) key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";

  return { url: url.replace(/\/+$/, ""), key };
}

async function run() {
  const opts = parseArgs(process.argv);

  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const credentials = resolveCredentials();
  const report = {
    timestamp: new Date().toISOString(),
    targetUrl: credentials.url,
    mode: "strict-live",
    phase1: {
      passed: false,
      allTablesHealthy: false,
      pgrst205Errors: 0,
      tables: {}
    },
    phase2: {
      passed: false,
      testId: null,
      steps: []
    },
    success: false
  };

  const log = (msg) => {
    if (!opts.quiet && !opts.json) console.log(msg);
  };

  log(`\n${COLORS.bold}${COLORS.cyan}══════════════════════════════════════════════════════════════════${COLORS.reset}`);
  log(`${COLORS.bold}${COLORS.green}  🏊 TJ BOHEMIANS PRAHA — SUPABASE PROGRAMMATIC VERIFICATION (R3)${COLORS.reset}`);
  log(`${COLORS.dim}  Node: ${process.version} | Native fetch | Zero Dependencies${COLORS.reset}`);
  log(`${COLORS.dim}  Target: ${credentials.url} | Mode: STRICT LIVE${COLORS.reset}`);
  log(`${COLORS.bold}${COLORS.cyan}══════════════════════════════════════════════════════════════════${COLORS.reset}\n`);

  // ============================================================================
  // PHASE 1: ENDPOINT & TABLE HEALTH CHECK
  // ============================================================================
  log(`${COLORS.bold}▶ Phase 1: Endpoint & Table Health Check (8 core tables)${COLORS.reset}`);

  let allTablesHealthy = true;
  let pgrst205Errors = 0;

  for (const table of TABLES) {
    const endpoint = `${credentials.url}/rest/v1/${table}?select=*&limit=1`;
    try {
      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "apikey": credentials.key,
          "Authorization": `Bearer ${credentials.key}`,
          "Accept": "application/json"
        }
      });

      const bodyText = await res.text();
      let data = null;
      try {
        data = JSON.parse(bodyText);
      } catch (_) {}

      const isPgrst205 = res.status === 404 && (
        (data && data.code === "PGRST205") ||
        bodyText.includes("PGRST205") ||
        bodyText.includes("schema cache")
      );

      const isOk = res.status === 200 && Array.isArray(data);

      report.phase1.tables[table] = {
        endpoint: `/rest/v1/${table}?select=*&limit=1`,
        status: res.status,
        ok: isOk,
        pgrst205: isPgrst205,
        rows: Array.isArray(data) ? data.length : 0,
        rawBody: isOk ? undefined : bodyText.slice(0, 160)
      };

      if (isPgrst205) {
        pgrst205Errors++;
        allTablesHealthy = false;
        log(`  ${COLORS.yellow}⚠ UNPROVISIONED${COLORS.reset} ${table}: HTTP 404 PGRST205 (not in schema cache)`);
      } else if (isOk) {
        log(`  ${COLORS.green}✔ OK${COLORS.reset} ${table}: HTTP 200 (JSON array, ${data.length} items)`);
      } else {
        allTablesHealthy = false;
        log(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${table}: HTTP ${res.status}`);
      }
    } catch (err) {
      allTablesHealthy = false;
      report.phase1.tables[table] = {
        status: 0,
        ok: false,
        error: err.message
      };
      log(`  ${COLORS.red}✖ ERROR${COLORS.reset} ${table}: ${err.message}`);
    }
  }

  report.phase1.allTablesHealthy = allTablesHealthy;
  report.phase1.pgrst205Errors = pgrst205Errors;
  report.phase1.passed = allTablesHealthy && (pgrst205Errors === 0);

  if (!report.phase1.passed) {
    log(`\n${COLORS.red}${COLORS.bold}✖ Live verification failed: Cloud database has ${pgrst205Errors} unprovisioned tables (PGRST205 / schema cache errors).${COLORS.reset}`);
    log(`${COLORS.dim}Milestone M1 schema migration must be applied to Supabase project (${credentials.url}).${COLORS.reset}\n`);

    if (opts.json) {
      console.log(JSON.stringify(report, null, 2));
    }
    process.exit(1);
  }

  // ============================================================================
  // PHASE 2: PROGRAMMATIC FULL CRUD CYCLE (REQUIREMENT R3)
  // ============================================================================
  log(`\n${COLORS.bold}▶ Phase 2: Programmatic Full CRUD Cycle (Requirement R3)${COLORS.reset}`);

  const baseUrl = credentials.url;
  const activeKey = credentials.key;
  const testId = `test-crud-${Date.now()}`;
  report.phase2.testId = testId;

  const testRecord = {
    id: testId,
    slug: testId,
    title: `Verifikace Supabase Integrace R3 (${testId})`,
    author: "Automatický test R3",
    date: new Date().toISOString().slice(0, 10),
    excerpt: "Testovací perex pro ověření kompletního CRUD cyklu.",
    body: ["Testovací odstavec 1.", "Testovací odstavec 2."],
    image_url: "assets/aktuality/2240.jpg"
  };

  let cleanupNeeded = false;
  let phase2Passed = false;

  try {
    // Step 2.1: CREATE (POST)
    const createStart = Date.now();
    const createRes = await fetch(`${baseUrl}/rest/v1/news`, {
      method: "POST",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(testRecord)
    });

    cleanupNeeded = true;

    if (createRes.status !== 201 && createRes.status !== 200) {
      const errText = await createRes.text();
      throw new Error(`Step 2.1 CREATE failed with HTTP ${createRes.status}: ${errText}`);
    }

    const createdData = await createRes.json();
    const createdItem = Array.isArray(createdData) ? createdData[0] : createdData;
    if (!createdItem || createdItem.id !== testId) {
      throw new Error(`Step 2.1 CREATE returned mismatched record ID: expected '${testId}', got '${createdItem ? createdItem.id : null}'`);
    }

    report.phase2.steps.push({ step: "CREATE (POST)", status: createRes.status, ok: true, durationMs: Date.now() - createStart });
    log(`  ${COLORS.green}✔ Step 2.1 CREATE (POST)${COLORS.reset} inserted record id='${testId}' (HTTP ${createRes.status})`);

    // Step 2.2: READ (GET)
    const readStart = Date.now();
    const readRes = await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}&select=*`, {
      method: "GET",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Accept": "application/json"
      }
    });

    if (readRes.status !== 200) {
      throw new Error(`Step 2.2 READ failed with HTTP ${readRes.status}`);
    }

    const readData = await readRes.json();
    if (!Array.isArray(readData) || readData.length !== 1) {
      throw new Error(`Step 2.2 READ expected exactly 1 item, received ${readData ? readData.length : 0}`);
    }

    const fetchedItem = readData[0];
    if (fetchedItem.id !== testId || fetchedItem.title !== testRecord.title || fetchedItem.excerpt !== testRecord.excerpt) {
      throw new Error(`Step 2.2 READ field validation failed: title='${fetchedItem.title}', excerpt='${fetchedItem.excerpt}'`);
    }

    report.phase2.steps.push({ step: "READ (GET)", status: readRes.status, ok: true, durationMs: Date.now() - readStart });
    log(`  ${COLORS.green}✔ Step 2.2 READ (GET)${COLORS.reset} asserted field fidelity for '${testId}' (HTTP 200)`);

    // Step 2.3: UPDATE (PATCH)
    const updateStart = Date.now();
    const updatedTitle = `Verifikace Supabase Integrace R3 - AKTUALIZOVÁNO (${testId})`;
    const updateRes = await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}`, {
      method: "PATCH",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ title: updatedTitle })
    });

    if (updateRes.status !== 200 && updateRes.status !== 204) {
      throw new Error(`Step 2.3 UPDATE failed with HTTP ${updateRes.status}`);
    }

    const verifyUpdateRes = await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}&select=*`, {
      method: "GET",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Accept": "application/json"
      }
    });
    const updatedData = await verifyUpdateRes.json();
    if (!Array.isArray(updatedData) || updatedData.length !== 1 || updatedData[0].title !== updatedTitle) {
      throw new Error(`Step 2.3 UPDATE assertion failed: title was not updated to '${updatedTitle}'`);
    }

    report.phase2.steps.push({ step: "UPDATE (PATCH)", status: updateRes.status, ok: true, durationMs: Date.now() - updateStart });
    log(`  ${COLORS.green}✔ Step 2.3 UPDATE (PATCH)${COLORS.reset} title updated & verified (HTTP ${updateRes.status})`);

    // Step 2.4: DELETE (DELETE)
    const deleteStart = Date.now();
    const deleteRes = await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}`, {
      method: "DELETE",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Prefer": "return=representation"
      }
    });

    if (deleteRes.status !== 200 && deleteRes.status !== 204) {
      throw new Error(`Step 2.4 DELETE failed with HTTP ${deleteRes.status}`);
    }

    report.phase2.steps.push({ step: "DELETE (DELETE)", status: deleteRes.status, ok: true, durationMs: Date.now() - deleteStart });
    log(`  ${COLORS.green}✔ Step 2.4 DELETE (DELETE)${COLORS.reset} deletion request issued (HTTP ${deleteRes.status})`);

    // Step 2.5: VERIFY CLEANUP (GET)
    const verifyCleanStart = Date.now();
    const verifyCleanRes = await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}&select=*`, {
      method: "GET",
      headers: {
        "apikey": activeKey,
        "Authorization": `Bearer ${activeKey}`,
        "Accept": "application/json"
      }
    });

    if (verifyCleanRes.status !== 200) {
      throw new Error(`Step 2.5 VERIFY CLEANUP failed with HTTP ${verifyCleanRes.status}`);
    }

    const cleanData = await verifyCleanRes.json();
    if (!Array.isArray(cleanData) || cleanData.length !== 0) {
      throw new Error(`Step 2.5 VERIFY CLEANUP failed: test record '${testId}' still present in database (count: ${cleanData.length})`);
    }

    cleanupNeeded = false;
    report.phase2.steps.push({ step: "VERIFY CLEANUP", status: 200, ok: true, durationMs: Date.now() - verifyCleanStart });
    log(`  ${COLORS.green}✔ Step 2.5 VERIFY CLEANUP${COLORS.reset} confirmed record completely removed (empty array [])`);

    phase2Passed = true;
    report.phase2.passed = true;
  } finally {
    if (cleanupNeeded) {
      log(`  ${COLORS.yellow}ℹ Running cleanup handler for record '${testId}'...${COLORS.reset}`);
      try {
        await fetch(`${baseUrl}/rest/v1/news?id=eq.${testId}`, {
          method: "DELETE",
          headers: {
            "apikey": activeKey,
            "Authorization": `Bearer ${activeKey}`
          }
        });
      } catch (_) {}
    }
  }

  // ============================================================================
  // SUMMARY
  // ============================================================================
  report.success = report.phase1.passed && report.phase2.passed;

  log(`\n${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}`);
  if (report.success) {
    log(`${COLORS.bold}${COLORS.green}✔ VERIFICATION COMPLETED SUCCESSFULLY (EXIT CODE 0)${COLORS.reset}`);
    log(`  Phase 1 Endpoint Health: PASS (${TABLES.length} tables probed)`);
    log(`  Phase 2 CRUD Lifecycle:  PASS (Insert -> Read -> Update -> Delete -> Verified Clean)`);
    log(`${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}\n`);
  } else {
    log(`${COLORS.bold}${COLORS.red}✖ VERIFICATION FAILED (EXIT CODE 1)${COLORS.reset}`);
    log(`${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}\n`);
  }

  if (opts.json) {
    console.log(JSON.stringify(report, null, 2));
  }

  process.exit(report.success ? 0 : 1);
}

run().catch(err => {
  console.error(`${COLORS.red}${COLORS.bold}Fatal verification error:${COLORS.reset}`, err);
  process.exit(1);
});
