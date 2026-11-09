<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

$modes = ['nadchazejici' => 'Nadcházející', 'probehle' => 'Proběhlé', 'vse' => 'Vše'];
$mode = route('zobrazit', 'nadchazejici');
if (!isset($modes[$mode])) $mode = 'nadchazejici';

[$up, $past] = events_split();
$rows = $mode === 'nadchazejici' ? $up : ($mode === 'probehle' ? $past : array_merge($up, $past));
$today = date('Y-m-d');

render_head('zavody', 'Závody', 'Kalendář závodů plaveckého oddílu TJ Bohemians Praha s termíny přihlášek, rozpisy a výsledky.');
sub_hero('Závody', 'Kalendář závodů', 'Přihlášení, rozpisy a výsledky se otevírají na boh.cz, kde se přihlašuje jako dosud.');
?>
<main id="obsah" class="section">
  <div class="wrap">
    <div class="toolbar">
      <nav class="tabs" aria-label="Zobrazení závodů">
<?php foreach ($modes as $k => $label): ?>
        <a href="<?= e(url('zavody/' . $k)) ?>"<?= $k === $mode ? ' aria-current="page"' : '' ?>><?= e($label) ?> <span class="count"><?= $k === 'nadchazejici' ? count($up) : ($k === 'probehle' ? count($past) : count($up) + count($past)) ?></span></a>
<?php endforeach; ?>
      </nav>
      <label class="search"><span class="visually-hidden">Hledat závod</span><input type="search" placeholder="Hledat závod..." data-filter="#race-table tbody tr" autocomplete="off"></label>
    </div>

    <div class="table-card">
      <table class="table stack" id="race-table">
        <thead><tr><th>Závod</th><th>Datum</th><th>Přihlášky do</th><th>Odkazy</th></tr></thead>
        <tbody>
<?php $first = true; foreach ($rows as $ev): $isUp = $ev['date'] >= $today; ?>
          <tr class="<?= $isUp ? ($first ? 'is-next' : '') : 'is-past' ?>">
            <td data-label="Závod"><a class="title-link" href="<?= e($ev['url']) ?>" rel="noopener"><?= e($ev['name']) ?></a></td>
            <td data-label="Datum" class="nowrap"><?= e(cz_date($ev['date'])) ?></td>
            <td data-label="Přihlášky do" class="nowrap"><?php if (!empty($ev['deadline'])): ?><?= e(cz_date($ev['deadline'])) ?><?php if ($isUp): ?> <span class="badge <?= $ev['deadline'] < $today ? 'badge-warn' : '' ?>"><?= $ev['deadline'] < $today ? 'uzavřeno' : 'otevřeno' ?></span><?php endif; ?><?php endif; ?></td>
            <td data-label="Odkazy" class="links"><?php foreach (EVENT_LINK_LABELS as $k => $label): if (!empty($ev['links'][$k])): ?><a href="<?= e($ev['links'][$k]) ?>" rel="noopener"><?= e($label) ?></a><?php endif; endforeach; ?></td>
          </tr>
<?php if ($isUp) $first = false; endforeach; ?>
        </tbody>
      </table>
<?php if (!$rows): ?><p class="empty">Žádný závod.</p><?php endif; ?>
    </div>
  </div>
</main>
<?php render_foot();
