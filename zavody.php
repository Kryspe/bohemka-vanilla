<?php
/**
 * Klokani — Kalendář závodů
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$events = $pdo->query("SELECT * FROM events ORDER BY date ASC")->fetchAll();
$user = currentUser();

$signedUpMap = [];
if ($user) {
    $stmtMy = $pdo->prepare("SELECT event_id FROM event_entries WHERE user_id = :user_id");
    $stmtMy->execute([':user_id' => $user['id']]);
    $signedUpMap = $stmtMy->fetchAll(PDO::FETCH_COLUMN, 0);
}

$pageTitle = 'Závody — Klokani | TJ Bohemians Praha';
$pageDescription = 'Přehled nadcházejících závodů a soustředění s termíny přihlášek pro plavce oddílu Klokani.';
$currentPage = 'zavody';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Termínová listina
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Kalendář závodů</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Přehled nadcházejících plaveckých závodů, pohárů a soustředění s termíny přihlášek. Přihlašování probíhá přes členský Intranet.
        </p>
      </div>
    </div>
  </section>

  <!-- EVENTS GRID -->
  <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($events as $e): ?>
        <?php 
          $discs = json_decode($e['disciplines_json'] ?? '[]', true) ?: [];
          $isOpen = ($e['status'] === 'open');
          $isSigned = in_array($e['id'], $signedUpMap);
        ?>
        <div class="card-clean p-5 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-start justify-between gap-2">
              <span class="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                Závod ČSPS
              </span>
              <?php if (!$isOpen): ?>
                <span class="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  Uzavřeno
                </span>
              <?php elseif ($isSigned): ?>
                <span class="rounded-md bg-emerald-600/15 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Přihlášeno
                </span>
              <?php else: ?>
                <span class="rounded-md bg-emerald-600/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  Přihlášky otevřeny
                </span>
              <?php endif; ?>
            </div>

            <h3 class="mt-3 font-display text-base font-bold text-foreground leading-snug">
              <?= e($e['name']) ?>
            </h3>

            <div class="mt-2.5 space-y-1 text-xs text-muted-foreground">
              <div class="flex items-center gap-1.5">
                <svg class="h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span><?= e($e['place']) ?></span>
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="h-3.5 w-3.5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                <span>Datum: <?= date('d. m. Y', strtotime($e['date'])) ?></span>
              </div>
            </div>

            <?php if (!empty($discs)): ?>
              <div class="mt-4 flex flex-wrap gap-1">
                <?php foreach (array_slice($discs, 0, 6) as $d): ?>
                  <span class="rounded bg-muted px-1.5 py-0.5 text-[0.68rem] font-medium text-foreground"><?= e($d) ?></span>
                <?php endforeach; ?>
                <?php if (count($discs) > 6): ?>
                  <span class="rounded bg-muted px-1.5 py-0.5 text-[0.68rem] text-muted-foreground">+<?= count($discs) - 6 ?></span>
                <?php endif; ?>
              </div>
            <?php endif; ?>
          </div>

          <div class="mt-6 flex items-center justify-between border-t border-border pt-3">
            <span class="text-xs text-muted-foreground">
              Uzávěrka: <?= date('d. m. Y', strtotime($e['deadline'])) ?>
            </span>

            <?php if (!$isOpen): ?>
              <span class="inline-flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground cursor-not-allowed">
                Uzavřeno
              </span>
            <?php else: ?>
              <a href="intranet.php#zavody" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-90">
                <?= $isSigned ? 'Upravit v Intranetu' : 'Přihlásit se' ?> &rarr;
              </a>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
