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

    $eventId = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)$input['eventId']);
    if (empty($eventId)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid eventId format']);
        exit;
    }

    $disciplinesArr = [];
    if (is_array($input['disciplines'] ?? null)) {
        foreach ($input['disciplines'] as $d) {
            if (is_string($d)) {
                $cleanD = htmlspecialchars(strip_tags(trim($d)), ENT_QUOTES, 'UTF-8');
                if ($cleanD !== '') $disciplinesArr[] = mb_substr($cleanD, 0, 50, 'UTF-8');
            }
        }
    }
    $disciplines = json_encode($disciplinesArr, JSON_UNESCAPED_UNICODE);
    $note = htmlspecialchars(strip_tags(trim((string)($input['note'] ?? ''))), ENT_QUOTES, 'UTF-8');
    $note = mb_substr($note, 0, 200, 'UTF-8');
    $at = date('c');

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO signups (event_id, disciplines, note, created_at) VALUES (?, ?, ?, ?)");
        $stmt->execute([$eventId, $disciplines, $note, $at]);
    } else {
        $signups = readJsonFile('signups.json', []);
        $signups[$eventId] = [
            'eventId' => $eventId,
            'disciplines' => $disciplinesArr,
            'note' => $note,
            'at' => $at
        ];
        writeJsonFile('signups.json', $signups);
    }
    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    $eventId = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($_GET['id'] ?? ''));
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
