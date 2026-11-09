#!/usr/bin/env python3
"""
Vyrobi male JSON soubory pro demo web (demo/data/*.json) z oficialniho boh.cz a z js/data.js.

Kazda stranka dema nacita jen svuj JSON (rychlost). Bohatý text z boh.cz se cisti
pres seznam povolenych znacek (p, br, b, i, ul, li, a), takze ho lze bezpecne vlozit do stranky.

Pouziti:  python3 scripts/build_demo_data.py
"""
import html, json, os, re, subprocess, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "demo", "data")
BASE = "https://www.boh.cz"
UA = {"User-Agent": "Mozilla/5.0 (boh2 demo data build)"}


def get(path):
    url = path if path.startswith("http") else BASE + path
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
        return r.read().decode("utf-8", "replace")


def iso(d):
    a, b, c = [int(x) for x in re.findall(r"\d+", d)[:3]]
    return "%04d-%02d-%02d" % (c, b, a)


def absolute(href):
    href = html.unescape(href).strip()
    if href.startswith(("http://", "https://", "mailto:", "tel:")):
        return href
    return BASE + (href if href.startswith("/") else "/" + href)


def clean(fragment):
    """Povoli jen p, br, b, strong, i, em, ul, li, a(href). Vse ostatni zahodi."""
    f = re.sub(r"<(script|style)\b.*?</\1>", "", fragment, flags=re.S | re.I)
    f = re.sub(r"<!--.*?-->", "", f, flags=re.S)
    f = re.sub(r"<img[^>]*>", "", f)

    def tag(m):
        close, name, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if name in ("strong",):
            name = "b"
        if name in ("em",):
            name = "i"
        if name == "a":
            if close:
                return "</a>"
            h = re.search(r"""href\s*=\s*["']([^"']*)["']""", attrs)
            if not h:
                return ""
            url = absolute(h.group(1))
            if not url.startswith(("http://", "https://", "mailto:", "tel:")):
                return ""
            return '<a href="%s" rel="noopener">' % html.escape(url, quote=True)
        if name in ("p", "b", "i", "ul", "li", "br"):
            return "<br>" if name == "br" else ("</%s>" % name if close else "<%s>" % name)
        if name in ("h3", "h4"):
            return "</b><br>" if close else "<br><b>"
        return ""
    f = f.replace("\ufeff", "")
    parts = re.split(r"(<[^>]*>)", f)
    res = []
    for part in parts:
        if part.startswith("<") and part.endswith(">"):
            res.append(re.sub(r"<(/?)([a-zA-Z0-9]+)([^>]*)>", tag, part))
        else:
            res.append(html.escape(html.unescape(part), quote=False))
    f = "".join(res)
    f = re.sub(r"\s*\r?\n\s*", " ", f)
    f = re.sub(r"(<br>\s*){3,}", "<br><br>", f)
    f = re.sub(r"^(\s*<br>)+", "", f)
    return f.strip()


