<?php
/**
 * TJ Bohemians Praha — Parent Messages REST Endpoint
 * Read/write messages for parents from SQLite database.
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDb();

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, category, title, text, date, author, created_at FROM parent_messages ORDER BY id DESC");
            $rows = $stmt->fetchAll();
            echo json_encode($rows);
            exit;
        } catch (Exception $e) {}
    }
    echo json_encode([]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['text'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Message text is required']);
        exit;
    }

    $category = htmlspecialchars(strip_tags(trim((string)($input['category'] ?? 'Upozornění trenérů'))), ENT_QUOTES, 'UTF-8');
    $title = htmlspecialchars(strip_tags(trim((string)($input['title'] ?? 'Vzkaz oddílu'))), ENT_QUOTES, 'UTF-8');
    $text = htmlspecialchars(strip_tags(trim((string)$input['text'])), ENT_QUOTES, 'UTF-8');
    $date = preg_replace('/[^0-9\-.]/', '', (string)($input['date'] ?? date('d. m. Y')));
    $author = htmlspecialchars(strip_tags(trim((string)($input['author'] ?? 'Trenéři TJ Bohemians'))), ENT_QUOTES, 'UTF-8');

    if (preg_match('/negr|nigger|\badasd\b/i', "$category $title $text $author")) {
        http_response_code(400);
        echo json_encode(['error' => 'Inappropriate content rejected']);
        exit;
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO parent_messages (category, title, text, date, author) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$category, $title, $text, $date, $author]);
            $newId = (int)$pdo->lastInsertId();

            // Also mirror to admin_items
            $fields = ['kategorie' => $category, 'datum' => $date, 'autor' => $author, 'text' => $text];
            $stmtAdm = $pdo->prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'oznameni', 'approved', 'intranet', ?, ?)");
            $stmtAdm->execute(['msg-' . $newId, $title, json_encode($fields, JSON_UNESCAPED_UNICODE)]);
        } catch (Exception $e) {}
    }

    // Sync to Supabase Cloud
    syncToSupabase('parent_messages', [
        'category' => $category,
        'title' => $title,
        'text' => $text,
        'date' => $date,
        'author' => $author
    ]);

    echo json_encode(['success' => true, 'id' => $newId ?? time()]);
    exit;
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0 && $pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM parent_messages WHERE id = ?");
            $stmt->execute([$id]);
            $stmt2 = $pdo->prepare("DELETE FROM admin_items WHERE id = ?");
            $stmt2->execute(['msg-' . $id]);
        } catch (Exception $e) {}
        syncToSupabase('parent_messages', null, 'DELETE', 'id=eq.' . $id);
    }
    echo json_encode(['success' => true]);
    exit;
}
