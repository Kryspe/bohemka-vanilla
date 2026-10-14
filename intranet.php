<?php
/**
 * Klokani — Intranet (Portál pro plavce a rodiče)
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$user = currentUser();

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    logoutUser();
    header("Location: intranet.php");
    exit;
}

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (loginUser($username, $password)) {
        setFlash('success', 'Úspěšně přihlášen do intranetu.');
        header("Location: intranet.php");
        exit;
    } else {
        setFlash('error', 'Neplatné přihlašovací jméno nebo heslo. (Tip: plavec / bohemka)');
        header("Location: intranet.php");
        exit;
    }
}

// Handle Event Registration (Swimmer/Parent)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'register_event') {
    if (!$user) {
        header("Location: intranet.php");
        exit;
    }

    $eventId = trim($_POST['event_id'] ?? '');
    $disciplines = $_POST['disciplines'] ?? [];
    $note = trim($_POST['note'] ?? '');
    $swimmerName = !empty($_POST['swimmer_name']) ? trim($_POST['swimmer_name']) : $user['name'];

    if (!empty($eventId) && !empty($disciplines)) {
        // Check if entry already exists for this event and user
        $checkStmt = $pdo->prepare("SELECT id FROM event_entries WHERE event_id = :event_id AND user_id = :user_id LIMIT 1");
        $checkStmt->execute([':event_id' => $eventId, ':user_id' => $user['id']]);
        $existingId = $checkStmt->fetchColumn();

        $disciplinesJson = json_encode(array_values($disciplines), JSON_UNESCAPED_UNICODE);

        if ($existingId) {
            $updStmt = $pdo->prepare("
                UPDATE event_entries 
                SET disciplines_json = :disciplines_json, note = :note, swimmer_name = :swimmer_name 
                WHERE id = :id
            ");
            $updStmt->execute([
                ':disciplines_json' => $disciplinesJson,
                ':note' => $note,
                ':swimmer_name' => $swimmerName,
                ':id' => $existingId
            ]);
            setFlash('success', 'Přihláška na závody byla úspěšně upravena.');
        } else {
            $insStmt = $pdo->prepare("
                INSERT INTO event_entries (event_id, user_id, swimmer_name, disciplines_json, note)
                VALUES (:event_id, :user_id, :swimmer_name, :disciplines_json, :note)
            ");
            $insStmt->execute([
                ':event_id' => $eventId,
                ':user_id' => $user['id'],
                ':swimmer_name' => $swimmerName,
                ':disciplines_json' => $disciplinesJson,
                ':note' => $note
            ]);
            setFlash('success', 'Byli jste úspěšně přihlášeni na závody.');
        }
    } else {
        setFlash('error', 'Musíte vybrat alespoň jednu plaveckou disciplínu.');
    }

    header("Location: intranet.php#zavody");
    exit;
}

// Handle Cancel Entry
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'cancel_entry') {
    if (!$user) {
        header("Location: intranet.php");
        exit;
    }

    $entryId = (int)($_POST['entry_id'] ?? 0);
    if ($entryId > 0) {
        $delStmt = $pdo->prepare("DELETE FROM event_entries WHERE id = :id AND (user_id = :user_id OR :is_admin = 1)");
        $delStmt->execute([
            ':id' => $entryId,
            ':user_id' => $user['id'],
            ':is_admin' => isAdmin() ? 1 : 0
        ]);
        setFlash('success', 'Přihláška byla zrušena.');
    }
    header("Location: intranet.php#moje-prihlasky");
    exit;
}

// Fetch Data for Render
$events = $pdo->query("SELECT * FROM events ORDER BY date ASC")->fetchAll();
$parentMessages = $pdo->query("SELECT * FROM parent_messages ORDER BY id DESC LIMIT 10")->fetchAll();

$myEntries = [];
if ($user) {
    $stmtMy = $pdo->prepare("
        SELECT ee.*, e.name as event_name, e.place as event_place, e.date as event_date, e.deadline as event_deadline
        FROM event_entries ee
        JOIN events e ON ee.event_id = e.id
        WHERE ee.user_id = :user_id
        ORDER BY e.date ASC
    ");
    $stmtMy->execute([':user_id' => $user['id']]);
    $myEntries = $stmtMy->fetchAll();
}

// Map of entries keyed by event_id for quick lookup
$signedUpMap = [];
foreach ($myEntries as $entry) {
    $signedUpMap[$entry['event_id']] = $entry;
}

$pageTitle = 'Intranet pro plavce a rodiče — Klokani | TJ Bohemians Praha';
$pageDescription = 'Členská sekce oddílu Klokani — přihlášky na závody, vzkazy trenérů a tréninkové rozpisy.';
$currentPage = 'intranet';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

<?php if (!$user): ?>
  <!-- LOGIN SCREEN -->
  <section class="py-12 sm:py-20">
    <div class="mx-auto max-w-md px-4 sm:px-6">
      <div class="card-clean p-6 sm:p-8">
        <div class="text-center">
          <div class="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h1 class="mt-4 font-display text-2xl font-extrabold text-foreground">Intranet Klokanů</h1>
          <p class="mt-2 text-sm text-muted-foreground">Přihlášení pro plavce a rodiče do oddílového systému</p>
        </div>

        <form method="post" action="intranet.php" class="mt-6 space-y-4">
          <input type="hidden" name="action" value="login">

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5" for="username">Uživatelské jméno</label>
            <input type="text" id="username" name="username" required value="plavec" autocomplete="username"
                   class="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5" for="password">Heslo</label>
            <input type="password" id="password" name="password" required value="bohemka" autocomplete="current-password"
                   class="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-xs hover:opacity-95 transition-opacity">
              Přihlásit se do Intranetu
            </button>
          </div>
        </form>

        <div class="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>Výchozí demo účet pro plavce: <strong class="text-foreground">plavec</strong> / heslo: <strong class="text-foreground">bohemka</strong></p>
          <p class="mt-2">Jste trenér nebo správce? <a href="admin" class="font-semibold text-primary hover:underline">Přejít do administrace &rarr;</a></p>
        </div>
      </div>
    </div>
  </section>

<?php else: ?>
  <!-- LOGGED IN INTRANET DASHBOARD -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-8 sm:py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
            Přihlášený uživatel · <?= e($user['role'] === 'admin' ? 'Správce' : ($user['role'] === 'trainer' ? 'Trenér' : 'Plavec / Rodič')) ?>
          </div>
          <h1 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Vítej v Intranetu, <?= e($user['name']) ?>!
          </h1>
          <p class="mt-1 text-sm text-muted-foreground">
            Oddílová sekce: <?= e($user['club_category'] ?? 'Závodní plavání') ?> · Ročník <?= e($user['year_of_birth'] ?? '2010') ?>
          </p>
        </div>

        <div class="flex items-center gap-2">
          <?php if (in_array($user['role'], ['admin', 'trainer'])): ?>
            <a href="admin" class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              <span>Vstup do Administrace</span>
            </a>
          <?php endif; ?>
          <a href="intranet?action=logout" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
            <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>Odhlásit se</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-12">

    <!-- 1. MOJE PŘIHLÁŠKY -->
    <section id="moje-prihlasky">
      <div class="flex items-center justify-between border-b border-border pb-3 mb-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Moje závody</span>
          <h2 class="mt-1 font-display text-xl sm:text-2xl font-extrabold text-foreground">Aktivní přihlášky k závodům</h2>
        </div>
        <span class="text-xs font-semibold rounded-full bg-primary/10 px-2.5 py-1 text-primary">
          <?= count($myEntries) ?> přihlášeno
        </span>
      </div>

      <?php if (empty($myEntries)): ?>
        <div class="card-clean p-8 text-center">
          <p class="text-sm text-muted-foreground">Zatím nemáte podanou žádnou přihlášku na závody.</p>
          <a href="#zavody" class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            Vybrat závod z kalendáře níže &darr;
          </a>
        </div>
      <?php else: ?>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <?php foreach ($myEntries as $entry): ?>
            <?php 
              $discList = json_decode($entry['disciplines_json'] ?? '[]', true) ?: [];
            ?>
            <div class="card-clean p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-primary font-semibold mb-1">
                  <span><?= date('d. m. Y', strtotime($entry['event_date'])) ?></span>
                  <span class="rounded bg-emerald-600/10 px-2 py-0.5 text-[0.7rem] text-emerald-700 dark:text-emerald-400">Přihlášeno</span>
                </div>
                <h3 class="font-display text-base font-bold text-foreground leading-snug"><?= e($entry['event_name']) ?></h3>
                <p class="text-xs text-muted-foreground mt-0.5"><?= e($entry['event_place']) ?></p>

                <div class="mt-4 border-t border-border pt-3">
                  <p class="text-xs font-bold text-foreground mb-1.5">Zvolené disciplíny:</p>
                  <div class="flex flex-wrap gap-1">
                    <?php foreach ($discList as $d): ?>
                      <span class="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground"><?= e($d) ?></span>
                    <?php endforeach; ?>
                  </div>
                  <?php if (!empty($entry['note'])): ?>
                    <p class="mt-2 text-xs italic text-muted-foreground">Poznámka: <?= e($entry['note']) ?></p>
                  <?php endif; ?>
                </div>
              </div>

              <div class="mt-5 border-t border-border pt-3 flex items-center justify-between">
                <span class="text-[0.7rem] text-muted-foreground">Podáno: <?= date('d.m. H:i', strtotime($entry['created_at'])) ?></span>
                <form method="post" action="intranet.php" onsubmit="return confirm('Opravdu chcete zrušit přihlášku na tento závod?');">
                  <input type="hidden" name="action" value="cancel_entry">
                  <input type="hidden" name="entry_id" value="<?= $entry['id'] ?>">
                  <button type="submit" class="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 hover:underline">
                    Zrušit přihlášku
                  </button>
                </form>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </section>

    <!-- 2. PŘIHLAŠOVÁNÍ NA ZÁVODY -->
    <section id="zavody">
      <div class="border-b border-border pb-3 mb-6">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Kalendář</span>
        <h2 class="mt-1 font-display text-xl sm:text-2xl font-extrabold text-foreground">Přihlašování na nadcházející závody</h2>
        <p class="mt-1 text-sm text-muted-foreground">Zaškrtněte disciplíny a potvrďte svou účast před uzávěrkou přihlášek.</p>
      </div>

      <div class="space-y-6">
        <?php foreach ($events as $ev): ?>
          <?php 
            $disciplines = json_decode($ev['disciplines_json'] ?? '[]', true) ?: [];
            $mySignup = $signedUpMap[$ev['id']] ?? null;
            $myDisciplines = $mySignup ? (json_decode($mySignup['disciplines_json'] ?? '[]', true) ?: []) : [];
            $isOpen = ($ev['status'] === 'open');
          ?>
          <div class="card-clean p-6 sm:p-7 <?= $mySignup ? 'border-primary/40 bg-emerald-500/[0.02]' : '' ?>">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>📅 <?= date('d. m. Y', strtotime($ev['date'])) ?></span>
                  <span>·</span>
                  <span class="text-muted-foreground">📍 <?= e($ev['place']) ?></span>
                  <span>·</span>
                  <span class="text-amber-700 dark:text-amber-400">Uzávěrka: <?= date('d. m. Y', strtotime($ev['deadline'])) ?></span>
                </div>
                <h3 class="mt-1 font-display text-xl font-bold text-foreground"><?= e($ev['name']) ?></h3>
              </div>

              <div>
                <?php if ($mySignup): ?>
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Jste přihlášeni
                  </span>
                <?php elseif (!$isOpen): ?>
                  <span class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    Přihlášky uzavřeny
                  </span>
                <?php else: ?>
                  <span class="inline-flex items-center rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Otevřeno pro přihlášky
                  </span>
                <?php endif; ?>
              </div>
            </div>

            <?php if ($isOpen): ?>
              <form method="post" action="intranet.php" class="mt-6 border-t border-border pt-4">
                <input type="hidden" name="action" value="register_event">
                <input type="hidden" name="event_id" value="<?= e($ev['id']) ?>">

                <p class="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  <?= $mySignup ? 'Upravit zvolené disciplíny:' : 'Vyberte disciplíny, které chcete plavat:' ?>
                </p>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  <?php foreach ($disciplines as $d): ?>
                    <?php $isChecked = in_array($d, $myDisciplines); ?>
                    <label class="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer transition-colors">
                      <input type="checkbox" name="disciplines[]" value="<?= e($d) ?>" <?= $isChecked ? 'checked' : '' ?>
                             class="h-4 w-4 rounded border-border text-primary focus:ring-primary">
                      <span><?= e($d) ?></span>
                    </label>
                  <?php endforeach; ?>
                </div>

                <div class="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div class="w-full sm:flex-1">
                    <input type="text" name="note" placeholder="Poznámka pro trenéra (např. odjezd autem, časy rozplaveb)" 
                           value="<?= e($mySignup['note'] ?? '') ?>"
                           class="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  </div>
                  <button type="submit" class="w-full sm:w-auto shrink-0 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95 transition-opacity">
                    <?= $mySignup ? 'Uložit změny v přihlášce' : 'Odeslat přihlášku na závody' ?>
                  </button>
                </div>
              </form>
            <?php else: ?>
              <p class="mt-4 text-xs text-muted-foreground italic">Tento závod má ukončený příjem přihlášek.</p>
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- 3. ODDÍLOVÉ VZKAZY A TRENÉRSKÁ NÁSTĚNKA -->
    <section id="vzkazy">
      <div class="border-b border-border pb-3 mb-6">
        <span class="text-xs font-bold uppercase tracking-wider text-primary">Nástěnka trenérů</span>
        <h2 class="mt-1 font-display text-xl sm:text-2xl font-extrabold text-foreground">Aktuální informace & instrukce</h2>
      </div>

      <div class="space-y-3">
        <?php foreach ($parentMessages as $msg): ?>
          <div class="card-clean p-5 flex items-start gap-3.5">
            <div class="rounded-lg bg-primary/10 p-2 text-primary shrink-0 mt-0.5">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2 text-xs text-primary font-semibold">
                <span><?= e($msg['category'] ?? 'Oddíl') ?></span>
                <?php if (!empty($msg['date'])): ?>
                  <span>·</span>
                  <span class="text-muted-foreground"><?= date('d. m. Y', strtotime($msg['date'])) ?></span>
                <?php endif; ?>
                <?php if (!empty($msg['author'])): ?>
                  <span>·</span>
                  <span class="text-muted-foreground"><?= e($msg['author']) ?></span>
                <?php endif; ?>
              </div>
              <p class="mt-1 text-sm text-foreground leading-relaxed"><?= nl2br(e($msg['text'])) ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- 4. TRÉNINKOVÉ INFORMACE A ROZPIS SKUPIN -->
    <section id="treninky">
      <div class="border-b border-border pb-3 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Tréninkový plán</span>
          <h2 class="mt-1 font-display text-xl sm:text-2xl font-extrabold text-foreground">Tréninkové informace & časy skupin</h2>
          <p class="mt-1 text-sm text-muted-foreground">Přehled tréninkových časů pro sezónu 2026/27 na stadionu Podolí a Vinohradech.</p>
        </div>
        <a href="https://www.boh.cz/download/165_rozdeleni_plavani_2026-27.pdf" target="_blank" rel="noreferrer" 
           class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted shrink-0">
          <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Kompletní rozvrh PDF</span>
        </a>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="card-clean p-5 flex flex-col justify-between">
          <div>
            <span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">ST & Dorost</span>
            <h3 class="mt-2.5 font-display text-base font-bold text-foreground">Sportovní třídy & Výběr</h3>
            <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Trenéři: Jan Srb, Kateřina Holubová. Ráno Vinohrady (6:00–7:30), odpoledne Podolí (14:30–17:00). Sobotní ranní tréninky dle kalendáře.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-border text-[0.7rem] text-muted-foreground font-medium">
            Místo: Podolí 50m / Vinohrady 25m
          </div>
        </div>

        <div class="card-clean p-5 flex flex-col justify-between">
          <div>
            <span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">ODA & ODB</span>
            <h3 class="mt-2.5 font-display text-base font-bold text-foreground">Oddílová družstva žactva</h3>
            <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Tréninky Po, St, Pá odpoledne (15:00–16:30) v Podolí a Út, Čt odpoledne na Vinohradech. Příprava na krajské přebory.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-border text-[0.7rem] text-muted-foreground font-medium">
            Místo: Podolí / Sokol Vinohrady
          </div>
        </div>

        <div class="card-clean p-5 flex flex-col justify-between">
          <div>
            <span class="rounded bg-emerald-600/10 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">Přípravka</span>
            <h3 class="mt-2.5 font-display text-base font-bold text-foreground">Závodní přípravka (6–12 let)</h3>
            <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              Tréninky 2× až 3× týdně v bazénu Vinohrady. Zaměření na techniku všech plaveckých způsobů, starty a obrátky.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-border text-[0.7rem] text-muted-foreground font-medium">
            Místo: Bazén Vinohrady (Polská 2400)
          </div>
        </div>
      </div>
    </section>

  </div>
<?php endif; ?>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
