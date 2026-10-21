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

// 3. Latest news (top 4)
$latestNews = $pdo->query("SELECT * FROM news ORDER BY date DESC LIMIT 4")->fetchAll();
$heroNews = !empty($latestNews) ? $latestNews[0] : null;
$heroImg = (!empty($heroNews['image_url'])) ? $heroNews['image_url'] : '';
$heroTitle = $heroNews['title'] ?? 'Velká cena Prahy - hodnocení';
$heroDate = !empty($heroNews['date']) ? date('j. n. Y', strtotime($heroNews['date'])) : '12. 10. 2026';
$heroExcerpt = $heroNews['excerpt'] ?? 'Účast bohemáků byla slušná, závodní nasazení bylo dobré a padla řada osobních rekordů.';
$heroAuthor = $heroNews['author'] ?? 'Martin Břenda';
$heroLink = !empty($heroNews['id']) ? 'aktuality?id=' . urlencode($heroNews['id']) : 'aktuality';

$pageTitle = 'Klokani — TJ Bohemians Praha | Plavecký oddíl od 1946';
$pageDescription = 'Plavecký oddíl TJ Bohemians Praha (Klokani) — tradice od roku 1946. Závodní plavání, přípravka, kurzy, závody, rekordy a aktuality.';
$currentPage = 'index';

