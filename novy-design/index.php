<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$news = data('news');
$side = data('sidebar');
[$upcoming] = events_split();
$next = $upcoming[0] ?? null;

// Vybereme největší aktualitu s kvalitní fotkou jako hlavní, ostatní do mřížky.
$feature = $news[0] ?? null;
$rest = array_slice($news, 1, 6);

render_head('', '', '', true);
?>
<main id="obsah">

<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-beam" aria-hidden="true"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow reveal">Plavecký oddíl &middot; Praha &middot; od roku 1946</p>
      <h1 class="hero-title"><span class="line"><span>Už to spolu</span></span> <span class="line"><span>táhneme <em>80&nbsp;let</em>.</span></span></h1>
      <p class="hero-lead reveal">Závodní plavání, přípravka a kurzy plavání v Praze. Trénujeme v Podolí a na Vinohradech.</p>
      <div class="hero-actions reveal">
        <a class="pill pill-bright" href="<?= e(url('zavody')) ?>">Nejbližší závody</a>
        <a class="pill pill-ghost" href="<?= e(url('pro-rodice')) ?>">Pro rodiče</a>
      </div>
    </div>

<?php if ($next): $d = days_until($next['date']); ?>
    <aside class="next-card reveal" aria-label="Nejbližší závod">
      <p class="eyebrow">Nejbližší závod</p>
      <h2><?= e($next['name']) ?></h2>
      <p class="next-meta"><?= e(cz_date($next['date'])) ?><?php if (!empty($next['deadline'])): ?> &middot; přihlášky do <?= e(cz_date($next['deadline'])) ?><?php endif; ?></p>
      <div class="next-count" data-date="<?= e($next['date']) ?>">
        <strong><?= max(0, $d) ?></strong>
        <span><?= e(cz_days(max(0, $d))) ?> do startu</span>
      </div>
      <div class="next-links">
<?php foreach (EVENT_LINK_LABELS as $k => $label): if (!empty($next['links'][$k])): ?>
        <a href="<?= e($next['links'][$k]) ?>" rel="noopener"><?= e($label) ?></a>
<?php endif; endforeach; ?>
        <a href="<?= e($next['url']) ?>" rel="noopener">Detail závodu</a>
      </div>
    </aside>
<?php endif; ?>
  </div>
  <svg class="wave-edge wave-light" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 240 90 480 -10 720 40 S 1200 90 1440 40 V80 H0Z"/></svg>
</section>

<?php if (!empty($side['alerts'])): ?>
<section class="section alerts-sec">
  <div class="wrap">
    <h2 class="visually-hidden">Důležité oznámení</h2>
    <div class="alerts">
<?php foreach ($side['alerts'] as $i => $a): ?>
      <article class="alert reveal" style="--d:<?= $i * 80 ?>ms">
        <h3><?= e($a['title']) ?></h3>
        <p><?= $a['html'] /* vyčištěno při sestavení dat */ ?></p>
      </article>
<?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<section class="section">
  <div class="wrap">
    <header class="sec-head reveal">
      <div>
        <p class="eyebrow dark">Aktuality</p>
        <h2>Co je nového v oddíle</h2>
      </div>
      <a class="pill pill-line" href="<?= e(url('aktuality')) ?>">Všechny aktuality &rarr;</a>
    </header>

<?php if ($feature): $fi = news_image($feature); ?>
    <article class="feature reveal">
<?php if ($fi && $fi['big']): ?>
      <a class="feature-img" href="<?= e(article_url($feature['id'])) ?>" tabindex="-1" aria-hidden="true"><img src="<?= e($fi['src']) ?>" alt="" width="<?= $fi['w'] ?>" height="<?= $fi['h'] ?>"></a>
<?php endif; ?>
      <div class="feature-body">
        <p class="meta"><?= e(cz_date($feature['date'])) ?> &middot; <?= e($feature['author']) ?></p>
        <h3><a href="<?= e(article_url($feature['id'])) ?>"><?= e($feature['title']) ?></a></h3>
        <p><?= e(mb_strimwidth(implode(' ', $feature['body']), 0, 340, '...')) ?></p>
        <a class="more" href="<?= e(article_url($feature['id'])) ?>">Číst celé <span aria-hidden="true">&rarr;</span></a>
      </div>
    </article>
<?php endif; ?>

    <div class="cards">
<?php foreach ($rest as $i => $n): news_card($n, ($i % 3) * 80, false, 'h3', 150); endforeach; ?>
    </div>
  </div>
</section>

<section class="section tinted">
  <div class="wrap">
    <header class="sec-head reveal">
      <div>
        <p class="eyebrow dark">Pro rodiče a členy</p>
        <h2>Vše na jednom místě</h2>
      </div>
    </header>
    <div class="trio">
      <div class="panel reveal">
        <h3>Vzkazy pro rodiče</h3>
        <ul class="plain">
<?php foreach (($side['vzkazy'] ?? []) as $v): ?>
          <li><a href="<?= e(url('pro-rodice') . '#v' . $v['id']) ?>"><?= e($v['title']) ?></a><small><?= e(cz_date($v['date'])) ?></small></li>
<?php endforeach; ?>
        </ul>
        <a class="more" href="<?= e(url('pro-rodice')) ?>">Všechny vzkazy <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div class="panel reveal" style="--d:80ms">
        <h3>Novinky ke stažení</h3>
        <ul class="plain">
