/**
 * TJ Bohemians Praha — Utilitarian Intranet Portal
 * Inspired by Linear, Vercel, and shadcn/ui.
 * Anti-slop, high-contrast, dense utilitarian architecture with RBAC and Inline CMS.
 */

(function () {
  "use strict";

  let activeTab = "overview"; // 'overview' | 'schedule' | 'documents' | 'entries'
  let currentAuth = { role: "member", editMode: false, userName: "Kryštof Spejchal", userEmail: "krystof.spejchal@boh.cz" };
  let editingAnnouncementId = null;
  let editingScheduleId = null;
  let editingDocId = null;
  let editingBlockKey = null;

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeLenexXml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ============================================================================
  // MAIN RENDER CONTROLLER
  // ============================================================================
  async function renderIntranetPortal() {
    const main = document.getElementById("intranet-main");
    if (!main) return;

    if (!window.IntranetApi) {
      console.error("[Intranet] IntranetApi not loaded");
      return;
    }

    currentAuth = await window.IntranetApi.getAuth();

    // Toggle body edit mode class for CSS targeting
    if (currentAuth.role === "super_admin" && currentAuth.editMode) {
      document.body.classList.add("intranet-edit-mode");
    } else {
      document.body.classList.remove("intranet-edit-mode");
    }

    // Fetch data concurrently
    const [blocks, announcements, schedule, documents, myEntries] = await Promise.all([
      window.IntranetApi.getContentBlocks(),
      window.IntranetApi.getAnnouncements(),
      window.IntranetApi.getSchedule(),
      window.IntranetApi.getDocuments(),
      window.IntranetApi.getMyEntries()
    ]);

    const isEditor = currentAuth.role === "super_admin" && currentAuth.editMode;

    main.innerHTML = `
      <div class="intranet-linear min-h-screen border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-sans pb-24">

        <!-- Top Utility Status Bar -->
        <div class="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2 sm:px-6">
          <div class="mx-auto flex max-w-7xl items-center justify-between text-xs">
            <div class="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <span class="font-semibold text-zinc-900 dark:text-zinc-100">TJ BOHEMIANS</span>
              <span>/</span>
              <span class="font-medium text-emerald-600 dark:text-emerald-400">INTRANET PORTÁL</span>
              <span class="hidden sm:inline">/</span>
              <span class="hidden sm:inline font-mono">v2.4-utilitarian</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full ${currentAuth.role === 'super_admin' ? (currentAuth.editMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500') : 'bg-zinc-400'}"></span>
                <span class="font-mono text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  ${currentAuth.role === 'super_admin' ? (currentAuth.editMode ? 'SUPER ADMIN (EDIT MODE)' : 'SUPER ADMIN (READ ONLY)') : 'MEMBER (READ ONLY)'}
                </span>
              </div>
              <span class="text-zinc-300 dark:text-zinc-700">|</span>
              <span class="text-zinc-600 dark:text-zinc-400 font-medium">${escapeHtml(currentAuth.userName)}</span>
            </div>
          </div>
        </div>

        <!-- Portal Header Banner -->
        <header class="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-6 sm:px-6">
          <div class="mx-auto max-w-7xl">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="inline-flex items-center rounded-md border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    Členská sekce
                  </span>
                  <span class="text-xs text-zinc-500">80 let tradice (1946–2026)</span>
                </div>
                
                <!-- Editable Title -->
                ${renderEditableBlock("portal_title", blocks.portal_title, "h1", "text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900 dark:text-zinc-50", isEditor)}
                
                <!-- Editable Subtitle -->
                ${renderEditableBlock("portal_subtitle", blocks.portal_subtitle, "p", "mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl", isEditor)}
              </div>

              <!-- Quick Quick-Action Stats -->
              <div class="flex items-center gap-2">
                <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 text-center shadow-xs min-w-[100px]">
                  <span class="block text-xs font-semibold text-zinc-500">Aktivní závody</span>
                  <span class="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">${schedule.filter(s => s.status === 'open').length}</span>
                </div>
                <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2.5 text-center shadow-xs min-w-[100px]">
                  <span class="block text-xs font-semibold text-zinc-500">Moje přihlášky</span>
                  <span class="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">${myEntries.length}</span>
                </div>
              </div>
            </div>

            <!-- Urgent Announcement Banner -->
            ${blocks.portal_alert_banner ? `
              <div class="mt-4 flex items-start gap-2.5 rounded-md border border-amber-300 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-900 dark:text-amber-200">
                <svg class="h-4 w-4 shrink-0 text-amber-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <div class="flex-1">
                  ${renderEditableBlock("portal_alert_banner", blocks.portal_alert_banner, "span", "font-medium leading-relaxed", isEditor)}
                </div>
              </div>
            ` : ''}
          </div>
        </header>

        <!-- Segmented Tab Navigation -->
        <div class="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 sm:px-6 sticky top-14 z-30">
          <div class="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto py-2">
            <button class="intranet-tab-btn px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'overview' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900'}" data-tab="overview">
              Přehled &amp; Oznámení (${announcements.length})
            </button>
            <button class="intranet-tab-btn px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'schedule' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900'}" data-tab="schedule">
              Harmonogram &amp; Závody (${schedule.length})
            </button>
            <button class="intranet-tab-btn px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'documents' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900'}" data-tab="documents">
              Dokumenty &amp; Směrnice (${documents.length})
            </button>
            <button class="intranet-tab-btn px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'entries' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900'}" data-tab="entries">
              Moje přihlášky (${myEntries.length})
            </button>
            <button class="intranet-tab-btn px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === 'payments' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900'}" data-tab="payments">
              Platby &amp; QR
            </button>
          </div>
        </div>

        <!-- Main Scannable Content Grid -->
        <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          ${renderTabContent({ activeTab, announcements, schedule, documents, myEntries, isEditor, blocks })}
        </main>
      </div>

      <!-- Compact Dev Role Switcher Toolbar Dock -->
      ${renderDevRoleSwitcher(currentAuth)}

      <!-- Modals for CMS Creation -->
      <div id="cms-modal-container"></div>
    `;

    bindIntranetEvents(main);
  }

  // ============================================================================
  // TAB CONTENT RENDERERS
  // ============================================================================
  function renderTabContent({ activeTab, announcements, schedule, documents, myEntries, isEditor, blocks }) {
    if (activeTab === "schedule") {
      return renderScheduleSection(schedule, isEditor);
    }
    if (activeTab === "documents") {
      return renderDocumentsSection(documents, isEditor);
    }
    if (activeTab === "entries") {
      return renderEntriesSection(myEntries, schedule);
    }
    if (activeTab === "payments") {
      return renderPaymentsSection();
    }
    // Default: 'overview' (Dense 2-Column Dashboard)
    return `
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <!-- Left / Primary: Announcements Bulletin (8 cols) -->
        <section class="lg:col-span-8 space-y-6">
          <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div>
              <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Oddílová oznámení &amp; Oběžník</h2>
              <p class="text-xs text-zinc-500">Oficiální instrukce vedení oddílu a trenérů</p>
            </div>
            ${isEditor ? `
              <div class="flex items-center gap-2">
                <button id="add-news-modal-btn" class="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer shadow-xs">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v10a2 2 0 0 1-2 2z"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
                  <span>Publikovat aktualitu</span>
                </button>
                <button id="add-announcement-btn" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  <span>Nové oznámení</span>
                </button>
              </div>
            ` : ''}
          </div>

          <div class="space-y-3.5">
            ${announcements.map(ann => renderAnnouncementCard(ann, isEditor)).join("")}
          </div>
        </section>

        <!-- Right / Secondary: Quick Links, Schedule Teaser, Coaches (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          
          <!-- Next Upcoming Event Widget -->
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">Nejbližší závody</span>
              <a href="#" class="switch-tab-link text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline" data-target="schedule">Všechny závody →</a>
            </div>
            ${schedule.length > 0 ? `
              <div class="border-l-2 border-emerald-500 pl-3 py-0.5">
                <h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">${escapeHtml(schedule[0].name)}</h4>
                <div class="mt-1 text-xs text-zinc-500 space-y-0.5">
                  <p>📅 Datum: <span class="font-medium text-zinc-700 dark:text-zinc-300">${escapeHtml(schedule[0].date)}</span></p>
                  <p>🏊 Bazén: <span class="font-medium text-zinc-700 dark:text-zinc-300">${escapeHtml(schedule[0].pool)}</span></p>
                  <p>⏳ Uzávěrka: <span class="font-semibold text-amber-600 dark:text-amber-400">${escapeHtml(schedule[0].deadline)}</span></p>
                </div>
              </div>
            ` : '<p class="text-xs text-zinc-500">Žádné nadcházející závody.</p>'}
          </div>

          <!-- Quick Documents Widget -->
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">Časté dokumenty</span>
              <a href="#" class="switch-tab-link text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline" data-target="documents">Všechny PDF →</a>
            </div>
            <ul class="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
              ${documents.slice(0, 3).map(doc => `
                <li class="py-2.5 flex items-center justify-between">
                  <div class="truncate pr-2">
                    <p class="font-medium text-zinc-800 dark:text-zinc-200 truncate">${escapeHtml(doc.title)}</p>
                    <span class="text-[11px] text-zinc-400 font-mono">${escapeHtml(doc.format)} · ${escapeHtml(doc.size)}</span>
                  </div>
                  <a href="${escapeHtml(doc.url)}" download class="shrink-0 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">Stáhnout</a>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- QR Payment Card (ČSOB & VS 214) -->
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs" id="intranet-qr-payment-card">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">Členské příspěvky</span>
              <span class="rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">VS 214</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white p-2 shadow-inner">
                <img src="assets/QR_plavani214.jpg" alt="QR kód pro platbu příspěvků TJ Bohemians Praha VS 214" width="140" height="140" class="h-32 w-32 object-contain">
              </div>
              <p class="mt-2 text-[11px] text-zinc-500">Naskenujte v mobilním bankovnictví (ČSOB / SPAYD)</p>
            </div>
            <div class="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
              <div class="py-1.5 flex justify-between items-center">
                <span class="text-zinc-500">Účet:</span>
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100">351416278/0300</span>
              </div>
              <div class="py-1.5 flex justify-between items-center">
                <span class="text-zinc-500">IBAN:</span>
                <span class="font-mono text-[10px] font-semibold text-zinc-900 dark:text-zinc-100 select-all">CZ3603000000000351416278</span>
              </div>
              <div class="py-1.5 flex justify-between items-center">
                <span class="text-zinc-500">Variabilní symbol:</span>
                <span class="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">214</span>
              </div>
            </div>
            <div class="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
              <span class="text-[10px] text-zinc-400">Podzim: do 15. 10.</span>
              <a href="#" class="switch-tab-link text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline" data-target="payments">Podrobnosti plateb →</a>
            </div>
          </div>

          <!-- Coaches Contacts -->
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs text-xs">
            <span class="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">Trenéři oddílu</span>
            <div class="space-y-2 text-zinc-600 dark:text-zinc-300">
              <div class="flex justify-between">
                <span class="font-medium text-zinc-900 dark:text-zinc-100">Mgr. Jan Srb</span>
                <a href="mailto:jan.srb@czechswimming.cz" class="text-emerald-600 hover:underline">jan.srb@czechswimming.cz</a>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-zinc-900 dark:text-zinc-100">Martin Břenda</span>
                <span class="text-zinc-500">trenér ST, GY</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-zinc-900 dark:text-zinc-100">Soňa Nováková</span>
                <span class="text-zinc-500">trenérka ODA, ODB</span>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
              Domovské bazény: Podolí (venkovní 50m / vnitřní 50m) &amp; Sokol Vinohrady (25m).
            </div>
          </div>

        </aside>
      </div>
    `;
  }

  // ============================================================================
  // ANNOUNCEMENTS CARD (Inline Editable or Static)
  // ============================================================================
  function renderAnnouncementCard(ann, isEditor) {
    const isEditing = editingAnnouncementId === String(ann.id);

    const priorityBadge = ann.priority === "high"
      ? '<span class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800">DŮLEŽITÉ</span>'
      : (ann.priority === "normal"
        ? '<span class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">ZÁVODY</span>'
        : '<span class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">INFO</span>');

    if (isEditing) {
      return `
        <div class="rounded-lg border-2 border-emerald-500 bg-white dark:bg-zinc-950 p-4 shadow-sm" id="edit-ann-${ann.id}">
          <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">✏️ Upravit oznámení (Super Admin)</div>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Nadpis</label>
              <input type="text" id="ann-input-title-${ann.id}" value="${escapeHtml(ann.title)}" class="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Kategorie</label>
                <input type="text" id="ann-input-cat-${ann.id}" value="${escapeHtml(ann.category)}" class="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100">
              </div>
              <div>
                <label class="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Priorita</label>
                <select id="ann-input-prio-${ann.id}" class="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100">
                  <option value="high" ${ann.priority === 'high' ? 'selected' : ''}>DŮLEŽITÉ (Červená)</option>
                  <option value="normal" ${ann.priority === 'normal' ? 'selected' : ''}>ZÁVODY (Modrá)</option>
                  <option value="low" ${ann.priority === 'low' ? 'selected' : ''}>INFO (Neutrální)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Obsah textu</label>
              <textarea id="ann-input-content-${ann.id}" rows="3" class="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500">${escapeHtml(ann.content)}</textarea>
            </div>
            <div class="flex items-center justify-end gap-2 pt-1">
              <button class="ann-cancel-btn px-3 py-1 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" data-id="${ann.id}">Zrušit</button>
              <button class="ann-save-btn px-3 py-1 text-xs rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors" data-id="${ann.id}">Uložit změny</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <article class="cms-editable-block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 transition-all duration-150 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              ${priorityBadge}
              <span class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">${escapeHtml(ann.category)}</span>
              <span class="text-zinc-300 dark:text-zinc-700">·</span>
              <time class="text-[11px] text-zinc-500 font-mono">${escapeHtml(ann.date)}</time>
              <span class="text-zinc-300 dark:text-zinc-700">·</span>
              <span class="text-[11px] text-zinc-500">${escapeHtml(ann.author)}</span>
            </div>
            <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">${escapeHtml(ann.title)}</h3>
            <p class="mt-1.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${escapeHtml(ann.content)}</p>
          </div>

          ${isEditor ? `
            <div class="cms-edit-badge shrink-0 flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 rounded-md p-0.5 bg-zinc-50 dark:bg-zinc-900">
              <button class="ann-edit-btn p-1 text-zinc-500 hover:text-emerald-600 hover:bg-white dark:hover:bg-zinc-800 rounded transition-colors" data-id="${ann.id}" title="Upravit inline">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </button>
              <button class="ann-delete-btn p-1 text-zinc-500 hover:text-red-600 hover:bg-white dark:hover:bg-zinc-800 rounded transition-colors" data-id="${ann.id}" title="Smazat">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }

  // ============================================================================
  // SCHEDULE SECTION (Utilitarian Dense Table)
  // ============================================================================
  function renderScheduleSection(schedule, isEditor) {
    return `
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Harmonogram &amp; Kalendář závodů 2026/27</h2>
            <p class="text-xs text-zinc-500">Termíny, bazény, kategorie a uzávěrky oddílových přihlášek</p>
          </div>
          ${isEditor ? `
            <button id="add-schedule-btn" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Přidat závod</span>
            </button>
          ` : ''}
        </div>

        <div class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
          <table class="w-full text-left border-collapse intranet-dense-table">
            <thead>
              <tr class="bg-zinc-50 dark:bg-zinc-900/60">
                <th>Název závodu</th>
                <th>Termín</th>
                <th>Bazén</th>
                <th>Kategorie</th>
                <th>Uzávěrka přihlášek</th>
                <th>Stav</th>
                <th class="text-right">Akce</th>
              </tr>
            </thead>
            <tbody>
              ${schedule.map(s => `
                <tr class="cms-editable-block hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                  <td class="font-bold text-zinc-900 dark:text-zinc-100">
                    ${escapeHtml(s.name)}
                  </td>
                  <td class="font-mono text-zinc-600 dark:text-zinc-400">${escapeHtml(s.date)}</td>
                  <td>${escapeHtml(s.pool)}</td>
                  <td><span class="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[11px] font-medium">${escapeHtml(s.category)}</span></td>
                  <td class="font-semibold text-amber-600 dark:text-amber-400 font-mono">${escapeHtml(s.deadline)}</td>
                  <td>
                    ${s.status === 'open' 
                      ? '<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Otevřeno</span>' 
                      : '<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400"><span class="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>V přípravě</span>'}
                  </td>
                  <td class="text-right">
                    <div class="inline-flex items-center gap-1.5">
                      <button class="register-event-btn inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer" data-id="${s.id}" data-name="${escapeHtml(s.name)}">
                        Přihlásit se
                      </button>
                      ${isEditor ? `
                        <button class="export-csps-btn p-1 text-zinc-400 hover:text-emerald-600 rounded transition-colors" data-id="${s.id}" data-name="${escapeHtml(s.name)}" title="Exportovat přihlášky pro ČSPS (.csv)">
                          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        </button>
                        <button class="export-lenex-btn p-1 text-zinc-400 hover:text-emerald-600 rounded transition-colors" data-id="${s.id}" data-name="${escapeHtml(s.name)}" title="Exportovat Lenex 3.0 (XML)">
                          <svg class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </button>
                        <button class="sch-delete-btn p-1 text-zinc-400 hover:text-red-600 rounded transition-colors" data-id="${s.id}" title="Smazat závod">
                          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  // ============================================================================
  // DOCUMENTS SECTION
  // ============================================================================
  function renderDocumentsSection(documents, isEditor) {
    return `
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Interní dokumenty &amp; Směrnice oddílu</h2>
            <p class="text-xs text-zinc-500">Formuláře zdravotní způsobilosti, rozpis tréninků, platby a provozní řády</p>
          </div>
          ${isEditor ? `
            <button id="add-doc-btn" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Přidat dokument</span>
            </button>
          ` : ''}
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          ${documents.map(doc => `
            <div class="cms-editable-block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-600 dark:text-zinc-400">${escapeHtml(doc.category)}</span>
                  <span class="font-mono text-[11px] text-zinc-400">${escapeHtml(doc.format)} · ${escapeHtml(doc.size)}</span>
                </div>
                <h4 class="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug">${escapeHtml(doc.title)}</h4>
                <p class="mt-1 text-[11px] text-zinc-400">Aktualizováno: ${escapeHtml(doc.updated)}</p>
              </div>

              <div class="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <a href="${escapeHtml(doc.url)}" download class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Stáhnout PDF</span>
                </a>

                ${isEditor ? `
                  <button class="doc-delete-btn p-1 text-zinc-400 hover:text-red-600 rounded transition-colors" data-id="${doc.id}" title="Smazat dokument">
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                ` : ''}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  // ============================================================================
  // MY ENTRIES SECTION
  // ============================================================================
  function renderEntriesSection(myEntries, schedule) {
    return `
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Moje přihlášky na závody &amp; Stav</h2>
            <p class="text-xs text-zinc-500">Přehled přihlášených disciplín a stav schválení trenérem</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="export-all-csps-btn" class="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer shadow-xs">
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Export ČSPS (.csv)</span>
            </button>
            <button id="export-lenex-btn" class="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer shadow-xs">
              <svg class="h-3.5 w-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span>Export Lenex 3.0 (.xml)</span>
            </button>
          </div>
        </div>

        ${myEntries.length === 0 ? `
          <div class="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center text-xs text-zinc-500">
            Zatím nemáte žádné aktivní přihlášky. Přejděte do <a href="#" class="switch-tab-link font-semibold text-emerald-600 hover:underline" data-target="schedule">Harmonogramu závodů</a> a přihlaste se.
          </div>
        ` : `
          <div class="space-y-3">
            ${myEntries.map(e => `
              <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="inline-flex items-center gap-1 rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      ${escapeHtml(e.status)}
                    </span>
                    <span class="font-mono text-[11px] text-zinc-400">Podáno: ${escapeHtml(e.submittedAt)}</span>
                  </div>
                  <h4 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">${escapeHtml(e.eventName)}</h4>
                  <div class="mt-1 flex flex-wrap gap-1.5">
                    ${(e.disciplines || []).map(d => `<span class="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300">${escapeHtml(d)}</span>`).join("")}
                  </div>
                </div>

                <div class="shrink-0 flex items-center gap-2">
                  <button class="cancel-entry-btn rounded-md border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 hover:border-red-300 transition-colors" data-id="${e.id}">
                    Odhlásit
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </section>
    `;
  }

  // ============================================================================
  // EDITABLE CONTENT BLOCK HELPER
  // ============================================================================
  function renderEditableBlock(key, value, tag, classes, isEditor) {
    if (editingBlockKey === key) {
      return `
        <div class="my-1.5 flex items-center gap-2">
          <input type="text" id="block-input-${key}" value="${escapeHtml(value)}" class="flex-1 rounded border border-emerald-500 bg-white dark:bg-zinc-900 px-2.5 py-1 text-sm text-zinc-900 dark:text-zinc-100 shadow-xs">
          <button class="block-save-btn rounded bg-emerald-600 px-2 py-1 text-xs font-bold text-white hover:bg-emerald-700" data-key="${key}">OK</button>
          <button class="block-cancel-btn rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-600" data-key="${key}">✕</button>
        </div>
      `;
    }

    if (isEditor) {
      return `
        <${tag} class="${classes} cms-editable-block group inline-flex items-center gap-2 cursor-pointer" data-block-key="${key}" title="Klikněte pro přímou úpravu textu">
          <span>${escapeHtml(value)}</span>
          <span class="cms-edit-badge text-zinc-400 group-hover:text-emerald-600 text-xs font-normal">✎</span>
        </${tag}>
      `;
    }

    return `<${tag} class="${classes}">${escapeHtml(value)}</${tag}>`;
  }

  // ============================================================================
  // DEV ROLE SWITCHER (Compact Floating Dock)
  // ============================================================================
  function renderDevRoleSwitcher(auth) {
    return `
      <aside class="dev-role-dock" aria-label="Dev Role Switcher">
        <span class="text-zinc-400 font-semibold tracking-wider text-[10px]">RBAC:</span>
        <button class="role-btn ${auth.role === 'member' ? 'active' : ''}" data-role="member" title="Přepnout do role Member (plavec/rodič - čistý read-only)">
          Member
        </button>
        <button class="role-btn ${auth.role === 'super_admin' ? 'active' : ''}" data-role="super_admin" title="Přepnout do role Super Admin">
          Super Admin
        </button>

        ${auth.role === 'super_admin' ? `
          <span class="text-zinc-600">|</span>
          <button class="edit-toggle-btn ${auth.editMode ? 'active' : ''}" id="toggle-edit-mode-btn" title="Zapnout/vypnout přímé inline editace CMS">
            <span class="h-1.5 w-1.5 rounded-full ${auth.editMode ? 'bg-white animate-pulse' : 'bg-zinc-500'}"></span>
            <span>Edit Mode: ${auth.editMode ? 'ON' : 'OFF'}</span>
          </button>
        ` : ''}

        <button class="text-zinc-500 hover:text-zinc-300 text-[10px] ml-1" id="reset-seeds-btn" title="Obnovit výchozí testovací data">
          ↺
        </button>
      </aside>
    `;
  }

  // ============================================================================
  // EVENT BINDINGS
  // ============================================================================
  function bindIntranetEvents(main) {
    // 1. Tab switching
    main.querySelectorAll(".intranet-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeTab = btn.getAttribute("data-tab");
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".switch-tab-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        activeTab = link.getAttribute("data-target");
        renderIntranetPortal();
      });
    });

    // 2. Dev Role Switcher events
    document.querySelectorAll(".dev-role-dock .role-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const role = btn.getAttribute("data-role");
        await window.IntranetApi.setRole(role);
        renderIntranetPortal();
      });
    });

    const editToggle = document.getElementById("toggle-edit-mode-btn");
    if (editToggle) {
      editToggle.addEventListener("click", async () => {
        await window.IntranetApi.setEditMode(!currentAuth.editMode);
        renderIntranetPortal();
      });
    }

    const resetBtn = document.getElementById("reset-seeds-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", async () => {
        if (confirm("Opravdu obnovit intranet na výchozí data?")) {
          await window.IntranetApi.resetToSeeds();
          renderIntranetPortal();
        }
      });
    }

    // 3. Inline Announcement Edit
    main.querySelectorAll(".ann-edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        editingAnnouncementId = btn.getAttribute("data-id");
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".ann-cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        editingAnnouncementId = null;
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".ann-save-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const title = (document.getElementById(`ann-input-title-${id}`).value || "").trim();
        const category = (document.getElementById(`ann-input-cat-${id}`).value || "").trim();
        const priority = document.getElementById(`ann-input-prio-${id}`).value;
        const content = (document.getElementById(`ann-input-content-${id}`).value || "").trim();

        await window.IntranetApi.updateAnnouncement(id, { title, category, priority, content });
        editingAnnouncementId = null;
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".ann-delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (confirm("Opravdu smazat toto oznámení?")) {
          await window.IntranetApi.deleteAnnouncement(id);
          renderIntranetPortal();
        }
      });
    });

    // 4. Create Announcement & Publish News Modals
    const addAnnBtn = document.getElementById("add-announcement-btn");
    if (addAnnBtn) {
      addAnnBtn.addEventListener("click", () => {
        openCreateAnnouncementModal();
      });
    }

    const addNewsBtn = document.getElementById("add-news-modal-btn");
    if (addNewsBtn) {
      addNewsBtn.addEventListener("click", async () => {
        const title = prompt("Zadejte titulek nové aktuality pro web Bohemians:", "");
        if (!title || !title.trim()) return;
        const excerpt = prompt("Krátký perex pro úvodní stránku (1-2 věty):", "");
        const author = prompt("Jméno trenéra / autora:", "Jan Srb (hlavní trenér)");
        const content = prompt("Podrobný text zprávy / aktuality:", "");

        await window.IntranetApi.createNewsItem({
          title: title.trim(),
          excerpt: (excerpt || "").trim(),
          author: (author || "Vedení oddílu").trim(),
          content: (content || "").trim(),
          date: new Date().toISOString().slice(0, 10)
        });
        alert(`Aktualita "${title}" byla úspěšně publikována na web i do databáze.`);
        renderIntranetPortal();
      });
    }

    // 4b. CSPS CSV Export Actions
    main.querySelectorAll(".export-csps-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const eventId = btn.getAttribute("data-id");
        await window.IntranetApi.exportCspsCsv(eventId);
      });
    });

    const exportAllCspsBtn = document.getElementById("export-all-csps-btn");
    if (exportAllCspsBtn) {
      exportAllCspsBtn.addEventListener("click", async () => {
        await window.IntranetApi.exportCspsCsv();
      });
    }

    // 4c. Lenex 3.0 XML Export Actions
    main.querySelectorAll(".export-lenex-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const eventId = btn.getAttribute("data-id");
        exportLenexXml(eventId);
      });
    });

    const exportLenexBtn = document.getElementById("export-lenex-btn");
    if (exportLenexBtn) {
      exportLenexBtn.addEventListener("click", () => {
        exportLenexXml();
      });
    }

    // 5. Schedule Actions
    const addSchBtn = document.getElementById("add-schedule-btn");
    if (addSchBtn) {
      addSchBtn.addEventListener("click", () => {
        openCreateScheduleModal();
      });
    }

    main.querySelectorAll(".sch-delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (confirm("Opravdu odstranit tento závod z kalendáře?")) {
          await window.IntranetApi.deleteScheduleItem(id);
          renderIntranetPortal();
        }
      });
    });

    // 6. Register for Event (Member Action)
    main.querySelectorAll(".register-event-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const eventId = btn.getAttribute("data-id");
        const eventName = btn.getAttribute("data-name");
        openSignupDisciplineModal(eventId, eventName);
      });
    });

    // 7. Cancel Entry
    main.querySelectorAll(".cancel-entry-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Opravdu se chcete odhlásit z tohoto závodu?")) {
          await window.IntranetApi.cancelEntry(id);
          renderIntranetPortal();
        }
      });
    });

    // 8. Document Actions
    const addDocBtn = document.getElementById("add-doc-btn");
    if (addDocBtn) {
      addDocBtn.addEventListener("click", () => {
        openCreateDocumentModal();
      });
    }

    main.querySelectorAll(".doc-delete-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (confirm("Opravdu odstranit tento dokument?")) {
          await window.IntranetApi.deleteDocument(id);
          renderIntranetPortal();
        }
      });
    });

    // 9. Editable Content Blocks
    main.querySelectorAll("[data-block-key]").forEach(el => {
      el.addEventListener("click", () => {
        if (!currentAuth.editMode) return;
        editingBlockKey = el.getAttribute("data-block-key");
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".block-cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        editingBlockKey = null;
        renderIntranetPortal();
      });
    });

    main.querySelectorAll(".block-save-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const key = btn.getAttribute("data-key");
        const val = (document.getElementById(`block-input-${key}`).value || "").trim();
        await window.IntranetApi.updateContentBlock(key, val);
        editingBlockKey = null;
        renderIntranetPortal();
      });
    });
  }

  // ============================================================================
  // CREATION MODALS (Clean Utilitarian shadcn Style)
  // ============================================================================
  function openCreateAnnouncementModal() {
    const modalContainer = document.getElementById("cms-modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-lg text-xs space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Vytvořit nové oznámení</h3>
            <button id="modal-close-btn" class="text-zinc-400 hover:text-zinc-600">✕</button>
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nadpis</label>
            <input type="text" id="new-ann-title" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Např. Změna času tréninku v pátek">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Kategorie</label>
              <input type="text" id="new-ann-category" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="Organizační">
            </div>
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Priorita</label>
              <select id="new-ann-priority" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100">
                <option value="high">DŮLEŽITÉ (Červená)</option>
                <option value="normal" selected>ZÁVODY (Modrá)</option>
                <option value="low">INFO (Neutrální)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Autor</label>
            <input type="text" id="new-ann-author" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="Mgr. Jan Srb (hlavní trenér)">
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Text zprávy</label>
            <textarea id="new-ann-content" rows="3" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Detailní popis organizační informace..."></textarea>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button id="modal-cancel-btn" class="px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">Zrušit</button>
            <button id="modal-submit-btn" class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Publikovat</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("modal-close-btn")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("modal-cancel-btn")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("modal-submit-btn")?.addEventListener("click", async () => {
      const title = document.getElementById("new-ann-title").value;
      const category = document.getElementById("new-ann-category").value;
      const priority = document.getElementById("new-ann-priority").value;
      const author = document.getElementById("new-ann-author").value;
      const content = document.getElementById("new-ann-content").value;

      if (!title.trim()) {
        alert("Zadejte prosím nadpis.");
        return;
      }

      await window.IntranetApi.createAnnouncement({ title, category, priority, author, content });
      modalContainer.innerHTML = "";
      renderIntranetPortal();
    });
  }

  function openCreateScheduleModal() {
    const modalContainer = document.getElementById("cms-modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-lg text-xs space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Přidat nový závod / akci</h3>
            <button id="sch-modal-close" class="text-zinc-400 hover:text-zinc-600">✕</button>
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Název závodu</label>
            <input type="text" id="new-sch-name" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Např. Memoriál Zdeňka Vaněčka">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Termín</label>
              <input type="text" id="new-sch-date" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="28. 11. 2026">
            </div>
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bazén</label>
              <input type="text" id="new-sch-pool" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Podolí 50m">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Kategorie</label>
              <input type="text" id="new-sch-cat" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="Žáci &amp; Dorost">
            </div>
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Uzávěrka přihlášek</label>
              <input type="text" id="new-sch-dead" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="20. 11. 2026 20:00">
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button id="sch-modal-cancel" class="px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">Zrušit</button>
            <button id="sch-modal-save" class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Uložit závod</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("sch-modal-close")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("sch-modal-cancel")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("sch-modal-save")?.addEventListener("click", async () => {
      const name = document.getElementById("new-sch-name").value;
      const date = document.getElementById("new-sch-date").value;
      const pool = document.getElementById("new-sch-pool").value;
      const category = document.getElementById("new-sch-cat").value;
      const deadline = document.getElementById("new-sch-dead").value;

      if (!name.trim()) return alert("Zadejte název závodu.");
      await window.IntranetApi.createScheduleItem({ name, date, pool, category, deadline });
      modalContainer.innerHTML = "";
      renderIntranetPortal();
    });
  }

  function openCreateDocumentModal() {
    const modalContainer = document.getElementById("cms-modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-lg text-xs space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Přidat interní dokument</h3>
            <button id="doc-modal-close" class="text-zinc-400 hover:text-zinc-600">✕</button>
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Název dokumentu</label>
            <input type="text" id="new-doc-title" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Např. Posudek o zdravotní způsobilosti">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Kategorie</label>
              <input type="text" id="new-doc-cat" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="Směrnice">
            </div>
            <div>
              <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Velikost / Formát</label>
              <input type="text" id="new-doc-size" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="PDF · 210 KB">
            </div>
          </div>
          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Odkaz na soubor (URL)</label>
            <input type="text" id="new-doc-url" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" value="assets/downloads/Harmonogram_treninku_podzim_2026.pdf">
          </div>
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button id="doc-modal-cancel" class="px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">Zrušit</button>
            <button id="doc-modal-save" class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold">Uložit dokument</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("doc-modal-close")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("doc-modal-cancel")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("doc-modal-save")?.addEventListener("click", async () => {
      const title = document.getElementById("new-doc-title").value;
      const category = document.getElementById("new-doc-cat").value;
      const size = document.getElementById("new-doc-size").value;
      const url = document.getElementById("new-doc-url").value;

      if (!title.trim()) return alert("Zadejte název dokumentu.");
      await window.IntranetApi.createDocument({ title, category, size, url });
      modalContainer.innerHTML = "";
      renderIntranetPortal();
    });
  }

  // ============================================================================
  // PAYMENTS & QR SECTION RENDERER
  // ============================================================================
  function renderPaymentsSection() {
    return `
      <section class="space-y-6">
        <div class="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              Členské příspěvky 2026/27
            </span>
            <span class="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
              VS 214
            </span>
          </div>
          <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Oddílové příspěvky &amp; QR Platba (ČSOB)</h2>
          <p class="text-xs text-zinc-500">Oficiální platební údaje pro bezhotovostní převod a okamžitou mobilní platbu</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <!-- Left: Bank Details (7 cols) -->
          <div class="md:col-span-7 space-y-4">
            <div class="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-xs space-y-3.5">
              <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Bankovní spojení oddílu
              </h3>
              
              <div class="space-y-3 text-xs">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span class="text-zinc-500">Číslo bankovního účtu:</span>
                  <strong class="font-mono text-sm text-zinc-900 dark:text-zinc-100">351416278/0300 (ČSOB)</strong>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span class="text-zinc-500">Mezinárodní formát IBAN:</span>
                  <span class="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 select-all">CZ3603000000000351416278</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span class="text-zinc-500">BIC / SWIFT kód:</span>
                  <span class="font-mono text-zinc-700 dark:text-zinc-300">CEKOCZPP</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span class="text-zinc-500">Variabilní symbol (VS):</span>
                  <span class="rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 font-mono font-bold text-emerald-700 dark:text-emerald-300">214</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                  <span class="text-zinc-500">Specifický symbol (SS):</span>
                  <span class="font-mono text-zinc-700 dark:text-zinc-300">dle skupiny (101 ST · 102 ODA · 104 Přípravka)</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-1">
                  <span class="text-zinc-500">Zpráva pro příjemce:</span>
                  <span class="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">plavání [Jméno plavce]</span>
                </div>
              </div>
            </div>

            <div class="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Termíny úhrady příspěvků:</strong> na podzimní pololetí do <strong>15. října</strong>, na jarní pololetí do <strong>15. února</strong>. Potvrzení o zaplacení pro zdravotní pojišťovny na příspěvek na sportovní činnost dětí vystavuje hospodářka oddílu na vyžádání.
            </div>
          </div>

          <!-- Right: Official QR Code (5 cols) -->
          <div class="md:col-span-5 flex flex-col items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 text-center shadow-xs">
            <span class="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">ČSOB SPAYD Platba</span>
            <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white p-3 shadow-inner">
              <img src="assets/QR_plavani214.jpg" alt="QR kód pro platbu příspěvků TJ Bohemians Praha VS 214" width="200" height="200" class="h-48 w-48 object-contain">
            </div>
            <div class="mt-3">
              <span class="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">VS 214</span>
              <p class="text-[11px] text-zinc-500 mt-1 max-w-xs">Naskenujte v aplikaci mobilního bankovnictví libovolné banky pro okamžité načtení platebního příkazu.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ============================================================================
  // INTERACTIVE DISCIPLINE SELECTION MODAL
  // ============================================================================
  function openSignupDisciplineModal(eventId, eventName) {
    const modalContainer = document.getElementById("cms-modal-container");
    if (!modalContainer) return;

    const officialDisciplines = (window.BohData && window.BohData.disciplines) || [
      { code: "50 VZ", label: "50 m volný způsob", stroke: "Volný způsob" },
      { code: "100 VZ", label: "100 m volný způsob", stroke: "Volný způsob" },
      { code: "200 VZ", label: "200 m volný způsob", stroke: "Volný způsob" },
      { code: "400 VZ", label: "400 m volný způsob", stroke: "Volný způsob" },
      { code: "800 VZ", label: "800 m volný způsob", stroke: "Volný způsob" },
      { code: "1500 VZ", label: "1500 m volný způsob", stroke: "Volný způsob" },
      { code: "50 Z", label: "50 m znak", stroke: "Znak" },
      { code: "100 Z", label: "100 m znak", stroke: "Znak" },
      { code: "200 Z", label: "200 m znak", stroke: "Znak" },
      { code: "50 P", label: "50 m prsa", stroke: "Prsa" },
      { code: "100 P", label: "100 m prsa", stroke: "Prsa" },
      { code: "200 P", label: "200 m prsa", stroke: "Prsa" },
      { code: "50 M", label: "50 m motýlek", stroke: "Motýlek" },
      { code: "100 M", label: "100 m motýlek", stroke: "Motýlek" },
      { code: "200 M", label: "200 m motýlek", stroke: "Motýlek" },
      { code: "100 PZ", label: "100 m polohový závod", stroke: "Polohový" },
      { code: "200 PZ", label: "200 m polohový závod", stroke: "Polohový" },
      { code: "400 PZ", label: "400 m polohový závod", stroke: "Polohový" }
    ];

    let selected = [];

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="w-full max-w-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-xl text-xs space-y-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div>
              <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                Přihláška na závody
              </span>
              <h3 class="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">${escapeHtml(eventName)}</h3>
            </div>
            <button id="modal-disc-close" class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">✕</button>
          </div>

          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Jméno plavce</label>
            <input type="text" id="intranet-swimmer-name" value="${escapeHtml(currentAuth.userName || 'Kryštof Spejchal')}" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100">
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block font-semibold uppercase tracking-wider text-[11px] text-zinc-500">Výběr disciplín (18 oficiálních ČSPS)</label>
              <span id="selected-disc-count" class="text-[11px] font-mono text-zinc-400">0 vybráno</span>
            </div>
            <div class="flex flex-wrap gap-2" id="signup-disc-pills">
              ${officialDisciplines.map(d => `
                <button type="button" data-disc="${d.code}" class="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 cursor-pointer active:scale-95">
                  ${d.code}
                </button>
              `).join("")}
            </div>
          </div>

          <div>
            <label class="block font-medium text-zinc-700 dark:text-zinc-300 mb-1">Poznámka pro trenéry (nepovinné)</label>
            <textarea id="intranet-signup-note" rows="2" class="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100" placeholder="Např. pouze dopolední blok, vlastní odvoz..."></textarea>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button id="modal-disc-cancel" class="px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">Zrušit</button>
            <button id="modal-disc-submit" disabled class="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-xs cursor-pointer">
              Potvrdit přihlášku
            </button>
          </div>
        </div>
      </div>
    `;

    const pills = modalContainer.querySelectorAll("#signup-disc-pills button");
    const submitBtn = document.getElementById("modal-disc-submit");
    const countSpan = document.getElementById("selected-disc-count");

    pills.forEach(btn => {
      btn.addEventListener("click", () => {
        const disc = btn.getAttribute("data-disc");
        const idx = selected.indexOf(disc);
        if (idx > -1) {
          selected.splice(idx, 1);
          btn.className = "rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-150 cursor-pointer active:scale-95";
        } else {
          selected.push(disc);
          btn.className = "rounded-full border border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold shadow-xs px-3 py-1.5 text-xs transition-all duration-150 cursor-pointer active:scale-95";
        }
        countSpan.textContent = `${selected.length} vybráno`;
        submitBtn.disabled = selected.length === 0;
      });
    });

    document.getElementById("modal-disc-close")?.addEventListener("click", () => modalContainer.innerHTML = "");
    document.getElementById("modal-disc-cancel")?.addEventListener("click", () => modalContainer.innerHTML = "");
    submitBtn.addEventListener("click", async () => {
      const swimmerName = document.getElementById("intranet-swimmer-name").value || currentAuth.userName;
      const note = document.getElementById("intranet-signup-note").value || "";
      submitBtn.disabled = true;
      submitBtn.textContent = "Ukládám...";

      await window.IntranetApi.submitEntry(eventId, eventName, selected, swimmerName);
      if (window.BohStore && typeof window.BohStore.saveSignup === "function") {
        window.BohStore.saveSignup(eventId, selected, note);
      }
      modalContainer.innerHTML = "";
      activeTab = "entries";
      renderIntranetPortal();
    });
  }

  // ============================================================================
  // LENEX 3.0 XML GENERATOR
  // ============================================================================
  function exportLenexXml(eventId) {
    const storeObj = window.BohStore || window.KlokaniStore;
    const dataObj = window.BohData || window.KlokaniData;
    const allEvents = storeObj ? storeObj.getEvents() : ((dataObj && dataObj.events) || []);
    let targetEvents = eventId ? allEvents.filter(e => e.id === eventId) : allEvents;

    if (targetEvents.length === 0 && eventId) {
      targetEvents = [{ id: eventId, name: eventId, place: "Praha", course: "SCM" }];
    } else if (targetEvents.length === 0) {
      targetEvents = [{ id: "bohemians-meet", name: "Závody TJ Bohemians Praha", place: "Praha", course: "SCM" }];
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<LENEX version="3.0">\n  <CONSTRUCTOR name="Bohemians CMS" version="2.0">\n    <CONTACT name="TJ Bohemians Praha" email="jan.srb@czechswimming.cz" />\n  </CONSTRUCTOR>\n  <MEETS>\n`;

    targetEvents.forEach(ev => {
      let roster = storeObj ? storeObj.getRosterForEvent(ev.id) : [];
      if ((!roster || roster.length === 0) && window.IntranetApi) {
        try {
          const myEntries = JSON.parse(localStorage.getItem("boh_intranet_my_entries") || "[]");
          const evEntries = myEntries.filter(e => e.eventId === ev.id || !eventId);
          if (evEntries.length > 0) {
            roster = evEntries.map(e => ({
              swimmer: e.swimmerName || "Kryštof Spejchal",
              gender: "M",
              year: "2010",
              disciplines: e.disciplines || []
            }));
          }
        } catch (_) {}
      }

      xml += `    <MEET name="${escapeLenexXml(ev.name)}" city="${escapeLenexXml(ev.place || 'Praha')}" course="SCM">\n      <CLUBS>\n        <CLUB name="TJ Bohemians Praha" code="BOH" nation="CZE">\n          <ATHLETES>\n`;

      roster.forEach((entry, idx) => {
        const parts = (entry.swimmer || "Plavec").split(" ");
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : parts[0];
        const firstName = parts.length > 1 ? parts[0] : "";
        const gender = (entry.gender === "Z" || entry.gender === "F") ? "F" : "M";
        const birthdate = `${entry.year || 2010}-01-01`;

        xml += `            <ATHLETE athleteid="${idx + 1}" lastname="${escapeLenexXml(lastName)}" firstname="${escapeLenexXml(firstName)}" gender="${gender}" birthdate="${birthdate}">\n              <ENTRIES>\n`;
        const disciplines = Array.isArray(entry.disciplines) ? entry.disciplines : [entry.disciplines];
        disciplines.filter(Boolean).forEach(d => {
          xml += `                <ENTRY eventid="${escapeLenexXml(d)}" />\n`;
        });
        xml += `              </ENTRIES>\n            </ATHLETE>\n`;
      });

      xml += `          </ATHLETES>\n        </CLUB>\n      </CLUBS>\n    </MEET>\n`;
    });

    xml += `  </MEETS>\n</LENEX>\n`;

    const blob = new Blob([xml], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bohemians_lenex_prihlasky_${Date.now()}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return xml;
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("intranet-main")) {
        renderIntranetPortal();
      }
    });
  } else {
    if (document.getElementById("intranet-main")) {
      renderIntranetPortal();
    }
  }

  window.addEventListener("boh:intranet-updated", () => {
    if (document.getElementById("intranet-main")) {
      renderIntranetPortal();
    }
  });

  window.renderIntranetPortal = renderIntranetPortal;
  window.exportLenexXml = exportLenexXml;
  if (window.IntranetApi && !window.IntranetApi.exportLenexXml) {
    window.IntranetApi.exportLenexXml = exportLenexXml;
  }
})();
