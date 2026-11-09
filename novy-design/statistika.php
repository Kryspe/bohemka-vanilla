<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

render_head('statistika', 'Statistika', 'Statistika výkonů plavců TJ Bohemians Praha.');
sub_hero('Statistika', 'Výkony plavců oddílu', 'Žebříčky podle disciplíny, družstva, bazénu a roku.');
$stat = array_values(array_filter(data('downloads'), fn($d) => $d['category'] === 'Statistiky a rekordy'));
?>
<main id="obsah" class="section">
  <div class="wrap narrow">
    <div class="panel big reveal">
      <h2>Interaktivní statistika</h2>
      <p>Žebříčky výkonů se filtrují podle disciplíny, družstva, bazénu, pohlaví a roku. Tuto část zatím vede původní web, proto ji otevřeme přímo, bez kopie, která by zastarávala.</p>
      <a class="pill pill-bright" href="<?= e(BOH_URL . '/index.php?page=stat') ?>" rel="noopener">Otevřít statistiku na boh.cz</a>
    </div>
    <h2 class="h-sec reveal">Roční oddílové tabulky (PDF)</h2>
    <p class="reveal">Rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. každého roku.</p>
    <ul class="doc-list reveal">
<?php foreach (array_slice($stat, 0, 8) as $d): ?>
      <li><a href="<?= e($d['url']) ?>" rel="noopener"><?= e($d['title']) ?></a><small><?= e(cz_date($d['date'])) ?> &middot; <?= e($d['size']) ?></small></li>
<?php endforeach; ?>
    </ul>
    <p class="reveal"><a class="more" href="<?= e(url('rekordy')) ?>">Oddílové rekordy <span aria-hidden="true">&rarr;</span></a></p>
  </div>
</main>
<?php render_foot();
