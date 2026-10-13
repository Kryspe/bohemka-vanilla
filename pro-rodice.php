<?php
/**
 * Klokani — Pro rodiče
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();
$messages = $pdo->query("SELECT * FROM parent_messages ORDER BY id DESC")->fetchAll();

$pageTitle = 'Pro rodiče — Klokani | TJ Bohemians Praha';
$pageDescription = 'Informace pro rodiče plavců TJ Bohemians — vzkazy trenérů, lékařské posudky, platby a organizace tréninků.';
$currentPage = 'pro-rodice';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- PAGE HEADER -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Klokani pro rodiče
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Informace pro rodiče plavců</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Vše podstatné pro hladký průběh sezóny — aktuální vzkazy od trenérů, lékařské posudky, platby členských příspěvků a organizace tréninků v Podolí a na Vinohradech.
        </p>
      </div>
    </div>
  </section>

  <!-- CONTENT SECTION -->
  <section class="mx-auto max-w-5xl px-4 py-12 sm:px-6 space-y-10">

    <!-- UPOZORNĚNÍ: NÁBOR DO PŘÍPRAVKY -->
    <div class="card-clean p-6 border-l-4 border-l-primary bg-emerald-500/[0.04]">
      <div class="flex items-start gap-3">
        <div class="rounded-lg bg-primary/10 p-2 text-primary shrink-0 mt-0.5">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div>
          <h2 class="font-display text-lg font-bold text-foreground">Stav náboru do závodní přípravky (6–12 let)</h2>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            Nábor do závodní přípravky pro aktuální pololetí byl z kapacitních důvodů <strong>uzavřen</strong>. Rodiče dětí se zájmem o základní plavecké kurzy a zdokonalovací výuku mohou využít nabídku oddílového webu kurzů:
          </p>
          <div class="mt-3">
            <a href="https://kurzy.boh.cz" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <span>Přejít na kurzy pro děti: kurzy.boh.cz</span> &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- AKTUÁLNÍ VZKAZY PRO RODIČE (Live from SQLite) -->
    <div>
      <div class="flex items-center justify-between border-b border-border pb-3 mb-6">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Nástěnka trenérů</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Aktuální vzkazy pro rodiče</h2>
        </div>
        <span class="text-xs text-muted-foreground">Aktualizováno v reálném čase</span>
      </div>

      <div class="space-y-4">
        <?php foreach ($messages as $msg): ?>
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
              <h3 class="text-base font-bold text-foreground mt-1"><?= e($msg['title'] ?? 'Vzkaz oddílu') ?></h3>
              <p class="mt-1 text-sm text-foreground/90 leading-relaxed"><?= nl2br(e($msg['text'])) ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- 3 ZÁKLADNÍ POVINNOSTI RODIČE V SEZÓNĚ -->
    <div>
      <div class="border-b border-border pb-3 mb-6">
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Průvodce sezónou</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold text-foreground">Co je nutné zařídit na začátku sezóny</h2>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <!-- Step 1 -->
        <div class="card-clean p-6 flex flex-col justify-between">
          <div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-display text-base font-black text-primary mb-3">
              1
            </div>
            <h3 class="font-display text-base font-bold text-foreground">Zdravotní prohlídka (posudek)</h3>
            <p class="mt-2 text-xs text-muted-foreground leading-relaxed">
              Každý aktivní závodní plavec musí mít platný lékařský posudek o zdravotní způsobilosti k tělesné výchově a sportu (platnost 1 rok).
            </p>
          </div>
          <div class="mt-5 pt-3 border-t border-border">
            <a href="https://www.boh.cz/download/formular_zdravotni_prohlidka.pdf" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <span>Stáhnout formulář posudku (PDF)</span> &rarr;
            </a>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="card-clean p-6 flex flex-col justify-between">
          <div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-display text-base font-black text-primary mb-3">
              2
            </div>
            <h3 class="font-display text-base font-bold text-foreground">Členské příspěvky</h3>
            <p class="mt-2 text-xs text-muted-foreground leading-relaxed">
              Platby členských příspěvků na účet TJ Bohemians Praha: <strong>123456789/0300 (ČSOB)</strong>. Variabilní symbol: rodné číslo plavce bez lomítka.
            </p>
          </div>
          <div class="mt-5 pt-3 border-t border-border">
            <a href="ke-stazeni.php" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <span>Rozpis výše plateb 2026/27</span> &rarr;
            </a>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="card-clean p-6 flex flex-col justify-between">
          <div>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-display text-base font-black text-primary mb-3">
              3
            </div>
            <h3 class="font-display text-base font-bold text-foreground">Přihlašování na závody</h3>
            <p class="mt-2 text-xs text-muted-foreground leading-relaxed">
              Přihlášky na jednotlivé závody se provádějí včas přes členský Intranet. Sledujte termíny uzávěrek v kalendáři závodů.
            </p>
          </div>
          <div class="mt-5 pt-3 border-t border-border">
            <a href="intranet.php" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              <span>Vstoupit do Intranetu</span> &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>

  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
