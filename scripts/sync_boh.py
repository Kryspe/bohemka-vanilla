#!/usr/bin/env python3
"""
Synchronizace obsahu z oficialniho webu https://www.boh.cz do js/data.js a includes/seed_data.json.

Aktualizuje: oznameni, aktuality (+ fotky), ke stazeni, rekordy, zavody (z detailu zavodu).
Neaktualizuje (rucne): parentsNotes, galleries, stats.

Pouziti:  python3 scripts/sync_boh.py [--since 2026-01-01]
Vyzaduje: Python 3 (jen standardni knihovna), Node.js (pro prepis seed_data.json).
"""
import argparse, html, json, os, re, subprocess, sys, time, unicodedata, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "js", "data.js")
BASE = "https://www.boh.cz"
UA = {"User-Agent": "Mozilla/5.0 (boh2 content sync)"}


def get(url, data=None, binary=False):
    req = urllib.request.Request(url, data=urllib.parse.urlencode(data).encode() if data is not None else None, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        b = r.read()
    return b if binary else b.decode("utf-8", "replace")


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def iso(d):
    a, b, c = [int(x) for x in re.findall(r"\d+", d)[:3]]
    return "%04d-%02d-%02d" % (c, b, a)


def text_of(h):
    h = re.sub(r"<script.*?</script>|<style.*?</style>", "", h, flags=re.S)
    return html.unescape(re.sub(r"<[^>]+>", "|", h))


def load_data():
    out = subprocess.check_output(["node", "-e", "global.window={};require('./js/data.js');console.log(JSON.stringify(window.BohData))"], cwd=ROOT)
    return json.loads(out)


def replace_section(js, key, nxt, value):
    a = js.index("  %s: [" % key)
    b = js.index("  %s: " % nxt, a + 1)
    return js[:a] + "  %s: " % key + json.dumps(value, ensure_ascii=False, indent=2).replace("\n", "\n  ") + ",\n\n" + js[b:]


def is_image(b):
    return len(b) > 500 and (b[:3] == b"\xff\xd8\xff" or b[:4] == b"\x89PNG")


def sync_news(js, since):
    src = get(BASE + "/aktuality/&limit=10000")
    old = {}
    for m in re.finditer(r'"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', js):
        old[m.group(2).strip()] = m.group(1)
    items = []
    for p in src.split("<div class='news_prev'>")[1:]:
        m = re.search(r"<h3>(.*?)<span class='date'>\((.*?)\)", p, re.S)
        if not m:
            continue
        title = html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip()
        d = iso(m.group(2))
        if d < since:
            continue
        body_html = p[m.end():].split("<div class='podpis'>")[0]
        am = re.search(r"<div class='podpis'>--- (.*?) ---</div>", p)
        author = " ".join(w.capitalize() for w in html.unescape(am.group(1)).split()) if am else "TJ Bohemians Praha"
        image = ""
        im = re.search(r"img_aktuality/(?:big/)?(\d+\.(?:jpg|jpeg|png))", p)
        if im:
            name = im.group(1)
            dest = os.path.join(ROOT, "assets", "aktuality", name)
            if not os.path.exists(dest):
                for u in ("/img_aktuality/big/", "/img_aktuality/"):
                    try:
                        b = get(BASE + u + name, binary=True)
                    except Exception:
                        continue
                    if is_image(b):
                        open(dest, "wb").write(b)
                        break
            if os.path.exists(dest):
                image = "assets/aktuality/" + name
        t = re.sub(r"<a[^>]*><img[^>]*></a>|<img[^>]*>", "", body_html)
        t = re.sub(r"<br\s*/?>", "\n", t)
        t = re.sub(r"<[^>]+>", "", t)
        t = html.unescape(t).replace("\xa0", " ")
        paras = [re.sub(r"[ \t]+", " ", x).strip() for x in t.split("\n")]
        paras = [x for x in paras if x and x != "..."]
        if not paras:
            continue
        ex = paras[0]
        if len(ex) < 40 and len(paras) > 1:
            ex = " ".join(paras)
        if len(ex) > 260:
            ex = ex[:257].rsplit(" ", 1)[0] + "..."
        items.append({"id": old.get(title) or slug(title)[:70] + "-" + d, "title": title, "date": d, "author": author,
                      "image": image, "excerpt": ex, "body": paras})
    seen = set()
    for it in items:
        if it["id"] in seen:
            it["id"] += "-" + it["date"]
        seen.add(it["id"])
    items.sort(key=lambda x: x["date"], reverse=True)
    print("aktuality:", len(items))
    return replace_section(js, "news", "events", items)


def sync_alerts(js):
    """Zelená oznámení z pravého sloupce úvodní stránky boh.cz (Sobotní trénink v Podolí apod.)."""
    h = get(BASE + "/")
    items = []
    for m in re.finditer(r"<div class='alertBox(?:1)?'><span class='title'>(.*?)</span><p>(.*?)</p></div>", h, re.S):
        title = html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip()
        text = re.sub(r"<br\s*/?>", " ", m.group(2))
        text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", text))).strip()
        items.append({"id": "boh-alert-%d" % (len(items) + 1), "title": title, "text": text, "type": "upozorneni",
                      "date": __import__("datetime").date.today().isoformat()})
    print("oznameni:", len(items))
    if "  alerts: [" not in js:
        i = js.index("  news: [")
        return js[:i] + "  alerts: []," + "\n\n" + js[i:] if not items else replace_section(js[:i] + "  alerts: [],\n\n" + js[i:], "alerts", "news", items)
    return replace_section(js, "alerts", "news", items)


def sync_downloads(js):
    s = get(BASE + "/stahovani/")
    rows = re.findall(r"<tr><td[^>]*><a href='/download/([^']+)'[^>]*>(.*?)</a></td><td>(.*?)</td><td>(\d+)\. (\d+)\. (\d{4})</td></tr>", s, re.S)

    def cat(t):
        l = t.lower()
        if any(k in l for k in ("termínová", "docházka", "časy", "přijat", "postupující", "ukazatele", "pohybové")): return "Termínovky a docházka"
        if any(k in l for k in ("etický", "osobních údajů", "výživa")): return "Řády a metodika"
        if any(k in l for k in ("statistika", "oddílové tabulky")): return "Statistiky a rekordy"
        if any(k in l for k in ("lyžařské", "hory", "soustředění", "krmítko")): return "Soustředění a akce"
        if any(k in l for k in ("pravidel", "závod")): return "Závody a pravidla"
        if any(k in l for k in ("čestné", "zdravotní", "formulář")): return "Zdraví a formuláře"
        return "Rozvrhy a dráhy"
    out = []
    for i, (f, t, sz, d, m, y) in enumerate(rows):
        t = html.unescape(re.sub("<[^>]+>", "", t)).strip()
        mid = re.match(r"(\d+)_", f)
        out.append({"id": "boh-dl-" + (mid.group(1) if mid else re.sub(r"\W+", "-", f)[:30]), "title": t, "category": cat(t),
                    "description": "Oficiální dokument z webu boh.cz", "fileName": BASE + "/download/" + f,
                    "fileSize": html.unescape(sz).replace("kB", "KB").replace("\xa0", " "),
                    "updatedAt": "%s-%02d-%02d" % (y, int(m), int(d)), "fileType": f.rsplit(".", 1)[-1].lower(),
                    **({"important": True} if i < 3 else {})})
    print("ke stazeni:", len(out))
    return replace_section(js, "downloads", "stats", out)


def sync_records(js):
    cats = [("", "Open"), ("18", "Starší dorost"), ("16", "Mladší dorost"), ("14", "Žactvo 14 let"), ("13", "Žactvo 13 let"),
            ("12", "Žactvo 12 let"), ("11", "Žactvo 11 let"), ("10", "Žactvo 10 let"), ("9", "Žactvo 9 let")]
    out = []
    for k, name in cats:
        s = get(BASE + "/rekordy/", data={"vekdo": k})
        for r in re.findall(r'<tr class="[^"]*">\s*((?:<td>.*?</td>\s*){8})</tr>', s, re.S):
            c = [html.unescape(re.sub("<[^>]+>", "", x)).strip() for x in re.findall(r"<td>(.*?)</td>", r, re.S)]
            sur = "-".join(p.capitalize() for p in c[4].split("-"))
            out.append({"event": c[0], "gender": "Muži" if c[1] == "M" else "Ženy", "pool": c[2] + "m", "time": c[5],
                        "holder": (c[3] + " " + sur).strip(), "year": c[6][-4:], "date": c[6],
                        "place": c[7] if c[7] != "-" else "", "category": name})
    print("rekordy:", len(out))
    return replace_section(js, "records", "parentsNotes", out)


STROKE = {"volný způsob": "VZ", "prsa": "P", "motýlek": "M", "znak": "Z", "polohový závod": "PZ"}
CODES = {"50 VZ", "100 VZ", "200 VZ", "400 VZ", "800 VZ", "1500 VZ", "50 Z", "100 Z", "200 Z", "50 P", "100 P", "200 P",
         "50 M", "100 M", "200 M", "100 PZ", "200 PZ", "400 PZ"}


def match_old(old_events, used_ids, name, date):
    """Najde drivejsi zaznam (kvuli stabilnim ID): presna shoda nazvu, jinak nejpodobnejsi nazev ve stejny den.
    Kazde ID se prirazuje nejvyse jednou."""
    import difflib
    cands = [o for o in old_events if o["date"] == date and o["id"] not in used_ids]
    for o in cands:
        if slug(o["name"]) == slug(name):
            return o
    best, score = None, 0.0
    for o in cands:
        r = difflib.SequenceMatcher(None, slug(o["name"]), slug(name)).ratio()
        if r > score:
            best, score = o, r
    return best if best and score >= 0.75 else {}


def sync_events(js, old_events, since):
    s = get(BASE + "/zavody/")
    rows = re.findall(r"page=souhrn&amp;zavod=(\d+)'>(.*?)</a></td><td[^>]*>(\d+\. \d+\. \d{4})", s)
    out = []
    used_ids = set()
    for i, name, d in rows:
        name = html.unescape(name).strip()
        date = iso(d)
        if date < since:
            continue
        b = get(BASE + "/index.php?page=souhrn&zavod=" + i)
        b = b[b.find('<div class="main">'):]
        t = re.sub(r"\|\s*(\|\s*)+", "|", text_of(b)).split("|")
        val = lambda k: t[t.index(k) + 1].strip() if k in t and t.index(k) + 1 < len(t) else ""
        place, dl, dates, note = val("Místo"), val("Přihlášky do"), val("Datum"), val("Poznámka")
        if note == "Disciplína":
            note = ""
        try:
            deadline = iso(dl)
        except Exception:
            deadline = ""
        ds = []
        for m in re.finditer(r"(\d+) m (volný způsob|prsa|motýlek|znak|polohový závod)", html.unescape(b)):
            c = "%s %s" % (m.group(1), STROKE[m.group(2)])
            if c in CODES and c not in ds:
                ds.append(c)
        mm = re.findall(r"\d+\. \d+\. \d{4}", dates)
        kind = "soustredeni" if "soustředění" in name.lower() else "zavod"
        tp = "Soustředění" if kind == "soustredeni" else next((x for k, x in (("mistrovství", "Mistrovství"), ("přebor", "Přebor"), ("pohár", "Pohár"), ("cena", "Pohár"), ("veteran", "Veteráni")) if k in name.lower()), "Závod")
        prev = match_old(old_events, used_ids, name, date)
        if prev.get("id"):
            used_ids.add(prev["id"])
        ev = {"id": prev.get("id") or slug(name) + "-" + date[:4], "name": name, "place": place or prev.get("place") or "dle propozic na boh.cz",
              "date": date, "deadline": deadline, "type": prev.get("type") or tp, "kind": kind,
              "note": note or prev.get("note") or "Údaje převzaty z oficiálního kalendáře boh.cz", "disciplines": ds}
        if len(mm) == 2 and iso(mm[1]) != date:
            ev["dateEnd"] = iso(mm[1])
        out.append(ev)
        time.sleep(0.2)
    seen = set()
    for e in out:
        base = e["id"]
        n = 2
        while e["id"] in seen:
            e["id"] = "%s-%d" % (base, n)
            n += 1
        seen.add(e["id"])
    out.sort(key=lambda e: e["date"])
    print("zavody:", len(out))
    return replace_section(js, "events", "records", out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", default="2026-01-01", help="aktuality od data (RRRR-MM-DD)")
    ap.add_argument("--events-since", default="2026-10-01")
    a = ap.parse_args()
    js = open(DATA, encoding="utf-8").read()
    old = load_data()
    js = sync_alerts(js)
    js = sync_news(js, a.since)
    js = sync_downloads(js)
    js = sync_records(js)
    js = sync_events(js, old["events"], a.events_since)
    open(DATA, "w", encoding="utf-8").write(js)
    subprocess.check_call(["node", "-c", DATA])
    subprocess.check_call(["node", os.path.join(ROOT, "scripts", "sync_seed.js")], cwd=ROOT)
    print("hotovo")


if __name__ == "__main__":
    sys.exit(main())
