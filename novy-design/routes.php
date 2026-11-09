<?php
/**
 * Mapování cest na stránky. Používá router.php (živý PHP) i export.php (statický náhled).
 * Vrací [skript, parametry] nebo null.
 */
declare(strict_types=1);

function nd_resolve(string $path): ?array
{
    $seg = array_values(array_filter(explode('/', trim($path, '/')), 'strlen'));
    $page = $seg[0] ?? 'index';
    $strana = fn(?string $s) => $s !== null && preg_match('/^strana-(\d+)$/', $s, $m) ? $m[1] : '1';

    switch ($page) {
        case 'index':
        case 'pro-rodice':
        case 'statistika':
            return [$page, []];
        case 'aktuality':
            return ['aktuality', ['strana' => $strana($seg[1] ?? null)]];
        case 'aktualita':
            return ['aktualita', ['id' => $seg[1] ?? '']];
        case 'oddil':
            return ['oddil', ['sekce' => $seg[1] ?? 'struktura']];
        case 'zavody':
            return ['zavody', ['zobrazit' => $seg[1] ?? 'nadchazejici']];
        case 'rekordy':
            return ['rekordy', ['kat' => $seg[1] ?? 'open', 'pohlavi' => $seg[2] ?? 'muzi', 'bazen' => $seg[3] ?? '50']];
        case 'foto':
            return ['foto', ['strana' => $strana($seg[1] ?? null)]];
        case 'ke-stazeni':
            return ['ke-stazeni', ['kat' => $seg[1] ?? 'vse', 'strana' => $strana($seg[2] ?? null)]];
    }
    return null;
}
