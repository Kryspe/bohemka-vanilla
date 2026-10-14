/**
 * Universal HTML Escaping to prevent XSS attacks across all templates and dynamic rendering
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
}

/**
 * Boh — Main Application JavaScript
 * Handles navigation, Liquid Glass, search dialog (Ctrl+K), notification bell,
 * mobile drawer, Instagram scroll animation, modals, and toasts.
 */

function bootstrapApp() {
  initTheme();
  initLiquidGlassHeader();
  initMobileNav();
  highlightActiveNav();
  initSearchModal();
  initNotificationBell();
  initSignUpModal();
  initScrollReveal();
  initSpotlightCards();
  initServiceWorker();
  checkIntranetAutoLogout();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapApp);
} else {
  bootstrapApp();
}

// Automatic logout of Intranet whenever outside intranet.html
function checkIntranetAutoLogout() {
  const curPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (curPage !== "intranet.html") {
    if (window.BohStore && typeof window.BohStore.logout === "function") {
      window.BohStore.logout();
    } else {
      try {
        sessionStorage.removeItem("boh-intranet-auth");
        localStorage.removeItem("boh-intranet-auth");
      } catch {}
    }
  }
}

// 1. 3-Way Theme Toggle (Bohemka Club -> Dark -> Light)
function initTheme() {
  const THEME_KEY = "boh-theme";
  let theme = localStorage.getItem(THEME_KEY);

  if (!theme || (theme !== "dark" && theme !== "bohemka" && theme !== "light")) {
    theme = "bohemka";
  }

  applyTheme(theme);

  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let currentTheme = localStorage.getItem(THEME_KEY) || "bohemka";
      let nextTheme = "dark";
      if (currentTheme === "bohemka") nextTheme = "dark";
      else if (currentTheme === "dark") nextTheme = "light";
      else nextTheme = "bohemka";

      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  });
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "bohemka");

  if (theme === "bohemka") {
    root.classList.add("bohemka");
  } else if (theme === "dark") {
    root.classList.add("dark");
  }

  updateThemeIcons(theme);
  updateThemeMeta(theme);
}

function updateThemeMeta(theme) {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  const colorMap = {
    bohemka: "#007a3d",
    dark: "#080d12",
    light: "#fafcfd"
  };
  meta.setAttribute("content", colorMap[theme] || "#080d12");
}