def write(name, obj):
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
        json.dump(obj, fh, ensure_ascii=False, separators=(",", ":"))
    print(name, os.path.getsize(os.path.join(OUT, name)) // 1024, "KB")


def main_block(page):
    a = page.find('<div class="main">')
    b = page.find('<div class="aside">')
    return page[a + len('<div class="main">'):b if b > a else len(page)]


def build_from_data_js():
    out = subprocess.check_output(["node", "-e", "global.window={};require('./js/data.js');console.log(JSON.stringify(window.BohData))"], cwd=ROOT)
    d = json.loads(out)
    write("news.json", [{"id": n["id"], "title": n["title"], "date": n["date"], "author": n["author"],
                         "image": n["image"], "body": n["body"]} for n in d["news"]])
    write("downloads.json", [{"title": x["title"], "category": x["category"], "url": x["fileName"], "size": x["fileSize"],
                              "date": x["updatedAt"], "type": x["fileType"]} for x in d["downloads"]])
    write("records.json", [{"e": r["event"], "g": "M" if r["gender"] == "Muži" else "Z", "p": int(r["pool"].rstrip("m")),
                            "t": r["time"], "h": r["holder"], "d": r["date"], "pl": r["place"], "c": r["category"]}
                           for r in d["records"]])


def build_events():
    s = get("/zavody/")
    rows = re.findall(r"<tr><td style='text-align:left; padding-left:5px;'>(.*?)</tr>", s, re.S)
    ev = []
    for r in rows:
        m = re.match(r"<a href='([^']+)'>(.*?)</a></td><td[^>]*>(.*?)</td><td[^>]*>(.*?)</td>(.*)", r, re.S)
        if not m:
            continue
        link, name, date, dl, rest = m.groups()
        cells = re.findall(r"<td>(.*?)</td>", rest, re.S)
        links = {}
        for key, cell in zip("pvrx", cells):
            h = re.search(r"href='([^']+)'", cell)
            if h:
                links[key] = absolute(h.group(1))
        try:
            dl_iso = iso(dl)
        except Exception:
            dl_iso = ""
        ev.append({"name": html.unescape(name).strip(), "date": iso(date), "deadline": dl_iso,
                   "url": absolute(link), "links": links})
    ev.sort(key=lambda e: e["date"], reverse=True)
    write("events.json", ev)


def build_vzkazy():
    s = get("/vzkazy/")
    out = []
    for p in s.split("<div class='news_prev'>")[1:]:
        m = re.search(r"<h3 id='(\d+)'>(.*?)<span class='date'>\((.*?)\)", p, re.S)
        if not m:
            continue
        body = p[m.end():]
        author = ""
        am = re.search(r"<div class='podpis'>--- (.*?) ---</div>", body)
        if am:
            author = " ".join(w.capitalize() for w in html.unescape(am.group(1)).split())
            body = body[:am.start()]
        body = re.sub(r"^\s*</h3>", "", body.replace("</span>", "", 1))
        out.append({"id": m.group(1), "title": html.unescape(re.sub(r"<[^>]+>", "", m.group(2))).strip(),
                    "date": iso(m.group(3)), "author": author, "html": clean(body)})
    write("vzkazy.json", out[:25])


def build_galleries():
    s = get("/foto/")
    rows = re.findall(r"<a href='/galerie/(\d+)/'>(.*?)</a></td><td[^>]*>(.*?)</td><td[^>]*>(.*?)</td>", s, re.S)
    gal = []
    for i, (gid, title, date, count) in enumerate(rows):
        g = {"id": gid, "title": html.unescape(title).strip(), "date": iso(date), "count": int(re.sub(r"\D", "", count) or 0)}
        if i < 8:
            try:
                page = get("/galerie/%s/" % gid)
                im = re.search(r"<img src='(/fotky/\d+/small/[^']+)'", page)
                if im:
                    g["cover"] = BASE + im.group(1)
                time.sleep(0.2)
            except Exception:
                pass
        gal.append(g)
    write("galleries.json", gal)


def build_oddil():
    out = {}
    for key in ("historie", "struktura", "kontakty", "sponzori"):
        s = get("/oddil/%s/" % key)
        blk = main_block(s)
        # odstranit navigacni odkazy na podstranky a prvni nadpis Oddil
        blk = re.sub(r"<h2>Oddíl</h2>.*?<br /><br />\s*", "", blk, count=1, flags=re.S)
        blk = re.sub(r"^\s*<h2>.*?</h2>", "", blk, count=1, flags=re.S)
        out[key] = clean(blk)
    write("oddil.json", out)


def build_sidebar():
    s = get("/")
    a = s.find('<div class="aside">')
    aside = s[a:]
    alerts = []
    for m in re.finditer(r"<div class='alertBox(1)?'><span class='title'>(.*?)</span><p>(.*?)</p></div>", aside, re.S):
        alerts.append({"title": html.unescape(re.sub(r"<[^>]+>", "", m.group(2))).strip(),
                       "html": clean(m.group(3)), "lead": bool(m.group(1))})
    def load(n):
        with open(os.path.join(OUT, n), encoding="utf-8") as fh:
            return json.load(fh)
    dl = sorted(load("downloads.json"), key=lambda x: x["date"], reverse=True)[:3]
    gal = [g for g in load("galleries.json") if g.get("cover")][:2]
    vz = [{"id": v["id"], "title": v["title"], "date": v["date"]} for v in load("vzkazy.json")[:3]]
    write("sidebar.json", {"alerts": alerts, "vzkazy": vz, "downloads": dl,
                           "galleries": [{"id": g["id"], "title": g["title"], "cover": g["cover"]} for g in gal]})


def build_thumbs():
    """Nahledy 380 px pro seznam aktualit (rychlost). Vyzaduje Pillow; jinak se preskoci."""
    try:
        from PIL import Image
    except ImportError:
        print("Pillow neni nainstalovan, nahledy preskoceny")
        return
    src = os.path.join(ROOT, "assets", "aktuality")
    dst = os.path.join(ROOT, "demo", "img", "n")
    os.makedirs(dst, exist_ok=True)
    n = 0
    for f in sorted(os.listdir(src)):
        if not f.lower().endswith((".jpg", ".jpeg")):
            continue
        out = os.path.join(dst, f)
        if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(os.path.join(src, f)):
            continue
        im = Image.open(os.path.join(src, f)).convert("RGB")
        im.thumbnail((380, 380))
        im.save(out, "JPEG", quality=78, optimize=True, progressive=True)
        n += 1
    print("nahledy:", n)


def main():
    build_from_data_js()
    for fn in (build_events, build_vzkazy, build_galleries, build_oddil, build_sidebar, build_thumbs):
        fn()


if __name__ == "__main__":
    sys.exit(main())
