<?php
/**
 * TJ Bohemians Praha — Router for built-in PHP web server (php -S)
 */
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$filePath = __DIR__ . $uri;

// 1. Clean URL redirects (301)
if ($uri === '/index.html' || $uri === '/index.php') {
    $target = '/';
    if (!empty($_SERVER['QUERY_STRING'])) $target .= '?' . $_SERVER['QUERY_STRING'];
    header('Location: ' . $target, true, 301);
    return true;
}
if (preg_match('#^/(.+)\.(html|php)$#i', $uri, $m)) {
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
