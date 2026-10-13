<?php
/**
 * TJ Bohemians Praha — Full-text Search API
 * Searches events, news, downloads, swimmers, and records in SQLite database.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

require_once __DIR__ . '/db.php';

$q = trim($_GET['q'] ?? '');
if (mb_strlen($q, 'UTF-8') < 2) {
    echo json_encode(['query' => $q, 'count' => 0, 'results' => []], JSON_UNESCAPED_UNICODE);
    exit;
}
if (mb_strlen($q, 'UTF-8') > 100) {
    $q = mb_substr($q, 0, 100, 'UTF-8');
}

$pdo = getDb();
$results = [];

if ($pdo) {
    $escapedQ = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $q);
    $param = '%' . $escapedQ . '%';

    // 1. Závody
    try {
        $stmt = $pdo->prepare("SELECT id, name AS title, place, date, type, kind FROM events WHERE name LIKE :q ESCAPE '\\' OR place LIKE :q ESCAPE '\\' OR disciplines_json LIKE :q ESCAPE '\\' LIMIT 8");
        $stmt->execute([':q' => $param]);
        while ($row = $stmt->fetch()) {
            $results[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'subtitle' => ($row['place'] ?? '') . ' • ' . ($row['date'] ?? '') . ' (' . ($row['type'] ?? 'Závod') . ')',
                'category' => 'Závod',
                'url' => 'zavody.html#' . $row['id']
            ];
        }
    } catch (Exception $e) {}

    // 2. Aktuality
    try {
        $stmt = $pdo->prepare("SELECT id, title, excerpt, date FROM news WHERE title LIKE :q OR excerpt LIKE :q LIMIT 8");
        $stmt->execute([':q' => $param]);
        while ($row = $stmt->fetch()) {
            $excerpt = !empty($row['excerpt']) ? mb_substr(strip_tags($row['excerpt']), 0, 110, 'UTF-8') . '…' : '';
            $results[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'subtitle' => $excerpt . ' (' . ($row['date'] ?? '') . ')',
                'category' => 'Aktualita',
                'url' => 'aktuality.html#' . $row['id']
            ];
        }
    } catch (Exception $e) {}

    // 3. Dokumenty ke stažení
    try {
        $stmt = $pdo->prepare("SELECT id, title, description, category, file_name, file_size FROM downloads WHERE title LIKE :q OR description LIKE :q OR file_name LIKE :q LIMIT 8");
        $stmt->execute([':q' => $param]);
        while ($row = $stmt->fetch()) {
            $results[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'subtitle' => ($row['description'] ?? '') . ' • ' . ($row['file_name'] ?? '') . ' (' . ($row['file_size'] ?? '') . ')',
                'category' => 'Ke stažení',
                'url' => 'ke-stazeni.html'
            ];
        }
    } catch (Exception $e) {}

    // 4. Plavci a trenéři
    try {
        $stmt = $pdo->prepare("SELECT id, name AS title, birth_year, category, role, bio FROM swimmers WHERE name LIKE :q OR bio LIKE :q LIMIT 8");
        $stmt->execute([':q' => $param]);
        while ($row = $stmt->fetch()) {
            $results[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'subtitle' => 'Ročník ' . ($row['birth_year'] ?? '') . ' • ' . ($row['category'] ?? '') . ' • ' . ($row['role'] ?? 'Plavec'),
                'category' => 'Plavec',
                'url' => 'intranet.html'
            ];
        }
    } catch (Exception $e) {}

    // 5. Oddílové rekordy
    try {
        $stmt = $pdo->prepare("SELECT id, event, time, swimmer, year, category, pool FROM records WHERE swimmer LIKE :q OR event LIKE :q LIMIT 8");
        $stmt->execute([':q' => $param]);
        while ($row = $stmt->fetch()) {
            $results[] = [
                'id' => 'rec-' . $row['id'],
                'title' => $row['event'] . ' — ' . $row['time'] . ' (' . $row['swimmer'] . ')',
                'subtitle' => 'Rekord Bohemians • ' . $row['category'] . ' • Bazén ' . $row['pool'] . ' • Rok ' . $row['year'],
                'category' => 'Rekord',
                'url' => 'rekordy.html'
            ];
        }
    } catch (Exception $e) {}
}

// Global Site Pages
$sitePages = [
    ['title' => 'O oddílu — historie 80 let a tréninkové skupiny', 'subtitle' => 'Představení TJ Bohemians Praha, trenéři Jan Srb a Martin Břenda, Podolí a Vinohrady', 'category' => 'Stránka', 'url' => 'oddil.html'],
    ['title' => 'Oddílové vybavení Arena Bohemians', 'subtitle' => 'Oficiální zelenobílé plavky, čepičky a batohy Spiky III s logem klokana', 'category' => 'Stránka', 'url' => 'oddil.html#vybaveni'],
    ['title' => 'Závody a přihlášky — sezóna 2026/2027', 'subtitle' => 'Kalendář plaveckých závodů a soustředění s iCal (.ics) exportem do kalendáře', 'category' => 'Stránka', 'url' => 'zavody.html'],
    ['title' => 'Oddílové rekordy — 25m & 50m bazén', 'subtitle' => '396 oficiálních historických rekordů: Open, Dorost a Žactvo', 'category' => 'Stránka', 'url' => 'rekordy.html'],
    ['title' => 'Statistika a kalkulačka FINA / AQUA bodů', 'subtitle' => 'Výpočet bodů World Aquatics, převodník časů 25m/50m a výkonnostní třídy ČSPS', 'category' => 'Stránka', 'url' => 'statistika.html'],
    ['title' => 'Ke stažení — rozpisy drah a směrnice', 'subtitle' => 'Rozpisy tréninků v Podolí a na Vinohradech, přihlášky, stanovy a formuláře', 'category' => 'Stránka', 'url' => 'ke-stazeni.html'],
    ['title' => 'Pro rodiče — informace a lékařské prohlídky', 'subtitle' => 'Pokyny pro rodiče, platnost prohlídek, příspěvky a vzkazy od trenérů', 'category' => 'Stránka', 'url' => 'pro-rodice.html'],
    ['title' => 'Fotogalerie — 80 let tradice (1946–2026)', 'subtitle' => 'Fotoreportáže ze závodů, video archiv oslavy na Zonerama a fotky na Hagiboru', 'category' => 'Stránka', 'url' => 'foto.html'],
    ['title' => 'Kontakt — vedení oddílu a tréninkové areály', 'subtitle' => 'Mgr. Jan Srb, Bc. Martin Břenda, bazény Podolí a Sokol Vinohrady', 'category' => 'Stránka', 'url' => 'kontakt.html'],
    ['title' => 'Intranet plavce a trenéra', 'subtitle' => 'Křivka progrese časů, semafor lékařské prohlídky a přehled přihlášek', 'category' => 'Stránka', 'url' => 'intranet.html'],
    ['title' => 'Administrace oddílu — správa a export', 'subtitle' => 'Export přihlášek ČSPS CSV a Lenex 3.0 pro Super Usera, správa novinek', 'category' => 'Stránka', 'url' => 'admin.html']
];

$lq = mb_strtolower($q, 'UTF-8');
foreach ($sitePages as $p) {
    if (str_contains(mb_strtolower($p['title'], 'UTF-8'), $lq) || str_contains(mb_strtolower($p['subtitle'], 'UTF-8'), $lq)) {
        $results[] = $p;
    }
}

echo json_encode([
    'query' => $q,
    'count' => count($results),
    'results' => $results
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
