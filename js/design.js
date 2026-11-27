/* TJ Bohemians Praha - kostra a pohyb webu.
   Obsah je vždy viditelný (žádné odkrývání při rolování); jediný autorský moment je náběh úvodní fotky a nadpisu (CSS).
   Tady: skleněná hlavička po rolování, časomíra (window.dBoard) a jemný paralax fotek na počítači. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  var hdr = document.getElementById("site-header");
  var hero = reduce ? null : document.querySelector(".h-hero-img");
  var snaps = reduce ? [] : Array.prototype.slice.call(document.querySelectorAll(".h-snap"));
  var ticking = false;

  // jeden snímek na rolování: nejdřív všechna čtení, potom zápisy (žádné vynucené přepočítání rozvržení)
  function frame() {
    ticking = false;
    var y = Math.max(0, window.scrollY), vh = window.innerHeight, wide = window.innerWidth >= 1024;
    var rects = wide ? snaps.map(function (el) { return el.parentElement.getBoundingClientRect(); }) : null;
    if (hdr) hdr.classList.toggle("d-scrolled", y > 40);
    if (hero && wide && y < vh * 1.2) hero.style.setProperty("--hp", (y * 0.18).toFixed(1) + "px");
    if (rects) {
      snaps.forEach(function (el, i) {
        var r = rects[i];
        if (r.bottom < -200 || r.top > vh + 200) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", (k * (i % 2 ? -56 : 40)).toFixed(1) + "px");
      });
    }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();
})();
