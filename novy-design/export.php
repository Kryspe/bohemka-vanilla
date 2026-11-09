<?php
/**
 * Statický export (náhled bez PHP, např. pro Vercel):
 *   php export.php dist /novy-design-nahled   (druhý argument = předpona adres)
 * Vykreslí každou stránku do HTML souboru a zkopíruje assets/.
 */
declare(strict_types=1);

if (isset($argv[2])) putenv('ND_BASE=' . $argv[2]);   // v Dockeru se proměnné prostředí nepředávají

require __DIR__ . '/routes.php';
require __DIR__ . '/lib.php';

$out = rtrim($argv[1] ?? 'dist', '/');
$paths = ['/', '/aktuality', '/pro-rodice', '/oddil', '/zavody', '/rekordy', '/statistika', '/foto', '/ke-stazeni', '/404'];

$news = data('news');
for ($p = 2; $p <= (int)ceil(count($news) / 12); $p++) $paths[] = "/aktuality/strana-$p";
foreach ($news as $n) $paths[] = '/aktualita/' . $n['id'];
foreach (['struktura', 'historie', 'kontakty', 'sponzori'] as $s) $paths[] = "/oddil/$s";
foreach (['nadchazejici', 'probehle', 'vse'] as $z) $paths[] = "/zavody/$z";
foreach (['open', 'starsi-dorost', 'mladsi-dorost', 'zactvo-14', 'zactvo-13', 'zactvo-12', 'zactvo-11', 'zactvo-10', 'zactvo-9'] as $k)
    foreach (['muzi', 'zeny'] as $g) foreach (['50', '25'] as $b) $paths[] = "/rekordy/$k/$g/$b";
for ($p = 2; $p <= (int)ceil(count(data('galleries')) / 30); $p++) $paths[] = "/foto/strana-$p";
$downloads = data('downloads');
$cats = [];
foreach ($downloads as $d) $cats[slugify($d['category'])] = $d['category'];
$paths[] = '/ke-stazeni/vse';
foreach (array_keys($cats) as $k) {
    $paths[] = "/ke-stazeni/$k";
    $count = count(array_filter($downloads, fn($d) => slugify($d['category']) === $k));
    for ($p = 2; $p <= (int)ceil($count / 30); $p++) $paths[] = "/ke-stazeni/$k/strana-$p";
}
for ($p = 2; $p <= (int)ceil(count($downloads) / 30); $p++) $paths[] = "/ke-stazeni/vse/strana-$p";

@mkdir($out, 0777, true);
$written = 0;
foreach (array_unique($paths) as $path) {
    $resolved = $path === '/404' ? ['404', []] : nd_resolve($path);
    if ($resolved === null) { fwrite(STDERR, "preskoceno: $path\n"); continue; }
    [$script, $GLOBALS['ND_ROUTE']] = $resolved;
    ob_start();
    include __DIR__ . '/' . $script . '.php';
    $html = ob_get_clean();
    $file = $out . ($path === '/' ? '/index' : $path) . '.html';
    @mkdir(dirname($file), 0777, true);
    file_put_contents($file, $html);
    $written++;
}

// assets
function copy_dir(string $src, string $dst): void
{
    @mkdir($dst, 0777, true);
    foreach (scandir($src) as $f) {
        if ($f === '.' || $f === '..') continue;
        is_dir("$src/$f") ? copy_dir("$src/$f", "$dst/$f") : copy("$src/$f", "$dst/$f");
    }
}
copy_dir(__DIR__ . '/assets', $out . '/assets');
echo "hotovo: $written stránek -> $out\n";
