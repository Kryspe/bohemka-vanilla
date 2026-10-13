# TJ Bohemians Praha — Plavecký oddíl Klokani (Vanilla PHP + SQLite)

Oficiální moderní prezentace plaveckého oddílu TJ Bohemians Praha k 80. výročí oddílu (1946–2026).

## 💡 Architektura a technologie

- **Backend & Databáze:** Čisté **PHP** s databází **SQLite** (`data/bohemka.sqlite`).
- **Nulová konfigurace:** Databáze a tabulky se automaticky inicializují a seedují při prvním spuštění.
- **Bez frameworků a bundlerů:** Žádný npm build, žádné `node_modules`, žádné závislosti. Funguje okamžitě na jakémkoliv standardním PHP hostingu (Apache/Nginx/Caddy) i lokálně.
- **Server-side renderované stránky (.php):** Okamžité načtení, žádný layout shift (FOUC), plné SEO.
- **Klientský Intranet (`intranet.php`):** Přihlášení pro plavce a rodiče, registrace na závody a disciplíny, stav přihlášek a oddílové zprávy.
- **Administrace oddílu (`admin.php`):** Zabezpečený management panel pro trenéry a správce. Kompletní CRUD správa pro aktuality, závody, přihlášky, vzkazy, trenéry, ročenky, rekordy a uživatelské účty. Export soupisky plavců do CSV.

---

## 🚀 Jak spustit lokálně

### 1. Rychlé spuštění vestavěným serverem
```bash
php -S localhost:8000
```
Nebo přes pomocný skript:
```bash
./run_local.sh
```
A otevřete v prohlížeči: **http://localhost:8000**

### 2. Výchozí přístupové údaje
- **Správce / Hlavní trenér:** `admin` / heslo: `bohemka`
- **Plavec / Rodič:** `plavec` / heslo: `bohemka`
- **Trenér:** `trener` / heslo: `bohemka`

### 3. Znovuvytvoření a přeseedování databáze (CLI)
```bash
php seed.php --fresh
```

---

## 📁 Struktura projektu

- `includes/`
  - `db.php` — PDO SQLite připojení, automatická inicializace schématu, auto-seed a autentizace
  - `header.php` — sjednocená hlavička, navigace s detekcí aktivní stránky, podpora dark módu a adaptivní logo
  - `footer.php` — sjednocená patička oddílu, mobilní navigace a menu
  - `seed_data.json` — výchozí obsah pro inicializaci SQLite databáze
- `index.php` — úvodní stránka s dynamickým kalendářem, vzkazy a aktualitami
- `aktuality.php` — archiv aktualit a detail článku v zaoblené bublině
- `zavody.php` — kalendář závodů a přímý vstup k přihláškám
- `pro-rodice.php` — nástěnka trenérů, informace k platbám a lékařským prohlídkám
- `intranet.php` — členský portál pro plavce a rodiče (přihlašování na disciplíny)
- `admin.php` — správa oddílu pro trenéry a administrátory (plný CRUD)
- `rekordy.php` — oddílové rekordy v 25m a 50m bazénech
- `statistika.php` — historické štafety a ročenky oddílu v PDF
- `ke-stazeni.php` — formuláře, zdravotní prohlídky a pravidla plavání
- `foto.php` — fotogalerie z oslav 80 let oddílu a závodů
- `kontakt.php` — kontakty na trenéry, bazény Podolí a Vinohrady
- `css/style.css` — moderní design bez rušivých hover posunů s vyladěným tmavým i světlým režimem
