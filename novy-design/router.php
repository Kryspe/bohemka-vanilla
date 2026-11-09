<?php
/**
 * Router pro vestavěný server:  php -S 0.0.0.0:8090 -t novy-design novy-design/router.php
 * Čisté adresy bez přípon. Stejné cesty používá i statický export (export.php).
 */
declare(strict_types=1);

require __DIR__ . '/routes.php';

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');

// statické soubory (css, js, fonty, obrázky) vrátí přímo server
$file = __DIR__ . $path;
if ($path !== '/' && is_file($file) && !str_ends_with($file, '.php')) {
    return false;
}

$resolved = nd_resolve($path);
if ($resolved === null) {
    http_response_code(404);
    $resolved = ['404', []];
}
[$script, $GLOBALS['ND_ROUTE']] = $resolved;

require __DIR__ . '/lib.php';
require __DIR__ . '/' . $script . '.php';
