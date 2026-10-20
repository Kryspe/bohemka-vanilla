/**
 * Pure Node.js E2E Test Harness & Browser Sandbox
 * 
 * Provides zero-dependency in-memory browser simulation:
 * - DOM & Window globals (document, localStorage, sessionStorage, CustomEvent, EventTarget)
 * - Fetch interception & network failure simulation (offline mode, 500s, latency)
 * - Built-in lightweight PostgREST mock server for offline/contract testing
 * - Script & HTML loading inside Node vm contexts
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const WORKSPACE_ROOT = path.resolve("/home/krystofspejchal/Projects/bohemka-vanilla");

export class MockStorage {
  constructor() {
    this._data = new Map();
  }

  getItem(key) {
    const k = String(key);
    return this._data.has(k) ? this._data.get(k) : null;
  }

  setItem(key, value) {
    this._data.set(String(key), String(value));
  }

  removeItem(key) {
    this._data.delete(String(key));
  }

  clear() {
    this._data.clear();
  }

  get length() {
    return this._data.size;
  }

  key(index) {
    const keys = Array.from(this._data.keys());
    return keys[index] !== undefined ? keys[index] : null;
  }

  _dump() {
    const obj = {};
    for (const [k, v] of this._data.entries()) {
      obj[k] = v;
    }
    return obj;
  }
}

export class MockElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.attributes = new Map();
    this.classList = new Set();
    this.innerHTML = "";
    this.textContent = "";
    this.style = {};
  }

  setAttribute(name, val) {
    this.attributes.set(name, String(val));
    if (name === "class") {
      this.classList = new Set(String(val).split(/\s+/).filter(Boolean));
    }
    if (name === "id") this.id = String(val);
  }

  getAttribute(name) {
    return this.attributes.get(name) || null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx > -1) this.children.splice(idx, 1);
    return child;
  }

  click() {
    if (typeof this.onclick === "function") {
      this.onclick();
    }
  }
}

/**
 * In-memory PostgREST Database Simulator for Supabase Cloud Contract Testing
 */
export class MockPostgrestServer {
  constructor() {
    this.reset();
  }

  reset() {
    this.tables = {
      news: [
        {
          id: "seed-news-1",
          slug: "zahajeni-sezony",
          title: "Zahájení podzimní sezóny 2026",
          author: "Jan Srb",
          date: "2026-09-01",
          excerpt: "Rozpisy tréninků pro všechny skupiny.",
          body: ["Tréninky začínají v pondělí 1. září na Podolí."],
          image_url: "assets/aktuality/2232.jpg"
        }
      ],
      events: [
        {
          id: "seed-event-1",
          name: "Podzimní pohár TJ Bohemians",
          place: "Podolí 50m, Praha",
          date: "2026-10-15",
          deadline: "2026-10-10",
          type: "Oddílový závod",
          kind: "zavod",
          status: "open",
          disciplines: ["50 VZ", "100 VZ", "200 VZ", "100 Z"],
          note: "Rozplavání od 8:00"
        }
      ],
      event_entries: [
        {
          id: 1,
          event_id: "seed-event-1",
          swimmer_name: "Natálie Zápotocká",
          group_name: "ST",
          disciplines: ["100 VZ", "200 VZ"],
          note: "Osobní rekord"
        }
      ],
      parent_messages: [
        {
          id: 1,
          category: "dulezite",
          title: "Lékařské prohlídky 2026",
          text: "Všichni plavci musí odevzdat platnou sportovní prohlídku do konce října.",
          date: "2026-09-05",
          author: "MUDr. Kovář"
        }
      ],
      trainers: [
        { id: 1, name: "Jan Srb", role: "Hlavní trenér", email: "srb@boh.cz", phone: "+420 123 456 789" }
      ],
      records: [
        { id: 1, pool: "50m", gender: "M", event: "50 VZ", time: "22.85", swimmer_name: "Jan Novák", year: "2024" }
      ],
      yearbooks: [
        { id: 1, year: 2025, title: "Ročenka 2025", file_url: "assets/downloads/rocenka2025.pdf", file_size: "3.2 MB" }
      ],
      users: [
        { id: "usr-1", username: "admin", name: "Správce Bohemka", role: "admin" }
      ]
    };
    this.requestsLog = [];
    this.shouldFailNextRequest = null; // can be set to status code (500, 503, 404, etc.)
  }

