# CLAUDE.md — TJ Bohemians Praha (`bohemka-vanilla`)

Tento soubor slouží jako primární instrukce a kontext pro práci v **Claude Code** v repozitáři TJ Bohemians Praha.

---

## 1. Rychlý přehled projektu & Příkazy

- **Vlastník & Projekt:** Kryštof Spejchal / TJ Bohemians Praha (oddíl plavání, založeno 1946).
- **Technologie:** **Čistý Vanilla Web** (HTML5, Tailwind utility třídy, Vanilla ES6+ JS). Žádné npm build nástroje, žádný React, žádné TSX.
- **Produkční URL:** [https://boh2-eight.vercel.app/](https://boh2-eight.vercel.app/) (Vercel Hobby, 100% zdarma).
- **Cloud Databáze:** Supabase (`https://xjvpyznywisuuykwsedd.supabase.co`) s nativním REST klientem v `js/supabase.js` a automatickým offline fallbackem na `localStorage` a `js/data.js`.

### Synchronizace obsahu z boh.cz
```bash
python3 scripts/sync_boh.py            # oznameni, aktuality (+fotky), ke stazeni, rekordy, zavody -> js/data.js + includes/seed_data.json
```
- Ručně se udržují `parentsNotes`, `galleries` a `stats`. Týdenní GitHub Action: `.github/workflows/sync-boh.yml`.
- Fotky se validují (musí jít o JPEG/PNG), jinak boh.cz vrací HTML chybovou stránku.

- **Živý web bere obsah z Supabase, ne z `js/data.js`.** `js/supabase.js` po načtení stránky přepíše aktuality, závody a vzkazy řádky z cloudové DB. Po `sync_boh.py` proto spusť `python3 scripts/push_content_supabase.py` (dry run) a potom `--apply`, jinak se změny na Vercelu neprojeví.
- **Service worker (`sw.js`) je network-first** (v4). Nikdy nevracet zpět cache-first, návštěvníci by viděli staré verze.
- **Responzivní mřížky:** základní `.grid-cols-N` na konci `css/style.css` jsou `!important`, proto tam musí být i všechny varianty `sm:/md:/lg:grid-cols-*` a `col-span-*`. Při použití nové varianty ji doplnit do bloku "Responsive extensions".

### Design (celý web je nový design)
- Jedna vrstva vzhledu: `css/design.css` (načítá se po `css/style.css`) + `js/design.js` (animace). Žádné demo ani samostatné složky s jiným designem; vše se upravuje přímo v rootu.
- **Palette:** tmavě zelená `#031a0e` až `#0a5c2e` (hlavička, patička, hero, úvodní pásy podstránek), světlý obsah `#f4f8f5` s bílými kartami, akcent mint `#3bdc86`, primární zelená `#0f7a3c`. Tokeny (`--background`, `--primary` ...) jsou v `:root` v `css/design.css`; tmavé části se označují třídou `.theme-dark` (nebo jsou vyjmenované v `design.css`).
- **Jediné téma.** Přepínač světlý/tmavý byl odstraněn (`initTheme` v `js/app.js` jen odstraní staré třídy). Na `<html>` nesmí být třídy `dark` ani `bohemka`.
- **Společná kostra:** hlavička (`.d-site-header`) a patička (`.d-site-footer`) jsou v každé HTML stránce stejné, menu má stejné položky a pořadí jako boh.cz. Úvodní pás podstránky = první `<section class="page-hero ...">` v `<main>`.
- **Komponenty úvodu** mají předponu `d-` (`d-hero`, `d-card`, `d-alerts` ...), aby se nekřížily s Tailwind třídami. Úvod se vykresluje skriptem v `index.html` z `BohStore` (data.js + Supabase).
- **Animace:** `.d-reveal` (zjevení při rolování), `data-count` (počítání čísel), světlo v hero. Vše se vypne při `prefers-reduced-motion`. Žádné zvětšování obrázků při najetí.
- Při přidání nové HTML stránky zkopírovat hlavičku, patičku a odkazy na `assets/fonts/fonts.css`, `css/style.css`, `css/design.css` a `js/design.js` z existující stránky.

### Běžné vývojářské příkazy

```bash
# Lokální server s čistými URL (Node.js engine, port 8080)
PORT=8080 node server.cjs
# Nebo pomocí bash skriptu:
./run_local.sh

# Spuštění kompletní E2E testovací sady (22/22 testů, Tiers 1-4)
bash scripts/e2e/run_tests.sh

# Kontrola statické syntaxe a integrity kódu
bash scripts/test_static.sh
node scripts/e2e/verify_crud.js

# Git deployment (Vercel nasazuje automaticky z GitHub webhooku)
git push origin main
git push bohemka-vanilla-backup main
```

---

## 2. Závazná projektová pravidla & Omezení

1. **Výhradně Vanilla verze:**
   - Pracovat VÝHRADNĚ v tomto repozitáři (`bohemka-vanilla`).
   - ZÁKAZ Reactu, Next.js, Vite či jiných bundlerů. Vše musí běžet přímo v prohlížeči.
2. **Povolené Git Remote cíle:**
   - `origin`: `git@github.com:Kryspe/boh2.git` (hlavní větev: `main`)
   - `bohemka-vanilla-backup`: `git@github.com:Kryspe/bohemka-vanilla.git`
   - **NIKDY** nepoužívat ani nevytvářet repozitář `zkousimbohemku` (byl to experimentální React z Lovable a byl smazán).
3. **Pravidlo nulových emoji (Zero Emoji Policy):**
   - V žádných HTML, CSS ani JS souborech nesmí být použity emoji (žádné plavce, kalendáře, zvonky apod.). Místo nich se používají čisté SVG ikony.
4. **Čisté adresy (Clean URLs):**
   - Na webu se nepoužívají přípony `.html` ani `.php` (např. `/`, `/aktuality`, `/zavody`, `/pro-rodice`, `/oddil`, `/rekordy`, `/statistika`, `/foto`, `/ke-stazeni`, `/kontakt`, `/intranet`, `/admin`).
5. **Typografie & Designový systém:**
   - **Nadpisy a display text:** `Sora` (self-hosted v `assets/fonts/`, `font-display`, `font-extrabold`).
   - **Text a navigace:** `Manrope` (self-hosted, `font-sans`, `font-body`). Žádné externí fonty.
   - **Klubové barvy:** tmavě zelená `#031a0e`/`#0a5c2e`, primární `#0f7a3c`, akcent mint `#3bdc86` (viz `css/design.css`).
   - **Mobilní odsazení:** Mezi horní lištou a kartami udržovat kompaktní rozestup (cca 8 px na mobilu), nepoužívat obří vertikální mezery (`py-14` bylo nahrazeno za `py-8 sm:py-20` na podstránkách).
6. **Zlatý standard Intranetu (`intranet-gold-standard`):**
   - Režim **Plavec / Rodič:** Přihlášky na závody, Rezervace na akce, Moje výsledky, Platby příspěvků (s QR kódem VS 214) a Nastavení účtu.
   - **Uzavřené položky:** V sekci plavce se NIKDY nezobrazují termíny závodů a soustředění, jejichž uzávěrka již vypršela (`!isEventClosed(e)`).
   - Režim **Trenér / Správce:** Závody & CSV přihlášky (1-click export do ČSPS CSV), Aktuality oddílu, Aktivita & Upozornění, Fotogalerie, Ke stažení a Profil trenéra.
   - Plavec se v klientském rozhraní NESMÍ mít možnost přepnout na roli trenéra. Přepínač rolí je dostupný pouze pro účty `trener` / `admin` (heslo `bohemka`).
7. **Dokumentace v Obsidianu:**
   - Změny a rozhodnutí se průběžně zaznamenávají do Obsidianu: `/home/krystofspejchal/Obsidian/DOKUMENTACE_A_PROGRES_BOHEMIANS.md`.

---

## 3. Architektura a struktura repozitáře

```
├── index.html            # Úvodní stránka s Lead Story (nejnovější aktualita) a rozcestníkem
├── aktuality.html        # Feed oddílových aktualit + čitelný detail článku
├── zavody.html           # Kalendář závodů, disciplíny a přihlašovací dialog
├── pro-rodice.html       # Informace pro rodiče, vzkazy trenérů, nábor
├── oddil.html            # Historie 80 let (1946–2026), trenéři, bazény Podolí/Vinohrady
├── rekordy.html          # Oddílové rekordy (25m/50m bazén)
├── statistika.html       # Žebříčky, ročenky, bodové výkony AQUA/FINA
├── foto.html             # Fotogalerie z akcí s náhledy
├── ke-stazeni.html       # Směrnice, rozpisy tréninků, lékařské posudky
├── kontakt.html          # Vedení oddílu, bazény, bankovní spojení
├── intranet.html         # Zlatý standard členského intranetu & administrace pro trenéry
├── admin.html            # Rozšířené rozhraní pro správu oddílových dat
├── 404.html              # Vlastní chybová stránka
├── server.cjs            # Lokální Node.js server (OWASP headers, SQLite API, routing)
├── router.php            # PHP směrovač pro lokální testování (výjimka pro /api/)
├── vercel.json           # Konfigurace čistých URL a hlaviček pro Vercel
├── css/
│   └── style.css         # Hlavní CSS, vlnovky (.wave), mobilní lišta a drawer
├── js/
│   ├── app.js            # Inicializace aplikace, mobilní navigace, modály, vyhledávání
│   ├── store.js          # BohStore: stavová logika, signupy, offline outbox fronta
│   ├── supabase.js       # Lehký nativní PostgREST klient pro cloudovou databázi
│   ├── data.js           # Výchozí statická data (aktuality, závody, rekordy, trenéři)
│   └── animations.js     # Decentní scroll reveal animace
├── scripts/
│   └── e2e/              # E2E testovací runner a testy (Tiers 1-4, zero deps)
└── assets/               # Loga, QR kódy, fotky a oficiální dokumenty
```

---

## 4. Důležité integrační kontrakty

- **ČSPS CSV Export:** Středník (`;`), UTF-8 s BOM (`\uFEFF`), sloupce: `"Závod";"Datum";"Místo";"Jméno plavce";"Ročník";"Pohlaví";"Kategorie/Skupina";"Přihlášené disciplíny";"Poznámka / Odhláška"`, sanitizace `'` proti CSV injection.
- **Lenex 3.0 Export:** XML standard ČSPS (`<LENEX version="3.0">`), sanitizace řídicích znaků XML 1.0.
- **SPAYD QR Platba:** Účet ČSOB `351416278/0300`, variabilní symbol `214`, obrázek `assets/QR_plavani214.jpg`.
- **Mobilní navigace (9 položek v menu):**
  1. Aktuality (`aktuality`)
  2. Pro rodiče (`pro-rodice`)
  3. Oddíl (`oddil`)
  4. Závody (`zavody`)
  5. Rekordy (`rekordy`)
  6. Statistika (`statistika?page=stat`)
  7. Foto (`foto`)
  8. Ke stažení (`ke-stazeni?page=stahovani`)
  9. Intranet (`intranet?page=login`)
