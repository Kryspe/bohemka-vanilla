<?php
/**
 * TJ Bohemians Praha — Event Entries REST Endpoint
 * Handles signups / entries for races and competitions.
 * Syncs between SQLite and Supabase.
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = strtoupper($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']);
}

$pdo = getDb();

if ($method === 'GET') {
    $eventId = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($_GET['event_id'] ?? ''));
    $entries = [];

    if ($pdo) {
        try {
            if ($eventId) {
                $stmt = $pdo->prepare("SELECT id, event_id, user_id, swimmer_name, disciplines_json, note, created_at FROM event_entries WHERE event_id = ? ORDER BY id DESC");
                $stmt->execute([$eventId]);
            } else {
                $stmt = $pdo->query("SELECT id, event_id, user_id, swimmer_name, disciplines_json, note, created_at FROM event_entries ORDER BY id DESC");
            }

            while ($row = $stmt->fetch()) {
                $disciplines = json_decode($row['disciplines_json'] ?? '[]', true) ?: [];
                $entries[] = [
                    'id' => (int)$row['id'],
                    'eventId' => $row['event_id'],
                    'userId' => (int)($row['user_id'] ?? 0),
                    'swimmerName' => $row['swimmer_name'],
                    'disciplines' => $disciplines,
                    'note' => $row['note'] ?? '',
                    'status' => 'Přihlášen',
                    'createdAt' => $row['created_at']
                ];
            }
        } catch (Exception $e) {}
    }

    echo json_encode($entries);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['event_id']) && empty($input['eventId'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Event ID is required']);
        exit;
    }

    $eventId = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($input['event_id'] ?? $input['eventId']));
    $userId = (int)($input['user_id'] ?? $input['userId'] ?? 1);
    $swimmerName = htmlspecialchars(strip_tags(trim((string)($input['swimmer_name'] ?? $input['swimmerName'] ?? 'Kryštof Spejchal'))), ENT_QUOTES, 'UTF-8');
    $note = htmlspecialchars(strip_tags(trim((string)($input['note'] ?? ''))), ENT_QUOTES, 'UTF-8');

    $disciplines = $input['disciplines'] ?? [];
    if (is_string($disciplines)) {
        $disciplines = [$disciplines];
    }
    $disciplinesJson = json_encode(array_values($disciplines), JSON_UNESCAPED_UNICODE);

    $newId = null;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO event_entries (event_id, user_id, swimmer_name, disciplines_json, note) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$eventId, $userId, $swimmerName, $disciplinesJson, $note]);
            $newId = (int)$pdo->lastInsertId();

            // Also mirror to signups table
            $stmtSig = $pdo->prepare("INSERT OR REPLACE INTO signups (event_id, disciplines, note, created_at) VALUES (?, ?, ?, ?)");
            $stmtSig->execute([$eventId, $disciplinesJson, $note, date('Y-m-d H:i:s')]);
        } catch (Exception $e) {}
    }

    // Sync to Supabase Cloud
    syncToSupabase('event_entries', [
        'event_id' => $eventId,
        'user_id' => $userId,
        'swimmer_name' => $swimmerName,
        'disciplines_json' => $disciplinesJson,
        'note' => $note
    ]);

    echo json_encode(['success' => true, 'id' => $newId ?? time()]);
    exit;
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    $eventId = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($_GET['event_id'] ?? ''));

    if ($pdo) {
        try {
            if ($id > 0) {
                $stmt = $pdo->prepare("DELETE FROM event_entries WHERE id = ?");
                $stmt->execute([$id]);
                syncToSupabase('event_entries', null, 'DELETE', 'id=eq.' . $id);
            } elseif ($eventId) {
                $stmt = $pdo->prepare("DELETE FROM event_entries WHERE event_id = ?");
                $stmt->execute([$eventId]);
                $stmt2 = $pdo->prepare("DELETE FROM signups WHERE event_id = ?");
                $stmt2->execute([$eventId]);
                syncToSupabase('event_entries', null, 'DELETE', 'event_id=eq.' . urlencode($eventId));
            }
        } catch (Exception $e) {}
    }

    echo json_encode(['success' => true]);
    exit;
}
