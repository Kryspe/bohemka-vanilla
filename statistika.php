<?php
/**
 * Klokani — Oddílová statistika & Štafety
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$yearbooks = $pdo->query("SELECT * FROM yearbooks ORDER BY year DESC")->fetchAll();

$seedData = [];
$seedFile = __DIR__ . '/includes/seed_data.json';
if (file_exists($seedFile)) {
    $seedData = json_decode(file_get_contents($seedFile), true) ?: [];
}
$relays = $seedData['relays'] ?? [];

$pageTitle = 'Statistika & Ročenky — Klokani | TJ Bohemians Praha';
$pageDescription = 'Kompletní přehled oddílových štafetových výkonů, rekordů a digitalizovaný archiv ročenek TJ Bohemians Praha v PDF.';
$currentPage = 'statistika';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Historická data oddílu
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Oddílová statistika & Štafety</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Kompletní přehled oddílových štafetových výkonů, rekordů a digitalizovaný archiv ročenek TJ Bohemians Praha v PDF.
        </p>
        <div class="mt-6 flex flex-wrap gap-2.5">
          <a href="rekordy.php" class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
            <span>Rekordy jednotlivců</span> &rarr;
          </a>
          <a href="ke-stazeni.php" class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
            <span>Dokumenty ke stažení</span> &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-12">

    <!-- HISTORICKÉ ŠTAFETY -->
    <div>
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Klubové rekordy</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Oddílové štafety</h2>
      </div>

      <div class="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-border bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-5 py-3.5">Disciplína</th>
              <th class="px-5 py-3.5">Bazén</th>
              <th class="px-5 py-3.5">Kategorie</th>
              <th class="px-5 py-3.5 font-mono">Čas</th>
              <th class="px-5 py-3.5">Sestava štafety</th>
              <th class="px-5 py-3.5">Rok / Akce</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <?php foreach ($relays as $rel): ?>
              <tr class="hover:bg-muted/30 transition-colors">
                <td class="px-5 py-3 font-semibold text-foreground"><?= e($rel['event']) ?></td>
                <td class="px-5 py-3 font-bold text-primary"><?= e($rel['pool']) ?></td>
                <td class="px-5 py-3 text-muted-foreground"><?= e($rel['gender']) ?></td>
                <td class="px-5 py-3 font-mono font-bold text-foreground text-base"><?= e($rel['time']) ?></td>
                <td class="px-5 py-3 text-xs text-foreground/90 font-medium"><?= e($rel['swimmers']) ?></td>
                <td class="px-5 py-3 text-xs text-muted-foreground"><?= e($rel['date']) ?> <?= !empty($rel['place']) ? '· ' . e($rel['place']) : '' ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ROČENKY V PDF (Live from SQLite) -->
    <div>
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Archiv oddílu</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Historické ročenky PDF</h2>
        <p class="mt-1 text-xs text-muted-foreground">Digitalizované ročenky s výkony všech plavců Bohemians od roku 1956 po současnost.</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <?php foreach ($yearbooks as $yb): ?>
          <a href="<?= e($yb['file_url']) ?>" target="_blank" rel="noreferrer" class="card-clean p-4 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div>
              <div class="flex items-center justify-between text-xs">
                <span class="rounded bg-primary/10 px-2 py-0.5 font-display text-sm font-black text-primary"><?= e($yb['year']) ?></span>
                <span class="text-[0.7rem] text-muted-foreground font-mono"><?= e($yb['file_size']) ?></span>
              </div>
              <h3 class="mt-2.5 font-display text-xs font-bold text-foreground leading-snug line-clamp-2"><?= e($yb['title']) ?></h3>
            </div>
            <div class="mt-3 pt-2 border-t border-border flex items-center justify-between text-[0.7rem] text-primary font-semibold">
              <span>Stáhnout PDF</span>
              <span>&darr;</span>
            </div>
          </a>
        <?php endforeach; ?>
      </div>
    </div>

  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
