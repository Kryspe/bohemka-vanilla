# Pravidla projektu Bohemka Vanilla

1. **Výhradně Vanilla verze:**
   - Pracovat VÝHRADNĚ na tomto projektu (`bohemka-vanilla`).
   - Žádný React, žádné TSX, žádné bundlery. Čisté HTML, CSS, JavaScript.
   - **GitHub Remote:** Git push smí jít VÝHRADNĚ do repozitáře `boh2` (`bohemka 2` - `git@github.com:Kryspe/boh2.git`).
   - Repozitář `zkousimbohemku` (React/TSX od Lovable) se NIKDY nesmí přepisovat ani do něj pushovat.

2. **Prostředí & Hosting:**
   - Projekt je nasazen na **Vercelu**.
   - Musí běžet **100% ZADARMO** (žádné placené plány).

3. **Dynamická data (Databáze na Vercelu):**
   - Vercel nepodporuje lokální zápis do souboru .sqlite na disku ani klasické PHP.
   - Pro online ukládání dat (novinky, přihlášky na závody, uživatelé) na Vercelu se používá bezplatná cloudová databáze (např. Supabase / Turso / Firebase) nebo Vercel Serverless Functions API s fallbackem na LocalStorage.

4. **Design a UX:**
   - Žádné skákající / zvětšovací hover efekty (karty a bloky jsou stabilní).
   - Logo v hlavičce je v tmavém režimu čistě bílé a dobře viditelné.
   - Články a důležité texty jsou v zaoblených čitelných blocích/kartách s kontrastním podbarvením.

5. **Průběžná dokumentace v Obsidianu (POVINNÉ):**
   - VŽDYCKY ukládat a průběžně aktualizovat dokumentaci k této konverzaci a projektu do Obsidianu:
     - Hlavní technický stav a předávací protokol: `/home/krystofspejchal/Obsidian/DOKUMENTACE_A_PROGRES_BOHEMIANS.md`
     - Záznam konverzace a rozhodnutí: `/home/krystofspejchal/Obsidian/Konverzace - Bohemians web vyvoj.md`
   - Struktura záznamu:
     1. **Co uživatel chce** (vize, požadavky, bezpečnostní a technologická pravidla)
     2. **Co jsme udělali** (detailní chronologie, hotové funkce, commity)
     3. **Co bychom měli udělat dál** (backlog, doporučení)
     4. **Předávací protokol** (aby šlo v konverzaci pokračovat v jakémkoliv jiném účtu nebo relaci)

6. **Zlatý standard Intranetu (Oficiální záchytný bod):**
   - Aktuální podoba členského intranetu v `intranet.html` (označena gitem jako `intranet-gold-standard`, commit `2b808fe`) je **závazným a nedotknutelným záchytným bodem**.
   - **ZÁKAZ:** Nikdy nenahrazovat tento intranet generickými SaaS dashboardy, rozbitými modálními okny ani plovoucími gizmy.
   - **Vždy striktně zachovat:**
     - Režim **Plavec / Rodič** se záložkami: *Přihlášky na závody*, *Rezervace na akce*, *Moje výsledky*, *Platby příspěvků* (s QR kódem VS 214) a *Nastavení účtu*.
     - Režim **Trenér / Správce** se záložkami: *Závody & CSV přihlášky* (1-click export do ČSPS CSV soupisky), *Aktuality oddílu*, *Aktivita & Upozornění*, *Fotogalerie*, *Ke stažení (PDF)* a *Profil trenéra*.
     - Autentickou zelenobílou identitu Bohemians, karty s přehlednou typografií a 100% stabilitu rozvržení.

