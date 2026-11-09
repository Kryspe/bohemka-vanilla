<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
render_head('', 'Stránka nenalezena');
sub_hero('404', 'Stránka nenalezena', 'Takovou stránku jsme nenašli.');
?>
<main id="obsah" class="section"><div class="wrap narrow"><p><a class="pill pill-bright" href="<?= e(url()) ?>">Zpět na úvod</a></p></div></main>
<?php render_foot();
