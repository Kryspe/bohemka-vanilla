<?php
/**
 * Klokani — Úvodní stránka (Home)
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();

// 1. Latest parent notice for banner & focus box
$latestMessage = $pdo->query("SELECT * FROM parent_messages ORDER BY id DESC LIMIT 1")->fetch();

// 2. Upcoming nearest event
$nearestEvent = $pdo->query("SELECT * FROM events WHERE date >= date('now') ORDER BY date ASC LIMIT 1")->fetch();
if (!$nearestEvent) {
    $nearestEvent = $pdo->query("SELECT * FROM events ORDER BY date DESC LIMIT 1")->fetch();
}

$daysLeft = 0;
if ($nearestEvent && !empty($nearestEvent['date'])) {
    $eventTimestamp = strtotime($nearestEvent['date']);
    $todayTimestamp = strtotime(date('Y-m-d'));
    $daysLeft = max(0, (int)round(($eventTimestamp - $todayTimestamp) / 86400));
}

// 3. Latest news (top 3)
$latestNews = $pdo->query("SELECT * FROM news ORDER BY date DESC LIMIT 3")->fetchAll();

$pageTitle = 'Klokani — TJ Bohemians Praha | Plavecký oddíl od 1946';
$pageDescription = 'Plavecký oddíl TJ Bohemians Praha (Klokani) — tradice od roku 1946. Závodní plavání, přípravka, kurzy, závody, rekordy a aktuality.';
$currentPage = 'index';

require_once __DIR__ . '/includes/header.php';
?>


<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- HERO SECTION (KPS Ostrava inspired athletic split hero) -->
  <section class="relative overflow-hidden py-4 sm:py-6 lg:py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="hero-athletic hero-athletic-bg text-white">
        <div class="grid lg:grid-cols-12 items-stretch min-h-[480px]">

          <!-- Left: Club Motto, Wave & Action Buttons -->
          <div class="lg:col-span-7 flex flex-col justify-center p-6 sm:p-10 lg:p-12 z-10">
            <div class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-white/95 backdrop-blur-sm w-fit mb-4">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              80 let oddílu · 1946–2026 · TJ Bohemians Praha
            </div>

            <h1 class="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
              Jeden duch, jeden tým,<br><span class="text-emerald-300">jedno vítězství!</span>
            </h1>

            <div class="my-5 flex items-center">
              <span class="wave wave--md wave--light"></span>
            </div>

            <h2 class="text-lg sm:text-xl font-semibold text-emerald-100/95 leading-snug">
              Společně k nejlepším výkonům už od roku 1946
            </h2>

            <p class="mt-3 text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Jsme plavecký oddíl Klokanů. Vychováváme sportovce od dětských kurzů a přípravky až po reprezentaci na mistrovstvích republiky a Evropy. Domovské bazény: Plavecký stadion Podolí a Sokol Vinohrady.
            </p>
          </div>

          <!-- Right: High-impact Athletic Swimming Photo & Featured Notice -->
          <div class="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-emerald-950">
            <img src="assets/aktuality/86836.jpg" alt="Závody TJ Bohemians Praha" class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105" loading="eager">
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-black/30 lg:bg-gradient-to-r lg:from-emerald-950/80 lg:via-transparent lg:to-black/30"></div>

            <div class="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div class="rounded-2xl border border-white/20 bg-black/50 p-4 sm:p-5 backdrop-blur-md shadow-lg">
                <div class="flex items-center justify-between text-xs text-emerald-300">
                  <span class="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Aktualita z oddílu
                  </span>
                  <time class="font-semibold text-white/80">12. 10. 2026</time>
                </div>
                <h3 class="mt-2 font-display text-base sm:text-lg font-bold leading-snug text-white line-clamp-1">
                  Velká cena Prahy - hodnocení
                </h3>
                <p class="mt-1 line-clamp-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  Účast bohemáků byla slušná, závodní nasazení bylo dobré a padla řada osobních rekordů.
                </p>
                <div class="mt-3 flex items-center justify-between pt-2 border-t border-white/15 text-xs">
                  <span class="text-emerald-200/90 font-medium">Autor: Martin Břenda</span>
                  <a href="aktuality" class="font-bold text-white hover:text-emerald-300 inline-flex items-center gap-1">
                    Číst hodnocení &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ROZCESTNÍK -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-6">
      <p class="text-xs font-bold uppercase tracking-wider text-primary">Rychlý přístup</p>
      <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Co potřebujete vyřídit?</h2>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a href="pro-rodice" class="card-clean p-5 flex flex-col justify-between">
        <div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-primary mb-3">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="font-display text-lg font-bold text-foreground">Pro rodiče plavců</h3>
          <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Vzkazy trenérů, začátky tréninků, omluvenky a informace o náboru do přípravky.
          </p>
        </div>
        <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Otevřít vzkazy &rarr;
        </span>
      </a>

      <a href="zavody" class="card-clean p-5 flex flex-col justify-between">
        <div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-primary mb-3">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <h3 class="font-display text-lg font-bold text-foreground">Závody & Kalendář</h3>
          <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Rozpis všech závodů sezóny 2026/27, propozice v PDF, nominace a výsledky.
          </p>
        </div>
        <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Zobrazit kalendář &rarr;
        </span>
      </a>

      <a href="ke-stazeni" class="card-clean p-5 flex flex-col justify-between">
        <div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-primary mb-3">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg>
          </div>
          <h3 class="font-display text-lg font-bold text-foreground">Lékařské posudky & PDF</h3>
          <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Formulář zdravotní způsobilosti, přihláška člena, rozdělení do skupin a pravidla.
          </p>
        </div>
        <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Stáhnout formuláře &rarr;
        </span>
      </a>

      <a href="intranet" class="card-clean p-5 flex flex-col justify-between bg-emerald-500/[0.04]">
        <div>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-3">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 class="font-display text-lg font-bold text-foreground">Členský Intranet</h3>
          <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            Online přihlašování plavců na závody, kontrola výsledků a osobní profil člena.
          </p>
        </div>
        <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
          Přihlásit se do účtu &rarr;
        </span>
      </a>
    </div>
  </section>

  <!-- LIVE DASHBOARD: NEJBLIŽŠÍ ZÁVOD + DŮLEŽITÝ VZKAZ -->
  <section class="border-y border-border/70 bg-card py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid gap-6 md:grid-cols-2">

        <!-- Box 1: Nejbližší závod -->
        <div class="card-clean p-6 bg-background">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>Nejbližší závod v kalendáři</span>
            </div>
            <?php if ($nearestEvent): ?>
              <span class="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                <?= e(explode('–', $nearestEvent['place'])[0] ?? 'Plzeň') ?>
              </span>
            <?php endif; ?>
          </div>

          <?php if ($nearestEvent): ?>
            <div class="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 class="font-display text-xl font-extrabold text-foreground">
                  <?= e($nearestEvent['name']) ?>
                </h3>
                <p class="mt-1 text-sm text-muted-foreground">
                  <?= date('d. m. Y', strtotime($nearestEvent['date'])) ?> · <?= e($nearestEvent['place']) ?>
                </p>
                <p class="mt-2 text-xs text-muted-foreground">
                  Uzávěrka přihlášek: <?= date('d. m. Y', strtotime($nearestEvent['deadline'])) ?>.
                </p>
              </div>
              <div class="text-right shrink-0">
                <span class="font-display text-4xl font-black text-primary"><?= $daysLeft ?></span>
                <div class="text-xs font-medium text-muted-foreground">dní zbývá</div>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-border">
              <a href="zavody" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                <span>Detaily závodu</span> &rarr;
              </a>
              <a href="intranet#zavody" class="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted">
                <span>Přihláška v Intranetu</span>
              </a>
            </div>
          <?php endif; ?>
        </div>

        <!-- Box 2: Nejnovější vzkaz -->
        <div class="card-clean p-6 bg-background">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Aktuální vzkaz od trenérů</span>
            </div>
            <span class="text-xs text-muted-foreground">Sezóna 2026/27</span>
          </div>

          <?php if ($latestMessage): ?>
            <div class="mt-4">
              <h3 class="font-display text-lg font-bold text-foreground">
                <?= e($latestMessage['title']) ?>
              </h3>
              <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
                <?= nl2br(e($latestMessage['text'])) ?>
              </p>
              <div class="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span>Autor: <?= e($latestMessage['author'] ?? 'Trenérský tým') ?></span>
              </div>
            </div>
          <?php endif; ?>

          <div class="mt-6 flex flex-wrap items-center gap-2 pt-2 border-t border-border">
            <a href="pro-rodice" class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-emerald-600/20">
              <span>Zobrazit všechny vzkazy</span> &rarr;
            </a>
            <a href="ke-stazeni" class="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted">
              <span>Ke stažení PDF</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- NAŠE DOMÁCÍ BAZÉNY -->
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Kde trénujeme</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Naše domácí bazény</h2>
      </div>
      <a href="oddil" class="text-xs sm:text-sm font-semibold text-primary hover:underline">
        Více o oddílu a trénincích &rarr;
      </a>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="card-clean p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">Hlavní základna</span>
            <span class="text-xs text-muted-foreground">Praha 4</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-extrabold text-foreground">Plavecký stadion Podolí</h3>
          <p class="mt-1 text-sm font-medium text-primary">Podolská 74, 147 00 Praha 4</p>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Centrální tréninkové středisko pro závodní družstva A, B, C a Masters. K dispozici je 50m vnitřní bazén, 50m venkovní celoročně vyhřívaný bazén, 33m skokanský bazén a posilovna.
          </p>
          <div class="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            <span class="font-bold text-foreground">Doprava:</span> Tram 2, 3, 17, 21 — zastávka <em>Podolská vodárna</em> nebo <em>Dvorce</em>.
          </div>
        </div>
        <div class="mt-6 flex items-center gap-3 pt-3 border-t border-border">
          <a href="https://maps.google.com/?q=Plavecký+stadion+Podolí" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Otevřít na mapě
          </a>
        </div>
      </div>

      <div class="card-clean p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-primary">Kurzy & Přípravka</span>
            <span class="text-xs text-muted-foreground">Praha 2</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-extrabold text-foreground">Bazén Vinohrady (Sokol)</h3>
          <p class="mt-1 text-sm font-medium text-primary">Polská 2400/1a, 120 00 Praha 2</p>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            Základna pro výuku dětí od 4 let, kurzy základního a zdokonalovacího plavání, mladší přípravku a kondiční plavce. 25m krytý bazén s klidnějším zázemím pro mladé plavce.
          </p>
          <div class="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            <span class="font-bold text-foreground">Doprava:</span> Metro A <em>Náměstí Míru</em> nebo <em>Jiřího z Poděbrad</em>, tram 10, 16.
          </div>
        </div>
        <div class="mt-6 flex items-center gap-3 pt-3 border-t border-border">
          <a href="https://maps.google.com/?q=Polská+2400/1a,+Praha+2" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Otevřít na mapě
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- NEJNOVĚJŠÍ AKTUALITY (Server-rendered live from SQLite) -->
  <section class="border-t border-border/70 bg-card py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Zprávy z oddílu</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Co je u Klokanů nového</h2>
        </div>
        <a href="aktuality" class="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <span>Všechny aktuality</span> &rarr;
        </a>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <?php foreach ($latestNews as $n): ?>
          <a href="aktuality?id=<?= urlencode($n['id']) ?>" class="card-clean p-5 flex flex-col h-full">
            <?php if (!empty($n['image_url'])): ?>
              <div class="mb-4 -mx-5 -mt-5 h-44 overflow-hidden rounded-t-xl border-b border-border bg-muted">
                <img src="<?= e($n['image_url']) ?>" alt="<?= e($n['title']) ?>" class="h-full w-full object-cover" loading="lazy">
              </div>
            <?php endif; ?>
            <div class="flex items-center gap-2 text-xs font-semibold text-primary">
              <time><?= date('d. m. Y', strtotime($n['date'])) ?></time>
              <span>·</span>
              <span><?= e($n['author']) ?></span>
            </div>
            <h3 class="mt-2 font-display text-lg font-bold text-foreground leading-snug"><?= e($n['title']) ?></h3>
            <p class="mt-2 flex-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed"><?= e($n['excerpt']) ?></p>
            <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Číst celý článek &rarr;
            </span>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- RYCHLÉ STAŽENÍ DOKUMENTŮ & SPONZOŘI -->
  <section class="border-t border-border/70 bg-card py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid gap-10 lg:grid-cols-2">

        <!-- Left: Ke stažení -->
        <div>
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-primary">Oficiální dokumenty</p>
              <h3 class="mt-1 font-display text-xl font-extrabold text-foreground">Rychlé stažení formulářů</h3>
            </div>
            <a href="ke-stazeni" class="text-xs font-semibold text-primary hover:underline">Všechny dokumenty &rarr;</a>
          </div>
          <div class="mt-4 space-y-2.5">
            <a href="https://www.boh.cz/download/165_rozdeleni_plavani_2026-27.pdf" target="_blank" rel="noreferrer" class="card-clean p-3.5 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-foreground">Rozřazení do skupin, rozvrh a platby 2026/27</div>
                <div class="text-xs text-muted-foreground mt-0.5">Tréninkové skupiny, trenéři, bazény a členské příspěvky (PDF, 518 kB)</div>
              </div>
              <span class="rounded-lg bg-primary/10 p-2 text-primary shrink-0 ml-3">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg>
              </span>
            </a>
            <a href="https://www.boh.cz/download/prihlaska_clen_bohemians.pdf" target="_blank" rel="noreferrer" class="card-clean p-3.5 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-foreground">Přihláška člena do TJ Bohemians Praha</div>
                <div class="text-xs text-muted-foreground mt-0.5">Vstupní formulář pro nové členy a plavce oddílu (PDF)</div>
              </div>
              <span class="rounded-lg bg-primary/10 p-2 text-primary shrink-0 ml-3">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Right: Subdomény a projekty oddílu -->
        <div>
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-primary">Ekosystém oddílu</p>
              <h3 class="mt-1 font-display text-xl font-extrabold text-foreground">Specializované weby Klokanů</h3>
            </div>
          </div>
          <div class="mt-4 space-y-2.5">
            <a href="https://kurzy.boh.cz" target="_blank" rel="noreferrer" class="card-clean p-3.5 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-foreground">kurzy.boh.cz — Kurzy plavání pro děti</div>
                <div class="text-xs text-muted-foreground mt-0.5">Výuka základního a zdokonalovacího plavání pro děti na Vinohradech a v Podolí.</div>
              </div>
              <span class="text-xs font-semibold text-primary ml-3">&rarr;</span>
            </a>
            <a href="http://www.jarnicenaprahy.cz" target="_blank" rel="noreferrer" class="card-clean p-3.5 flex items-center justify-between">
              <div>
                <div class="text-sm font-bold text-foreground">jcp.boh.cz — Jarní cena Prahy</div>
                <div class="text-xs text-muted-foreground mt-0.5">Tradiční mezinárodní plavecké závody pořádané naším oddílem v Podolí.</div>
              </div>
              <span class="text-xs font-semibold text-primary ml-3">&rarr;</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- PODPORUJÍ NÁS (KPS Ostrava inspired partner showcase) -->
  <section class="border-t border-border/60 bg-card/25 py-12 sm:py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="text-center">
        <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-foreground">Podporují nás</h2>
        <div class="my-4 flex justify-center">
          <span class="wave wave--md"></span>
        </div>
        <p class="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Děkujeme našim partnerům a institucím za dlouhodobou podporu plaveckého oddílu TJ Bohemians Praha.
        </p>
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-16">
        <a href="https://czechswimming.cz" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Český svaz plaveckých sportů (ČSPS)">
          <img src="assets/sponsors/svaz.png" alt="Český svaz plaveckých sportů" class="h-10 sm:h-12 w-auto object-contain">
        </a>
        <a href="https://praha.eu" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Hlavní město Praha">
          <img src="assets/sponsors/praha.png" alt="Hlavní město Praha" class="h-10 sm:h-12 w-auto object-contain">
        </a>
        <a href="https://nsa.gov.cz" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Národní sportovní agentura (NSA)">
          <div class="flex items-center gap-2 border border-border/80 rounded-xl px-4 py-2 bg-card">
            <span class="font-display font-extrabold text-xs sm:text-sm tracking-wider text-foreground">NÁRODNÍ SPORTOVNÍ AGENTURA</span>
          </div>
        </a>
        <a href="https://www.bohemians.cz" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Tělovýchovná jednota Bohemians Praha">
          <div class="flex items-center gap-2.5">
            <img src="assets/bohemka_badge.png" alt="TJ Bohemians Praha" class="h-9 sm:h-10 w-auto object-contain">
            <span class="font-display font-bold text-sm tracking-wide text-foreground">TJ BOHEMIANS</span>
          </div>
        </a>
      </div>
    </div>
  </section>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
