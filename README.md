# TJ Bohemians Praha — Plavecký oddíl Klokani (Vanilla HTML/CSS/JS + Supabase)

Oficiální moderní prezentace plaveckého oddílu TJ Bohemians Praha k 80. výročí oddílu (1946–2026).

## 💡 Architektura a technologie

- **Hosting na Vercelu:** 100% **ZDARMA** bez nákladů na server (statické HTML5, moderní CSS a Vanilla JavaScript).
- **Cloudová databáze:** **Supabase** (bezplatný PostgreSQL s REST API a JS SDK).
- **Odolný fallback:** Pokud Supabase ještě není nakonfigurována nebo je uživatel offline, web okamžitě využívá statická data `js/data.js` a `localStorage` bez jakéhokoliv pádu či chyb.
- **Bez frameworků a bundlerů:** Žádný React, žádné TSX, žádný build krok. Funguje ihned a čistě.
- **Členský Intranet (`intranet.html`):** Přihlášení pro plavce, trenéry a rodiče, registrace na závody a disciplíny, stav přihlášek.
- **Administrace oddílu (`admin.html`):** Panel pro správu obsahu, schvalování položek, závody, aktuality a vzkazy.
- **Podpora PHP hostingu:** Soubory `.php` a SQLite (`data/bohemka.sqlite`) zůstávají plně zachovány pro klasické PHP servery.

---

## ⚡ Rychlé nastavení Supabase pro Vercel

Kompletní podrobný návod krok za krokem najdete v souboru **[`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)**.

1. **Vytvořte projekt zdarma:** Na [supabase.com](https://supabase.com) vytvořte bezplatný projekt (Free tier).
2. **Spusťte schéma:** V SQL Editoru vložte a spusťte obsah souboru [`supabase_schema.sql`](supabase_schema.sql). Vytvoří se tabulky, bezpečnostní RLS politiky a kompletní data Klokanů.
3. **Zadejte klíče:** Vložte své `Project URL` a `anon` klíč do [`js/supabase.js`](js/supabase.js) nebo v konzoli spusťte:
   ```javascript
   window.KlokaniSupabase.setCredentials("https://VASE-ID.supabase.co", "VASE_ANON_KEY");
   ```

---

## 🚀 Jak spustit lokálně

### Možnost 1: Statický web (stejně jako na Vercelu)
Otevřete kterýkoliv soubor `.html` přímo v prohlížeči nebo pomocí libovolného lokálního serveru:
```bash
npx serve .
# nebo
python3 -m http.server 8000
```
A otevřete: **http://localhost:8000**

### Možnost 2: Lokální PHP server
```bash
./run_local.sh
# nebo
php -S localhost:8000
```

---

## 🔑 Výchozí přístupové údaje
- **Správce / Hlavní trenér:** `admin` / heslo: `bohemka`
- **Trenér:** `trener` / heslo: `bohemka`
- **Plavec / Rodič:** `plavec` / heslo: `bohemka`

---

## 📁 Struktura projektu

- `supabase_schema.sql` — kompletní SQL schéma tabulek, RLS a seed dat pro Supabase
- `SUPABASE_SETUP.md` — podrobný návod na zprovoznění Supabase
- `PROJECT_RULES.md` — základní pravidla projektu (pouze Vanilla HTML/CSS/JS na Vercelu)
- `js/`
  - `supabase.js` — Supabase SDK klient s fallbackem na LocalStorage a data.js
  - `data.js` — výchozí data oddílu (aktuality, závody, rekordy, ročenky, trenéři)
  - `store.js` — správa stavu přihlášek, rolí a administrace
  - `app.js` — navigační logika, modály, toasty, přihláškový dialog a přepínač tmavého režimu
- `css/`
  - `style.css` — moderní design bez rušivých hover posunů, adaptivní logo pro tmavý/světlý režim
- `*.html` — statické webové stránky pro nasazení na Vercel
- `*.php`, `includes/`, `api/` — zachovaná alternativa pro PHP hostované prostředí
