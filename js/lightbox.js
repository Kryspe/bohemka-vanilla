/* Prohlížeč fotek (lightbox) pro celý web.
   Samostatný skript, delegované události na document (funguje i na obsahu vykresleném později).
   Styly: css/lightbox.css. Veřejné API: window.BohLightbox.open(imgElement) / close(). */
(function () {
  'use strict';
  if (window.BohLightbox) return;

  var ITEM_SEL = '.g-tile img, .s-article-img img, .h-photos img, .h-strip img, .h-snap, .h-row img, img[data-zoom]';
  var SEL = ITEM_SEL + ', .g-tile button';
  var GROUP_SEL = '[data-zoom-group], .g-album, .s-article, .h-photos, .h-strip, .h-collage, .h-list';
  var MAXZ = 5;
  var DBL_ZOOM = 2.5;

  var S = {
    open: false, closing: false, items: [], i: 0, trigger: null, hidden: null, hiddenVis: '',
    slides: [], cur: null, SW: 0, SH: 0, s: 1, tx: 0, ty: 0, busy: false, pending: 0,
    navTimer: 0, prevOverflow: '', prevPad: '', histPushed: false, skipPop: false, lastTap: null
  };
  var dom = null;

  function reduced() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function dur(ms) { return reduced() ? 0 : ms; }

  /* ---------- zjištění skupiny ---------- */
  function imgOf(el) {
    if (!el) return null;
    if (el.tagName === 'IMG') return el;
    return el.querySelector ? el.querySelector('img') : null;
  }
  function inLink(img) { return !!img.closest('a[href]'); }

  function fullOf(img) {
    var d = img.getAttribute('data-full') || img.getAttribute('data-zoom-src');
    if (d) return d;
    var s = img.currentSrc || img.src || '';
    /* náhledy z boh.cz: small/NAZEV_small.jpg, plná fotka je bez přípony _small */
    return s.replace(/\/small\/([^\/?#]+)_small\.(jpe?g|png)$/i, '/$1.$2');
  }
  function captionOf(img) {
    var fig = img.closest('figure');
    var fc = fig && fig.querySelector('figcaption');
    var t = fc && fc.textContent.trim();
    if (t) return t;
    return (img.getAttribute('alt') || '').trim();
  }

  function collect(img) {
    var list;
    var zv = img.getAttribute('data-zoom');
    var g = img.closest('[data-zoom-group]');
    if (g) list = g.querySelectorAll(ITEM_SEL);
    else if (zv) {
      list = [];
      var all = document.querySelectorAll('img[data-zoom]');
      for (var a = 0; a < all.length; a++) if (all[a].getAttribute('data-zoom') === zv) list.push(all[a]);
    } else {
      g = img.closest(GROUP_SEL);
      list = g ? g.querySelectorAll(ITEM_SEL) : [img];
    }
    var items = [], seen = {}, index = -1;
    for (var k = 0; k < list.length; k++) {
      var im = imgOf(list[k]);
      if (!im || (im !== img && inLink(im))) continue;
      var full = fullOf(im);
      if (!full) continue;
      if (seen[full] !== undefined) {
        if (im === img) index = seen[full];
        continue;
      }
      seen[full] = items.length;
      if (im === img) index = items.length;
      items.push({
        el: im, src: im.currentSrc || im.src, full: full, alt: captionOf(im),
        ar: im.naturalWidth > 0 ? im.naturalWidth / im.naturalHeight : 0,
        thumbOk: im.complete && im.naturalWidth > 0, state: ''
      });
    }
    if (index < 0) {
      items.unshift({ el: img, src: img.currentSrc || img.src, full: fullOf(img), alt: captionOf(img),
        ar: img.naturalWidth > 0 ? img.naturalWidth / img.naturalHeight : 0,
        thumbOk: img.complete && img.naturalWidth > 0, state: '' });
      index = 0;
    }
    return { items: items, index: index };
  }

  /* ---------- DOM ---------- */
  var SVG = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8v6M8 11h6"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M8 11h6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg>'
  };

  function ensureDom() {
    if (dom) return dom;
    var root = document.createElement('div');
    root.className = 'lb';
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Prohlížeč fotografií');
    root.setAttribute('tabindex', '-1');
    root.innerHTML =
      '<div class="lb-bg" data-lb-close></div>' +
      '<div class="lb-top" data-lb-close>' +
        '<span class="lb-count" aria-live="polite"></span>' +
        '<span class="lb-actions">' +
          '<button type="button" class="lb-btn lb-zoom" aria-label="Přiblížit">' + SVG.zoomIn + '</button>' +
          '<a class="lb-btn lb-orig" target="_blank" rel="noopener noreferrer" aria-label="Otevřít originál v nové záložce">' + SVG.ext + '</a>' +
          '<button type="button" class="lb-btn lb-x" aria-label="Zavřít">' + SVG.close + '</button>' +
        '</span>' +
      '</div>' +
      '<div class="lb-mid">' +
        '<div class="lb-stage"><div class="lb-track"></div></div>' +
        '<button type="button" class="lb-btn lb-nav lb-prev" aria-label="Předchozí fotografie">' + SVG.prev + '</button>' +
        '<button type="button" class="lb-btn lb-nav lb-next" aria-label="Další fotografie">' + SVG.next + '</button>' +
      '</div>' +
      '<div class="lb-foot" data-lb-close>' +
        '<p class="lb-cap" hidden></p>' +
        '<div class="lb-film" hidden role="group" aria-label="Náhledy fotografií"></div>' +
      '</div>';
    document.body.appendChild(root);
    dom = {
      root: root,
      count: root.querySelector('.lb-count'),
      zoom: root.querySelector('.lb-zoom'),
      orig: root.querySelector('.lb-orig'),
      x: root.querySelector('.lb-x'),
      stage: root.querySelector('.lb-stage'),
      track: root.querySelector('.lb-track'),
      prev: root.querySelector('.lb-prev'),
      next: root.querySelector('.lb-next'),
      cap: root.querySelector('.lb-cap'),
      film: root.querySelector('.lb-film')
    };
    bind();
    return dom;
  }

  /* ---------- rozložení ---------- */
  function measure() {
    S.SW = dom.stage.clientWidth;
    S.SH = dom.stage.clientHeight;
  }
  function fit(item) {
    var pad = S.SW < 640 ? 8 : 28;
    var aw = Math.max(40, S.SW - pad * 2), ah = Math.max(40, S.SH - pad * 2);
    var ar = item.ar || 4 / 3;
    var w, h;
    if (ar > aw / ah) { w = aw; h = aw / ar; } else { h = ah; w = ah * ar; }
    return { w: w, h: h, x: (S.SW - w) / 2, y: (S.SH - h) / 2 };
  }
  function place(sl) {
    var f = fit(sl.item);
    var st = sl.img.style;
    st.left = f.x + 'px'; st.top = f.y + 'px'; st.width = f.w + 'px'; st.height = f.h + 'px';
    sl.f = f;
  }
  function layoutAll() {
    measure();
    S.slides.forEach(function (sl) { if (sl) place(sl); });
    if (S.cur) { clampPan(); applyZoom(); }
  }

  /* ---------- načítání fotek ---------- */
  function loadFull(item) {
    if (item.state) return;
    item.state = 'loading';
    var im = new Image();
    im.onload = function () {
      item.state = 'ready';
      if (im.naturalWidth > 0) item.ar = im.naturalWidth / im.naturalHeight;
      refresh(item);
    };
    im.onerror = function () {
      item.state = 'error';
      refresh(item);
    };
    im.src = item.full;
  }
  function refresh(item) {
    S.slides.forEach(function (sl) {
      if (!sl || sl.item !== item) return;
      if (item.state === 'ready') {
        if (sl.img.getAttribute('src') !== item.full) sl.img.src = item.full;
        sl.img.classList.add('is-ready');
        sl.node.classList.remove('is-loading');
      } else if (item.state === 'error') {
        sl.node.classList.remove('is-loading');
        if (!item.thumbOk) sl.node.classList.add('is-error');
      }
      place(sl);
    });
    if (S.cur && S.cur.item === item) { clampPan(); applyZoom(); }
  }
  function preload() {
    [0, 1, -1, 2, -2].forEach(function (d, n) {
      var it = S.items[S.i + d];
      if (!it) return;
      if (n < 3) loadFull(it);
      else setTimeout(function () { if (S.open) loadFull(it); }, 600);
    });
  }

  /* ---------- snímky ---------- */
  function makeSlide(item, k) {
    var node = document.createElement('div');
    node.className = 'lb-slide';
    node.style.transform = 'translate3d(' + (k * 100) + '%,0,0)';
    var img = document.createElement('img');
    img.className = 'lb-img';
    img.alt = item.alt || '';
    img.draggable = false;
    img.decoding = 'async';
    if (item.state === 'ready') { img.src = item.full; img.classList.add('is-ready'); }
    else if (item.thumbOk) { img.src = item.src; img.classList.add('is-ready'); }
    else { img.src = item.full; node.classList.add('is-loading'); img.addEventListener('load', function () { img.classList.add('is-ready'); if (!item.ar && img.naturalWidth) { item.ar = img.naturalWidth / img.naturalHeight; place(sl); } }); }
    var spin = document.createElement('span');
    spin.className = 'lb-spin';
    spin.setAttribute('aria-hidden', 'true');
    var err = document.createElement('p');
    err.className = 'lb-err';
    err.textContent = 'Fotografii se nepodařilo načíst.';
    node.appendChild(img); node.appendChild(spin); node.appendChild(err);
    var sl = { item: item, node: node, img: img, f: null, k: k };
    place(sl);
    return sl;
  }
  function rebuild() {
    dom.track.textContent = '';
    S.slides = [];
    for (var k = -1; k <= 1; k++) {
      var it = S.items[S.i + k];
      if (!it) { S.slides.push(null); continue; }
      var sl = makeSlide(it, k);
      S.slides.push(sl);
      dom.track.appendChild(sl.node);
      if (k === 0) S.cur = sl;
    }
    S.s = 1; S.tx = 0; S.ty = 0;
    applyZoom();
  }

  /* ---------- zoom ---------- */
  function applyZoom() {
    if (!S.cur) return;
    S.cur.img.style.transform = 'translate3d(' + S.tx + 'px,' + S.ty + 'px,0) scale(' + S.s + ')';
    dom.root.classList.toggle('is-zoomed', S.s > 1.01);
    var z = S.s > 1.01;
    dom.zoom.innerHTML = z ? SVG.zoomOut : SVG.zoomIn;
    dom.zoom.setAttribute('aria-label', z ? 'Oddálit' : 'Přiblížit');
  }
  function clampPan() {
    if (!S.cur || !S.cur.f) return;
    var f = S.cur.f, vw = f.w * S.s, vh = f.h * S.s;
    if (vw <= S.SW) S.tx = (S.SW - vw) / 2 - f.x;
    else S.tx = Math.min(-f.x, Math.max(S.SW - vw - f.x, S.tx));
    if (vh <= S.SH) S.ty = (S.SH - vh) / 2 - f.y;
    else S.ty = Math.min(-f.y, Math.max(S.SH - vh - f.y, S.ty));
  }
  function zoomAt(px, py, ns, animate) {
    if (!S.cur) return;
    ns = Math.max(1, Math.min(MAXZ, ns));
    var f = S.cur.f;
    var u = (px - f.x - S.tx) / S.s, v = (py - f.y - S.ty) / S.s;
    S.tx = px - f.x - u * ns;
    S.ty = py - f.y - v * ns;
    S.s = ns;
    if (ns <= 1.001) { S.s = 1; S.tx = 0; S.ty = 0; }
    clampPan();
    if (animate && !reduced()) {
      var im = S.cur.img;
      im.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1)';
      setTimeout(function () { im.style.transition = ''; }, 300);
    }
    applyZoom();
  }
  function stagePt(cx, cy) {
    var r = dom.stage.getBoundingClientRect();
    return { x: cx - r.left, y: cy - r.top };
  }
  function toggleZoom(cx, cy) {
    var p = cx === undefined ? { x: S.SW / 2, y: S.SH / 2 } : stagePt(cx, cy);
    zoomAt(p.x, p.y, S.s > 1.01 ? 1 : DBL_ZOOM, true);
  }

  /* ---------- UI stav ---------- */
  function setUi() {
    var n = S.items.length, it = S.items[S.i];
    dom.count.textContent = n > 1 ? (S.i + 1) + ' / ' + n : '';
    dom.count.hidden = n < 2;
    dom.prev.hidden = dom.next.hidden = n < 2;
    dom.prev.disabled = S.i === 0;
    dom.next.disabled = S.i === n - 1;
    dom.orig.href = it.full;
    if (it.alt) { dom.cap.textContent = it.alt; dom.cap.hidden = false; } else { dom.cap.textContent = ''; dom.cap.hidden = true; }
    var f = dom.film.querySelectorAll('button');
    for (var k = 0; k < f.length; k++) {
      var on = k === S.i;
      f[k].classList.toggle('is-on', on);
      if (on) { f[k].setAttribute('aria-current', 'true'); centerThumb(f[k]); } else f[k].removeAttribute('aria-current');
    }
    /* originální náhled skrýt jen u aktuální fotky */
    if (S.hidden && S.hidden !== it.el) { S.hidden.style.visibility = S.hiddenVis; S.hidden = null; }
    if (!S.hidden && it.el && it.el.isConnected) { S.hidden = it.el; S.hiddenVis = it.el.style.visibility; it.el.style.visibility = 'hidden'; }
  }
  function centerThumb(btn) {
    var c = dom.film;
    var left = btn.offsetLeft - (c.clientWidth - btn.offsetWidth) / 2;
    if (c.scrollTo) c.scrollTo({ left: left, behavior: reduced() ? 'auto' : 'smooth' }); else c.scrollLeft = left;
  }
  function buildFilm() {
    dom.film.textContent = '';
    if (S.items.length < 2) { dom.film.hidden = true; return; }
    dom.film.hidden = false;
    S.items.forEach(function (it, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lb-th';
      b.setAttribute('aria-label', 'Fotografie ' + (idx + 1) + ' z ' + S.items.length);
      var im = document.createElement('img');
      im.src = it.src; im.alt = ''; im.loading = 'lazy'; im.draggable = false;
      b.appendChild(im);
      b.addEventListener('click', function () { jump(idx); });
      dom.film.appendChild(b);
    });
  }

  /* ---------- navigace ---------- */
  function finishNav() {
    if (!S.busy) return;
    clearTimeout(S.navTimer);
    S.busy = false;
    S.i = S.pending;
    dom.track.style.transition = 'none';
    dom.track.style.transform = '';
    rebuild();
    setUi();
    preload();
    layoutAll();
  }
  function go(dir) {
    if (!S.open || S.closing) return;
    finishNav();
    var n = S.i + dir;
    if (n < 0 || n >= S.items.length) { bounce(dir); return; }
    if (S.s > 1.01) { S.s = 1; S.tx = 0; S.ty = 0; applyZoom(); }
    S.busy = true;
    S.pending = n;
    var d = dur(300);
    if (d === 0) { finishNav(); return; }
    dom.track.style.transition = 'transform ' + d + 'ms cubic-bezier(.2,.8,.2,1)';
    dom.track.style.transform = 'translate3d(' + (-dir * 100) + '%,0,0)';
    S.navTimer = setTimeout(finishNav, d + 30);
  }
  function bounce(dir) {
    if (reduced()) return;
    var t = dom.track;
    t.style.transition = 'transform .14s ease-out';
    t.style.transform = 'translate3d(' + (-dir * 22) + 'px,0,0)';
    setTimeout(function () {
      t.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1)';
      t.style.transform = '';
      setTimeout(function () { t.style.transition = ''; }, 300);
    }, 140);
  }
  function jump(idx) {
    if (!S.open || idx === S.i || S.closing) return;
    finishNav();
    S.i = idx;
    rebuild(); setUi(); preload(); layoutAll();
    if (!reduced()) {
      S.cur.node.classList.add('lb-fade');
      var nd = S.cur.node;
      setTimeout(function () { nd.classList.remove('lb-fade'); }, 320);
    }
  }

  /* ---------- otevření a zavření ---------- */
  function lockScroll() {
    var b = document.body;
    S.prevOverflow = b.style.overflow;
    S.prevPad = b.style.paddingRight;
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) b.style.paddingRight = sbw + 'px';
    b.style.overflow = 'hidden';
  }
  function unlockScroll() {
    var b = document.body;
    b.style.overflow = S.prevOverflow;
    b.style.paddingRight = S.prevPad;
  }
  function rectVisible(r) {
    return r.width > 2 && r.height > 2 && r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth;
  }
  function flipTransform(tr, sr, f) {
    var s0 = Math.min(tr.width / f.w, tr.height / f.h);
    var cx = tr.left + tr.width / 2 - sr.left, cy = tr.top + tr.height / 2 - sr.top;
    var tx = cx - f.x - f.w * s0 / 2, ty = cy - f.y - f.h * s0 / 2;
    return 'translate3d(' + tx + 'px,' + ty + 'px,0) scale(' + s0 + ')';
  }

  function open(img, trigger) {
    if (S.open) return;
    var c = collect(img);
    if (!c.items.length) return;
    ensureDom();
    S.items = c.items; S.i = c.index;
    S.trigger = trigger || img;
    S.open = true; S.closing = false; S.busy = false;
    lockScroll();
    var root = dom.root;
    root.hidden = false;
    root.classList.remove('lb-in', 'lb-out');
    dom.track.style.cssText = '';
    buildFilm();
    measure();
    rebuild();
    setUi();
    layoutAll();
    preload();

    var item = S.items[S.i];
    var sl = S.cur;
    var tr = item.el.getBoundingClientRect();
    var sr = dom.stage.getBoundingClientRect();
    var doFlip = !reduced() && rectVisible(tr) && item.thumbOk;
    if (doFlip) {
      sl.img.style.transition = 'none';
      sl.img.style.transform = flipTransform(tr, sr, sl.f);
      void sl.img.offsetWidth;
    }
    requestAnimationFrame(function () {
      root.classList.add('lb-in');
      if (doFlip) {
        sl.img.style.transition = 'transform .46s cubic-bezier(.2,.8,.2,1)';
        sl.img.style.transform = 'translate3d(0,0,0) scale(1)';
        setTimeout(function () { sl.img.style.transition = ''; }, 500);
      }
    });
    try { history.pushState({ lb: 1 }, ''); S.histPushed = true; } catch (e) { S.histPushed = false; }
    S.focusT = setTimeout(function () { dom.x.focus({ preventScroll: true }); }, 30);
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('focusin', onFocusIn, true);
    window.addEventListener('resize', layoutAll);
    if (window.ResizeObserver) {
      S.ro = new ResizeObserver(function () { if (S.open) layoutAll(); });
      S.ro.observe(dom.stage);
    }
  }

  function cleanup() {
    clearTimeout(S.navTimer); clearTimeout(S.focusT);
    document.removeEventListener('keydown', onKey, true);
    document.removeEventListener('focusin', onFocusIn, true);
    window.removeEventListener('resize', layoutAll);
    if (S.ro) { S.ro.disconnect(); S.ro = null; }
    if (S.hidden) { S.hidden.style.visibility = S.hiddenVis; S.hidden = null; }
    dom.root.hidden = true;
    dom.root.classList.remove('lb-in', 'lb-out', 'is-zoomed');
    dom.track.textContent = '';
    dom.track.style.cssText = '';
    S.slides = []; S.cur = null; S.items = [];
    unlockScroll();
    S.open = false; S.closing = false; S.busy = false;
    var t = S.trigger;
    S.trigger = null;
    if (t && t.isConnected && t.focus) { try { t.focus({ preventScroll: true }); } catch (e) {} }
  }

  function close(opts) {
    opts = opts || {};
    if (!S.open || S.closing) return;
    finishNav();
    S.closing = true;
    if (S.histPushed && !opts.fromPop) { S.skipPop = true; try { history.back(); } catch (e) { S.skipPop = false; } }
    S.histPushed = false;
    var root = dom.root, sl = S.cur, item = S.items[S.i];
    root.classList.remove('lb-in');
    root.classList.add('lb-out');
    S.slides.forEach(function (x) { if (x && x !== sl) x.node.style.visibility = 'hidden'; });
    var d = dur(opts.fly ? 260 : 400);
    if (d === 0 || !sl) { cleanup(); return; }

    if (opts.fly) {
      dom.track.style.transition = 'transform ' + d + 'ms cubic-bezier(.4,0,.8,.6), opacity ' + d + 'ms';
      dom.track.style.transform = 'translate3d(0,' + Math.round(window.innerHeight * 0.7) + 'px,0) scale(.9)';
      dom.track.style.opacity = '0';
      setTimeout(cleanup, d + 20);
      return;
    }
    /* sdílený prvek: fotka se vrací do místa náhledu */
    dom.track.style.transition = ''; dom.track.style.transform = '';
    if (S.s > 1.01) { S.s = 1; S.tx = 0; S.ty = 0; sl.img.style.transition = 'none'; applyZoom(); void sl.img.offsetWidth; }
    var el = item.el, tr = null;
    if (el && el.isConnected) {
      tr = el.getBoundingClientRect();
      if (!rectVisible(tr)) {
        try { el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' }); } catch (e) {}
        tr = el.getBoundingClientRect();
      }
      if (!rectVisible(tr)) tr = null;
    }
    var sr = dom.stage.getBoundingClientRect();
    sl.img.style.transition = 'transform ' + d + 'ms cubic-bezier(.3,.7,.2,1), opacity ' + d + 'ms';
    if (tr) {
      sl.img.style.transform = flipTransform(tr, sr, sl.f);
      setTimeout(cleanup, d + 20);
    } else {
      sl.img.style.transform = 'translate3d(0,0,0) scale(.94)';
      sl.img.style.opacity = '0';
      setTimeout(cleanup, d + 20);
    }
  }

  /* ---------- klávesnice a fokus ---------- */
  function focusables() {
    var list = dom.root.querySelectorAll('button, a[href]');
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (e.disabled || e.hidden) continue;
      if (e.closest('[hidden]')) continue;
      if (!e.getClientRects().length) continue;
      out.push(e);
    }
    return out;
  }
  function onKey(e) {
    if (!S.open) return;
    var k = e.key, handled = true;
    if (e.altKey || e.metaKey) return;
    if (k === 'Escape') close();
    else if (k === 'ArrowLeft') { if (S.s > 1.01) { S.tx += 60; clampPan(); applyZoom(); } else go(-1); }
    else if (k === 'ArrowRight') { if (S.s > 1.01) { S.tx -= 60; clampPan(); applyZoom(); } else go(1); }
    else if (k === 'ArrowUp' && S.s > 1.01) { S.ty += 60; clampPan(); applyZoom(); }
    else if (k === 'ArrowDown' && S.s > 1.01) { S.ty -= 60; clampPan(); applyZoom(); }
    else if (k === 'Home') jump(0);
    else if (k === 'End') jump(S.items.length - 1);
    else if (k === '+' || k === '=') zoomAt(S.SW / 2, S.SH / 2, S.s * 1.5, true);
    else if (k === '-' || k === '_') zoomAt(S.SW / 2, S.SH / 2, S.s / 1.5, true);
    else if (k === '0') zoomAt(S.SW / 2, S.SH / 2, 1, true);
    else if (k === 'Tab') {
      var f = focusables();
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || !dom.root.contains(a))) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && (a === last || !dom.root.contains(a))) { first.focus(); e.preventDefault(); }
      e.stopPropagation();
      return;
    } else handled = false;
    if (handled) {
      /* Enter/Space na tlačítkách necháváme být; ostatní klávesy dialogu nesmí unikat do stránky */
      e.preventDefault(); e.stopPropagation();
    }
  }
  function onFocusIn(e) {
    if (S.open && !S.closing && !dom.root.contains(e.target)) {
      var f = focusables();
      if (f.length) f[0].focus({ preventScroll: true });
    }
  }

  /* ---------- gesta ---------- */
  var ptrs = {}, gest = null;
  function nPtr() { return Object.keys(ptrs).length; }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function setBgProgress(p) { /* p 0..1, 1 = plně otevřeno */
    dom.root.style.setProperty('--lb-p', String(p));
  }

  function bind() {
    var st = dom.stage, root = dom.root;

    root.addEventListener('click', function (e) {
      var t = e.target;
      if (t.closest('.lb-btn')) return;
      if (t.hasAttribute && t.hasAttribute('data-lb-close')) close();
    });
    dom.x.addEventListener('click', function () { close(); });
    dom.prev.addEventListener('click', function () { go(-1); });
    dom.next.addEventListener('click', function () { go(1); });
    dom.zoom.addEventListener('click', function () { toggleZoom(); });

    st.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (S.busy || S.closing) return;
      var p = stagePt(e.clientX, e.clientY);
      var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      zoomAt(p.x, p.y, S.s * Math.exp(-dy * (e.ctrlKey ? 0.012 : 0.0028)));
    }, { passive: false });

    st.addEventListener('pointerdown', function (e) {
      if (S.busy || S.closing) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      try { st.setPointerCapture(e.pointerId); } catch (x) {}
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      var n = nPtr();
      if (n === 1) {
        gest = { mode: null, sx: e.clientX, sy: e.clientY, t0: performance.now(), lx: e.clientX, ly: e.clientY, lt: performance.now(), vx: 0, vy: 0, tx0: S.tx, ty0: S.ty, dx: 0, dy: 0 };
      } else if (n === 2) {
        var ids = Object.keys(ptrs), a = ptrs[ids[0]], b = ptrs[ids[1]];
        var c = stagePt((a.x + b.x) / 2, (a.y + b.y) / 2);
        var f = S.cur.f;
        resetDragVisual();
        gest = { mode: 'pinch', d0: dist(a, b) || 1, s0: S.s, u: (c.x - f.x - S.tx) / S.s, v: (c.y - f.y - S.ty) / S.s, tapOk: false };
      }
    });

    st.addEventListener('pointermove', function (e) {
      if (!ptrs[e.pointerId] || !gest) return;
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (gest.mode === 'pinch') {
        var ids = Object.keys(ptrs);
        if (ids.length < 2) return;
        var a = ptrs[ids[0]], b = ptrs[ids[1]];
        var ns = Math.max(1, Math.min(MAXZ, gest.s0 * dist(a, b) / gest.d0));
        var c = stagePt((a.x + b.x) / 2, (a.y + b.y) / 2), f = S.cur.f;
        S.s = ns;
        S.tx = c.x - f.x - gest.u * ns;
        S.ty = c.y - f.y - gest.v * ns;
        clampPan(); applyZoom();
        return;
      }
      var now = performance.now();
      var dx = e.clientX - gest.sx, dy = e.clientY - gest.sy;
      var dt = Math.max(1, now - gest.lt);
      gest.vx = 0.7 * gest.vx + 0.3 * ((e.clientX - gest.lx) / dt);
      gest.vy = 0.7 * gest.vy + 0.3 * ((e.clientY - gest.ly) / dt);
      gest.lx = e.clientX; gest.ly = e.clientY; gest.lt = now;
      gest.dx = dx; gest.dy = dy;
      if (!gest.mode) {
        if (Math.hypot(dx, dy) < 8) return;
        if (S.s > 1.01) gest.mode = 'pan';
        else if (Math.abs(dx) > Math.abs(dy)) gest.mode = 'swipe';
        else gest.mode = dy > 0 ? 'down' : 'none';
        dom.root.classList.add('is-drag');
      }
      if (gest.mode === 'pan') {
        S.tx = gest.tx0 + dx; S.ty = gest.ty0 + dy;
        clampPan(); applyZoom();
      } else if (gest.mode === 'swipe') {
        var edge = (S.i === 0 && dx > 0) || (S.i === S.items.length - 1 && dx < 0);
        var x = edge ? dx * 0.28 : dx;
        dom.track.style.transition = 'none';
        dom.track.style.transform = 'translate3d(' + x + 'px,0,0)';
      } else if (gest.mode === 'down') {
        var p = Math.min(1, dy / 420);
        dom.track.style.transition = 'none';
        dom.track.style.transform = 'translate3d(' + dx * 0.4 + 'px,' + dy + 'px,0) scale(' + (1 - p * 0.12) + ')';
        setBgProgress(1 - p * 0.75);
      }
    });

    function end(e) {
      if (!ptrs[e.pointerId]) return;
      var up = e.type === 'pointerup';
      delete ptrs[e.pointerId];
      try { st.releasePointerCapture(e.pointerId); } catch (x) {}
      var g = gest;
      if (!g) return;
      if (g.mode === 'pinch') {
        if (S.s < 1.03) zoomAt(S.SW / 2, S.SH / 2, 1, true);
        var rest = Object.keys(ptrs);
        if (rest.length === 1) {
          var r = ptrs[rest[0]];
          gest = { mode: 'pan', sx: r.x, sy: r.y, t0: 0, lx: r.x, ly: r.y, lt: performance.now(), vx: 0, vy: 0, tx0: S.tx, ty0: S.ty, dx: 0, dy: 0 };
        } else gest = null;
        dom.root.classList.remove('is-drag');
        return;
      }
      if (nPtr() > 0) return;
      gest = null;
      dom.root.classList.remove('is-drag');
      if (!up) { resetDragVisual(true); return; }
      var w = S.SW || 1;
      if (g.mode === 'swipe') {
        var fast = Math.abs(g.vx) > 0.45 && Math.abs(g.dx) > 24;
        if ((Math.abs(g.dx) > w * 0.18 || fast) && ((g.dx < 0 && S.i < S.items.length - 1) || (g.dx > 0 && S.i > 0))) {
          dom.track.style.transition = '';
          go(g.dx < 0 ? 1 : -1);
        } else resetDragVisual(true);
      } else if (g.mode === 'down') {
        if (g.dy > 120 || g.vy > 0.6) close({ fly: true });
        else resetDragVisual(true);
      } else if (g.mode === null) {
        tap(e);
      }
    }
    st.addEventListener('pointerup', end);
    st.addEventListener('pointercancel', end);
    st.addEventListener('lostpointercapture', function (e) { if (ptrs[e.pointerId]) end({ pointerId: e.pointerId, type: 'pointercancel' }); });
    st.addEventListener('dblclick', function (e) { e.preventDefault(); });
    st.addEventListener('contextmenu', function (e) { if (e.target.tagName === 'IMG' && e.pointerType === 'touch') e.preventDefault(); });
  }

  function resetDragVisual(animate) {
    var t = dom.track;
    if (animate && !reduced()) {
      t.style.transition = 'transform .3s cubic-bezier(.2,.8,.2,1)';
      setTimeout(function () { if (!S.busy) t.style.transition = ''; }, 320);
    } else t.style.transition = 'none';
    if (!S.busy) t.style.transform = '';
    setBgProgress(1);
  }

  function tap(e) {
    var now = performance.now();
    var cur = S.cur;
    if (!cur) return;
    var r = cur.img.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) { close(); return; }
    var lt = S.lastTap;
    if (lt && now - lt.t < 320 && Math.hypot(e.clientX - lt.x, e.clientY - lt.y) < 36) {
      S.lastTap = null;
      toggleZoom(e.clientX, e.clientY);
    } else S.lastTap = { t: now, x: e.clientX, y: e.clientY };
  }

  /* ---------- napojení na stránku ---------- */
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || S.open) return;
    if (e.button && e.button !== 0) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var t = e.target;
    if (!t || !t.closest) return;
    var el = t.closest(SEL);
    if (!el) return;
    var img = imgOf(el);
    if (!img || inLink(img)) return;
    e.preventDefault();
    open(img, img.closest('button') || img);
  });

  window.addEventListener('popstate', function () {
    if (S.skipPop) { S.skipPop = false; return; }
    if (S.open && !S.closing) { S.histPushed = false; close({ fromPop: true }); }
  });

  window.BohLightbox = {
    open: function (img) { if (img && img.tagName === 'IMG') open(img, img.closest('button') || img); },
    close: function () { close(); },
    isOpen: function () { return S.open; }
  };
})();
