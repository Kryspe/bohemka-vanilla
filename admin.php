<?php
/**
 * Klokani — Admin Panel (Správa oddílu pro trenéry a správce)
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$user = currentUser();

// 1. Handle Admin Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'admin_login') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (loginUser($username, $password)) {
        $u = currentUser();
        if (in_array($u['role'], ['admin', 'trainer'])) {
            setFlash('success', 'Vítejte v administraci oddílu Bohemians.');
            header("Location: admin.php");
            exit;
        } else {
            logoutUser();
            setFlash('error', 'Uživatelský účet nemá trenérská ani správcovská oprávnění.');
            header("Location: admin.php");
            exit;
        }
    } else {
        setFlash('error', 'Neplatné přihlašovací údaje pro administraci. (Výchozí: admin / bohemka)');
        header("Location: admin.php");
        exit;
    }
}

// 2. Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    logoutUser();
    header("Location: admin.php");
    exit;
}

// 3. Handle CSV Export (must be authenticated)
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
    requireAdmin();
    $eventId = trim($_GET['event_id'] ?? '');
    $evStmt = $pdo->prepare("SELECT * FROM events WHERE id = :id LIMIT 1");
    $evStmt->execute([':id' => $eventId]);
    $event = $evStmt->fetch();

    if ($event) {
        $entStmt = $pdo->prepare("SELECT * FROM event_entries WHERE event_id = :id ORDER BY swimmer_name ASC");
        $entStmt->execute([':id' => $eventId]);
        $entries = $entStmt->fetchAll();

        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="klokani-soupiska-' . $eventId . '.csv"');
        
        $output = fopen('php://output', 'w');
        // UTF-8 BOM for Excel
        fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
        fputcsv($output, ['Jméno plavce', 'Disciplíny', 'Poznámka', 'Datum přihlášky']);
        
        foreach ($entries as $e) {
            $discs = json_decode($e['disciplines_json'] ?? '[]', true) ?: [];
            fputcsv($output, [
                $e['swimmer_name'],
                implode('; ', $discs),
                $e['note'] ?? '',
                $e['created_at']
            ]);
        }
        fclose($output);
        exit;
    }
}

// Ensure admin authentication for all subsequent POST/GET actions
$isAdmin = isAdmin();

$activeTab = $_GET['tab'] ?? 'news';
$validTabs = ['news', 'events', 'messages', 'trainers', 'yearbooks', 'records', 'users'];
if (!in_array($activeTab, $validTabs)) {
    $activeTab = 'news';
}

// Handle CRUD actions if authenticated
if ($isAdmin && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    // NEWS CRUD
    if ($action === 'save_news') {
        $id = trim($_POST['id'] ?? '');
        $title = trim($_POST['title'] ?? '');
        $author = trim($_POST['author'] ?? 'Jan Srb');
        $date = trim($_POST['date'] ?? date('Y-m-d'));
        $excerpt = trim($_POST['excerpt'] ?? '');
        $body = trim($_POST['body'] ?? '');
        $imageUrl = trim($_POST['image_url'] ?? '');

        if (empty($id)) {
            $id = 'akt-' . time();
        }

        $stmt = $pdo->prepare("
            INSERT OR REPLACE INTO news (id, slug, title, author, date, excerpt, body, image_url)
            VALUES (:id, :slug, :title, :author, :date, :excerpt, :body, :image_url)
        ");
        $stmt->execute([
            ':id' => $id,
            ':slug' => $id,
            ':title' => $title,
            ':author' => $author,
            ':date' => $date,
            ':excerpt' => $excerpt,
            ':body' => $body,
            ':image_url' => $imageUrl
        ]);
        setFlash('success', 'Aktualita byla úspěšně uložena.');
        header("Location: admin.php?tab=news");
        exit;
    }

    if ($action === 'delete_news') {
        $id = trim($_POST['id'] ?? '');
        $stmt = $pdo->prepare("DELETE FROM news WHERE id = :id");
        $stmt->execute([':id' => $id]);
        setFlash('success', 'Aktualita byla smazána.');
        header("Location: admin.php?tab=news");
        exit;
    }

    // EVENTS CRUD
    if ($action === 'save_event') {
        $id = trim($_POST['id'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $place = trim($_POST['place'] ?? '');
        $date = trim($_POST['date'] ?? '');
        $deadline = trim($_POST['deadline'] ?? '');
        $status = trim($_POST['status'] ?? 'open');
        $disciplinesRaw = trim($_POST['disciplines_raw'] ?? '');

        if (empty($id)) {
            $id = 'zavod-' . time();
        }

        // Split disciplines by comma or newline
        $discArray = array_filter(array_map('trim', preg_split('/[\r\n,]+/', $disciplinesRaw)));
        $disciplinesJson = json_encode(array_values($discArray), JSON_UNESCAPED_UNICODE);

        $stmt = $pdo->prepare("
            INSERT OR REPLACE INTO events (id, name, place, date, deadline, status, disciplines_json)
            VALUES (:id, :name, :place, :date, :deadline, :status, :disciplines_json)
        ");
        $stmt->execute([
            ':id' => $id,
            ':name' => $name,
            ':place' => $place,
            ':date' => $date,
            ':deadline' => $deadline,
            ':status' => $status,
            ':disciplines_json' => $disciplinesJson
        ]);
        setFlash('success', 'Závod byl úspěšně uložen.');
        header("Location: admin.php?tab=events");
        exit;
    }

    if ($action === 'delete_event') {
        $id = trim($_POST['id'] ?? '');
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = :id");
        $stmt->execute([':id' => $id]);
        // Also delete associated entries
        $stmtE = $pdo->prepare("DELETE FROM event_entries WHERE event_id = :id");
        $stmtE->execute([':id' => $id]);
        setFlash('success', 'Závod a jeho přihlášky byly smazány.');
        header("Location: admin.php?tab=events");
        exit;
    }

    if ($action === 'delete_entry') {
        $entryId = (int)($_POST['entry_id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM event_entries WHERE id = :id");
        $stmt->execute([':id' => $entryId]);
        setFlash('success', 'Přihláška plavce byla odstraněna.');
        header("Location: admin.php?tab=events");
        exit;
    }

    // PARENT MESSAGES CRUD
    if ($action === 'save_message') {
        $id = (int)($_POST['id'] ?? 0);
        $category = trim($_POST['category'] ?? 'Upozornění trenérů');
        $title = trim($_POST['title'] ?? 'Vzkaz oddílu');
        $text = trim($_POST['text'] ?? '');
        $date = trim($_POST['date'] ?? date('Y-m-d'));
        $author = trim($_POST['author'] ?? 'Jan Srb');

        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE parent_messages SET category = :category, title = :title, text = :text, date = :date, author = :author WHERE id = :id");
            $stmt->execute([':category' => $category, ':title' => $title, ':text' => $text, ':date' => $date, ':author' => $author, ':id' => $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO parent_messages (category, title, text, date, author) VALUES (:category, :title, :text, :date, :author)");
            $stmt->execute([':category' => $category, ':title' => $title, ':text' => $text, ':date' => $date, ':author' => $author]);
        }
        setFlash('success', 'Vzkaz pro rodiče byl uložen.');
        header("Location: admin.php?tab=messages");
        exit;
    }

    if ($action === 'delete_message') {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM parent_messages WHERE id = :id");
        $stmt->execute([':id' => $id]);
        setFlash('success', 'Vzkaz byl smazán.');
        header("Location: admin.php?tab=messages");
        exit;
    }

    // TRAINERS CRUD
    if ($action === 'save_trainer') {
        $id = (int)($_POST['id'] ?? 0);
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $bio = trim($_POST['bio'] ?? '');

        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE trainers SET name = :name, role = :role, email = :email, phone = :phone, bio = :bio WHERE id = :id");
            $stmt->execute([':name' => $name, ':role' => $role, ':email' => $email, ':phone' => $phone, ':bio' => $bio, ':id' => $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO trainers (name, role, email, phone, bio, photo_url) VALUES (:name, :role, :email, :phone, :bio, '')");
            $stmt->execute([':name' => $name, ':role' => $role, ':email' => $email, ':phone' => $phone, ':bio' => $bio]);
        }
        setFlash('success', 'Trenér byl uložen.');
        header("Location: admin.php?tab=trainers");
        exit;
    }

    if ($action === 'delete_trainer') {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM trainers WHERE id = :id");
        $stmt->execute([':id' => $id]);
        setFlash('success', 'Trenér byl smazán.');
        header("Location: admin.php?tab=trainers");
        exit;
    }

    // YEARBOOKS CRUD
    if ($action === 'save_yearbook') {
        $id = (int)($_POST['id'] ?? 0);
        $year = (int)($_POST['year'] ?? date('Y'));
        $title = trim($_POST['title'] ?? '');
        $fileUrl = trim($_POST['file_url'] ?? '');
        $fileSize = trim($_POST['file_size'] ?? '');

        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE yearbooks SET year = :year, title = :title, file_url = :file_url, file_size = :file_size WHERE id = :id");
            $stmt->execute([':year' => $year, ':title' => $title, ':file_url' => $fileUrl, ':file_size' => $fileSize, ':id' => $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO yearbooks (year, title, file_url, file_size) VALUES (:year, :title, :file_url, :file_size)");
            $stmt->execute([':year' => $year, ':title' => $title, ':file_url' => $fileUrl, ':file_size' => $fileSize]);
        }
        setFlash('success', 'Ročenka byla uložena.');
        header("Location: admin.php?tab=yearbooks");
        exit;
    }

    if ($action === 'delete_yearbook') {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM yearbooks WHERE id = :id");
        $stmt->execute([':id' => $id]);
        setFlash('success', 'Ročenka byla smazána.');
        header("Location: admin.php?tab=yearbooks");
        exit;
    }

    // RECORDS CRUD
    if ($action === 'save_record') {
        $id = (int)($_POST['id'] ?? 0);
        $pool = trim($_POST['pool'] ?? '50m');
        $gender = trim($_POST['gender'] ?? 'Muži');
        $event = trim($_POST['event'] ?? '');
        $time = trim($_POST['time'] ?? '');
        $swimmerName = trim($_POST['swimmer_name'] ?? '');
        $year = trim($_POST['year'] ?? '');
        $note = trim($_POST['note'] ?? '');

        if ($id > 0) {
            $stmt = $pdo->prepare("UPDATE records SET pool = :pool, gender = :gender, event = :event, time = :time, swimmer_name = :swimmer_name, year = :year, note = :note WHERE id = :id");
            $stmt->execute([':pool' => $pool, ':gender' => $gender, ':event' => $event, ':time' => $time, ':swimmer_name' => $swimmerName, ':year' => $year, ':note' => $note, ':id' => $id]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO records (pool, gender, event, time, swimmer_name, year, note) VALUES (:pool, :gender, :event, :time, :swimmer_name, :year, :note)");
            $stmt->execute([':pool' => $pool, ':gender' => $gender, ':event' => $event, ':time' => $time, ':swimmer_name' => $swimmerName, ':year' => $year, ':note' => $note]);
        }
        setFlash('success', 'Rekord byl uložen.');
        header("Location: admin.php?tab=records");
        exit;
    }

    if ($action === 'delete_record') {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM records WHERE id = :id");
        $stmt->execute([':id' => $id]);
        setFlash('success', 'Rekord byl smazán.');
        header("Location: admin.php?tab=records");
        exit;
    }

    // USERS CRUD
    if ($action === 'save_user') {
        $username = trim($_POST['username'] ?? '');
        $password = trim($_POST['password'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? 'swimmer');
        $yearOfBirth = !empty($_POST['year_of_birth']) ? (int)$_POST['year_of_birth'] : null;
        $category = trim($_POST['club_category'] ?? '');

        if (!empty($username) && !empty($password)) {
            $stmt = $pdo->prepare("
                INSERT INTO users (username, password_hash, name, role, year_of_birth, club_category)
                VALUES (:username, :password_hash, :name, :role, :year_of_birth, :club_category)
            ");
            $stmt->execute([
                ':username' => $username,
                ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
                ':name' => $name,
                ':role' => $role,
                ':year_of_birth' => $yearOfBirth,
                ':club_category' => $category
            ]);
            setFlash('success', 'Uživatel byl úspěšně vytvořen.');
        }
        header("Location: admin.php?tab=users");
        exit;
    }

    if ($action === 'delete_user') {
        $id = (int)($_POST['id'] ?? 0);
        // Prevent deleting self
        if ($id !== $user['id']) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
            $stmt->execute([':id' => $id]);
            setFlash('success', 'Uživatel byl smazán.');
        } else {
            setFlash('error', 'Nemůžete smazat svůj vlastní přihlášený účet.');
        }
        header("Location: admin.php?tab=users");
        exit;
    }
}

$pageTitle = 'Administrace — Klokani | TJ Bohemians Praha';
$pageDescription = 'Správa oddílu pro trenéry a správce: aktuality, kalendář závodů, přihlášky plavců, vzkazy, kontakty a ročenky.';
$currentPage = 'admin';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

<?php if (!$isAdmin): ?>
  <!-- DEDICATED ADMIN LOGIN SCREEN -->
  <section class="py-12 sm:py-20">
    <div class="mx-auto max-w-md px-4 sm:px-6">
      <div class="card-clean p-6 sm:p-8">
        <div class="text-center">
          <div class="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700/10 text-emerald-700 dark:text-emerald-400">
            <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </div>
          <h1 class="mt-4 font-display text-2xl font-extrabold text-foreground">Správa oddílu (Trenéři)</h1>
          <p class="mt-2 text-sm text-muted-foreground">Přihlášení do zabezpečeného panelu pro vedení oddílu</p>
        </div>

        <form method="post" action="admin.php" class="mt-6 space-y-4">
          <input type="hidden" name="action" value="admin_login">

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5" for="admin-username">Trenérské uživatelské jméno</label>
            <input type="text" id="admin-username" name="username" required value="admin" autocomplete="username"
                   class="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5" for="admin-password">Heslo</label>
            <input type="password" id="admin-password" name="password" required value="bohemka" autocomplete="current-password"
                   class="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 py-3 text-sm font-bold text-white shadow-xs transition-colors">
              Vstoupit do administrace
            </button>
          </div>
        </form>

        <div class="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>Výchozí přihlašovací údaje: <strong class="text-foreground">admin</strong> / heslo: <strong class="text-foreground">bohemka</strong></p>
          <p class="mt-2">Jste plavec nebo rodič? <a href="intranet.php" class="font-semibold text-primary hover:underline">Vstoupit do klientského Intranetu &rarr;</a></p>
        </div>
      </div>
    </div>
  </section>

<?php else: ?>
  <!-- ADMIN SHELL WITH MULTI-SECTION TABS -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-6 sm:py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            Zabezpečený režim správy oddílu · <?= e($user['name']) ?>
          </div>
          <h1 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Administrace Klokanů TJ Bohemians
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <a href="intranet.php" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted">
            <svg class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Pohled plavce</span>
          </a>
          <a href="admin.php?action=logout" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted">
            <svg class="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>Odhlásit správu</span>
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <a href="admin.php?tab=news" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'news' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          📰 Aktuality
        </a>
        <a href="admin.php?tab=events" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'events' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          🏊 Závody & Přihlášky
        </a>
        <a href="admin.php?tab=messages" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'messages' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          📢 Vzkazy pro rodiče
        </a>
        <a href="admin.php?tab=trainers" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'trainers' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          🧑‍🏫 Trenéři
        </a>
        <a href="admin.php?tab=yearbooks" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'yearbooks' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          📚 Ročenky
        </a>
        <a href="admin.php?tab=records" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'records' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          ⏱️ Rekordy oddílu
        </a>
        <a href="admin.php?tab=users" class="rounded-lg px-3.5 py-1.5 text-xs font-semibold <?= $activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted' ?>">
          👥 Uživatelé
        </a>
      </div>
    </div>
  </section>

  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6">

    <?php if ($activeTab === 'news'): ?>
      <!-- TAB 1: NEWS MANAGEMENT -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat / Upravit aktualitu</h2>
            <form method="post" action="admin.php?tab=news" class="space-y-3.5">
              <input type="hidden" name="action" value="save_news">

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">ID / Slug</label>
                <input type="text" name="id" placeholder="např. akt-2241 (nechte prázdné pro automatické)"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Nadpis aktuality</label>
                <input type="text" name="title" required placeholder="Zadejte název článku"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Datum</label>
                  <input type="date" name="date" required value="<?= date('Y-m-d') ?>"
                         class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Autor</label>
                  <input type="text" name="author" value="Jan Srb"
                         class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Obrázek (cesta nebo URL)</label>
                <input type="text" name="image_url" placeholder="assets/aktuality/2240.jpg"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Krátký výtah (Perex)</label>
                <textarea name="excerpt" rows="2" placeholder="Stručný úvod na úvodní stránku a přehled"
                          class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Obsah článku (odstavce oddělte prázdným řádkem)</label>
                <textarea name="body" rows="6" required placeholder="Text článku..."
                          class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"></textarea>
              </div>

              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Uložit aktualitu
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Všechny publikované aktuality</h2>
            <?php 
              $allNews = $pdo->query("SELECT * FROM news ORDER BY date DESC")->fetchAll();
            ?>
            <div class="divide-y divide-border">
              <?php foreach ($allNews as $n): ?>
                <div class="py-3.5 flex items-start justify-between gap-3">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 text-[0.7rem] font-semibold text-primary">
                      <span><?= date('d. m. Y', strtotime($n['date'])) ?></span>
                      <span>·</span>
                      <span class="text-muted-foreground"><?= e($n['author']) ?></span>
                    </div>
                    <h3 class="text-sm font-bold text-foreground truncate mt-0.5"><?= e($n['title']) ?></h3>
                    <p class="text-xs text-muted-foreground line-clamp-1 mt-1"><?= e($n['excerpt']) ?></p>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <a href="aktuality.php?id=<?= urlencode($n['id']) ?>" target="_blank" class="text-xs font-semibold text-primary hover:underline">
                      Zobrazit
                    </a>
                    <form method="post" action="admin.php?tab=news" onsubmit="return confirm('Opravdu smazat tuto aktualitu?');">
                      <input type="hidden" name="action" value="delete_news">
                      <input type="hidden" name="id" value="<?= e($n['id']) ?>">
                      <button type="submit" class="text-xs font-semibold text-red-600 hover:underline">Smazat</button>
                    </form>
                  </div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'events'): ?>
      <!-- TAB 2: EVENTS & ENTRIES -->
      <div class="space-y-8">
        <!-- Add Event Form -->
        <div class="card-clean p-6">
          <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat nový závod do kalendáře</h2>
          <form method="post" action="admin.php?tab=events" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input type="hidden" name="action" value="save_event">

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Název závodu</label>
              <input type="text" name="name" required placeholder="Velká cena města..."
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Místo / Bazén</label>
              <input type="text" name="place" placeholder="Plzeň – Slovany / Podolí"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Datum konání</label>
              <input type="date" name="date" required
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Uzávěrka přihlášek</label>
              <input type="date" name="deadline" required
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Seznam disciplín (oddělené čárkou)</label>
              <input type="text" name="disciplines_raw" value="50 VZ, 100 VZ, 200 VZ, 50 Z, 100 Z, 50 P, 100 P, 50 M, 100 M, 100 PZ, 200 PZ"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Stav přihlášek</label>
              <select name="status" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                <option value="open">Otevřeno pro přihlášky</option>
                <option value="closed">Uzavřeno</option>
              </select>
            </div>

            <div class="flex items-end">
              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Uložit nový závod
              </button>
            </div>
          </form>
        </div>

        <!-- List of Events with Registered Swimmers -->
        <div class="card-clean p-6">
          <h2 class="font-display text-lg font-bold text-foreground mb-4">Přehled závodů a přihlášených plavců</h2>
          <?php 
            $allEvents = $pdo->query("SELECT * FROM events ORDER BY date ASC")->fetchAll();
          ?>
          <div class="space-y-6">
            <?php foreach ($allEvents as $ev): ?>
              <?php 
                $stmtEnt = $pdo->prepare("SELECT * FROM event_entries WHERE event_id = :id ORDER BY swimmer_name ASC");
                $stmtEnt->execute([':id' => $ev['id']]);
                $entries = $stmtEnt->fetchAll();
              ?>
              <div class="rounded-xl border border-border p-4 bg-background">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <div class="flex items-center gap-2 text-xs font-semibold text-primary">
                      <span>📅 <?= date('d. m. Y', strtotime($ev['date'])) ?></span>
                      <span>·</span>
                      <span class="text-muted-foreground">📍 <?= e($ev['place']) ?></span>
                      <span>·</span>
                      <span class="text-amber-700 dark:text-amber-400">Uzávěrka: <?= date('d. m. Y', strtotime($ev['deadline'])) ?></span>
                    </div>
                    <h3 class="text-base font-bold text-foreground mt-0.5"><?= e($ev['name']) ?></h3>
                  </div>

                  <div class="flex items-center gap-2">
                    <a href="admin.php?action=export_csv&event_id=<?= urlencode($ev['id']) ?>" 
                       class="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
                      <svg class="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      <span>Export soupisky (CSV)</span>
                    </a>
                    <form method="post" action="admin.php?tab=events" onsubmit="return confirm('Opravdu smazat tento závod včetně přihlášek?');">
                      <input type="hidden" name="action" value="delete_event">
                      <input type="hidden" name="id" value="<?= e($ev['id']) ?>">
                      <button type="submit" class="rounded-lg bg-red-600/10 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-600/20">
                        Smazat závod
                      </button>
                    </form>
                  </div>
                </div>

                <!-- Swimmer Entries List -->
                <div class="mt-3">
                  <p class="text-xs font-bold text-muted-foreground mb-2">
                    Přihlášení plavci oddílu (<?= count($entries) ?>):
                  </p>
                  <?php if (empty($entries)): ?>
                    <p class="text-xs italic text-muted-foreground">Žádný plavec zatím není přihlášen.</p>
                  <?php else: ?>
                    <div class="divide-y divide-border/60">
                      <?php foreach ($entries as $ent): ?>
                        <?php 
                          $discs = json_decode($ent['disciplines_json'] ?? '[]', true) ?: [];
                        ?>
                        <div class="py-2 flex items-center justify-between text-xs gap-3">
                          <div class="min-w-0">
                            <span class="font-bold text-foreground"><?= e($ent['swimmer_name']) ?></span>
                            <span class="text-muted-foreground ml-2">Disciplíny: <?= e(implode(', ', $discs)) ?></span>
                            <?php if (!empty($ent['note'])): ?>
                              <span class="text-amber-700 dark:text-amber-400 ml-2">(<?= e($ent['note']) ?>)</span>
                            <?php endif; ?>
                          </div>
                          <form method="post" action="admin.php?tab=events" onsubmit="return confirm('Smazat přihlášku plavce?');">
                            <input type="hidden" name="action" value="delete_entry">
                            <input type="hidden" name="entry_id" value="<?= $ent['id'] ?>">
                            <button type="submit" class="text-red-500 hover:underline">Odstranit</button>
                          </form>
                        </div>
                      <?php endforeach; ?>
                    </div>
                  <?php endif; ?>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'messages'): ?>
      <!-- TAB 3: PARENT MESSAGES -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat nový vzkaz na nástěnku</h2>
            <form method="post" action="admin.php?tab=messages" class="space-y-3.5">
              <input type="hidden" name="action" value="save_message">

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Kategorie</label>
                <input type="text" name="category" value="Upozornění trenérů" required
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Titulek vzkazu</label>
                <input type="text" name="title" value="Informace pro rodiče" required
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Text vzkazu</label>
                <textarea name="text" rows="4" required placeholder="Text vzkazu..."
                          class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"></textarea>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Datum</label>
                  <input type="date" name="date" value="<?= date('Y-m-d') ?>" required
                         class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Autor</label>
                  <input type="text" name="author" value="Jan Srb" required
                         class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                </div>
              </div>

              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Zveřejnit vzkaz
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Aktivní vzkazy na nástěnce</h2>
            <?php 
              $allMessages = $pdo->query("SELECT * FROM parent_messages ORDER BY id DESC")->fetchAll();
            ?>
            <div class="space-y-3">
              <?php foreach ($allMessages as $msg): ?>
                <div class="rounded-xl border border-border p-4 bg-background flex items-start justify-between gap-3">
                  <div>
                    <div class="flex items-center gap-2 text-[0.7rem] font-semibold text-primary">
                      <span><?= e($msg['category']) ?></span>
                      <span>·</span>
                      <span class="text-muted-foreground"><?= e($msg['date']) ?> · <?= e($msg['author']) ?></span>
                    </div>
                    <p class="text-xs text-foreground mt-1 leading-relaxed"><?= nl2br(e($msg['text'])) ?></p>
                  </div>
                  <form method="post" action="admin.php?tab=messages" onsubmit="return confirm('Smazat vzkaz?');">
                    <input type="hidden" name="action" value="delete_message">
                    <input type="hidden" name="id" value="<?= $msg['id'] ?>">
                    <button type="submit" class="text-xs font-semibold text-red-600 hover:underline">Smazat</button>
                  </form>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'trainers'): ?>
      <!-- TAB 4: TRAINERS -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat trenéra do oddílu</h2>
            <form method="post" action="admin.php?tab=trainers" class="space-y-3.5">
              <input type="hidden" name="action" value="save_trainer">

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Jméno a titul</label>
                <input type="text" name="name" required placeholder="Mgr. Jan Novák"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Funkce / Skupina</label>
                <input type="text" name="role" required placeholder="Hlavní trenér — ST & Přípravka"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Email</label>
                <input type="email" name="email" placeholder="trener@bohemians.cz"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Telefon</label>
                <input type="text" name="phone" placeholder="777 123 456"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Kvalifikace & Popis</label>
                <textarea name="bio" rows="3" placeholder="trenér I. třídy • FTVS UK"
                          class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"></textarea>
              </div>

              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Uložit trenéra
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Aktuální trenérský sbor</h2>
            <?php 
              $allTrainers = $pdo->query("SELECT * FROM trainers ORDER BY id ASC")->fetchAll();
            ?>
            <div class="divide-y divide-border">
              <?php foreach ($allTrainers as $t): ?>
                <div class="py-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 class="text-sm font-bold text-foreground"><?= e($t['name']) ?></h3>
                    <p class="text-xs text-primary font-semibold"><?= e($t['role']) ?></p>
                    <p class="text-xs text-muted-foreground mt-0.5"><?= e($t['bio']) ?></p>
                    <div class="mt-1 flex items-center gap-3 text-[0.7rem] text-muted-foreground">
                      <?php if (!empty($t['email'])): ?><span>✉️ <?= e($t['email']) ?></span><?php endif; ?>
                      <?php if (!empty($t['phone'])): ?><span>📞 <?= e($t['phone']) ?></span><?php endif; ?>
                    </div>
                  </div>
                  <form method="post" action="admin.php?tab=trainers" onsubmit="return confirm('Smazat trenéra?');">
                    <input type="hidden" name="action" value="delete_trainer">
                    <input type="hidden" name="id" value="<?= $t['id'] ?>">
                    <button type="submit" class="text-xs font-semibold text-red-600 hover:underline">Smazat</button>
                  </form>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'yearbooks'): ?>
      <!-- TAB 5: YEARBOOKS -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat ročenku oddílu</h2>
            <form method="post" action="admin.php?tab=yearbooks" class="space-y-3.5">
              <input type="hidden" name="action" value="save_yearbook">

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Rok</label>
                <input type="number" name="year" required value="<?= date('Y') ?>"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Název dokumentu</label>
                <input type="text" name="title" required placeholder="Oddílové tabulky a TOP 10 k 31. 12...."
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">URL odkaz na soubor (PDF)</label>
                <input type="text" name="file_url" required placeholder="https://www.boh.cz/download/..."
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Velikost souboru</label>
                <input type="text" name="file_size" placeholder="1,7 MB"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Uložit ročenku
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Přehled ročenek</h2>
            <?php 
              $allYb = $pdo->query("SELECT * FROM yearbooks ORDER BY year DESC")->fetchAll();
            ?>
            <div class="divide-y divide-border max-h-[500px] overflow-y-auto pr-2">
              <?php foreach ($allYb as $yb): ?>
                <div class="py-2.5 flex items-center justify-between text-xs gap-3">
                  <div>
                    <span class="font-bold text-foreground">[<?= e($yb['year']) ?>]</span>
                    <span class="text-foreground ml-1"><?= e($yb['title']) ?></span>
                    <span class="text-muted-foreground ml-2">(<?= e($yb['file_size']) ?>)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <a href="<?= e($yb['file_url']) ?>" target="_blank" class="text-primary hover:underline">Stáhnout</a>
                    <form method="post" action="admin.php?tab=yearbooks" onsubmit="return confirm('Smazat ročenku?');">
                      <input type="hidden" name="action" value="delete_yearbook">
                      <input type="hidden" name="id" value="<?= $yb['id'] ?>">
                      <button type="submit" class="text-red-500 hover:underline">Smazat</button>
                    </form>
                  </div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'records'): ?>
      <!-- TAB 6: RECORDS -->
      <div class="space-y-8">
        <div class="card-clean p-6">
          <h2 class="font-display text-lg font-bold text-foreground mb-4">Přidat nový oddílový rekord</h2>
          <form method="post" action="admin.php?tab=records" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input type="hidden" name="action" value="save_record">

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Bazén</label>
              <select name="pool" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                <option value="50m">50m bazén</option>
                <option value="25m">25m bazén</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Kategorie</label>
              <select name="gender" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                <option value="Muži">Muži</option>
                <option value="Ženy">Ženy</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Disciplína</label>
              <input type="text" name="event" required placeholder="např. 100 VZ"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Čas</label>
              <input type="text" name="time" required placeholder="00:52,14"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Plavec / Držitel</label>
              <input type="text" name="swimmer_name" required placeholder="Jméno plavce"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Rok</label>
              <input type="text" name="year" placeholder="2024"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Poznámka / Místo / Datum</label>
              <input type="text" name="note" placeholder="Plzeň, Mistrovství ČR"
                     class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
            </div>

            <div class="lg:col-span-4 flex justify-end">
              <button type="submit" class="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Uložit rekord
              </button>
            </div>
          </form>
        </div>

        <div class="card-clean p-6">
          <h2 class="font-display text-lg font-bold text-foreground mb-4">Všechny oddílové rekordy v databázi</h2>
          <?php 
            $allRec = $pdo->query("SELECT * FROM records ORDER BY pool ASC, gender ASC, id ASC")->fetchAll();
          ?>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="border-b border-border bg-muted/50 text-muted-foreground uppercase text-[0.65rem] font-bold">
                <tr>
                  <th class="p-2.5">Bazén</th>
                  <th class="p-2.5">Kategorie</th>
                  <th class="p-2.5">Disciplína</th>
                  <th class="p-2.5">Rekordní čas</th>
                  <th class="p-2.5">Držitel rekordu</th>
                  <th class="p-2.5">Rok</th>
                  <th class="p-2.5">Místo konání</th>
                  <th class="p-2.5 text-right">Akce</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <?php foreach ($allRec as $r): ?>
                  <tr class="hover:bg-muted/30">
                    <td class="p-2.5 font-bold text-primary"><?= e($r['pool']) ?></td>
                    <td class="p-2.5"><?= e($r['gender']) ?></td>
                    <td class="p-2.5 font-semibold text-foreground"><?= e($r['event']) ?></td>
                    <td class="p-2.5 font-mono font-bold text-foreground"><?= e($r['time']) ?></td>
                    <td class="p-2.5 font-medium"><?= e($r['swimmer_name']) ?></td>
                    <td class="p-2.5 text-muted-foreground"><?= e($r['year']) ?></td>
                    <td class="p-2.5 text-muted-foreground"><?= e($r['note']) ?></td>
                    <td class="p-2.5 text-right">
                      <form method="post" action="admin.php?tab=records" onsubmit="return confirm('Smazat rekord?');" class="inline">
                        <input type="hidden" name="action" value="delete_record">
                        <input type="hidden" name="id" value="<?= $r['id'] ?>">
                        <button type="submit" class="text-red-500 hover:underline">Smazat</button>
                      </form>
                    </td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    <?php elseif ($activeTab === 'users'): ?>
      <!-- TAB 7: USERS MANAGEMENT -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Vytvořit nový uživatelský účet</h2>
            <form method="post" action="admin.php?tab=users" class="space-y-3.5">
              <input type="hidden" name="action" value="save_user">

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Uživatelské jméno (login)</label>
                <input type="text" name="username" required placeholder="např. novak"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Heslo</label>
                <input type="password" name="password" required placeholder="Bezpečné heslo"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Celé jméno plavce / trenéra</label>
                <input type="text" name="name" required placeholder="Jan Novák"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Role v systému</label>
                  <select name="role" class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                    <option value="swimmer">Plavec / Rodič</option>
                    <option value="trainer">Trenér</option>
                    <option value="admin">Správce oddílu</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Rok narození</label>
                  <input type="number" name="year_of_birth" placeholder="2012"
                         class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Oddílová kategorie / Skupina</label>
                <input type="text" name="club_category" placeholder="Starší žáci / ST Podolí"
                       class="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
              </div>

              <button type="submit" class="w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
                Vytvořit účet
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="card-clean p-6">
            <h2 class="font-display text-lg font-bold text-foreground mb-4">Registrované účty v oddílu</h2>
            <?php 
              $allUsers = $pdo->query("SELECT * FROM users ORDER BY role ASC, id ASC")->fetchAll();
            ?>
            <div class="divide-y divide-border">
              <?php foreach ($allUsers as $u): ?>
                <div class="py-3 flex items-center justify-between text-xs gap-3">
                  <div>
                    <span class="font-bold text-foreground"><?= e($u['name']) ?></span>
                    <span class="text-muted-foreground ml-1">(@<?= e($u['username']) ?>)</span>
                    <span class="ml-2 rounded px-2 py-0.5 text-[0.65rem] font-bold <?= $u['role'] === 'admin' ? 'bg-emerald-600/20 text-emerald-700 dark:text-emerald-400' : ($u['role'] === 'trainer' ? 'bg-blue-600/20 text-blue-700 dark:text-blue-400' : 'bg-muted text-muted-foreground') ?>">
                      <?= e($u['role']) ?>
                    </span>
                    <p class="text-[0.7rem] text-muted-foreground mt-0.5">
                      Kategorie: <?= e($u['club_category'] ?? 'Plavec') ?> · Ročník <?= e($u['year_of_birth'] ?? '—') ?>
                    </p>
                  </div>
                  <?php if ($u['id'] !== $user['id']): ?>
                    <form method="post" action="admin.php?tab=users" onsubmit="return confirm('Smazat tohoto uživatele?');">
                      <input type="hidden" name="action" value="delete_user">
                      <input type="hidden" name="id" value="<?= $u['id'] ?>">
                      <button type="submit" class="text-red-500 hover:underline">Smazat</button>
                    </form>
                  <?php else: ?>
                    <span class="text-xs italic text-primary font-semibold">Váš účet</span>
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php endif; ?>

  </div>
<?php endif; ?>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