function updateThemeIcons(theme) {
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    if (theme === "bohemka") {
      btn.innerHTML = `<svg class="h-4 w-4 text-[#00ba60]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
      btn.setAttribute("title", "Klubový režim Bohemians aktivní • Kliknutím přepnete na tmavý motiv");
      btn.setAttribute("aria-label", "Přepnout motiv: Tmavý");
    } else if (theme === "dark") {
      btn.innerHTML = `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      btn.setAttribute("title", "Tmavý režim aktivní • Kliknutím přepnete na světlý motiv");
      btn.setAttribute("aria-label", "Přepnout motiv: Světlý");
    } else {
      btn.innerHTML = `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
      btn.setAttribute("title", "Světlý režim aktivní • Kliknutím přepnete na klubový motiv Bohemians");
      btn.setAttribute("aria-label", "Přepnout motiv: Bohemians");
    }
  });
}

// 2. Liquid Glass Header Dynamics
function initLiquidGlassHeader() {
  const headerContainer = document.querySelector("header > div.relative");
  if (!headerContainer) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      headerContainer.classList.add("shadow-2xl", "py-2");
      headerContainer.classList.remove("py-2.5");
    } else {
      headerContainer.classList.remove("shadow-2xl", "py-2");
      headerContainer.classList.add("py-2.5");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// 3. React Bits: SpotlightCard interaction & Content Assurance
function initSpotlightCards() {
  const cards = document.querySelectorAll(
    ".spotlight-card, .hover-float, #home-news-cards > a, #home-groups-cards > div, .dash-spotlight, .hero-news-card, #downloads-grid > div"
  );
  cards.forEach(card => {
    if (!card.classList.contains("spotlight-card")) {
      card.classList.add("spotlight-card");
    }
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}

function initScrollReveal() {
  // Delegate to animations.js IntersectionObserver-based reveal if loaded
  if (window.initBohScrollReveal) {
    window.initBohScrollReveal();
  } else {
    // Fallback: guarantee all content is immediately 100% visible
    document.querySelectorAll(".reveal, .reveal-scale, .reveal-fade, .reveal-left, [data-reveal]").forEach(el => {
      el.classList.add("revealed", "boh-anim-visible");
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
    });
  }
  initSpotlightCards();
}
window.initScrollReveal = initScrollReveal;
window.initSpotlightCards = initSpotlightCards;

// 4. Active Link Highlight
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Desktop Header Nav
  document.querySelectorAll("header nav a.nav-item").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = href.split("/").pop();
    if (target === currentPath || (currentPath === "" && target === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Mobile Bottom Tab Bar (Edge-to-Edge)
  const bottomNav = document.getElementById("bottom-nav");
  if (bottomNav) {
    const dockItems = bottomNav.querySelectorAll(".mobile-tab-item, .fomo-dock-item");
    let matchedDock = false;
    dockItems.forEach(item => {
      const href = item.getAttribute("href");
      if (href) {
        const target = href.split("/").pop();
        if (target === currentPath || (currentPath === "" && target === "index.html")) {
          item.classList.add("active");
          matchedDock = true;
        } else {
          item.classList.remove("active");
        }
      } else {
        item.classList.remove("active");
      }
    });

    // If current page is one of the drawer sections, mark the 'Více' button as active
    if (!matchedDock) {
      const moreBtn = document.getElementById("bottom-nav-more");
      if (moreBtn) moreBtn.classList.add("active");
    }
  }

  // Drawer Links Highlight
  const drawer = document.getElementById("drawer-content");
  if (drawer) {
    drawer.querySelectorAll("a").forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      const target = href.split("/").pop();
      if (target === currentPath || (currentPath === "" && target === "index.html")) {
        a.classList.add("border-primary", "bg-primary/15", "text-primary");
        a.classList.remove("border-border/60", "bg-background/70", "text-foreground");
      }
    });
  }
}

// 5. Mobile Navigation Drawer & Stable Edge-to-Edge Bottom Tab Bar
function initMobileNav() {
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerContent = document.getElementById("drawer-content");
  const moreBtn = document.getElementById("bottom-nav-more");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  if (moreBtn && drawerOverlay && drawerContent) {
    const openDrawer = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      drawerOverlay.classList.remove("hidden");
      drawerContent.classList.remove("translate-y-full");
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      drawerOverlay.classList.add("hidden");
      drawerContent.classList.add("translate-y-full");
      document.body.style.overflow = "";
    };

    const toggleDrawer = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      if (drawerContent.classList.contains("translate-y-full")) {
        openDrawer(e);
      } else {
        closeDrawer(e);
      }
    };

    document.querySelectorAll("#bottom-nav-more, .mobile-drawer-trigger, #header-menu-btn").forEach(btn => {
      btn.addEventListener("click", toggleDrawer);
    });
    drawerOverlay.addEventListener("click", closeDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
    drawerContent.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawerOverlay.classList.contains("hidden")) closeDrawer(e);
    });
  }
}

// 6. Global Search Modal (Artificial-Analysis-style clean dialog)
function initSearchModal() {
  let modal = document.getElementById("global-search-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "global-search-modal";
    modal.className = "fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 hidden transition-all duration-200";
    modal.setAttribute("data-modal-overlay", "true");
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm modal-overlay-bg"></div>
      <div class="internal-search-dialog apple-spotlight-modal relative z-10 flex flex-col w-full shadow-2xl transition-all duration-200">
        <!-- Top Search Input Box -->
        <div class="relative flex items-center gap-2.5 rounded-xl border border-input/80 bg-background/50 px-3.5 py-2.5 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20">
          <svg class="h-4 w-4 text-muted-foreground shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            id="global-search-input"
            type="text"
            autocomplete="off"
            placeholder="Hledat závody, plavce, rekordy, dokumenty..."
            class="w-full bg-transparent text-sm sm:text-[15px] font-normal outline-none placeholder:text-muted-foreground/60 text-foreground"
          />
          <button id="global-search-clear" type="button" class="hidden rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0" title="Vymazat">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Section Label -->
        <div class="flex items-center justify-between px-2 pt-3 pb-1.5">
          <span id="search-section-label" class="text-xs font-medium text-muted-foreground">Doporučené</span>
          <span id="spotlight-result-count" class="text-[11px] text-muted-foreground"></span>
        </div>

        <!-- Results / Suggested List -->
        <div id="global-search-results" class="max-h-[50vh] sm:max-h-[55vh] overflow-y-auto space-y-0.5 pr-0.5">
          <!-- Populated dynamically -->
        </div>

        <!-- Footer -->
        <div class="mt-2.5 pt-2.5 border-t border-border/50 flex items-center justify-between px-2 text-xs text-muted-foreground">
          <span class="text-[11px] text-muted-foreground/70 font-mono hidden sm:inline">TJ Bohemians Praha</span>
          <div class="flex items-center gap-3 sm:gap-4 ml-auto text-[11px] text-muted-foreground">
            <span class="inline-flex items-center gap-1.5">
              <kbd class="rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">↑↓</kbd>
              <span>Navigace</span>
            </span>
            <span class="inline-flex items-center gap-1.5">
              <kbd class="rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Enter</kbd>
              <span>Otevřít</span>
            </span>
            <span class="inline-flex items-center gap-1.5">
              <kbd class="rounded border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
              <span>Zavřít</span>
            </span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const input = document.getElementById("global-search-input");
  const clearBtn = document.getElementById("global-search-clear");
  const resultsContainer = document.getElementById("global-search-results");
  const countEl = document.getElementById("spotlight-result-count");
  const sectionLabelEl = document.getElementById("search-section-label");
  let selectedIndex = -1;
  let currentResults = [];

  const DEFAULT_SUGGESTIONS = [
    {
      title: "Termínová listina 2026/2027",
      category: "Závod",
      subtitle: "Rozpis závodů, propozice a přihlášky na bazénové i dálkové plavání",
      url: "zavody.html"
    },
    {
      title: "Rozdělení do drah Podolí & Vinohrady",
      category: "Ke stažení",
      subtitle: "Oficiální rozpis tréninků a rozdělení plavců 2026/27 v PDF",
      url: "ke-stazeni.html"
    },
    {
      title: "Oddílové rekordy 25m & 50m",
      category: "Rekord",
      subtitle: "Historické i aktuální rekordy oddílu Bohemians",
      url: "rekordy.html"
    },
    {
      title: "Členský intranet & platby příspěvků",
      category: "Intranet",
      subtitle: "Osobní rekordy, starty, přihlášky a bankovní QR platby",
      url: "intranet.html"
    },
    {
      title: "Jan Srb — hlavní trenér",
      category: "Trenér",
      subtitle: "Kontakty na vedení oddílu a trenéry jednotlivých skupin",
      url: "kontakt.html"
    },
    {
      title: "Statistika a top výkony plavců",
      category: "Statistika",
      subtitle: "AQUA body, historické tabulky a vyhledávač výsledků plavců",
      url: "statistika.html"
    },
    {
      title: "Informace pro rodiče & kurzy",
      category: "Pro rodiče",
      subtitle: "Kurzy plavání na Vinohradech, přípravka a lékařské posudky",
      url: "pro-rodice.html"
    },
    {
      title: "Fotogalerie z oslav 80 let oddílu",
      category: "Foto",
      subtitle: "Fotoreportáže ze soustředění a jubilejního setkání na Hagiboru",
      url: "foto.html"
    },
    {
      title: "Výklad pravidel plavání ČSPS",
      category: "Dokument",
      subtitle: "Oficiální pravidla Českého svazu plaveckých sportů v PDF",
      url: "ke-stazeni.html"
    }
  ];

  function getCategoryIcon(cat) {
    switch (cat) {
      case "Závod":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
      case "Aktualita":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`;
      case "Plavec":
      case "Trenér":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      case "Rekord":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`;
      case "Statistika":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`;
      case "Ke stažení":
      case "Dokument":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>`;
      case "Intranet":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
      case "Foto":
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
      default:
        return `<svg class="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    }
  }

  const updateSelection = () => {
    const items = resultsContainer.querySelectorAll(".spotlight-result-item");
    items.forEach((el, idx) => {
      if (idx === selectedIndex) {
        el.classList.add("selected-active", "bg-muted");
        el.scrollIntoView({ block: "nearest" });
      } else {
        el.classList.remove("selected-active", "bg-muted");
      }
    });
  };

  const removeAccents = (str) => {
    if (!str) return "";
    return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const highlightMatch = (text, query) => {
    if (!text) return "";
    text = String(text);
    if (!query || typeof query !== "string") return escapeHtml(text);
    const trimmed = query.trim();
    if (!trimmed) return escapeHtml(text);

    const normText = removeAccents(text);
    const normQuery = removeAccents(trimmed);

    if (normText.length !== text.length) {
      const lowerText = text.toLowerCase();
      const lowerQuery = trimmed.toLowerCase();
      const idx = lowerText.indexOf(lowerQuery);
      if (idx === -1) return escapeHtml(text);
      return escapeHtml(text.slice(0, idx)) +
        `<mark class="bg-primary/20 text-primary font-semibold px-0.5 rounded">${escapeHtml(text.slice(idx, idx + lowerQuery.length))}</mark>` +
        escapeHtml(text.slice(idx + lowerQuery.length));
    }

    let result = "";
    let lastIndex = 0;
    let index = normText.indexOf(normQuery, lastIndex);

    while (index !== -1) {
      result += escapeHtml(text.slice(lastIndex, index));
      const match = text.slice(index, index + normQuery.length);
      result += `<mark class="bg-primary/20 text-primary font-semibold px-0.5 rounded">${escapeHtml(match)}</mark>`;
      lastIndex = index + normQuery.length;
      index = normText.indexOf(normQuery, lastIndex);
    }
    result += escapeHtml(text.slice(lastIndex));
    return result;
  };

  const renderItemsList = (items, queryStr = "") => {
    currentResults = items;
    selectedIndex = items.length > 0 ? 0 : -1;

    if (!items || items.length === 0) {
      if (countEl) countEl.textContent = "0 výsledků";
      resultsContainer.innerHTML = `
        <div class="py-10 px-4 text-center text-sm text-muted-foreground">
          <p class="font-medium text-foreground">Žádné výsledky pro „${escapeHtml(queryStr)}“</p>
          <p class="mt-1 text-xs text-muted-foreground">Zkuste zadat jiný název závodu, příjmení plavce nebo dokument.</p>
        </div>
      `;
      return;
    }

    if (queryStr) {
      if (sectionLabelEl) sectionLabelEl.textContent = "Výsledky hledání";
      if (countEl) countEl.textContent = `${items.length} nalezeno`;
    } else {
      if (sectionLabelEl) sectionLabelEl.textContent = "Doporučené";
      if (countEl) countEl.textContent = "";
    }

    resultsContainer.innerHTML = items.map((m, idx) => {
      const icon = getCategoryIcon(m.category);
      const isSelected = idx === 0;
      const badge = m.category ? `<span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50 shrink-0">${escapeHtml(m.category)}</span>` : '';
      const subtitle = m.subtitle ? `<p class="text-xs text-muted-foreground mt-0.5 truncate">${highlightMatch(m.subtitle, queryStr)}</p>` : '';
      const itemUrl = safeUrl(m.url, "index.html");

      return `
        <a
          href="${escapeHtml(itemUrl)}"
          data-index="${idx}"
          class="spotlight-result-item flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer group ${isSelected ? 'selected-active bg-muted' : 'hover:bg-muted/70'}"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1">
            ${icon}
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">${highlightMatch(m.title, queryStr)}</span>
                ${badge}
              </div>
              ${subtitle}
            </div>
          </div>
        </a>
      `;
    }).join("");
  };

  const showDefaultSuggestions = () => {
    renderItemsList(DEFAULT_SUGGESTIONS, "");
  };

  const runSearch = (q) => {
    const trimmed = (q || "").trim();
    if (clearBtn) {
      if (trimmed) clearBtn.classList.remove("hidden");
      else clearBtn.classList.add("hidden");
    }

    if (!trimmed) {
      showDefaultSuggestions();
      return;
    }

    const storeObj = window.BohStore;
    let localMatches = storeObj ? storeObj.searchSite(trimmed) : [];

    renderItemsList(localMatches, trimmed);

    // Also query SQLite backend if running
    if (trimmed.length >= 2 && typeof fetch !== "undefined") {
      fetch("api/search.php?q=" + encodeURIComponent(trimmed))
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.results) && data.results.length > 0) {
            const existingUrls = new Set(localMatches.map(m => m.url + m.title));
            const newFromDb = data.results.filter(r => !existingUrls.has(r.url + r.title));
            if (newFromDb.length > 0) {
              const merged = [...localMatches, ...newFromDb];
              renderItemsList(merged.slice(0, 20), trimmed);
            }
          }
        })
        .catch(() => {});
    }
  };

  // Initial populate with suggested items
  showDefaultSuggestions();

  if (clearBtn && input) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      runSearch("");
      input.focus();
    });
  }

  if (input) {
    input.addEventListener("input", (e) => runSearch(e.target.value));

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentResults.length;
          updateSelection();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentResults.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
          updateSelection();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && currentResults[selectedIndex]) {
          window.location.href = safeUrl(currentResults[selectedIndex].url, "index.html");
        }
      } else if (e.key === "Escape") {
        closeModal("global-search-modal");
      }
    });
  }

  // Keyboard shortcut Ctrl+K / Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openModal("global-search-modal");
      if (input) setTimeout(() => { input.focus(); input.select(); }, 60);
    }
  });

  // Bind trigger buttons
  document.querySelectorAll(".site-search-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal("global-search-modal");
      if (input) setTimeout(() => { input.focus(); input.select(); }, 60);
    });
  });
}

