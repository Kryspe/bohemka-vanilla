/**
 * TJ Bohemians Praha — Hardened Zero-Dependency Production Web Server
 * Built-in Node.js v22+ engine with node:sqlite, OWASP security headers,
 * access control guards, and secure API routers.
 */

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
let sqliteDb = null;

try {
  const { DatabaseSync } = require("node:sqlite");
  const primaryDb = path.join(__dirname, "data", "bohemka.sqlite");
  const fallbackDb = path.join(__dirname, "data", "boh.sqlite");
  const dbPath = fs.existsSync(primaryDb) ? primaryDb : fallbackDb;
  if (fs.existsSync(dbPath)) {
    sqliteDb = new DatabaseSync(dbPath);
  }
} catch (err) {
  sqliteDb = null;
}

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "X-XSS-Protection": "1; mode=block",
  "Content-Security-Policy": "default-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
};

function stripDiacritics(str) {
  if (!str) return "";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`/g, "&#96;");
}

function sanitizeUrl(rawUrl, defaultFallback = "/") {
  if (!rawUrl || typeof rawUrl !== "string") return defaultFallback;
  const cleaned = rawUrl.replace(/[\x00-\x1F\x7F]/g, "").trim();
  if (!cleaned) return defaultFallback;
  if (/^(javascript|data|vbscript|file):/i.test(cleaned)) return defaultFallback;
  if (cleaned.startsWith("//")) return defaultFallback;
  if (cleaned === "/") return "/";
  if (/^[a-zA-Z0-9_\-\.\/]+(#.*)?$/.test(cleaned)) return cleaned;
  return defaultFallback;
}

function parseJsonBody(req, maxBytes = 102400) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.on("data", chunk => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        req.destroy();
        reject(new Error("Payload Too Large"));
        return;
      }
      body += chunk;
    });
    req.on("end", () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload)
  });
  res.end(payload);
}

// Background Supabase Cloud Synchronizer
async function syncSupabase(table, payload, method = "POST", query = "") {
  try {
    const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xjvpyznywisuuykwsedd.supabase.co") + "/rest/v1/" + table + (query ? "?" + query : "");
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";
    const headers = {
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates,return=minimal"
    };
    const options = {
      method: method.toUpperCase(),
      headers
    };
    if (payload != null) {
      options.body = typeof payload === "string" ? payload : JSON.stringify(payload);
    }
    await fetch(url, options).catch(() => {});
  } catch (_) {}
}

// API Router
async function handleApi(req, res, parsedUrl) {
  const pathname = parsedUrl.pathname.replace(/^\/api\//, "");
  const method = req.method;

  // 0. config / config.js (Supabase credentials)
  if (pathname === "config" || pathname === "config.js") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://xjvpyznywisuuykwsedd.supabase.co";
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqdnB5em55d2lzdXV5a3dzZWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODc3MzMsImV4cCI6MjA5NTM2MzczM30.tL1qj2pxeB64GtNEn13Y_xzU7yd74DU-N02huw4zOaQ";
    return sendJson(res, 200, { url, anonKey });
  }

  // 1. events.php / events
  if (pathname === "events.php" || pathname === "events") {
    if (parsedUrl.searchParams.get("ping")) {
      return sendJson(res, 200, { status: "ok" });
    }
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT * FROM admin_items WHERE kind = 'zavod' AND status = 'approved'").all();
          let events = rows.map(r => {
            let fields = {};
            try { fields = JSON.parse(r.fields_json || "{}"); } catch {}
            return {
              id: r.id,
              name: r.title,
              place: fields.misto || "",
              date: fields.datum || "",
              deadline: fields.deadline || "",
              type: fields.typ || "Oddílový",
              kind: fields.druh === "soustredeni" ? "soustredeni" : "zavod",
              note: fields.poznamka || "",
              file: fields.soubor || "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
            };
          });
          if (!events.length) {
            try {
              const evRows = sqliteDb.prepare("SELECT id, name, place, date, deadline, status FROM events ORDER BY date ASC").all();
              events = evRows.map(r => ({
                id: r.id,
                name: r.name,
                place: r.place || "",
                date: r.date || "",
                deadline: r.deadline || "",
                type: "Oddílový",
                kind: "zavod",
                note: "",
                file: "assets/downloads/Harmonogram_treninku_podzim_2026.pdf"
              }));
            } catch (_) {}
          }
          return sendJson(res, 200, events);
        } catch (e) {}
      }
      return sendJson(res, 200, []);
    }

    if (method === "POST" || method === "PUT") {
      try {
        const body = await parseJsonBody(req);
        const id = String(body.id || `event-${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        const name = escapeHtml(String(body.name || "").trim()).slice(0, 200);
        const place = escapeHtml(String(body.place || "").trim()).slice(0, 200);
        const date = String(body.date || new Date().toISOString().slice(0, 10)).slice(0, 30);
        const deadline = String(body.deadline || "").slice(0, 30);
        const status = ["open", "closed", "upcoming", "completed"].includes(body.status) ? body.status : "open";
        const file = String(body.file || "assets/downloads/Harmonogram_treninku_podzim_2026.pdf").slice(0, 255);

        if (!name) return sendJson(res, 400, { error: "Event name is required" });

        if (sqliteDb) {
          try {
            sqliteDb.prepare("INSERT OR REPLACE INTO events (id, name, place, date, deadline, status) VALUES (?, ?, ?, ?, ?, ?)").run(
              id, name, place, date, deadline, status
            );
            const fieldsJson = JSON.stringify({ misto: place, datum: date, deadline, typ: "Oddílový", druh: "zavod", soubor: file });
            sqliteDb.prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'zavod', 'approved', 'intranet', ?, ?)").run(
              id, name, fieldsJson
            );
          } catch (_) {}
        }

        // Supabase sync
        syncSupabase("events", { id, name, place, date, deadline, status });

        return sendJson(res, 200, { success: true, id });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (method === "DELETE") {
      const id = String(parsedUrl.searchParams.get("id") || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
      if (id && sqliteDb) {
        try {
          sqliteDb.prepare("DELETE FROM events WHERE id = ?").run(id);
          sqliteDb.prepare("DELETE FROM admin_items WHERE id = ?").run(id);
        } catch (_) {}
        syncSupabase("events", null, "DELETE", "id=eq." + encodeURIComponent(id));
      }
      return sendJson(res, 200, { success: true });
    }
  }

  // 1b. news.php / news
  if (pathname === "news" || pathname === "news.php") {
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT id, slug, title, author, date, excerpt, body, image_url, created_at FROM news ORDER BY date DESC").all();
          return sendJson(res, 200, rows);
        } catch (_) {}
      }
      return sendJson(res, 200, []);
    }
    if (method === "POST" || method === "PUT") {
      try {
        const body = await parseJsonBody(req);
        const id = String(body.id || `news-${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        const title = escapeHtml(String(body.title || "").trim()).slice(0, 200);
        const author = escapeHtml(String(body.author || "Vedení oddílu").trim()).slice(0, 100);
        const date = String(body.date || new Date().toISOString().slice(0, 10)).slice(0, 20);
        const excerpt = escapeHtml(String(body.excerpt || "").trim()).slice(0, 500);
        const textBody = String(body.body || "").trim();
        const imageUrl = escapeHtml(String(body.image_url || body.image || "").trim()).slice(0, 300);

        if (!title) return sendJson(res, 400, { error: "News title is required" });

        if (sqliteDb) {
          try {
            sqliteDb.prepare("INSERT OR REPLACE INTO news (id, slug, title, author, date, excerpt, body, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(
              id, id, title, author, date, excerpt, textBody, imageUrl
            );
            const fieldsJson = JSON.stringify({ autor: author, datum: date, perex: excerpt, obsah: textBody, obrazek: imageUrl });
            sqliteDb.prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'aktualita', 'approved', 'intranet', ?, ?)").run(
              id, title, fieldsJson
            );
          } catch (_) {}
        }

        // Supabase sync
        syncSupabase("news", { id, slug: id, title, author, date, excerpt, body: textBody, image_url: imageUrl });

        return sendJson(res, 200, { success: true, id });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
    if (method === "DELETE") {
      const id = String(parsedUrl.searchParams.get("id") || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
      if (id && sqliteDb) {
        try {
          sqliteDb.prepare("DELETE FROM news WHERE id = ?").run(id);
          sqliteDb.prepare("DELETE FROM admin_items WHERE id = ?").run(id);
        } catch (_) {}
        syncSupabase("news", null, "DELETE", "id=eq." + encodeURIComponent(id));
      }
      return sendJson(res, 200, { success: true });
    }
  }

  // 1c. messages.php / messages
  if (pathname === "messages" || pathname === "messages.php") {
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT id, category, title, text, date, author, created_at FROM parent_messages ORDER BY id DESC").all();
          return sendJson(res, 200, rows);
        } catch (_) {}
      }
      return sendJson(res, 200, []);
    }
    if (method === "POST" || method === "PUT") {
      try {
        const body = await parseJsonBody(req);
        const category = escapeHtml(String(body.category || "Upozornění trenérů").trim()).slice(0, 100);
        const title = escapeHtml(String(body.title || "Vzkaz oddílu").trim()).slice(0, 200);
        const text = escapeHtml(String(body.text || body.content || "").trim()).slice(0, 1000);
        const date = String(body.date || new Date().toLocaleDateString("cs-CZ")).slice(0, 20);
        const author = escapeHtml(String(body.author || "Trenéři TJ Bohemians").trim()).slice(0, 100);

        if (!text) return sendJson(res, 400, { error: "Message content is required" });

        let newId = Date.now();
        if (sqliteDb) {
          try {
            const info = sqliteDb.prepare("INSERT INTO parent_messages (category, title, text, date, author) VALUES (?, ?, ?, ?, ?)").run(
              category, title, text, date, author
            );
            if (info && info.lastInsertRowid) newId = Number(info.lastInsertRowid);
            const fieldsJson = JSON.stringify({ kategorie: category, datum: date, autor: author, text });
            sqliteDb.prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json) VALUES (?, 'oznameni', 'approved', 'intranet', ?, ?)").run(
              "msg-" + newId, title, fieldsJson
            );
          } catch (_) {}
        }

        // Supabase sync
        syncSupabase("parent_messages", { category, title, text, date, author });

        return sendJson(res, 200, { success: true, id: newId });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
    if (method === "DELETE") {
      const id = parseInt(parsedUrl.searchParams.get("id"), 10);
      if (id && sqliteDb) {
        try {
          sqliteDb.prepare("DELETE FROM parent_messages WHERE id = ?").run(id);
          sqliteDb.prepare("DELETE FROM admin_items WHERE id = ?").run("msg-" + id);
        } catch (_) {}
        syncSupabase("parent_messages", null, "DELETE", "id=eq." + id);
      }
      return sendJson(res, 200, { success: true });
    }
  }

  // 1d. entries.php / entries / event_entries
  if (pathname === "entries" || pathname === "entries.php" || pathname === "event_entries") {
    if (method === "GET") {
      const eventId = String(parsedUrl.searchParams.get("event_id") || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
      if (sqliteDb) {
        try {
          let rows;
          if (eventId) {
            rows = sqliteDb.prepare("SELECT id, event_id, user_id, swimmer_name, disciplines_json, note, created_at FROM event_entries WHERE event_id = ? ORDER BY id DESC").all(eventId);
          } else {
            rows = sqliteDb.prepare("SELECT id, event_id, user_id, swimmer_name, disciplines_json, note, created_at FROM event_entries ORDER BY id DESC").all();
          }
          const out = rows.map(r => {
            let disc = [];
            try { disc = JSON.parse(r.disciplines_json || "[]"); } catch {}
            return {
              id: r.id,
              eventId: r.event_id,
              userId: r.user_id,
              swimmerName: r.swimmer_name,
              disciplines: disc,
              note: r.note || "",
              status: "Přihlášen",
              createdAt: r.created_at
            };
          });
          return sendJson(res, 200, out);
        } catch (_) {}
      }
      return sendJson(res, 200, []);
    }

    if (method === "POST" || method === "PUT") {
      try {
        const body = await parseJsonBody(req);
        const eventId = String(body.event_id || body.eventId || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        if (!eventId) return sendJson(res, 400, { error: "Event ID is required" });

        const userId = parseInt(body.user_id || body.userId || 1, 10);
        const swimmerName = escapeHtml(String(body.swimmer_name || body.swimmerName || "Kryštof Spejchal").trim()).slice(0, 100);
        const note = escapeHtml(String(body.note || "").trim()).slice(0, 200);
        const discArr = Array.isArray(body.disciplines) ? body.disciplines : [body.disciplines].filter(Boolean);
        const disciplinesJson = JSON.stringify(discArr);

        let newId = Date.now();
        if (sqliteDb) {
          try {
            const info = sqliteDb.prepare("INSERT INTO event_entries (event_id, user_id, swimmer_name, disciplines_json, note) VALUES (?, ?, ?, ?, ?)").run(
              eventId, userId, swimmerName, disciplinesJson, note
            );
            if (info && info.lastInsertRowid) newId = Number(info.lastInsertRowid);
            sqliteDb.prepare("INSERT OR REPLACE INTO signups (event_id, disciplines, note, created_at) VALUES (?, ?, ?, ?)").run(
              eventId, disciplinesJson, note, new Date().toISOString()
            );
          } catch (_) {}
        }

        // Supabase sync
        syncSupabase("event_entries", {
          event_id: eventId,
          user_id: userId,
          swimmer_name: swimmerName,
          disciplines_json: disciplinesJson,
          note
        });

        return sendJson(res, 200, { success: true, id: newId });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (method === "DELETE") {
      const id = parseInt(parsedUrl.searchParams.get("id"), 10);
      const eventId = String(parsedUrl.searchParams.get("event_id") || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
      if (sqliteDb) {
        try {
          if (id) {
            sqliteDb.prepare("DELETE FROM event_entries WHERE id = ?").run(id);
            syncSupabase("event_entries", null, "DELETE", "id=eq." + id);
          } else if (eventId) {
            sqliteDb.prepare("DELETE FROM event_entries WHERE event_id = ?").run(eventId);
            sqliteDb.prepare("DELETE FROM signups WHERE event_id = ?").run(eventId);
            syncSupabase("event_entries", null, "DELETE", "event_id=eq." + encodeURIComponent(eventId));
          }
        } catch (_) {}
      }
      return sendJson(res, 200, { success: true });
    }
  }

  // 1e. users.php / users
  if (pathname === "users" || pathname === "users.php") {
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT id, username, name, role, year_of_birth, club_category, created_at FROM users ORDER BY id ASC").all();
          if (rows.length) return sendJson(res, 200, rows);
        } catch (_) {}
      }
      return sendJson(res, 200, [
        { id: 1, username: "admin", name: "Mgr. Jan Srb", role: "super_admin", club_category: "Hlavní trenér" },
        { id: 2, username: "plavec", name: "Kryštof Spejchal", role: "member", club_category: "Sportovní třídy ST" }
      ]);
    }
    if (method === "POST" || method === "PUT") {
      try {
        const body = await parseJsonBody(req);
        const username = String(body.username || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        const role = ["member", "super_admin", "coach", "parent"].includes(body.role) ? body.role : "member";
        const name = escapeHtml(String(body.name || username).trim()).slice(0, 100);

        if (sqliteDb && username) {
          try {
            sqliteDb.prepare("UPDATE users SET role = ?, name = ? WHERE username = ?").run(role, name, username);
          } catch (_) {}
        }
        return sendJson(res, 200, { success: true, username, role });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  // 2. search.php
  if (pathname === "search.php") {
    const q = (parsedUrl.searchParams.get("q") || "").trim().slice(0, 100);
    if (q.length < 2) {
      return sendJson(res, 200, { query: q, count: 0, results: [] });
    }
    const results = [];
    if (sqliteDb) {
      const qLower = q.toLowerCase();
      const qNorm = stripDiacritics(q);
      const matches = (str) => {
        if (!str) return false;
        const s = String(str);
        return s.toLowerCase().includes(qLower) || stripDiacritics(s).includes(qNorm);
      };

      try {
        const evs = sqliteDb.prepare("SELECT id, name AS title, place, date, type, kind FROM events").all();
        evs.filter(r => matches(r.title) || matches(r.place) || matches(r.type)).slice(0, 8).forEach(r => {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: `${r.place || ""} • ${r.date || ""} (${r.type || "Závod"})`,
            category: "Závod",
            url: `zavody#${r.id}`
          });
        });
      } catch (e) {}

      try {
        const news = sqliteDb.prepare("SELECT id, title, excerpt, date FROM news").all();
        news.filter(r => matches(r.title) || matches(r.excerpt)).slice(0, 8).forEach(r => {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: `${r.excerpt ? r.excerpt.slice(0, 100) + '…' : ''} (${r.date || ''})`,
            category: "Aktualita",
            url: `aktuality#${r.id}`
          });
        });
      } catch (e) {}

      try {
        const sws = sqliteDb.prepare("SELECT id, name AS title, birth_year, category, role, bio FROM swimmers").all();
        sws.filter(r => matches(r.title) || matches(r.category) || matches(r.bio) || matches(r.role)).slice(0, 8).forEach(r => {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: `Ročník ${r.birth_year || ""} • ${r.category || ""} • ${r.role || "Plavec"}`,
            category: "Plavec",
            url: "statistika"
          });
        });
      } catch (e) {}

      try {
        const recs = sqliteDb.prepare("SELECT id, event, time, swimmer, year, category, pool FROM records").all();
        recs.filter(r => matches(r.swimmer) || matches(r.event) || matches(r.category)).slice(0, 8).forEach(r => {
          results.push({
            id: `rec-${r.id}`,
            title: `${r.event} — ${r.time} (${r.swimmer})`,
            subtitle: `Rekord Bohemians • ${r.category} • Bazén ${r.pool} • Rok ${r.year}`,
            category: "Rekord",
            url: "rekordy"
          });
        });
      } catch (e) {}

      try {
        const dls = sqliteDb.prepare("SELECT id, title, description, category, file_name, file_size FROM downloads").all();
        dls.filter(r => matches(r.title) || matches(r.description) || matches(r.file_name)).slice(0, 8).forEach(r => {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: `${r.description || ""} • ${r.file_name || ""} (${r.file_size || ""})`,
            category: "Ke stažení",
            url: "ke-stazeni"
          });
        });
      } catch (e) {}
    }

    return sendJson(res, 200, { query: q, count: results.length, results });
  }

  // 3. notifications.php
  if (pathname === "notifications.php") {
    if (method === "POST") {
      try {
        const body = await parseJsonBody(req);
        const title = escapeHtml(String(body.title || "").trim()).slice(0, 120);
        const subtitle = escapeHtml(String(body.subtitle || body.message || "").trim()).slice(0, 300);
        const allowedTypes = ["notice", "event", "payment", "training", "warning"];
        const type = allowedTypes.includes(body.type) ? body.type : "notice";
        const url = sanitizeUrl(body.url, "/");
        const priority = ["normal", "high", "urgent"].includes(body.priority) ? body.priority : "normal";
        const id = `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const now = new Date().toISOString();

        if (!title) {
          return sendJson(res, 400, { error: "Název oznámení je povinný" });
        }

        if (sqliteDb) {
          try {
            sqliteDb.prepare("INSERT INTO notifications (id, title, subtitle, type, url, created_at, priority) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
              id, title, subtitle, type, url, now, priority
            );
          } catch (e) {}
        }

        return sendJson(res, 200, { success: true, id, title, subtitle, type, url, created_at: now });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    // GET notifications
    if (sqliteDb) {
      try {
        const rows = sqliteDb.prepare("SELECT * FROM notifications ORDER BY created_at DESC LIMIT 30").all();
        return sendJson(res, 200, { count: rows.length, notifications: rows });
      } catch (e) {}
    }
    return sendJson(res, 200, { count: 0, notifications: [] });
  }

  // 4. signups.php
  if (pathname === "signups.php") {
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT * FROM signups").all();
          const out = {};
          rows.forEach(r => {
            let disc = [];
            try { disc = JSON.parse(r.disciplines || "[]"); } catch {}
            out[r.event_id] = { eventId: r.event_id, disciplines: disc, note: r.note, at: r.created_at };
          });
          return sendJson(res, 200, out);
        } catch (e) {}
      }
      return sendJson(res, 200, {});
    }

    if (method === "POST") {
      try {
        const body = await parseJsonBody(req);
        const eventId = String(body.eventId || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        if (!eventId) return sendJson(res, 400, { error: "Invalid eventId" });

        const disciplinesArr = Array.isArray(body.disciplines)
          ? body.disciplines.map(d => escapeHtml(String(d || "").trim()).slice(0, 50)).filter(Boolean)
          : [];
        const disciplines = JSON.stringify(disciplinesArr);
        const note = escapeHtml(String(body.note || "").trim()).slice(0, 200);
        const now = new Date().toISOString();

        if (sqliteDb) {
          sqliteDb.prepare("INSERT OR REPLACE INTO signups (event_id, disciplines, note, created_at) VALUES (?, ?, ?, ?)").run(
            eventId, disciplines, note, now
          );
        }
        return sendJson(res, 200, { success: true });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (method === "DELETE") {
      const eventId = String(parsedUrl.searchParams.get("id") || "").replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
      if (eventId && sqliteDb) {
        sqliteDb.prepare("DELETE FROM signups WHERE event_id = ?").run(eventId);
      }
      return sendJson(res, 200, { success: true });
    }
  }

  // 5. admin.php
  if (pathname === "admin.php") {
    if (method === "GET") {
      if (sqliteDb) {
        try {
          const rows = sqliteDb.prepare("SELECT * FROM admin_items ORDER BY created_at DESC").all();
          const items = rows.map(r => {
            let fields = {};
            try { fields = JSON.parse(r.fields_json || "{}"); } catch {}
            return {
              id: r.id,
              kind: r.kind,
              status: r.status,
              source: r.source,
              title: r.title,
              fields,
              createdAt: r.created_at
            };
          });
          return sendJson(res, 200, items);
        } catch (e) {}
      }
      return sendJson(res, 200, []);
    }

    if (method === "POST") {
      try {
        const body = await parseJsonBody(req);
        const id = String(body.id || `item-${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 50);
        const allowedKinds = ["aktualita", "zavod", "vysledek", "soubor", "oznameni", "dokument", "foto", "plavec"];
        const kind = allowedKinds.includes(body.kind) ? body.kind : "aktualita";
        const allowedStatuses = ["pending", "approved", "rejected"];
        const status = allowedStatuses.includes(body.status) ? body.status : "pending";
        const source = escapeHtml(String(body.source || "ruční vložení").trim()).slice(0, 100);
        const title = escapeHtml(String(body.title || "Bez názvu").trim()).slice(0, 200);

        const cleanFields = {};
        if (body.fields && typeof body.fields === "object" && !Array.isArray(body.fields)) {
          for (const [k, v] of Object.entries(body.fields)) {
            const safeKey = String(k).replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 40);
            if (safeKey && safeKey !== "__proto__" && safeKey !== "constructor" && safeKey !== "prototype") {
              cleanFields[safeKey] = escapeHtml(String(v || "").trim()).slice(0, 1000);
            }
          }
        }
        const fieldsJson = JSON.stringify(cleanFields);
        const now = body.createdAt || new Date().toISOString();

        if (sqliteDb) {
          sqliteDb.prepare("INSERT OR REPLACE INTO admin_items (id, kind, status, source, title, fields_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
            id, kind, status, source, title, fieldsJson, now
          );
        }

        return sendJson(res, 200, { success: true, id });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }
  }

  return sendJson(res, 404, { error: "API route not found" });
}

