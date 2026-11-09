<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$all = data('downloads');
$cats = ['vse' => 'Vše'];
foreach ($all as $d) { $cats[slugify($d['category'])] = $d['category']; }
$kat = route('kat', 'vse'); if (!isset($cats[$kat])) $kat = 'vse';
$list = $kat === 'vse' ? $all : array_values(array_filter($all, fn($d) => slugify($d['category']) === $kat));
[$items, $page, $pages] = paginate($list, (int)route('strana', '1'), 30);

render_head('ke-stazeni', 'Ke stažení', 'Dokumenty ke stažení: rozřazení do skupin, rozvrhy, statistiky a formuláře plaveckého oddílu TJ Bohemians Praha.');
sub_hero('Ke stažení', 'Dokumenty oddílu', 'Rozřazení do skupin, rozvrhy, statistiky, formuláře a další. Soubory se otevírají na boh.cz.');
?>
<main id="obsah" class="section">
  <div class="wrap">
    <div class="toolbar">
      <nav class="tabs" aria-label="Kategorie dokumentů">
<?php foreach ($cats as $k => $label): ?>
        <a href="<?= e($k === 'vse' ? url('ke-stazeni') : url('ke-stazeni/' . $k)) ?>"<?= $k === $kat ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
<?php endforeach; ?>
      </nav>
      <label class="search"><span class="visually-hidden">Hledat dokument</span><input type="search" placeholder="Hledat dokument..." data-filter="#dl-table tbody tr" autocomplete="off"></label>
    </div>
    <div class="table-card">
      <table class="table stack" id="dl-table">
        <thead><tr><th>Název</th><th>Kategorie</th><th class="num">Velikost</th><th>Datum</th></tr></thead>
        <tbody>
<?php foreach ($items as $d): ?>
          <tr>
            <td data-label="Název"><a class="title-link" href="<?= e($d['url']) ?>" rel="noopener"><?= e($d['title']) ?></a></td>
            <td data-label="Kategorie" class="nowrap"><?= e($d['category']) ?></td>
            <td data-label="Velikost" class="num"><?= e($d['size']) ?></td>
            <td data-label="Datum" class="nowrap"><?= e(cz_date($d['date'])) ?></td>
          </tr>
<?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <?= pager($page, $pages, fn(int $p) => $p === 1 ? url($kat === 'vse' ? 'ke-stazeni' : 'ke-stazeni/' . $kat) : url('ke-stazeni/' . $kat . '/strana-' . $p)) ?>
  </div>
</main>
<?php render_foot();
