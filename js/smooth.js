/* TJ Bohemians Praha - plynulé, zpomalené rolování (kolečko myši a touchpad) s dojezdem.
   Jen na počítači s myší; na dotykových zařízeních a při prefers-reduced-motion zůstává nativní rolování.
   Vnořené rolovací oblasti, otevřené dialogy (body overflow hidden), klávesnice a tažení posuvníku zůstávají nativní. */
(function () {
  "use strict";
  var mq = window.matchMedia;
  if (!mq) return;
  if (mq("(prefers-reduced-motion: reduce)").matches) return;
  if (!mq("(hover: hover) and (pointer: fine)").matches) return;

  var root = document.documentElement;
  var target = window.scrollY, current = target, running = false, last = 0;
  var EASE = 0.14;         // menší = pomalejší dojezd
  var SPEED = 1;           // násobek posunu kolečka

  function max() { return Math.max(0, root.scrollHeight - window.innerHeight); }
  function clamp(v) { return Math.min(max(), Math.max(0, v)); }
  function locked() { return document.body && document.body.style.overflow === "hidden"; }

  // může prvek (nebo jeho předek) sám rolovat daným směrem? Pak necháme kolečko nativní.
  function innerScrollable(el, dy) {
    while (el && el !== document.body && el !== root) {
      if (el.nodeType === 1) {
        if (el.hasAttribute("data-lenis-prevent") || el.hasAttribute("data-no-smooth")) return true;
        var cs = getComputedStyle(el);
        var oy = cs.overflowY;
        if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
          if (dy < 0 && el.scrollTop > 0) return true;
          if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
        }
      }
      el = el.parentNode;
    }
    return false;
  }

  function tick(ts) {
    var dt = Math.min(48, ts - last || 16);
    last = ts;
    var k = 1 - Math.pow(1 - EASE, dt / 16.67);   // stejná rychlost při 60 i 144 Hz
    current += (target - current) * k;
    if (Math.abs(target - current) < 0.4) { current = target; running = false; window.scrollTo(0, current); return; }
    window.scrollTo(0, current);
    requestAnimationFrame(tick);
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); } }

  function onWheel(e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey) return;        // zoom stránky
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;            // vodorovné gesto
    if (locked()) return;
    if (innerScrollable(e.target, e.deltaY)) return;
    var dy = e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1);
    e.preventDefault();
    if (!running) { target = window.scrollY; current = target; }
    target = clamp(target + dy * SPEED);
    start();
  }

  // nativní posun (klávesnice, posuvník, kotvy) srovná cíl, aby se rolování nepřetahovalo
  window.addEventListener("scroll", function () {
    if (!running) { target = current = window.scrollY; }
  }, { passive: true });
  window.addEventListener("resize", function () { target = clamp(target); }, { passive: true });

  // kotvy na stránce: plynulý dojezd vlastním pohybem
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var header = document.getElementById("site-header");
    var off = header ? header.getBoundingClientRect().height + 12 : 0;
    target = clamp(el.getBoundingClientRect().top + window.scrollY - off);
    current = window.scrollY;
    start();
    if (history.pushState) history.pushState(null, "", "#" + id);
  });

  root.classList.add("has-smooth");
  window.addEventListener("wheel", onWheel, { passive: false });
})();
