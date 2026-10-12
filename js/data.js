/**
 * Klokani — TJ Bohemians Praha (oddíl plavání)
 * Vanilla Data Store & Seed Constants
 * Aktualizováno podle oficiálního webu https://www.boh.cz k 80. výročí oddílu (1946–2026)
 */

window.KlokaniData = {
  club: {
    name: "Klokani",
    fullName: "TJ Bohemians Praha — oddíl plavání",
    founded: 1946,
    anniversary: 80,
    tagline: "UŽ TO SPOLU TÁHNEM 80 LET • 1946–2026",
    subtagline: "Jeden tým. Jedna voda. Jedno vítězství.",
    email: "jan.srb@czechswimming.cz",
    officialWeb: "https://www.boh.cz",
    coursesWeb: "https://kurzy.boh.cz",
    pools: ["Plavecký stadion Podolí (Podolské nábřeží 3/1184, Praha 4)", "Sokol Vinohrady (Polská 2400/1a, Praha 2)"],
    bankAccount: "123456789/0300 (ČSOB)",
    ico: "00539121"
  },

  subdomains: [
    {
      id: "kurzy",
      name: "Kurzy plavání pro děti",
      domain: "kurzy.boh.cz",
      url: "https://kurzy.boh.cz",
      badge: "Výuka dětí",
      tag: "kurzy",
      lead: "Výuka základního a zdokonalovacího plavání pro děti na Vinohradech a Podolí.",
      description: "Základní plavání pro děti od 4 let, školička, přípravné kurzy a kroužky. Výuka probíhá pod vedením trenéra Petra Dvořáka a zkušených cvičitelů oddílu Bohemians.",
      contacts: "Petr Dvořák • bohemians.plavani@gmail.com",
      status: "Aktivní kurzy"
    },
    {
      id: "jcp",
      name: "Jarní cena Prahy",
      domain: "jcp.boh.cz",
      url: "http://www.jarnicenaprahy.cz/",
      badge: "Mezinárodní mítink",
      tag: "zavody",
      lead: "Tradiční mezinárodní plavecké závody pořádané naším oddílem v Podolí.",
      description: "Jarní cena Prahy patří mezi nejstarší a nejvýznamnější plavecké mítinky v ČR. Pořádáme ji každoročně na 50m krytém bazénu plaveckého stadionu Podolí za účasti špičkových českých i zahraničních reprezentantů.",
      contacts: "Vedení závodů TJ Bohemians • jan.srb@czechswimming.cz",
      status: "Tradiční mítink"
    },
    {
      id: "80let",
      name: "80 let Bohemky (1946–2026)",
      domain: "80let.boh.cz",
      url: "foto.html",
      badge: "Jubileum 80 let",
      tag: "historie",
      lead: "Oslava 80. výročí založení plaveckého oddílu Klokanů na Hagiboru.",
      description: "212 Klokanů se sešlo v areálu na Hagiboru, aby oslavilo osm dekád zelenobílé plavecké rodiny. Retro archiv, historické trofeje, vzpomínky olympioniků i promítání historického filmu.",
      contacts: "Kronika oddílu • Mgr. Jan Srb",
      status: "1946–2026"
    },
    {
      id: "70let",
      name: "70 let oddílu (1946–2016)",
      domain: "70let.boh.cz",
      url: "oddil.html",
      badge: "Archiv výročí",
      tag: "historie",
      lead: "Historická retrospektiva prvních sedmi dekád plaveckého oddílu.",
      description: "Digitální archiv a jubilejní ročenka shrnující historii oddílu od jeho založení Jaroslavem Šímou v roce 1946 až po sedmdesáté narozeniny.",
      contacts: "Historická komise TJ Bohemians",
      status: "Historický archiv"
    },
    {
      id: "videa",
      name: "Videa & Rozbory techniky",
      domain: "videa.boh.cz",
      url: "http://videa.boh.cz",
      badge: "Video archiv",
      tag: "metodika",
      lead: "Video archiv plaveckých jízd a biomechanických rozborů techniky.",
      description: "Portál videozáznamů ze závodů a technických rozborů plaveckých způsobů (kraul, znak, prsa, motýlek), startovních skoků a obrátek pro plavce sportovních tříd a družstev Bohemians.",
      contacts: "Metodická komise TJ Bohemians",
      status: "Archiv jízd"
    },
    {
      id: "masters",
      name: "Masters — Veteráni",
      domain: "masters.boh.cz",
      url: "oddil.html",
      badge: "Reprezentace masters",
      tag: "sekce",
      lead: "Bývalí závodníci nad 25 let a medailisté z ME a MS veteránů.",
      description: "Sekce veteránů vedená Marcelou Šťastnou pravidelně vozí cenné kovy z evropských i světových šampionátů masters (např. 16 medailí z ME masters 2026). Tradiční Veteraniáda probíhá každoročně v listopadu.",
      contacts: "Marcela Šťastná • 604 958 777",
      status: "ME & MS medaile"
    },
    {
      id: "dp",
      name: "Dálkové plavání Klokanů",
      domain: "dp.boh.cz",
      url: "aktuality.html?id=tymovy-bronz-cpdp-2026",
      badge: "Český pohár DP",
      tag: "sekce",
      lead: "Závodní tým dálkového plavání na volné vodě — Seč, Lipno, Račice.",
      description: "Klokani patří mezi absolutní českou špičku v dálkovém plavání na 5, 10 a 20 km. V sezóně 2026 vybojovali týmový bronz v Českém poháru a tituly mistryň republiky zásluhou Hanky Jurčákové a Mii Srbové.",
      contacts: "Trenér Jan Srb • 777 852 196",
      status: "Týmový bronz 2026"
    },
    {
      id: "historie",
      name: "Kronika Vladimíra Srba",
      domain: "historie.boh.cz",
      url: "oddil.html",
      badge: "Paměť oddílu",
      tag: "historie",
      lead: "Osobní archiv a kronika dlouholetého předsedy a trenéra Vladimíra Srba.",
      description: "Unikátní historické materiály, fotografie, novinové výstřižky a vzpomínky dokumentující zlaté éry plavecké Bohemky pod vedením trenérské legendy Vladimíra Srba.",
      contacts: "Archiv rodiny Srbových",
      status: "Kronika"
    },
    {
      id: "synchro",
      name: "Synchronizované plavání",
      domain: "synchro.boh.cz",
      url: "oddil.html",
      badge: "Akvabely",
      tag: "sekce",
      lead: "Oddílová sekce uměleckého a synchronizovaného plavání Bohemians.",
      description: "Trénink akvabel, choreografie a účast na národních i mezinárodních soutěžích v synchronizovaném plavání na pražských bazénech.",
      contacts: "Sekce synchro TJ Bohemians",
      status: "Oddílová sekce"
    }
  ],

  downloads: [
    {
      id: "dl-165",
      title: "Rozřazení do skupin, rozvrh a platby 2026-27",
      category: "Organizace & Rozvrhy",
      filename: "165_rozdeleni_plavani_2026-27.pdf",
      size: "518 kB",
      date: "20. 8. 2026",
      officialUrl: "https://www.boh.cz/download/165_rozdeleni_plavani_2026-27.pdf",
      description: "Kompletní rozdělení plavců do tréninkových skupin (ST, ODA, ODB, Výběr, Přípravka), časy tréninků v Podolí a na Vinohradech a výše členských příspěvků pro sezónu 2026/27."
    },
    {
      id: "dl-164",
      title: "Výklad pravidel plavání (2026)",
      category: "Pravidla & Metodika",
      filename: "164_pravidla_plavani_vytah_a_vysvetleni_04-26.pdf",
      size: "356 kB",
      date: "30. 4. 2026",
      officialUrl: "https://www.boh.cz/download/164_pravidla_plavani_vytah_a_vysvetleni_04-26.pdf",
      description: "Přehledný výtah a oficiální vysvětlení pravidel plavání ČSPS a World Aquatics pro plavce, trenéry a rozhodčí — starty, obrátky a dohmaty."
    },
    {
      id: "dl-163",
      title: "Lyžařské soustředění 2026 — kilometráž a týmy",
      category: "Soustředění",
      filename: "163_26hory-jednotlivci_kilometraz_tymy.pdf",
      size: "727 kB",
      date: "30. 1. 2026",
      officialUrl: "https://www.boh.cz/download/163_26hory-jednotlivci_kilometraz_tymy.pdf",
      description: "Kompletní výsledky jednotlivců, ujetá kilometráž na běžkách a bodování týmů ze zimního kondičního soustředění Klokanů."
    },
    {
      id: "dl-162",
      title: "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu",
      category: "Statistika & Historie",
      filename: "162_25statistika.pdf",
      size: "1 684 kB",
      date: "2. 1. 2026",
      officialUrl: "https://www.boh.cz/download/162_25statistika.pdf",
      description: "Historická ročenka výkonů: oddílové rekordy v 25m i 50m bazénech ve všech věkových kategoriích a historických TOP 10 časů Klokanů."
    },
    {
      id: "dl-prihlaska",
      title: "Přihláška člena do TJ Bohemians Praha",
      category: "Formuláře & Členství",
      filename: "prihlaska_clen_bohemians.pdf",
      size: "124 kB",
      date: "1. 9. 2026",
      officialUrl: "https://www.boh.cz/stahovani/",
      description: "Oficiální evidenční list nového člena plaveckého oddílu TJ Bohemians Praha včetně GDPR a souhlasu zákonného zástupce."
    },
    {
      id: "dl-lekarska",
      title: "Lékařský posudek o zdravotní způsobilosti k výkonnostnímu sportu",
      category: "Zdravotní prohlídky",
      filename: "posudek_zdravotni_zpusobilost.pdf",
      size: "148 kB",
      date: "1. 9. 2026",
      officialUrl: "https://www.boh.cz/stahovani/",
      description: "Formulář tělovýchovné lékařské prohlídky vyžadovaný pro závodní činnost a starty na mistrovských soutěžích ČSPS."
    },
    {
      id: "dl-141",
      title: "Krmítko na DP — 3D model pro dálkové plavání",
      category: "Dálkové plavání",
      filename: "141_krmitko_dp-vaclaveybl-logo_bohemians.stl",
      size: "1 954 kB",
      date: "17. 4. 2021",
      officialUrl: "https://www.boh.cz/download/141_krmitko_dp-vaclaveybl-logo_bohemians.stl",
      description: "3D model krmítka s logem Bohemians (od Václava Eybla) na tyč pro občerstvování plavců při maratonských tratích Českého poháru DP."
    }
  ],

  infolistky: [
    {
      id: "info-977",
      title: "Infolístek na Plzeňské sprinty",
      date: "6. 10. 2026",
      meetDate: "15.–18. 10. 2026",
      pool: "Plzeň Slovany (25m krytý bazén, nám. Gen. Píky 42)",
      transport: "Doprava individuální, rychlý sraz u vchodu v 7:15, čipy na vstup u trenéra",
      schedule: "Čtvrtek až neděle: dopolední rozplavání 7:30–8:50, závody od 9:00; odpolední blok od 16:00 / 17:20",
      coaches: "Mgr. Martin Břenda (777 571 054), Mgr. Jan Srb (777 852 196)",
      gear: "Oddílové zelené tričko Bohemka a zelená oddílová čepička povinná pro všechny Klokany!",
      notes: "Oddíl přispívá plavcům v zeleném Boh tričku a Boh čepičce 200 Kč na startovné. Ubytování v hotelu Centrál na náměstí pro přihlášené zajištěno."
    },
    {
      id: "info-975",
      title: "Infolístek na Podzimní cenu Motorletu",
      date: "5. 10. 2026",
      meetDate: "11. 10. 2026",
      pool: "Praha Radlice (25m bazén SK Motorlet, Radlická 298/105)",
      transport: "Sraz přímo ve vestibulu bazénu Radlice v 7:45",
      schedule: "Rozplavání 8:00–8:45, zahájení 9:00. Odpolední blok od 13:30.",
      coaches: "Mgr. Jan Srb (777 852 196)",
      gear: "Zelené tričko Bohemians, plavky, 2× brýle, oddílová zelená čepička, obuv na bazén, lehká svačina a pití.",
      notes: "Závody pro žákovské ročníky a mladší dorost. Vstup do šaten pouze v čisté bazénové obuvi."
    },
    {
      id: "info-976",
      title: "Infolístek na Velkou cenu Prahy",
      date: "5. 10. 2026",
      meetDate: "10.–11. 10. 2026",
      pool: "Plavecký stadion Podolí (50m krytý bazén)",
      transport: "Domácí bazén Podolí — sraz 30 min před začátkem rozplavání u oddílové lavičky Klokanů",
      schedule: "Sobota a neděle: rozplavání 8:00, závody 9:00",
      coaches: "Mgr. Jan Srb, Mgr. Kristýna Skuhrová",
      gear: "Zelené oddílové oblečení, akreditace v šatně",
      notes: "Tradiční pražský mítink na dlouhém bazénu. Nominovaní plavci startují za podpory domácího oddílu."
    }
  ],

  sponsors: [
    {
      name: "Hlavní město Praha",
      logo: "assets/sponsors/praha.png",
      url: "https://www.praha.eu",
      role: "Podpora sportovní činnosti dětí a mládeže z grantů Magistrátu hl. m. Prahy"
    },
    {
      name: "Český svaz plaveckých sportů",
      logo: "assets/sponsors/svaz.png",
      url: "https://www.czechswimming.cz",
      role: "Oficiální řídící svaz plaveckých sportů v ČR (ČSPS / Czech Swimming)"
    },
    {
      name: "Národní sportovní agentura",
      logo: "assets/sponsors/svaz.png",
      url: "https://nsa.gov.cz",
      role: "Státní podpora sportovních středisek mládeže a reprezentace ČR"
    },
    {
      name: "Jarní cena Prahy",
      logo: "assets/sponsors/jcp_promo.png",
      url: "http://www.jarnicenaprahy.cz",
      role: "Tradiční mezinárodní plavecký mítink pořádaný TJ Bohemians Praha"
    },
    {
      name: "Marshal Sport Podolí",
      logo: "assets/sponsors/praha.png",
      url: "https://www.marshalsport.cz",
      role: "Plavecké vybavení a potřeby pro závodní plavce v Podolí"
    }
  ],

  disciplines: [
    { code: "50 VZ", label: "50 m volný způsob", stroke: "Volný způsob", note: "nejkratší sprint" },
    { code: "100 VZ", label: "100 m volný způsob", stroke: "Volný způsob", note: "královská disciplína" },
    { code: "200 VZ", label: "200 m volný způsob", stroke: "Volný způsob", note: "střední trať" },
    { code: "400 VZ", label: "400 m volný způsob", stroke: "Volný způsob", note: "střední trať" },
    { code: "800 VZ", label: "800 m volný způsob", stroke: "Volný způsob", note: "vytrvalostní trať" },
    { code: "1500 VZ", label: "1500 m volný způsob", stroke: "Volný způsob", note: "nejdelší bazénová trať" },
    { code: "50 Z", label: "50 m znak", stroke: "Znak", note: "sprint" },
    { code: "100 Z", label: "100 m znak", stroke: "Znak", note: "olympijská trať" },
    { code: "200 Z", label: "200 m znak", stroke: "Znak", note: "olympijská trať" },
    { code: "50 P", label: "50 m prsa", stroke: "Prsa", note: "sprint" },
    { code: "100 P", label: "100 m prsa", stroke: "Prsa", note: "olympijská trať" },
    { code: "200 P", label: "200 m prsa", stroke: "Prsa", note: "olympijská trať" },
    { code: "50 M", label: "50 m motýlek", stroke: "Motýlek", note: "sprint" },
    { code: "100 M", label: "100 m motýlek", stroke: "Motýlek", note: "olympijská trať" },
    { code: "200 M", label: "200 m motýlek", stroke: "Motýlek", note: "olympijská trať" },
    { code: "100 PZ", label: "100 m polohový závod", stroke: "Polohový", note: "pouze 25 m bazén" },
    { code: "200 PZ", label: "200 m polohový závod", stroke: "Polohový", note: "olympijská trať" },
    { code: "400 PZ", label: "400 m polohový závod", stroke: "Polohový", note: "olympijská trať" }
  ],

  groups: [
    {
      code: "ST",
      name: "eSTéčko (sportovní třídy)",
      description: "Závodní plavci kategorie staršího žactva a juniorů. Tréninky probíhají ráno na Vinohradech a odpoledne v Podolí. Plaveme 7× až 10× týdně, navíc doporučený sobotní ranní trénink v Podolí."
    },
    {
      code: "ODA",
      name: "Oddílové družstvo",
      description: "Pokračování pro plavce juniory a starší po skupině ST. Trénujeme 10× týdně."
    },
    {
      code: "VÝBĚR",
      name: "Výběrové družstvo",
      description: "Trénink pro nejnadějnější plavce, studenty sportovního gymnázia Přípotoční a další medailisty MČR. Ráno na Vinohradech, odpoledne v Podolí. Trénuje se 9× týdně a 2× týdně suchá příprava."
    },
    {
      code: "PŘÍPRAVKA",
      name: "Přípravka",
      description: "Plavání pro nadějné plavce z kurzů a pro ty, kteří chtějí závodit. Mladší (do 11 let) út a čt 16:30–17:20, starší (do 13 let) út a čt 17:20–18:45. Postup po splnění výkonnostních kritérií."
    },
    {
      code: "ODB",
      name: "ODB",
      description: "Pro plavce, kteří chtějí trénovat, ale 2× týdně jim stačí. Jsou připraveni i k účasti na závodech."
    },
    {
      code: "KURZY",
      name: "Základní plavání (kurzy)",
      description: "Výuka základního plavání — kurzy na samostatném webu kurzy.boh.cz. Út a čt 18:45–19:30."
    },
    {
      code: "VETERÁNI",
      name: "Veteráni (Masters)",
      description: "Bývalí plavci starší 25 let se účastní především závodů. Více informací u paní Marcely Šťastné."
    }
  ],

  coaches: [
    {
      name: "Mgr. Jan Srb",
      role: "Předseda oddílu a hlavní trenér — Sportovní středisko (ST, ODA, závodní plavání a přípravka)",
      details: ["trenér I. třídy", "absolvent FTVS UK v Praze", "mobil: 777 852 196", "jan.srb@czechswimming.cz"]
    },
    {
      name: "Bc. Martin Břenda",
      role: "Trenér I. třídy — Sportovní středisko (ST, sportovní gymnázium a ODB)",
      details: ["trenér I. třídy", "absolvent FTK UP v Olomouci", "mobil: 777 571 054", "martin.brenda@email.cz"]
    },
    {
      name: "Petr Dvořák",
      role: "Kurzy plavání a kroužky",
      details: ["cvičitel a trenér plavání", "bohemians.plavani@gmail.com", "kurzy.boh.cz"]
    },
    {
      name: "Marcela Šťastná",
      role: "Vedoucí sekce Veteráni (Masters)",
      details: ["mobil: 604 958 777", "mistryně a rekordmanka ME masters"]
    }
  ],

  otherCoaches: [
    "Mgr. Kristýna Skuhrová (II. třída)",
    "Kryštof Šram (III. třída)",
    "Mgr. Aleš Zenáhlík (I. třída)",
    "Miloslav Andres",
    "Martin Bejček",
    "Ing. Dan Cezner",
    "Petr Greipel",
    "Kateřina Holubová (absolventka FTVS UK, trenérka I. třídy)",
    "Michaela Štěrbová",
    "Daniel Tikovský",
    "Miroslav Vrána"
  ],

  history: [
    { year: "1946", text: "Založení plaveckého oddílu Jaroslavem Šímou, který se věnoval výchově cvičitelů a výuce plavání." },
    { year: "1947", text: "Nástup trenéra Očenáška, první úspěchy žactva a dorostu. Založení Poháru plavecké mládeže." },
    { year: "1958", text: "Na mistrovství Evropy v Budapešti startuje poprvé zástupkyně Bohemians Marcela Šťastná (Jelínková)." },
    { year: "1959", text: "Lída Kottková se stává v Turínu akademickou mistryní světa na 400 m volný způsob se stříbrnou medailí." },
    { year: "1963", text: "Založení experimentálních plaveckých tříd na Vinohradech — tradice sportovních tříd pokračuje dodnes." },
    { year: "1999", text: "Nejlepší sportovní výsledky v historii oddílu v domácích i zahraničních soutěžích." },
    { year: "2000", text: "Vrcholná éra. Nejvíce úspěchů dosahuje plavkyně Ilona Hlaváčková na znakařských tratích." },
    { year: "2001", text: "Nejúspěšnější rok v historii klubu. Ilona Hlaváčková, štafeta žen a Pavel Srb." },
    { year: "2006", text: "TJ Bohemians oddíl plavání slaví 60 let existence." },
    { year: "2021", text: "75 let plavecké Bohemky — vytrvalá příprava generací plavců." },
    { year: "2026", text: "TJ Bohemians slaví 80 let! Velké setkání 212 Klokanů na Hagiboru a týmový bronz v Českém poháru v dálkovém plavání." }
  ],

  news: [
    {
      "id": "velka-cena-mesta-plzne-2026",
      "title": "Velká cena města Plzně — hodnocení prvního závodu sezóny",
      "date": "2026-10-04",
      "author": "Jan Srb",
      "image": "assets/aktuality/2242.jpg",
      "excerpt": "Velká cena města Plzně je tradičně prvním závodem sezóny, na který se vydáváme. Pro naše plavce má především jednu důležitou úlohu – otestovat, jak se daří budovat vytrvalost.",
      "body": [
        "Velká cena města Plzně je tradičně prvním závodem sezóny, na který se vydáváme. Pro naše plavce má především jednu důležitou úlohu – otestovat, jak se v probíhající přípravě daří budovat vytrvalost.",
        "Hlavním testem je samozřejmě 1500 metrů volným způsobem. K tomu si každý podle chuti může přidat některou ze stovek, které nabízí program závodu. A že se Klokanům dařilo, ukázaly výsledky hned na úvod sezóny.",
        "Na hlavní patnáctistovce jsme měli dva plavce na stupních vítězů. Mezi ženami i v absolutním pořadí doplavala na výborném 2. místě Mia Srbová, mezi žáky pak zvítězil Ondra Benš.",
        "A dařilo se i v dalších disciplínách: Pepča Pistulková – starší žačky - 1. 100 P, 2. 100 Z, 3. 100 K, Madla Šťastná – mladší žačky - 3. 100 K, Fanda Tichý – mladší žáci - 1. 100 M, Vojta Vrchlabský – mladší žáci - 2. 100 K, 3. 100 P, 3. 100 Z.",
        "Všem plavcům gratulujeme k předvedeným výkonům a děkujeme za první závodní ochutnávku nové sezóny! A už za týden pokračujeme – tentokrát doma v Praze, v Radlicích.",
        "Výsledky najdete v menu Závody, fotografie pak ve Fotoalbech. Bohemka, do toho! --- Jan SRB ---"
      ]
    },
    {
      "id": "evropsky-pohar-dp-razanac-2026",
      "title": "Evropský pohár v dálkovém plavání v chorvatském Razanacu",
      "date": "2026-09-28",
      "author": "Jan Srb",
      "image": "assets/aktuality/2241.jpg",
      "excerpt": "Na další zastávce Evropského poháru v dálkovém plavání, tentokrát v chorvatském Razanacu, reprezentovala Bohemku i Českou republiku Háňa Jurčáková.",
      "body": [
        "Na další zastávce Evropského poháru v dálkovém plavání, tentokrát v přímořském chorvatském Razanacu, reprezentovala Bohemku i Českou republiku Háňa Jurčáková.",
        "Hanka vystartovala do rychlého závodu s chutí zopakovat svou povedenou mezinárodní premiéru z mistrovství Evropy juniorů. Tentokrát se musela odvážně poprat nejen se soupeřkami, ale také s vlnami Jadranu.",
        "Krásné prostředí malého přístavního městečka se již tradičně v září stává centrem dalšího kola Evropského poháru a ani letos nechyběla pořádná dálkoplavská atmosféra.",
        "Po statečném výkonu bojovala Hanka až do samotného závěru a v těsném finiši nakonec doplavala na 12. místě. Moc gratulujeme k předvedenému výkonu!",
        "Tímto závodem pro Klokany definitivně končí letošní úspěšná sezóna dálkového plavání. A Hance teď začíná zasloužený odpočinek. --- Jan SRB ---"
      ]
    },
    {
        "id": "oslava-80-let-bohemka",
        "title": "Plavecká Bohemka oslavila 80 let ve velkém stylu!",
        "date": "2026-09-14",
        "author": "Jan Srb",
        "image": "assets/aktuality/2240.jpg",
        "excerpt": "212 Klokanů dorazilo v sobotu do tenisového areálu na Hagiboru, aby společně oslavili 80 let od založení našeho plaveckého oddílu. A byla to opravdu velká jízda!",
        "body": [
            "212 Klokanů dorazilo v sobotu do tenisového areálu na Hagiboru, aby společně oslavili 80 let od založení našeho plaveckého oddílu. A byla to opravdu velká jízda!",
            "Na jednom místě se potkaly všechny generace Bohemky – současní plavci, bývalí závodníci, trenéři, přátelé oddílu i další lidé, kteří mají k našemu klubu blízko. A protože nám přálo i počasí, nic nebránilo tomu užít si společně celý den naplno.",
            "Zájem o setkání byl dokonce tak velký, že jsme chvílemi nestíhali všechny účastníky včas prezentovat. Začátek se proto posunul o 30 minut, ale jak se ukázalo, vůbec to nevadilo.",
            "Celým dnem provázel předseda oddílu Jan Srb. Program jsme zahájili symbolickým odpočtem od 80 do 0 a potom jsme se společně ohlédli za posledními deseti lety života oddílu. Připomněli jsme si naše odchovance startující na Olympiádě a další špičkové plavce, zavzpomínali na předchozí předsedy, připomněli si historii Bohemky a samozřejmě oslavili také řadu skvělých sportovních výsledků.",
            "Po společném programu přišlo na řadu velké fotografování všech přítomných. A že bylo koho fotit! Za 80 let se toho v Bohemce opravdu událo hodně a bylo krásné vidět tolik lidí z různých generací opět pohromadě.",
            "Pak už jsme přešli k příjemné části programu – raut, gril, povídání, vzpomínání a setkávání s přáteli. Nechyběla ani tombola a na závěr jsme si společně pustili historický film z konce šedesátých let. Některé vzpomínky se během večera vracely opravdu intenzivně.",
            "A protože taková akce si zaslouží pořádnou fotodokumentaci, máme jí opravdu hodně. David a Petr nafotili spoustu skvělých snímků, které najdete v menu Foto.",
            "Děkujeme všem 212 účastníkům, kteří dorazili, zavzpomínali si, pobavili se a pomohli vytvořit atmosféru, na kterou jen tak nezapomeneme. Velké díky patří také všem, kteří se podíleli na přípravě a organizaci celého setkání.",
            "Bylo to velkolepé, krásné a hlavně společné. Přesně tak, jak má oslava 80 let fungujícího oddílu vypadat. Tak zase za 10 let na dalších kulatých narozeninách! A pokud byste se chtěli s Klokany potkat dříve, nezapomeňte na naši tradiční Veteraniádu 28. 11. Bohemka, do toho!"
        ]
    },
    {
        "id": "tymovy-bronz-cpdp-2026",
        "title": "Klokani vezou z Českého poháru v dálkovém plavání týmový bronz!",
        "date": "2026-09-07",
        "author": "Jan Srb",
        "image": "assets/aktuality/2239.jpg",
        "excerpt": "Po víkendu v Mělicích skončil Český pohár v dálkovém plavání 2026. A Klokani si z něj odvážejí parádní bronz v soutěži týmů!",
        "body": [
            "Po víkendu v Mělicích, který se skládal ze dvou jednodenních závodů, skončil Český pohár v dálkovém plavání 2026. A Klokani si z něj odvážejí parádní bronz v soutěži týmů!",
            "Závěrečný víkend sezóny se nesl ve skvělé atmosféře, za výborného počasí a s parádními výkony. Všichni si závody pořádně užili a noc strávená společně přímo u závodů je vždy tou správnou třešničkou na závěr sezóny.",
            "Sobota patřila Poháru Lídy Jelínkové. Celou ženskou bednu hlavního závodu na 5 km obsadily naše Klokanky – 1. Hanka Jurčáková, 2. Terka Čermáková a 3. Nikol Svobodová. Na 10 km skončil Váša Tichý na 5. místě a Ondra Šimsa šestý.",
            "V nedělním Podzimním rožni a Superfinále si Klokani v celkovém pořadí mladších ročníků vyplavali hned pět pohárků: František Tichý (1. místo, ročník 2015), Michal Němec (2. místo, ročník 2014), Niko Srb (3. místo, ročník 2013), Josefína Pistulková (3. místo, ročník 2012) a Anna Kotschová (3. místo, ročník 2011).",
            "A pak přišla poslední a největší třešnička celého víkendu – vyhlášení týmové soutěže. Po velkém souboji zvítězil Kolín, druhý skončil Hodonín a naši Klokani vybojovali parádní bronzovou příčku!",
            "Všem Klokanům moc gratulujeme a děkujeme za celou sezónu! Nyní již opět v plné síle do bazénové sezóny. Na první závody vyrážíme v říjnu do Plzně."
        ]
    },
    {
        "id": "mala-cena-plavajiciho-klokana-2026",
        "title": "Malá cena plavajícího klokana je za námi!",
        "date": "2026-09-02",
        "author": "Jan Srb",
        "image": "assets/aktuality/2237.jpg",
        "excerpt": "Úvodní bazénové závody nové sezóny jsou za námi. A Klokani si je užili na Vinohradech!",
        "body": [
            "Úvodní bazénové závody nové sezóny jsou za námi a Klokani si je užili! V pondělí jsme si zaplavali téměř všechny disciplíny podle chuti. V úterý pak čekaly na všechny 100 K, 200 PZ a jedna vypečenost na závěr. Prostě závody, kde si každý mohl vybrat, co ho láká – a zároveň si trochu sáhnout na dno.",
            "Závody jsme tradičně nabízeli nejprve na webu a následně také na soustředění, respektive příměstském kempu. A bylo to znát. Někteří si zaplavali krásné osobáky, jiní si připsali vůbec první čas v kariéře na některé z disciplín.",
            "Vítězem se po napínavém rozstřelu stal Patrik Boháč. Teď už víme, na čem jsme, a můžeme zase naplno trénovat!"
        ]
    },
    {
        "id": "racice-mcr-dp-2026",
        "title": "Z Račic (MČR DP) vezeme medaile, tituly a spoustu skvělých výkonů!",
        "date": "2026-09-01",
        "author": "Jan Srb",
        "image": "assets/aktuality/2236.jpg",
        "excerpt": "Mistrovství ČR v dálkovém plavání v Račicích skončilo pro naše barvy s medailemi a tituly mistryň ČR!",
        "body": [
            "Mistrovství ČR v dálkovém plavání v Račicích skončilo pro naše barvy velmi dobře. Klokani se rozhodně neztratili a znovu ukázali, že dálkové plavání nás baví.",
            "Na mistrovské pětce vybojovala Hanka Jurčáková mezi ženami bronzovou medaili a zároveň se stala mistryní ČR mezi staršími dorostenkami. Na dvacítce přidala Hanka 2. místo celkově a další dorostenecké zlato!",
            "Na desítce skončil Ondra Šimsa třetí a Váša Tichý pátý, mezi ženami Mia Srbová druhá a Tereza Čermáková pátá.",
            "Ve štafetách na 5 km titul mistrů ČR mezi nejstaršími masters (+240 let) vybojovala čtveřice Táborák, Alča, Štverda a Ába. Celkem se na start postavilo 50 štafet. Gratulujeme všem!"
        ]
    },
    {
        "id": "novy-skolni-rok-nova-sezona-2026",
        "title": "Nový školní rok, nová plavecká sezóna. Přidejte se ke Klokanům!",
        "date": "2026-08-28",
        "author": "Jan Srb",
        "image": "assets/aktuality/2235.jpg",
        "excerpt": "Začíná nový školní rok a s ním také nová plavecká sezóna. Skupiny ST, GY, ODA, ODB i přípravka zahajují tréninky.",
        "body": [
            "Začíná nový školní rok a s ním nová plavecká sezóna. Skupiny ST, GY a ODA zahájily sezónu soustředěním a trénují podle rozvrhu v Podolí a na Vinohradech.",
            "Skupina ODB zahajuje tréninky na Vinohradech, přípravka startuje podle platného rozvrhu v úterý a čtvrtek.",
            "Informace o základním plavání a kurzech pro nejmenší najdete na webu kurzy.boh.cz."
        ]
    },
    {
        "id": "soustredeni-jiretin-hodnoceni-2026",
        "title": "Soustředění Jiřetín — hodnocení trenérů",
        "date": "2026-08-28",
        "author": "Jan Srb",
        "image": "assets/aktuality/2234.jpg",
        "excerpt": "Přípravného soustředění v Jizerských horách na bohemácké chatě se zúčastnilo celkem 23 plavců od přípravky po nejvyšší skupiny.",
        "body": [
            "V předposledním prázdninovém týdnu proběhlo přípravné soustředění v Jizerských horách na bohemácké chatě oddílu lyžařské turistiky. Zúčastnilo se celkem 23 plavců – od přípravkářů až po plavce z nejvyšších výkonnostních skupin.",
            "Celý týden nás provázely bodované hry, v nichž zvítězil zelený tým před žlutým, bílým a červeným. Vydařily se také štafety na otevřené vodě i paddleboardy v Jablonci.",
            "Každý si vyzkoušel něco nového a zlepšil si fyzickou kondici. Těšíme se zase za rok!"
        ]
    },
    {
        "id": "me-masters-samorin-2026",
        "title": "16 medailí, rekord ME a pět českých rekordů na Mistrovství Evropy masters!",
        "date": "2026-08-24",
        "author": "Marcela Šťastná",
        "image": "assets/aktuality/2233.jpg",
        "excerpt": "Ve slovenském Šamoríně na ME masters vybojovalo 11 Klokanů parádních 16 medailí, rekord šampionátu a pět českých rekordů!",
        "body": [
            "Ve slovenském Šamoríně v nádherném olympijském centru proběhlo letošní Mistrovství Evropy masters. Do venkovní desetidráhy nastoupilo celkem 11 našich plavců a plavkyň a výsledkem je parádních 16 medailí!",
            "K tomu přidáváme jeden rekord Mistrovství Evropy masters a hned pět českých rekordů: o tři se postaral Juraj Bránik (kategorie 80–84 let), jeden přidala Marcela Šťastná (85–89 let) a jeden Jaroslava Votrubová (80–84 let).",
            "Medaile vybojovala také Ivana Felgrová a mix štafeta 4×50 K ve složení Juraj Bránik, Ivana Felgrová, Katka Augustová a Lešek Smelik vybojovala bronz.",
            "Celkem tedy 11 Klokanů, 16 medailí, 1 rekord ME a 5 českých rekordů. Parádní evropská bilance! Za rok nás čeká Mistrovství světa masters v Budapešti."
        ]
    },
    {
        "id": "memorial-hany-greenfieldove-kolin-2026",
        "title": "Klokani opět bodovali. V Kolíně jsme upevnili bronzovou příčku!",
        "date": "2026-08-23",
        "author": "Jan Srb",
        "image": "assets/aktuality/2232.jpg",
        "excerpt": "Na Memoriálu Hany Greenfieldové v Kolíně na Labi startovalo 19 Klokanů a upevnilo pozici na stupních vítězů ČP DP.",
        "body": [
            "Dálkoplavecký Český pohár pokračoval v Kolíně na Labi tradičním Memoriálem Hany Greenfieldové za příjemné teploty vody 22,8 °C.",
            "Do Kolína vyrazilo 19 Klokanů. Hanka Jurčáková na trati 10 km doplavala druhá a zvítězila mezi dorostenkami, Terka Čermáková skončila čtvrtá. Na 5 km Matyáš Táborský vybojoval 2. místo. V žácích sváděli boj Niko Srb (3. místo) a Michal Němec (4. místo).",
            "Na 3 km s přehledem ovládl kategorii mladších žáků Fanda Tichý a na 1 km zvítězila Kačka Lucbauerová. Klokani upevnili bronzovou příčku v poháru družstev!"
        ]
    }
],

  events: [
    {
        "id": "velka-cena-plzne-2026",
        "name": "Velká cena města Plzně",
        "place": "Plzeň – Slovany",
        "date": "2026-10-03",
        "deadline": "2026-09-29",
        "type": "Pohár",
        "kind": "zavod",
        "note": "Oficiální kalendář Českého svazu plaveckých sportů",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "800 VZ",
            "1500 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "200 M",
            "100 PZ",
            "200 PZ",
            "400 PZ"
        ]
    },
    {
        "id": "podzimni-cena-motorletu-2026",
        "name": "Podzimní cena Motorletu",
        "place": "Praha – Radlice",
        "date": "2026-10-10",
        "deadline": "2026-10-02",
        "type": "Pohár",
        "kind": "zavod",
        "note": "Tradiční podzimní pohárové klání na bazénu v Radlicích",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "100 PZ",
            "200 PZ"
        ]
    },
    {
        "id": "velka-cena-prahy-2026",
        "name": "Velká cena Prahy",
        "place": "Praha – Radlice",
        "date": "2026-10-11",
        "deadline": "2026-10-02",
        "type": "Pohár",
        "kind": "zavod",
        "note": "Pražský pohárový závod",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "50 Z",
            "100 Z",
            "50 P",
            "100 P",
            "50 M",
            "100 M",
            "100 PZ",
            "200 PZ"
        ]
    },
    {
        "id": "plzenske-sprinty-2026",
        "name": "Plzeňské sprinty – ARENA Cup",
        "place": "Plzeň – Slovany",
        "date": "2026-10-15",
        "deadline": "2026-09-29",
        "type": "ČP Arena Cup",
        "kind": "zavod",
        "note": "Kvalifikační mítink Českého poháru",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "200 M",
            "100 PZ",
            "200 PZ",
            "400 PZ"
        ]
    },
    {
        "id": "grand-prix-brno-2026",
        "name": "Grand Prix Brno",
        "place": "Brno – Za Lužánkami",
        "date": "2026-10-30",
        "deadline": "2026-10-19",
        "type": "ČP Arena Cup",
        "kind": "zavod",
        "note": "Mezinárodní závod Českého poháru",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "800 VZ",
            "1500 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "200 M",
            "100 PZ",
            "200 PZ",
            "400 PZ"
        ]
    },
    {
        "id": "podzimni-kp-dlouhe-trate-2026",
        "name": "Podzimní Krajský přebor na dlouhé tratě",
        "place": "Praha – Radlice",
        "date": "2026-11-07",
        "deadline": "2026-10-30",
        "type": "Krajský",
        "kind": "zavod",
        "disciplines": [
            "800 VZ",
            "1500 VZ"
        ]
    },
    {
        "id": "podzimni-kp-2017-mladsi-2026",
        "name": "Podzimní Krajský přebor žactva 2017 a mladší",
        "place": "Praha – Radlice",
        "date": "2026-11-07",
        "deadline": "2026-10-30",
        "type": "Krajský",
        "kind": "zavod",
        "disciplines": [
            "50 VZ",
            "50 Z",
            "50 P",
            "50 M",
            "100 PZ"
        ]
    },
    {
        "id": "zimni-mcr-masters-2026",
        "name": "Zimní mezinárodní MČR masters – XXVI. Korunní cup",
        "place": "Česká Lípa",
        "date": "2026-11-07",
        "deadline": "2026-10-21",
        "type": "Masters",
        "kind": "zavod",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "50 Z",
            "100 Z",
            "50 P",
            "100 P",
            "50 M",
            "100 PZ"
        ]
    },
    {
        "id": "zimni-prebor-prahy-2026",
        "name": "Zimní přebor Prahy a Středočeského kraje",
        "place": "Praha – Podolí",
        "date": "2026-11-13",
        "deadline": "2026-11-04",
        "type": "Krajský",
        "kind": "zavod",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "200 M",
            "100 PZ",
            "200 PZ",
            "400 PZ"
        ]
    },
    {
        "id": "vinohradska-veteraniada-2026",
        "name": "Vinohradská veteraniáda",
        "place": "Praha – Sokol Vinohrady",
        "date": "2026-11-28",
        "deadline": "2026-11-22",
        "type": "Veteráni",
        "kind": "zavod",
        "note": "Tradiční oddílové setkání a závod veteránů Bohemians v bazénu na Vinohradech",
        "disciplines": [
            "50 VZ",
            "50 Z",
            "50 P",
            "50 M",
            "100 PZ"
        ]
    },
    {
        "id": "zimni-mcr-2026",
        "name": "Zimní Mistrovství ČR 2026 OPEN",
        "place": "Plzeň – Slovany",
        "date": "2026-12-17",
        "deadline": "2026-12-08",
        "type": "MČR",
        "kind": "zavod",
        "note": "Vrchol zimní sezóny 2026 na 25 m bazénu",
        "disciplines": [
            "50 VZ",
            "100 VZ",
            "200 VZ",
            "400 VZ",
            "800 VZ",
            "1500 VZ",
            "50 Z",
            "100 Z",
            "200 Z",
            "50 P",
            "100 P",
            "200 P",
            "50 M",
            "100 M",
            "200 M",
            "100 PZ",
            "200 PZ",
            "400 PZ"
        ]
    },
    {
        "id": "vanocni-ctyrboj-2026",
        "name": "Vánoční čtyřboj",
        "place": "Praha – Sokol Vinohrady",
        "date": "2026-12-22",
        "deadline": "2026-12-21",
        "type": "Oddílový",
        "kind": "zavod",
        "note": "Zakončení kalendářního roku pro všechny skupiny oddílu",
        "disciplines": [
            "50 VZ",
            "50 Z",
            "50 P",
            "50 M"
        ]
    },
    {
        "id": "zimni-bezkarske-soustredeni-2027",
        "name": "Zimní běžkařské soustředění 2027",
        "place": "Jiřetín pod Bukovou (Jizerské hory)",
        "date": "2027-01-24",
        "deadline": "2026-10-01",
        "type": "Soustředění",
        "kind": "soustredeni",
        "note": "Zimní příprava a běžky na bohemácké chatě v Jizerských horách.",
        "disciplines": []
    }
],

  records: [
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:24,15",
        "holder": "Petr Novák",
        "year": "2018",
        "date": "25. 05. 2018",
        "place": "Pardubice"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:53,56",
        "holder": "Petr Novák",
        "year": "2018",
        "date": "27. 05. 2018",
        "place": "Pardubice"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:58,27",
        "holder": "Tomáš Havránek",
        "year": "2016",
        "date": "28. 05. 2016",
        "place": "Bergen (NOR)"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:27,04",
        "holder": "Ivan Boryslavskyi",
        "year": "2022",
        "date": "03. 07. 2022",
        "place": "Praha - Podolí"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:57,39",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "25. 04. 2025",
        "place": "Pardubice"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:01,55",
        "holder": "Michal Judickij",
        "year": "2026",
        "date": "11. 08. 2026",
        "place": "Paříž (FRA)"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:29,74",
        "holder": "Marián Dragúň",
        "year": "2014",
        "date": "11. 07. 2014",
        "place": "Praha - Podolí"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:04,75",
        "holder": "Michal Judickij",
        "year": "2026",
        "date": "27. 06. 2026",
        "place": "Praha - Podolí"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:17,13",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "24. 04. 2022",
        "place": "Zlín"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:23,77",
        "holder": "Michal Ledl",
        "year": "2008",
        "date": "30. 07. 2008",
        "place": "Belgrade (SRB)"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:51,13",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "08. 07. 2017",
        "place": "Praha - Podolí"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:49,57",
        "holder": "Petr Novák",
        "year": "2018",
        "date": "26. 05. 2018",
        "place": "Pardubice"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "03:57,57",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "06. 07. 2017",
        "place": "Praha - Podolí"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "08:13,49",
        "holder": "Michal Judickij",
        "year": "2023",
        "date": "13. 08. 2023",
        "place": "Dublin (IRL)"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "15:47,56",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "17. 05. 2025",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:02,42",
        "holder": "Jakub Lahoda",
        "year": "2019",
        "date": "14. 04. 2019",
        "place": "Eindhoven (NED)"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:18,06",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "26. 04. 2025",
        "place": "Pardubice"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "32:57,70",
        "holder": "Martin Straka",
        "year": "2022",
        "date": "04. 05. 2022",
        "place": "Praha - Podolí"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "55:08,90",
        "holder": "Matěj Kozubek",
        "year": "2015",
        "date": "03. 06. 2015",
        "place": "Strakonice"
    },
    {
        "event": "10 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "1:56:23,20",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř"
    },
    {
        "event": "15 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "3:01:27,60",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř"
    },
    {
        "event": "20 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "4:06:23,40",
        "holder": "Pavel Srb",
        "year": "2001",
        "date": "2001",
        "place": "-"
    },
    {
        "event": "25 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "5:14:01,00",
        "holder": "Matěj Kozubek",
        "year": "2018",
        "date": "01. 04. 2018",
        "place": "Zlín"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:26,84",
        "holder": "Anna Kolářová",
        "year": "2017",
        "date": "09. 07. 2017",
        "place": "Praha - Podolí"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:00,90",
        "holder": "Anna Kolářová",
        "year": "2021",
        "date": "09. 04. 2021",
        "place": "Stockholm (SWE)"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:19,47",
        "holder": "Lenka Jarošová",
        "year": "2011",
        "date": "09. 07. 2011",
        "place": "Praha -\n Podolí"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:27,63",
        "holder": "Ilona Kudrnáčová",
        "year": "2005",
        "date": "18. 01. 2005",
        "place": "Stockholm (SWE)"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:37,72",
        "holder": "Mia Srbová",
        "year": "2026",
        "date": "30. 05. 2026",
        "place": "Ústí nad Labem"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:14,32",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "03. 05. 2009",
        "place": "České Budějovice"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,45",
        "holder": "Martina Pechová",
        "year": "2014",
        "date": "23. 08. 2014",
        "place": "Berlín (GER)"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:07,69",
        "holder": "Martina Pechová",
        "year": "2017",
        "date": "24. 07. 2017",
        "place": "Budapešť (HUN)"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:25,26",
        "holder": "Martina Pechová",
        "year": "2017",
        "date": "27. 07. 2017",
        "place": "Budapešť (HUN)"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:25,35",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 11. 2015",
        "place": "Dubai (UAE)"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:55,26",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 08. 2015",
        "place": "Kazaň (RUS)"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,97",
        "holder": "Margarita Paroubková",
        "year": "2026",
        "date": "26. 06. 2026",
        "place": "Praha - Podolí"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:27,29",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "05. 05. 2019",
        "place": "Ostrava"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:06,19",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "28. 04. 2019",
        "place": "Bratislava (SVK)"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "17:21,23",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "21. 06. 2019",
        "place": "České Budějovice"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:14,13",
        "holder": "Kristýna Horská",
        "year": "2016",
        "date": "29. 05. 2016",
        "place": "Bergen (NOR)"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:48,56",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "12. 10. 2019",
        "place": "Berlín (GER)"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "35:22,90",
        "holder": "Lenka Pavlacká",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "59:23,50",
        "holder": "Lenka Pavlacká",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí"
    },
    {
        "event": "10 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "2:28:41,90",
        "holder": "Šárka Landsmannová",
        "year": "2014",
        "date": "11. 05. 2014",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "15 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "3:57:44,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř"
    },
    {
        "event": "20 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "5:21:00,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř"
    },
    {
        "event": "25 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "6:42:34,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:23,60",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:52,53",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "19. 12. 2009",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:55,39",
        "holder": "Tomáš Havránek",
        "year": "2016",
        "date": "19. 11. 2016",
        "place": "Graz (AUT)"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:25,78",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "16. 12. 2017",
        "place": "Zlín"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,71",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "18. 12. 2025",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:56,88",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "20. 12. 2025",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:28,78",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:02,03",
        "holder": "Martin Bejček",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:13,85",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "14. 10. 2016",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:22,37",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:49,44",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "20. 12. 2009",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:46,04",
        "holder": "Tomáš Havránek",
        "year": "2018",
        "date": "16. 12. 2018",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "03:48,65",
        "holder": "David Noll",
        "year": "2017",
        "date": "23. 11. 2017",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "07:58,80",
        "holder": "Michal Judickij",
        "year": "2024",
        "date": "26. 10. 2024",
        "place": "Šamorín (SVK)"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "15:24,42",
        "holder": "Michal Judickij",
        "year": "2024",
        "date": "11. 11. 2024",
        "place": "Gent (BEL)"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,00",
        "holder": "Tomáš Havránek",
        "year": "2017",
        "date": "25. 11. 2017",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:56,50",
        "holder": "Tomáš Havránek",
        "year": "2017",
        "date": "23. 11. 2017",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:11,05",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "17. 10. 2025",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "32:10,64",
        "holder": "Matěj Kozubek",
        "year": "2017",
        "date": "07. 10. 2017",
        "place": "Levice (SVK)"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "53:47,57",
        "holder": "Matěj Kozubek",
        "year": "2017",
        "date": "07. 10. 2017",
        "place": "Levice (SVK)"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:46,87",
        "holder": "Tomáš Havránek",
        "year": "2024",
        "date": "17. 12. 2024",
        "place": "Praha - Vinohrady"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:26,74",
        "holder": "Anna Kolářová",
        "year": "2019",
        "date": "19. 10. 2019",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:59,64",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "12. 12. 2009",
        "place": "Istambul (TUR)"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:11,38",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "14. 12. 2019",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:27,06",
        "holder": "Ilona Kudrnáčová",
        "year": "2001",
        "date": "13. 12. 2001",
        "place": "Antverpy (BEL)"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:57,75",
        "holder": "Ilona Kudrnáčová",
        "year": "2001",
        "date": "13. 12. 2001",
        "place": "-"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:06,05",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "13. 12. 2009",
        "place": "Istambul (TUR)"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:31,05",
        "holder": "Martina Pechová",
        "year": "2016",
        "date": "06. 12. 2016",
        "place": "Windsor (CAN)"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:06,86",
        "holder": "Martina Pechová",
        "year": "2016",
        "date": "09. 12. 2016",
        "place": "Windsor (CAN)"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:23,20",
        "holder": "Martina Pechová",
        "year": "2015",
        "date": "06. 12. 2015",
        "place": "Netanya (ISR)"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:24,93",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "15. 11. 2014",
        "place": "Brno - Lesná"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:54,33",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "21. 12. 2014",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:58,67",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "16. 10. 2015",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:13,95",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "13. 12. 2019",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "08:49,80",
        "holder": "Julie Pleskotová",
        "year": "2021",
        "date": "18. 12. 2021",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "16:49,09",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:00,36",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "15. 12. 2019",
        "place": "Plzeň - Slovany"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:09,80",
        "holder": "Kristýna Horská",
        "year": "2017",
        "date": "16. 12. 2017",
        "place": "Kodaň (DEN)"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:38,59",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "04. 12. 2019",
        "place": "Glasgow (GBR)"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "34:59,35",
        "holder": "Lenka Pavlacká",
        "year": "2020",
        "date": "04. 06. 2020",
        "place": "Praha - Vinohrady"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "1:00:00,20",
        "holder": "Julie Pleskotová",
        "year": "2021",
        "date": "06. 11. 2021",
        "place": "Krnov"
    },
    {
        "event": "4 boj",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:02,90",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "17. 12. 2015",
        "place": "Praha - Vinohrady"
    }
],

  parentsNotes: [
    "Novou sezónu začínáme závody — tréninky všech závodních skupin ST, ODA, ODB i přípravky běží v Podolí a na Vinohradech.",
    "Sobotní trénink v Podolí v září již NENÍ.",
    "Nábor do závodní přípravky (6–12 let) byl pro velký zájem UKONČEN pro vyčerpání kapacity.",
    "V roce 2026 se uskutečnilo setkání při 80. výročí oddílu na Hagiboru — 212 Klokanů vytvořilo fantastickou atmosféru! Fotografie najdete v sekci Foto.",
    "Termínová listina na podzim/zimu 2026 je schválena. Přihlašujte se na nejbližší závody včas přes Intranet."
],

  galleries: [
    {
        "id": "gal-940-1",
        "title": "Oslava 80 let oddílu — Příchod na oslavu",
        "url": "assets/foto/86049.jpg",
        "caption": "Tenisový areál na Hagiboru, 80 let TJ Bohemians Praha"
    },
    {
        "id": "gal-940-2",
        "title": "Oslava 80 let oddílu — Program akce",
        "url": "assets/foto/86050.jpg",
        "caption": "Slavnostní odpočet 80–0 a ohlédnutí za historií oddílu"
    },
    {
        "id": "gal-940-3",
        "title": "Oslava 80 let oddílu — Setkání generací",
        "url": "assets/foto/86054.jpg",
        "caption": "Současní plavci, bývalí reprezentanti a trenéři pohromadě"
    },
    {
        "id": "gal-940-4",
        "title": "Oslava 80 let oddílu — Společná fotka Klokanů",
        "url": "assets/foto/86071.jpg",
        "caption": "212 účastníků oslavy 80. výročí plavecké Bohemky"
    },
    {
        "id": "gal-940-5",
        "title": "Oslava 80 let oddílu — Trofeje a LED prezentace",
        "url": "assets/foto/86075.jpg",
        "caption": "Poháry, historické dresy a ocenění našich olympioniků"
    },
    {
        "id": "gal-940-6",
        "title": "Oslava 80 let oddílu — Večerní atmosféra",
        "url": "assets/foto/86088.jpg",
        "caption": "Raut, grilování, tombola a promítání historického filmu"
    }
],

  demoRoster: {
    "velka-cena-plzne-2026": [
        {
            "swimmer": "Hana Jurčáková",
            "group": "ST",
            "disciplines": [
                "200 VZ",
                "400 VZ"
            ]
        },
        {
            "swimmer": "Václav Tichý",
            "group": "ST",
            "disciplines": [
                "100 VZ",
                "200 VZ"
            ]
        },
        {
            "swimmer": "Mia Srbová",
            "group": "ST",
            "disciplines": [
                "50 Z",
                "100 Z"
            ]
        }
    ],
    "podzimni-cena-motorletu-2026": [
        {
            "swimmer": "Michal Němec",
            "group": "ST",
            "disciplines": [
                "100 VZ",
                "200 PZ"
            ]
        },
        {
            "swimmer": "Niko Srb",
            "group": "ST",
            "disciplines": [
                "50 VZ",
                "100 Z"
            ]
        },
        {
            "swimmer": "František Tichý",
            "group": "PŘÍPRAVKA",
            "disciplines": [
                "50 VZ",
                "50 P"
            ]
        }
    ],
    "zimni-bezkarske-soustredeni-2027": [
        {
            "swimmer": "Hana Jurčáková",
            "group": "ST",
            "disciplines": []
        },
        {
            "swimmer": "Václav Tichý",
            "group": "ST",
            "disciplines": []
        },
        {
            "swimmer": "Michal Judickij",
            "group": "VÝBĚR",
            "disciplines": []
        }
    ]
}
};
