<?php
/**
 * Klokani — Aktuality & Články
 * TJ Bohemians Praha (oddíl plavání)
 */

require_once __DIR__ . '/includes/db.php';

$pdo = getDb();

$articleId = trim($_GET['id'] ?? '');

if (!empty($articleId)) {
    $stmt = $pdo->prepare("SELECT * FROM news WHERE id = :id OR slug = :id LIMIT 1");
    $stmt->execute([':id' => $articleId]);
    $article = $stmt->fetch();

    if ($article) {
        $pageTitle = $article['title'] . ' — Aktuality | TJ Bohemians Praha';
        $pageDescription = $article['excerpt'] ?? 'Oddílová aktualita TJ Bohemians Praha.';
    } else {
        $pageTitle = 'Aktualita nenalezena — TJ Bohemians Praha';
        $pageDescription = 'Požadovaná aktualita nebyla nalezena.';
    }
} else {
    $pageTitle = 'Aktuality — Klokani | TJ Bohemians Praha';
    $pageDescription = 'Novinky, hodnocení závodů a informace z plaveckého oddílu Klokani.';
    $allNews = $pdo->query("SELECT * FROM news ORDER BY date DESC")->fetchAll();
}

$currentPage = 'aktuality';
require_once __DIR__ . '/includes/header.php';
?>

<main class="w-full min-w-0 flex-1 overflow-x-clip pb-24 lg:pb-0" id="main-content">

<?php if (!empty($articleId)): ?>
  <?php if ($article): ?>
    <!-- ARTICLE DETAIL IN READABLE ROUNDED BUBBLE CARD -->
    <div class="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <a href="aktuality.php" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-6">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7m-7 7h14"/></svg>
        Zpět na přehled aktualit
      </a>

      <article class="rounded-2xl border border-border/80 bg-card/90 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
        <div class="flex items-center gap-2 text-xs font-semibold text-primary">
          <time datetime="<?= e($article['date']) ?>"><?= date('d. m. Y', strtotime($article['date'])) ?></time>
          <span>·</span>
          <span class="text-muted-foreground"><?= e($article['author'] ?? 'Jan Srb') ?></span>
        </div>

        <h1 class="mt-3 font-display text-2xl font-extrabold sm:text-4xl text-foreground leading-tight">
          <?= e($article['title']) ?>
        </h1>

        <?php if (!empty($article['image_url'])): ?>
          <div class="my-6 overflow-hidden rounded-xl border border-border/70 bg-background/50">
            <img src="<?= e($article['image_url']) ?>" alt="<?= e($article['title']) ?>" class="w-full max-h-[460px] object-cover">
          </div>
        <?php endif; ?>

        <div class="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
          <?php 
            $paragraphs = preg_split('/[\r\n]+[\r\n]+/', trim($article['body'] ?? ''));
            foreach ($paragraphs as $p):
              if (trim($p) === '') continue;
          ?>
            <p><?= nl2br(e(trim($p))) ?></p>
          <?php endforeach; ?>
        </div>
      </article>
    </div>
  <?php else: ?>
    <!-- 404 NOT FOUND -->
    <div class="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 class="font-display text-3xl font-bold text-foreground">Aktualita nenalezena</h1>
      <p class="mt-3 text-muted-foreground">Článek s tímto identifikátorem v databázi neexistuje.</p>
      <a href="aktuality.php" class="mt-6 inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-95">
        Zpět na přehled aktualit
      </a>
    </div>
  <?php endif; ?>

<?php else: ?>
  <!-- NEWS ARCHIVE / LIST -->
  <section class="border-b border-border/70 bg-gradient-to-b from-card to-background py-10 sm:py-14">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          Oddílové zprávy
        </div>
        <h1 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Aktuality</h1>
        <p class="mt-3 text-base text-muted-foreground sm:text-lg leading-relaxed">
          Hodnocení závodů, organizační informace, úspěchy našich plavců a dění v oddíle TJ Bohemians Praha.
        </p>
      </div>
    </div>
  </section>

  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <div class="space-y-4">
      <?php foreach ($allNews as $n): ?>
        <a href="aktuality.php?id=<?= urlencode($n['id']) ?>" class="card-clean p-5 sm:p-6 block">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <?php if (!empty($n['image_url'])): ?>
              <div class="w-full shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:w-48 sm:h-36">
                <img src="<?= e($n['image_url']) ?>" alt="<?= e($n['title']) ?>" class="h-44 w-full object-cover sm:h-full" loading="lazy">
              </div>
            <?php endif; ?>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 text-xs font-semibold text-primary">
                <time datetime="<?= e($n['date']) ?>"><?= date('d. m. Y', strtotime($n['date'])) ?></time>
                <span>·</span>
                <span class="text-muted-foreground"><?= e($n['author'] ?? 'Jan Srb') ?></span>
              </div>
              <h2 class="mt-1.5 font-display text-lg font-bold text-foreground sm:text-xl leading-snug">
                <?= e($n['title']) ?>
              </h2>
              <p class="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                <?= e($n['excerpt']) ?>
              </p>
              <span class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Číst článek &rarr;
              </span>
            </div>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>

<?php endif; ?>

</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
