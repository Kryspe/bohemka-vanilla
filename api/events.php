<?php
/**
 * TJ Bohemians Praha — Events REST Endpoint
 * Handles GET, POST, PUT, DELETE for calendar and competition events.
 * Syncs between local SQLite and Supabase Cloud.
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = strtoupper($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']);
}

// Ping check
if (isset($_GET['ping'])) {
    echo json_encode(['status' => 'ok']);
    exit;
}

$pdo = getDb();

if ($method === 'GET') {
    $events = [];
    if ($pdo) {
        try {
            // Check approved admin items
            $stmt = $pdo->query("SELECT * FROM admin_items WHERE kind = 'zavod' AND status = 'approved'");
            while ($row = $stmt->fetch()) {
                $fields = json_decode($row['fields_json'], true) ?: [];
                $events[] = [
                    'id' => $row['id'],
                    'name' => $row['title'],
                    'place' => $fields['misto'] ?? '',
                    'date' => $fields['datum'] ?? '',
                    'deadline' => $fields['deadline'] ?? '',
                    'type' => $fields['typ'] ?? 'Oddílový',
                    'kind' => ($fields['druh'] ?? '') === 'soustredeni' ? 'soustredeni' : 'zavod',
                    'note' => $fields['poznamka'] ?? '',
                    'file' => $fields['soubor'] ?? 'assets/downloads/Harmonogram_treninku_podzim_2026.pdf'
                ];
            }
        } catch (Exception $e) {}

        if (empty($events)) {
            try {
                $stmtEv = $pdo->query("SELECT id, name, place, date, deadline, status, disciplines_json FROM events ORDER BY date ASC");
                while ($row = $stmtEv->fetch()) {
                    $events[] = [
                        'id' => $row['id'],
                        'name' => $row['name'],
                        'place' => $row['place'] ?? '',
                        'date' => $row['date'] ?? '',
                        'deadline' => $row['deadline'] ?? '',
                        'type' => 'Oddílový',
                        'kind' => 'zavod',
                        'note' => '',
                        'file' => 'assets/downloads/Harmonogram_treninku_podzim_2026.pdf'
                    ];
                }
            } catch (Exception $e) {}
        }
    }
    if (empty($events)) {
        $events = readJsonFile('events.json', []);
    }
    echo json_encode($events);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['name'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Název závodu je povinný']);
        exit;
    }

    $rawId = (string)($input['id'] ?? ('event-' . time()));
    $id = preg_replace('/[^a-zA-Z0-9_\-]/', '', $rawId);
    if (empty($id)) $id = 'event-' . time();

    $name = htmlspecialchars(strip_tags(trim((string)$input['name'])), ENT_QUOTES, 'UTF-8');
    $place = htmlspecialchars(strip_tags(trim((string)($input['place'] ?? ''))), ENT_QUOTES, 'UTF-8');
    $date = preg_replace('/[^0-9\-.]/', '', (string)($input['date'] ?? date('Y-m-d')));
    $deadline = preg_replace('/[^0-9\-.]/', '', (string)($input['deadline'] ?? ''));
    $status = in_array($input['status'] ?? '', ['open', 'closed', 'upcoming', 'completed']) ? $input['status'] : 'open';
    $disciplinesJson = is_array($input['disciplines'] ?? null) ? json_encode($input['disciplines'], JSON_UNESCAPED_UNICODE) : '[]';

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT OR REPLACE INTO events (id, name, place, date, deadline, status, disciplines_json) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $name, $place, $date, $deadline, $status, $disciplinesJson]);

            // Also mirror to admin_items
            $fields = [
                'misto' => $place,
                'datum' => $date,
                'deadline' => $deadline,
                'typ' => $input['type'] ?? 'Oddílový',
                'druh' => ($input['kind'] ?? '') === 'soustredeni' ? 'soustredeni' : 'zavod',
                'poznamka' => $input['note'] ?? ''
            ];
            $stmtAdm = $pdo->prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'zavod', 'approved', 'intranet', ?, ?)");
            $stmtAdm->execute([$id, $name, json_encode($fields, JSON_UNESCAPED_UNICODE)]);
        } catch (Exception $e) {}
    }

    // Sync to Supabase Cloud
    syncToSupabase('events', [
        'id' => $id,
        'name' => $name,
        'place' => $place,
        'date' => $date,
        'deadline' => $deadline,
        'status' => $status
    ]);

    echo json_encode(['success' => true, 'id' => $id]);
    exit;
}

if ($method === 'DELETE') {
    $id = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($_GET['id'] ?? ''));
    if ($id && $pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
            $stmt->execute([$id]);
            $stmt2 = $pdo->prepare("DELETE FROM admin_items WHERE id = ?");
            $stmt2->execute([$id]);
        } catch (Exception $e) {}
        // Sync to Supabase Cloud
        syncToSupabase('events', null, 'DELETE', 'id=eq.' . urlencode($id));
    }
    echo json_encode(['success' => true]);
    exit;
}
