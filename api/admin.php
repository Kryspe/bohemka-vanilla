<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
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

    $rawId = (string)($input['id'] ?? ('item-' . time()));
    $id = preg_replace('/[^a-zA-Z0-9_\-]/', '', $rawId);
    if (empty($id)) $id = 'item-' . time();
    $allowedKinds = ['aktualita', 'zavod', 'vysledek', 'soubor', 'oznameni'];
    $kind = in_array($input['kind'] ?? '', $allowedKinds) ? $input['kind'] : 'aktualita';
    $allowedStatuses = ['pending', 'approved', 'rejected'];
    $status = in_array($input['status'] ?? '', $allowedStatuses) ? $input['status'] : 'pending';
    $source = htmlspecialchars(strip_tags(trim((string)($input['source'] ?? 'ruční vložení'))), ENT_QUOTES, 'UTF-8');
    $title = htmlspecialchars(strip_tags(trim((string)($input['title'] ?? 'Bez názvu'))), ENT_QUOTES, 'UTF-8');
    $title = mb_substr($title, 0, 200, 'UTF-8');

    $cleanFields = [];
    if (is_array($input['fields'] ?? null)) {
        foreach ($input['fields'] as $k => $v) {
            $safeKey = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)$k);
            if ($safeKey === '' || $safeKey === '__proto__' || $safeKey === 'constructor' || $safeKey === 'prototype') continue;
            if (is_string($v)) {
                $cleanFields[$safeKey] = htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8');
            } elseif (is_numeric($v) || is_bool($v)) {
                $cleanFields[$safeKey] = $v;
            } elseif (is_array($v)) {
                $cleanFields[$safeKey] = array_map(function($item) {
                    return is_string($item) ? htmlspecialchars(strip_tags(trim($item)), ENT_QUOTES, 'UTF-8') : $item;
                }, $v);
            }
        }
    }
    $fields = json_encode($cleanFields, JSON_UNESCAPED_UNICODE);
    $createdAt = $input['createdAt'] ?? date('c');

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $kind, $status, $source, $title, $fields, $createdAt]);
    } else {
        $items = readJsonFile('admin_items.json', []);
        $items[] = [
            'id' => $id, 'kind' => $kind, 'status' => $status,
            'source' => $source, 'title' => $title, 'fields' => $cleanFields, 'createdAt' => $createdAt
        ];
        writeJsonFile('admin_items.json', $items);
    }
    echo json_encode(['success' => true, 'id' => $id]);
    exit;
}
