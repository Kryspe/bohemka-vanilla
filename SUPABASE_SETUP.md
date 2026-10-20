# Návod na propojení s bezplatnou cloudovou databází Supabase

Tento projekt plaveckého oddílu **TJ Bohemians Praha (Klokani)** je navržen tak, aby běžel **100% zdarma** na hostingu **Vercel** jako čisté HTML, CSS a JavaScript (Vanilla JS bez bundlerů a bez nutnosti Node.js v produkci).

Pro online ukládání dat (aktuality, závody, přihlášky plavců, vzkazy trenérů, soupisky, rekordy, ročenky a uživatelé) využívá **Supabase** (bezplatný cloudový PostgreSQL s automatickým REST API a vestavěným Row Level Security).

- **Project ID:** `xjvpyznywisuuykwsedd`
- **Project URL:** `https://xjvpyznywisuuykwsedd.supabase.co`
- **Database Host:** `db.xjvpyznywisuuykwsedd.supabase.co` (port 5432 / 6543)
- **Autoritativní SQL schéma:** [`supabase_schema.sql`](supabase_schema.sql)

---

## 🚀 1. Spuštění SQL schématu a inicializace databáze

Pro aplikaci kompletního schématu (vytvoření 8 tabulek, indexů, RLS bezpečnostních politik a seed dat Klokanů) máte k dispozici **tři cesty provedení**:

### Cesta A: Supabase Cloud SQL Editor (Doporučeno — 60 sekund, bez instalace)

Nejjednodušší a okamžitá metoda přímo přes webové rozhraní Supabase:

