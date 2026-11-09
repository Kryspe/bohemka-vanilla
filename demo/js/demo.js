/* TJ Bohemians Praha - demo webu. Cisty JS, bez knihoven. */
(function () {
  "use strict";

  var BOH = "https://www.boh.cz";

  /* ---------- pomocne funkce ---------- */

  function $(sel, root) { return (root || document).querySelector(sel); }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") n.textContent = attrs[k];
        else if (k === "html") n.innerHTML = attrs[k]; /* jen data vycistena pri sestaveni (build_demo_data.py) */
        else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  function loadJSON(name) {
    return fetch("/demo/data/" + name + ".json").then(function (r) {
      if (!r.ok) throw new Error(name + " " + r.status);
      return r.json();
    });
  }

  function fmt(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return parseInt(p[2], 10) + ". " + parseInt(p[1], 10) + ". " + p[0];
  }

  function todayIso() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function fold(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function fail(root, what) {
    root.textContent = "";
    root.appendChild(el("p", { class: "empty" }, [
      "Data se nepodařilo načíst (" + what + "). Aktuální informace jsou vždy na ",
      el("a", { href: BOH, text: "boh.cz" }), "."
    ]));
  }

  /* popisky bunek pro skladani tabulek na mobilu (CSS table.stack) */
  function labelCells(tbody) {
    var heads = Array.prototype.map.call(tbody.parentNode.querySelectorAll("thead th"), function (th) { return th.textContent; });
    Array.prototype.forEach.call(tbody.rows, function (tr) {
      Array.prototype.forEach.call(tr.cells, function (td, i) { if (i > 0) td.setAttribute("data-label", heads[i]); });
    });
  }

  function thumbOf(path) {
    return "/demo/img/n/" + path.split("/").pop();
  }

  /* ---------- postranni sloupec ---------- */

  function renderAside() {
    var aside = $("#aside");
    if (!aside) return;
    loadJSON("sidebar").then(function (s) {
      (s.alerts || []).forEach(function (a) {
        aside.appendChild(el("div", { class: "alert" + (a.lead ? " lead" : "") }, [
          el("strong", { text: a.title }), el("p", { html: a.html })
        ]));
      });

      aside.appendChild(el("section", { class: "widget" }, [
        el("h2", { text: "Podporují nás" }),
        el("div", { class: "logos" }, [
          el("a", { href: "https://www.praha.eu/", rel: "noopener" }, [el("img", { src: "/assets/sponsors/praha.png", alt: "Hlavní město Praha", height: "60", loading: "lazy" })]),
          el("a", { href: "https://www.czechswimming.cz/", rel: "noopener" }, [el("img", { src: "/assets/sponsors/svaz.png", alt: "Český svaz plaveckých sportů", height: "60", loading: "lazy" })])
        ])
      ]));

      if (s.vzkazy && s.vzkazy.length) {
        aside.appendChild(el("section", { class: "widget" }, [
          el("h2", { text: "Vzkazy pro rodiče" }),
          el("ul", null, s.vzkazy.map(function (v) {
            return el("li", null, [el("a", { href: "/demo/vzkazy#v" + v.id, text: v.title }), el("small", { text: fmt(v.date) })]);
          }))
        ]));
      }

      if (s.downloads && s.downloads.length) {
        aside.appendChild(el("section", { class: "widget" }, [
          el("h2", { text: "Novinky ke stažení" }),
          el("ul", null, s.downloads.map(function (d) {
            return el("li", null, [el("a", { href: d.url, text: d.title }), el("small", { text: fmt(d.date) + " · " + d.size })]);
          }))
        ]));
      }

      if (s.galleries && s.galleries.length) {
        aside.appendChild(el("section", { class: "widget" }, [
          el("h2", { text: "Poslední fotogalerie" }),
          el("div", { class: "gal" }, s.galleries.map(function (g) {
            return el("a", { href: BOH + "/galerie/" + g.id + "/" }, [
              g.cover ? el("img", { src: g.cover, alt: "", loading: "lazy" }) : null, g.title
            ]);
          }))
        ]));
      }

      aside.appendChild(el("section", { class: "widget" }, [
        el("h2", { text: "Pořádáme" }),
        el("div", { class: "logos" }, [
          el("a", { href: "http://www.jarnicenaprahy.cz/", rel: "noopener" }, [el("img", { src: "/assets/sponsors/jcp_promo.png", alt: "Jarní cena Prahy", height: "60", loading: "lazy" })])
        ])
      ]));

      aside.appendChild(el("section", { class: "widget" }, [
        el("h2", { text: "Najdete nás na Facebooku" }),
        el("p", { style: "margin:0;font-size:15px" }, [el("a", { href: "https://www.facebook.com/boh.cz/", rel: "noopener", text: "facebook.com/boh.cz" })])
      ]));
    }).catch(function () { /* postranni panel neni kriticky */ });
  }

  /* ---------- aktuality ---------- */

  function newsItem(n, withLink) {
    var children = [
      el("h2", null, [el("a", { href: "/demo/aktualita?id=" + encodeURIComponent(n.id), text: n.title })]),
      el("p", { class: "meta", text: fmt(n.date) + " · " + n.author })
    ];
    var art = el("article", { class: "news-item" }, children);
    if (n.image) {
      art.appendChild(el("a", { class: "thumb", href: "/demo/aktualita?id=" + encodeURIComponent(n.id), tabindex: "-1", "aria-hidden": "true" }, [
        el("img", { src: thumbOf(n.image), alt: "", width: "190", height: "143", loading: "lazy" })
      ]));
    }
    n.body.forEach(function (t) { art.appendChild(el("p", { text: t })); });
    return art;
  }

  function pageNews() {
    var root = $("#news"), more = $("#more");
    var shown = 0, step = 8, list = [];
    function draw() {
      list.slice(shown, shown + step).forEach(function (n) { root.appendChild(newsItem(n)); });
      shown = Math.min(list.length, shown + step);
      more.hidden = shown >= list.length;
    }
    loadJSON("news").then(function (d) {
      list = d;
      root.textContent = "";
      draw();
      more.addEventListener("click", draw);
    }).catch(function () { fail(root, "aktuality"); });
  }

  function pageArticle() {
    var root = $("#article");
    var id = new URLSearchParams(location.search).get("id");
    loadJSON("news").then(function (d) {
      var n = d.filter(function (x) { return x.id === id; })[0];
      root.textContent = "";
      if (!n) {
        root.appendChild(el("p", { class: "empty" }, ["Aktualita nebyla nalezena. ", el("a", { href: "/demo/", text: "Zpět na aktuality" })]));
        return;
      }
      document.title = n.title + " | TJ Bohemians Praha";
      root.appendChild(el("h1", { text: n.title }));
      root.appendChild(el("p", { class: "meta", text: fmt(n.date) + " · " + n.author }));
      if (n.image) root.appendChild(el("figure", { class: "article-img", style: "margin:0 0 18px" }, [el("img", { src: "/" + n.image, alt: "" })]));
      var body = el("div", { class: "article-body" });
      n.body.forEach(function (t) { body.appendChild(el("p", { text: t })); });
      root.appendChild(body);
      var idx = d.indexOf(n);
      var nav = el("p", { style: "margin-top:24px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap" });
      nav.appendChild(d[idx + 1] ? el("a", { href: "/demo/aktualita?id=" + encodeURIComponent(d[idx + 1].id), text: "← Starší: " + d[idx + 1].title }) : el("span"));
      nav.appendChild(d[idx - 1] ? el("a", { href: "/demo/aktualita?id=" + encodeURIComponent(d[idx - 1].id), text: "Novější: " + d[idx - 1].title + " →" }) : el("span"));
      root.appendChild(nav);
    }).catch(function () { fail(root, "aktuality"); });
  }

  /* ---------- pro rodice ---------- */

  function pageVzkazy() {
    var root = $("#vzkazy");
    loadJSON("vzkazy").then(function (d) {
      root.textContent = "";
      d.forEach(function (v) {
        root.appendChild(el("article", { class: "news-item", id: "v" + v.id }, [
          el("h2", { text: v.title }),
          el("p", { class: "meta", text: fmt(v.date) + (v.author ? " · " + v.author : "") }),
          el("div", { class: "rich", html: "<p>" + v.html + "</p>" })
        ]));
      });
      if (location.hash) {
        var t = document.getElementById(location.hash.slice(1));
        if (t) t.scrollIntoView();
      }
    }).catch(function () { fail(root, "vzkazy"); });
  }

  /* ---------- oddil ---------- */

  function pageOddil() {
    var root = $("#oddil-body"), tabs = $("#oddil-tabs");
    var keys = { historie: "Historie", struktura: "Struktura", kontakty: "Kontakty", sponzori: "Sponzoři" };
    loadJSON("oddil").then(function (d) {
      function show() {
        var k = location.hash.slice(1);
        if (!keys[k]) k = "struktura";
        Array.prototype.forEach.call(tabs.querySelectorAll("a"), function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + k ? "true" : "false");
        });
        root.textContent = "";
        root.appendChild(el("div", { class: "rich", html: d[k] }));
      }
      window.addEventListener("hashchange", show);
      show();
    }).catch(function () { fail(root, "oddíl"); });
  }

  /* ---------- zavody ---------- */

  function pageZavody() {
    var body = $("#ev-body"), search = $("#ev-search"), filters = $("#ev-filters");
    var all = [], mode = "next", today = todayIso();

    var labels = { p: "Přihlášení", v: "Výsledky", r: "Rozpis", x: "PDF výsledky" };
    var titles = {
      p: "Přehled přihlášek na boh.cz", v: "Výsledky na boh.cz",
      r: "Rozpis závodu na boh.cz", x: "Výsledky v PDF na boh.cz"
    };

    function row(e, isNext) {
      var upcoming = e.date >= today;
      var dl = el("td", { class: "nowrap", text: e.deadline ? fmt(e.deadline) : "" });
      if (upcoming && e.deadline) {
        dl.appendChild(el("span", { class: "badge" + (e.deadline < today ? " badge-warn" : ""), text: e.deadline < today ? "uzavřeno" : "otevřeno" }));
      }
      var links = el("td", { class: "links" });
      ["p", "v", "r", "x"].forEach(function (k) {
        if (e.links[k]) links.appendChild(el("a", { href: e.links[k], title: titles[k], text: labels[k] }));
      });
      return el("tr", { class: upcoming ? (isNext ? "is-next" : "") : "is-past" }, [
        el("td", null, [el("a", { href: e.url, text: e.name })]),
        el("td", { class: "nowrap", text: fmt(e.date) }),
        dl, links
      ]);
    }

    function draw() {
      var q = fold(search.value.trim());
      var rows = all.filter(function (e) {
        if (mode === "next" && e.date < today) return false;
        if (mode === "past" && e.date >= today) return false;
        return !q || fold(e.name).indexOf(q) !== -1;
      });
      rows.sort(function (a, b) { return mode === "past" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date); });
      if (mode === "all") {
        var up = rows.filter(function (e) { return e.date >= today; }).sort(function (a, b) { return a.date.localeCompare(b.date); });
        var pa = rows.filter(function (e) { return e.date < today; }).sort(function (a, b) { return b.date.localeCompare(a.date); });
        rows = up.concat(pa);
      }
      body.textContent = "";
      if (!rows.length) { $("#ev-empty").hidden = false; return; }
      $("#ev-empty").hidden = true;
      var firstUpcoming = true;
      rows.forEach(function (e) {
        var isNext = e.date >= today && firstUpcoming;
        if (isNext) firstUpcoming = false;
        body.appendChild(row(e, isNext));
      });
      labelCells(body);
    }

    loadJSON("events").then(function (d) {
      all = d;
      draw();
      search.addEventListener("input", draw);
      filters.addEventListener("click", function (ev) {
        var b = ev.target.closest("button");
        if (!b) return;
        mode = b.getAttribute("data-mode");
        Array.prototype.forEach.call(filters.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw();
      });
    }).catch(function () { fail($("#ev-wrap"), "závody"); });
  }

  /* ---------- rekordy ---------- */

  function pageRekordy() {
    var body = $("#rec-body"), selCat = $("#rec-cat");
    var state = { g: "M", p: 50 };
    var strokeRank = { VZ: 1, Z: 2, P: 3, M: 4, PZ: 5 };
    var catOrder = ["Open", "Starší dorost", "Mladší dorost", "Žactvo 14 let", "Žactvo 13 let", "Žactvo 12 let", "Žactvo 11 let", "Žactvo 10 let", "Žactvo 9 let"];
    var all = [];

    function key(e) {
      var m = /^(\d+)\s*(km|[A-Z]+)?/.exec(e);
      if (!m) return [9, 0];
      if (m[2] === "km") return [8, parseInt(m[1], 10)];
      return [strokeRank[m[2]] || 7, parseInt(m[1], 10)];
    }

    function draw() {
      var rows = all.filter(function (r) { return r.c === selCat.value && r.g === state.g && r.p === state.p; });
      rows.sort(function (a, b) { var x = key(a.e), y = key(b.e); return x[0] - y[0] || x[1] - y[1]; });
      body.textContent = "";
      $("#rec-empty").hidden = rows.length > 0;
      rows.forEach(function (r) {
        body.appendChild(el("tr", null, [
          el("td", { class: "nowrap", text: r.e }),
          el("td", { class: "num", text: r.t }),
          el("td", { text: r.h }),
          el("td", { class: "nowrap", text: r.d }),
          el("td", { text: r.pl })
        ]));
      });
      labelCells(body);
    }

    function bindToggle(id, prop, conv) {
      var box = $(id);
      box.addEventListener("click", function (ev) {
        var b = ev.target.closest("button");
        if (!b) return;
        state[prop] = conv(b.getAttribute("data-v"));
        Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw();
      });
    }

    loadJSON("records").then(function (d) {
      all = d;
      var cats = catOrder.filter(function (c) { return d.some(function (r) { return r.c === c; }); });
      cats.forEach(function (c) { selCat.appendChild(el("option", { value: c, text: c })); });
      selCat.addEventListener("change", draw);
      bindToggle("#rec-g", "g", String);
      bindToggle("#rec-p", "p", Number);
      draw();
    }).catch(function () { fail($("#rec-wrap"), "rekordy"); });
  }

  /* ---------- foto ---------- */

  function pageFoto() {
    var grid = $("#foto-new"), body = $("#foto-body"), search = $("#foto-search"), more = $("#foto-more");
    var all = [], limit = 40;

    function draw() {
      var q = fold(search.value.trim());
      var rows = all.filter(function (g) { return !q || fold(g.title).indexOf(q) !== -1; });
      body.textContent = "";
      rows.slice(0, limit).forEach(function (g) {
        body.appendChild(el("tr", null, [
          el("td", null, [el("a", { href: BOH + "/galerie/" + g.id + "/", text: g.title })]),
          el("td", { class: "nowrap", text: fmt(g.date) }),
          el("td", { class: "num", text: String(g.count) })
        ]));
      });
      labelCells(body);
      more.hidden = rows.length <= limit;
      $("#foto-empty").hidden = rows.length > 0;
    }

    loadJSON("galleries").then(function (d) {
      all = d;
      d.filter(function (g) { return g.cover; }).slice(0, 4).forEach(function (g) {
        grid.appendChild(el("a", { href: BOH + "/galerie/" + g.id + "/", style: "display:block;font-size:15px;line-height:1.35" }, [
          el("img", { src: g.cover, alt: "", loading: "lazy", style: "width:100%;aspect-ratio:3/4;object-fit:cover;margin-bottom:6px;background:#e6f1ea" }),
          g.title
        ]));
      });
      draw();
      search.addEventListener("input", function () { limit = 40; draw(); });
      more.addEventListener("click", function () { limit += 60; draw(); });
    }).catch(function () { fail($("#foto-wrap"), "fotogalerie"); });
  }

  /* ---------- ke stazeni ---------- */

  function pageStahovani() {
    var body = $("#dl-body"), chips = $("#dl-cats"), search = $("#dl-search"), more = $("#dl-more");
    var all = [], cat = "", limit = 40;

    function draw() {
      var q = fold(search.value.trim());
      var rows = all.filter(function (d) {
        return (!cat || d.category === cat) && (!q || fold(d.title).indexOf(q) !== -1);
      });
      body.textContent = "";
      rows.slice(0, limit).forEach(function (d) {
        body.appendChild(el("tr", null, [
          el("td", null, [el("a", { href: d.url, text: d.title })]),
          el("td", { class: "nowrap", text: d.category }),
          el("td", { class: "num", text: d.size }),
          el("td", { class: "nowrap", text: fmt(d.date) })
        ]));
      });
      labelCells(body);
      more.hidden = rows.length <= limit;
      $("#dl-empty").hidden = rows.length > 0;
    }

    loadJSON("downloads").then(function (d) {
      all = d;
      var names = [""].concat(d.map(function (x) { return x.category; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
      names.forEach(function (n) {
        chips.appendChild(el("li", null, [el("button", { type: "button", "data-c": n, "aria-pressed": String(n === ""), text: n || "Vše" })]));
      });
      chips.addEventListener("click", function (ev) {
        var b = ev.target.closest("button");
        if (!b) return;
        cat = b.getAttribute("data-c");
        limit = 40;
        Array.prototype.forEach.call(chips.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        draw();
      });
      search.addEventListener("input", function () { limit = 40; draw(); });
      more.addEventListener("click", function () { limit += 60; draw(); });
      draw();
    }).catch(function () { fail($("#dl-wrap"), "dokumenty"); });
  }

  /* ---------- start ---------- */

  var pages = {
    news: pageNews, article: pageArticle, vzkazy: pageVzkazy, oddil: pageOddil,
    zavody: pageZavody, rekordy: pageRekordy, foto: pageFoto, stahovani: pageStahovani
  };

  document.addEventListener("DOMContentLoaded", function () {
    var fn = pages[document.body.getAttribute("data-page")];
    if (fn) fn();
    renderAside();
  });
})();
