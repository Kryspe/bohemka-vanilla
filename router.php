<?php
/**
 * TJ Bohemians Praha — Router for built-in PHP web server (php -S)
 */
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$filePath = __DIR__ . $uri;

// Security Guard: Block access to sensitive files and directories (/data/, .sqlite, .env, .git, server.cjs)
$lowerUri = strtolower($uri);
if (
    str_starts_with($lowerUri, '/data/') ||
    str_contains($lowerUri, '/.') ||
    str_ends_with($lowerUri, '.sqlite') ||
    str_ends_with($lowerUri, '.db') ||
    str_ends_with($lowerUri, '.env') ||
    str_ends_with($lowerUri, '.htaccess') ||
    str_ends_with($lowerUri, 'server.js') ||
    str_ends_with($lowerUri, 'server.cjs')
) {
    http_response_code(403);
    echo '403 Forbidden: Access to protected resources is denied.';
    return true;
}

// Route Aliases & API Parity (/api/config, /api/event_entries)
if ($uri === '/api/config' || $uri === '/api/config.php' || $uri === '/api/config.js') {
    require __DIR__ . '/api/config.php';
    return true;
}
if ($uri === '/api/event_entries' || $uri === '/api/event_entries.php') {
    require __DIR__ . '/api/entries.php';
    return true;
}

// 1. Clean URL redirects (301)
if ($uri === '/index.html' || $uri === '/index.php') {
    $target = '/';
    if (!empty($_SERVER['QUERY_STRING'])) $target .= '?' . $_SERVER['QUERY_STRING'];
    header('Location: ' . $target, true, 301);
    return true;
}
if (!str_starts_with($uri, '/api/') && preg_match('#^/(.+)\.(html|php)$#i', $uri, $m)) {
    if ($m[1] !== '404') {
        $target = '/' . $m[1];
        if (!empty($_SERVER['QUERY_STRING'])) $target .= '?' . $_SERVER['QUERY_STRING'];
        header('Location: ' . $target, true, 301);
        return true;
    }
}

// 2. Serve root
if ($uri === '/' || $uri === '') {
    if (file_exists(__DIR__ . '/index.php')) {
        require __DIR__ . '/index.php';
        return true;
    }
    if (file_exists(__DIR__ . '/index.html')) {
        return false;
    }
}

// 3. Direct static files (assets, css, js, etc.)
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

// 3. Clean URLs pointing to PHP files
if (file_exists($filePath . '.php')) {
    require $filePath . '.php';
    return true;
}

// 4. Clean URLs pointing to HTML files
if (file_exists($filePath . '.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($filePath . '.html');
    return true;
}

// 5. Fallback 404
http_response_code(404);
if (file_exists(__DIR__ . '/404.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/404.html');
    return true;
}
echo '404 Not Found';
return true;
