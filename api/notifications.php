<?php
/**
 * TJ Bohemians Praha — Notifications API
 * Handles live broadcasting of notifications by coaches/superadmins
 * and fetching current notifications for members and parents.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

require_once __DIR__ . '/db.php';

$pdo = getDb();
if ($pdo) {
    $pdo->exec("
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
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) $input = $_POST;

    $title = htmlspecialchars(strip_tags(trim((string)($input['title'] ?? ''))), ENT_QUOTES, 'UTF-8');
    $subtitle = htmlspecialchars(strip_tags(trim((string)($input['subtitle'] ?? ''))), ENT_QUOTES, 'UTF-8');
    $title = mb_substr($title, 0, 120, 'UTF-8');
    $subtitle = mb_substr($subtitle, 0, 300, 'UTF-8');

    $allowedTypes = ['notice', 'event', 'payment', 'training', 'warning'];
    $type = in_array($input['type'] ?? '', $allowedTypes, true) ? $input['type'] : 'notice';

    $rawUrl = preg_replace('/[\x00-\x1F\x7F]/', '', trim((string)($input['url'] ?? 'index.html')));
    if ($rawUrl === '' || preg_match('/^(javascript|data|vbscript|file):/i', $rawUrl) || str_starts_with($rawUrl, '//')) {
        $url = 'index.html';
    } elseif (preg_match('/^[a-zA-Z0-9_\-\.\/]+(#.*)?$/', $rawUrl)) {
        $url = htmlspecialchars($rawUrl, ENT_QUOTES, 'UTF-8');
    } else {
        $url = 'index.html';
    }

    $allowedPrio = ['normal', 'high', 'urgent'];
    $priority = in_array($input['priority'] ?? '', $allowedPrio, true) ? $input['priority'] : 'normal';
    $id = 'notif_' . time() . '_' . rand(100, 999);
    $now = date('c');

    if ($title === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Název oznámení je povinný'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO notifications (id, title, subtitle, type, url, created_at, priority) VALUES (:id, :title, :sub, :type, :url, :created, :prio)");
        $stmt->execute([
            ':id' => $id,
            ':title' => $title,
            ':sub' => $subtitle,
            ':type' => $type,
            ':url' => $url,
            ':created' => $now,
            ':prio' => $priority
        ]);
    } else {
        $items = readJsonFile('notifications.json', []);
        array_unshift($items, [
            'id' => $id,
            'title' => $title,
            'subtitle' => $subtitle,
            'type' => $type,
            'url' => $url,
            'created_at' => $now,
            'priority' => $priority
        ]);
        writeJsonFile('notifications.json', $items);
    }

    echo json_encode([
        'success' => true,
        'id' => $id,
        'title' => $title,
        'subtitle' => $subtitle,
        'type' => $type,
        'url' => $url,
        'created_at' => $now
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// GET: Return latest notifications
$results = [];
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM notifications ORDER BY created_at DESC LIMIT 30");
        $results = $stmt->fetchAll();
    } catch (Exception $e) {}
}

if (empty($results)) {
    $results = readJsonFile('notifications.json', []);
}

echo json_encode([
    'count' => count($results),
    'notifications' => $results
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
