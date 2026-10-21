<?php
/**
 * TJ Bohemians Praha — Users / RBAC REST Endpoint
 * Handles user listing and role updates.
 */
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDb();

if ($method === 'GET') {
    $users = [];
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT id, username, name, role, year_of_birth, club_category, created_at FROM users ORDER BY id ASC");
            $users = $stmt->fetchAll();
        } catch (Exception $e) {}
    }
    if (empty($users)) {
        // Return default dev users if table is empty
        $users = [
            [
                'id' => 1,
                'username' => 'admin',
                'name' => 'Mgr. Jan Srb',
                'role' => 'super_admin',
                'club_category' => 'Hlavní trenér'
            ],
            [
                'id' => 2,
                'username' => 'plavec',
                'name' => 'Kryštof Spejchal',
                'role' => 'member',
                'club_category' => 'Sportovní třídy ST'
            ]
        ];
    }
    echo json_encode($users);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    $username = preg_replace('/[^a-zA-Z0-9_\-]/', '', (string)($input['username'] ?? ''));
    $role = in_array($input['role'] ?? '', ['member', 'super_admin', 'coach', 'parent']) ? $input['role'] : 'member';
    $name = htmlspecialchars(strip_tags(trim((string)($input['name'] ?? $username))), ENT_QUOTES, 'UTF-8');

    if ($pdo && $username) {
        try {
            $stmt = $pdo->prepare("UPDATE users SET role = ?, name = ? WHERE username = ?");
            $stmt->execute([$role, $name, $username]);
        } catch (Exception $e) {}
    }

    echo json_encode(['success' => true, 'username' => $username, 'role' => $role]);
    exit;
}