// 7. Apple-like Notification Center & Real-time Broadcasts
function initNotificationBell() {
  updateNotificationBadges();

  document.querySelectorAll(".notification-bell-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleNotificationPopup(btn);
    });
  });

  // Listen for live broadcast notifications
  window.addEventListener("boh:notification:new", (e) => {
    const notif = e.detail;
    if (notif) {
      showAppleToastBanner(notif);
      updateNotificationBadges();
    }
  });

  // Close popup on outside click
  document.addEventListener("click", (e) => {
    const pop = document.getElementById("notification-dropdown-popup");
    if (pop && !pop.contains(e.target) && !e.target.closest(".notification-bell-btn")) {
      pop.classList.add("hidden");
    }
  });

  // Close popup on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const pop = document.getElementById("notification-dropdown-popup");
      if (pop) pop.classList.add("hidden");
    }
  });
}

function updateNotificationBadges() {
  const storeObj = window.BohStore || window.KlokaniStore;
  const count = storeObj && typeof storeObj.getUnreadNotificationsCount === "function"
    ? storeObj.getUnreadNotificationsCount()
    : (storeObj && storeObj.hasUnreadNotifications() ? 1 : 0);

  document.querySelectorAll(".notification-bell-btn").forEach(btn => {
    let dot = btn.querySelector(".notification-unread-dot");
    if (dot) {
      if (count > 0) {
        dot.classList.remove("hidden");
        dot.textContent = count > 9 ? "9+" : (count > 1 ? String(count) : "");
        dot.className = count > 1
          ? "notification-unread-dot absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-black shadow-sm"
          : "notification-unread-dot absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_2px_var(--color-background)]";
      } else {
        dot.classList.add("hidden");
      }
    }
  });
}

