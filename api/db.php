<?php
/**
 * Klokani — Unified API DB Connector
 */

require_once __DIR__ . '/../includes/db.php';

header('Content-Type: application/json; charset=utf-8');

// Fallback JSON File Helpers if needed
$dbDir = __DIR__ . '/../data';

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
