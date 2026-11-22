/* TJ Bohemians Praha - jediný pohyb na webu: časomíra jednou odpočítá k počtu dní do nejbližšího závodu. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hdr = document.getElementById("site-header");
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle("d-scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.dBoard = function (el) {
    if (!el || el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseInt(el.getAttribute("data-board"), 10);
    if (isNaN(target) || reduce) return;
    var from = Math.max(target + 20, 30), start = null, dur = 900;
    function pad(n) { return String(n).padStart(2, "0"); }
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = pad(Math.round(from - (from - target) * eased));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
})();

/* Pohyb v duchu oceněných webů: odkrývání při rolování, jemný paralax fotek. Vypíná se při prefers-reduced-motion. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var SEL = ".h-sec-head, .h-row, .h-notices li, .h-table, .h-cols > div, .h-path > div, .h-partners, .s-row, .s-list > *, .page-hero h1, .page-hero p, .g-album, .h-hist-text, .h-board-in, .d-foot-grid";
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px 120px 0px", threshold: 0 }) : null;
  function mark() {
    if (!io) return;
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.dataset.rv) return;
      el.dataset.rv = "1";
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--d", Math.min(sibs, 5) * 0.07 + "s");
      el.classList.add("rv");
      io.observe(el);
    });
  }
  var t;
  function later() { clearTimeout(t); t = setTimeout(mark, 60); }
  document.addEventListener("DOMContentLoaded", mark);
  if (document.readyState !== "loading") mark();
  var main = document.querySelector("main");
  if (main && window.MutationObserver) new MutationObserver(later).observe(main, { childList: true, subtree: true });

  // paralax: úvodní fotka a rozházené fotky v historii
  var hero = document.querySelector(".h-hero-img");
  var snaps = Array.prototype.slice.call(document.querySelectorAll(".h-snap"));
  var ticking = false;
  function frame() {
    ticking = false;
    var y = Math.max(0, window.scrollY), vh = window.innerHeight;
    if (hero && y < vh * 1.2) hero.style.setProperty("--hp", (y * 0.22).toFixed(1) + "px");
    if (snaps.length && window.innerWidth >= 1024) {
      snaps.forEach(function (el, i) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", (k * (i % 2 ? -70 : 50)).toFixed(1) + "px");
      });
    }
  }
  // pojistka: rychlé rolování nikdy nenechá obsah skrytý
  var sf;
  function sweep() {
    var vh = window.innerHeight;
    document.querySelectorAll(".rv:not(.is-in)").forEach(function (el) {
      if (el.getBoundingClientRect().top < vh + 60) { el.classList.add("is-in"); if (io) io.unobserve(el); }
    });
  }
  window.addEventListener("scroll", function () { clearTimeout(sf); sf = setTimeout(sweep, 120); }, { passive: true });
  setTimeout(sweep, 1200);
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();
