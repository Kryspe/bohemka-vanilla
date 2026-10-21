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
              <button id="add-announcement-btn" class="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                <span>Nové oznámení</span>
              </button>
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
        <div class="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Moje přihlášky na závody &amp; Stav</h2>
          <p class="text-xs text-zinc-500">Přehled přihlášených disciplín a stav schválení trenérem</p>
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

    // 4. Create Announcement Modal
    const addAnnBtn = document.getElementById("add-announcement-btn");
    if (addAnnBtn) {
      addAnnBtn.addEventListener("click", () => {
        openCreateAnnouncementModal();
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
      btn.addEventListener("click", async () => {
        const eventId = btn.getAttribute("data-id");
        const eventName = btn.getAttribute("data-name");
        const disciplines = prompt(`Zadejte disciplíny pro závod "${eventName}" (např. 50 VZ, 100 VZ):`, "50 VZ, 100 VZ");
        if (disciplines) {
          const list = disciplines.split(",").map(d => d.trim()).filter(Boolean);
          await window.IntranetApi.submitEntry(eventId, eventName, list);
          activeTab = "entries";
          renderIntranetPortal();
        }
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
})();
