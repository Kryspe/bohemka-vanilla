<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

render_head('pro-rodice', 'Pro rodiče', 'Infolístky k závodům a vzkazy trenérů pro rodiče plavců TJ Bohemians Praha.');
sub_hero('Pro rodiče', 'Infolístky a vzkazy trenérů', 'Termíny sraz, harmonogramy a pokyny k závodům. Nejnovější nahoře.');
$side = data('sidebar');
?>
<main id="obsah" class="section">
  <div class="wrap two-col">
    <div class="msgs">
<?php foreach (data('vzkazy') as $i => $v): ?>
      <article class="msg reveal" id="v<?= e($v['id']) ?>">
        <p class="meta"><?= e(cz_date($v['date'])) ?><?php if ($v['author']): ?> &middot; <?= e($v['author']) ?><?php endif; ?></p>
        <h2><?= e($v['title']) ?></h2>
        <div class="rich"><p><?= $v['html'] /* vyčištěno při sestavení dat */ ?></p></div>
      </article>
<?php endforeach; ?>
    </div>
    <aside class="side">
<?php foreach (($side['alerts'] ?? []) as $a): ?>
      <div class="alert reveal"><h3><?= e($a['title']) ?></h3><p><?= $a['html'] ?></p></div>
<?php endforeach; ?>
      <div class="panel reveal">
        <h3>Platba příspěvků</h3>
        <p>Informace k platbám a rozřazení do skupin jsou v dokumentu Rozřazení do skupin, rozvrh a platby.</p>
        <a class="more" href="<?= e(url('ke-stazeni')) ?>">Ke stažení <span aria-hidden="true">&rarr;</span></a>
      </div>
    </aside>
  </div>
</main>
<?php render_foot();
