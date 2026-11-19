# Aplikační prvky na telefonu (uloženo 19. 11. 2026)

Do 19. 11. 2026 měl web na telefonu vzhled aplikace: dolní lištu se záložkami (Úvod, Závody, Pro rodiče, Intranet, Více), dolní výsuvnou nabídku a v hlavičce zvonek s oznámeními (včetně vyskakovacích bannerů). Na přání je web na telefonu klasický: hamburger v hlavičce otevírá celostránkovou nabídku, bez lišty a bez zvonku.

## Obsah
- `bottom-nav.html` - dolní lišta (původní kód).
- `notification-bell.html` - zvonek s počtem oznámení z hlavičky (původní kód).
- CSS a JS zůstaly beze změny: `css/style.css` (`.mobile-bottom-nav`, `.mobile-tab-item`, `.notification-popup`) a `js/app.js` (`initNotificationBell`, bottom-nav v `initMobileNav`).

## Vrácení zpět
```bash
python3 scripts/app_chrome.py on     # vrátí lištu, zvonek a dolní výsuvnou nabídku
python3 scripts/app_chrome.py off    # znovu webový vzhled
```
Skript upraví všechny kořenové stránky a přepne třídu `app-chrome` na `<body>`. Potom commit a push.
