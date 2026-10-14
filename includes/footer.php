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
            <li><a href="aktuality" class="hover:text-primary">Aktuality</a></li>
            <li><a href="pro-rodice" class="hover:text-primary">Pro rodiče</a></li>
            <li><a href="oddil" class="hover:text-primary">O oddílu & bazény</a></li>
            <li><a href="zavody" class="hover:text-primary">Závody & kalendář</a></li>
            <li><a href="rekordy" class="hover:text-primary">Oddílové rekordy</a></li>
            <li><a href="statistika" class="hover:text-primary">Statistika & Ročenky</a></li>
            <li><a href="foto" class="hover:text-primary">Fotogalerie</a></li>
            <li><a href="ke-stazeni" class="hover:text-primary">Ke stažení</a></li>
            <li><a href="kontakt" class="hover:text-primary">Kontakty</a></li>
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

    <!-- MOBILE BOTTOM NAVIGATION (Anchored Edge-to-Edge Tab Bar) -->
    <nav class="mobile-bottom-nav lg:hidden" id="bottom-nav" aria-label="Mobilní navigace">
      <a href="/" class="mobile-tab-item <?= ($currentPage === 'index') ? 'active' : '' ?>" data-path="/">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Domů</span>
      </a>
      <a href="aktuality" class="mobile-tab-item <?= ($currentPage === 'aktuality') ? 'active' : '' ?>" data-path="aktuality">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
        <span>Aktuality</span>
      </a>
      <a href="zavody" class="mobile-tab-item <?= ($currentPage === 'zavody') ? 'active' : '' ?>" data-path="zavody">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        <span>Závody</span>
      </a>
      <a href="intranet" class="mobile-tab-item <?= ($currentPage === 'intranet') ? 'active' : '' ?>" data-path="intranet">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span>Intranet</span>
      </a>
      <button type="button" id="bottom-nav-more" class="mobile-tab-item" aria-label="Otevřít další sekce oddílu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>
        <span>Více</span>
      </button>
    </nav>

    <!-- MOBILE DRAWER (BOTTOM SHEET) -->
    <div id="drawer-overlay" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md lg:hidden hidden transition-opacity"></div>
    <div id="drawer-content" class="mobile-drawer-sheet fixed inset-x-0 bottom-0 z-50 rounded-t-2xl pb-[calc(2.5rem+env(safe-area-inset-bottom))] lg:hidden translate-y-full transition-transform duration-300 max-h-[85vh] overflow-y-auto">
      <div class="sticky top-0 z-10 bg-inherit pt-3 pb-2.5 px-6 flex items-center justify-between border-b border-border/40">
        <div class="flex items-center gap-2.5">
          <div class="h-1.5 w-10 rounded-full bg-border/80"></div>
          <span class="text-xs font-bold uppercase tracking-wider text-primary">Všechny sekce</span>
        </div>
        <button type="button" id="drawer-close-btn" class="h-8 w-8 rounded-full bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Zavřít menu">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-2.5 p-4 sm:p-6">
        <a href="pro-rodice" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Pro rodiče</span>
          <span class="text-xs text-muted-foreground">Lékařské prohlídky a vzkazy</span>
        </a>
        <a href="oddil" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">O oddílu</span>
          <span class="text-xs text-muted-foreground">Historie 80 let a skupiny</span>
        </a>
        <a href="ke-stazeni" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Ke stažení</span>
          <span class="text-xs text-muted-foreground">Rozpis drah a směrnice PDF</span>
        </a>
        <a href="statistika" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Statistika</span>
          <span class="text-xs text-muted-foreground">Top výkony a FINA body</span>
        </a>
        <a href="rekordy" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Rekordy</span>
          <span class="text-xs text-muted-foreground">Oddílové rekordy 25m &amp; 50m</span>
        </a>
        <a href="foto" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Fotogalerie</span>
          <span class="text-xs text-muted-foreground">Oslava 80 let a závody</span>
        </a>
        <a href="kontakt" class="flex flex-col gap-1 rounded-2xl border border-border/60 bg-background/70 p-3.5 transition-all hover:border-primary/50 active:scale-95">
          <span class="text-sm font-bold text-foreground">Kontakt</span>
          <span class="text-xs text-muted-foreground">Trenéři, Podolí &amp; Vinohrady</span>
        </a>
        <a href="intranet" class="flex flex-col gap-1 rounded-2xl border border-primary/50 bg-primary/10 p-3.5 transition-all hover:bg-primary/15 active:scale-95">
          <span class="text-sm font-bold text-primary">Členský Intranet</span>
          <span class="text-xs text-muted-foreground">Správa přihlášek a výsledků</span>
        </a>
      </div>
    </div>

  </div>

  <script src="js/data.js"></script>
  <script src="js/store.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
