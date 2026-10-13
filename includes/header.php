<?php
/**
 * Klokani — Common Page Header
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/db.php';

if (!isset($pageTitle)) {
    $pageTitle = 'Klokani — TJ Bohemians Praha | Plavecký oddíl od 1946';
}
if (!isset($pageDescription)) {
    $pageDescription = 'Plavecký oddíl TJ Bohemians Praha (Klokani) — tradice od roku 1946. Závodní plavání, přípravka, kurzy, závody, rekordy a aktuality.';
}
if (!isset($currentPage)) {
    $currentPage = basename($_SERVER['SCRIPT_NAME'] ?? '', '.php');
}

$user = currentUser();
$flash = getFlash();

$navLinks = [
    'index' => ['label' => 'Úvod', 'url' => 'index.php'],
    'aktuality' => ['label' => 'Aktuality', 'url' => 'aktuality.php'],
    'oddil' => ['label' => 'Oddíl', 'url' => 'oddil.php'],
    'pro-rodice' => ['label' => 'Pro rodiče', 'url' => 'pro-rodice.php'],
    'zavody' => ['label' => 'Závody', 'url' => 'zavody.php'],
    'rekordy' => ['label' => 'Rekordy', 'url' => 'rekordy.php'],
    'statistika' => ['label' => 'Statistika', 'url' => 'statistika.php'],
    'ke-stazeni' => ['label' => 'Ke stažení', 'url' => 'ke-stazeni.php'],
    'foto' => ['label' => 'Foto', 'url' => 'foto.php'],
    'kontakt' => ['label' => 'Kontakt', 'url' => 'kontakt.php'],
];
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#030705">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="<?= e($pageDescription) ?>">
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="apple-touch-icon" href="assets/icon-192.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="css/style.css">
  <script>
    try {
      var t = localStorage.getItem('klokani-theme');
      var d = t === 'dark';
      document.documentElement.classList.toggle('dark', d);
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute('content', d ? '#0b1310' : '#ffffff');
    } catch(e) {}
  </script>
</head>
<body class="bg-background text-foreground font-sans antialiased overflow-x-hidden min-h-[100dvh]">

  <div class="flex min-h-screen flex-col overflow-x-hidden">

    <!-- SITE HEADER -->
    <header class="sticky top-0 z-50 w-full site-header transition-colors">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="index.php" class="flex items-center gap-3">
          <img src="assets/bohemka_badge.png" alt="TJ Bohemians Praha — oddíl plavání" class="h-10 w-10 object-contain rounded-full shadow-xs">
          <div class="flex flex-col">
            <span class="font-display text-base font-extrabold tracking-tight text-foreground sm:text-lg leading-tight">
              TJ Bohemians Praha
            </span>
            <span class="text-xs font-semibold text-primary tracking-wide">
              Oddíl plavání Klokani · od 1946
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          <?php foreach ($navLinks as $key => $link): ?>
            <a href="<?= $link['url'] ?>" class="nav-item <?= ($currentPage === $key) ? 'active' : '' ?>">
              <?= $link['label'] ?>
            </a>
          <?php endforeach; ?>

          <div class="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <?php if ($user && in_array($user['role'], ['admin', 'trainer'])): ?>
              <a href="admin.php" class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                <span>Admin</span>
              </a>
              <a href="intranet.php" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity">
                <span>Intranet</span>
              </a>
            <?php elseif ($user): ?>
              <a href="intranet.php" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span><?= e($user['name']) ?></span>
              </a>
            <?php else: ?>
              <a href="intranet.php" class="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Intranet</span>
              </a>
            <?php endif; ?>
            <button type="button" class="theme-toggle-btn inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted" aria-label="Přepnout motiv"></button>
          </div>
        </nav>

        <!-- Mobile Header Actions -->
        <div class="flex items-center gap-2 lg:hidden">
          <?php if ($user && in_array($user['role'], ['admin', 'trainer'])): ?>
            <a href="admin.php" class="inline-flex items-center gap-1 rounded-lg bg-emerald-700/20 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Admin</span>
            </a>
          <?php endif; ?>
          <a href="intranet.php" class="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span><?= $user ? e(explode(' ', $user['name'])[0]) : 'Intranet' ?></span>
          </a>
          <button type="button" class="theme-toggle-btn inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground" aria-label="Přepnout motiv"></button>
        </div>
      </div>
    </header>

    <?php if ($flash): ?>
      <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div class="rounded-xl border p-4 text-sm font-semibold flex items-center justify-between <?= $flash['type'] === 'error' ? 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300' ?>">
          <span><?= e($flash['message']) ?></span>
          <button type="button" onclick="this.parentElement.remove()" class="text-xs opacity-75 hover:opacity-100">&times;</button>
        </div>
      </div>
    <?php endif; ?>
