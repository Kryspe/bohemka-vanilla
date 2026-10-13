<?php
/**
 * Klokani — Fotogalerie
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$seedData = [];
$seedFile = __DIR__ . '/includes/seed_data.json';
if (file_exists($seedFile)) {
    $seedData = json_decode(file_get_contents($seedFile), true) ?: [];
}
$photos = $seedData['galleries'] ?? [];

$pageTitle = 'Fotogalerie — Klokani | TJ Bohemians Praha';
$pageDescription = 'Momentky ze závodů, oslav a oddílového života plaveckého oddílu TJ Bohemians Praha.';
$currentPage = 'foto';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Zelenobílá rodina
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Fotogalerie</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Momentky ze závodů, oslav 80 let oddílu, soustředění a oddílového života Klokanů.
        </p>
      </div>
    </div>
  </section>

  <!-- PHOTOS GRID -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-12">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($photos as $ph): ?>
        <div class="card-clean overflow-hidden">
          <div class="relative h-64 w-full overflow-hidden bg-muted">
            <img src="<?= e($ph['url']) ?>" alt="<?= e($ph['title']) ?>" class="h-full w-full object-cover">
          </div>
          <div class="p-4">
            <h3 class="font-display text-base font-bold text-foreground"><?= e($ph['title']) ?></h3>
            <p class="mt-1 text-xs text-muted-foreground leading-relaxed"><?= e($ph['caption']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- ARCHIVE BOX -->
    <div class="card-clean p-6 sm:p-8">
      <h2 class="font-display text-xl font-bold text-foreground sm:text-2xl">Archiv fotogalerií na boh.cz</h2>
      <p class="mt-2 text-sm text-muted-foreground">Kompletní fotoreportáže z proběhlých závodů a akcí jsou k dispozici v archivu na oficiálním webu oddílu:</p>
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <a href="https://www.boh.cz/galerie/940/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl border border-border p-3.5 text-sm hover:border-primary/50 hover:text-primary transition-colors">
          <span class="font-medium">Oslava 80 let oddílu (foto David Děták)</span>
          <svg class="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
        <a href="https://www.boh.cz/galerie/939/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl border border-border p-3.5 text-sm hover:border-primary/50 hover:text-primary transition-colors">
          <span class="font-medium">Oslava 80 let oddílu (foto Petr Dvořák)</span>
          <svg class="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
        <a href="https://www.boh.cz/galerie/943/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl border border-border p-3.5 text-sm hover:border-primary/50 hover:text-primary transition-colors">
          <span class="font-medium">Pohár Lídy Jelínkové a Podzimní rožeň DP</span>
          <svg class="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
        <a href="https://www.boh.cz/galerie/941/" target="_blank" rel="noreferrer" class="flex items-center justify-between rounded-xl border border-border p-3.5 text-sm hover:border-primary/50 hover:text-primary transition-colors">
          <span class="font-medium">Malá cena plavajícího klokana (Vinohrady)</span>
          <svg class="h-4 w-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
        </a>
      </div>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