// Apple iOS/macOS Floating Toast Notification Banner
function showAppleToastBanner(notif) {
  let banner = document.getElementById("apple-toast-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "apple-toast-banner";
    banner.className = "apple-toast-banner";
    document.body.appendChild(banner);
  }

  const icons = {
    payment: `<svg class="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    deadline: `<svg class="h-5 w-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`,
    coach: `<svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    news: `<svg class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/></svg>`,
    notice: `<svg class="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  };

  banner.innerHTML = `
    <div class="flex items-start gap-3.5">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-card border border-border/60 shadow-sm">
        ${icons[notif.type] || icons.notice}
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] font-bold uppercase tracking-wider text-primary">BOHEMIANS • právě teď</span>
          <button type="button" onclick="event.stopPropagation(); document.getElementById('apple-toast-banner')?.classList.remove('show');" class="text-muted-foreground hover:text-foreground">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <h5 class="text-sm font-bold text-foreground mt-0.5 leading-snug">${escapeHtml(notif.title)}</h5>
        <p class="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">${escapeHtml(notif.subtitle)}</p>
      </div>
    </div>
  `;

  banner.onclick = () => {
    if (notif.url) window.location.href = safeUrl(notif.url, "index.html");
  };

  requestAnimationFrame(() => {
    banner.classList.add("show");
  });

  clearTimeout(banner._timeout);
  banner._timeout = setTimeout(() => {
    banner.classList.remove("show");
  }, 6000);
}

function formatNotifTime(isoString) {
  if (!isoString) return "NEDÁVNO";
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return "NYNÍ";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}M`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}H`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "VČERA";
  if (diffDays < 7) return `PŘED ${diffDays} DNY`;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric" });
}

