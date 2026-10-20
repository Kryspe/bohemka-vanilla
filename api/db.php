<?php
/**
 * TJ Bohemians Praha — SQLite / JSON Database Engine
 * Zero configuration required, automatically initializes database schema!
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header("Content-Security-Policy: default-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';");

$dbDir = __DIR__ . '/../data';
if (!is_dir($dbDir)) {
    @mkdir($dbDir, 0755, true);
}
// Protect database files from direct web access
if (!file_exists($dbDir . '/.htaccess')) {
    @file_put_contents($dbDir . '/.htaccess', "Deny from all\n");
}
if (!file_exists($dbDir . '/index.html')) {
    @file_put_contents($dbDir . '/index.html', "");
}
$sqliteFile = $dbDir . '/boh.sqlite';

function getDb() {
    global $sqliteFile;
    try {
        if (class_exists('PDO') && in_array('sqlite', PDO::getAvailableDrivers())) {
            $pdo = new PDO('sqlite:' . $sqliteFile);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            // Create tables if not exist
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS signups (
                    event_id TEXT PRIMARY KEY,
                    disciplines TEXT,
                    note TEXT,
                    created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS admin_items (
                    id TEXT PRIMARY KEY,
                    kind TEXT,
                    status TEXT,
                    source TEXT,
                    title TEXT,
                    fields_json TEXT,
                    created_at TEXT
                );
                CREATE TABLE IF NOT EXISTS news (
                    id TEXT PRIMARY KEY,
                    title TEXT,
                    date TEXT,
                    author TEXT,
                    excerpt TEXT,
                    body_json TEXT
                );
                CREATE TABLE IF NOT EXISTS events (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    place TEXT,
                    date TEXT,
                    deadline TEXT,
                    type TEXT,
                    kind TEXT,
                    disciplines_json TEXT
                );
                CREATE TABLE IF NOT EXISTS downloads (
                    id TEXT PRIMARY KEY,
                    title TEXT,
                    category TEXT,
                    description TEXT,
                    file_name TEXT,
                    file_size TEXT,
                    updated_at TEXT
                );
                CREATE TABLE IF NOT EXISTS swimmers (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    birth_year INTEGER,
                    gender TEXT,
                    category TEXT,
                    role TEXT,
                    bio TEXT
                );
                CREATE TABLE IF NOT EXISTS records (
                    id TEXT PRIMARY KEY,
                    event TEXT,
                    time TEXT,
                    swimmer TEXT,
                    year TEXT,
                    category TEXT,
                    pool TEXT
                );
                CREATE TABLE IF NOT EXISTS notifications (
                    id TEXT PRIMARY KEY,
                    title TEXT,
                    subtitle TEXT,
                    type TEXT,
                    url TEXT,
                    created_at TEXT,
                    priority TEXT DEFAULT 'normal'
                );
            ");
            return $pdo;
        }
    } catch (Exception $e) {
        // Fall back to JSON file storage if PDO SQLite is unavailable
    }
    return null;
}

// Fallback JSON File Helpers (with strict whitelist)
const ALLOWED_JSON_FILES = ['signups.json', 'admin_items.json', 'notifications.json', 'events.json'];

function readJsonFile($filename, $default = []) {
    global $dbDir;
    $base = basename($filename);
    if (!in_array($base, ALLOWED_JSON_FILES, true)) return $default;
    $file = $dbDir . '/' . $base;
    if (!file_exists($file)) return $default;
    $raw = @file_get_contents($file);
    $data = @json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function writeJsonFile($filename, $data) {
    global $dbDir;
    $base = basename($filename);
    if (!in_array($base, ALLOWED_JSON_FILES, true)) return;
    $file = $dbDir . '/' . $base;
    @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
