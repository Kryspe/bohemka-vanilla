<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$pdo = getDb();

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM admin_items ORDER BY created_at DESC");
        $items = [];
        while ($row = $stmt->fetch()) {
            $items[] = [
                'id' => $row['id'],
                'kind' => $row['kind'],
                'status' => $row['status'],
                'source' => $row['source'],
                'title' => $row['title'],
                'fields' => json_decode($row['fields_json'], true) ?: [],
                'createdAt' => $row['created_at']
            ];
        }
        echo json_encode($items);
    } else {
        echo json_encode(readJsonFile('admin_items.json', []));
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    $id = $input['id'] ?? ('item-' . time());
    $kind = $input['kind'] ?? 'aktualita';
    $status = $input['status'] ?? 'pending';
    $source = $input['source'] ?? 'ruční vložení';
    $title = $input['title'] ?? 'Bez názvu';
    $fields = json_encode($input['fields'] ?? []);
    $createdAt = $input['createdAt'] ?? date('c');

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $kind, $status, $source, $title, $fields, $createdAt]);
    } else {
        $items = readJsonFile('admin_items.json', []);
        $items[] = [
            'id' => $id, 'kind' => $kind, 'status' => $status,
            'source' => $source, 'title' => $title, 'fields' => $input['fields'] ?? [], 'createdAt' => $createdAt
        ];
        writeJsonFile('admin_items.json', $items);
    }
    echo json_encode(['success' => true, 'id' => $id]);
    exit;
}