1. Otevřete v prohlížeči SQL Editor pro projekt Bohemka:  
   👉 **[https://supabase.com/dashboard/project/xjvpyznywisuuykwsedd/sql/new](https://supabase.com/dashboard/project/xjvpyznywisuuykwsedd/sql/new)**
2. Otevřete lokální soubor [`supabase_schema.sql`](supabase_schema.sql) v kořeni repozitáře a zkopírujte celý jeho obsah (`Ctrl+A`, `Ctrl+C`).
3. Vložte obsah do SQL editoru v Supabase dashboardu.
4. V pravém dolním rohu klikněte na zelené tlačítko **Run** (nebo stiskněte klávesovou zkratku `Ctrl+Enter` / `Cmd+Enter`).
5. Během několika sekund se v konzoli zobrazí `Success. No rows returned`.

**Co se tím v databázi nastaví:**
- **8 základních tabulek:** `users`, `news`, `events`, `event_entries`, `parent_messages`, `trainers`, `yearbooks`, `records`.
- **8 B-Tree indexů** pro optimální odezvu vyhledávání a řazení.
- **Row Level Security (RLS)** politiky:
  - `Public select ...`: Neomezené veřejné čtení pro web.
  - `Public insert ...`: Validovaný zápis přihlášek na závody, aktualit a vzkazů.
  - `Public update ...`: Aktualizace profilů a záznamů s ochranou kmenových účtů.
  - `Public delete ...`: Umožňuje mazání z `admin.html` a automatické čištění testovacích dat (`test-%`).
- **100% idempotentní seed data:** Kalendář závodů, aktuality, rekordy 25m/50m, trenéři, ročenky a výchozí účty (`admin`, `trener`, `plavec`).

---

### Cesta B: Automatické spuštění přes `psql` (pokud máte `PGPASSWORD`)

Klientský nástroj `psql` je na systému předinstalován. Cloudová databáze Supabase má otevřené a přímo dostupné síťové porty 5432 i 6543. Pokud máte k dispozici heslo databáze, můžete schéma nasadit jedním příkazem z terminálu:

```bash
# Přímé připojení na PostgreSQL port 5432
PGPASSWORD="<vases_databazove_heslo>" psql \
  -h db.xjvpyznywisuuykwsedd.supabase.co \
  -p 5432 \
  -U postgres \
  -d postgres \
  -f supabase_schema.sql
```

Alternativně přes PgBouncer transaction pooler (port 6543):
```bash
PGPASSWORD="<vases_databazove_heslo>" psql \
  -h db.xjvpyznywisuuykwsedd.supabase.co \
  -p 6543 \
  -U postgres.xjvpyznywisuuykwsedd \
  -d postgres \
  -f supabase_schema.sql
```

---

### Cesta C: Automatické spuštění přes `npx supabase` (pokud máte `SUPABASE_ACCESS_TOKEN`)

Pokud máte vygenerovaný Personal Access Token ze Supabase dashboardu ([https://supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)):

```bash
# 1. Nastavte přístupový token
export SUPABASE_ACCESS_TOKEN="sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 2. Spusťte exekuci schématu přes Supabase CLI (bez nutnosti globální instalace)
npx supabase db execute --project-ref xjvpyznywisuuykwsedd --file supabase_schema.sql
```

Alternativně lze použít přímo Supabase Management API:
```bash
export SUPABASE_ACCESS_TOKEN="sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

curl -s -X POST "https://api.supabase.com/v1/projects/xjvpyznywisuuykwsedd/database/query" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary "{\"query\": $(jq -Rs . < supabase_schema.sql)}"
```

---

## 🔍 2. Ověření funkčnosti po nasazení (Health Check)

Jakmile je SQL schéma v Supabase spuštěno, můžete okamžitě ověřit dostupnost všech REST endpointů:

### A. Rychlá kontrola přes `curl`
```bash
# Dotaz na aktuality (musí vrátit HTTP 200 a JSON pole s aktualitami)
curl -s "https://xjvpyznywisuuykwsedd.supabase.co/rest/v1/news?select=id,title,date&limit=3" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ"
```

Ověření všech 8 tabulek:
```bash
KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ"
for table in users news events event_entries parent_messages trainers yearbooks records; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://xjvpyznywisuuykwsedd.supabase.co/rest/v1/${table}?select=*&limit=1" \
    -H "apikey: $KEY")
  echo "Tabulka ${table}: HTTP ${STATUS}"
done
```
*Správný výsledek po nasazení:* `HTTP 200` pro všech 8 tabulek (žádná chyba `PGRST205`).

### B. Spuštění automatického verifikačního testu
```bash
node scripts/verify_supabase.js
# nebo
bash scripts/verify_supabase.sh
```
Skript provede vložení testovacího záznamu (`test-crud-...`), jeho přečtení, aktualizaci a následné bezpečné smazání.

---

## ⚙️ 3. Konfigurace klienta ve frontendu

V repozitáři je konfigurace přednastavena v [`js/supabase.js`](js/supabase.js):

```javascript
const DEFAULT_SUPABASE_URL = "https://xjvpyznywisuuykwsedd.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";
```

### Přepnutí projektu v prohlížeči (LocalStorage Override)
Pokud chcete aplikaci přepnout na jinou Supabase instanci bez změny kódu, stačí v konzoli prohlížeče (F12) spustit:
```javascript
window.KlokaniSupabase.setCredentials(
  "https://VASE-PROJECT-ID.supabase.co",
  "eyJhbGciOi...VASE_ANON_KEY"
);
```

---

## 🛡️ 4. Automatický Offline Fallback & Odolnost proti výpadku

Aplikace splňuje přísná kritéria spolehlivosti:
1. **Při výpadku sítě nebo nedostupnosti cloudu:**
   - Stránky (`index.html`, `aktuality.html`, `zavody.html`, `intranet.html`, `admin.html`) automaticky přecházejí na lokální data (`localStorage` a fallback v `js/data.js`).
   - Žádná výjimka neshodí JavaScript aplikace.
2. **Offline Outbox Fronta:**
   - Přihlášky a úpravy provedené v offline stavu se ukládají do fronty `boh-offline-queue` a odešlou se do cloudu automaticky po obnovení spojení (`window.addEventListener("online")`).

---

## 👤 5. Výchozí přihlašovací údaje (Intranet & Administrace)
- **Hlavní správce:** jméno: `admin` / heslo: `bohemka`
- **Trenér:** jméno: `trener` / heslo: `bohemka`
- **Plavec / Rodič:** jméno: `plavec` / heslo: `bohemka`
