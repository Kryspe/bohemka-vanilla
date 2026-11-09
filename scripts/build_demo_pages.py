#!/usr/bin/env python3
"""Vygeneruje statické stránky dema (demo/*.html) z jedne sablony. Pouziti: python3 scripts/build_demo_pages.py"""
import html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "demo")

MENU = [
    ("news", "Aktuality", "/demo/"),
    ("vzkazy", "Pro rodiče", "/demo/vzkazy"),
    ("oddil", "Oddíl", "/demo/oddil"),
    ("zavody", "Závody", "/demo/zavody"),
    ("rekordy", "Rekordy", "/demo/rekordy"),
    ("statistika", "Statistika", "/demo/statistika"),
    ("foto", "Foto", "/demo/foto"),
    ("stahovani", "Ke stažení", "/demo/stahovani"),
    ("intranet", "Intranet", "https://www.boh.cz/index.php?page=login"),
]

LAYOUT = """<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#06371c">
<link rel="icon" href="/assets/favicon.png">
<link rel="stylesheet" href="/demo/css/demo.css">
<script defer src="/demo/js/demo.js"></script>
</head>
<body data-page="{page}">
<a class="skip" href="#obsah">Přeskočit na obsah</a>
<header class="site-header">
  <div class="head-inner">
    <a class="logo" href="/demo/" aria-label="TJ Bohemians Praha, oddíl plavání - úvod"><img src="/assets/logo8.png" alt="TJ Bohemians Praha, oddíl plavání, 1946-2026" width="228" height="64"></a>
    <div class="head-links">
      <a href="https://www.boh.cz/">Původní web boh.cz</a>
      <a href="https://www.facebook.com/boh.cz/" rel="noopener">Facebook</a>
      <a href="mailto:jan.srb@czechswimming.cz">jan.srb@czechswimming.cz</a>
    </div>
  </div>
  <nav class="menu" aria-label="Hlavní menu">
    <ul>
{menu}
    </ul>
  </nav>
</header>
<div class="page">
<main id="obsah" class="main">
{body}
</main>
<aside id="aside" class="aside" aria-label="Postranní panel"></aside>
</div>
<footer class="site-footer">
  <div class="foot-inner">
    <span>&copy; 2007&ndash;2026 TJ Bohemians Praha, oddíl plavání</span>
    <span>Demo nového vzhledu. Obsah pochází z <a href="https://www.boh.cz/">boh.cz</a>.</span>
  </div>
</footer>
</body>
</html>
"""


def menu_html(active):
    items = []
    for key, label, href in MENU:
        cur = ' aria-current="page"' if key == active else ""
        items.append('      <li><a href="%s"%s>%s</a></li>' % (html.escape(href, quote=True), cur, label))
    return "\n".join(items)


NOSCRIPT = '<noscript><p class="note">Tato stránka potřebuje JavaScript. Aktuální informace najdete na <a href="https://www.boh.cz/">boh.cz</a>.</p></noscript>'

PAGE_OVERRIDE = {"aktualita": "article"}

