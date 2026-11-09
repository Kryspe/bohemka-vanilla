<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

[$items, $page, $pages] = paginate(data('news'), (int)route('strana', '1'), 12);

render_head('aktuality', 'Aktuality', 'Aktuality plaveckého oddílu TJ Bohemians Praha: hodnocení závodů, soustředění a oznámení trenérů.');
sub_hero('Aktuality', 'Co je nového v oddíle', 'Hodnocení závodů, soustředění a oznámení trenérů. Nejnovější nahoře.');
?>
<main id="obsah" class="section">
  <div class="wrap">
    <div class="cards cards-list">
<?php foreach ($items as $i => $n): news_card($n, ($i % 3) * 70, true, 'h2', 170); endforeach; ?>
    </div>
    <?= pager($page, $pages, fn(int $p) => $p === 1 ? url('aktuality') : url('aktuality/strana-' . $p)) ?>
  </div>
</main>
<?php render_foot();
