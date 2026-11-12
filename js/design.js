/* TJ Bohemians Praha - jediný pohyb na webu: časomíra jednou odpočítá k počtu dní do nejbližšího závodu. */
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
})();
