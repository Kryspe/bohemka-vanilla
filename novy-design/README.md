# Nový design TJ Bohemians Praha (koncept)

Moderní web v čistém PHP, HTML, CSS a JS. Žádný framework, žádný Tailwind, žádný build krok.
Struktura a názvy jsou stejné jako na boh.cz (Aktuality, Pro rodiče, Oddíl, Závody, Rekordy, Statistika, Foto, Ke stažení, Intranet), aby se uživatelé neztratili.

## Spuštění (PHP)

```bash
php -S 0.0.0.0:8090 -t novy-design novy-design/router.php
# otevřít http://localhost:8090
```

`0.0.0.0` je nutné, pokud `php` běží přes Docker wrapper. Na běžném PHP stačí `localhost:8090`.

## Náhled pro trenéra (bez PHP)

```bash
bash novy-design/build.sh      # vykreslí všechny stránky do ../novy-design-nahled
git add -A && git commit && git push
# Vercel: https://boh2-eight.vercel.app/novy-design-nahled/
```

Náhled je statický export stejných šablon (164 stránek, adresy stejné jako v PHP). Má `noindex`.

## Struktura

| Soubor | Účel |
| :-- | :-- |
| `lib.php` | konfigurace, načítání dat, pomocné funkce, hlavička a patička |
| `routes.php`, `router.php` | čisté adresy (`/zavody/probehle`, `/rekordy/open/muzi/50`, `/aktualita/ID`) |
| `index.php`, `aktuality.php`, `aktualita.php`, `pro-rodice.php`, `oddil.php`, `zavody.php`, `rekordy.php`, `statistika.php`, `foto.php`, `ke-stazeni.php` | stránky |
| `export.php`, `build.sh` | statický export |
| `data/*.json` | obsah z boh.cz (`python3 scripts/build_demo_data.py`, pak zkopírovat `demo/data` do `novy-design/data`) |
| `assets/` | CSS, JS, písma Sora a Manrope (self-hosted), obrázky |

## Nasazení na oficiální web

Šablony čtou obsah z `data/*.json`. Na produkci se pouze nahradí funkce `data()` v `lib.php` dotazy do databáze oddílu
(stejný tvar polí) a `INTRANET_URL` v `lib.php` ukáže na produkční intranet. Zbytek (šablony, CSS, JS) zůstává.

## Design

- Tmavě zelený hero se zářící linkou (inspirace huly.io), klidné světlé sekce s vlnkou (inspirace kpsostrava.cz).
- Animace: slova nadpisu vyjíždějí, prvky se zjevují při rolování, čísla se počítají, světlo v hero sleduje kurzor. Vše se vypne při `prefers-reduced-motion`.
- Bez emoji, bez rozmazaných pozadí, bez zvětšování obrázků při najetí (nic neposkakuje).
