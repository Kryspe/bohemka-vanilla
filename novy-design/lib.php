<?php
/**
 * TJ Bohemians Praha - nový design (koncept). Společná knihovna.
 * Čisté PHP bez frameworku. Data jsou v data/*.json (generuje je scripts/build_demo_data.py z boh.cz).
 */
declare(strict_types=1);

const ND_ROOT = __DIR__;
const INTRANET_URL = 'https://boh2-eight.vercel.app/intranet';   // vlastní intranet oddílu
const BOH_URL = 'https://www.boh.cz';

/** Předpona adres: '' při běhu přes PHP, '/novy-design-nahled' u statického náhledu. */
function base(): string
{
    return rtrim((string)(getenv('ND_BASE') ?: ''), '/');
}

function url(string $path = ''): string
{
    return base() . '/' . ltrim($path, '/');
}

function asset(string $path): string
{
    return url('assets/' . ltrim($path, '/'));
}

function e(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function data(string $name): array
{
    static $cache = [];
    if (!isset($cache[$name])) {
        $raw = file_get_contents(ND_ROOT . '/data/' . $name . '.json');
        $cache[$name] = $raw === false ? [] : (json_decode($raw, true) ?: []);
    }
    return $cache[$name];
}

function slugify(string $s): string
{
    $s = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s) ?: $s;
    $s = strtolower(preg_replace('/[^A-Za-z0-9]+/', '-', $s) ?? '');
    return trim($s, '-');
}

/** 2026-11-09 -> 9. 11. 2026 */
function cz_date(string $iso): string
{
    if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $iso, $m)) {
        return $iso;
    }
    return (int)$m[3] . '. ' . (int)$m[2] . '. ' . $m[1];
}