function toggleNotificationPopup(triggerBtn) {
  let popup = document.getElementById("notification-dropdown-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "notification-dropdown-popup";
    popup.className = "notification-popup hidden";
    document.body.appendChild(popup);
  }

  if (!popup.classList.contains("hidden")) {
    popup.classList.add("hidden");
    return;
  }

  const storeObj = window.BohStore || window.KlokaniStore;
  let items = storeObj ? storeObj.getRecentNotifications() : [];
  let unreadCount = storeObj && typeof storeObj.getUnreadNotificationsCount === "function"
    ? storeObj.getUnreadNotificationsCount()
    : items.filter(i => i.unread).length;

  let activeFilter = "all";

  const renderPopupContent = (filter = "all") => {
    activeFilter = filter;
    const filteredItems = filter === "all"
      ? items
      : items.filter(it => it.type === filter);

    const unreadItems = filteredItems.filter(i => i.unread);
    const readItems = filteredItems.filter(i => !i.unread);

    const icons = {
      payment: `<div class="h-9 w-9 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>`,
      deadline: `<div class="h-9 w-9 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/30 flex items-center justify-center shrink-0">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      </div>`,
      coach: `<div class="h-9 w-9 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>`,
      news: `<div class="h-9 w-9 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/></svg>
      </div>`,
      notice: `<div class="h-9 w-9 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>`
    };

    popup.innerHTML = `
      <!-- Everclear CRM Header -->
      <div class="notif-header-banner">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-xs uppercase tracking-wider font-extrabold text-white truncate">Vaše oznámení</span>
            ${unreadCount > 0 ? `<span class="bg-emerald-500 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs shrink-0">${unreadCount} ${unreadCount === 1 ? 'nové' : (unreadCount < 5 ? 'nová' : 'nových')}</span>` : ''}
          </div>
          <button
            type="button"
            id="notif-clear-all"
            class="text-[11px] font-semibold text-white/90 hover:text-white border border-white/30 hover:border-white/70 bg-white/10 hover:bg-white/20 rounded-full px-2.5 py-0.5 transition-all shrink-0 flex items-center gap-1 cursor-pointer"
            title="Smazat všechna oznámení"
          >
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Smazat vše
          </button>
        </div>

        <div class="mt-3 flex items-center gap-4 overflow-x-auto pb-0.5 border-b border-white/20">
          <button type="button" data-filter="all" class="notif-tab-btn ${filter === 'all' ? 'active' : ''}">Všechna</button>
          <button type="button" data-filter="payment" class="notif-tab-btn ${filter === 'payment' ? 'active' : ''}">Platby</button>
          <button type="button" data-filter="deadline" class="notif-tab-btn ${filter === 'deadline' ? 'active' : ''}">Závody</button>
          <button type="button" data-filter="coach" class="notif-tab-btn ${filter === 'coach' ? 'active' : ''}">Trenér</button>
        </div>
      </div>

      <!-- Concentric Items Container -->
      <div class="max-h-[58vh] overflow-y-auto p-2.5 space-y-1.5 divide-y divide-border/20">
        ${filteredItems.length === 0 ? `
          <div class="py-12 px-6 text-center text-sm text-muted-foreground">
            <svg class="h-9 w-9 mx-auto text-muted-foreground/40 mb-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            Žádná oznámení v této kategorii.
          </div>
        ` : `
          <!-- 1. New / Unread Notifications -->
          ${unreadItems.map(it => `
            <div
              data-id="${it.id}"
              class="notif-item-card flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/70 cursor-pointer relative group border border-transparent hover:border-border/60"
            >
              ${icons[it.type] || icons.notice}
              <div class="min-w-0 flex-1">
                <div class="text-[13px] text-foreground leading-snug">
                  <span class="font-bold text-foreground">${escapeHtml(it.title)}</span>
                  ${it.subtitle ? `<span class="text-muted-foreground ml-1">${escapeHtml(it.subtitle)}</span>` : ''}
                </div>
                <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase">
                  <svg class="h-3 w-3 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                  <span>${formatNotifTime(it.createdAt)}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0 self-center">
                <div class="notif-mark-wrapper">
                  <button
                    type="button"
                    data-action="mark-read"
                    data-id="${it.id}"
                    class="notif-mark-btn h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/15 transition-all"
                    title="Označit jako přečtené"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span class="notif-action-tooltip">Přečteno</span>
                  </button>
                </div>
                <button
                  type="button"
                  data-action="dismiss"
                  data-id="${it.id}"
                  class="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/15 transition-all"
                  title="Odstranit"
                >
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
          `).join("")}

          <!-- 2. Section Divider for Previous / Read Notifications -->
          ${readItems.length > 0 ? `
            <div class="flex items-center justify-between px-3 py-1.5 mt-2 mb-1 border-t border-b border-border/40 bg-muted/20 rounded-lg">
              <span class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Předchozí oznámení</span>
              <button
                type="button"
                id="notif-clear-read"
                class="text-[10px] font-semibold text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
                title="Vymazat starší oznámení"
              >
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                Smazat starší
              </button>
            </div>

            <!-- 3. Previous / Read Notifications List -->
            ${readItems.map(it => `
              <div
                data-id="${it.id}"
                class="notif-item-card flex items-start gap-3 rounded-xl p-3 opacity-75 hover:opacity-100 transition-all hover:bg-muted/50 cursor-pointer relative group border border-transparent"
              >
                ${icons[it.type] || icons.notice}
                <div class="min-w-0 flex-1">
                  <div class="text-[13px] text-foreground/90 leading-snug">
                    <span class="font-semibold text-foreground/90">${escapeHtml(it.title)}</span>
                    ${it.subtitle ? `<span class="text-muted-foreground/80 ml-1">${escapeHtml(it.subtitle)}</span>` : ''}
                  </div>
                  <div class="mt-1 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground/70 uppercase">
                    <svg class="h-3 w-3 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                    <span>${formatNotifTime(it.createdAt)}</span>
                  </div>
                </div>
                <div class="flex items-center gap-1 shrink-0 self-center">
                  <span class="h-6 w-6 rounded-full flex items-center justify-center text-emerald-500/70" title="Již přečteno">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <button
                    type="button"
                    data-action="dismiss"
                    data-id="${it.id}"
                    class="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-destructive hover:bg-destructive/15 transition-all"
                    title="Odstranit"
                  >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>
            `).join("")}
          ` : ''}
        `}
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between border-t border-border/50 bg-muted/20 px-4 py-2.5 text-xs">
        <a href="zavody.html" class="font-semibold text-primary hover:underline flex items-center gap-1">Rozpis závodů →</a>
        <a href="pro-rodice.html" class="font-medium text-muted-foreground hover:text-foreground">Pro rodiče</a>
      </div>
    `;

    // Bind item clicks
    popup.querySelectorAll(".notif-item-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("button[data-action]")) return;
        const id = card.getAttribute("data-id");
        const found = items.find(it => it.id === id);
        if (storeObj && typeof storeObj.markNotificationRead === "function") {
          storeObj.markNotificationRead(id);
        }
        updateNotificationBadges();
        popup.classList.add("hidden");
        if (found && found.url) window.location.href = safeUrl(found.url, "index.html");
      });
    });

    // Mark single as read button
    popup.querySelectorAll("button[data-action='mark-read']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (storeObj && typeof storeObj.markNotificationRead === "function") {
          storeObj.markNotificationRead(id);
        }
        items = storeObj ? storeObj.getRecentNotifications() : [];
        unreadCount = typeof storeObj.getUnreadNotificationsCount === "function" ? storeObj.getUnreadNotificationsCount() : 0;
        updateNotificationBadges();
        renderPopupContent(activeFilter);
      });
    });

    // Dismiss single button
    popup.querySelectorAll("button[data-action='dismiss']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (storeObj && typeof storeObj.dismissNotification === "function") {
          storeObj.dismissNotification(id);
        }
        items = storeObj ? storeObj.getRecentNotifications() : [];
        unreadCount = typeof storeObj.getUnreadNotificationsCount === "function" ? storeObj.getUnreadNotificationsCount() : 0;
        updateNotificationBadges();
        renderPopupContent(activeFilter);
      });
    });

    // Filter tab buttons
    popup.querySelectorAll(".notif-tab-btn").forEach(tab => {
      tab.addEventListener("click", () => {
        const f = tab.getAttribute("data-filter");
        renderPopupContent(f);
      });
    });

    // Clear all
    popup.querySelector("#notif-clear-all")?.addEventListener("click", () => {
      if (storeObj && typeof storeObj.clearAllNotifications === "function") {
        storeObj.clearAllNotifications();
      }
      items = [];
      unreadCount = 0;
      updateNotificationBadges();
      renderPopupContent("all");
    });

    // Clear read
    popup.querySelector("#notif-clear-read")?.addEventListener("click", () => {
      if (storeObj && typeof storeObj.clearReadNotifications === "function") {
        storeObj.clearReadNotifications();
      }
      items = storeObj ? storeObj.getRecentNotifications() : [];
      unreadCount = typeof storeObj.getUnreadNotificationsCount === "function" ? storeObj.getUnreadNotificationsCount() : 0;
      updateNotificationBadges();
      renderPopupContent(activeFilter);
    });
  };

  renderPopupContent("all");

  // Position below trigger button with viewport boundary clamping
  const rect = triggerBtn.getBoundingClientRect();
  popup.style.position = "fixed";
  const isMobile = window.innerWidth < 640;
  if (isMobile) {
    popup.style.top = `${rect.bottom + 8}px`;
    popup.style.left = "10px";
    popup.style.right = "10px";
  } else {
    popup.style.top = `${rect.bottom + 10}px`;
    popup.style.right = `${Math.max(16, window.innerWidth - rect.right - 10)}px`;
    popup.style.left = "auto";
  }
  popup.classList.remove("hidden");
}

