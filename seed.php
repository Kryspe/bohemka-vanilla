<?php
/**
 * Klokani — CLI Database Seeder
 * Usage: php seed.php [--fresh]
 */

require_once __DIR__ . '/includes/db.php';

$isFresh = in_array('--fresh', $argv ?? []);

if ($isFresh) {
    echo "Resetting database...\n";
    $dbFile = DB_FILE;
    if (file_exists($dbFile)) {
        unlink($dbFile);
    }
    if (file_exists($dbFile . '-wal')) {
        @unlink($dbFile . '-wal');
    }
    if (file_exists($dbFile . '-shm')) {
        @unlink($dbFile . '-shm');
    }
}

$pdo = getDb();
echo "Database initialized at: " . DB_FILE . "\n";
echo "Users: " . $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn() . "\n";
echo "News: " . $pdo->query('SELECT COUNT(*) FROM news')->fetchColumn() . "\n";
echo "Events: " . $pdo->query('SELECT COUNT(*) FROM events')->fetchColumn() . "\n";
echo "Entries: " . $pdo->query('SELECT COUNT(*) FROM event_entries')->fetchColumn() . "\n";
echo "Parent Messages: " . $pdo->query('SELECT COUNT(*) FROM parent_messages')->fetchColumn() . "\n";
echo "Trainers: " . $pdo->query('SELECT COUNT(*) FROM trainers')->fetchColumn() . "\n";
echo "Yearbooks: " . $pdo->query('SELECT COUNT(*) FROM yearbooks')->fetchColumn() . "\n";
echo "Records: " . $pdo->query('SELECT COUNT(*) FROM records')->fetchColumn() . "\n";
echo "Downloads: " . $pdo->query('SELECT COUNT(*) FROM downloads')->fetchColumn() . "\n";
echo "Seeding completed successfully!\n";
