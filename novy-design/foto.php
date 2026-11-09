<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$all = data('galleries');
[$items, $page, $pages] = paginate($all, (int)route('strana', '1'), 30);
$covers = $page === 1 ? array_slice(array_values(array_filter($all, fn($g) => !empty($g['cover']))), 0, 4) : [];

render_head('foto', 'Foto', 'Fotogalerie ze závodů a akcí plaveckého oddílu TJ Bohemians Praha.');
sub_hero('Foto', 'Fotogalerie', 'Fotky ze závodů, soustředění a oddílových akcí. Galerie se otevírají na boh.cz.');
?>
<main id="obsah" class="section">
  <div class="wrap">
<?php if ($covers): ?>
    <div class="covers">
<?php foreach ($covers as $i => $g): ?>
      <a class="cover reveal" style="--d:<?= $i * 70 ?>ms" href="<?= e(BOH_URL . '/galerie/' . $g['id'] . '/') ?>" rel="noopener">
        <img src="<?= e($g['cover']) ?>" alt="" loading="lazy" width="300" height="400">
        <span><?= e($g['title']) ?><small><?= e(cz_date($g['date'])) ?> &middot; <?= (int)$g['count'] ?> fotek</small></span>
      </a>
<?php endforeach; ?>
    </div>
<?php endif; ?>
    <div class="toolbar">
      <h2 class="h-inline">Všechny galerie</h2>
      <label class="search"><span class="visually-hidden">Hledat galerii</span><input type="search" placeholder="Hledat galerii..." data-filter="#gal-table tbody tr" autocomplete="off"></label>
    </div>
    <div class="table-card">
      <table class="table stack" id="gal-table">
        <thead><tr><th>Galerie</th><th>Datum</th><th class="num">Fotek</th></tr></thead>
        <tbody>
<?php foreach ($items as $g): ?>
          <tr>
            <td data-label="Galerie"><a class="title-link" href="<?= e(BOH_URL . '/galerie/' . $g['id'] . '/') ?>" rel="noopener"><?= e($g['title']) ?></a></td>
            <td data-label="Datum" class="nowrap"><?= e(cz_date($g['date'])) ?></td>
            <td data-label="Fotek" class="num"><?= (int)$g['count'] ?></td>
          </tr>
<?php endforeach; ?>
        </tbody>
      </table>
    </div>
    <?= pager($page, $pages, fn(int $p) => $p === 1 ? url('foto') : url('foto/strana-' . $p)) ?>
  </div>
</main>
<?php render_foot();
