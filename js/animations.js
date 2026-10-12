/**
 * Klokani — Animations & Micro-Interactions
 * Powered by Anime.js (https://animejs.com/) and inspired by React Bits (https://github.com/DavidHDev/react-bits)
 *
 * Micro-interactions:
 * 1. CountUp: Smooth numeric easing on stats and counters.
 * 2. SplitText: Subtle typography reveal with word stagger.
 * 3. SpotlightCard: Radial flashlight cursor hover on cards.
 * 4. MagnetButton: Elastic cursor attraction and spring release.
 * 5. InfolistekModal: Animated athletic modal dialog for parent instructions.
 * 6. SubdomainTabs: Category filter for subdomains ecosystem.
 * 7. MobileNavDrawer: Slide-up drawer for mobile devices.
 */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    initCountUp();
    initSplitText();
    initSpotlightCards();
    initMagnetButtons();
    initInfolistekModals();
    initSubdomainTabs();
    initMobileNavDrawer();
  });

  // =========================================================================
  // 1. React Bits CountUp (Anime.js)
  // =========================================================================
  function initCountUp() {
    const targets = document.querySelectorAll("[data-countup], .stat-number");
    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => {
        const rawTarget = el.getAttribute("data-countup") || el.textContent.trim();
        const targetNum = parseInt(rawTarget, 10);
        if (isNaN(targetNum)) return;
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        el.textContent = `${prefix}${targetNum}${suffix}`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            observer.unobserve(el);

            const rawTarget = el.getAttribute("data-countup") || el.textContent.trim();
            const targetNum = parseInt(rawTarget, 10);
            if (isNaN(targetNum)) return;

            const prefix = el.getAttribute("data-prefix") || "";
            const suffix = el.getAttribute("data-suffix") || "";

            if (typeof anime !== "undefined") {
              const counter = { val: 0 };
              anime({
                targets: counter,
                val: targetNum,
                round: 1,
                easing: "easeOutExpo",
                duration: 1800,
                update: () => {
                  el.textContent = `${prefix}${counter.val}${suffix}`;
                }
              });
            } else {
              el.textContent = `${prefix}${targetNum}${suffix}`;
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }
  window.initCountUp = initCountUp;

  // =========================================================================
  // 2. React Bits SplitText / Heading Stagger (Anime.js)
  // =========================================================================
  function initSplitText() {
    const headings = document.querySelectorAll(".split-reveal");
    if (!headings.length) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    headings.forEach((heading) => {
      if (heading.dataset.splitDone) return;
      heading.dataset.splitDone = "true";

      if (prefersReducedMotion) {
        return; // Keep natural rendering without opacity animation
      }

      const text = heading.textContent.trim();
      const words = text.split(/\s+/);
      if (!words.length || (words.length === 1 && !words[0])) return;

      heading.innerHTML = words
        .map(
          (w) =>
            `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="split-word inline-block translate-y-4 opacity-0">${w}</span></span>`
        )
        .join("");

      const wordSpans = heading.querySelectorAll(".split-word");

      if (typeof IntersectionObserver === "undefined") {
        wordSpans.forEach((w) => {
          w.style.opacity = "1";
          w.style.transform = "none";
        });
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              if (typeof anime !== "undefined") {
                anime({
                  targets: wordSpans,
                  opacity: [0, 1],
                  translateY: [16, 0],
                  delay: anime.stagger(45, { start: 80 }),
                  easing: "easeOutCubic",
                  duration: 600
                });
              } else {
                wordSpans.forEach((w) => {
                  w.style.opacity = "1";
                  w.style.transform = "none";
                });
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(heading);
    });
  }
  window.initSplitText = initSplitText;

  // =========================================================================
  // 3. React Bits Spotlight Card (Interactive Radial Hover)
  // =========================================================================
  function initSpotlightCards() {
    if (!window._spotlightDelegated) {
      window._spotlightDelegated = true;
      document.addEventListener("pointermove", (e) => {
        const card = e.target && e.target.closest && e.target.closest(".spotlight-card, [data-spotlight]");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }, { passive: true });

      document.addEventListener("pointerout", (e) => {
        const card = e.target && e.target.closest && e.target.closest(".spotlight-card, [data-spotlight]");
        if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
          card.style.setProperty("--mouse-x", "-999px");
          card.style.setProperty("--mouse-y", "-999px");
        }
      }, { passive: true });
    }
  }
  window.initSpotlightCards = initSpotlightCards;

  // =========================================================================
  // 4. React Bits Magnet Button (Anime.js Elastic Spring)
  // =========================================================================
  function initMagnetButtons() {
    const magnets = document.querySelectorAll(".magnet-btn");
    if (!magnets.length) return;

    magnets.forEach((btn) => {
      if (btn.dataset.magnetInit) return;
      btn.dataset.magnetInit = "true";

      btn.addEventListener("mousemove", (e) => {
        btn.classList.add("is-hovered");
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        const moveX = relX * 0.22;
        const moveY = relY * 0.22;

        if (typeof anime !== "undefined") {
          anime.remove(btn);
        }
        btn.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.classList.remove("is-hovered");
        if (typeof anime !== "undefined") {
          anime({
            targets: btn,
            translateX: 0,
            translateY: 0,
            easing: "easeOutElastic(1, .6)",
            duration: 650,
            complete: () => {
              btn.style.transform = "";
            }
          });
        } else {
          btn.style.transform = "";
        }
      });
    });
  }
  window.initMagnetButtons = initMagnetButtons;

  // =========================================================================
  // 5. Infolístek Modal Dialog
  // =========================================================================
  function initInfolistekModals() {
    let modal = document.getElementById("infolistek-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "infolistek-modal";
      modal.className =
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md hidden";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-primary/40 bg-card p-6 sm:p-8 shadow-2xl transition-all" id="infolistek-card">
          <button type="button" aria-label="Zavřít" class="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" onclick="window.closeInfolistekModal()">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div id="infolistek-modal-content"></div>
        </div>
      `;

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          window.closeInfolistekModal();
        }
      });

      document.body.appendChild(modal);
    }

    // Escape key handler
    if (!window._infolistekEscBound) {
      window._infolistekEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          window.closeInfolistekModal();
        }
      });
    }
  }

  window.openInfolistekModal = function (infoId) {
    initInfolistekModals();
    const list = window.KlokaniData ? window.KlokaniData.infolistky : [];
    const item = (list && list.find((i) => i.id === infoId)) || (list && list[0]);
    if (!item) return;

    const modal = document.getElementById("infolistek-modal");
    const container = document.getElementById("infolistek-modal-content");
    const card = document.getElementById("infolistek-card");
    if (!modal || !container || !card) return;

    container.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <span class="inline-block h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        Oficiální zelený infolístek pro rodiče • ${item.date}
      </div>
      <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">${item.title}</h2>
      <p class="mt-1 text-sm font-semibold text-muted-foreground">${item.meetDate} • ${item.pool}</p>

      <div class="mt-6 space-y-4 text-sm leading-relaxed text-foreground">
        <div class="rounded-2xl border border-border/80 bg-background/60 p-4">
          <strong class="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Doprava & Sraz</strong>
          <p>${item.transport}</p>
        </div>

        <div class="rounded-2xl border border-border/80 bg-background/60 p-4">
          <strong class="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Harmonogram & Rozplavání</strong>
          <p>${item.schedule}</p>
        </div>

        <div class="rounded-2xl border border-border/80 bg-background/60 p-4">
          <strong class="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Vybavení plavce</strong>
          <p>${item.gear}</p>
        </div>

        <div class="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <strong class="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Trenérský doprovod</strong>
          <p class="font-medium">${item.coaches}</p>
          <p class="mt-2 text-xs text-muted-foreground">${item.notes}</p>
        </div>
      </div>

      <div class="mt-8 flex flex-wrap gap-3 justify-end border-t border-border pt-4">
        <a href="zavody.html" class="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-muted">
          Kalendář závodů
        </a>
        <a href="intranet.html" class="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Přihlásit přes Intranet
        </a>
      </div>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (typeof anime !== "undefined") {
      anime({
        targets: card,
        scale: [0.92, 1],
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 320,
        easing: "easeOutCubic"
      });
    }
  };

  window.closeInfolistekModal = function () {
    const modal = document.getElementById("infolistek-modal");
    const card = document.getElementById("infolistek-card");
    if (!modal || modal.classList.contains("hidden")) return;

    if (typeof anime !== "undefined" && card) {
      anime({
        targets: card,
        scale: [1, 0.94],
        opacity: [1, 0],
        duration: 200,
        easing: "easeInCubic",
        complete: () => {
          modal.classList.add("hidden");
          document.body.style.overflow = "";
        }
      });
    } else {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  // =========================================================================
  // 6. Subdomain Tabs / Filter
  // =========================================================================
  function initSubdomainTabs() {
    const filterBtns = document.querySelectorAll("[data-subdomain-filter]");
    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-subdomain-filter");
        filterBtns.forEach((b) => {
          b.className =
            "rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-all";
        });
        btn.className =
          "rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-all";

        const cards = document.querySelectorAll("[data-subdomain-card]");
        const shownCards = [];

        cards.forEach((card) => {
          const cat = card.getAttribute("data-subdomain-card");
          const shouldShow = filter === "all" || cat === filter;
          if (shouldShow) {
            card.style.display = "flex";
            shownCards.push(card);
          } else {
            card.style.display = "none";
          }
        });

        if (typeof anime !== "undefined" && shownCards.length) {
          anime({
            targets: shownCards,
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(40),
            duration: 350,
            easing: "easeOutQuad"
          });
        }
      });
    });
  }
  window.initSubdomainTabs = initSubdomainTabs;

  // =========================================================================
  // 7. Mobile Navigation Drawer (Anime.js Spring physics)
  // =========================================================================
  function initMobileNavDrawer() {
    const drawerOverlay = document.getElementById("drawer-overlay");
    const drawerContent = document.getElementById("drawer-content");
    const moreBtn = document.getElementById("bottom-nav-more");
    const closeBtn = document.getElementById("drawer-close-btn");

    if (!drawerOverlay || !drawerContent || !moreBtn) return;

    const openDrawer = () => {
      drawerOverlay.classList.remove("hidden");
      drawerContent.classList.remove("hidden");

      if (typeof anime !== "undefined") {
        anime({
          targets: drawerOverlay,
          opacity: [0, 1],
          duration: 250,
          easing: "easeOutQuad"
        });
        anime({
          targets: drawerContent,
          translateY: ["100%", "0%"],
          duration: 380,
          easing: "easeOutCubic"
        });
      } else {
        drawerContent.classList.remove("translate-y-full");
      }
      document.body.style.overflow = "hidden";
    };

    const closeDrawer = () => {
      if (typeof anime !== "undefined") {
        anime({
          targets: drawerOverlay,
          opacity: [1, 0],
          duration: 200,
          easing: "easeInQuad"
        });
        anime({
          targets: drawerContent,
          translateY: ["0%", "100%"],
          duration: 250,
          easing: "easeInCubic",
          complete: () => {
            drawerOverlay.classList.add("hidden");
            drawerContent.classList.add("hidden");
            document.body.style.overflow = "";
          }
        });
      } else {
        drawerOverlay.classList.add("hidden");
        drawerContent.classList.add("translate-y-full");
        document.body.style.overflow = "";
      }
    };

    moreBtn.addEventListener("click", openDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    drawerContent.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawerOverlay.classList.contains("hidden")) {
        closeDrawer();
      }
    });
  }
  window.initMobileNavDrawer = initMobileNavDrawer;
})();
