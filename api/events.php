<?php
require_once __DIR__ . '/db.php';

// Ping check
if (isset($_GET['ping'])) {
    echo json_encode(['status' => 'ok']);
    exit;
}

$pdo = getDb();
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM events ORDER BY date ASC");
    $events = [];
    while ($row = $stmt->fetch()) {
        $events[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'place' => $row['place'] ?? '',
            'date' => $row['date'] ?? '',
            'deadline' => $row['deadline'] ?? '',
            'type' => 'Oddílový',
            'kind' => 'zavod',
            'status' => $row['status'] ?? 'open',
            'disciplines' => json_decode($row['disciplines_json'] ?? '[]', true) ?: []
        ];
    }
    echo json_encode($events, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(readJsonFile('events.json', []));
}

