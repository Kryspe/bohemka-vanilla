<?php
/**
 * Klokani — Dokumenty ke stažení
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();

$catFilter = $_GET['cat'] ?? 'all';
$search = trim($_GET['q'] ?? '');

$sql = "SELECT * FROM downloads WHERE 1=1";
$params = [];

if ($catFilter !== 'all' && !empty($catFilter)) {
    $sql .= " AND category = :cat";
    $params[':cat'] = $catFilter;
}
if (!empty($search)) {
    $sql .= " AND (title LIKE :q OR description LIKE :q)";
    $params[':q'] = '%' . $search . '%';
}
$sql .= " ORDER BY date DESC, id DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$downloads = $stmt->fetchAll();

$categories = [
    'all' => 'Všechny dokumenty',
    'Organizace & Rozvrhy' => 'Rozvrhy & Platby',
    'Pravidla & Metodika' => 'Pravidla plavání',
    'Formuláře & Členství' => 'Formuláře & Prohlídky',
    'Soustředění' => 'Soustředění',
    'Statistika & Historie' => 'Historie & Ročenky',
];

$pageTitle = 'Ke stažení — Klokani | TJ Bohemians Praha';
$pageDescription = 'Dokumenty plaveckého oddílu TJ Bohemians Praha — rozřazení do skupin, rozvrhy, formuláře lékařských prohlídek a pravidla.';
$currentPage = 'ke-stazeni';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Oficiální dokumenty oddílu
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Ke stažení</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Dokumenty plaveckého oddílu TJ Bohemians Praha — rozřazení do skupin, rozvrhy tréninků, platby příspěvků, pravidla plavání a formuláře lékařských prohlídek.
        </p>
      </div>
    </div>
  </section>

  <!-- DOWNLOADS SECTION -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-10">

    <!-- Filter & Search Controls -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
      <div class="flex items-center gap-2 overflow-x-auto pb-1">
        <?php foreach ($categories as $catKey => $catLabel): ?>
          <a href="ke-stazeni.php?cat=<?= urlencode($catKey) ?>" 
             class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors shrink-0 <?= $catFilter === $catKey ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground' ?>">
            <?= e($catLabel) ?>
          </a>
        <?php endforeach; ?>
      </div>

      <form method="get" action="ke-stazeni.php" class="relative w-full sm:w-72">
        <?php if ($catFilter !== 'all'): ?>
          <input type="hidden" name="cat" value="<?= e($catFilter) ?>">
        <?php endif; ?>
        <input type="text" name="q" value="<?= e($search) ?>" placeholder="Hledat v dokumentech..."
               class="w-full rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none">
      </form>
    </div>

    <!-- Downloads Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($downloads as $dl): ?>
        <div class="card-clean p-5 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="rounded bg-primary/10 px-2 py-0.5 font-bold text-primary"><?= e($dl['category']) ?></span>
              <span class="text-muted-foreground font-mono"><?= e($dl['size']) ?></span>
            </div>
            <h3 class="font-display text-base font-bold text-foreground leading-snug"><?= e($dl['title']) ?></h3>
            <p class="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3"><?= e($dl['description']) ?></p>
          </div>

          <div class="mt-5 pt-3 border-t border-border flex items-center justify-between">
            <span class="text-[0.7rem] text-muted-foreground"><?= e($dl['date']) ?></span>
            <a href="<?= e($dl['official_url']) ?>" target="_blank" rel="noreferrer" 
               class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              <span>Stáhnout PDF</span>
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg>
            </a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Doctor Check Box -->
    <div class="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Upozornění pro plavce a rodiče
          </div>
          <h3 class="mt-3 text-lg font-bold text-foreground">Zdravotní prohlídky a lékařská způsobilost</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Každý aktivní plavec závodních družstev (ST, ODA, Výběr, Přípravka) musí mít platnou lékařskou prohlídku o sportovní způsobilosti (ne starší než 12 měsíců) potvrzenou sportovním nebo praktickým lékařem. Formulář odevzdejte svému trenérovi.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <a href="https://www.boh.cz/download/formular_zdravotni_prohlidka.pdf" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:opacity-95">
            Stáhnout formulář prohlídky
          </a>
          <a href="pro-rodice.php" class="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-muted">
            Informace pro rodiče &rarr;
          </a>
        </div>
      </div>
    </div>

  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
