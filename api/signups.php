<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDb();

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM signups");
        $results = [];
        while ($row = $stmt->fetch()) {
            $results[$row['event_id']] = [
                'eventId' => $row['event_id'],
                'disciplines' => json_decode($row['disciplines'], true) ?: [],
                'note' => $row['note'],
                'at' => $row['created_at']
            ];
        }
        echo json_encode($results);
    } else {
        echo json_encode(readJsonFile('signups.json', []));
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['eventId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid eventId']);
        exit;
    }

    $eventId = $input['eventId'];
    $disciplines = json_encode($input['disciplines'] ?? []);
    $note = $input['note'] ?? '';
    $at = $input['at'] ?? date('c');

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO signups (event_id, disciplines, note, created_at) VALUES (?, ?, ?, ?)");
        $stmt->execute([$eventId, $disciplines, $note, $at]);
    } else {
        $signups = readJsonFile('signups.json', []);
        $signups[$eventId] = [
            'eventId' => $eventId,
            'disciplines' => $input['disciplines'] ?? [],
            'note' => $note,
            'at' => $at
        ];
        writeJsonFile('signups.json', $signups);
    }
    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    $eventId = $_GET['id'] ?? null;
    if ($eventId) {
        if ($pdo) {
            $stmt = $pdo->prepare("DELETE FROM signups WHERE event_id = ?");
            $stmt->execute([$eventId]);
        } else {
            $signups = readJsonFile('signups.json', []);
            unset($signups[$eventId]);
            writeJsonFile('signups.json', $signups);
        }
    }
    echo json_encode(['success' => true]);
    exit;
}
