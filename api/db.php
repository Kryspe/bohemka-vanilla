<?php
/**
 * Klokani — SQLite / JSON Database Engine
 * Zero configuration required, automatically initializes database schema!
 */

header('Content-Type: application/json; charset=utf-8');

$dbDir = __DIR__ . '/../data';
if (!is_dir($dbDir)) {
    @mkdir($dbDir, 0777, true);
}
$sqliteFile = $dbDir . '/klokani.sqlite';

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
            ");
            return $pdo;
        }
    } catch (Exception $e) {
        // Fall back to JSON file storage if PDO SQLite is unavailable
    }
    return null;
}

// Fallback JSON File Helpers
function readJsonFile($filename, $default = []) {
    global $dbDir;
    $file = $dbDir . '/' . $filename;
    if (!file_exists($file)) return $default;
    $raw = @file_get_contents($file);
    $data = @json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function writeJsonFile($filename, $data) {
    global $dbDir;
    $file = $dbDir . '/' . $filename;
    @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
