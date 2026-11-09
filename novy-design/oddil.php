<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$tabs = ['struktura' => 'Struktura', 'historie' => 'Historie', 'kontakty' => 'Kontakty', 'sponzori' => 'Sponzoři'];
$sekce = route('sekce', 'struktura');
if (!isset($tabs[$sekce])) $sekce = 'struktura';
$oddil = data('oddil');

render_head('oddil', 'Oddíl - ' . $tabs[$sekce], 'Struktura, historie, kontakty a sponzoři plaveckého oddílu TJ Bohemians Praha.');
sub_hero('Oddíl', $tabs[$sekce], 'TJ Bohemians Praha, plavecký oddíl od roku 1946.');
?>
<main id="obsah" class="section">
  <div class="wrap narrow">
    <nav class="tabs" aria-label="Sekce oddílu">
<?php foreach ($tabs as $k => $label): ?>
      <a href="<?= e(url('oddil/' . $k)) ?>"<?= $k === $sekce ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
<?php endforeach; ?>
      <a href="<?= e(BOH_URL . '/oddil/veci/') ?>" rel="noopener">Nabídka věcí (boh.cz)</a>
    </nav>
    <div class="rich rich-lg reveal">
      <?= $oddil[$sekce] ?? '' /* vyčištěno při sestavení dat */ ?>
    </div>
  </div>
</main>
<?php render_foot();
