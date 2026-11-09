<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$cats = ['open' => 'Open', 'starsi-dorost' => 'Starší dorost', 'mladsi-dorost' => 'Mladší dorost',
         'zactvo-14' => 'Žactvo 14 let', 'zactvo-13' => 'Žactvo 13 let', 'zactvo-12' => 'Žactvo 12 let',
         'zactvo-11' => 'Žactvo 11 let', 'zactvo-10' => 'Žactvo 10 let', 'zactvo-9' => 'Žactvo 9 let'];
$sexes = ['muzi' => ['Muži', 'M'], 'zeny' => ['Ženy', 'Z']];
$pools = ['50', '25'];

$kat = route('kat', 'open');   if (!isset($cats[$kat])) $kat = 'open';
$sex = route('pohlavi', 'muzi'); if (!isset($sexes[$sex])) $sex = 'muzi';
$pool = route('bazen', '50');  if (!in_array($pool, $pools, true)) $pool = '50';

$rank = ['VZ' => 1, 'Z' => 2, 'P' => 3, 'M' => 4, 'PZ' => 5];
$key = function (string $ev) use ($rank): array {
    if (!preg_match('/^(\d+)\s*(km|[A-Z]+)?/', $ev, $m)) return [9, 0];
    if (($m[2] ?? '') === 'km') return [8, (int)$m[1]];
    return [$rank[$m[2] ?? ''] ?? 7, (int)$m[1]];
};

$rows = array_values(array_filter(data('records'), fn($r) => $r['c'] === $cats[$kat] && $r['g'] === $sexes[$sex][1] && (string)$r['p'] === $pool));
usort($rows, fn($a, $b) => $key($a['e']) <=> $key($b['e']));

render_head('rekordy', 'Rekordy', 'Oddílové rekordy plaveckého oddílu TJ Bohemians Praha podle kategorií, pohlaví a délky bazénu.');
sub_hero('Rekordy', 'Oddílové rekordy', 'Nejlepší výkony v historii oddílu podle kategorie, pohlaví a délky bazénu.');
$link = fn(string $k, string $s, string $p) => url("rekordy/$k/$s/$p");
?>
<main id="obsah" class="section">
  <div class="wrap">
    <div class="filters">
      <div>
        <p class="filter-label">Kategorie</p>
        <nav class="tabs" aria-label="Kategorie">
<?php foreach ($cats as $k => $label): ?>
          <a href="<?= e($link($k, $sex, $pool)) ?>"<?= $k === $kat ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
<?php endforeach; ?>
        </nav>
      </div>
      <div class="filter-row">
        <div>
          <p class="filter-label">Pohlaví</p>
          <nav class="tabs" aria-label="Pohlaví">
<?php foreach ($sexes as $k => [$label]): ?>
            <a href="<?= e($link($kat, $k, $pool)) ?>"<?= $k === $sex ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
<?php endforeach; ?>
          </nav>
        </div>
        <div>
          <p class="filter-label">Bazén</p>
          <nav class="tabs" aria-label="Bazén">
<?php foreach ($pools as $p): ?>
            <a href="<?= e($link($kat, $sex, $p)) ?>"<?= $p === $pool ? ' aria-current="page"' : '' ?>><?= $p ?> m</a>
<?php endforeach; ?>
          </nav>
        </div>
      </div>
    </div>

    <div class="table-card">
      <table class="table stack">
        <thead><tr><th>Disciplína</th><th class="num">Čas</th><th>Jméno</th><th>Datum</th><th>Místo</th></tr></thead>
        <tbody>
<?php foreach ($rows as $r): ?>
          <tr>
            <td data-label="Disciplína" class="nowrap"><strong><?= e($r['e']) ?></strong></td>
            <td data-label="Čas" class="num"><?= e($r['t']) ?></td>
            <td data-label="Jméno"><?= e($r['h']) ?></td>
            <td data-label="Datum" class="nowrap"><?= e($r['d']) ?></td>
            <td data-label="Místo"><?= e($r['pl']) ?></td>
          </tr>
<?php endforeach; ?>
        </tbody>
      </table>
<?php if (!$rows): ?><p class="empty">Pro tento výběr nejsou rekordy zapsány.</p><?php endif; ?>
    </div>
    <p class="foot-hint">VZ volný způsob, Z znak, P prsa, M motýlek, PZ polohový závod. Zdroj: oddílové rekordy na boh.cz.</p>
  </div>
</main>
<?php render_foot();
