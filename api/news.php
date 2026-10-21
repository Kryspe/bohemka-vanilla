<?php
/**
 * TJ Bohemians Praha — News REST Endpoint
 * Read/write news items from SQLite database with fallback handling.
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDb();

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, slug, title, author, date, excerpt, body, image_url, created_at FROM news ORDER BY date DESC");
            $rows = $stmt->fetchAll();
            echo json_encode($rows);
            exit;
        } catch (Exception $e) {
            // Fallback to admin_items if news table schema differs
            $stmt = $pdo->query("SELECT * FROM admin_items WHERE kind = 'aktualita' ORDER BY created_at DESC");
            $items = [];
            while ($row = $stmt->fetch()) {
                $f = json_decode($row['fields_json'], true) ?: [];
                $items[] = [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'date' => $f['datum'] ?? substr($row['created_at'], 0, 10),
                    'author' => $f['autor'] ?? $row['source'],
                    'excerpt' => $f['perex'] ?? '',
                    'body' => $f['obsah'] ?? '',
                    'image_url' => $f['obrazek'] ?? ''
                ];
            }
            echo json_encode($items);
            exit;
        }
    }
    echo json_encode([]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['title'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title is required']);
        exit;
    }

    $id = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($input['id'] ?? ('news-' . time())));
    $title = htmlspecialchars(strip_tags(trim((string)$input['title'])), ENT_QUOTES, 'UTF-8');
    $author = htmlspecialchars(strip_tags(trim((string)($input['author'] ?? 'Vedení oddílu'))), ENT_QUOTES, 'UTF-8');
    $date = preg_replace('/[^0-9\-]/', '', (string)($input['date'] ?? date('Y-m-d')));
    $excerpt = htmlspecialchars(strip_tags(trim((string)($input['excerpt'] ?? ''))), ENT_QUOTES, 'UTF-8');
    $body = (string)($input['body'] ?? '');
    $image_url = htmlspecialchars(strip_tags(trim((string)($input['image_url'] ?? ''))), ENT_QUOTES, 'UTF-8');

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT OR REPLACE INTO news (id, slug, title, author, date, excerpt, body, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $id, $title, $author, $date, $excerpt, $body, $image_url]);
            
            // Also mirror to admin_items
            $fields = ['autor' => $author, 'datum' => $date, 'perex' => $excerpt, 'obsah' => $body, 'obrazek' => $image_url];
            $stmtAdm = $pdo->prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'aktualita', 'approved', 'intranet', ?, ?)");
            $stmtAdm->execute([$id, $title, json_encode($fields, JSON_UNESCAPED_UNICODE)]);
        } catch (Exception $e) {}
    }

    // Sync to Supabase Cloud
    syncToSupabase('news', [
        'id' => $id,
        'slug' => $id,
        'title' => $title,
        'author' => $author,
        'date' => $date,
        'excerpt' => $excerpt,
        'body' => $body,
        'image_url' => $image_url
    ]);

    echo json_encode(['success' => true, 'id' => $id]);
    exit;
}

if ($method === 'DELETE') {
    $id = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($_GET['id'] ?? ''));
    if ($id && $pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
            $stmt->execute([$id]);
            $stmt2 = $pdo->prepare("DELETE FROM admin_items WHERE id = ?");
            $stmt2->execute([$id]);
        } catch (Exception $e) {}
        syncToSupabase('news', null, 'DELETE', 'id=eq.' . urlencode($id));
    }
    echo json_encode(['success' => true]);
    exit;
}
