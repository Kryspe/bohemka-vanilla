/**
 * Klokani — Main Application JavaScript
 * Handles navigation, theme toggle, mobile drawer, modals, and toasts.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  highlightActiveNav();
  initSignUpModal();
  initScrollReveal();
});

// 1. Theme Toggle & Mobile Status Bar Color
function initTheme() {
  const THEME_KEY = "klokani-theme";
  const stored = localStorage.getItem(THEME_KEY);

  if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeMeta();

  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      updateThemeIcons();
      updateThemeMeta();
    });
  });
  updateThemeIcons();
}

function updateThemeMeta() {
  const isDark = document.documentElement.classList.contains("dark");
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", isDark ? "#030705" : "#fbfdfc");
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains("dark");
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.innerHTML = isDark
      ? `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
      : `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    btn.setAttribute("title", isDark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim");
  });
}

// Scroll Reveal (1:1 with React Framer Motion Reveal component)
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".reveal, [data-reveal], .group, main section > div.grid > *, main section > div > ol > li, figure, #home-groups-cards > div, #home-news-cards > a"
  );
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -25px 0px"
  });

  elements.forEach((el, index) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
    }
    const stagger = (index % 6) * 45;
    el.style.transitionDelay = `${stagger}ms`;
    observer.observe(el);
  });
}
window.initScrollReveal = initScrollReveal;

// 2. Active Link Highlight
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("header nav a.nav-item").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const target = href.split("/").pop();
    if (target === currentPath || (currentPath === "" && target === "index.html")) {
      link.className = "nav-item group relative rounded-full border border-primary/70 text-primary bg-primary/10 shadow-[0_8px_20px_-12px_var(--color-primary)] px-3.5 py-1.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5";
    } else {
      link.className = "nav-item group relative rounded-full border border-border/60 px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:text-foreground hover:shadow-[0_8px_20px_-12px_var(--color-primary)]";
    }
  });
}

// 3. Mobile Navigation Drawer
function initMobileNav() {
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerContent = document.getElementById("drawer-content");
  const moreBtn = document.getElementById("bottom-nav-more");
  const bottomNav = document.getElementById("bottom-nav");

  if (moreBtn && drawerOverlay && drawerContent) {
    moreBtn.addEventListener("click", () => {
      drawerOverlay.classList.remove("hidden");
      drawerContent.classList.remove("translate-y-full");
    });

    const closeDrawer = () => {
      drawerOverlay.classList.add("hidden");
      drawerContent.classList.add("translate-y-full");
    };

    drawerOverlay.addEventListener("click", closeDrawer);
    drawerContent.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
  }

  // Auto-hide bottom nav on scroll down
  if (bottomNav) {
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const curY = window.scrollY;
      const delta = curY - lastY;
      if (curY < 30) {
        bottomNav.style.transform = "translateY(0)";
      } else if (delta > 15) {
        bottomNav.style.transform = "translateY(100%)";
      } else if (delta < -15) {
        bottomNav.style.transform = "translateY(0)";
      }
      lastY = curY;
    }, { passive: true });
  }
}

// 4. Modals
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

// 5. Toast Notifications
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

// 6. Sign-Up Dialog & Helpers
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
  const form = document.getElementById("signup-form");
  if (!form) return;

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
      window.KlokaniStore.saveSignup(activeEventForSignup.id, selectedDisciplines, note);
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

  const cancelBtn = document.getElementById("signup-cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      if (activeEventForSignup && confirm("Opravdu si přejete zrušit přihlášku?")) {
        window.KlokaniStore.cancelSignup(activeEventForSignup.id);
        closeModal("signup-modal");
        showToast("Přihláška byla zrušena.", "info");
        if (typeof window.renderEventsList === "function") window.renderEventsList();
        if (typeof window.onSignupUpdated === "function") window.onSignupUpdated();
      }
    });
  }
}

function openSignUpDialog(eventId, accent = "primary") {
  const event = (window.KlokaniData.events || []).find(ev => ev.id === eventId);
  if (!event) return;

  activeEventForSignup = event;
  const modal = document.getElementById("signup-modal");
  if (!modal) return;

  const titleEl = document.getElementById("signup-modal-title");
  const descEl = document.getElementById("signup-modal-desc");
  if (titleEl) titleEl.textContent = event.name;
  if (descEl) descEl.textContent = `${event.place} · ${formatCzDate(event.date)} · přihlášky do ${formatCzDate(event.deadline)}`;

  const existing = window.KlokaniStore.getSignups()[event.id];
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
      discContainer.innerHTML = `<p class="text-sm text-muted-foreground">${event.note || "Rezervace místa na akci — disciplíny se nevybírají."}</p>`;
    } else {
      let html = `<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Disciplíny</p>`;
      html += `<div class="flex flex-wrap gap-2" id="signup-disc-pills">`;
      event.disciplines.forEach(d => {
        const on = selectedDisciplines.includes(d);
        const cls = on
          ? "border-primary bg-primary/12 text-primary"
          : "border-border/70 text-muted-foreground hover:border-foreground/40 hover:text-foreground";
        html += `<button type="button" data-disc="${d}" class="rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${cls}">${d}</button>`;
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
            btn.className = "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 border-border/70 text-muted-foreground hover:border-foreground/40 hover:text-foreground";
          } else {
            selectedDisciplines.push(d);
            btn.className = "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 border-primary bg-primary/12 text-primary";
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