  async handleRequest(urlStr, init = {}) {
    const url = new URL(urlStr, "https://xjvpyznywisuuykwsedd.supabase.co");
    const method = (init.method || "GET").toUpperCase();
    const headers = init.headers || {};
    const bodyText = typeof init.body === "string" ? init.body : (init.body ? JSON.stringify(init.body) : null);

    this.requestsLog.push({ url: url.href, method, headers, body: bodyText });

    if (this.shouldFailNextRequest) {
      const status = this.shouldFailNextRequest;
      this.shouldFailNextRequest = null;
      return new Response(JSON.stringify({ error: "Simulated Server Error", code: status }), {
        status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const pathname = url.pathname;
    const match = pathname.match(/^\/rest\/v1\/([a-zA-Z0-9_]+)/);
    if (!match) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    const tableName = match[1];
    if (!this.tables[tableName]) {
      return new Response(JSON.stringify({
        code: "PGRST205",
        message: `Could not find the table 'public.${tableName}' in the schema cache`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json", "proxy-status": "PostgREST; error=PGRST205" }
      });
    }

    let table = this.tables[tableName];

    // GET /rest/v1/<table_name>
    if (method === "GET") {
      let filtered = [...table];
      for (const [k, v] of url.searchParams.entries()) {
        if (k.startsWith("eq.")) {
          // handled below
        } else if (k === "select") {
          // projection
        } else if (k === "order") {
          // order=date.desc
          const [col, dir] = v.split(".");
          filtered.sort((a, b) => {
            if (dir === "desc") return String(b[col] || "").localeCompare(String(a[col] || ""));
            return String(a[col] || "").localeCompare(String(b[col] || ""));
          });
        } else if (v.startsWith("eq.")) {
          const expected = v.slice(3);
          filtered = filtered.filter(row => String(row[k]) === expected);
        }
      }
      return new Response(JSON.stringify(filtered), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // POST /rest/v1/<table_name>
    if (method === "POST") {
      const payload = bodyText ? JSON.parse(bodyText) : {};
      const items = Array.isArray(payload) ? payload : [payload];
      for (const it of items) {
        if (!it.id && tableName !== "event_entries" && tableName !== "parent_messages") {
          it.id = `${tableName}-${Date.now()}`;
        } else if (!it.id) {
          it.id = Date.now();
        }
        table.push(it);
      }
      return new Response(JSON.stringify(items), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }

    // PATCH /rest/v1/<table_name>?col=eq.val
    if (method === "PATCH") {
      const patchData = bodyText ? JSON.parse(bodyText) : {};
      let modified = 0;
      for (let i = 0; i < table.length; i++) {
        let match = true;
        for (const [k, v] of url.searchParams.entries()) {
          if (v.startsWith("eq.") && String(table[i][k]) !== v.slice(3)) {
            match = false;
            break;
          }
        }
        if (match) {
          table[i] = { ...table[i], ...patchData };
          modified++;
        }
      }
      return new Response(JSON.stringify({ count: modified }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // DELETE /rest/v1/<table_name>?col=eq.val
    if (method === "DELETE") {
      const before = table.length;
      this.tables[tableName] = table.filter(row => {
        for (const [k, v] of url.searchParams.entries()) {
          if (v.startsWith("eq.") && String(row[k]) === v.slice(3)) {
            return false; // delete
          }
        }
        return true;
      });
      const deletedCount = before - this.tables[tableName].length;
      return new Response(JSON.stringify({ count: deletedCount }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Unsupported method" }), { status: 405 });
  }
}

/**
 * Creates an isolated browser sandbox environment
 */
export function createSandbox(options = {}) {
  const localStorage = new MockStorage();
  const sessionStorage = new MockStorage();
  const postgrestMock = new MockPostgrestServer();

  let offline = Boolean(options.offline);
  let liveNetwork = Boolean(options.live);

  const listeners = new Map();

  const windowObj = {
    localStorage,
    sessionStorage,
    location: {
      href: "http://localhost:8080/",
      origin: "http://localhost:8080",
      pathname: "/",
      search: "",
      hash: ""
    },
    navigator: {
      onLine: !offline,
      userAgent: "Mozilla/5.0 (Node.js Bohemka-E2E-Harness)"
    },
    document: {
      documentElement: new MockElement("html"),
      head: new MockElement("head"),
      body: new MockElement("body"),
      createElement(tag) {
        return new MockElement(tag);
      },
      getElementById(id) {
        const el = new MockElement("div");
        el.setAttribute("id", id);
        return el;
      },
      querySelector() {
        return new MockElement("div");
      },
      querySelectorAll() {
        return [];
      },
      addEventListener(type, handler) {
        windowObj.addEventListener(type, handler);
      },
      removeEventListener(type, handler) {
        windowObj.removeEventListener(type, handler);
      },
      dispatchEvent(event) {
        return windowObj.dispatchEvent(event);
      }
    },
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      if (listeners.has(type)) listeners.get(type).delete(handler);
    },
    dispatchEvent(event) {
      const type = event.type;
      if (type === "online") {
        offline = false;
        windowObj.navigator.onLine = true;
      } else if (type === "offline") {
        offline = true;
        windowObj.navigator.onLine = false;
      }
      if (listeners.has(type)) {
        for (const handler of listeners.get(type)) {
          try {
            handler(event);
          } catch (e) {
            console.error(`[Sandbox Event Handler Error on ${type}]:`, e);
          }
        }
      }
      return true;
    },
    CustomEvent: class CustomEvent {
      constructor(type, eventInitDict = {}) {
        this.type = type;
        this.detail = eventInitDict.detail || null;
      }
    },
    Event: class Event {
      constructor(type) {
        this.type = type;
      }
    },
    URL: globalThis.URL,
    Blob: globalThis.Blob,
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,
    console: {
      log: (...args) => { if (options.verbose) console.log(...args); },
      warn: (...args) => { if (options.verbose) console.warn(...args); },
      error: (...args) => { if (options.verbose) console.error(...args); }
    }
  };

  windowObj.window = windowObj;
  windowObj.self = windowObj;
  windowObj.root = windowObj;

  // Intercept fetch
  const fetchMock = async (urlStr, init = {}) => {
    if (offline) {
      throw new TypeError("Failed to fetch: Network is offline");
    }

    if (typeof options.fetchInterceptor === "function") {
      const intercepted = await options.fetchInterceptor(urlStr, init);
      if (intercepted !== undefined) return intercepted;
    }

    const parsed = new URL(urlStr, "http://localhost:8080");

    // Live Supabase check
    if (liveNetwork && (parsed.hostname === "xjvpyznywisuuykwsedd.supabase.co" || urlStr.includes("supabase.co"))) {
      return globalThis.fetch(urlStr, init);
    }

    // Default mock PostgREST check
    if (parsed.hostname === "xjvpyznywisuuykwsedd.supabase.co" || urlStr.includes("supabase.co")) {
      return postgrestMock.handleRequest(urlStr, init);
    }

    // Local /api/ endpoints check
    if (parsed.pathname === "/api/config") {
      return new Response(JSON.stringify({
        url: "https://xjvpyznywisuuykwsedd.supabase.co",
        anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock.anon.token"
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    if (parsed.pathname === "/api/events.php" && init.method === "HEAD") {
      return new Response(null, { status: 200 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  windowObj.fetch = fetchMock;

  const vmContext = vm.createContext(windowObj);

  return {
    window: windowObj,
    document: windowObj.document,
    localStorage,
    sessionStorage,
    postgrestMock,
    setOffline(isOffline) {
      offline = isOffline;
      windowObj.navigator.onLine = !isOffline;
      windowObj.dispatchEvent(new windowObj.Event(isOffline ? "offline" : "online"));
    },
    isOffline() {
      return offline;
    },
    loadScript(relPath) {
      const fullPath = path.resolve(WORKSPACE_ROOT, relPath);
      const code = fs.readFileSync(fullPath, "utf-8");
      vm.runInContext(code, vmContext, { filename: fullPath });
    },
    loadHtmlInlineScripts(htmlRelPath) {
      const fullPath = path.resolve(WORKSPACE_ROOT, htmlRelPath);
      const html = fs.readFileSync(fullPath, "utf-8");
      const scriptRegex = /<script(?:\s+type=["'](?:text\/javascript|application\/javascript)["'])?\s*>([\s\S]*?)<\/script>/gi;
      let match;
      const executed = [];
      while ((match = scriptRegex.exec(html)) !== null) {
        const scriptCode = match[1];
        if (scriptCode && scriptCode.trim()) {
          try {
            vm.runInContext(scriptCode, vmContext, { filename: `${htmlRelPath}:inline-script-${executed.length + 1}` });
            executed.push({ script: scriptCode.slice(0, 50), error: null });
          } catch (err) {
            executed.push({ script: scriptCode.slice(0, 50), error: err });
          }
        }
      }
      return executed;
    },
    evaluate(code) {
      return vm.runInContext(code, vmContext);
    }
  };
}

export { WORKSPACE_ROOT };
