# Návod na propojení s bezplatnou cloudovou databází Supabase

Tento projekt plaveckého oddílu **TJ Bohemians Praha (Klokani)** je navržen tak, aby běžel **100% zdarma** na hostingu **Vercel** jako čisté HTML, CSS a JavaScript (Vanilla JS).

Pro online ukládání dat (aktuality, závody, přihlášky plavců, vzkazy trenérů a uživatelé) využívá **Supabase** (bezplatný cloudový PostgreSQL s automatickým REST API a JS SDK).

---

## ⚡ 1. Vytvoření projektu na Supabase (ZDARMA)

1. Jděte na **[supabase.com](https://supabase.com)** a klikněte na **Start your project** (přihlášení přes GitHub nebo e-mail).
2. Klikněte na **New Project**.
3. Zvolte:
   - **Name:** např. `bohemka`
   - **Database Password:** zvolte silné heslo (uschovejte si ho)
   - **Region:** např. `Central Europe (Frankfurt)`
   - **Pricing Plan:** **Free tier** ($0/měsíc — navždy zdarma)
4. Klikněte na **Create new project** a počkejte cca 1–2 minuty, než se databáze připraví.

---

## 📋 2. Spuštění SQL schématu a seed dat

1. V levém menu administrace Supabase klikněte na **SQL Editor** (ikona terminálu `>_`).
2. Klikněte na tlačítko **New Query**.
3. Otevřete soubor [`supabase_schema.sql`](supabase_schema.sql) z kořene tohoto repozitáře, zkopírujte celý jeho obsah a vložte do SQL editoru v Supabase.
4. V pravém dolním rohu klikněte na zelené tlačítko **Run** (Spustit).
5. Během několika sekund se vytvoří:
   - Tabulky: `users`, `news`, `events`, `event_entries`, `parent_messages`, `trainers`, `yearbooks`, `records`.
   - Bezpečnostní **Row Level Security (RLS)** politiky pro veřejné čtení a zápis přes `anon` klíč.
   - Kompletní výchozí data Klokanů: kalendář závodů, soupisky, aktuality, rekordy, ročenky, trenéři a výchozí účty (`admin`, `trener`, `plavec`).

---

## 🔑 3. Získání Project URL a Anon API klíče

1. V levém menu klikněte na **Project Settings** (ozubené kolečko dole) &rarr; **API** (nebo ikonu **API Docs**).
2. V sekci **Project API Keys** uvidíte:
   - **Project URL:** např. `https://xyzcompany.supabase.co`
   - **Project API Keys (anon / public):** dlouhý text začínající `eyJhbGciOi...`

---

## ⚙️ 4. Propojení s webem na Vercelu

Máte na výběr ze **dvou pohodlných možností**:

### Možnost A: Zápis přímo do `js/supabase.js` (doporučeno pro Vercel)
Otevřete soubor [`js/supabase.js`](js/supabase.js) a na začátku doplňte své údaje:
```javascript
const DEFAULT_SUPABASE_URL = "https://VASE-PROJECT-ID.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOi...VASE_ANON_KEY";
```
Změny uložte a pushněte do GitHubu (`git commit -m "Configure Supabase" && git push`). Vercel automaticky nasadí novou verzi.

### Možnost B: Nastavení v prohlížeči (LocalStorage)
Kdykoliv můžete bez úpravy kódu otevřít vývojářskou konzoli (F12) a spustit:
```javascript
window.KlokaniSupabase.setCredentials(
  "https://VASE-PROJECT-ID.supabase.co",
  "eyJhbGciOi...VASE_ANON_KEY"
);
```
Údaje se uloží do `localStorage` vašeho prohlížeče a web se okamžitě přepne na živou databázi.

---

## 🛡️ Robustní automatický Fallback

Pokud Supabase URL a klíč **nejsou vyplněny** nebo pokud je uživatel **offline**:
- Web **nikdy nespadne** a nevyhodí žádnou chybu.
- Všechny stránky (`index.html`, `aktuality.html`, `zavody.html`, `intranet.html`, `admin.html`) automaticky načítají data z lokálního souboru `js/data.js` a ukládají přihlášky do `localStorage`.
- Jakmile Supabase připojíte, web plynule přepne na cloudové ukládání.

---

## 👤 Výchozí přihlašovací údaje do Intranetu a Administrace
- **Hlavní správce:** jméno: `admin` / heslo: `bohemka`
- **Trenér:** jméno: `trener` / heslo: `bohemka`
- **Plavec / Rodič:** jméno: `plavec` / heslo: `bohemka`
