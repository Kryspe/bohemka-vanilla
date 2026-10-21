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

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO parent_messages (category, title, text, date, author) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$category, $title, $text, $date, $author]);
            $newId = $pdo->lastInsertId();
            echo json_encode(['success' => true, 'id' => $newId]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
    }
    echo json_encode(['success' => true]);
    exit;
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if ($id > 0 && $pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM parent_messages WHERE id = ?");
            $stmt->execute([$id]);
        } catch (Exception $e) {}
    }
    echo json_encode(['success' => true]);
    exit;
}
