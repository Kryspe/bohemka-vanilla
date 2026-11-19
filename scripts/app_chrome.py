#!/usr/bin/env python3
"""Zapne nebo vypne "aplikační" prvky webu na telefonu: dolní lištu (tab bar) a zvonek s oznámeními.

  python3 scripts/app_chrome.py off   # webový vzhled (výchozí stav od 19. 11. 2026): hamburger v hlavičce, bez lišty a zvonku
  python3 scripts/app_chrome.py on    # vrátí dolní lištu, zvonek a dolní výsuvnou nabídku

Zdroj prvků: archive/app-chrome/*.html. Skript upraví všechny kořenové *.html stránky a třídu `app-chrome` na <body>.
CSS a JS zůstávají v css/style.css a js/app.js; třída `app-chrome` v css/design.css přepíná vzhled.
"""
import glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, "archive", "app-chrome")
NAV_RE = re.compile(r"    <!-- MOBILE BOTTOM NAVIGATION.*?</nav>\n\n", re.S)
BELL_RE = re.compile(r'            <button type="button" class="d-icon-btn d-bell notification-bell-btn".*?</button>\n', re.S)

def read(n):
    with open(os.path.join(A, n), encoding="utf-8") as f:
        return f.read()

def main(mode):
    nav, bell = read("bottom-nav.html"), read("notification-bell.html")
    changed = 0
    for p in sorted(glob.glob(os.path.join(ROOT, "*.html"))):
        s = o = open(p, encoding="utf-8").read()
        s = NAV_RE.sub("", s)
        s = BELL_RE.sub("", s)
        s = re.sub(r'(<body class=")app-chrome ', r"\1", s)
        if mode == "on" and "d-site-header" in s:
            s = s.replace("    <!-- MOBILE DRAWER", nav + "    <!-- MOBILE DRAWER", 1)
            s = s.replace('            <a class="d-header-cta"', bell + '            <a class="d-header-cta"', 1)
            s = re.sub(r'<body class="', '<body class="app-chrome ', s, count=1)
        if s != o:
            open(p, "w", encoding="utf-8").write(s)
            changed += 1
    print(mode, "- upraveno stránek:", changed)

if __name__ == "__main__" and len(sys.argv) == 2 and sys.argv[1] in ("on", "off"):
    main(sys.argv[1])
else:
    print(__doc__)
