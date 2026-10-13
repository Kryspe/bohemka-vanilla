# Pravidla projektu Bohemka Vanilla

1. **Výhradně Vanilla verze:**
   - Pracovat VÝHRADNĚ na tomto repozitáři (`bohemka-vanilla`).
   - Žádný React, žádné TSX, žádné bundlery. Čisté HTML, CSS, JavaScript.

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
