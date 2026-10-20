#!/usr/bin/env node
/**
 * TJ Bohemians Praha — Pure Node.js E2E Test Runner
 * Zero npm dependencies, fully compliant with Vanilla Web architecture.
 * 
 * Supports:
 * - Tier 1: Feature Coverage (F1 to F12)
 * - Tier 2: Boundary & Corner Cases
 * - Tier 3: Cross-Feature Combinations
 * - Tier 4: Real-World Application Scenarios
 */

import path from "node:path";
import process from "node:process";
import { createSandbox, WORKSPACE_ROOT } from "./harness.js";

// ANSI colors
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m"
};

class TestRegistry {
  constructor() {
    this.suites = [];
    this.currentSuite = null;
  }

  describe(name, fn) {
    const suite = {
      name,
      tests: [],
      tier: this.detectTier(name)
    };
    this.suites.push(suite);
    const prevSuite = this.currentSuite;
    this.currentSuite = suite;
    fn();
    this.currentSuite = prevSuite;
  }

  test(name, fn) {
    if (!this.currentSuite) {
      this.describe("Default Suite", () => {
        this.test(name, fn);
      });
      return;
    }
    this.currentSuite.tests.push({
      name,
      fn,
      tier: this.currentSuite.tier
    });
  }

  detectTier(suiteName) {
    const match = suiteName.match(/Tier\s*([1-4])/i);
    return match ? parseInt(match[1], 10) : 1;
  }
}

export const registry = new TestRegistry();
export const describe = registry.describe.bind(registry);
export const test = registry.test.bind(registry);

// Parse CLI flags
function parseArgs(argv) {
  const options = {
    tiers: null,
    filter: null,
    verbose: false,
    bail: false,
    json: false,
    live: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--tier=")) {
      const val = arg.slice(7).trim();
      if (val === "all") {
        options.tiers = [1, 2, 3, 4];
      } else {
        options.tiers = val.split(",").map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
      }
    } else if (arg.startsWith("--filter=")) {
      options.filter = arg.slice(9).trim();
    } else if (arg === "--verbose" || arg === "-v") {
      options.verbose = true;
    } else if (arg === "--bail" || arg === "-b") {
      options.bail = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--live") {
      options.live = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`
${colors.bold}TJ Bohemians Praha — E2E Test Runner${colors.reset}

Usage:
  node scripts/e2e/runner.js [options]
  ./scripts/e2e/run_tests.sh [options]

Options:
  --tier=1,2,3,4    Run specific tier(s) (default: all)
  --filter=<text>   Filter test titles by substring or regex
  --verbose, -v     Verbose output with step logging
  --bail, -b        Stop execution on first failed test
  --json            Output machine-readable JSON report
  --live            Probe live Supabase cloud endpoints directly
  --help, -h        Show this help message
`);
      process.exit(0);
    }
  }

  if (!options.tiers || options.tiers.length === 0) {
    options.tiers = [1, 2, 3, 4];
  }

  return options;
}

class SkipTestError extends Error {
  constructor(reason) {
    super(reason);
    this.name = "SkipTestError";
    this.isSkip = true;
  }
}

async function loadTestFiles() {
  await import("./tier1_features.test.js");
  await import("./tier2_boundary.test.js");
  await import("./tier3_combinations.test.js");
  try {
    await import("./tier4_realworld.test.js");
  } catch (_) {
    await import("./tier4_scenarios.test.js");
  }
}

