#!/usr/bin/env python3
"""
Nahraje aktuality, zavody a vzkazy pro rodice z js/data.js do cloudove databaze Supabase.

Zivy web (js/supabase.js) bere obsah z Supabase a prepisuje jim js/data.js, takze bez tohoto kroku
se zmeny z js/data.js (napr. po scripts/sync_boh.py) na Vercelu neprojevi.

Pouziti:
  python3 scripts/push_content_supabase.py            # jen vypise, co by se zmenilo (dry run)
  python3 scripts/push_content_supabase.py --apply    # provede zapis (upsert)
Klic je verejny anon klic z js/supabase.js (zapis povoluji RLS politiky projektu).
"""
import json, os, re, subprocess, sys, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = open(os.path.join(ROOT, "js", "supabase.js"), encoding="utf-8").read()
URL = re.search(r'DEFAULT_SUPABASE_URL = "([^"]+)"', SRC).group(1) + "/rest/v1"
KEY = re.search(r'DEFAULT_SUPABASE_ANON_KEY = "([^"]+)"', SRC).group(1)
APPLY = "--apply" in sys.argv


def call(method, path, body=None, prefer=None):
    headers = {"apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "application/json"}
    if prefer:
        headers["Prefer"] = prefer
    data = json.dumps(body, ensure_ascii=False).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read()
            return json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        sys.exit("HTTP %s %s: %s" % (e.code, path, e.read().decode()[:300]))


def load():
    out = subprocess.check_output(["node", "-e", "global.window={};require('./js/data.js');console.log(JSON.stringify(window.BohData))"], cwd=ROOT)
    return json.loads(out)


d = load()

news = [{"id": n["id"], "slug": n["id"], "title": n["title"], "author": n["author"], "date": n["date"],
         "excerpt": n["excerpt"], "body": json.dumps(n["body"], ensure_ascii=False),
         "image_url": n["image"], "category": "Oddíl"} for n in d["news"]]

events = [{"id": e["id"], "name": e["name"], "place": e["place"], "date": e["date"], "deadline": e["deadline"] or None,
           "type": e["type"], "kind": e["kind"], "status": "open", "disciplines": e["disciplines"], "note": e["note"]}
          for e in d["events"]]

msgs = []
for i, t in enumerate(d["parentsNotes"], 1):
    head, _, rest = t.partition(": ")
    title, text = (head, rest) if rest and len(head) < 110 else ("Vzkaz pro rodiče", t)
    msgs.append({"id": i, "category": "Upozornění trenérů", "title": title, "text": text,
                 "date": d["news"][0]["date"], "author": "Jan Srb"})

cur_news = {r["id"] for r in call("GET", "/news?select=id&limit=1000")}
cur_ev = {r["id"] for r in call("GET", "/events?select=id&limit=1000")}
cur_msg = {r["id"] for r in call("GET", "/parent_messages?select=id&limit=1000")}
print("aktuality: %d v DB, %d k nahrani (%d nových)" % (len(cur_news), len(news), len({n['id'] for n in news} - cur_news)))
print("závody:    %d v DB, %d k nahrání (%d nových)" % (len(cur_ev), len(events), len({e['id'] for e in events} - cur_ev)))
print("vzkazy:    %d v DB, %d k nahrání" % (len(cur_msg), len(msgs)))
stale_news = sorted(cur_news - {n["id"] for n in news})
print("aktuality v DB navíc (jiné ID než v data.js):", stale_news or "žádné")
stale_ev = sorted(cur_ev - {e["id"] for e in events})
stale_msg = sorted(cur_msg - {m["id"] for m in msgs})
print("závody v DB, které už v kalendáři boh.cz nejsou:", stale_ev or "žádné")
print("vzkazy v DB navíc:", stale_msg or "žádné")

if not APPLY:
    print("\n(dry run, nic nezapsáno; spusť s --apply)")
    sys.exit(0)

for table, rows in (("news", news), ("events", events), ("parent_messages", msgs)):
    call("POST", "/" + table, rows, prefer="resolution=merge-duplicates,return=minimal")
    print("zapsáno:", table, len(rows))
for i in stale_msg:
    call("DELETE", "/parent_messages?id=eq.%s" % i)
    print("smazán nadbytečný vzkaz", i)
for i in stale_ev:
    call("DELETE", "/events?id=eq.%s" % i)
    print("smazán závod, který už není v kalendáři boh.cz:", i)