function cz_month(string $iso): string
{
    $names = [1 => 'led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
    return $names[(int)substr($iso, 5, 2)] ?? '';
}

function days_until(string $iso): int
{
    $today = new DateTimeImmutable('today');
    $d = DateTimeImmutable::createFromFormat('!Y-m-d', $iso);
    return $d ? (int)$today->diff($d)->format('%r%a') : 0;
}

function cz_days(int $n): string
{
    if ($n === 1) return 'den';
    if ($n >= 2 && $n <= 4) return 'dny';
    return 'dní';
}

/** Informace o fotce aktuality: [src, šířka, výška, velká?]. Malé fotky (180 px) se nepoužívají jako velký obrázek. */
function news_image(array $n): ?array
{
    if (empty($n['image'])) return null;
    static $cache = [];
    $name = basename((string)$n['image']);
    if (!isset($cache[$name])) {
        $file = ND_ROOT . '/assets/news/' . $name;
        $info = is_file($file) ? @getimagesize($file) : false;
        $cache[$name] = $info ? ['src' => asset('news/' . $name), 'w' => $info[0], 'h' => $info[1], 'big' => $info[0] >= 700] : null;
    }
    return $cache[$name];
}

function article_url(string $id): string
{
    return url('aktualita/' . rawurlencode($id));
}

/** Karta aktuality: velká fotka nahoře, malý náhled vedle textu, nebo jen text. */
function news_card(array $n, int $delay = 0, bool $author = false, string $tag = 'h3', int $len = 150): void
{
    $im = news_image($n);
    $href = article_url($n['id']);
    $cls = $im && $im['big'] ? 'has-img' : ($im ? 'has-thumb' : 'text-only');
    ?>
      <article class="card reveal <?= $cls ?>" style="--d:<?= $delay ?>ms">
<?php if ($im && $im['big']): ?>
        <a class="card-img" href="<?= e($href) ?>" tabindex="-1" aria-hidden="true"><img src="<?= e($im['src']) ?>" alt="" width="<?= $im['w'] ?>" height="<?= $im['h'] ?>" loading="lazy"></a>
<?php endif; ?>
        <div class="card-body">
<?php if ($im && !$im['big']): ?>
          <a class="card-thumb" href="<?= e($href) ?>" tabindex="-1" aria-hidden="true"><img src="<?= e($im['src']) ?>" alt="" width="<?= $im['w'] ?>" height="<?= $im['h'] ?>" loading="lazy"></a>
<?php endif; ?>
          <p class="meta"><?= e(cz_date($n['date'])) ?><?= $author ? ' &middot; ' . e($n['author']) : '' ?></p>
          <<?= $tag ?>><a href="<?= e($href) ?>"><?= e($n['title']) ?></a></<?= $tag ?>>
          <p class="excerpt"><?= e(mb_strimwidth(implode(' ', $n['body']), 0, $len, '...')) ?></p>
        </div>
      </article>
<?php
}

/** Menu (stejné položky a pořadí jako boh.cz). */
function menu(): array
{
    return [
        'aktuality'  => ['Aktuality',  url('aktuality')],
        'pro-rodice' => ['Pro rodiče', url('pro-rodice')],
        'oddil'      => ['Oddíl',      url('oddil')],
        'zavody'     => ['Závody',     url('zavody')],
        'rekordy'    => ['Rekordy',    url('rekordy')],
        'statistika' => ['Statistika', url('statistika')],
        'foto'       => ['Foto',       url('foto')],
        'ke-stazeni' => ['Ke stažení', url('ke-stazeni')],
    ];
}

/** Parametry z cesty, které nastaví router (nebo export). */
function route(string $key, string $default = ''): string
{
    return (string)($GLOBALS['ND_ROUTE'][$key] ?? $default);
}

function paginate(array $items, int $page, int $per): array
{
    $pages = max(1, (int)ceil(count($items) / $per));
    $page = min(max(1, $page), $pages);
    return [array_slice($items, ($page - 1) * $per, $per), $page, $pages];
}

function pager(int $page, int $pages, callable $href): string
{
    if ($pages <= 1) return '';
    $out = '<nav class="pager" aria-label="Stránkování">';
    if ($page > 1) $out .= '<a class="pill pill-line" href="' . e($href($page - 1)) . '">&larr; Novější</a>';
    $out .= '<span class="pager-info">Strana ' . $page . ' z ' . $pages . '</span>';
    if ($page < $pages) $out .= '<a class="pill pill-line" href="' . e($href($page + 1)) . '">Starší &rarr;</a>';
    return $out . '</nav>';
}

/** Sjednocený seznam závodů: nadcházející vzestupně, proběhlé sestupně. */
function events_split(): array
{
    $today = date('Y-m-d');
    $up = $past = [];
    foreach (data('events') as $ev) {
        if ($ev['date'] >= $today) $up[] = $ev; else $past[] = $ev;
    }
    usort($up, fn($a, $b) => strcmp($a['date'], $b['date']));
    usort($past, fn($a, $b) => strcmp($b['date'], $a['date']));
    return [$up, $past];
}

const EVENT_LINK_LABELS = ['p' => 'Přihlášení', 'v' => 'Výsledky', 'r' => 'Rozpis', 'x' => 'PDF výsledky'];

function render_head(string $key, string $title, string $desc = '', bool $home = false): void
{
    $full = $title === '' ? 'TJ Bohemians Praha - plavecký oddíl' : $title . ' | TJ Bohemians Praha';
    ?><!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($full) ?></title>
<meta name="description" content="<?= e($desc ?: 'Plavecký oddíl TJ Bohemians Praha. Aktuality, závody, rekordy, fotogalerie a informace pro rodiče. Od roku 1946.') ?>">
<meta name="theme-color" content="#062d17">
<?php if (base() !== ''): ?><meta name="robots" content="noindex"><?php endif; ?>
<script>document.documentElement.classList.add("js")</script>
<link rel="icon" href="<?= e(asset('img/favicon.png')) ?>">
<link rel="preload" href="<?= e(asset('fonts/sora-latin-4fa0aa.woff2')) ?>" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="<?= e(asset('fonts/fonts.css')) ?>">
<link rel="stylesheet" href="<?= e(asset('css/style.css')) ?>">
<script defer src="<?= e(asset('js/main.js')) ?>"></script>
</head>
<body class="<?= $home ? 'is-home' : 'is-sub' ?>" data-page="<?= e($key) ?>">
<a class="skip" href="#obsah">Přeskočit na obsah</a>
<header class="site-header" id="site-header">
  <div class="wrap header-in">
    <a class="brand" href="<?= e(url()) ?>" aria-label="TJ Bohemians Praha, oddíl plavání - úvod">
      <img src="<?= e(asset('img/logo-white.png')) ?>" alt="TJ Bohemians Praha, oddíl plavání, 1946-2026" width="178" height="50">
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Hlavní menu">
      <ul>
<?php foreach (menu() as $k => [$label, $href]): ?>
        <li><a href="<?= e($href) ?>"<?= $k === $key ? ' aria-current="page"' : '' ?>><?= e($label) ?></a></li>
<?php endforeach; ?>
        <li class="only-mobile"><a href="<?= e(INTRANET_URL) ?>">Intranet</a></li>
      </ul>
    </nav>
    <a class="pill pill-bright header-cta" href="<?= e(INTRANET_URL) ?>">Intranet</a>
    <button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu"><span></span><span></span></button>
  </div>
</header>
<?php
}

function sub_hero(string $eyebrow, string $title, string $lead = ''): void
{
    ?>
<section class="sub-hero">
  <div class="wrap">
    <p class="eyebrow"><?= e($eyebrow) ?></p>
    <h1><?= e($title) ?></h1>
<?php if ($lead !== ''): ?>
    <p class="lead"><?= e($lead) ?></p>
<?php endif; ?>
  </div>
  <svg class="wave-edge" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 240 70 480 -10 720 30 S 1200 70 1440 30 V60 H0Z"/></svg>
</section>
<?php
}

function render_foot(): void
{
    $side = data('sidebar');
    ?>
<footer class="site-footer">
  <div class="wrap foot-grid">
    <div>
      <img src="<?= e(asset('img/logo-white.png')) ?>" alt="TJ Bohemians Praha" width="178" height="50" loading="lazy">
      <p class="foot-note">Plavecký oddíl TJ Bohemians Praha. Závodní plavání, přípravka a kurzy plavání v Praze od roku 1946.</p>
    </div>
    <div>
      <h2>Menu</h2>
      <ul>
<?php foreach (menu() as [$label, $href]): ?>
        <li><a href="<?= e($href) ?>"><?= e($label) ?></a></li>
<?php endforeach; ?>
        <li><a href="<?= e(INTRANET_URL) ?>">Intranet</a></li>
      </ul>
    </div>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="mailto:jan.srb@czechswimming.cz">jan.srb@czechswimming.cz</a></li>
        <li><a href="https://www.facebook.com/boh.cz/" rel="noopener">Facebook</a></li>
        <li><a href="<?= e(BOH_URL) ?>" rel="noopener">Původní web boh.cz</a></li>
        <li><a href="https://kurzy.boh.cz" rel="noopener">Kurzy plavání</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span>&copy; 2007&ndash;<?= date('Y') ?> TJ Bohemians Praha, oddíl plavání</span>
    <span>Koncept nového vzhledu. Obsah z <a href="<?= e(BOH_URL) ?>">boh.cz</a>.</span>
  </div>
</footer>
</body>
</html>
<?php
}
