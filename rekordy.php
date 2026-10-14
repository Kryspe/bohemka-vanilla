<?php
/**
 * Klokani — Oddílové rekordy
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();

$poolFilter = $_GET['pool'] ?? 'all';
$genderFilter = $_GET['gender'] ?? 'all';

$sql = "SELECT * FROM records WHERE 1=1";
$params = [];

if ($poolFilter !== 'all' && in_array($poolFilter, ['25m', '50m'])) {
    $sql .= " AND pool = :pool";
    $params[':pool'] = $poolFilter;
}
if ($genderFilter !== 'all' && in_array($genderFilter, ['Muži', 'Ženy'])) {
    $sql .= " AND gender = :gender";
    $params[':gender'] = $genderFilter;
}

$sql .= " ORDER BY pool ASC, gender ASC, id ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$records = $stmt->fetchAll();

$pageTitle = 'Oddílové rekordy — Klokani | TJ Bohemians Praha';
$pageDescription = 'Historicky nejlepší výkony plavců TJ Bohemians Praha v 25m a 50m bazénech.';
$currentPage = 'rekordy';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Historická síň slávy
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Oddílové rekordy</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Historicky nejlepší výkony plavců TJ Bohemians Praha v 25m a 50m bazénech.
        </p>
      </div>
    </div>
  </section>

  <!-- RECORDS CONTENT -->
  <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <!-- Filters -->
    <div class="mb-8 flex flex-wrap gap-4 items-center">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bazén:</span>
        <div class="flex gap-1 rounded-lg border border-border bg-card p-1">
          <a href="rekordy?pool=all&gender=<?= urlencode($genderFilter) ?>" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $poolFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            Vše
          </a>
          <a href="rekordy?pool=25m&gender=<?= urlencode($genderFilter) ?>" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $poolFilter === '25m' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            25 m
          </a>
          <a href="rekordy?pool=50m&gender=<?= urlencode($genderFilter) ?>" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $poolFilter === '50m' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            50 m
          </a>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategorie:</span>
        <div class="flex gap-1 rounded-lg border border-border bg-card p-1">
          <a href="rekordy?pool=<?= urlencode($poolFilter) ?>&gender=all" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $genderFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            Vše
          </a>
          <a href="rekordy?pool=<?= urlencode($poolFilter) ?>&gender=Muži" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $genderFilter === 'Muži' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            Muži
          </a>
          <a href="rekordy?pool=<?= urlencode($poolFilter) ?>&gender=Ženy" 
             class="rounded-md px-3 py-1 text-xs font-semibold transition-colors <?= $genderFilter === 'Ženy' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground' ?>">
            Ženy
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Stacked Cards -->
    <div class="grid gap-3 sm:hidden">
      <?php foreach ($records as $r): ?>
        <div class="card-clean p-4">
          <div class="flex items-center justify-between">
            <span class="font-display text-base font-bold text-foreground"><?= e($r['event']) ?></span>
            <span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary"><?= e($r['pool']) ?> · <?= e($r['gender']) ?></span>
          </div>
          <div class="mt-2 flex items-baseline justify-between">
            <span class="font-mono text-xl font-black text-primary"><?= e($r['time']) ?></span>
            <span class="text-xs font-semibold text-foreground"><?= e($r['swimmer_name']) ?></span>
          </div>
          <div class="mt-1 text-right text-[0.7rem] text-muted-foreground">
            <?= e($r['note']) ?> <?= !empty($r['year']) ? '(' . e($r['year']) . ')' : '' ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Desktop Table -->
    <div class="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-xs sm:block">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px] text-left text-sm">
          <thead class="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border font-bold">
            <tr>
              <th class="px-5 py-3.5">Disciplína</th>
              <th class="px-5 py-3.5">Bazén</th>
              <th class="px-5 py-3.5">Kategorie</th>
              <th class="px-5 py-3.5">Čas</th>
              <th class="px-5 py-3.5">Držitel rekordu</th>
              <th class="px-5 py-3.5">Datum a místo</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <?php foreach ($records as $r): ?>
              <tr class="hover:bg-muted/30 transition-colors">
                <td class="px-5 py-3 font-semibold text-foreground"><?= e($r['event']) ?></td>
                <td class="px-5 py-3 font-bold text-primary"><?= e($r['pool']) ?></td>
                <td class="px-5 py-3 text-muted-foreground"><?= e($r['gender']) ?></td>
                <td class="px-5 py-3 font-mono font-bold text-foreground text-base"><?= e($r['time']) ?></td>
                <td class="px-5 py-3 font-medium text-foreground"><?= e($r['swimmer_name']) ?></td>
                <td class="px-5 py-3 text-xs text-muted-foreground"><?= e($r['note']) ?> <?= !empty($r['year']) ? '(' . e($r['year']) . ')' : '' ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
