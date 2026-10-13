<?php
/**
 * Klokani — SQLite Database Connection & Management
 * TJ Bohemians Praha (oddíl plavání)
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('DB_FILE', __DIR__ . '/../data/bohemka.sqlite');

/**
 * Returns the PDO database connection, initializing schema and seed if needed.
 */
function getDb(): PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dbDir = dirname(DB_FILE);
    if (!is_dir($dbDir)) {
        @mkdir($dbDir, 0777, true);
    }

    $isNewDb = !file_exists(DB_FILE) || filesize(DB_FILE) === 0;

    $pdo = new PDO('sqlite:' . DB_FILE);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Foreign keys & WAL mode for performance and safety
    $pdo->exec('PRAGMA foreign_keys = ON;');
    $pdo->exec('PRAGMA journal_mode = WAL;');

    initSchema($pdo);

    if ($isNewDb || isDatabaseEmpty($pdo)) {
        seedDatabase($pdo);
    }

    return $pdo;
}

/**
 * Initializes database tables.
 */
function initSchema(PDO $pdo): void {
    $sql = "
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'swimmer',
        year_of_birth INTEGER,
        club_category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news (
        id TEXT PRIMARY KEY,
        slug TEXT,
        title TEXT NOT NULL,
        author TEXT,
        date TEXT NOT NULL,
        excerpt TEXT,
        body TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        place TEXT,
        date TEXT NOT NULL,
        deadline TEXT,
        status TEXT DEFAULT 'open',
        disciplines_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS event_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id TEXT NOT NULL,
        user_id INTEGER,
        swimmer_name TEXT NOT NULL,
        disciplines_json TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS parent_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        title TEXT,
        text TEXT NOT NULL,
        date TEXT,
        author TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS trainers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT,
        email TEXT,
        phone TEXT,
        bio TEXT,
        photo_url TEXT
    );

    CREATE TABLE IF NOT EXISTS yearbooks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER NOT NULL,
        title TEXT NOT NULL,
        file_url TEXT NOT NULL,
        file_size TEXT
    );

    CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pool TEXT NOT NULL,
        gender TEXT NOT NULL,
        event TEXT NOT NULL,
        time TEXT NOT NULL,
        swimmer_name TEXT NOT NULL,
        year TEXT,
        note TEXT
    );

    CREATE TABLE IF NOT EXISTS downloads (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        filename TEXT,
        size TEXT,
        date TEXT,
        official_url TEXT,
        description TEXT
    );

    CREATE TABLE IF NOT EXISTS signups (
        event_id TEXT PRIMARY KEY,
        disciplines TEXT,
        note TEXT,
        created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS admin_items (
        id TEXT PRIMARY KEY,
        kind TEXT,
        status TEXT DEFAULT 'pending',
        source TEXT,
        title TEXT NOT NULL,
        fields_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ";
    $pdo->exec($sql);
}

/**
 * Checks if the users table is empty.
 */
function isDatabaseEmpty(PDO $pdo): bool {
    try {
        $count = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
        return (int)$count === 0;
    } catch (Exception $e) {
        return true;
    }
}

/**
 * Seeds initial content and default credentials.
 */
function seedDatabase(PDO $pdo): void {
    // 1. Default Users
    $defaultUsers = [
        [
            'username' => 'admin',
            'password' => 'bohemka',
            'name' => 'Vedení oddílu Klokani',
            'role' => 'admin',
            'year_of_birth' => 1978,
            'club_category' => 'Trenéři & Vedení'
        ],
        [
            'username' => 'trener',
            'password' => 'bohemka',
            'name' => 'Mgr. Jan Srb',
            'role' => 'trainer',
            'year_of_birth' => 1976,
            'club_category' => 'Hlavní trenér'
        ],
        [
            'username' => 'plavec',
            'password' => 'bohemka',
            'name' => 'Jan Novák',
            'role' => 'swimmer',
            'year_of_birth' => 2010,
            'club_category' => 'Starší žáci'
        ]
    ];

    $stmtUser = $pdo->prepare("
        INSERT OR IGNORE INTO users (username, password_hash, name, role, year_of_birth, club_category)
        VALUES (:username, :password_hash, :name, :role, :year_of_birth, :club_category)
    ");

    foreach ($defaultUsers as $u) {
        $stmtUser->execute([
            ':username' => $u['username'],
            ':password_hash' => password_hash($u['password'], PASSWORD_DEFAULT),
            ':name' => $u['name'],
            ':role' => $u['role'],
            ':year_of_birth' => $u['year_of_birth'],
            ':club_category' => $u['club_category']
        ]);
    }

    // 2. Load seed_data.json
    $jsonPath = __DIR__ . '/seed_data.json';
    if (!file_exists($jsonPath)) {
        $jsonPath = __DIR__ . '/../data/seed_data.json';
    }
    if (!file_exists($jsonPath)) {
        return;
    }

    $raw = file_get_contents($jsonPath);
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return;
    }

    // News
    if (!empty($data['news'])) {
        $stmtNews = $pdo->prepare("
            INSERT OR REPLACE INTO news (id, slug, title, author, date, excerpt, body, image_url)
            VALUES (:id, :slug, :title, :author, :date, :excerpt, :body, :image_url)
        ");
        foreach ($data['news'] as $n) {
            $body = is_array($n['body']) ? implode("\n\n", $n['body']) : ($n['body'] ?? '');
            $stmtNews->execute([
                ':id' => $n['id'],
                ':slug' => $n['id'],
                ':title' => $n['title'],
                ':author' => $n['author'] ?? 'Jan Srb',
                ':date' => $n['date'],
                ':excerpt' => $n['excerpt'] ?? '',
                ':body' => $body,
                ':image_url' => $n['image'] ?? ''
            ]);
        }
    }

    // Events
    if (!empty($data['events'])) {
        $stmtEvent = $pdo->prepare("
            INSERT OR REPLACE INTO events (id, name, place, date, deadline, status, disciplines_json)
            VALUES (:id, :name, :place, :date, :deadline, :status, :disciplines_json)
        ");
        foreach ($data['events'] as $e) {
            $disciplines = is_array($e['disciplines'] ?? null) ? json_encode($e['disciplines'], JSON_UNESCAPED_UNICODE) : '[]';
            $stmtEvent->execute([
                ':id' => $e['id'],
                ':name' => $e['name'],
                ':place' => $e['place'] ?? '',
                ':date' => $e['date'],
                ':deadline' => $e['deadline'] ?? '',
                ':status' => 'open',
                ':disciplines_json' => $disciplines
            ]);
        }
    }

    // Demo entries into event_entries
    if (!empty($data['demoRoster'])) {
        $stmtEntry = $pdo->prepare("
            INSERT INTO event_entries (event_id, user_id, swimmer_name, disciplines_json, note)
            VALUES (:event_id, :user_id, :swimmer_name, :disciplines_json, :note)
        ");
        foreach ($data['demoRoster'] as $eventId => $roster) {
            foreach ($roster as $entry) {
                $disciplines = is_array($entry['disciplines'] ?? null) ? json_encode($entry['disciplines'], JSON_UNESCAPED_UNICODE) : '[]';
                $stmtEntry->execute([
                    ':event_id' => $eventId,
                    ':user_id' => null,
                    ':swimmer_name' => $entry['swimmer'] . ($entry['group'] ? ' (' . $entry['group'] . ')' : ''),
                    ':disciplines_json' => $disciplines,
                    ':note' => 'Předběžná nominace oddílu'
                ]);
            }
        }
    }

    // Parent messages
    if (!empty($data['parentsNotes'])) {
        $stmtNote = $pdo->prepare("
            INSERT INTO parent_messages (category, title, text, date, author)
            VALUES (:category, :title, :text, :date, :author)
        ");
        foreach ($data['parentsNotes'] as $idx => $note) {
            $stmtNote->execute([
                ':category' => 'Upozornění trenérů',
                ':title' => 'Vzkaz oddílu č. ' . ($idx + 1),
                ':text' => $note,
                ':date' => '2026-09-01',
                ':author' => 'Jan Srb'
            ]);
        }
    }

    // Coaches / Trainers
    $coaches = array_merge($data['coaches'] ?? [], $data['otherCoaches'] ?? []);
    if (!empty($coaches)) {
        $stmtCoach = $pdo->prepare("
            INSERT INTO trainers (name, role, email, phone, bio, photo_url)
            VALUES (:name, :role, :email, :phone, :bio, :photo_url)
        ");
        foreach ($coaches as $c) {
            if (is_string($c)) {
                $name = $c;
                $role = 'Trenér oddílu';
                $details = [];
            } else {
                $name = $c['name'] ?? '';
                $role = $c['role'] ?? 'Trenér oddílu';
                $details = $c['details'] ?? [];
            }
            $email = '';
            $phone = '';
            $bioParts = [];
            foreach ($details as $d) {
                if (filter_var($d, FILTER_VALIDATE_EMAIL)) {
                    $email = $d;
                } elseif (strpos($d, 'mobil:') !== false || strpos($d, '77') !== false || strpos($d, '60') !== false) {
                    $phone = str_replace('mobil:', '', $d);
                } else {
                    $bioParts[] = $d;
                }
            }
            $stmtCoach->execute([
                ':name' => $name,
                ':role' => $role,
                ':email' => trim($email),
                ':phone' => trim($phone),
                ':bio' => implode(' • ', $bioParts),
                ':photo_url' => ''
            ]);
        }
    }

    // Yearbooks
    if (!empty($data['yearbooks'])) {
        $stmtYb = $pdo->prepare("
            INSERT INTO yearbooks (year, title, file_url, file_size)
            VALUES (:year, :title, :file_url, :file_size)
        ");
        foreach ($data['yearbooks'] as $yb) {
            $stmtYb->execute([
                ':year' => (int)$yb['year'],
                ':title' => $yb['title'],
                ':file_url' => $yb['url'],
                ':file_size' => $yb['size'] ?? ''
            ]);
        }
    }

    // Records
    if (!empty($data['records'])) {
        $stmtRec = $pdo->prepare("
            INSERT INTO records (pool, gender, event, time, swimmer_name, year, note)
            VALUES (:pool, :gender, :event, :time, :swimmer_name, :year, :note)
        ");
        foreach ($data['records'] as $r) {
            $stmtRec->execute([
                ':pool' => $r['pool'],
                ':gender' => $r['gender'],
                ':event' => $r['event'],
                ':time' => $r['time'],
                ':swimmer_name' => $r['holder'],
                ':year' => (string)($r['year'] ?? ''),
                ':note' => ($r['date'] ?? '') . ' ' . ($r['place'] ?? '')
            ]);
        }
    }

    // Downloads
    if (!empty($data['downloads'])) {
        $stmtDl = $pdo->prepare("
            INSERT OR REPLACE INTO downloads (id, title, category, filename, size, date, official_url, description)
            VALUES (:id, :title, :category, :filename, :size, :date, :official_url, :description)
        ");
        foreach ($data['downloads'] as $dl) {
            $stmtDl->execute([
                ':id' => $dl['id'],
                ':title' => $dl['title'],
                ':category' => $dl['category'] ?? 'Organizace',
                ':filename' => $dl['filename'] ?? '',
                ':size' => $dl['size'] ?? '',
                ':date' => $dl['date'] ?? '',
                ':official_url' => $dl['officialUrl'] ?? '',
                ':description' => $dl['description'] ?? ''
            ]);
        }
    }
}

/**
 * Authentication Helpers
 */
function currentUser(): ?array {
    return $_SESSION['user'] ?? null;
}

function isLoggedIn(): bool {
    return !empty($_SESSION['user']);
}

function isAdmin(): bool {
    $u = currentUser();
    return $u !== null && in_array($u['role'], ['admin', 'trainer']);
}

function loginUser(string $username, string $password): bool {
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM users WHERE LOWER(username) = LOWER(:username) LIMIT 1");
    $stmt->execute([':username' => trim($username)]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user'] = [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'name' => $user['name'],
            'role' => $user['role'],
            'year_of_birth' => $user['year_of_birth'],
            'club_category' => $user['club_category']
        ];
        return true;
    }
    return false;
}

function logoutUser(): void {
    unset($_SESSION['user']);
}

function requireAuth(string $redirect = 'intranet.php'): void {
    if (!isLoggedIn()) {
        header("Location: $redirect");
        exit;
    }
}

function requireAdmin(string $redirect = 'admin.php'): void {
    if (!isAdmin()) {
        header("Location: $redirect");
        exit;
    }
}

/**
 * HTML Escaping Helper
 */
function e(?string $str): string {
    return htmlspecialchars((string)$str, ENT_QUOTES, 'UTF-8');
}

/**
 * Flash message helper
 */
function setFlash(string $type, string $message): void {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function getFlash(): ?array {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