require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0">

  <!-- HERO SECTION: NEJNOVĚJŠÍ AKTUALITA Z ODDÍLU (LEAD STORY) -->
  <section class="relative overflow-hidden py-3 sm:py-6 lg:py-8">
    <div class="mx-auto max-w-7xl px-3 sm:px-6">
      <div class="hero-athletic hero-athletic-bg text-white rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-500/30 p-5 sm:p-8 lg:p-12 shadow-xl sm:shadow-2xl">
        <div class="hero-news-grid <?= empty($heroImg) ? 'has-no-image' : '' ?>">

          <!-- Left: Lead Story Details -->
          <div class="flex flex-col justify-start">
            <div class="flex items-center gap-3 text-xs sm:text-sm text-emerald-200/90 font-medium mb-2 sm:mb-3">
              <time class="font-bold text-white"><?= e($heroDate) ?></time>
              <span>·</span>
              <span><?= e($heroAuthor) ?></span>
            </div>

            <h1 class="font-display text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] text-white">
              <?= e($heroTitle) ?>
            </h1>

            <p class="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg text-emerald-50/90 leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-none max-w-2xl">
              <?= e($heroExcerpt) ?>
            </p>

            <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-3 pt-1 sm:pt-2">
              <a href="<?= e($heroLink) ?>" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-5 py-3 text-sm transition-all shadow-lg hover:shadow-emerald-400/25 active:scale-95">
                <span>Číst celou aktualitu</span>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </a>
              <a href="aktuality" class="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-semibold text-emerald-200 hover:text-white transition-colors py-1.5 sm:py-0">
                <span>Všechny aktuality</span> &rarr;
              </a>
            </div>
          </div>

          <!-- Right: Photo if available -->
          <?php if (!empty($heroImg)): ?>
            <div id="hero-news-media" class="hero-news-media-col">
              <div class="hero-news-media-box group">
                <img src="<?= e($heroImg) ?>" alt="<?= e($heroTitle) ?>" loading="eager">
                <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-emerald-950/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          <?php endif; ?>

        </div>
      </div>
    </div>
  </section>

  <!-- 4 QUICK BENTO CARDS -->
  <section class="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-8 lg:py-10">
    <div class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Card 1: Nearest event -->
      <a id="dash-event-link" href="zavody" class="spotlight-card reveal hover-float group flex h-full min-h-0 sm:min-h-[190px] flex-col justify-between rounded-lg border border-border/70 bg-card p-4 sm:p-5 shadow-xs hover:border-emerald-600/40 transition-all">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Nejbližší závod
          </div>
          <p class="mt-2.5 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors" id="dash-event-title">
            <?= $nearestEvent ? e($nearestEvent['name']) : 'Velká cena města Plzně' ?>
          </p>
          <p class="mt-1 text-xs text-muted-foreground" id="dash-event-desc">
            <?= $nearestEvent ? (date('j. n. Y', strtotime($nearestEvent['date'])) . ' · ' . e($nearestEvent['place'])) : '3. 10. 2026 · Plzeň – Slovany' ?>
          </p>
        </div>
        <div class="mt-3.5 flex items-center justify-between border-t border-border/40 pt-2.5">
          <div class="flex items-baseline gap-1.5">
            <span class="font-display text-2xl font-extrabold text-primary" id="dash-event-days"><?= $daysLeft > 0 ? $daysLeft : ($daysLeft === 0 ? 'Dnes' : '✓') ?></span>
            <span class="text-xs font-medium text-muted-foreground"><?= $daysLeft === 1 ? 'den do startu' : ($daysLeft >= 2 && $daysLeft <= 4 ? 'dny do startu' : ($daysLeft > 4 ? 'dní do startu' : 'závod')) ?></span>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
            Detail závodu →
          </span>
        </div>
      </a>

      <!-- Card 2: Vzkaz pro rodiče -->
      <a href="pro-rodice" class="spotlight-card reveal hover-float group flex h-full min-h-0 sm:min-h-[190px] flex-col justify-between rounded-lg border border-border/70 bg-card p-4 sm:p-5 shadow-xs hover:border-emerald-600/40 transition-all">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Vzkaz pro rodiče
          </div>
          <p class="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            <?= $latestMessage ? e(mb_substr($latestMessage['text'], 0, 140)) . '…' : 'Lékařské prohlídky pro závodní plavce je nutné odevzdat trenérům nejpozději do 15. října 2026.' ?>
          </p>
        </div>
        <div class="mt-3.5 border-t border-border/40 pt-2.5">
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Všechny vzkazy <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </span>
        </div>
      </a>

      <!-- Card 3: Infolístek (PDF) -->
      <a href="https://www.boh.cz/infolistek/26sprinty-listecek.pdf" target="_blank" rel="noreferrer" class="spotlight-card reveal hover-float group flex h-full min-h-0 sm:min-h-[190px] flex-col justify-between rounded-lg border border-border/70 bg-card p-4 sm:p-5 shadow-xs hover:border-emerald-600/40 transition-all">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Infolístek (PDF)
          </div>
          <p class="mt-2.5 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
            Plzeňské sprinty 2026
          </p>
          <p class="mt-1 text-xs text-muted-foreground leading-relaxed">
            Odjezdy, rozplavání, ubytování a instrukce pro závodníky Bohemians.
          </p>
        </div>
        <div class="mt-3.5 border-t border-border/40 pt-2.5">
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
            Stáhnout PDF ↗
          </span>
        </div>
      </a>

      <!-- Card 4: Intranet -->
      <a href="intranet" class="spotlight-card reveal hover-float group flex h-full min-h-0 sm:min-h-[190px] flex-col justify-between rounded-lg border border-emerald-600/30 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-5 shadow-xs hover:border-emerald-600/60 transition-all">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Členský intranet
          </div>
          <p class="mt-2.5 font-display text-base font-bold leading-snug text-foreground">
            Přihlášky &amp; Harmonogram
          </p>
          <p class="mt-1 text-xs leading-relaxed text-muted-foreground">
            Přihlas se na závody, zkontroluj si časy, termíny a oddílové směrnice.
          </p>
        </div>
        <div class="mt-3.5 border-t border-emerald-600/20 pt-2.5">
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Otevřít intranet <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    </div>
  </section>

  <!-- NEWS SECTION — Articles #2, #3, #4 (Skipping Hero Lead) -->
  <section class="py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-8">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Oddílové novinky</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Aktuality ze života oddílu</h2>
        </div>
        <a href="aktuality" class="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          <span>Všechny aktuality</span> →
        </a>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" id="home-news-cards">
        <?php foreach (array_slice($latestNews, 1, 3) as $n): ?>
          <article class="card-clean spotlight-card reveal hover-float group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card p-5 sm:p-6 transition-all duration-300 shadow-xs hover:border-emerald-600/40">
            <div class="mb-4 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 h-44 overflow-hidden border-b border-border/40 bg-emerald-950/60 relative">
              <?php if (!empty($n['image_url'])): ?>
                <img src="<?= e($n['image_url']) ?>" alt="<?= e($n['title']) ?>" class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy">
              <?php else: ?>
                <div class="h-full w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-950 to-emerald-900 text-center select-none">
                  <span class="text-xs font-bold uppercase tracking-wider text-emerald-300">TJ Bohemians Praha</span>
                  <span class="text-[11px] text-emerald-100/60 mt-0.5 font-medium">Plavecký oddíl</span>
                </div>
              <?php endif; ?>
            </div>
            <time class="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono"><?= date('j. n. Y', strtotime($n['date'])) ?></time>
            <a href="aktuality?id=<?= urlencode($n['id']) ?>" class="mt-1.5 block font-display text-base font-bold leading-snug transition-colors group-hover:text-primary">
              <?= e($n['title']) ?>
            </a>
            <p class="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground"><?= e($n['excerpt']) ?></p>
            <a href="aktuality?id=<?= urlencode($n['id']) ?>" class="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
              Číst aktualitu &rarr;
            </a>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ZAJÍMAVOSTI Z ODDÍLU — Photo Highlights & Life at the Club -->
  <section class="border-t border-border/60 bg-card/40 py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-8">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Život v klubu objektivem</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Zajímavosti &amp; Fotoreportáže</h2>
        </div>
        <a href="foto" class="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          <span>Všechny fotogalerie</span> →
        </a>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Highlight 1: Oslava 80 let -->
        <article class="group flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-xs hover:border-emerald-600/40 hover:shadow-sm transition-all">
          <div class="relative aspect-[16/10] overflow-hidden bg-muted">
            <img src="assets/foto/86071.jpg" alt="Oslava 80 let oddílu na Hagiboru" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
            <span class="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">Fotoreportáž</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <time class="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">14. září 2026</time>
            <h3 class="mt-1.5 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
              <a href="foto" class="hover:underline">Oslava 80 let oddílu na Hagiboru — 212 Klokanů pohromadě</a>
            </h3>
            <p class="mt-2 flex-1 text-xs text-muted-foreground leading-relaxed">
              Generace plavců, trenérů a olympioniků Bohemians oslavily 80. výročí založení klubu ve velkém stylu. Prohlédněte si oficiální galerii.
            </p>
            <a href="foto" class="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Zobrazit fotogalerii →
            </a>
          </div>
        </article>

        <!-- Highlight 2: ME masters Šamorín -->
        <article class="group flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-xs hover:border-emerald-600/40 hover:shadow-sm transition-all">
          <div class="relative aspect-[16/10] overflow-hidden bg-muted">
            <img src="assets/aktuality/2233.jpg" alt="Mistrovství Evropy masters Šamorín" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
            <span class="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">Masters</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <time class="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">24. srpna 2026</time>
            <h3 class="mt-1.5 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
              <a href="aktuality?id=me-masters-samorin-2026" class="hover:underline">16 medailí a český rekord na Mistrovství Evropy masters</a>
            </h3>
            <p class="mt-2 flex-1 text-xs text-muted-foreground leading-relaxed">
              Jedenáct Klokanů vybojovalo v Šamoríně 16 medailí a rekord šampionátu. Úspěchy veteránských reprezentantů Bohemians.
            </p>
            <a href="aktuality?id=me-masters-samorin-2026" class="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Číst reportáž →
            </a>
          </div>
        </article>

        <!-- Highlight 3: Soustředění Jiřetín -->
        <article class="group flex flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-xs hover:border-emerald-600/40 hover:shadow-sm transition-all">
          <div class="relative aspect-[16/10] overflow-hidden bg-muted">
            <img src="assets/aktuality/2234.jpg" alt="Přípravné soustředění Jiřetín" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
            <span class="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">Soustředění</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <time class="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">28. srpna 2026</time>
            <h3 class="mt-1.5 font-display text-base font-bold leading-snug group-hover:text-primary transition-colors">
              <a href="aktuality?id=soustredeni-jiretin-hodnoceni-2026" class="hover:underline">Letní přípravné soustředění Jiřetín — chata v Jizerských horách</a>
            </h3>
            <p class="mt-2 flex-1 text-xs text-muted-foreground leading-relaxed">
              23 plavců od přípravky po nejvyšší skupiny zahájilo novou sezónu v Jizerkách. Bodované soutěže, otevřená voda i paddleboardy.
            </p>
            <a href="aktuality?id=soustredeni-jiretin-hodnoceni-2026" class="mt-3.5 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Číst hodnocení trenérů →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- VZKAZY PRO RODIČE & INFOLÍSTKY -->
  <section class="border-t border-border/60 bg-card/60 py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-8">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Nástěnka trenérů</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Vzkazy pro rodiče &amp; Infolístky</h2>
        </div>
        <a href="pro-rodice" class="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          <span>Všechny vzkazy pro rodiče</span> →
        </a>
      </div>

      <div class="grid gap-6 lg:grid-cols-12">
        <!-- Left: Aktuální zprávy od trenérů -->
        <div class="lg:col-span-7 space-y-3.5">
          <div class="card-clean rounded-lg border border-border/70 bg-card p-4 sm:p-5 flex items-start gap-3.5 shadow-xs hover:border-emerald-600/40 transition-colors">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2 text-xs font-semibold text-primary">
                <span class="font-mono">12. 10. 2026</span>
                <span>·</span>
                <span class="text-muted-foreground">Jan Srb</span>
              </div>
              <h3 class="mt-1 font-display text-sm font-bold text-foreground">Tréninky ST+ODA+G týden do 18.10.</h3>
              <p class="mt-1 text-xs text-muted-foreground leading-relaxed">
                Tréninky v Podolí a na Vinohradech probíhají dle platného rozvrhu. Plavci závodních družstev nezapomeňte na povinnou suchou přípravu a dochvilnost.
              </p>
              <a href="pro-rodice" class="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Detail vzkazu &rarr;
              </a>
            </div>
          </div>

          <div class="card-clean rounded-lg border border-border/70 bg-card p-4 sm:p-5 flex items-start gap-3.5 shadow-xs hover:border-emerald-600/40 transition-colors">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2 text-xs font-semibold text-primary">
                <span class="font-mono">10. 10. 2026</span>
                <span>·</span>
                <span class="text-muted-foreground">Soňa Nováková</span>
              </div>
              <h3 class="mt-1 font-display text-sm font-bold text-foreground">Přípravka: ukázková hodina ve čtvrtek 15. 10.</h3>
              <p class="mt-1 text-xs text-muted-foreground leading-relaxed">
                Ukázková hodina pro rodiče dětí v přípravce na bazénu Vinohrady. Sraz v 16:15 v hale bazénu Slovenská. Vstup na ochoz bazénu pouze v přezůvkách.
              </p>
              <a href="pro-rodice" class="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Detail vzkazu &rarr;
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Infolístky na závody -->
        <div class="lg:col-span-5">
          <div class="card-clean rounded-lg border border-border/70 bg-card p-4 sm:p-5 h-full flex flex-col justify-between shadow-xs hover:border-emerald-600/40 transition-colors">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-primary">Infolístky ke stažení</span>
              <h3 class="mt-1 font-display text-base font-bold text-foreground">Pokyny pro plavce na závody</h3>
              <p class="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Oficiální „lístečky“ s časovým harmonogramem, dopravou, rozplaváním a nominacemi.
              </p>

              <div class="mt-4 space-y-2">
                <a href="https://www.boh.cz/infolistek/26sprinty-listecek.pdf" target="_blank" rel="noreferrer" class="group flex items-center justify-between rounded-md border border-border bg-background p-2.5 transition-colors hover:border-emerald-600/50">
                  <div class="flex items-center gap-2.5 truncate pr-2">
                    <svg class="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">Plzeňské sprinty 2026</span>
                  </div>
                  <span class="text-[11px] font-mono text-primary group-hover:underline shrink-0">PDF ↗</span>
                </a>

                <a href="https://www.boh.cz/infolistek/26podzim-motorlet.pdf" target="_blank" rel="noreferrer" class="group flex items-center justify-between rounded-md border border-border bg-background p-2.5 transition-colors hover:border-emerald-600/50">
                  <div class="flex items-center gap-2.5 truncate pr-2">
                    <svg class="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">Podzimní cena Motorletu</span>
                  </div>
                  <span class="text-[11px] font-mono text-primary group-hover:underline shrink-0">PDF ↗</span>
                </a>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Archiv infolístků:</span>
              <a href="ke-stazeni" class="font-semibold text-primary hover:underline">Ke stažení (PDF) →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NAŠE DOMÁCÍ BAZÉNY -->
  <section class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <div class="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-primary">Kde trénujeme</p>
        <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Naše domácí bazény</h2>
      </div>
      <a href="oddil" class="text-xs sm:text-sm font-semibold text-primary hover:underline">
        Více o oddílu a trénincích &rarr;
      </a>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="card-clean rounded-lg p-5 sm:p-6 flex flex-col justify-between border border-border/70 shadow-xs hover:border-emerald-600/40 transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">Hlavní základna</span>
            <span class="text-xs text-muted-foreground">Praha 4</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-extrabold text-foreground">Plavecký stadion Podolí</h3>
          <p class="mt-1 text-sm font-medium text-primary">Podolská 74, 147 00 Praha 4</p>
          <p class="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Centrální tréninkové středisko pro závodní družstva A, B, C a Masters. K dispozici je 50m vnitřní bazén, 50m venkovní celoročně vyhřívaný bazén, 33m skokanský bazén a posilovna.
          </p>
          <div class="mt-4 rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
            <span class="font-bold text-foreground">Doprava:</span> Tram 2, 3, 17, 21 — zastávka <em>Podolská vodárna</em> nebo <em>Dvorce</em>.
          </div>
        </div>
        <div class="mt-5 flex items-center gap-3 pt-3 border-t border-border/60">
          <a href="https://maps.google.com/?q=Plavecký+stadion+Podolí" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Otevřít na mapě ↗
          </a>
        </div>
      </div>

      <div class="card-clean rounded-lg p-5 sm:p-6 flex flex-col justify-between border border-border/70 shadow-xs hover:border-emerald-600/40 transition-colors">
        <div>
          <div class="flex items-center justify-between">
            <span class="rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-primary">Kurzy & Přípravka</span>
            <span class="text-xs text-muted-foreground">Praha 2</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-extrabold text-foreground">Bazén Vinohrady (Sokol)</h3>
          <p class="mt-1 text-sm font-medium text-primary">Polská 2400/1a, 120 00 Praha 2</p>
          <p class="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Základna pro výuku dětí od 4 let, kurzy základního a zdokonalovacího plavání, mladší přípravku a kondiční plavce. 25m krytý bazén s klidnějším zázemím pro mladé plavce.
          </p>
          <div class="mt-4 rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
            <span class="font-bold text-foreground">Doprava:</span> Metro A <em>Náměstí Míru</em> nebo <em>Jiřího z Poděbrad</em>, tram 10, 16.
          </div>
        </div>
        <div class="mt-5 flex items-center gap-3 pt-3 border-t border-border/60">
          <a href="https://maps.google.com/?q=Polská+2400/1a,+Praha+2" target="_blank" rel="noreferrer" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Otevřít na mapě ↗
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- PODPORUJÍ NÁS (Sponsor showcase) -->
  <section class="border-t border-border/60 bg-card/25 py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-8">
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-primary">Partneři oddílu</p>
          <h2 class="mt-1 font-display text-2xl font-extrabold sm:text-3xl text-foreground">Podporují nás</h2>
        </div>
        <p class="text-xs text-muted-foreground hidden sm:block">Děkujeme za dlouhodobou podporu plavecké Bohemky</p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-16">
        <a href="https://czechswimming.cz" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Český svaz plaveckých sportů (ČSPS)">
          <img src="assets/sponsors/svaz.png" alt="Český svaz plaveckých sportů" class="h-10 sm:h-12 w-auto object-contain">
        </a>
        <a href="https://praha.eu" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Hlavní město Praha">
          <img src="assets/sponsors/praha.png" alt="Hlavní město Praha" class="h-10 sm:h-12 w-auto object-contain">
        </a>
        <a href="https://nsa.gov.cz" target="_blank" rel="noreferrer" class="sponsor-badge flex items-center justify-center p-2" title="Národní sportovní agentura (NSA)">
          <div class="flex items-center gap-2 border border-border/80 rounded-md px-3.5 py-1.5 bg-card">
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
