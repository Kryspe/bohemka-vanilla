<?php
/**
 * Klokani — O oddílu & Bazény
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$trainers = $pdo->query("SELECT * FROM trainers ORDER BY id ASC")->fetchAll();

$seedData = [];
$seedFile = __DIR__ . '/includes/seed_data.json';
if (file_exists($seedFile)) {
    $seedData = json_decode(file_get_contents($seedFile), true) ?: [];
}

$groups = $seedData['groups'] ?? [];
$merch = $seedData['merch'] ?? [];
$history = $seedData['history'] ?? [];

$pageTitle = 'O oddílu — Klokani | TJ Bohemians Praha';
$pageDescription = 'Plavecký oddíl TJ Bohemians Praha — historie od roku 1946, tréninkové skupiny, trenéři, bazény Podolí a Vinohrady.';
$currentPage = 'oddil';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Tradice od roku 1946 · Už to spolu táhnem 80 let
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">O oddílu Bohemians</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Plavecký oddíl TJ Bohemians Praha slaví 80 let existence (1946–2026). Vychoval mnoho špičkových sportovců — účastníků olympijských her, mistrovství světa i Evropy. A děti učí plavat dodnes.
        </p>
      </div>
    </div>
  </section>

  <!-- STATS COUNTER BAR — Oddíl klíčová čísla -->
  <section class="border-b border-border/60 bg-zinc-50/70 dark:bg-zinc-900/40 py-4 sm:py-5">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 md:divide-x md:divide-border/60">
        <div class="flex items-center gap-3 px-2 sm:px-4 justify-start sm:justify-center">
          <span class="font-display text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">80</span>
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider leading-tight">let<br>tradice (1946)</span>
        </div>
        <div class="flex items-center gap-3 px-2 sm:px-4 justify-start sm:justify-center">
          <span class="font-display text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">7</span>
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider leading-tight">tréninkových<br>skupin</span>
        </div>
        <div class="flex items-center gap-3 px-2 sm:px-4 justify-start sm:justify-center">
          <span class="font-display text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">18</span>
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider leading-tight">medailí<br>MČR 2026</span>
        </div>
        <div class="flex items-center gap-3 px-2 sm:px-4 justify-start sm:justify-center">
          <span class="font-display text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">2</span>
          <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider leading-tight">domácí bazény<br>Podolí &amp; Vinohrady</span>
        </div>
      </div>
    </div>
  </section>

  <!-- STRUKTURA & SKUPINY -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="border-b border-border pb-3 mb-6">
      <p class="text-xs font-bold uppercase tracking-wider text-primary">Koncepce výchovy</p>
      <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Tréninkové skupiny oddílu</h2>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($groups as $g): ?>
        <div class="card-clean p-6 flex flex-col justify-between">
          <div>
            <span class="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <?= e($g['code']) ?>
            </span>
            <h3 class="mt-3 font-display text-lg font-bold text-foreground"><?= e($g['name']) ?></h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground"><?= e($g['description']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <p class="mt-6 text-sm text-muted-foreground">
      Výkonnostně nejlepší družstva vedou trenéři s nejvyšším trenérským vzděláním v ČR. Trenéři Jan Srb a Kateřina Holubová jsou absolventy FTVS UK v Praze — držitelé trenérské licence I. třídy.
    </p>
  </section>

  <!-- TRENÉŘI (Live from SQLite) -->
  <section class="border-t border-border/70 bg-card py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Vedení a trenérský tým</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Trenéři oddílu Klokanů</h2>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <?php foreach ($trainers as $t): ?>
          <div class="card-clean p-5 bg-background">
            <h3 class="font-display text-base font-bold text-foreground"><?= e($t['name']) ?></h3>
            <p class="text-xs font-semibold text-primary mt-0.5"><?= e($t['role']) ?></p>
            <?php if (!empty($t['bio'])): ?>
              <p class="mt-2 text-xs text-muted-foreground leading-relaxed"><?= e($t['bio']) ?></p>
            <?php endif; ?>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-2">
              <?php if (!empty($t['email'])): ?>
                <a href="mailto:<?= e($t['email']) ?>" class="hover:text-primary">✉️ <?= e($t['email']) ?></a>
              <?php endif; ?>
              <?php if (!empty($t['phone'])): ?>
                <span>📞 <?= e($t['phone']) ?></span>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- HISTORIE -->
  <section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
    <div class="border-b border-border pb-3 mb-8">
      <p class="text-xs font-bold uppercase tracking-wider text-primary">Milníky</p>
      <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Historie v letech (1946–2026)</h2>
    </div>

    <ol class="space-y-0 border-l border-border pl-6 space-y-6">
      <?php foreach ($history as $h): ?>
        <li class="relative">
          <span class="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background"></span>
          <span class="font-display text-xl font-extrabold text-primary"><?= e($h['year']) ?></span>
          <p class="mt-1 leading-relaxed text-muted-foreground text-sm"><?= e($h['text']) ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </section>

  <!-- MERCH -->
  <section class="border-t border-border/70 bg-card py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="border-b border-border pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Oddílový merch & vybavení</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Nabídka věcí a bazar</h2>
          <p class="mt-1 text-sm text-muted-foreground">
            Oficiální oddílové soupravy, závodní čepičky, plavky a trička Bohemians.
          </p>
        </div>
        <div class="rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-xs text-muted-foreground">
          Objednávky a výdej probíhá přímo u trenérů na bazénech Podolí a Vinohrady.
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <?php foreach ($merch as $m): ?>
          <div class="card-clean p-5 flex flex-col justify-between bg-background">
            <div>
              <div class="flex items-center justify-between gap-2 text-xs">
                <span class="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary"><?= e($m['category']) ?></span>
                <span class="font-mono font-bold text-primary"><?= e($m['price']) ?></span>
              </div>
              <h3 class="mt-3 font-display text-base font-bold text-foreground"><?= e($m['title']) ?></h3>
              <p class="mt-2 text-xs leading-relaxed text-muted-foreground"><?= e($m['description']) ?></p>
            </div>
            <div class="mt-4 border-t border-border pt-3 text-[0.7rem] text-muted-foreground flex items-center justify-between">
              <span><?= e($m['availability']) ?></span>
              <span class="rounded bg-muted px-1.5 py-0.5 font-semibold text-[0.65rem]"><?= e($m['badge']) ?></span>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