export async function run() {
  const options = parseArgs(process.argv);

  if (!options.json) {
    console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}${colors.green}  🏊 TJ BOHEMIANS PRAHA — E2E TEST SUITE RUNNER (TIERS 1-4)${colors.reset}`);
    console.log(`${colors.dim}  Node: ${process.version} | Pure Vanilla JS | Zero Dependencies${colors.reset}`);
    console.log(`${colors.dim}  Active Tiers: ${options.tiers.join(", ")} | Live Cloud: ${options.live ? "ENABLED" : "DISABLED (Mock/Contract)"}${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════${colors.reset}\n`);
  }

  await loadTestFiles();

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    durationMs: 0,
    tierStats: {
      1: { name: "Tier 1: Feature Coverage (F1-F12)", total: 0, passed: 0, failed: 0, skipped: 0 },
      2: { name: "Tier 2: Boundary & Corner Cases", total: 0, passed: 0, failed: 0, skipped: 0 },
      3: { name: "Tier 3: Cross-Feature Combinations", total: 0, passed: 0, failed: 0, skipped: 0 },
      4: { name: "Tier 4: Real-World Scenarios", total: 0, passed: 0, failed: 0, skipped: 0 }
    },
    tests: []
  };

  const startTime = Date.now();

  for (const suite of registry.suites) {
    if (!options.tiers.includes(suite.tier)) {
      continue;
    }

    if (!options.json) {
      console.log(`${colors.bold}${colors.blue}▶ [Tier ${suite.tier}] ${suite.name}${colors.reset}`);
    }

    for (const testCase of suite.tests) {
      if (options.filter && !testCase.name.toLowerCase().includes(options.filter.toLowerCase())) {
        continue;
      }

      results.total++;
      results.tierStats[suite.tier].total++;

      const testCtx = {
        name: testCase.name,
        tier: suite.tier,
        isLive: options.live,
        verbose: options.verbose,
        createSandbox: (opts = {}) => createSandbox({ ...opts, live: options.live, verbose: options.verbose }),
        skip: (reason = "Skipped") => {
          throw new SkipTestError(reason);
        },
        log: (...args) => {
          if (options.verbose && !options.json) {
            console.log(`    ${colors.gray}›${colors.reset}`, ...args);
          }
        }
      };

      const testStart = Date.now();
      try {
        await testCase.fn(testCtx);
        const duration = Date.now() - testStart;
        results.passed++;
        results.tierStats[suite.tier].passed++;

        results.tests.push({
          name: testCase.name,
          tier: suite.tier,
          status: "PASSED",
          durationMs: duration
        });

        if (!options.json) {
          console.log(`  ${colors.green}✔ PASS${colors.reset} ${testCase.name} ${colors.gray}(${duration}ms)${colors.reset}`);
        }
      } catch (err) {
        const duration = Date.now() - testStart;
        if (err.isSkip || err.name === "SkipTestError") {
          results.skipped++;
          results.tierStats[suite.tier].skipped++;

          results.tests.push({
            name: testCase.name,
            tier: suite.tier,
            status: "SKIPPED",
            reason: err.message,
            durationMs: duration
          });

          if (!options.json) {
            console.log(`  ${colors.yellow}↷ SKIP${colors.reset} ${testCase.name} ${colors.gray}(${err.message})${colors.reset}`);
          }
        } else {
          results.failed++;
          results.tierStats[suite.tier].failed++;

          results.tests.push({
            name: testCase.name,
            tier: suite.tier,
            status: "FAILED",
            error: err.message,
            stack: err.stack,
            durationMs: duration
          });

          if (!options.json) {
            console.log(`  ${colors.red}✖ FAIL${colors.reset} ${testCase.name} ${colors.gray}(${duration}ms)${colors.reset}`);
            console.log(`    ${colors.red}${err.message}${colors.reset}`);
            if (options.verbose && err.stack) {
              const stackLines = err.stack.split("\n").slice(1, 4).join("\n    ");
              console.log(`    ${colors.gray}${stackLines}${colors.reset}`);
            }
          }

          if (options.bail) {
            if (!options.json) {
              console.log(`\n${colors.yellow}Execution halted due to --bail flag.${colors.reset}`);
            }
            break;
          }
        }
      }
    }

    if (!options.json) console.log("");
    if (options.bail && results.failed > 0) break;
  }

  results.durationMs = Date.now() - startTime;

  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    // Print Summary Table
    console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────${colors.reset}`);
    console.log(`${colors.bold}SUMMARY BY TEST TIER:${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────${colors.reset}`);

    for (let t = 1; t <= 4; t++) {
      if (!options.tiers.includes(t)) continue;
      const s = results.tierStats[t];
      const pCol = s.passed > 0 ? colors.green : colors.gray;
      const fCol = s.failed > 0 ? colors.red : colors.gray;
      const skipStr = s.skipped > 0 ? `${colors.yellow}${s.skipped} skipped${colors.reset}, ` : "";
      console.log(
        `  Tier ${t} (${s.name}): ` +
        `${pCol}${s.passed} passed${colors.reset}, ` +
        skipStr +
        `${fCol}${s.failed} failed${colors.reset}, ` +
        `${colors.gray}${s.total} total${colors.reset}`
      );
    }

    console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────${colors.reset}`);
    const finalColor = results.failed === 0 ? colors.green : colors.red;
    console.log(
      `${colors.bold}OVERALL RESULT: ${finalColor}${results.passed}/${results.total} PASSED ` +
      `(${results.failed} failed, ${results.skipped} skipped) in ${results.durationMs}ms${colors.reset}\n`
    );
  }

  // Clear exit code: 0 = pass, 1 = fail
  process.exit(results.failed === 0 ? 0 : 1);
}

// Auto-run if executed as script
if (process.argv[1] && process.argv[1].endsWith("runner.js")) {
  run().catch(err => {
    console.error("Runner Fatal Error:", err);
    process.exit(1);
  });
}
