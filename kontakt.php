<?php
/**
 * Klokani — Kontakty
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

$club = $seedData['club'] ?? [];

$pageTitle = 'Kontakt — Klokani | TJ Bohemians Praha';
$pageDescription = 'Kontakty na vedení oddílu TJ Bohemians Praha, trenéry a domácí bazény Podolí a Vinohrady.';
$currentPage = 'kontakt';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Spojte se s námi
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Kontakty</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Hlavní trenéři, vedení oddílu, bankovní spojení a informace o tréninkových bazénech.
        </p>
      </div>
    </div>
  </section>

  <!-- CONTACT SECTION -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-10">

    <!-- Hlavní trenéři & vedení (Live from SQLite) -->
    <div>
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Trenérský sbor</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Vedení oddílu a trenéři</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <?php foreach ($trainers as $t): ?>
          <div class="card-clean p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-display text-lg font-bold text-foreground"><?= e($t['name']) ?></h3>
                <span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary shrink-0">Oddíl</span>
              </div>
              <p class="text-xs font-semibold text-primary mt-1"><?= e($t['role']) ?></p>
              <?php if (!empty($t['bio'])): ?>
                <p class="mt-3 text-sm text-muted-foreground leading-relaxed"><?= e($t['bio']) ?></p>
              <?php endif; ?>
            </div>

            <div class="mt-6 border-t border-border pt-4 space-y-1.5 text-xs">
              <?php if (!empty($t['phone'])): ?>
                <div class="flex items-center gap-2 text-foreground font-medium">
                  <span class="text-muted-foreground">Telefon:</span>
                  <a href="tel:<?= preg_replace('/\s+/', '', $t['phone']) ?>" class="hover:text-primary"><?= e($t['phone']) ?></a>
                </div>
              <?php endif; ?>
              <?php if (!empty($t['email'])): ?>
                <div class="flex items-center gap-2 text-foreground font-medium">
                  <span class="text-muted-foreground">Email:</span>
                  <a href="mailto:<?= e($t['email']) ?>" class="text-primary hover:underline"><?= e($t['email']) ?></a>
                </div>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- DOMÁCÍ BAZÉNY -->
    <div>
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Kde plaveme</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Adresy bazénů</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="card-clean p-6">
          <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Hlavní stadion</span>
          <h3 class="mt-3 font-display text-lg font-bold text-foreground">Plavecký stadion Podolí</h3>
          <p class="mt-1 text-sm text-muted-foreground">Podolská 74, 147 00 Praha 4</p>
          <p class="mt-3 text-xs text-muted-foreground leading-relaxed">
            Závodní družstva A, B, C a Masters. Vnitřní i venkovní 50m bazén.
          </p>
          <div class="mt-4 pt-3 border-t border-border">
            <a href="https://maps.google.com/?q=Plavecký+stadion+Podolí" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline">
              Zobrazit na Google Maps &rarr;
            </a>
          </div>
        </div>

        <div class="card-clean p-6">
          <span class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-primary">Výuka & Přípravka</span>
          <h3 class="mt-3 font-display text-lg font-bold text-foreground">Bazén Vinohrady (Sokol)</h3>
          <p class="mt-1 text-sm text-muted-foreground">Polská 2400/1a, 120 00 Praha 2</p>
          <p class="mt-3 text-xs text-muted-foreground leading-relaxed">
            Přípravka a kurzy základního plavání pro děti.
          </p>
          <div class="mt-4 pt-3 border-t border-border">
            <a href="https://maps.google.com/?q=Polská+2400/1a,+Praha+2" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline">
              Zobrazit na Google Maps &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SPOLEČNOST & IDENTIFIKACE -->
    <div class="card-clean p-6 bg-muted/30">
      <h3 class="font-display text-base font-bold text-foreground">Oddílové údaje</h3>
      <div class="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
        <div>
          <strong class="text-foreground">Název:</strong> TJ Bohemians Praha — oddíl plavání
        </div>
        <div>
          <strong class="text-foreground">IČO:</strong> 00539121
        </div>
        <div>
          <strong class="text-foreground">Bankovní účet:</strong> 123456789/0300 (ČSOB)
        </div>
      </div>
    </div>

  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