<?php foreach (($side['downloads'] ?? []) as $d): ?>
          <li><a href="<?= e($d['url']) ?>" rel="noopener"><?= e($d['title']) ?></a><small><?= e(cz_date($d['date'])) ?> &middot; <?= e($d['size']) ?></small></li>
<?php endforeach; ?>
        </ul>
        <a class="more" href="<?= e(url('ke-stazeni')) ?>">Všechny dokumenty <span aria-hidden="true">&rarr;</span></a>
      </div>
      <div class="panel reveal" style="--d:160ms">
        <h3>Poslední fotogalerie</h3>
        <div class="mini-gal">
<?php foreach (($side['galleries'] ?? []) as $g): ?>
          <a href="<?= e(BOH_URL . '/galerie/' . $g['id'] . '/') ?>" rel="noopener">
<?php if (!empty($g['cover'])): ?><img src="<?= e($g['cover']) ?>" alt="" loading="lazy" width="150" height="200"><?php endif; ?>
            <span><?= e($g['title']) ?></span>
          </a>
<?php endforeach; ?>
        </div>
        <a class="more" href="<?= e(url('foto')) ?>">Všechny galerie <span aria-hidden="true">&rarr;</span></a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="sec-head reveal">
      <div>
        <p class="eyebrow dark">Závody</p>
        <h2>Nadcházející závody</h2>
      </div>
      <a class="pill pill-line" href="<?= e(url('zavody')) ?>">Celý kalendář &rarr;</a>
    </header>
    <div class="race-list">
<?php foreach (array_slice($upcoming, 0, 6) as $i => $ev): ?>
      <article class="race reveal" style="--d:<?= ($i % 3) * 60 ?>ms">
        <div class="race-date"><strong><?= (int)substr($ev['date'], 8, 2) ?></strong><span><?= e(cz_month($ev['date'])) ?></span></div>
        <div class="race-main">
          <h3><a href="<?= e($ev['url']) ?>" rel="noopener"><?= e($ev['name']) ?></a></h3>
          <p><?php if (!empty($ev['deadline'])): ?>Přihlášky do <?= e(cz_date($ev['deadline'])) ?><?php endif; ?></p>
        </div>
        <div class="race-links">
<?php foreach (['p', 'r'] as $k): if (!empty($ev['links'][$k])): ?>
          <a href="<?= e($ev['links'][$k]) ?>" rel="noopener"><?= e(EVENT_LINK_LABELS[$k]) ?></a>
<?php endif; endforeach; ?>
        </div>
      </article>
<?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section stats-sec">
  <div class="wrap">
    <div class="stats">
      <div class="stat reveal"><strong data-count="1946">1946</strong><span>rok založení oddílu</span></div>
      <div class="stat reveal" style="--d:80ms"><strong data-count="80">80</strong><span>let tradice</span></div>
      <div class="stat reveal" style="--d:160ms"><strong data-count="7">7</strong><span>tréninkových skupin</span></div>
      <div class="stat reveal" style="--d:240ms"><strong data-count="2">2</strong><span>domácí bazény: Podolí a Vinohrady</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <header class="sec-head reveal">
      <div>
        <p class="eyebrow dark">Oddíl</p>
        <h2>Cesta od kurzů po reprezentaci</h2>
      </div>
      <a class="pill pill-line" href="<?= e(url('oddil')) ?>">Struktura oddílu &rarr;</a>
    </header>
    <div class="groups">
<?php
$groups = [
    ['Kurzy plavání', 'Základní plavání pro děti na samostatném webu kurzy.boh.cz.'],
    ['Přípravka', 'Pro nadějnější plavce z kurzů a pro ty, kteří chtějí závodit.'],
    ['ODB', 'Pro plavce, kteří chtějí trénovat 2x týdně a být připraveni i na závody.'],
    ['ST (eSTéčko)', 'Dříve sportovní třídy. Závodní plavci staršího žactva a juniorů.'],
    ['Výběrové družstvo', 'Trénink pro nejnadějnější plavce a medailisty MČR.'],
    ['ODA', 'Pokračování pro plavce juniory a starší po skupině ST.'],
    ['Veteráni', 'Bývalí plavci starší 25 let, kteří se účastní především závodů.'],
];
foreach ($groups as $i => [$t, $d]): ?>
      <a class="group reveal" style="--d:<?= ($i % 4) * 60 ?>ms" href="<?= e(url('oddil/struktura')) ?>">
        <span class="group-no"><?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
        <h3><?= e($t) ?></h3>
        <p><?= e($d) ?></p>
      </a>
<?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section sponsors">
  <div class="wrap">
    <h2 class="center reveal">Podporují nás</h2>
    <div class="sponsor-row reveal">
      <a href="https://www.praha.eu/" rel="noopener"><img src="<?= e(asset('img/praha.png')) ?>" alt="Hlavní město Praha" height="64" loading="lazy"></a>
      <a href="https://www.czechswimming.cz/" rel="noopener"><img src="<?= e(asset('img/svaz.png')) ?>" alt="Český svaz plaveckých sportů" height="64" loading="lazy"></a>
    </div>
  </div>
</section>

</main>
<?php render_foot(); ?>
