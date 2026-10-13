    <!-- FOOTER -->
    <footer class="border-t border-border bg-card mt-20">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div class="md:col-span-2">
          <div class="flex items-center gap-3">
            <img src="assets/bohemka_badge.png" alt="TJ Bohemians Praha" class="h-10 w-10 object-contain rounded-full">
            <img src="assets/logo-klokani.png" alt="TJ Bohemians Praha" class="site-logo-adaptive h-8 w-auto object-contain hidden sm:block">
            <div class="sm:hidden">
              <span class="font-display text-base font-bold text-foreground">TJ Bohemians Praha — oddíl plavání</span>
              <p class="text-xs text-primary font-semibold">Tradice od roku 1946 · Zelenobílá rodina Klokanů</p>
            </div>
          </div>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Vychováváme špičkové sportovce i začínající malé plavce — od kurzů přes přípravku až po reprezentaci na mistrovstvích ČR a Evropy.
          </p>
          <div class="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span>IČO: 00539121</span>
            <span>·</span>
            <span>Účet: 123456789/0300 (ČSOB)</span>
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Sekce webu</h3>
          <ul class="space-y-1.5 text-sm text-muted-foreground">
            <li><a href="aktuality.php" class="hover:text-primary">Aktuality</a></li>
            <li><a href="oddil.php" class="hover:text-primary">O oddílu & bazény</a></li>
            <li><a href="pro-rodice.php" class="hover:text-primary">Pro rodiče</a></li>
            <li><a href="zavody.php" class="hover:text-primary">Závody & kalendář</a></li>
            <li><a href="rekordy.php" class="hover:text-primary">Oddílové rekordy</a></li>
            <li><a href="statistika.php" class="hover:text-primary">Statistika & Ročenky</a></li>
            <li><a href="ke-stazeni.php" class="hover:text-primary">Ke stažení</a></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Kontakt & Adresy</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:jan.srb@czechswimming.cz" class="inline-flex items-center gap-2 hover:text-primary">
                <svg class="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                jan.srb@czechswimming.cz
              </a>
            </li>
            <li>
              <a href="https://kurzy.boh.cz" target="_blank" rel="noreferrer" class="hover:text-primary">
                Výuka dětí: <strong>kurzy.boh.cz</strong>
              </a>
            </li>
            <li class="pt-1 text-xs leading-relaxed">
              <strong>Stadion Podolí:</strong> Podolské nábřeží 3/1184, Praha 4<br>
              <strong>Sokol Vinohrady:</strong> Polská 2400/1a, Praha 2
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 1946–2026 TJ Bohemians Praha — oddíl plavání Klokani. Všechna práva vyhrazena.
      </div>
    </footer>

    <!-- MOBILE BOTTOM NAV -->
    <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden" id="bottom-nav">
      <div class="mx-auto flex max-w-md items-center justify-around px-2">
        <a href="index.php" class="flex flex-col items-center gap-1 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Domů</span>
        </a>
        <a href="pro-rodice.php" class="flex flex-col items-center gap-1 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Pro rodiče</span>
        </a>
        <a href="zavody.php" class="flex flex-col items-center gap-1 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x1="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          <span>Závody</span>
        </a>
        <a href="ke-stazeni.php" class="flex flex-col items-center gap-1 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg>
          <span>Ke stažení</span>
        </a>
        <button type="button" id="bottom-nav-more" class="flex flex-col items-center gap-1 text-[0.65rem] font-medium text-muted-foreground hover:text-foreground">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          <span>Více</span>
        </button>
      </div>
    </nav>

    <!-- MOBILE DRAWER -->
    <div id="drawer-overlay" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden hidden"></div>
    <div id="drawer-content" class="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-card pb-[calc(5.5rem+env(safe-area-inset-bottom))] shadow-xl lg:hidden translate-y-full transition-transform duration-300">
      <div class="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border"></div>
      <div class="p-4">
        <p class="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">Menu stránek oddílu</p>
        <div class="grid grid-cols-2 gap-2">
          <a href="aktuality.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Aktuality</a>
          <a href="oddil.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Oddíl & Bazény</a>
          <a href="pro-rodice.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Pro rodiče</a>
          <a href="zavody.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Závody</a>
          <a href="rekordy.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Rekordy</a>
          <a href="statistika.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Statistika & Štafety</a>
          <a href="ke-stazeni.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Ke stažení</a>
          <a href="foto.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Fotogalerie</a>
          <a href="kontakt.php" class="rounded-xl border border-border bg-background p-3.5 text-center text-sm font-semibold text-foreground hover:bg-muted">Kontakty</a>
          <a href="intranet.php" class="rounded-xl bg-primary p-3.5 text-center text-sm font-bold text-primary-foreground">Intranet Klokanů</a>
        </div>
      </div>
    </div>

  </div>

  <script src="js/app.js"></script>
</body>
</html>
