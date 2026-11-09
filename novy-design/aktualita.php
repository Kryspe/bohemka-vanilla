<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$id = route('id');
$all = data('news');
$idx = null;
foreach ($all as $i => $n) { if ($n['id'] === $id) { $idx = $i; break; } }

if ($idx === null) {
    http_response_code(404);
    render_head('aktuality', 'Aktualita nenalezena');
    sub_hero('Aktuality', 'Aktualita nenalezena');
    echo '<main id="obsah" class="section"><div class="wrap narrow"><p>Tuto aktualitu jsme nenašli. <a href="' . e(url('aktuality')) . '">Zpět na aktuality</a></p></div></main>';
    render_foot();
    return;
}

$n = $all[$idx];
$im = news_image($n);
render_head('aktuality', $n['title'], mb_strimwidth(implode(' ', $n['body']), 0, 160, '...'));
?>
<section class="sub-hero sub-hero-article">
  <div class="wrap narrow">
    <p class="eyebrow"><a href="<?= e(url('aktuality')) ?>">&larr; Aktuality</a></p>
    <h1><?= e($n['title']) ?></h1>
    <p class="meta-light"><?= e(cz_date($n['date'])) ?> &middot; <?= e($n['author']) ?></p>
  </div>
  <svg class="wave-edge" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 240 70 480 -10 720 30 S 1200 70 1440 30 V60 H0Z"/></svg>
</section>
<main id="obsah" class="section">
  <article class="wrap narrow article">
<?php if ($im): ?>
    <figure class="article-img<?= $im['big'] ? '' : ' small' ?>"><img src="<?= e($im['src']) ?>" alt="" width="<?= $im['w'] ?>" height="<?= $im['h'] ?>"></figure>
<?php endif; ?>
<?php foreach ($n['body'] as $p): ?>
    <p><?= e($p) ?></p>
<?php endforeach; ?>
    <nav class="article-nav" aria-label="Další aktuality">
<?php if (isset($all[$idx + 1])): ?>
      <a href="<?= e(article_url($all[$idx + 1]['id'])) ?>"><small>Starší</small><?= e($all[$idx + 1]['title']) ?></a>
<?php else: ?><span></span><?php endif; ?>
<?php if (isset($all[$idx - 1])): ?>
      <a class="next" href="<?= e(article_url($all[$idx - 1]['id'])) ?>"><small>Novější</small><?= e($all[$idx - 1]['title']) ?></a>
<?php endif; ?>
    </nav>
  </article>
</main>
<?php render_foot();
