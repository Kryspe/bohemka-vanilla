/* TJ Bohemians Praha - nový design (koncept). Čisté JS, bez knihoven. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document.documentElement;

  /* hlavička: průhledná nad hero, po rolování plná */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobilní menu */
  var btn = document.getElementById("menu-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", String(open));
    });
    document.getElementById("main-nav").addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        document.body.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* zjevení prvků při rolování */
  var items = document.querySelectorAll(".reveal");
  if (items.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      items.forEach(function (n) { io.observe(n); });
    }
  }

  /* odpočet do nejbližšího závodu: počítá se v prohlížeči, takže ani statický náhled nezastará */
  var cd = document.querySelector(".next-count[data-date]");
  if (cd) {
    var parts = cd.getAttribute("data-date").split("-");
    var target = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var now = new Date();
    var days = Math.max(0, Math.round((target - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000));
    cd.querySelector("strong").textContent = String(days);
    cd.querySelector("span").textContent = (days === 1 ? "den" : (days >= 2 && days <= 4 ? "dny" : "dní")) + " do startu";
  }

  /* počítání čísel */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target) || reduce) return;
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (n) { co.observe(n); });
  }

  /* světlo v hero sleduje kurzor */
  var hero = document.querySelector(".hero");
  if (hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
    var raf = 0;
    hero.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
        hero.style.setProperty("--my", (e.clientY - r.top) + "px");
        raf = 0;
      });
    });
  }

  /* rychlé hledání v tabulkách (bez nutnosti odesílat formulář) */
  document.querySelectorAll("input[data-filter]").forEach(function (input) {
    var rows = document.querySelectorAll(input.getAttribute("data-filter"));
    input.addEventListener("input", function () {
      var q = input.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
      rows.forEach(function (r) {
        var t = r.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        r.hidden = q !== "" && t.indexOf(q) === -1;
      });
    });
  });

  doc.classList.add("ready");
})();
