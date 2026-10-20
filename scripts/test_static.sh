#!/usr/bin/env bash
# ==============================================================================
# TJ Bohemians Praha — Static Code Health & Syntax Validator (F12)
# ==============================================================================
# Validates:
# 1. Syntax of all JavaScript & CommonJS files via `node -c`
# 2. HTML syntax, script/style tag balance, and inline <script> JavaScript syntax
# 3. CSS brace balance across all stylesheets
#
# Zero external npm dependencies.
# Exit code: 0 on clean code, non-zero on any error.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

export NODE_NO_WARNINGS=1

node - "$@" << 'EOF'
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const process = require("node:process");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname || process.cwd());

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

const args = process.argv.slice(2);
const isQuiet = args.includes("--quiet") || args.includes("-q");
const isHelp = args.includes("--help") || args.includes("-h");

if (isHelp) {
  console.log(`
${COLORS.bold}TJ Bohemians Praha — Static Code Health Validator (F12)${COLORS.reset}

Usage:
  bash scripts/test_static.sh [options]

Options:
  --quiet, -q    Minimal console output
  --help, -h     Show this help message
`);
  process.exit(0);
}

function log(msg) {
  if (!isQuiet) console.log(msg);
}

function walk(dir, exts) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (item.startsWith(".") || item === "node_modules" || item === "dist") continue;
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(walk(full, exts));
      } else if (exts.some(ext => item.endsWith(ext))) {
        results.push(full);
      }
    }
  } catch (_) {}
  return results.sort();
}

log(`\n${COLORS.bold}${COLORS.cyan}══════════════════════════════════════════════════════════════════${COLORS.reset}`);
log(`${COLORS.bold}${COLORS.green}  🏊 TJ BOHEMIANS PRAHA — STATIC CODE HEALTH VALIDATOR (F12)${COLORS.reset}`);
log(`${COLORS.dim}  Node: ${process.version} | Pure Vanilla JS | Zero Dependencies${COLORS.reset}`);
log(`${COLORS.dim}  Workspace: ${root}${COLORS.reset}`);
log(`${COLORS.bold}${COLORS.cyan}══════════════════════════════════════════════════════════════════${COLORS.reset}\n`);

let totalErrors = 0;

// ============================================================================
// 1. JAVASCRIPT & COMMONJS SYNTAX CHECK (node -c)
// ============================================================================
log(`${COLORS.bold}▶ 1. JavaScript & CommonJS Syntax Check (node -c)${COLORS.reset}`);
const jsFiles = walk(root, [".js", ".cjs"]);
let jsPassed = 0;

for (const fullPath of jsFiles) {
  const rel = path.relative(root, fullPath);
  try {
    execFileSync(process.execPath, ["-c", fullPath], { stdio: "pipe" });
    jsPassed++;
    log(`  ${COLORS.green}✔ PASS${COLORS.reset} ${rel}`);
  } catch (err) {
    totalErrors++;
    console.error(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${rel}: ${err.message}`);
    if (err.stderr) {
      console.error(`    ${COLORS.gray}${err.stderr.toString().trim()}${COLORS.reset}`);
    }
  }
}

// ============================================================================
// 2. HTML SYNTAX & INLINE SCRIPTS CHECK
// ============================================================================
log(`\n${COLORS.bold}▶ 2. HTML Document & Inline Scripts Validation${COLORS.reset}`);
const htmlFiles = walk(root, [".html"]);
let htmlPassed = 0;
let inlineScriptsChecked = 0;

for (const fullPath of htmlFiles) {
  const rel = path.relative(root, fullPath);
  let fileHasError = false;
  const content = fs.readFileSync(fullPath, "utf-8");

  // Check script tag balance
  const openScripts = (content.match(/<script\b/gi) || []).length;
  const closeScripts = (content.match(/<\/script>/gi) || []).length;
  if (openScripts !== closeScripts) {
    totalErrors++;
    fileHasError = true;
    console.error(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${rel}: unbalanced <script> tags (${openScripts} open vs ${closeScripts} close)`);
  }

  // Check style tag balance
  const openStyles = (content.match(/<style\b/gi) || []).length;
  const closeStyles = (content.match(/<\/style>/gi) || []).length;
  if (openStyles !== closeStyles) {
    totalErrors++;
    fileHasError = true;
    console.error(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${rel}: unbalanced <style> tags (${openStyles} open vs ${closeStyles} close)`);
  }

  // Extract inline scripts
  const scriptRegex = /<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let inlineCount = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    inlineCount++;
    inlineScriptsChecked++;
    const code = match[1].trim();
    if (code) {
      try {
        new vm.Script(code, { filename: `${rel}#inline-${inlineCount}` });
      } catch (err) {
        totalErrors++;
        fileHasError = true;
        console.error(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${rel} (inline script #${inlineCount}): ${err.message}`);
      }
    }
  }

  if (!fileHasError) {
    htmlPassed++;
    log(`  ${COLORS.green}✔ PASS${COLORS.reset} ${rel} ${COLORS.dim}(${inlineCount} inline scripts verified)${COLORS.reset}`);
  }
}

// ============================================================================
// 3. CSS BRACE BALANCE CHECK
// ============================================================================
log(`\n${COLORS.bold}▶ 3. CSS Brace Balance Validation${COLORS.reset}`);
const cssFiles = walk(root, [".css"]);
let cssPassed = 0;

for (const fullPath of cssFiles) {
  const rel = path.relative(root, fullPath);
  const css = fs.readFileSync(fullPath, "utf-8");
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;

  if (openBraces !== closeBraces) {
    totalErrors++;
    console.error(`  ${COLORS.red}✖ FAIL${COLORS.reset} ${rel}: braces unbalanced (${openBraces} open vs ${closeBraces} close)`);
  } else {
    cssPassed++;
    log(`  ${COLORS.green}✔ PASS${COLORS.reset} ${rel} ${COLORS.dim}(${openBraces} open / ${closeBraces} close braces)${COLORS.reset}`);
  }
}

// ============================================================================
// SUMMARY & EXIT
// ============================================================================
log(`\n${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}`);
if (totalErrors === 0) {
  log(`${COLORS.bold}${COLORS.green}✔ ALL STATIC CHECKS PASSED (EXIT CODE 0)${COLORS.reset}`);
  log(`  JavaScript/CJS:  ${jsPassed} files checked (100% syntax valid)`);
  log(`  HTML Documents:  ${htmlPassed} files checked (${inlineScriptsChecked} inline scripts verified)`);
  log(`  CSS Stylesheets: ${cssPassed} stylesheets checked (100% brace balanced)`);
  log(`${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}\n`);
  process.exit(0);
} else {
  console.error(`${COLORS.bold}${COLORS.red}✖ STATIC CHECK FAILED (${totalErrors} errors found, EXIT CODE 1)${COLORS.reset}`);
  console.error(`${COLORS.bold}${COLORS.cyan}──────────────────────────────────────────────────────────────────${COLORS.reset}\n`);
  process.exit(1);
}
EOF