// 8. Modals
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal-overlay]") || e.target.classList.contains("modal-overlay-bg")) {
    const modal = e.target.closest("[id$='modal']") || e.target;
    if (modal && modal.id) closeModal(modal.id);
  }
});

// 9. Toast Notifications
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const isErr = type === "error" || type === "danger";
  toast.className = `pointer-events-auto flex items-center gap-2 rounded-2xl border ${isErr ? 'border-destructive/40 bg-card/95 text-destructive' : 'border-primary/40 bg-card/95 text-foreground'} px-5 py-3 text-sm font-semibold shadow-[var(--shadow-elevated)] backdrop-blur-md transition-all duration-300 translate-y-3 opacity-0`;
  toast.innerHTML = `
    <svg class="h-4 w-4 shrink-0 ${isErr ? 'text-destructive' : 'text-primary'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-3", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-3", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// 10. Sign-Up Dialog & Helpers
const typeStyles = {
  "MČR": "bg-coral/20 text-coral",
  "Pohár": "bg-primary/20 text-primary",
  "Krajský": "bg-secondary text-secondary-foreground",
  "Oddílový": "bg-chart-4/20 text-foreground",
  "Soustředění": "bg-primary/15 text-primary"
};

function formatCzDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" });
}

function daysUntil(iso) {
  if (!iso) return 0;
  const target = new Date(iso + "T00:00:00").getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86400000);
}

function isClosed(event) {
  return daysUntil(event.deadline) < 0;
}

let activeEventForSignup = null;
let selectedDisciplines = [];

function initSignUpModal() {
  let modal = document.getElementById("signup-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "signup-modal";
    modal.className = "fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 hidden transition-all duration-200";
    modal.setAttribute("data-modal-overlay", "true");
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black/70 backdrop-blur-md modal-overlay-bg"></div>
      <div class="relative w-full max-w-lg rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-[var(--shadow-elevated)] backdrop-blur-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between gap-4 border-b border-border/40 pb-4">
          <div>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-0.5 text-xs font-semibold text-primary">
              Přihláška na závody
            </span>
            <h3 id="signup-modal-title" class="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl"></h3>
            <p id="signup-modal-desc" class="mt-1 text-xs sm:text-sm text-muted-foreground"></p>
          </div>
          <button type="button" onclick="closeModal('signup-modal')" class="h-8 w-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer" aria-label="Zavřít">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form id="signup-form" class="mt-5 space-y-5">
          <div id="signup-disciplines-container"></div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Poznámka k přihlášce (nepovinné)
            </label>
            <textarea
              name="note"
              rows="2"
              placeholder="Např. pouze dopolední blok, zajištěn vlastní odvoz..."
              class="w-full rounded-2xl border border-border/70 bg-background/80 p-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground resize-none"
            ></textarea>
          </div>

          <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/40">
            <button
              type="button"
              id="signup-cancel-btn"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-5 py-2.5 text-xs font-semibold text-destructive transition hover:bg-destructive hover:text-white cursor-pointer"
            >
              Zrušit přihlášku
            </button>
            <div class="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <button
                type="button"
                onclick="closeModal('signup-modal')"
                class="w-full sm:w-auto rounded-full border border-border/70 px-5 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                Zavřít
              </button>
              <button
                type="submit"
                id="signup-submit-btn"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--glow-aqua)] transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Potvrdit přihlášku
              </button>
            </div>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay-bg")) {
        closeModal("signup-modal");
      }
    });

    const form = modal.querySelector("#signup-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!activeEventForSignup) return;

        const note = form.querySelector("textarea[name='note']").value;
        const submitBtn = document.getElementById("signup-submit-btn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"/></svg> Ukládám…`;
        }

        setTimeout(() => {
          const storeObj = window.BohStore || window.KlokaniStore;
          if (storeObj) storeObj.saveSignup(activeEventForSignup.id, selectedDisciplines, note);
          closeModal("signup-modal");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Potvrdit přihlášku`;
          }
          showToast(`Přihláška na ${activeEventForSignup.name} byla uložena!`);
          if (typeof window.renderEventsList === "function") window.renderEventsList();
          if (typeof window.onSignupUpdated === "function") window.onSignupUpdated();
        }, 400);
      });
    }

    const cancelBtn = modal.querySelector("#signup-cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        if (activeEventForSignup && confirm("Opravdu si přejete zrušit přihlášku?")) {
          const storeObj = window.BohStore || window.KlokaniStore;
          if (storeObj) storeObj.cancelSignup(activeEventForSignup.id);
          closeModal("signup-modal");
          showToast("Přihláška byla zrušena.", "info");
          if (typeof window.renderEventsList === "function") window.renderEventsList();
          if (typeof window.onSignupUpdated === "function") window.onSignupUpdated();
        }
      });
    }
  }
}

function openSignUpDialog(eventId, accent = "primary") {
  initSignUpModal();
  const storeObj = window.BohStore || window.KlokaniStore;
  const dataObj = window.BohData || window.KlokaniData;
  const allEvents = storeObj ? storeObj.getEvents() : ((dataObj && dataObj.events) || []);
  const event = allEvents.find(ev => ev.id === eventId);
  if (!event) return;

  activeEventForSignup = event;
  const modal = document.getElementById("signup-modal");
  if (!modal) return;

  const titleEl = document.getElementById("signup-modal-title");
  const descEl = document.getElementById("signup-modal-desc");
  if (titleEl) titleEl.textContent = event.name;
  if (descEl) descEl.textContent = `${event.place} · ${formatCzDate(event.date)} · přihlášky do ${formatCzDate(event.deadline)}`;

  const existing = storeObj ? storeObj.getSignups()[event.id] : null;
  selectedDisciplines = existing && existing.disciplines ? [...existing.disciplines] : [];

  const noteArea = modal.querySelector("textarea[name='note']");
  if (noteArea) noteArea.value = existing ? (existing.note || "") : "";

  const cancelBtn = document.getElementById("signup-cancel-btn");
  if (cancelBtn) {
    cancelBtn.style.display = existing ? "inline-flex" : "none";
  }

  const submitBtn = document.getElementById("signup-submit-btn");
  if (submitBtn) {
    submitBtn.innerHTML = existing
      ? `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Uložit změny`
      : `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Potvrdit přihlášku`;
  }

  const discContainer = document.getElementById("signup-disciplines-container");
  if (discContainer) {
    if (!event.disciplines || event.disciplines.length === 0) {
      discContainer.innerHTML = `<p class="text-sm text-muted-foreground">${escapeHtml(event.note || "Rezervace místa na akci — disciplíny se nevybírají.")}</p>`;
    } else {
      let html = `<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Disciplíny</p>`;
      html += `<div class="flex flex-wrap gap-2" id="signup-disc-pills">`;
      event.disciplines.forEach(d => {
        const on = selectedDisciplines.includes(d);
        const cls = on
          ? "border-primary bg-primary/20 text-primary font-semibold shadow-[0_0_12px_rgba(0,186,96,0.2)] cursor-pointer"
          : "border-border/70 text-muted-foreground hover:border-foreground/40 hover:text-foreground cursor-pointer";
        html += `<button type="button" data-disc="${d}" class="rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${cls}">${d}</button>`;
      });
      html += `</div>`;
      discContainer.innerHTML = html;

      // Bind click handlers for pills
      discContainer.querySelectorAll("#signup-disc-pills button").forEach(btn => {
        btn.addEventListener("click", () => {
          const d = btn.getAttribute("data-disc");
          const idx = selectedDisciplines.indexOf(d);
          if (idx > -1) {
            selectedDisciplines.splice(idx, 1);
            btn.className = "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 border-border/70 text-muted-foreground hover:border-foreground/40 hover:text-foreground cursor-pointer";
          } else {
            selectedDisciplines.push(d);
            btn.className = "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 border-primary bg-primary/20 text-primary shadow-[0_0_12px_rgba(0,186,96,0.2)] cursor-pointer";
          }
          if (submitBtn) {
            submitBtn.disabled = event.disciplines.length > 0 && selectedDisciplines.length === 0;
          }
        });
      });
    }
  }

  if (submitBtn) {
    submitBtn.disabled = event.disciplines && event.disciplines.length > 0 && selectedDisciplines.length === 0;
  }

  openModal("signup-modal");
}

// 12. Security & Sanitization (OWASP Hardening)
function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`/g, "&#96;");
}