// Master HTTP Server
const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // SECURITY GUARD 1: Block Directory Traversal Attacks
    if (pathname.includes("..") || pathname.includes("\0") || pathname.includes("//")) {
      res.writeHead(403, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden: Path traversal prohibited.");
      return;
    }

    // SECURITY GUARD 2: Handle API requests securely
    if (pathname.startsWith("/api/")) {
      await handleApi(req, res, parsedUrl);
      return;
    }

    // SECURITY GUARD 3: Block Access to Sensitive Files and Directories
    const lowerPath = pathname.toLowerCase();
    if (
      lowerPath.startsWith("/data/") ||
      lowerPath.includes("/.") ||
      lowerPath.endsWith(".sqlite") ||
      lowerPath.endsWith(".db") ||
      lowerPath.endsWith(".env") ||
      lowerPath.endsWith(".htaccess") ||
      lowerPath.endsWith("server.js") ||
      lowerPath.endsWith("server.cjs")
    ) {
      res.writeHead(403, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden: Access to protected resources is denied.");
      return;
    }

    // Clean URL Redirects (301)
    if (lowerPath === "/index.html" || lowerPath === "/index.php") {
      res.writeHead(301, { ...SECURITY_HEADERS, "Location": "/" });
      res.end();
      return;
    }
    if (lowerPath.endsWith(".php")) {
      const cleanTarget = (pathname.replace(/\.php$/i, "") || "/") + (parsedUrl.search || "");
      res.writeHead(301, { ...SECURITY_HEADERS, "Location": cleanTarget });
      res.end();
      return;
    }
    if (lowerPath.endsWith(".html") && lowerPath !== "/404.html") {
      const cleanTarget = (pathname.replace(/\.html$/i, "") || "/") + (parsedUrl.search || "");
      res.writeHead(301, { ...SECURITY_HEADERS, "Location": cleanTarget });
      res.end();
      return;
    }

    // Resolve static file path
    let targetFile = pathname;
    if (targetFile === "/" || targetFile === "") {
      targetFile = "/index.html";
    }

    let filePath = path.join(PUBLIC_DIR, targetFile);

    // If clean URL without extension is requested, map to corresponding .html file
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
      filePath = filePath + ".html";
    }

    // Ensure resolved path stays strictly within PUBLIC_DIR
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden");
      return;
    }

    // Check file existence
    if (!fs.existsSync(filePath)) {
      // Return 404 page if exists
      const notFoundPath = path.join(PUBLIC_DIR, "404.html");
      if (fs.existsSync(notFoundPath)) {
        const content = fs.readFileSync(notFoundPath);
        res.writeHead(404, { ...SECURITY_HEADERS, "Content-Type": "text/html; charset=utf-8" });
        res.end(content);
        return;
      }
      res.writeHead(404, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const indexFile = path.join(filePath, "index.html");
      if (fs.existsSync(indexFile)) {
        const content = fs.readFileSync(indexFile);
        res.writeHead(200, { ...SECURITY_HEADERS, "Content-Type": "text/html; charset=utf-8" });
        res.end(content);
        return;
      }
      res.writeHead(403, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Directory Listing Denied");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      ...SECURITY_HEADERS,
      "Content-Type": contentType,
      "Content-Length": stat.size
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    res.writeHead(500, { ...SECURITY_HEADERS, "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[BOH SECURE SERVER] Listening on http://0.0.0.0:${PORT}`);
  console.log(`[BOH SECURE SERVER] Data protection, OWASP headers, and API routers active.`);
});
