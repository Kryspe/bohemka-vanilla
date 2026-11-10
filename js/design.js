/* TJ Bohemians Praha - nový design. Animace a drobná interaktivita. Čisté JS, bez knihoven. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* hlavička: po rolování o něco plnější */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (header) header.classList.toggle("d-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* zjevení prvků při rolování (prvky vzniklé později se přidají přes window.dReveal) */
  var io = null;
  function reveal(root) {
    var list = (root || document).querySelectorAll(".d-reveal:not(.d-in)");
    if (!list.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      list.forEach(function (n) { n.classList.add("d-in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("d-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    list.forEach(function (n) { io.observe(n); });
  }
  window.dReveal = reveal;

  /* počítání čísel */
  var co = null;
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target) || reduce) return;
    var start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  function counters(root) {
    var list = (root || document).querySelectorAll("[data-count]");
    if (!list.length || !("IntersectionObserver" in window)) return;
    if (!co) {
      co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); }
        });
      }, { threshold: 0.6 });
    }
    list.forEach(function (n) { co.observe(n); });
  }
  window.dCounters = counters;

  /* světlo v hero sleduje kurzor */
  var hero = document.querySelector(".d-hero");
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

  document.addEventListener("DOMContentLoaded", function () {
    reveal();
    counters();
  });
})();
