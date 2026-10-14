/**
 * Klokani — TJ Bohemians Praha (oddíl plavání)
 * Vanilla Data Store & Seed Constants
 * Aktualizováno podle oficiálního webu https://www.boh.cz k 80. výročí oddílu (1946–2026)
 */

window.BohData = {
  club: {
    name: "TJ Bohemians Praha",
    fullName: "TJ Bohemians Praha — oddíl plavání",
    founded: 1946,
    anniversary: 80,
    tagline: "UŽ TO SPOLU TÁHNEM 80 LET • 1946–2026",
    subtagline: "Plavecký oddíl TJ Bohemians Praha — od roku 1946",
    email: "jan.srb@czechswimming.cz",
    officialWeb: "https://www.boh.cz",
    coursesWeb: "https://kurzy.boh.cz",
    pools: ["Plavecký stadion Podolí (Podolské nábřeží 3/1184, Praha 4)", "Sokol Vinohrady (Polská 2400/1a, Praha 2)"],
    bankAccount: "123456789/0300 (ČSOB)",
    ico: "00539121"
  },

  disciplines: [
    { code: "50 VZ", label: "50 m volný způsob", stroke: "Volný způsob", note: "sprint" },
    { code: "100 VZ", label: "100 m volný způsob", stroke: "Volný způsob", note: "olympijská trať" },
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
          "id": "velka-cena-prahy-hodnoceni-2026",
          "title": "Velká cena Prahy - hodnocení",
          "date": "2026-10-12",
          "author": "Martin Břenda",
          "image": "assets/aktuality/86836.jpg",
          "excerpt": "Jestliže patřil v sobotu radlický bazén mladším plavcům, tak v neděli se do soutěžení v Radlicích zapojili starší plavci. Ve finále hlavního závodu na 400K obsadila Terka Čermáková 6. místo.",
          "body": [
                "Jestliže patřil v sobotu radlický bazén mladším plavcům, tak v neděli se do soutěžení v Radlicích zapojili starší plavci. Účast bohemáků byla slušná, závodní nasazení bylo, z mého pohledu, dobré. Někdo dokázal zaplavat i osobní rekord a někteří vybojovali i umístění na bedně.",
                "Ve finále hlavního závodu na 400K jsme měli pouze jednu plavkyni a to Terku Čermákovou, která obsadila 6. místo.",
                "Kompletní výsledky najdete v menu Závody. Bohemka, do toho!"
          ]
    },
    {
          "id": "podzimni-cena-motorletu-hodnoceni-2026",
          "title": "Podzimní cena Motorletu - hodnocení",
          "date": "2026-10-12",
          "author": "Soňa Nováková",
          "image": "",
          "excerpt": "V sobotu 10.10. se konala tradiční Podzimní cena Motorletu v Radlicích. Míša Němec vybojoval 2. místo na 100 a 200 motýlek, Matěj Vrchlabský 2. místo na 100 motýlek.",
          "body": [
                "V sobotu 10.10. se konala tradiční Podzimní cena Motorletu v Radlicích. Letos byla opravdu silná konkurence, ale i tak se pár našich plavců kvalifikovalo a předvedlo skvělé výkony!",
                "Nejlépe si vedl Míša Němec, který vybojoval 2. místo na 100 a 200 motýlek a účast ve finále na 200 kraul, kde si dohmátl pro 5. místo. Další medailista byl Matěj Vrchlabský, který si vyplaval 2. místo na 100 motýlek a také účast ve finále, kam postoupil z druhého místa, ale nakonec dohmátnul na páté pozici.",
                "Ostatní si vyplavali moc hezké osobáčky! Celkově se závody nesly v dobré atmosféře a doufáme, že to tak bude pokračovat! Výsledky jsou v menu Závody. M číslo 79."
          ]
    },
    {
          "id": "velka-cena-mesta-plzne-hodnoceni-2026",
          "title": "Velká cena města Plzně - hodnocení",
          "date": "2026-10-04",
          "author": "Jan Srb",
          "image": "assets/aktuality/2242.jpg",
          "excerpt": "Velká cena města Plzně tradičně otevírá podzimní sezónu na 1500m. Mezi ženami doplavala na 2. místě Mia Srbová, mezi žáky zvítězil Ondra Benš.",
          "body": [
                "Velká cena města Plzně je tradičně prvním závodem sezóny, na který se vydáváme. Pro naše plavce má především jednu důležitou úlohu – otestovat, jak se v probíhající přípravě daří budovat vytrvalost.",
                "Hlavním testem je samozřejmě 1500 metrů volným způsobem. K tomu si každý podle chuti může přidat některou ze stovek, které nabízí program závodu. A že se Klokanům dařilo, ukázaly výsledky hned na úvod sezóny.",
                "Na hlavní patnáctistovce jsme měli dva plavce na stupních vítězů. Mezi ženami i v absolutním pořadí doplavala na výborném 2. místě Mia Srbová, mezi žáky pak zvítězil Ondra Benš.",
                "A dařilo se i v dalších disciplínách: Pepča Pistulková – starší žačky - 1. 100 P, 2. 100 Z, 3. 100 K, Madla Šťastná – mladší žačky - 3. 100 K, Fanda Tichý – mladší žáci - 1. 100 M, Vojta Vrchlabský – mladší žáci - 2. 100 K, 3. 100 P, 3. 100 Z.",
                "Všem plavcům gratulujeme k předvedeným výkonům a děkujeme za první závodní ochutnávku nové sezóny! Výsledky najdete v menu Závody, fotografie pak ve Fotoalbech. Bohemka, do toho!"
          ]
    },
    {
      "id": "evropsky-pohar-dp-razanac-2026",
      "title": "Evropský pohár v dálkovém plavání v chorvatském Razanacu",
      "date": "2026-09-28",
      "author": "Jan Srb",
      "image": "assets/aktuality/2241.jpg",
      "excerpt": "Na další zastávce Evropského poháru v dálkovém plavání, tentokrát v přímořském chorvatském Razanacu, reprezentovala Bohemku i Českou republiku Háňa Jurčáková.",
      "body": [
        "Na další zastávce Evropského poháru v dálkovém plavání, tentokrát v přímořském chorvatském Razanacu, reprezentovala Bohemku i Českou republiku Háňa Jurčáková.",
        "Hanka vystartovala do rychlého závodu s chutí zopakovat svou povedenou mezinárodní premiéru z mistrovství Evropy juniorů. Tentokrát se musela odvážně poprat nejen se soupeřkami, ale také s vlnami Jadranu.",
        "Krásné prostředí malého přístavního městečka se již tradičně v září stává centrem dalšího kola Evropského poháru a ani letos nechyběla pořádná dálkoplavská atmosféra.",
        "Po statečném výkonu bojovala Hanka až do samotného závěru a v těsném finiši nakonec doplavala na 12. místě. Moc gratulujeme k předvedenému výkonu!",
        "Tímto závodem pro Klokany definitivně končí letošní úspěšná sezóna dálkového plavání. A Hance teď začíná zasloužený odpočinek. Klokani, do toho!"
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
        "image": "assets/aktuality/2238.jpg",
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
        "place": "Pardubice",
        "category": "Open"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:53,56",
        "holder": "Petr Novák",
        "year": "2018",
        "date": "27. 05. 2018",
        "place": "Pardubice",
        "category": "Open"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:58,27",
        "holder": "Tomáš Havránek",
        "year": "2016",
        "date": "28. 05. 2016",
        "place": "Bergen (NOR)",
        "category": "Open"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:27,04",
        "holder": "Ivan Boryslavskyi",
        "year": "2022",
        "date": "03. 07. 2022",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:57,39",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "25. 04. 2025",
        "place": "Pardubice",
        "category": "Open"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:01,55",
        "holder": "Michal Judickij",
        "year": "2026",
        "date": "11. 08. 2026",
        "place": "Paříž (FRA)",
        "category": "Open"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:29,74",
        "holder": "Marián Dragúň",
        "year": "2014",
        "date": "11. 07. 2014",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:04,75",
        "holder": "Michal Judickij",
        "year": "2026",
        "date": "27. 06. 2026",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:17,13",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "24. 04. 2022",
        "place": "Zlín",
        "category": "Open"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:23,77",
        "holder": "Michal Ledl",
        "year": "2008",
        "date": "30. 07. 2008",
        "place": "Belgrade (SRB)",
        "category": "Open"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:51,13",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "08. 07. 2017",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:49,57",
        "holder": "Petr Novák",
        "year": "2018",
        "date": "26. 05. 2018",
        "place": "Pardubice",
        "category": "Open"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "03:57,57",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "06. 07. 2017",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "08:13,49",
        "holder": "Michal Judickij",
        "year": "2023",
        "date": "13. 08. 2023",
        "place": "Dublin (IRL)",
        "category": "Open"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "15:47,56",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "17. 05. 2025",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:02,42",
        "holder": "Jakub Lahoda",
        "year": "2019",
        "date": "14. 04. 2019",
        "place": "Eindhoven (NED)",
        "category": "Open"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:18,06",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "26. 04. 2025",
        "place": "Pardubice",
        "category": "Open"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "32:57,70",
        "holder": "Martin Straka",
        "year": "2022",
        "date": "04. 05. 2022",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "55:08,90",
        "holder": "Matěj Kozubek",
        "year": "2015",
        "date": "03. 06. 2015",
        "place": "Strakonice",
        "category": "Open"
    },
    {
        "event": "10 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "1:56:23,20",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř",
        "category": "Open"
    },
    {
        "event": "15 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "3:01:27,60",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř",
        "category": "Open"
    },
    {
        "event": "20 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "4:06:23,40",
        "holder": "Pavel Srb",
        "year": "2001",
        "date": "2001",
        "place": "-",
        "category": "Open"
    },
    {
        "event": "25 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "5:14:01,00",
        "holder": "Matěj Kozubek",
        "year": "2018",
        "date": "01. 04. 2018",
        "place": "Zlín",
        "category": "Open"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:26,84",
        "holder": "Anna Kolářová",
        "year": "2017",
        "date": "09. 07. 2017",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:00,90",
        "holder": "Anna Kolářová",
        "year": "2021",
        "date": "09. 04. 2021",
        "place": "Stockholm (SWE)",
        "category": "Open"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:27,63",
        "holder": "Ilona Kudrnáčová",
        "year": "2005",
        "date": "18. 01. 2005",
        "place": "Stockholm (SWE)",
        "category": "Open"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:37,72",
        "holder": "Mia Srbová",
        "year": "2026",
        "date": "30. 05. 2026",
        "place": "Ústí nad Labem",
        "category": "Open"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:14,32",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "03. 05. 2009",
        "place": "České Budějovice",
        "category": "Open"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,45",
        "holder": "Martina Pechová",
        "year": "2014",
        "date": "23. 08. 2014",
        "place": "Berlín (GER)",
        "category": "Open"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:07,69",
        "holder": "Martina Pechová",
        "year": "2017",
        "date": "24. 07. 2017",
        "place": "Budapešť (HUN)",
        "category": "Open"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:25,26",
        "holder": "Martina Pechová",
        "year": "2017",
        "date": "27. 07. 2017",
        "place": "Budapešť (HUN)",
        "category": "Open"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:25,35",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 11. 2015",
        "place": "Dubai (UAE)",
        "category": "Open"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:55,26",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 08. 2015",
        "place": "Kazaň (RUS)",
        "category": "Open"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,97",
        "holder": "Margarita Paroubková",
        "year": "2026",
        "date": "26. 06. 2026",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:27,29",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "05. 05. 2019",
        "place": "Ostrava",
        "category": "Open"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:06,19",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "28. 04. 2019",
        "place": "Bratislava (SVK)",
        "category": "Open"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "17:21,23",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "21. 06. 2019",
        "place": "České Budějovice",
        "category": "Open"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:14,13",
        "holder": "Kristýna Horská",
        "year": "2016",
        "date": "29. 05. 2016",
        "place": "Bergen (NOR)",
        "category": "Open"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:48,56",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "12. 10. 2019",
        "place": "Berlín (GER)",
        "category": "Open"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "35:22,90",
        "holder": "Lenka Pavlacká",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "59:23,50",
        "holder": "Lenka Pavlacká",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí",
        "category": "Open"
    },
    {
        "event": "10 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "2:28:41,90",
        "holder": "Šárka Landsmannová",
        "year": "2014",
        "date": "11. 05. 2014",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "15 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "3:57:44,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř",
        "category": "Open"
    },
    {
        "event": "20 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "5:21:00,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř",
        "category": "Open"
    },
    {
        "event": "25 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "6:42:34,00",
        "holder": "Simona Švandelíková",
        "year": "2011",
        "date": "17. 09. 2011",
        "place": "Jaroměř",
        "category": "Open"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:23,60",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:52,53",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "19. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:55,39",
        "holder": "Tomáš Havránek",
        "year": "2016",
        "date": "19. 11. 2016",
        "place": "Graz (AUT)",
        "category": "Open"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:25,78",
        "holder": "Petr Novák",
        "year": "2017",
        "date": "16. 12. 2017",
        "place": "Zlín",
        "category": "Open"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,71",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "18. 12. 2025",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:56,88",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "20. 12. 2025",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:28,78",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:02,03",
        "holder": "Martin Bejček",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:13,85",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "14. 10. 2016",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:22,37",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:49,44",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "20. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:46,04",
        "holder": "Tomáš Havránek",
        "year": "2018",
        "date": "16. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "03:48,65",
        "holder": "David Noll",
        "year": "2017",
        "date": "23. 11. 2017",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "07:58,80",
        "holder": "Michal Judickij",
        "year": "2024",
        "date": "26. 10. 2024",
        "place": "Šamorín (SVK)",
        "category": "Open"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "15:24,42",
        "holder": "Michal Judickij",
        "year": "2024",
        "date": "11. 11. 2024",
        "place": "Gent (BEL)",
        "category": "Open"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,00",
        "holder": "Tomáš Havránek",
        "year": "2017",
        "date": "25. 11. 2017",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:56,50",
        "holder": "Tomáš Havránek",
        "year": "2017",
        "date": "23. 11. 2017",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:11,05",
        "holder": "Michal Judickij",
        "year": "2025",
        "date": "17. 10. 2025",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "32:10,64",
        "holder": "Matěj Kozubek",
        "year": "2017",
        "date": "07. 10. 2017",
        "place": "Levice (SVK)",
        "category": "Open"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "53:47,57",
        "holder": "Matěj Kozubek",
        "year": "2017",
        "date": "07. 10. 2017",
        "place": "Levice (SVK)",
        "category": "Open"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:46,87",
        "holder": "Tomáš Havránek",
        "year": "2024",
        "date": "17. 12. 2024",
        "place": "Praha - Vinohrady",
        "category": "Open"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:26,74",
        "holder": "Anna Kolářová",
        "year": "2019",
        "date": "19. 10. 2019",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:59,64",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "12. 12. 2009",
        "place": "Istambul (TUR)",
        "category": "Open"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:11,38",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "14. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:27,06",
        "holder": "Ilona Kudrnáčová",
        "year": "2001",
        "date": "13. 12. 2001",
        "place": "Antverpy (BEL)",
        "category": "Open"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:57,75",
        "holder": "Ilona Kudrnáčová",
        "year": "2001",
        "date": "13. 12. 2001",
        "place": "-",
        "category": "Open"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:06,05",
        "holder": "Lenka Jarošová",
        "year": "2009",
        "date": "13. 12. 2009",
        "place": "Istambul (TUR)",
        "category": "Open"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:31,05",
        "holder": "Martina Pechová",
        "year": "2016",
        "date": "06. 12. 2016",
        "place": "Windsor (CAN)",
        "category": "Open"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:06,86",
        "holder": "Martina Pechová",
        "year": "2016",
        "date": "09. 12. 2016",
        "place": "Windsor (CAN)",
        "category": "Open"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:23,20",
        "holder": "Martina Pechová",
        "year": "2015",
        "date": "06. 12. 2015",
        "place": "Netanya (ISR)",
        "category": "Open"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:24,93",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "15. 11. 2014",
        "place": "Brno - Lesná",
        "category": "Open"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:54,33",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "21. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:58,67",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "16. 10. 2015",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:13,95",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "13. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "08:49,80",
        "holder": "Julie Pleskotová",
        "year": "2021",
        "date": "18. 12. 2021",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "16:49,09",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:00,36",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "15. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Open"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:09,80",
        "holder": "Kristýna Horská",
        "year": "2017",
        "date": "16. 12. 2017",
        "place": "Kodaň (DEN)",
        "category": "Open"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:38,59",
        "holder": "Kristýna Horská",
        "year": "2019",
        "date": "04. 12. 2019",
        "place": "Glasgow (GBR)",
        "category": "Open"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "34:59,35",
        "holder": "Lenka Pavlacká",
        "year": "2020",
        "date": "04. 06. 2020",
        "place": "Praha - Vinohrady",
        "category": "Open"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "1:00:00,20",
        "holder": "Julie Pleskotová",
        "year": "2021",
        "date": "06. 11. 2021",
        "place": "Krnov",
        "category": "Open"
    },
    {
        "event": "4 boj",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:02,90",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "17. 12. 2015",
        "place": "Praha - Vinohrady",
        "category": "Open"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:24,87",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "28. 06. 2009",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:54,88",
        "holder": "David Noll",
        "year": "2016",
        "date": "09. 07. 2016",
        "place": "Hódmezővásárhely (HUN)",
        "category": "Starší dorost"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:02,11",
        "holder": "Petr Novák",
        "year": "2014",
        "date": "10. 07. 2014",
        "place": "Dordrecht (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:27,04",
        "holder": "Ivan Boryslavskyi",
        "year": "2022",
        "date": "03. 07. 2022",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:57,58",
        "holder": "Pavel Vokoun",
        "year": "1988",
        "date": "1988",
        "place": "-",
        "category": "Starší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:04,63",
        "holder": "Pavel Vokoun",
        "year": "1988",
        "date": "24. 07. 1988",
        "place": "-",
        "category": "Starší dorost"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:29,81",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "05. 07. 2022",
        "place": "Otopeni (ROU)",
        "category": "Starší dorost"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:05,33",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "23. 04. 2022",
        "place": "Zlín",
        "category": "Starší dorost"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:17,13",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "24. 04. 2022",
        "place": "Zlín",
        "category": "Starší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:23,77",
        "holder": "Michal Ledl",
        "year": "2008",
        "date": "30. 07. 2008",
        "place": "Belgrade (SRB)",
        "category": "Starší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:52,13",
        "holder": "Tomáš Havránek",
        "year": "2012",
        "date": "01. 04. 2012",
        "place": "Coimbra (POR)",
        "category": "Starší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:51,80",
        "holder": "Petr Novák",
        "year": "2014",
        "date": "12. 07. 2014",
        "place": "Dordrecht (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "03:57,95",
        "holder": "Petr Novák",
        "year": "2014",
        "date": "09. 07. 2014",
        "place": "Dordrecht (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "08:22,93",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "24. 04. 2022",
        "place": "Zlín",
        "category": "Starší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "16:04,42",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "10. 04. 2022",
        "place": "Kranj (SLO)",
        "category": "Starší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:02,88",
        "holder": "Jakub Lahoda",
        "year": "2018",
        "date": "05. 07. 2018",
        "place": "Helsinki (FIN)",
        "category": "Starší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:22,51",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "08. 07. 2022",
        "place": "Otopeni (ROU)",
        "category": "Starší dorost"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "33:46,10",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "11. 05. 2014",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "56:42,60",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "11. 05. 2014",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "10 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "1:56:23,20",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř",
        "category": "Starší dorost"
    },
    {
        "event": "15 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "3:01:27,60",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř",
        "category": "Starší dorost"
    },
    {
        "event": "20 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "4:12:21,30",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "13. 09. 2014",
        "place": "Jaroměř",
        "category": "Starší dorost"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:27,48",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "13. 07. 2014",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:02,90",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "11. 07. 2014",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:22,25",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "16. 03. 2019",
        "place": "Brno - Lužánky",
        "category": "Starší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:29,52",
        "holder": "Karla Škopová",
        "year": "2026",
        "date": "08. 05. 2026",
        "place": "Pardubice",
        "category": "Starší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:03,87",
        "holder": "Barbora Škopová",
        "year": "2026",
        "date": "14. 03. 2026",
        "place": "Ostrava",
        "category": "Starší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:17,24",
        "holder": "Lenka Jarošová",
        "year": "2005",
        "date": "21. 05. 2005",
        "place": "České Budějovice",
        "category": "Starší dorost"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:33,18",
        "holder": "Tereza Delmotte",
        "year": "2010",
        "date": "09. 07. 2010",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:11,59",
        "holder": "Natálie Zápotocká",
        "year": "2024",
        "date": "06. 07. 2024",
        "place": "Vilnius (LTU)",
        "category": "Starší dorost"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:31,47",
        "holder": "Natálie Zápotocká",
        "year": "2024",
        "date": "04. 07. 2024",
        "place": "Vilnius (LTU)",
        "category": "Starší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:25,35",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 11. 2015",
        "place": "Dubai (UAE)",
        "category": "Starší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:55,26",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "06. 08. 2015",
        "place": "Kazaň (RUS)",
        "category": "Starší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,97",
        "holder": "Margarita Paroubková",
        "year": "2026",
        "date": "26. 06. 2026",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:27,57",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "20. 06. 2019",
        "place": "České Budějovice",
        "category": "Starší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:06,19",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "28. 04. 2019",
        "place": "Bratislava (SVK)",
        "category": "Starší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "17:21,23",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "21. 06. 2019",
        "place": "České Budějovice",
        "category": "Starší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:54,86",
        "holder": "Kristýna Horská",
        "year": "2015",
        "date": "04. 07. 2015",
        "place": "Pardubice",
        "category": "Starší dorost"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "35:54,90",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "14. 04. 2019",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "1:00:06,80",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "14. 04. 2019",
        "place": "Praha - Podolí",
        "category": "Starší dorost"
    },
    {
        "event": "10 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "2:35:59,00",
        "holder": "Kateřina Haláková",
        "year": "2007",
        "date": "07. 04. 2007",
        "place": "Pardubice",
        "category": "Starší dorost"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:23,60",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:52,53",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "19. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:57,20",
        "holder": "Tomáš Havránek",
        "year": "2012",
        "date": "11. 11. 2012",
        "place": "Wr. Neustadt (AUT)",
        "category": "Starší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:25,82",
        "holder": "Ivan Boryslavskyi",
        "year": "2022",
        "date": "15. 10. 2022",
        "place": "Wroclaw (POL)",
        "category": "Starší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:56,72",
        "holder": "Pavel Vokoun",
        "year": "1987",
        "date": "12. 12. 1987",
        "place": "-",
        "category": "Starší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:58,78",
        "holder": "Jakub Lahoda",
        "year": "2018",
        "date": "15. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:28,78",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:02,03",
        "holder": "Martin Bejček",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:13,85",
        "holder": "Martin Bejček",
        "year": "2016",
        "date": "14. 10. 2016",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:22,37",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "18. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:49,44",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "20. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:47,47",
        "holder": "David Noll",
        "year": "2017",
        "date": "11. 11. 2017",
        "place": "Brno - Lesná",
        "category": "Starší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "03:48,65",
        "holder": "David Noll",
        "year": "2017",
        "date": "23. 11. 2017",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "08:08,58",
        "holder": "Jakub Lahoda",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "15:33,72",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "18. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,30",
        "holder": "Michal Ledl",
        "year": "2009",
        "date": "19. 12. 2009",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:59,21",
        "holder": "Jakub Lahoda",
        "year": "2018",
        "date": "13. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:13,77",
        "holder": "Michal Judickij",
        "year": "2022",
        "date": "27. 11. 2022",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "32:27,50",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "08. 11. 2014",
        "place": "Krnov",
        "category": "Starší dorost"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "54:56,70",
        "holder": "Matěj Kozubek",
        "year": "2014",
        "date": "08. 11. 2014",
        "place": "Krnov",
        "category": "Starší dorost"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:49,73",
        "holder": "Patrik Boháč",
        "year": "2026",
        "date": "18. 06. 2026",
        "place": "Praha - Vinohrady",
        "category": "Starší dorost"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:26,80",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "17. 10. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:01,10",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "11. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:20,12",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "03. 11. 2019",
        "place": "Jihlava",
        "category": "Starší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:28,23",
        "holder": "Alžběta Řehořková",
        "year": "2010",
        "date": "27. 11. 2010",
        "place": "Eindhoven (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:01,09",
        "holder": "Alžběta Řehořková",
        "year": "2010",
        "date": "25. 11. 2010",
        "place": "Eindhoven (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:13,08",
        "holder": "Alžběta Řehořková",
        "year": "2010",
        "date": "28. 11. 2010",
        "place": "Eindhoven (NED)",
        "category": "Starší dorost"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:32,26",
        "holder": "Kristýna Horská",
        "year": "2014",
        "date": "19. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:08,70",
        "holder": "Martina Pechová",
        "year": "2006",
        "date": "18. 11. 2006",
        "place": "Znojmo",
        "category": "Starší dorost"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:29,14",
        "holder": "Natálie Zápotocká",
        "year": "2025",
        "date": "18. 12. 2025",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:24,93",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "15. 11. 2014",
        "place": "Brno - Lesná",
        "category": "Starší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:54,33",
        "holder": "Anna Kolářová",
        "year": "2014",
        "date": "21. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:58,67",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "16. 10. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:20,37",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "13. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "08:51,40",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "14. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "16:52,85",
        "holder": "Julie Pleskotová",
        "year": "2019",
        "date": "12. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:01,38",
        "holder": "Kristýna Horská",
        "year": "2015",
        "date": "10. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:10,40",
        "holder": "Kristýna Horská",
        "year": "2015",
        "date": "11. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:39,87",
        "holder": "Kristýna Horská",
        "year": "2015",
        "date": "02. 12. 2015",
        "place": "Netanya (ISR)",
        "category": "Starší dorost"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "35:21,41",
        "holder": "Julie Pleskotová",
        "year": "2020",
        "date": "04. 06. 2020",
        "place": "Praha - Vinohrady",
        "category": "Starší dorost"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "1:07:23,70",
        "holder": "Tereza Delmotte",
        "year": "2010",
        "date": "06. 11. 2010",
        "place": "Krnov",
        "category": "Starší dorost"
    },
    {
        "event": "4 boj",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:02,90",
        "holder": "Anna Kolářová",
        "year": "2015",
        "date": "17. 12. 2015",
        "place": "Praha - Vinohrady",
        "category": "Starší dorost"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:57,24",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "24. 11. 2012",
        "place": "Žilina (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:05,46",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "25. 11. 2012",
        "place": "Žilina (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:28,09",
        "holder": "David Lahoda",
        "year": "2021",
        "date": "11. 09. 2021",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:01,33",
        "holder": "David Lahoda",
        "year": "2021",
        "date": "12. 09. 2021",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:10,01",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "14. 11. 2020",
        "place": "Budapešť (HUN)",
        "category": "Mladší dorost"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:30,42",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "25. 11. 2007",
        "place": "Pitesti (ROM)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:07,40",
        "holder": "Petr Bárta",
        "year": "1993",
        "date": "28. 06. 1993",
        "place": "-",
        "category": "Mladší dorost"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:26,45",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "26. 09. 2020",
        "place": "Pardubice",
        "category": "Mladší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:24,50",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "23. 11. 2007",
        "place": "Pitesti (ROM)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:53,37",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "23. 11. 2012",
        "place": "Žilina (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:57,59",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "04. 05. 2012",
        "place": "Bratislava (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:09,41",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "23. 06. 2012",
        "place": "Brno - Lužánky",
        "category": "Mladší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "08:33,41",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "15. 11. 2020",
        "place": "Budapešť (HUN)",
        "category": "Mladší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "16:32,49",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "20. 05. 2012",
        "place": "Gliwice (POL)",
        "category": "Mladší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:09,87",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "13. 11. 2020",
        "place": "Budapešť (HUN)",
        "category": "Mladší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:30,93",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "14. 11. 2020",
        "place": "Budapešť (HUN)",
        "category": "Mladší dorost"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "34:44,60",
        "holder": "Vojislav Štěrba",
        "year": "2017",
        "date": "16. 05. 2017",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "58:08,30",
        "holder": "Vojislav Štěrba",
        "year": "2017",
        "date": "16. 05. 2017",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "10 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "2:02:27,00",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "15. 09. 2012",
        "place": "Jaroměř",
        "category": "Mladší dorost"
    },
    {
        "event": "15 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "3:06:57,10",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "15. 09. 2012",
        "place": "Jaroměř",
        "category": "Mladší dorost"
    },
    {
        "event": "15 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "3:06:57,10",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "15. 09. 2012",
        "place": "Jaroměř",
        "category": "Mladší dorost"
    },
    {
        "event": "20 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "4:13:20,70",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "15. 09. 2012",
        "place": "Jaroměř",
        "category": "Mladší dorost"
    },
    {
        "event": "25 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "5:21:11,40",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "15. 09. 2012",
        "place": "Jaroměř",
        "category": "Mladší dorost"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:29,59",
        "holder": "Kristýna Horská",
        "year": "2013",
        "date": "29. 08. 2013",
        "place": "Dubai (UAE)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:05,41",
        "holder": "Tereza Čermáková",
        "year": "2023",
        "date": "30. 06. 2023",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:23,25",
        "holder": "Tereza Čermáková",
        "year": "2023",
        "date": "01. 07. 2023",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:29,38",
        "holder": "Barbora Škopová",
        "year": "2025",
        "date": "18. 05. 2025",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:37,72",
        "holder": "Mia Srbová",
        "year": "2026",
        "date": "30. 05. 2026",
        "place": "Ústí nad Labem",
        "category": "Mladší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:22,18",
        "holder": "Natálie Zápotocká",
        "year": "2023",
        "date": "26. 05. 2023",
        "place": "Liberec",
        "category": "Mladší dorost"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:32,96",
        "holder": "Kristýna Horská",
        "year": "2013",
        "date": "26. 05. 2013",
        "place": "Bratislava (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:10,99",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "25. 08. 2017",
        "place": "Indianapolis (USA)",
        "category": "Mladší dorost"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:29,67",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "28. 08. 2017",
        "place": "Indianapolis (USA)",
        "category": "Mladší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:26,77",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "06. 05. 2017",
        "place": "Bratislava (SVK)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:57,52",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "01. 04. 2017",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:06,09",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "15. 04. 2017",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:27,84",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "07. 07. 2016",
        "place": "Hódmezővásárhely (HUN)",
        "category": "Mladší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:11,74",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "02. 06. 2017",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "17:27,84",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "13. 07. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:17,33",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "26. 08. 2017",
        "place": "Indianapolis (USA)",
        "category": "Mladší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:53,85",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "14. 04. 2017",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "36:34,50",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "15. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "1:01:37,00",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "15. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší dorost"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:24,74",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "14. 12. 2007",
        "place": "Chomutov",
        "category": "Mladší dorost"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:54,64",
        "holder": "David Noll",
        "year": "2015",
        "date": "11. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:02,72",
        "holder": "David Noll",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:27,17",
        "holder": "David Lahoda",
        "year": "2021",
        "date": "16. 10. 2021",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:59,16",
        "holder": "David Lahoda",
        "year": "2021",
        "date": "17. 10. 2021",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:04,75",
        "holder": "Michal Judickij",
        "year": "2019",
        "date": "13. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:29,90",
        "holder": "Martin Bejček",
        "year": "2014",
        "date": "19. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:03,63",
        "holder": "Martin Bejček",
        "year": "2014",
        "date": "20. 12. 2014",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:19,39",
        "holder": "Michal Judickij",
        "year": "2019",
        "date": "12. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:23,10",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "15. 12. 2007",
        "place": "Chomutov",
        "category": "Mladší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:51,00",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "16. 12. 2007",
        "place": "Chomutov",
        "category": "Mladší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:51,60",
        "holder": "David Noll",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:00,83",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "14. 12. 2012",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "08:24,05",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "21. 10. 2012",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "15:58,97",
        "holder": "Petr Novák",
        "year": "2012",
        "date": "10. 11. 2012",
        "place": "Wr. Neustadt (AUT)",
        "category": "Mladší dorost"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:57,57",
        "holder": "Michal Ledl",
        "year": "2007",
        "date": "14. 12. 2007",
        "place": "Chomutov",
        "category": "Mladší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:07,15",
        "holder": "Michal Judickij",
        "year": "2019",
        "date": "12. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:27,81",
        "holder": "Michal Judickij",
        "year": "2019",
        "date": "15. 12. 2019",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "33:29,97",
        "holder": "Michal Judickij",
        "year": "2020",
        "date": "02. 06. 2020",
        "place": "Praha - Vinohrady",
        "category": "Mladší dorost"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "25m",
        "time": "56:20,57",
        "holder": "Matěj Kozubek",
        "year": "2012",
        "date": "03. 11. 2012",
        "place": "Krnov",
        "category": "Mladší dorost"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:52,46",
        "holder": "Patrik Boháč",
        "year": "2025",
        "date": "16. 12. 2025",
        "place": "Praha - Vinohrady",
        "category": "Mladší dorost"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:28,23",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "18. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:02,77",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:17,29",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "16. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:28,21",
        "holder": "Barbora Škopová",
        "year": "2025",
        "date": "21. 12. 2025",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:00,61",
        "holder": "Barbora Škopová",
        "year": "2025",
        "date": "19. 12. 2025",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:14,70",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:32,95",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "20. 10. 2017",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:09,25",
        "holder": "Tereza Muselová",
        "year": "2017",
        "date": "20. 10. 2017",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:29,07",
        "holder": "Natálie Zápotocká",
        "year": "2023",
        "date": "14. 12. 2023",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:26,15",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:56,98",
        "holder": "Anna Kolářová",
        "year": "2013",
        "date": "19. 10. 2013",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:02,69",
        "holder": "Natálie Zápotocká",
        "year": "2023",
        "date": "17. 12. 2023",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:17,93",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "13. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "08:53,97",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "16. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "16:49,09",
        "holder": "Julie Pleskotová",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:02,70",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:15,20",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "15. 12. 2016",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:49,54",
        "holder": "Natálie Zápotocká",
        "year": "2023",
        "date": "17. 12. 2023",
        "place": "Plzeň - Slovany",
        "category": "Mladší dorost"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "41:08,10",
        "holder": "Vanesa Lipovská",
        "year": "2016",
        "date": "04. 11. 2016",
        "place": "Krnov",
        "category": "Mladší dorost"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "25m",
        "time": "1:08:47,20",
        "holder": "Vanesa Lipovská",
        "year": "2016",
        "date": "04. 11. 2016",
        "place": "Krnov",
        "category": "Mladší dorost"
    },
    {
        "event": "4 boj",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:03,70",
        "holder": "Tereza Muselová",
        "year": "2016",
        "date": "22. 12. 2016",
        "place": "Praha - Vinohrady",
        "category": "Mladší dorost"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:28,61",
        "holder": "Jakub Chára",
        "year": "2020",
        "date": "28. 08. 2020",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:04,29",
        "holder": "David Lahoda",
        "year": "2019",
        "date": "16. 06. 2019",
        "place": "Zlín",
        "category": "Starší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:19,13",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "30. 06. 2018",
        "place": "České Budějovice",
        "category": "Starší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:31,08",
        "holder": "Jakub Chára",
        "year": "2020",
        "date": "28. 08. 2020",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:04,86",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "30. 06. 2018",
        "place": "České Budějovice",
        "category": "Starší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:16,30",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "06. 05. 2018",
        "place": "Bratislava (SVK)",
        "category": "Starší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:34,62",
        "holder": "Tomáš Podborský",
        "year": "2008",
        "date": "25. 04. 2008",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:15,87",
        "holder": "Tomáš Podborský",
        "year": "2008",
        "date": "12. 04. 2008",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:45,80",
        "holder": "Jan Vaněk",
        "year": "1971",
        "date": "11. 07. 1971",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:26,91",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "17. 06. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:59,06",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "18. 06. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:09,40",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "18. 06. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:30,89",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "17. 06. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "09:16,71",
        "holder": "Sergej Sankin",
        "year": "1980",
        "date": "18. 07. 1980",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "17:27,68",
        "holder": "Sergej Sankin",
        "year": "1980",
        "date": "18. 07. 1980",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:21,20",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "16. 03. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "04:55,95",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "28. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "36:55,90",
        "holder": "Jakub Štverák",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "1:01:32,30",
        "holder": "Jakub Štverák",
        "year": "2022",
        "date": "27. 03. 2022",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:07,62",
        "holder": "Kristýna Horská",
        "year": "2011",
        "date": "19. 06. 2011",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:43,45",
        "holder": "Lenka Silberhornová",
        "year": "2004",
        "date": "14. 12. 2004",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,38",
        "holder": "Karla Škopová",
        "year": "2022",
        "date": "28. 06. 2022",
        "place": "Olomouc",
        "category": "Starší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:07,80",
        "holder": "Barbora Škopová",
        "year": "2023",
        "date": "20. 05. 2023",
        "place": "Gliwice (POL)",
        "category": "Starší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:28,10",
        "holder": "Barbora Škopová",
        "year": "2023",
        "date": "18. 06. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:16,46",
        "holder": "Aneta Fritscheová",
        "year": "2006",
        "date": "01. 12. 2006",
        "place": "Kranj (SLO)",
        "category": "Starší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:45,39",
        "holder": "Tereza Anna Sýkorová",
        "year": "2020",
        "date": "22. 02. 2020",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:27,75",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "06. 06. 2015",
        "place": "Brno - Lužánky",
        "category": "Starší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:59,59",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "16. 06. 2015",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:10,67",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "13. 12. 2015",
        "place": "Hódmezővásárhely (HUN)",
        "category": "Starší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:36,00",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Hódmezővásárhely (HUN)",
        "category": "Starší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:23,61",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "12. 12. 2015",
        "place": "Hódmezővásárhely (HUN)",
        "category": "Starší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:23,68",
        "holder": "Kristýna Horská",
        "year": "2011",
        "date": "26. 07. 2011",
        "place": "Trabzon (TUR)",
        "category": "Starší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "05:13,09",
        "holder": "Kristýna Horská",
        "year": "2011",
        "date": "09. 04. 2011",
        "place": "Praha - Podolí",
        "category": "Starší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:27,98",
        "holder": "David Lahoda",
        "year": "2019",
        "date": "08. 12. 2019",
        "place": "Mladá Boleslav",
        "category": "Starší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:00,68",
        "holder": "David Lahoda",
        "year": "2019",
        "date": "08. 12. 2019",
        "place": "Mladá Boleslav",
        "category": "Starší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:15,17",
        "holder": "David Lahoda",
        "year": "2019",
        "date": "07. 12. 2019",
        "place": "Mladá Boleslav",
        "category": "Starší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:29,80",
        "holder": "Pavel Janák",
        "year": "1998",
        "date": "22. 12. 1998",
        "place": "Praha - Vinohrady",
        "category": "Starší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:02,19",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "13. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:10,42",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:33,00",
        "holder": "Jakub Chalupa",
        "year": "2015",
        "date": "17. 12. 2015",
        "place": "Praha - Vinohrady",
        "category": "Starší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:09,50",
        "holder": "Petr Bárta",
        "year": "1992",
        "date": "13. 11. 1992",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:28,76",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "02. 12. 2018",
        "place": "Nový Jičín",
        "category": "Starší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:25,74",
        "holder": "Jan Tesař",
        "year": "1997",
        "date": "14. 12. 1997",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:55,82",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "18. 11. 2023",
        "place": "Praha - Radlice",
        "category": "Starší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:59,30",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "17. 11. 2023",
        "place": "Praha - Radlice",
        "category": "Starší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:17,29",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "09. 12. 2023",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "08:45,04",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "14. 12. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "16:42,71",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "01. 12. 2018",
        "place": "Nový Jičín",
        "category": "Starší žactvo"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:04,62",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "16. 11. 2018",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:14,74",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "01. 12. 2018",
        "place": "Nový Jičín",
        "category": "Starší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:40,57",
        "holder": "Michal Judickij",
        "year": "2018",
        "date": "02. 12. 2018",
        "place": "Nový Jičín",
        "category": "Starší žactvo"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:00,96",
        "holder": "Patrik Boháč",
        "year": "2023",
        "date": "21. 12. 2023",
        "place": "Praha - Vinohrady",
        "category": "Starší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:30,10",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "07. 11. 2015",
        "place": "Louny",
        "category": "Starší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:05,81",
        "holder": "Markéta Kaplanová",
        "year": "1979",
        "date": "01. 07. 1979",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:30,90",
        "holder": "Markéta Kaplanová",
        "year": "1979",
        "date": "15. 12. 1979",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:29,80",
        "holder": "Barbora Škopová",
        "year": "2023",
        "date": "14. 12. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:05,32",
        "holder": "Barbora Škopová",
        "year": "2023",
        "date": "09. 12. 2023",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:23,62",
        "holder": "Barbora Škopová",
        "year": "2023",
        "date": "15. 12. 2023",
        "place": "Plzeň - Slovany",
        "category": "Starší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:34,10",
        "holder": "Petra Skřivánková",
        "year": "1996",
        "date": "03. 11. 1996",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:13,74",
        "holder": "Natálie Zápotocká",
        "year": "2021",
        "date": "11. 12. 2021",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:37,26",
        "holder": "Natálie Zápotocká",
        "year": "2021",
        "date": "12. 12. 2021",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:27,20",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "21. 11. 2015",
        "place": "Praha - Zelený Pruh",
        "category": "Starší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:58,39",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "06. 12. 2015",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:06,60",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "20. 11. 2015",
        "place": "Praha - Zelený Pruh",
        "category": "Starší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:27,19",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "05. 12. 2015",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "09:17,58",
        "holder": "Tereza Anna Sýkorová",
        "year": "2020",
        "date": "18. 01. 2020",
        "place": "Praha - Radlice",
        "category": "Starší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "18:09,90",
        "holder": "Zuzana Sedláková",
        "year": "1985",
        "date": "1985",
        "place": "-",
        "category": "Starší žactvo"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:06,69",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "05. 12. 2015",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:21,53",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "05. 12. 2015",
        "place": "Prostějov",
        "category": "Starší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "05:07,40",
        "holder": "Tereza Muselová",
        "year": "2015",
        "date": "21. 11. 2015",
        "place": "Praha - Zelený Pruh",
        "category": "Starší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:33,53",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "09. 06. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:18,67",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "15. 05. 2016",
        "place": "Hradec Králové",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:51,13",
        "holder": "Michal Němec",
        "year": "2026",
        "date": "11. 04. 2026",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:36,28",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "14. 05. 2016",
        "place": "Hradec Králové",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:15,17",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "14. 05. 2016",
        "place": "Hradec Králové",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:42,70",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "23. 04. 2016",
        "place": "Ústí nad Labem",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:36,16",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "09. 06. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:25,22",
        "holder": "Matěj Hora",
        "year": "2004",
        "date": "14. 12. 2004",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "00:31,46",
        "holder": "Jakub Chára",
        "year": "2018",
        "date": "16. 03. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "01:07,78",
        "holder": "Jakub Chára",
        "year": "2018",
        "date": "03. 06. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "02:31,80",
        "holder": "Patrik Jirát",
        "year": "2006",
        "date": "23. 09. 2006",
        "place": "Chomutov",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "05:18,42",
        "holder": "Denis Tikovský",
        "year": "2017",
        "date": "28. 06. 2017",
        "place": "Brno - Lužánky",
        "category": "Mladší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "11:20,28",
        "holder": "Jakub Štverák",
        "year": "2020",
        "date": "29. 08. 2020",
        "place": "Plzeň - Slovany",
        "category": "Mladší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "50m",
        "time": "21:00,81",
        "holder": "Jakub Štverák",
        "year": "2020",
        "date": "29. 08. 2020",
        "place": "Plzeň - Slovany",
        "category": "Mladší žactvo"
    },
    {
        "event": "3 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "43:43,40",
        "holder": "Michal Němec",
        "year": "2026",
        "date": "12. 04. 2026",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "5 km",
        "gender": "Muži",
        "pool": "50m",
        "time": "1:13:39,70",
        "holder": "Michal Němec",
        "year": "2026",
        "date": "12. 04. 2026",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:34,10",
        "holder": "Kristýna Horská",
        "year": "2009",
        "date": "05. 06. 2009",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:22,42",
        "holder": "Tereza Muselová",
        "year": "2013",
        "date": "26. 06. 2013",
        "place": "Zlín",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "50m",
        "time": "03:17,51",
        "holder": "Tereza Muselová",
        "year": "2013",
        "date": "25. 06. 2013",
        "place": "Zlín",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:36,74",
        "holder": "Natálie Zápotocká",
        "year": "2019",
        "date": "13. 04. 2019",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:19,19",
        "holder": "Natálie Zápotocká",
        "year": "2019",
        "date": "09. 03. 2019",
        "place": "Plzeň - Slovany",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:53,72",
        "holder": "Natálie Zápotocká",
        "year": "2019",
        "date": "13. 04. 2019",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:39,30",
        "holder": "Adéla Tomášková",
        "year": "2006",
        "date": "23. 09. 2006",
        "place": "Chomutov",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:22,94",
        "holder": "Aneta Fritscheová",
        "year": "2004",
        "date": "14. 12. 2004",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:58,51",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "05. 05. 2018",
        "place": "Bratislava (SVK)",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "00:31,27",
        "holder": "Kamila Blažková",
        "year": "2007",
        "date": "20. 06. 2007",
        "place": "Ústí nad Labem",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "01:06,73",
        "holder": "Adéla Zámečníková",
        "year": "2019",
        "date": "01. 06. 2019",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:23,13",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "14. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "04:56,51",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "06. 05. 2018",
        "place": "Bratislava (SVK)",
        "category": "Mladší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "09:57,59",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "17. 03. 2018",
        "place": "Plzeň - Slovany",
        "category": "Mladší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "19:16,30",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "03. 06. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "02:39,84",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "02. 06. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "50m",
        "time": "05:37,32",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "03. 06. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "3 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "41:21,20",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "15. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "5 km",
        "gender": "Ženy",
        "pool": "50m",
        "time": "1:08:59,60",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "15. 04. 2018",
        "place": "Praha - Podolí",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:32,64",
        "holder": "Jakub Chára",
        "year": "2018",
        "date": "20. 12. 2018",
        "place": "Praha - Vinohrady",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:10,30",
        "holder": "Martin Zikmund",
        "year": "1987",
        "date": "06. 11. 1987",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:40,40",
        "holder": "Petr Tomíšek",
        "year": "1981",
        "date": "05. 10. 1981",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:34,10",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "22. 12. 2016",
        "place": "Praha - Vinohrady",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:11,84",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "03. 12. 2016",
        "place": "Trutnov",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:28,95",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "04. 12. 2016",
        "place": "Trutnov",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:38,40",
        "holder": "Jakub Tesař",
        "year": "1998",
        "date": "22. 12. 1998",
        "place": "Praha - Vinohrady",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:15,60",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "10. 11. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:54,47",
        "holder": "Matěj Hora",
        "year": "2004",
        "date": "04. 12. 2004",
        "place": "Praha - Eden",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "00:28,50",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "08. 12. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:03,30",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "08. 12. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:16,00",
        "holder": "Sergej Sankin",
        "year": "1978",
        "date": "10. 12. 1978",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "04:49,80",
        "holder": "Sergej Sankin",
        "year": "1978",
        "date": "09. 12. 1978",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "10:14,23",
        "holder": "Denis Tikovský",
        "year": "2017",
        "date": "09. 12. 2017",
        "place": "Kopřivnice",
        "category": "Mladší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "19:11,86",
        "holder": "Denis Tikovský",
        "year": "2017",
        "date": "09. 12. 2017",
        "place": "Kopřivnice",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "01:15,80",
        "holder": "Václav Janda",
        "year": "1983",
        "date": "19. 12. 1983",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:37,10",
        "holder": "Petr Bárta",
        "year": "1990",
        "date": "09. 11. 1990",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Muži",
        "pool": "25m",
        "time": "05:22,38",
        "holder": "Michal Judickij",
        "year": "2016",
        "date": "04. 12. 2016",
        "place": "Trutnov",
        "category": "Mladší žactvo"
    },
    {
        "event": "4 boj",
        "gender": "Muži",
        "pool": "25m",
        "time": "02:17,90",
        "holder": "Karel Blažek",
        "year": "2003",
        "date": "19. 12. 2003",
        "place": "Praha - Vinohrady",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:32,40",
        "holder": "Klára Grécová",
        "year": "2016",
        "date": "23. 01. 2016",
        "place": "Praha - Radlice",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:14,40",
        "holder": "Zuzana Sedláková",
        "year": "1983",
        "date": "18. 12. 1983",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 M",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:36,02",
        "holder": "Zuzana Sedláková",
        "year": "1983",
        "date": "04. 12. 1983",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:33,78",
        "holder": "Barbora Škopová",
        "year": "2021",
        "date": "20. 11. 2021",
        "place": "Praha - Radlice",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:13,37",
        "holder": "Kristýna Horská",
        "year": "2009",
        "date": "12. 12. 2009",
        "place": "Prostějov",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 Z",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:36,90",
        "holder": "Helena Krafferová",
        "year": "1972",
        "date": "1972",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:38,00",
        "holder": "Jana Černovská",
        "year": "1987",
        "date": "31. 10. 1987",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:18,70",
        "holder": "Petra Skřivánková",
        "year": "1994",
        "date": "13. 12. 1994",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 P",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:51,94",
        "holder": "Kristýna Horská",
        "year": "2009",
        "date": "13. 12. 2009",
        "place": "Prostějov",
        "category": "Mladší žactvo"
    },
    {
        "event": "50 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "00:28,92",
        "holder": "Martina Hrozányová",
        "year": "2001",
        "date": "15. 12. 2001",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:04,86",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "06. 10. 2018",
        "place": "Plzeň - Radbuza",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:14,02",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "13. 10. 2018",
        "place": "Praha - Radlice",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "04:42,63",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "14. 10. 2018",
        "place": "Praha - Radlice",
        "category": "Mladší žactvo"
    },
    {
        "event": "800 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "09:44,86",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "21. 10. 2018",
        "place": "Praha  - Radlice",
        "category": "Mladší žactvo"
    },
    {
        "event": "1500 VZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "18:24,10",
        "holder": "Zuzana Sedláková",
        "year": "1983",
        "date": "19. 12. 1983",
        "place": "-",
        "category": "Mladší žactvo"
    },
    {
        "event": "100 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "01:13,95",
        "holder": "Kristýna Horská",
        "year": "2009",
        "date": "20. 06. 2009",
        "place": "Kopřivnice",
        "category": "Mladší žactvo"
    },
    {
        "event": "200 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "02:33,38",
        "holder": "Kristýna Horská",
        "year": "2009",
        "date": "12. 12. 2009",
        "place": "Prostějov",
        "category": "Mladší žactvo"
    },
    {
        "event": "400 PZ",
        "gender": "Ženy",
        "pool": "25m",
        "time": "05:23,74",
        "holder": "Tereza Anna Sýkorová",
        "year": "2018",
        "date": "01. 07. 2018",
        "place": "Kopřivnice",
        "category": "Mladší žactvo"
    }
],

  parentsNotes: [
    "Tréninky ST+ODA+G týden do 18.10.: do středy normálně. Dále závodíme na Českém poháru na Plzeňských sprintech. Kdo nejede do Plzně: čtvrtek ráno normálně, odpo volno; pátek ráno volno, odpo normálně. (Jan Srb, 12. 10. 2026)",
    "Přípravka ukázková hodina ve čtvrtek 15. 10.: na Vinohradech od 16:30 až do 18:45 ukázková hodina pro plavce přípravky. (Jan Srb, 12. 10. 2026)",
    "Infolístek na Plzeňské sprinty (15.–18. 10. 2026): Plzeň Slovany 25m. Doprava individuální, čipy na vstup u trenéra (sraz 7:15). Všichni v oddílovém zeleném tričku a čepičce! (Jan Srb, 6. 10. 2026)",
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
  },

  downloads: [
    {
      id: "drahy-2026-2027",
      title: "Rozdělení do drah a skupin 2026/2027",
      category: "Rozvrhy a dráhy",
      description: "Kompletní rozpis drah na bazénech Podolí (50m) a Vinohrady (25m) pro všechny tréninkové skupiny (ST, ODA, Výběr, Přípravka).",
      fileName: "Rozdeleni_do_drah_Bohemians_2026_27.pdf",
      fileSize: "418 KB",
      updatedAt: "2026-09-01",
      fileType: "pdf",
      important: true
    },
    {
      id: "rozvrh-treninku-podzim-2026",
      title: "Týdenní harmonogram tréninků — podzim 2026",
      category: "Rozvrhy a dráhy",
      description: "Přehled ranních a odpoledních tréninkových časů, suché přípravy v posilovně a sobotních fází pro žáky a juniory.",
      fileName: "Harmonogram_treninku_podzim_2026.pdf",
      fileSize: "284 KB",
      updatedAt: "2026-08-28",
      fileType: "pdf"
    },
    {
      id: "prispevky-2026-2027",
      title: "Členské příspěvky a pokyny k platbám 2026/2027",
      category: "Příspěvky a řády",
      description: "Informace o výši oddílových a členských příspěvků pro jednotlivé skupiny, čísla účtů TJ Bohemians a variabilní symboly.",
      fileName: "Clenske_prispevky_a_pokyny_k_platbam_2026.pdf",
      fileSize: "192 KB",
      updatedAt: "2026-08-20",
      fileType: "pdf",
      important: true
    },
    {
      id: "rad-oddilu",
      title: "Provozní a bezpečnostní řád oddílu plavání",
      category: "Příspěvky a řády",
      description: "Základní pravidla chování na bazénech Podolí a Vinohrady, povinnosti plavců a trenérů, bezpečnostní předpisy.",
      fileName: "Provozni_a_bezpecnostni_rad_BOH.pdf",
      fileSize: "320 KB",
      updatedAt: "2026-01-10",
      fileType: "pdf"
    },
    {
      id: "stanovy-tj",
      title: "Stanovy TJ Bohemians Praha z.s.",
      category: "Příspěvky a řády",
      description: "Oficiální stanovy tělovýchovné jednoty Bohemians Praha schválené valnou hromadou.",
      fileName: "Stanovy_TJ_Bohemians_Praha.pdf",
      fileSize: "512 KB",
      updatedAt: "2025-11-15",
      fileType: "pdf"
    },
    {
      id: "lekarska-prohlidka",
      title: "Žádost o posouzení zdravotní způsobilosti k tělesné výchově a sportu",
      category: "Zdraví a formuláře",
      description: "Oficiální formulář pro sportovního nebo praktického lékaře vyžadovaný vyhláškou o zdravotní způsobilosti pro závodní plavce.",
      fileName: "Formular_zdravotni_zpusobilost_sportovce.pdf",
      fileSize: "215 KB",
      updatedAt: "2026-06-12",
      fileType: "pdf",
      important: true
    },
    {
      id: "gdpr-souhlas",
      title: "Vstupní dotazník a souhlas se zpracováním osobních údajů (GDPR)",
      category: "Zdraví a formuláře",
      description: "Formulář pro nové i stávající členy s kontaktními údaji zákonných zástupců a souhlasem s fotografováním při sportovních akcích.",
      fileName: "GDPR_a_vstupni_dotaznik_plavce.pdf",
      fileSize: "185 KB",
      updatedAt: "2026-02-01",
      fileType: "pdf"
    },
    {
      id: "antidoping-tue",
      title: "Antidopingové předpisy a žádost o terapeutickou výjimku (TUE)",
      category: "Zdraví a formuláře",
      description: "Pravidla Antidopingového výboru ČR a Českého svazu plaveckých sportů pro závodní sportovce a užívání léků.",
      fileName: "Antidoping_smernice_TUE_CSPS.pdf",
      fileSize: "348 KB",
      updatedAt: "2026-01-15",
      fileType: "pdf"
    },
    {
      id: "prihlaska-clena",
      title: "Přihláška nového člena oddílu (evidenční list plavce)",
      category: "Závody a pravidla",
      description: "Přihláška do závodního družstva a registrace u Českého svazu plaveckých sportů (ČSPS) pro získání svazové licence.",
      fileName: "Prihlaska_novy_clen_BOH_CSPS.pdf",
      fileSize: "238 KB",
      updatedAt: "2026-07-01",
      fileType: "pdf"
    },
    {
      id: "pravidla-plavani-wa",
      title: "Pravidla plavání World Aquatics / ČSPS (platné znění)",
      category: "Závody a pravidla",
      description: "Kompletní technická pravidla plaveckých způsobů (kraul, znak, prsa, motýlek, polohový závod, starty a obrátky).",
      fileName: "Pravidla_plavani_WorldAquatics_CSPS.pdf",
      fileSize: "892 KB",
      updatedAt: "2026-03-01",
      fileType: "pdf"
    },
    {
      id: "smernice-cestovne",
      title: "Směrnice pro proplácení startovného a cestovného na MČR",
      category: "Závody a pravidla",
      description: "Kritéria a podmínky oddílového příspěvku na dopravu, ubytování a startovné pro kvalifikované reprezentanty oddílu.",
      fileName: "Smernice_proplaceni_zavody_MCR.pdf",
      fileSize: "206 KB",
      updatedAt: "2026-04-18",
      fileType: "pdf"
    }
  ],

  stats: {
    topPerformances: [
      // Muži 25m
      { rank: 1, swimmer: "Pavel Srb", birthYear: 1980, discipline: "100 m volný způsob", pool: "25m", gender: "Muži", time: "49.62", finaPoints: 835, date: "2001-12-14", meet: "ME v krátkém bazénu Antverpy", isClubRecord: true },
      { rank: 2, swimmer: "Michal Judickij", birthYear: 2004, discipline: "100 m prsa", pool: "25m", gender: "Muži", time: "1:01.42", finaPoints: 815, date: "2026-06-01", meet: "MČR juniorů & U22 Ústí n. L.", isClubRecord: true },
      { rank: 3, swimmer: "Michal Judickij", birthYear: 2004, discipline: "200 m polohový závod", pool: "25m", gender: "Muži", time: "2:01.80", finaPoints: 808, date: "2026-05-10", meet: "VC Pardubic", isClubRecord: true },
      { rank: 4, swimmer: "Patrik Boháč", birthYear: 2007, discipline: "100 m znak", pool: "25m", gender: "Muži", time: "55.40", finaPoints: 780, date: "2026-06-02", meet: "MČR juniorů & U22 Ústí n. L.", isClubRecord: false },
      { rank: 5, swimmer: "Pavel Srb", birthYear: 1980, discipline: "200 m volný způsob", pool: "25m", gender: "Muži", time: "1:48.35", finaPoints: 825, date: "2002-11-23", meet: "Český pohár Plzeň", isClubRecord: true },
      { rank: 6, swimmer: "Václav Tichý", birthYear: 2007, discipline: "1500 m volný způsob", pool: "25m", gender: "Muži", time: "15:48.20", finaPoints: 765, date: "2026-06-08", meet: "ČP dálkové plavání / CZECHMAN", isClubRecord: false },
      { rank: 7, swimmer: "Michal Judickij", birthYear: 2004, discipline: "200 m prsa", pool: "25m", gender: "Muži", time: "2:13.20", finaPoints: 810, date: "2026-05-10", meet: "VC Pardubic", isClubRecord: true },
      { rank: 8, swimmer: "Patrik Boháč", birthYear: 2007, discipline: "200 m znak", pool: "25m", gender: "Muži", time: "2:01.10", finaPoints: 772, date: "2026-06-01", meet: "MČR juniorů Ústí n. L.", isClubRecord: false },

      // Ženy 25m
      { rank: 1, swimmer: "Ilona Hlaváčková", birthYear: 1977, discipline: "50 m znak", pool: "25m", gender: "Ženy", time: "27.06", finaPoints: 948, date: "2001-12-15", meet: "ME v krátkém bazénu Antverpy (Evropský rekord)", isClubRecord: true },
      { rank: 2, swimmer: "Ilona Hlaváčková", birthYear: 1977, discipline: "100 m znak", pool: "25m", gender: "Ženy", time: "57.75", finaPoints: 935, date: "2001-12-14", meet: "ME v krátkém bazénu Antverpy", isClubRecord: true },
      { rank: 3, swimmer: "Ilona Hlaváčková", birthYear: 1977, discipline: "50 m volný způsob", pool: "25m", gender: "Ženy", time: "24.95", finaPoints: 880, date: "2003-12-11", meet: "ME v krátkém bazénu Dublin", isClubRecord: true },
      { rank: 4, swimmer: "Natálie Zápotocká", birthYear: 2007, discipline: "200 m polohový závod", pool: "25m", gender: "Ženy", time: "2:14.90", finaPoints: 820, date: "2026-06-01", meet: "MČR juniorů & U22 Ústí n. L.", isClubRecord: true },
      { rank: 5, swimmer: "Karla Škopová", birthYear: 2008, discipline: "400 m volný způsob", pool: "25m", gender: "Ženy", time: "4:16.80", finaPoints: 805, date: "2026-05-10", meet: "VC Pardubic", isClubRecord: true },
      { rank: 6, swimmer: "Bára Škopová", birthYear: 2008, discipline: "100 m motýlek", pool: "25m", gender: "Ženy", time: "1:01.80", finaPoints: 792, date: "2026-06-02", meet: "MČR juniorů Ústí n. L.", isClubRecord: false },
      { rank: 7, swimmer: "Natálie Zápotocká", birthYear: 2007, discipline: "400 m polohový závod", pool: "25m", gender: "Ženy", time: "4:48.20", finaPoints: 790, date: "2026-05-10", meet: "VC Pardubic", isClubRecord: true },
      { rank: 8, swimmer: "Tereza Čermáková", birthYear: 2007, discipline: "100 m prsa", pool: "25m", gender: "Ženy", time: "1:09.80", finaPoints: 785, date: "2026-06-01", meet: "MČR juniorů Ústí n. L.", isClubRecord: false },

      // 50m Bazén
      { rank: 1, swimmer: "Ilona Hlaváčková", birthYear: 1977, discipline: "50 m znak", pool: "50m", gender: "Ženy", time: "28.50", finaPoints: 915, date: "2002-08-01", meet: "ME Berlín", isClubRecord: true },
      { rank: 2, swimmer: "Pavel Srb", birthYear: 1980, discipline: "100 m volný způsob", pool: "50m", gender: "Muži", time: "51.03", finaPoints: 820, date: "2001-07-20", meet: "MS Fukuoka", isClubRecord: true },
      { rank: 3, swimmer: "Karla Škopová", birthYear: 2008, discipline: "400 m volný způsob", pool: "50m", gender: "Ženy", time: "4:21.60", finaPoints: 798, date: "2026-06-01", meet: "MČR juniorů Ústí n. L.", isClubRecord: true },
      { rank: 4, swimmer: "Michal Judickij", birthYear: 2004, discipline: "200 m prsa", pool: "50m", gender: "Muži", time: "2:16.80", finaPoints: 795, date: "2026-06-02", meet: "MČR U22 Ústí n. L.", isClubRecord: true },
      { rank: 5, swimmer: "Natálie Zápotocká", birthYear: 2007, discipline: "200 m znak", pool: "50m", gender: "Ženy", time: "2:15.40", finaPoints: 785, date: "2026-06-01", meet: "MČR juniorů Ústí n. L.", isClubRecord: true }
    ],

    swimmers: [
      {
        id: "ilona-hlavackova",
        name: "Ilona Hlaváčková",
        birthYear: 1977,
        gender: "Ženy",
        category: "Dospělí",
        role: "Olympionička (Athény 2004), Mistryně Evropy",
        bio: "Úspěšná plavkyně oddílu TJ Bohemians. Dvojnásobná mistryně Evropy, medailistka z MS a finalistka olympijských her v Athénách 2004.",
        achievements: [
          "Zlato na 50 m i 100 m znak na ME 2001 (Antverpy)",
          "Světový rekord na 50 m znak v krátkém bazénu",
          "Stříbro a bronz na MS",
          "Finále na Letních olympijských hrách 2004 v Athénách"
        ],
        bestTimes: [
          { discipline: "50 m znak", pool: "25m", time: "27.06", year: 2001, fina: 948 },
          { discipline: "100 m znak", pool: "25m", time: "57.75", year: 2001, fina: 935 },
          { discipline: "50 m volný způsob", pool: "25m", time: "24.95", year: 2003, fina: 880 },
          { discipline: "50 m znak", pool: "50m", time: "28.50", year: 2002, fina: 915 },
          { discipline: "100 m znak", pool: "50m", time: "1:01.40", year: 2002, fina: 890 }
        ]
      },
      {
        id: "pavel-srb",
        name: "Mgr. Pavel Srb",
        birthYear: 1980,
        gender: "Muži",
        category: "Dospělí",
        role: "Bývalý reprezentant ČR",
        bio: "Bývalý reprezentant České republiky ve volném způsobu a polohových závodech, opora štafet a držitel oddílových kraulových rekordů.",
        achievements: [
          "Účastník MS v plavání Fukuoka 2001 a ME",
          "Více než 25 titulů mistra ČR",
          "Oddílový rekordman na 100 m a 200 m VZ"
        ],
        bestTimes: [
          { discipline: "100 m volný způsob", pool: "25m", time: "49.62", year: 2001, fina: 835 },
          { discipline: "200 m volný způsob", pool: "25m", time: "1:48.35", year: 2002, fina: 825 },
          { discipline: "100 m volný způsob", pool: "50m", time: "51.03", year: 2001, fina: 820 },
          { discipline: "400 m volný způsob", pool: "50m", time: "3:54.30", year: 2002, fina: 810 }
        ]
      },
      {
        id: "michal-judickij",
        name: "Michal Judickij",
        birthYear: 2004,
        gender: "Muži",
        category: "U22 / Dospělí",
        role: "Mistr ČR U22, reprezentant oddílu",
        bio: "Přední prsař a polohovkář oddílu. Na MČR juniorů a U22 2026 vybojoval 3 mistrovské tituly a je oporou bohemáckých štafet.",
        achievements: [
          "3× zlato na MČR juniorů a U22 2026",
          "Stříbro a bronz na Velké ceně Pardubic 2026",
          "Člen bronzové mixové polohové štafety MČR"
        ],
        bestTimes: [
          { discipline: "100 m prsa", pool: "25m", time: "1:01.42", year: 2026, fina: 815 },
          { discipline: "200 m prsa", pool: "25m", time: "2:13.20", year: 2026, fina: 810 },
          { discipline: "200 m polohový závod", pool: "25m", time: "2:01.80", year: 2026, fina: 808 },
          { discipline: "200 m prsa", pool: "50m", time: "2:16.80", year: 2026, fina: 795 }
        ]
      },
      {
        id: "natalie-zapotocka",
        name: "Natálie Zápotocká",
        birthYear: 2007,
        gender: "Ženy",
        category: "Junioři",
        role: "Mistryně ČR, juniorská reprezentantka",
        bio: "Univerzální plavkyně vynikající v polohových závodech a znaku. Zářila na MČR 2026 se ziskem tří mistrovských titulů.",
        achievements: [
          "3× zlato a 1× bronz na MČR 2026",
          "3× zlato na VC Pardubic 2026",
          "Oddílová rekordmanka na 200 m a 400 m polohově"
        ],
        bestTimes: [
          { discipline: "200 m polohový závod", pool: "25m", time: "2:14.90", year: 2026, fina: 820 },
          { discipline: "400 m polohový závod", pool: "25m", time: "4:48.20", year: 2026, fina: 790 },
          { discipline: "200 m znak", pool: "50m", time: "2:15.40", year: 2026, fina: 785 },
          { discipline: "100 m znak", pool: "25m", time: "1:03.10", year: 2026, fina: 770 }
        ]
      },
      {
        id: "karla-skopova",
        name: "Karla Škopová",
        birthYear: 2008,
        gender: "Ženy",
        category: "Junioři",
        role: "Mistryně ČR, vytrvalkyně",
        bio: "Přední kraulová vytrvalkyně a motýlkářka. Držitelka oddílových rekordů na dlouhých tratích a medailistka z Českého poháru.",
        achievements: [
          "Mistrovský titul z MČR 2026 na 400 m volný způsob",
          "Zlato a bronz na Českém poháru v Pardubicích",
          "Oddílový rekord na 400 m volný způsob"
        ],
        bestTimes: [
          { discipline: "400 m volný způsob", pool: "25m", time: "4:16.80", year: 2026, fina: 805 },
          { discipline: "400 m volný způsob", pool: "50m", time: "4:21.60", year: 2026, fina: 798 },
          { discipline: "800 m volný způsob", pool: "50m", time: "8:58.20", year: 2026, fina: 782 },
          { discipline: "200 m motýlek", pool: "25m", time: "2:15.60", year: 2026, fina: 775 }
        ]
      },
      {
        id: "bara-skopova",
        name: "Bára Škopová",
        birthYear: 2008,
        gender: "Ženy",
        category: "Junioři",
        role: "Medailistka MČR, motýlkářka",
        bio: "Specialistka na motýlkové a sprintérské tratě. Pravidelně se umisťuje na stupních vítězů na celostátních soutěžích.",
        achievements: [
          "Stříbro z VC Pardubic 2026",
          "Medailistka z MČR juniorů 2026",
          "Členka úspěšných štafet Klokanů"
        ],
        bestTimes: [
          { discipline: "100 m motýlek", pool: "25m", time: "1:01.80", year: 2026, fina: 792 },
          { discipline: "50 m motýlek", pool: "25m", time: "27.85", year: 2026, fina: 760 },
          { discipline: "200 m motýlek", pool: "25m", time: "2:16.10", year: 2026, fina: 770 }
        ]
      },
      {
        id: "patrik-bohac",
        name: "Patrik Boháč",
        birthYear: 2007,
        gender: "Muži",
        category: "Junioři",
        role: "Medailista MČR, znakař",
        bio: "Znakový specialista s výborným podvodním vlněním a startem. Stabilní opora týmu na republikových šampionátech.",
        achievements: [
          "2× bronz z VC Pardubic 2026",
          "Medailista MČR juniorů 2026",
          "Člen mixové štafety MČR"
        ],
        bestTimes: [
          { discipline: "100 m znak", pool: "25m", time: "55.40", year: 2026, fina: 780 },
          { discipline: "200 m znak", pool: "25m", time: "2:01.10", year: 2026, fina: 772 },
          { discipline: "50 m znak", pool: "25m", time: "25.90", year: 2026, fina: 765 }
        ]
      }
    ]
  }
};

// Backward compatibility alias
window.KlokaniData = window.BohData;