function safeUrl(rawUrl, defaultFallback = "index.html") {
  if (!rawUrl || typeof rawUrl !== "string") return defaultFallback;
  const cleaned = rawUrl.replace(/[\x00-\x1F\x7F]/g, "").trim();
  if (!cleaned) return defaultFallback;
  if (/^(javascript|data|vbscript|file):/i.test(cleaned)) return defaultFallback;
  if (cleaned.startsWith("//")) return defaultFallback;
  if (cleaned.startsWith("#") || cleaned.startsWith("?")) return cleaned;

  try {
    const origin = (typeof window !== "undefined" && window.location && window.location.origin) ? window.location.origin : "http://localhost:8080";
    const parsed = new URL(cleaned, origin);
    if (parsed.origin !== origin) {
      const allowedDomains = ["boh.cz", "kurzy.boh.cz", "vysledky.boh.cz", "czechswimming.cz", "instagram.com"];
      const isAllowed = allowedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith("." + d));
      if (!isAllowed) return defaultFallback;
      return parsed.href;
    }
    const path = parsed.pathname.replace(/^\//, "") + parsed.search + parsed.hash;
    return path || defaultFallback;
  } catch (e) {
    if (/^[a-zA-Z0-9_\-\.\/]+(#.*)?$/.test(cleaned)) return cleaned;
    return defaultFallback;
  }
}

function sanitizeCsv(val) {
  if (val == null) return "";
  const str = String(val).trim();
  if (/^[=+\-@\t\r%]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function escapeXml(val) {
  if (val == null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

window.escapeHtml = escapeHtml;
window.safeUrl = safeUrl;
window.sanitizeCsv = sanitizeCsv;
window.escapeXml = escapeXml;
window.BohSecurity = { escapeHtml, safeUrl, sanitizeCsv, escapeXml };

// 13. PWA Offline Service Worker Registration
function initServiceWorker() {
  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
}
