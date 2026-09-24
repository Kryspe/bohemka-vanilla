<?php
require_once __DIR__ . '/db.php';

// Ping check
if (isset($_GET['ping'])) {
    echo json_encode(['status' => 'ok']);
    exit;
}

$pdo = getDb();
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM admin_items WHERE kind = 'zavod' AND status = 'approved'");
    $events = [];
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
            'note' => $fields['poznamka'] ?? ''
        ];
    }
    echo json_encode($events);
} else {
    echo json_encode(readJsonFile('events.json', []));
}