PAGES = {
    "index": ("news", "TJ Bohemians Praha - oddíl plavání, aktuality", "Aktuality plaveckého oddílu TJ Bohemians Praha: hodnocení závodů, soustředění a oznámení trenérů.", f"""<h1>Aktuality</h1>
{NOSCRIPT}
<div id="news"><p class="empty">Načítám aktuality&hellip;</p></div>
<p><button type="button" class="btn btn-line" id="more">Starší aktuality</button></p>"""),

    "aktualita": ("news", "Aktualita | TJ Bohemians Praha", "Aktualita plaveckého oddílu TJ Bohemians Praha.", f"""{NOSCRIPT}
<p class="more-link"><a href="/demo/">&larr; Všechny aktuality</a></p>
<div id="article"><p class="empty">Načítám&hellip;</p></div>"""),

    "vzkazy": ("vzkazy", "Pro rodiče | TJ Bohemians Praha", "Vzkazy trenérů a infolístky k závodům pro rodiče plavců TJ Bohemians Praha.", f"""<h1>Pro rodiče</h1>
<p class="lead">Infolístky k závodům a vzkazy trenérů. Nejnovější nahoře.</p>
{NOSCRIPT}
<div id="vzkazy"><p class="empty">Načítám&hellip;</p></div>"""),

    "oddil": ("oddil", "Oddíl | TJ Bohemians Praha", "Historie, struktura, kontakty a sponzoři plaveckého oddílu TJ Bohemians Praha.", f"""<h1>Oddíl</h1>
<ul class="tabs" id="oddil-tabs">
  <li><a href="#historie" aria-current="false">Historie</a></li>
  <li><a href="#struktura" aria-current="true">Struktura</a></li>
  <li><a href="#kontakty" aria-current="false">Kontakty</a></li>
  <li><a href="#sponzori" aria-current="false">Sponzoři</a></li>
  <li><a href="https://www.boh.cz/oddil/veci/" aria-current="false">Nabídka věcí (boh.cz)</a></li>
</ul>
{NOSCRIPT}
<div id="oddil-body"><p class="empty">Načítám&hellip;</p></div>"""),

    "zavody": ("zavody", "Závody | TJ Bohemians Praha", "Kalendář závodů plaveckého oddílu TJ Bohemians Praha s termíny přihlášek, rozpisy a výsledky.", f"""<h1>Závody</h1>
<p class="note">Přihlášení, rozpisy a výsledky otevírají původní stránky na boh.cz, kde se přihlašuje jako dosud.</p>
{NOSCRIPT}
<div id="ev-wrap">
  <div class="tools">
    <div>
      <span class="tools-label" style="display:block;font-size:13px;color:#5a665f;margin-bottom:2px">Zobrazit</span>
      <div class="tabs" id="ev-filters" style="margin:0">
        <button type="button" data-mode="next" aria-pressed="true">Nadcházející</button>
        <button type="button" data-mode="past" aria-pressed="false">Proběhlé</button>
        <button type="button" data-mode="all" aria-pressed="false">Vše</button>
      </div>
    </div>
    <div>
      <label for="ev-search">Hledat závod</label>
      <input type="search" id="ev-search" placeholder="např. Plzeň" autocomplete="off">
    </div>
  </div>
  <div class="table-wrap">
    <table class="stack">
      <thead><tr><th>Závod</th><th>Datum</th><th>Přihlášky do</th><th>Odkazy</th></tr></thead>
      <tbody id="ev-body"></tbody>
    </table>
  </div>
  <p class="empty" id="ev-empty" hidden>Žádný závod neodpovídá filtru.</p>
</div>"""),

    "rekordy": ("rekordy", "Oddílové rekordy | TJ Bohemians Praha", "Oddílové rekordy plaveckého oddílu TJ Bohemians Praha podle kategorií, pohlaví a délky bazénu.", f"""<h1>Rekordy</h1>
{NOSCRIPT}
<div id="rec-wrap">
  <div class="tools">
    <div>
      <label for="rec-cat">Kategorie</label>
      <select id="rec-cat"></select>
    </div>
    <div>
      <span style="display:block;font-size:13px;color:#5a665f;margin-bottom:2px">Pohlaví</span>
      <div class="tabs" id="rec-g" style="margin:0">
        <button type="button" data-v="M" aria-pressed="true">Muži</button>
        <button type="button" data-v="Z" aria-pressed="false">Ženy</button>
      </div>
    </div>
    <div>
      <span style="display:block;font-size:13px;color:#5a665f;margin-bottom:2px">Bazén</span>
      <div class="tabs" id="rec-p" style="margin:0">
        <button type="button" data-v="50" aria-pressed="true">50 m</button>
        <button type="button" data-v="25" aria-pressed="false">25 m</button>
      </div>
    </div>
  </div>
  <div class="table-wrap">
    <table class="stack">
      <thead><tr><th>Disciplína</th><th class="num">Čas</th><th>Jméno</th><th>Datum</th><th>Místo</th></tr></thead>
      <tbody id="rec-body"></tbody>
    </table>
  </div>
  <p class="empty" id="rec-empty" hidden>Pro tento výběr nejsou rekordy zapsány.</p>
  <p class="meta" style="margin-top:14px">VZ volný způsob, Z znak, P prsa, M motýlek, PZ polohový závod. Zdroj: oddílové rekordy na boh.cz.</p>
</div>"""),

    "statistika": ("statistika", "Statistika | TJ Bohemians Praha", "Statistika výkonů plavců TJ Bohemians Praha.", """<h1>Statistika</h1>
<p>Žebříčky výkonů plavců oddílu se filtrují podle disciplíny, družstva, bazénu a roku. Tuto interaktivní statistiku zatím vede původní web, takže ji tady neduplikujeme a otevřeme ji přímo.</p>
<p><a class="btn" href="https://www.boh.cz/index.php?page=stat">Otevřít statistiku na boh.cz</a></p>
<h3>Roční přehledy a oddílové tabulky</h3>
<p>Souhrny celé historie oddílu k 31. 12. každého roku (PDF) jsou v sekci <a href="/demo/stahovani">Ke stažení</a>, kategorie Statistiky a rekordy.</p>
<h3>Oficiální výsledky</h3>
<ul>
  <li><a href="https://vysledky.czechswimming.cz">Výsledky Českého svazu plaveckých sportů</a></li>
  <li><a href="/demo/rekordy">Oddílové rekordy</a></li>
</ul>"""),

    "foto": ("foto", "Fotogalerie | TJ Bohemians Praha", "Fotogalerie ze závodů a akcí plaveckého oddílu TJ Bohemians Praha.", f"""<h1>Foto</h1>
{NOSCRIPT}
<div id="foto-wrap">
  <h3 style="margin-top:0">Nejnovější</h3>
  <div id="foto-new" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;margin-bottom:26px"></div>
  <h3>Všechny galerie</h3>
  <div class="tools">
    <div>
      <label for="foto-search">Hledat galerii</label>
      <input type="search" id="foto-search" placeholder="např. Motorlet" autocomplete="off">
    </div>
  </div>
  <div class="table-wrap">
    <table class="stack">
      <thead><tr><th>Galerie</th><th>Datum</th><th class="num">Fotek</th></tr></thead>
      <tbody id="foto-body"></tbody>
    </table>
  </div>
  <p class="empty" id="foto-empty" hidden>Žádná galerie neodpovídá hledání.</p>
  <p><button type="button" class="btn btn-line" id="foto-more" hidden>Zobrazit další</button></p>
  <p class="meta">Fotky se otevírají na boh.cz.</p>
</div>"""),

    "stahovani": ("stahovani", "Ke stažení | TJ Bohemians Praha", "Dokumenty ke stažení: rozřazení do skupin, rozvrhy, statistiky a formuláře plaveckého oddílu TJ Bohemians Praha.", f"""<h1>Ke stažení</h1>
{NOSCRIPT}
<div id="dl-wrap">
  <ul class="tabs" id="dl-cats"></ul>
  <div class="tools">
    <div>
      <label for="dl-search">Hledat dokument</label>
      <input type="search" id="dl-search" placeholder="např. rozvrh" autocomplete="off">
    </div>
  </div>
  <div class="table-wrap">
    <table class="stack">
      <thead><tr><th>Název</th><th>Kategorie</th><th class="num">Velikost</th><th>Datum</th></tr></thead>
      <tbody id="dl-body"></tbody>
    </table>
  </div>
  <p class="empty" id="dl-empty" hidden>Žádný dokument neodpovídá hledání.</p>
  <p><button type="button" class="btn btn-line" id="dl-more" hidden>Zobrazit další</button></p>
</div>"""),
}

for name, (key, title, desc, body) in PAGES.items():
    page = LAYOUT.format(title=html.escape(title), desc=html.escape(desc, quote=True), key=key, page=PAGE_OVERRIDE.get(name, key), menu=menu_html(key), body=body)
    with open(os.path.join(OUT, name + ".html"), "w", encoding="utf-8") as fh:
        fh.write(page)
    print(name + ".html", len(page) // 1024 or 1, "KB")
