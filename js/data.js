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
      "id": "zimni-mezinarodni-mistrovstvi-cr-v-plavani-masters-a-korunni-cup-hodno-2026-11-09",
      "title": "Zimní mezinárodní mistrovství ČR v plavání masters a Korunní Cup - hodnocení",
      "date": "2026-11-09",
      "author": "Jan Srb",
      "image": "",
      "excerpt": "připravujeme... fotky od Leška v menu Foto. Vezeme spousty medailí. Čekáme na kompletní oficiální výsledky. A české rekordy masters: Jarka Votrubová 200P, Vendulka Majerová 100Z, 200Z a 100K, Juraj Bránik 100Z a 200Z.. V soutěží družstve zvítězila SlPl a...",
      "body": [
        "připravujeme...",
        "fotky od Leška v menu Foto.",
        "Vezeme spousty medailí. Čekáme na kompletní oficiální výsledky.",
        "A české rekordy masters: Jarka Votrubová 200P, Vendulka Majerová 100Z, 200Z a 100K, Juraj Bránik 100Z a 200Z..",
        "V soutěží družstve zvítězila SlPl a Bohemka skončila pátá."
      ]
    },
    {
      "id": "podzimni-krajsky-prebor-zactva-2017-a-mladsi-hodnoceni-2026-11-08",
      "title": "Podzimní Krajský přebor žactva 2017 a mladší - hodnocení",
      "date": "2026-11-08",
      "author": "Kateřina Holubová",
      "image": "",
      "excerpt": "připravujeme... výsledky v menu Závody",
      "body": [
        "připravujeme...",
        "výsledky v menu Závody"
      ]
    },
    {
      "id": "podzimni-krajsky-prebor-na-dlouhe-trate-hodnoceni-2026-11-08",
      "title": "Podzimní Krajský přebor na dlouhé tratě - hodnocení",
      "date": "2026-11-08",
      "author": "Klára Svobodová",
      "image": "",
      "excerpt": "připravujeme... výsledky v menu Závody",
      "body": [
        "připravujeme...",
        "výsledky v menu Závody"
      ]
    },
    {
      "id": "plzenske-sprinty-cesky-pohar-arena-cup-2026-10-19",
      "title": "Plzeňské sprinty – Český pohár ARENA Cup",
      "date": "2026-10-19",
      "author": "Jan Srb",
      "image": "assets/aktuality/2245.jpg",
      "excerpt": "Krátký bazén v Plzni, tedy rychlá a oblíbená pětadvacítka na Slovanech, přivítal účastníky dalšího kola Českého poháru v plavání.",
      "body": [
        "Krátký bazén v Plzni, tedy rychlá a oblíbená pětadvacítka na Slovanech, přivítal účastníky dalšího kola Českého poháru v plavání.",
        "Klokani vyslali do Plzně skupinu 16 plavců, kteří se pustili do soubojů s výbornými plavci z Rakouska, Maďarska a Turecka. V nabité mezinárodní konkurenci jsme vyplavali 10 umístění v A finále a dalších 6 v B finále. Především naši mladší plavci předvedli skvělé výkony a osobní rekordy padaly jako na běžícím pásu. Celkem jsme jich napočítali 46!",
        "Plzeňskými sprinty symbolicky uzavíráme první část zimní sezóny. Už za týden vyrážíme na soustředění na Mallorku, kde zahájíme finální část přípravy na hlavní závod sezóny – Zimní mistrovství ČR.",
        "Všem plavcům gratulujeme k finálovým umístěním a především k osobním rekordům. Teď je potřeba nabrat síly, pořádně potrénovat a vyladit formu na vrchol zimní sezóny.",
        "Výsledky najdete jako obvykle v menu Závody.",
        "Klokani, do toho!"
      ]
    },
    {
      "id": "velka-cena-prahy-hodnoceni-2026",
      "title": "Velká cena Prahy - hodnocení",
      "date": "2026-10-12",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2244.jpg",
      "excerpt": "Jestliže patřil v sobotu radlický bazén mladším plavcům, tak v neděli se do soutěžení v Radlicích zapojili starší plavci. Účast bohemáků byla slušná, závodní nasazení bylo, z mého pohledu, dobré. Někdo dokázal zaplavat i osobní rekord a někteří vybojovali...",
      "body": [
        "Jestliže patřil v sobotu radlický bazén mladším plavcům, tak v neděli se do soutěžení v Radlicích zapojili starší plavci. Účast bohemáků byla slušná, závodní nasazení bylo, z mého pohledu, dobré. Někdo dokázal zaplavat i osobní rekord a někteří vybojovali i umístění na bedně.",
        "Ve finále hlavního závodu na 400K jsme měli pouze jednu plavkyni a to Terku Čermákovou, která obsadila 6. místo.",
        "Kompletní výsledky najdete v menu závody."
      ]
    },
    {
      "id": "podzimni-cena-motorletu-hodnoceni-2026",
      "title": "Podzimní cena Motorletu - hodnocení",
      "date": "2026-10-12",
      "author": "Soňa Nováková",
      "image": "assets/aktuality/2243.jpg",
      "excerpt": "V sobotu 10.10. se konala tradiční Podzimní cena Motorletu v Radlicích. Letos byla opravdu silná konkurence, ale i tak se pár našich plavců kvalifikovalo a předvedlo skvělé výkony! Nejlépe si vedl Míša Němec, který vybojoval 2. místo na 100 a 200 motýlek a...",
      "body": [
        "V sobotu 10.10. se konala tradiční Podzimní cena Motorletu v Radlicích. Letos byla opravdu silná konkurence, ale i tak se pár našich plavců kvalifikovalo a předvedlo skvělé výkony! Nejlépe si vedl Míša Němec, který vybojoval 2. místo na 100 a 200 motýlek a účast ve finále na 200 kraul, kde si dohmátl pro 5. místo. Další medailista byl Matěj Vrchlabský, který si vyplaval 2. místo na 100 motýlek a také účast ve finále, kam postoupil z druhého místa, ale nakonec dohmátnul na páté pozici. Ostatní si vyplavali moc hezké osobáčky! Celkově se závody nesly v dobré atmosféře a doufáme, že to tak bude pokračovat!",
        "Výsledky jsou v menu Závody. M číslo 79."
      ]
    },
    {
      "id": "velka-cena-mesta-plzne-hodnoceni-2026",
      "title": "Velká cena města Plzně - hodnocení",
      "date": "2026-10-04",
      "author": "Jan Srb",
      "image": "assets/aktuality/2242.jpg",
      "excerpt": "Velká cena města Plzně je tradičně prvním závodem sezóny, na který se vydáváme. Pro naše plavce má především jednu důležitou úlohu – otestovat, jak se v probíhající přípravě daří budovat vytrvalost.",
      "body": [
        "Velká cena města Plzně je tradičně prvním závodem sezóny, na který se vydáváme. Pro naše plavce má především jednu důležitou úlohu – otestovat, jak se v probíhající přípravě daří budovat vytrvalost.",
        "Hlavním testem je samozřejmě 1500 metrů volným způsobem. K tomu si každý podle chuti může přidat některou ze stovek, které nabízí program závodu. A že se Klokanům dařilo, ukázaly výsledky hned na úvod sezóny.",
        "Na hlavní patnáctistovce jsme měli dva plavce na stupních vítězů. Mezi ženami i v absolutním pořadí doplavala na výborném 2. místě Mia Srbová, mezi žáky pak zvítězil Ondra Benš.",
        "A dařilo se i v dalších disciplínách: Pepča Pistulková – starší žačky - 1. 100 P, 2. 100 Z, 3. 100 K, Madla Šťastná – mladší žačky - 3. 100 K, Fanda Tichý – mladší žáci - 1. 100 M, Vojta Vrchlabský – mladší žáci - 2. 100 K, 3. 100 P, 3. 100 Z.",
        "Všem plavcům gratulujeme k předvedeným výkonům a děkujeme za první závodní ochutnávku nové sezóny!",
        "A už za týden pokračujeme – tentokrát doma v Praze, v Radlicích.",
        "Výsledky najdete v menu Závody, fotografie pak ve Fotoalbech.",
        "Bohemka, do toho!"
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
        "Po statečném výkonu bojovala Hanka až do samotného závěru a v těsném finiši nakonec doplavala na 12. místě.",
        "Moc gratulujeme k předvedenému výkonu!",
        "Tímto závodem pro Klokany definitivně končí letošní úspěšná sezóna dálkového plavání. A Hance teď začíná zasloužený odpočinek.",
        "Klokani, do toho!"
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
        "Celým dnem provázel předseda oddílu Jan Srb. Program jsme zahájili symbolickým odpočtem od 80 do 0 a potom jsme se společně ohlédli za posledními deseti lety života oddílu. Připomněli jsme si naše odchovance startujících na Olympiádě a další špičkové plavce, zavzpomínali na předchozí předsedy, připomněli si historii Bohemky a samozřejmě oslavili také řadu skvělých sportovních výsledků.",
        "Po společném programu přišlo na řadu velké fotografování všech přítomných. A že bylo koho fotit! Za 80 let se toho v Bohemce opravdu událo hodně a bylo krásné vidět tolik lidí z různých generací opět pohromadě.",
        "Pak už jsme přešli k příjemné části programu – raut, gril, povídání, vzpomínání a setkávání s přáteli. Nechyběla ani tombola a na závěr jsme si společně pustili historický film z konce šedesátých let. Některé vzpomínky se během večera vracely opravdu intenzivně.",
        "A protože taková akce si zaslouží pořádnou fotodokumentaci, máme jí opravdu hodně. David [ODKAZ] a Petr [ODKAZ] nafotili spoustu skvělých snímků, které najdete nahoře v menu Foto. Každý z fotografů má vlastní složku a postupně zveřejňujeme také fotografie z prezentace na LED obrazovce [ODKAZ] , které jste nám před oslavou posílali.",
        "Děkujeme všem 212 účastníkům, kteří dorazili, zavzpomínali si, pobavili se a pomohli vytvořit atmosféru, na kterou jen tak nezapomeneme. Velké díky patří také všem, kteří se podíleli na přípravě a organizaci celého setkání. Edit: Petr Nosek zpřístupnil večerní video [ODKAZ]",
        "Bylo to velkolepé, krásné a hlavně společné. Přesně tak, jak má oslava 80 let fungujícího oddílu vypadat.",
        "Tak zase za 10 let na dalších kulatých narozeninách!",
        "A pokud byste se chtěli s Klokany potkat dříve, nezapomeňte na naši tradiční Veteraniádu, která se koná každý rok poslední sobotu v listopadu. Letos se na ní potkáme 28. 11.",
        "Bohemka, do toho!"
      ]
    },
    {
      "id": "tymovy-bronz-cpdp-2026",
      "title": "Klokani vezou z Českého poháru v dálkovém plavání týmový bronz!",
      "date": "2026-09-07",
      "author": "Jan Srb",
      "image": "assets/aktuality/2238.jpg",
      "excerpt": "Po víkendu v Mělicích, který se skládal ze dvou jednodenních závodů, skončil Český pohár v dálkovém plavání 2026. A Klokani si z něj odvážejí parádní bronz v soutěži týmů!",
      "body": [
        "Po víkendu v Mělicích, který se skládal ze dvou jednodenních závodů, skončil Český pohár v dálkovém plavání 2026. A Klokani si z něj odvážejí parádní bronz v soutěži týmů!",
        "Závěrečný víkend sezóny se nesl ve skvělé atmosféře, za výborného počasí a s parádními výkony. Všichni si závody pořádně užili a noc strávená společně přímo u závodů je vždy tou správnou třešničkou na závěr sezóny.",
        "Sobota patřila Poháru Lídy Jelínkové",
        "V sobotu jsme už nemuseli honit body do Českého poháru. Po náročném minulém víkendu v Račicích jsme si tak mohli zaplavat prakticky každý to, co chtěl, a především si pohlídat naši pozici v týmovém hodnocení.",
        "I tak jsme ale měli na desítce několik želízek v ohni. Váša Tichý opět na konci sezóny vygradoval formu a vyplaval krásné 5. místo. Hned za ním skončil Ondra Šimsa a jen jedno místo za TOP 10 doplaval Dan Dolín. Poslední desítku sezóny si zaplaval také Radek Táborský, který skončil 25. Mezi ženami vyplavala krásné 6. místo Ába Dvořáková.",
        "Na pětce jsme měli ještě větší zastoupení. 6. kadetem byl Filip Čermák, 2. starším žákem Mišák Němec a celou ženskou bednu hlavního závodu obsadily naše Klokanky – 1. Hanka Jurčáková, 2. Terka Čermáková a 3. Nikol Svobodová. Na 11. místě doplavala Petra Čermáková a bramborovou medaili mezi kadetkami si odvezla Pepča Pistulková.",
        "Ani na trojce jsme nezůstali pozadu. Třetím mužem byl Pavel Srb, kategorii starších žáků ovládl Niko Srb a mezi mladšími žáky zvítězil Fanda Tichý před Vojtou Vrchlabským. Ženskou kategorii vyhrála Mia Srbová před Nikol Svobodovou, která si tak v sobotu střihla hned dvojstart. Sedmá skončila Kačka Augustová.",
        "A na úplný závěr si dali přímý souboj na jedničce Hanka Jurčáková, která byla první mezi ženami, a Radek Šimsa, který skončil třetí mezi muži. Mezi kadetkami zvítězila Anička Kotschová, která si takticky šetřila síly na nedělní Superfinále.",
        "Večer pak samozřejmě následovalo společné grilování. Protože co by to bylo za konec sezóny bez něj?",
        "Nedělní Podzimní rožeň a Superfinále",
        "V neděli se již tradičně konal Podzimní rožeň. V něm se sbíraly především body do týmové soutěže a Superfinále jednotlivých kategorií přinášelo také body do individuálního hodnocení Českého poháru, navíc s koeficientem 1,4. Toho někteří naši plavci dokázali využít k posunu v celkovém pořadí mezi jednotlivci v ČPDP. Na startu a následně i v cíli se v neděli objevili Kačka Augustová, Filip Čermák, Petra a Tereza Čermákovy, Dan Dolín, Ába Dvořáková, Hanka Jurčáková, Anička Kotschová, Mišák Němec, Pepča Pistulková, Niko a Pavel Srbovi, Mia Srbová, Nikol Svobodová, Ondra Šimsa, Vojo Štěrba, Fanda a Váša Tichý.",
        "Pak už následovalo vyhlášení celkového pořadí Českého poháru v dálkovém plavání 2026 v mladších ročnících. A Klokani si vyplavali hned pět pohárků! Frantiek Tichý – 1. místo, ročník 2015, Michal Němec – 2. místo, ročník 2014, Niko Srb – 3. místo, ročník 2013, Josefína Pistulková – 3. místo, ročník 2012, Anna Kotschová – 3. místo, ročník 2011. A pak přišla poslední a největší třešnička celého víkendu – vyhlášení týmové soutěže. Po velkém souboji zvítězil Kolín, druhý skončil Hodonín a naši Klokani vybojovali parádní bronzovou příčku!",
        "Všem Klokanům moc gratulujeme a děkujeme za celou sezónu!",
        "Byla to opět jízda. Nyní již opět v plné síle do bazénové sezóny. Na první závody vyrážíme v říjnu do Plzně.",
        "Výsledky a fotky jednou budou.",
        "Klokani, do toho!"
      ]
    },
    {
      "id": "mala-cena-plavajiciho-klokana-2026",
      "title": "Malá cena plavajícího klokana je za námi!",
      "date": "2026-09-02",
      "author": "Jan Srb",
      "image": "assets/aktuality/2237.jpg",
      "excerpt": "Úvodní bazénové závody nové sezóny jsou za námi. A Klokani si je užili!",
      "body": [
        "Úvodní bazénové závody nové sezóny jsou za námi. A Klokani si je užili!",
        "Letos jsme si v pondělí mohli zaplavat téměř všechny disciplíny podle chuti. V úterý pak čekaly na všechny 100 K, 200 PZ a jedna vypečenost na závěr. Prostě závody, kde si každý mohl vybrat, co ho láká – a zároveň si trochu sáhnout na dno.",
        "Závody jsme tradičně nabízeli nejprve na webu a následně také na soustředění, respektive příměstském kempu. A bylo to znát. Někteří si zaplavali krásné osobáky, jiní si připsali vůbec první čas v kariéře na některé z disciplín. Pro všechny pak byla Malá cena skvělou možností ověřit si, jak na tom po prázdninách jsou.",
        "Samozřejmě platilo, že ti, kteří absolvovali soustředění, měli oproti ostatním určitou výhodu. Ale přesně od toho úvodní závody jsou – zjistit, co funguje, co ještě nefunguje a na čem bude potřeba v dalších týdnech zapracovat.",
        "Teď už víme, na čem jsme. A můžeme zase trénovat!",
        "Tak zase za rok. Počítejte s Malou cenou plavajícího klokana – a samozřejmě i s tradičním soustředěním.",
        "Vítězem se po napínavém rozstřelu stal Páťa Boháč.",
        "Celkové výsledky jsou zatím k dispozici pouze v PDF. Osobáčky vyhodnotíme už brzy.",
        "A fotek je spousta… budou!",
        "Klokani, do toho!"
      ]
    },
    {
      "id": "racice-mcr-dp-2026",
      "title": "Z Račic (MČR DP) vezeme medaile, tituly a spoustu skvělých výkonů!",
      "date": "2026-09-01",
      "author": "Jan Srb",
      "image": "assets/aktuality/2236.jpg",
      "excerpt": "Mistrovství ČR v dálkovém plavání v Račicích skončilo pro naše barvy velmi dobře. Klokani se rozhodně neztratili a znovu ukázali, že dálkové plavání nás baví. A nejen samotné závody – je cítit i radost z plavání a ze společných chvil.",
      "body": [
        "Mistrovství ČR v dálkovém plavání v Račicích skončilo pro naše barvy velmi dobře. Klokani se rozhodně neztratili a znovu ukázali, že dálkové plavání nás baví. A nejen samotné závody – je cítit i radost z plavání a ze společných chvil.",
        "Mistrovská pětka",
        "Na mistrovské pětce předvedla svoji konstantní formu Hanka Jurčáková, která vyplavala mezi ženami parádní bronzovou medaili a zároveň se stala mistryní ČR mezi staršími dorostenkami.",
        "Mezi ženami dále doplavaly: 9. Mia Srbová (4. mladší dorostenka), 12. Tereza Čermáková (3. starší dorostenka), 16. Kačka Lucbauerová (6. mladší dorostenka), 23. Nikol Svobodová (7. starší dorostenka), 32. Ába Dvořáková (mistryně masters I), 35. Kačka Augustová (mistryně masters G) a 42. Petra Čermáková (7. masters F).",
        "Mezi kadetkami skončila 7. Anička Kotschová (5. mezi ročníkem 2011) a 11. Pepča Pistulková (5. mezi ročníkem 2012).",
        "Mezi muži obsadil 12. místo Váša Tichý, což je trochu smolné – mezi mladšími dorostenci z toho bylo 4. místo. 17. Matyáš Táborský, 44. Pavel Štverák (mistr masters G) a 57. Radek Táborský (bronzový masters G).",
        "V kategorii kadetů skončil 17. Filip Čermák (12. mezi ročníkem 2011). Mezi staršími žáky vybojoval 3. místo Mišák Němec, pátý skončil Niko Srb.",
        "Následoval závod na 1 km. Mezi staršími žáky si zaplavali David Pirk a Oskar Bern. Mezi mladšími žáky jsme slavili dokonce první dvě místa – zvítězil Fanda Tichý, druhý skončil Vojta Vrchlabský.",
        "Velmi dramatické byly štafety na 5 km. Naše áčko ve složení Hanka, Mia, Kuba a Váša vybojovalo 8. místo. V cíli se přitom pět dorosteneckých štafet poskládalo do neuvěřitelných 25 sekund (při čase 68 minut)!",
        "Naše béčko Nikol, Terka, Filip a Maty doplavalo na 12. místě, céčko ve složení Kačka, Pepi, Niko a Fanda skončilo 19. Na 31. místě doplavala naše masters štafeta Lucby, Pavel, Kačka a Petra, která mezi prostředními masters vybojovala 3. místo. A pak tu máme další skvělou obhajobu! 38. místo celkově a titul mistrů ČR mezi nejstaršími masters (+240 let) získala čtveřice Táborák, Alča, Štverda a Ába. Celkem se na start postavilo 50 štafet.",
        "V neděli MČR tradičně pokračovalo (dříve královskouú disciplínou – 20 km – a doprovodnými závody na 10 a 3 km.",
        "Na dvacítce vyplavali 11. místo Matyáš Táborský a 13. místo Daniel Dolín, který byl zároveň 6. mladším dorostencem. Mezi ženami doplavala celkově na 2. místě Hanka Jurčáková, která se zároveň stala mistryní ČR mezi staršími dorostenkami. Na startu byla také Nikol Svobodová, která bohužel musela v polovině závodu odstoupit.",
        "Na desítce jsme opět výrazně bodovali. Mezi muži skončil 3. Ondra Šimsa a 5. Váša Tichý. Mezi ženami byla 2. Mia Srbová, 5. Tereza Čermáková a 9. Ába Dvořáková. V kadetkách obsadila 6. místo Anička Kotschová a 8. Pepča Pistulková, pro kterou byl závod po tréninkovém výpadku hodně přísný. I tak ho zvládla a bojovala až do cíle.",
        "Trojku si zaplavali Martin Lucbauer st., Filip Čermák, Niko Srb, Fanda Tichý, Kačka Lucbauerová a Petra Čermáková.",
        "Všem našim plavcům patří obrovská gratulace!",
        "Klokani bojují. A hlavně je vidět, že je mezi námi radost z plavání, závodění a společnosti.",
        "Za týden už sezóna dálkového plavání končí na dvoudenních Mělicích. Přijet je možné už v pátek. V neděli se budou vyhlašovat také celkové výsledky Českého poháru v dálkovém plavání 2026 – pro žactvo a kadety vždy po jednotlivých ročnících – a také soutěž družstev. A právě tam je ještě všechno otevřené. Je to v našich rukách! Na čtvrté místo máme náskok 653,6 bodu.",
        "Výsledky najdete v menu Závody, fotky v menu Foto.",
        "Klokani, do toho!"
      ]
    },
    {
      "id": "novy-skolni-rok-nova-sezona-2026",
      "title": "Nový školní rok, nová plavecká sezóna. Přidejte se ke Klokanům!",
      "date": "2026-08-28",
      "author": "Jan Srb",
      "image": "assets/aktuality/2235.jpg",
      "excerpt": "Začíná nový školní rok a s ním také nová plavecká sezóna. Někteří Klokani už mají za sebou první soustředění, ostatní se brzy přidají. A hned v pondělí a úterý si v závodech ověříme, co jsme během přípravy natrénovali.",
      "body": [
        "Začíná nový školní rok a s ním také nová plavecká sezóna. Někteří Klokani už mají za sebou první soustředění, ostatní se brzy přidají. A hned v pondělí a úterý si v závodech ověříme, co jsme během přípravy natrénovali.",
        "Přidejte se ke Klokanům!",
        "Skupiny ST, GY a ODA zahájily sezónu soustředěním. V dalším týdnu v",
        "pondělí 31. 8. – ranní trénink na Vinohradech 8:00–10:00, odpoledne závody, úterý 1. 9. – ráno volno, odpoledne další závodní půlden, od středy 2. 9. – tréninky již standardně podle rozvrhu.",
        "Pozor: ve čtvrtek 3. 9. bude bazén Podolí uzavřen.",
        "Skupina ODB zahajuje tréninky ve čtvrtek 3. 9. podle platného rozvrhu.",
        "Přípravka začíná ve středu 2. 9. podle rozvrhu. Všechny stávající plavce přípravky zároveň rádi přivítáme také na závodech v pondělí a úterý – viz informace výše u skupin ST, GY a ODA.",
        "Již vybraní nováčci přípravky dorazí na první trénink ve čtvrtek 3. 9.",
        "Dále pokračuje Nábor nových Klokanů. Máte doma budoucího Klokana? Přijďte nám ukázat, co umí! Noví zájemci mohou své plavecké dovednosti předvést na náboru ve čtvrtek 3. 9., případně 8. 9. a 10. 9., a to až do naplnění kapacity. Sraz: 16:15 (příchod) ve vestibulu bazénu Vinohrady, adresa: Polská 2400/1a, Praha 2. S sebou: přiléhavé plavky, plavecké brýle, plaveckou čepičku, pokud vlasy sahají do očí. Nemusíte se ničeho obávat – předem nemáme žádné speciální požadavky. Přijímáme všechny zájemce, kteří mají chuť plavat a chtějí se zlepšovat.",
        "Plavecké kurzy",
        "nformace o našich plaveckých kurzech najdete na [ODKAZ]",
        "V případě jakýchkoliv dalších dotazů se můžete obrátit na šéftrenéra Jana Srba: 777 852 196, jan.srb@czechswimming.cz",
        "Těšíme se na všechny stávající i nové Klokany!",
        "Ať je nový školní rok pořádně plavecký!"
      ]
    },
    {
      "id": "soustredeni-jiretin-hodnoceni-2026-08-28",
      "title": "Soustředění Jiřetín - hodnocení",
      "date": "2026-08-28",
      "author": "Miroslav Vrána",
      "image": "assets/aktuality/2234.jpg",
      "excerpt": "V předposledním prázdninovém týdnu proběhlo přípravné soustředění v Jizerských horách na bohemácké chatě, vypůjčené od oddílu lyžařské turistiky, za což jim tímto moc děkujeme. Soustředění se zúčastnilo celkem 23 plavců – od přípravkářů až po plavce z...",
      "body": [
        "V předposledním prázdninovém týdnu proběhlo přípravné soustředění v Jizerských horách na bohemácké chatě, vypůjčené od oddílu lyžařské turistiky, za což jim tímto moc děkujeme. Soustředění se zúčastnilo celkem 23 plavců – od přípravkářů až po plavce z nejvyšších výkonnostních skupin.",
        "Celý týden bylo velice proměnlivé počasí, které nás nutilo měnit program občas i na poslední chvíli. Až na vodácký výlet na řece Jizeře jsme ale stihli všechno, co bylo naplánované (a několik věcí, které jsme dopředu ani neplánovali).",
        "Celým týdnem nás provázely bodované hry, ve kterých bylo konečné pořadí týmů následující: zelená, žlutá, bílá, červená.",
        "Celé soustředění hodnotím za trenéry jako vydařené. Každý si snad zkusil něco nového a také si zlepšil fyzičku. Těším se zase za rok. Kuchařka se taky těší.",
        "Foto v menu Fotky.",
        "P. S.: Nejsou kachničky i na bazéně na Vinohradech?"
      ]
    },
    {
      "id": "me-masters-samorin-2026",
      "title": "16 medailí, rekord ME a pět českých rekordů na Mistrovství Evropy masters!",
      "date": "2026-08-24",
      "author": "Jan Srb",
      "image": "assets/aktuality/2233.jpg",
      "excerpt": "Ve slovenském Šamoríně, v nádherném olympijském centru, proběhlo letošní Mistrovství Evropy masters. A Klokani byli pořádně vidět!",
      "body": [
        "Ve slovenském Šamoríně, v nádherném olympijském centru, proběhlo letošní Mistrovství Evropy masters. A Klokani byli pořádně vidět!",
        "Do venkovní desetidráhy nastoupilo celkem 11 našich plavců a plavkyň a výsledkem je parádních 16 medailí. K tomu přidáváme jeden rekord Mistrovství Evropy masters a hned pět českých rekordů masters – o tři se postaral Juraj Bránik, jeden přidala Marcela Šťastná a jeden Jaroslava Votrubová.",
        "Naši medailisté:",
        "Juraj Bránik (80-84) - 1. 50 Z, 1. 100 Z, 1. 200 Z, 2. 50 M, 2. 50 K",
        "Jaroslava Votrubová (80-84) - 1. 100 P, 1. 200 P, 1. 100 M, 3. 50 P",
        "Marcela Šťastná (85-89) - 1. 50 Z, 1. 100 Z, 2. 50 P",
        "Ivana Felgrová (80-84) - 1. 200 M, 2. 100 M, 3. 50 M",
        "A nechyběla ani štafeta! V kategorii 4x50 K mix (280-319) vybojovali bronz Juraj Bránik, Ivana Felgrová, Katka Augustová a Lešek Smelik.",
        "Velkou pochvalu ale zaslouží i Petr Bárta, Standa Bartůšek, Bětka Majchráková, Kuba Renc a Ivoš Tyburec, kteří se šampionátu také zúčastnili a někteří si připsali dokonce osobní rekordy.",
        "Celkem tedy 11 Klokanů, 16 medailí, 1 rekord ME a 5 českých rekordů. To je opravdu parádní evropská bilance!",
        "Všem moc gratulujeme a děkujeme za skvělou reprezentaci Bohemky!",
        "Kompletní výsledky najdete v menu Závody, fotografie pak v menu Foto.",
        "A pozor – za rok nás čeká Mistrovství světa masters v Budapešti!",
        "Klokani, do toho!"
      ]
    },
    {
      "id": "memorial-hany-greenfieldove-kolin-2026",
      "title": "Klokani opět bodovali. V Kolíně jsme upevnili bronzovou příčku!",
      "date": "2026-08-23",
      "author": "Jan Srb",
      "image": "assets/aktuality/2232.jpg",
      "excerpt": "Dálkoplavecký Český pohár pokračoval v sobotu tradičním Memoriálem Hany Greenfieldové v Kolíně na Labi. Ačkoli se závodilo až v druhé polovině srpna, voda opět příjemně překvapila – teploměr ukazoval 22,8 st C, takže podmínky byly téměř ideální.",
      "body": [
        "Dálkoplavecký Český pohár pokračoval v sobotu tradičním Memoriálem Hany Greenfieldové v Kolíně na Labi. Ačkoli se závodilo až v druhé polovině srpna, voda opět příjemně překvapila – teploměr ukazoval 22,8 st C, takže podmínky byly téměř ideální.",
        "Do Kolína vyrazilo 19 Klokanů a opět jsme byli výrazně vidět ve výsledkových listinách. Jen škoda, že byl kvůli nízkému stavu vody zrušen nedělní závod na Pastvinách. Další příležitost k bodovému zisku do týmové soutěže tak tentokrát odpadla. I přesto jsme si upevnili průběžné třetí místo v hodnocení klubů.",
        "Nejlepšího umístění tradičně dosáhla Hanka Jurčáková, která na trati 10 km doplavala na 2. místě a zároveň zvítězila v kategorii dorostenek. Skvělý výkon předvedla také Terka Čermáková, která obsadila nepopulární, ale velmi cenné 4. místo, a Ába Dvořáková, která doplavala osmá. Mezi muži skončil Vašek Tichý sedmý, Daník Dolín jedenáctý a Radek Táborský dvaadvacátý.",
        "Na 5 km se mezi dospělými blýskl Matyáš Táborský, který vybojoval 2. místo. Pavel Srb doplaval devátý. Mezi ženami obsadila Mia Srbová 6. místo a Petra Čermáková 12. místo. V kategorii kadetek skončila Pepina Pistulková šestá.",
        "Velmi zajímavý souboj nabídla žákovská kategorie. Po většinu závodu plavali bok po boku Niko Srb a Michal Němec, kteří sváděli boj o medailové pozice. Ve třetím okruhu však Niko nastoupil, vytvořil si rozhodující náskok a doplaval si pro 3. místo, zatímco Michal obsadil výbornou 4. příčku.",
        "Na trati 3 km nenechal nikoho na pochybách o své formě Fanda Tichý, který kategorii mladších žáků s přehledem ovládl.",
        "Na nejkratší trati 1 km se mezi chlapci seřadili na 2., 3., 4. a 5. místě Jakub Štverák, Radek Šimsa, Pavel Štverák a Martin Lucbauer, což byla další zajímavá bodová injekce pro tým. Mezi ženami pak zvítězila Kačka Lucbauerová.",
        "Sezóna se pomalu blíží do svého finále, ale ještě není rozhodnuto. Před námi jsou dva závodní víkendy a čtyři závodní dny, během kterých budeme bojovat o další body i skvělé výsledky.",
        "Bohemka, do toho!"
      ]
    },
    {
      "id": "michal-judickij-na-mistrovstvi-evropy-v-parizi-2026-08-17",
      "title": "Michal Judickij na mistrovství Evropy v Paříži",
      "date": "2026-08-17",
      "author": "Jan Srb",
      "image": "assets/aktuality/2231.jpg",
      "excerpt": "V Paříži se konalo Mistrovství Evropy v plaveckých sportech a mezi členy české reprezentačního týmu bazénových plavců nechyběl ani náš Michal Judickij.",
      "body": [
        "V Paříži se konalo Mistrovství Evropy v plaveckých sportech a mezi členy české reprezentačního týmu bazénových plavců nechyběl ani náš Michal Judickij.",
        "Mišák nastoupil celkem ke čtyřem disciplínám a nejvýše se umístil na 400 m polohový závod, kde obsadil výborné 13. místo.",
        "Na tratích 200 m znak a 200 m polohový závod si navíc vytvořil nové osobní rekordy. Ve znaku mu nový osobák vynesl 34. místo, v polohovce pak 36. místo. Poslední den šampionátu se Michal postavil ještě na start 400 m volný způsob, kde se dostal pod hranici 3:59.",
        "Účast na evropském šampionátu a umístění v první patnáctce mezi evropskou elitou jsou pro Michala skvělým výsledkem a zároveň cennou zkušeností do dalších závodů.",
        "Kompletní výsledky najdete v menu Závody.",
        "Michalovi moc gratulujeme k výborné reprezentaci a přejeme hodně dalších osobních rekordů a úspěchů!"
      ]
    },
    {
      "id": "klokani-miri-v-ceskem-poharu-dalkoveho-plavani-na-medailove-pricky-po--2026-08-17",
      "title": "Klokani míří v Českém poháru dálkového plavání na medailové příčky po závodu Podstředohorský plavecký maratón",
      "date": "2026-08-17",
      "author": "Jan Srb",
      "image": "assets/aktuality/2230.jpg",
      "excerpt": "Český pohár v dálkovém plavání se pomalu přesouvá do své poslední třetiny a v týmové soutěži je pořádně živo. Bohemka se posouvá už na bronzovou příčku a také Klokani potvrzují, že jim letošní dálkoplavecká sezóna opravdu chutná.",
      "body": [
        "Český pohár v dálkovém plavání se pomalu přesouvá do své poslední třetiny a v týmové soutěži je pořádně živo. Bohemka se posouvá už na bronzovou příčku a také Klokani potvrzují, že jim letošní dálkoplavecká sezóna opravdu chutná.",
        "Na závod na Ohři vyrazilo hned 17 Klokanů a bylo znát, že v týmu panuje skvělá atmosféra. Závodíme společně, navzájem se podporujeme a hlavně – závody nás baví!",
        "Na nejdelší trati 10 km vybojovala skvělé 2. místo Hanka Jurčáková. Jen těsně za stupni vítězů, na čtvrtém místě, doplavala Terka Čermáková. Do první desítky se vešly také Mia Srbová (5.), Nikol Svobodová (8.) a Ába Dvořáková (10.). Mezi muži obsadil Váša Tichý 6. místo, Matyáš Táborský 7., Daník Dolín 10. a Radek Táborský 17. místo.",
        "Na 5 km vybojoval mezi muži Pavel Srb 5. místo. Mezi kadety doplaval Filip Čermák šestý a mezi staršími žáky si skvělé 3. místo připsal Niko Srb. V ženské kategorii obsadila Petra Čermáková 4. místo a mezi kadetkami vybojovala krásný bronz Anička Kotschová.",
        "Na trati 3 km se o další výrazný výsledek postaral Fanda Tichý, který zvítězil mezi mladšími žáky. Kačka Augustová obsadila mezi ženami 5. místo.",
        "Nejkratší 1 km si tentokrát opět zaplavala Radka Srbová, která doplavala na 5. místě.",
        "Celkově jsme tak z Ohře odvezli spoustu kvalitních výsledků, ale především další společný závod, který potvrzuje, že Klokani táhnou za jeden provaz. Velké díky patří všem závodníkům, trenérům, rodičům a všem, kteří se do dálkoplaveckého poháru zapojují. Je opravdu radost sledovat, jak tým roste a jak si společné závody užíváme.",
        "A rozhodně nekončíme!",
        "Už příští víkend nás čekají hned dva závody – v sobotu v Kolíně na Labi a v neděli na Pastvinské přehradě. Někteří na Pastvinách přespávají. :-)",
        "Klokani, jedeme dál!",
        "Výsledky najdete v menu Závody. Foto v menu Foto."
      ]
    },
    {
      "id": "dvakrat-behem-tydne-a-3x-behem-mesice-jeli-dalkoplavci-do-jiznich-cech-2026-08-13",
      "title": "Dvakrát během týdne a 3x během měsíce jeli dálkoplavci do Jižních Čech",
      "date": "2026-08-13",
      "author": "Jan Srb",
      "image": "assets/aktuality/2229.jpg",
      "excerpt": "Po hezkých závodech ve Veselí nad Lužnicí a následně v Opavě a Plzni se další kola Českého poháru v dálkovém plavání opět přesunula do jižních Čech.",
      "body": [
        "Po hezkých závodech ve Veselí nad Lužnicí a následně v Opavě a Plzni se další kola Českého poháru v dálkovém plavání opět přesunula do jižních Čech.",
        "Na přelomu prázdnin zamířili naši plavci k českému moři – na Lipno. Závod patří mezi nejnáročnější v celém poháru. Když se zvednou vlny a přidá se vítr, dokáže Lipno pořádně prověřit připravenost každého plavce. Letos sice podmínky nebyly tak drsné, ale vlny i vítr opět nechyběly.",
        "V sobotu si tříkilometrovou trať dala Kačka Augustová, na pětikilometrové trati pak bojovali oba Táboráci, DD a Nikol Svobodová. V neděli přišla na řadu desítka a v ní se představili Maty Táborský, Daník Dolín, Radek Táborský a opět velmi pěkně zaplavala také Nikol Svobodová.",
        "Všem moc gratulujeme!",
        "Hned další víkend pokračoval Český pohár v Českých Budějovicích. Tentokrát se plavalo na Malši pod mosty a oproti předchozím ročníkům se letos vynechalo tradiční pokračování závodu až do Vltavy.",
        "Závod má své kouzlo především díky příjemnému prostředí a letos se do Budějic vydalo opět více Klokanů. A bylo to znát i ve výsledcích – medailových umístění jsme posbírali opravdu spoustu! V součtu závodů na 5 + 1 + 3 km jsme mezi ženami získali celkové prvenství zásluhou Hanky Jurčákové, stříbrnou příčku obsadila Ába Dvořáková. Mezi muži vybojoval stříbro Matyáš Táborský a jen těsně pod stupni vítězů skončili Váša Tichý a Daník Dolín. Úspěšně se v Budějovicích představili také Fanda Tichý a Radek Táborský.",
        "I jim patří velká gratulace!",
        "Klokan dojí nemožné! Český pohár v dálkovém plavání ještě zdaleka nekončí. Výsledky z posledních závodů nám ale ukazují, že bronzové týmové umístění je stále ve hře. Ještě nás čeká sedm závodních dnů (Ohře, Kolín, Pastviny, 2x Račice a 2x Mělice). A právě teď se bude hodit každý jeden bod. Proto se zapojte v co největším počtu a pojďme zabojovat až do konce!",
        "Klokan dojí nemožné!",
        "Výsledky najdete v menu Závody a fotky ve Foto. :-)"
      ]
    },
    {
      "id": "hanka-jurcakova-ma-za-sebou-premieru-na-juniorskem-mistrovstvi-evropy-2026-07-26",
      "title": "Hanka Jurčáková má za sebou premiéru na juniorském mistrovství Evropy!",
      "date": "2026-07-26",
      "author": "Jan Srb",
      "image": "assets/aktuality/2228.jpg",
      "excerpt": "Naše Hanka Jurčáková má za sebou svůj první start na juniorském mistrovství Evropy v dálkovém plavání. Už samotná účast na této vrcholné akci je obrovským úspěchem, protože cesta na evropský šampionát rozhodně není jednoduchá.",
      "body": [
        "Naše Hanka Jurčáková má za sebou svůj první start na juniorském mistrovství Evropy v dálkovém plavání. Už samotná účast na této vrcholné akci je obrovským úspěchem, protože cesta na evropský šampionát rozhodně není jednoduchá.",
        "Nejprve bylo potřeba v dubnu splnit kvalifikační limit na 5 km v bazénu časem pod 1:02:15. Následně se Hanka musela na nominačním závodě na Seči probojovat mezi tři nejlepší české závodnice. Obě náročné podmínky zvládla skvěle a mohla tak obléknout reprezentační dres České republiky.",
        "Ani po skončení bazénové sezóny nepolevila v přípravě. Společně s dalšími klokany pokračovala v tréninku v Podolí a absolvovala závody Českého poháru v dálkovém plavání. Velké poděkování patří všem tréninkovým parťákům, kteří jí pomáhali s přípravou.",
        "Samotné mistrovství se konalo v Maďarsku na kanoistickém závodišti, jehož podmínky byly velmi podobné těm, které dobře známe z Račic. Ve čtvrtečním závodě na 10 km, rozděleném do šesti okruhů po 1 666 metrech, se Hanka nezalekla ani tempa, ani silné evropské konkurence. Od startu se pohybovala mezi nejlepšími, nejprve v čelní skupině a následně ve druhém balíku závodnic. Po výborně zvládnutém a velmi náročném závodě obsadila skvělé 16. místo mezi staršími juniorkami.",
        "V sobotu nastoupila také do atraktivního knockout sprintu na 3 km. Tento formát začíná dvěma rozplavbami, z nichž vždy deset nejlepších závodnic postupuje do semifinále na 1 000 metrů. Odtud se pak bojuje o účast ve finále na 500 metrů. Hanka si vyzkoušela, že tento závod je skutečně kontaktní disciplínou – o souboje o pozice nebyla nouze a „fight“ se tentokrát odehrával doslova. Přesto bojovala až do cíle a zanechala velmi dobrý dojem.",
        "Celé mistrovství Evropy hodnotíme jako mimořádně cennou zkušenost a výborný první krok mezi evropskou juniorskou elitou. Věříme, že získané zkušenosti Hanka v příštích sezónách naplno zúročí a že se na podobných akcích budou objevovat i další klokani.",
        "Hance srdečně gratulujeme k výborné reprezentaci klubu i České republiky a děkujeme za skvělé výkony!",
        "Výsledky v menu Závody i fotografie v menu Foto."
      ]
    },
    {
      "id": "memorial-mudr-jaroslava-fichtla-cp-dp-hodnoceni-2026-07-26",
      "title": "Memoriál MUDr. Jaroslava Fichtla ČP DP - hodnocení",
      "date": "2026-07-26",
      "author": "Jan Srb",
      "image": "assets/aktuality/2227.jpg",
      "excerpt": "Místo původního květnového termínu se letos MMJF konal v odloženém termínu v červenci. Ač to měl být volný víkend, nakonec si Velký Bolevecký rybník v Plzni pro příjemný sportovní víkend vybralo těchto 15 borců klokanů: Filip, Petra a Tereza Čermákovi, Dan...",
      "body": [
        "Místo původního květnového termínu se letos MMJF konal v odloženém termínu v červenci. Ač to měl být volný víkend, nakonec si Velký Bolevecký rybník v Plzni pro příjemný sportovní víkend vybralo těchto 15 borců klokanů: Filip, Petra a Tereza Čermákovi, Dan Dolín, Ába Dvořáková, Anna Kotschová, Josef Kysilka, Míša Němec, Pepča Pistulková, Tomáš Reissmüller, Nikol Svobodová, Ondra Šimsa, Pavel Štverák, Matyáš a Radek Táborští, Franta a Vašek Tiší.",
        "Výsledky i fotky na svém místě.",
        "Všem moc děkujeme za reprezentaci a další kolo ČP DP bude za týden o víkendu na Lipně. :-)"
      ]
    },
    {
      "id": "mistrovstvi-cr-zactva-v-dalkovem-plavani-slezsky-pohar-cp-dp-hodnoceni-2026-07-20",
      "title": "Mistrovství ČR žactva v dálkovém plavání, Slezský pohár ČP DP - hodnocení",
      "date": "2026-07-20",
      "author": "Jan Srb",
      "image": "assets/aktuality/2226.jpg",
      "excerpt": "Další závod ČP DP se konal ve slezské Opavě. Cesta je to dlouhá, ale o to hezčí pro žáky, kteří zde tradičně mají Mistrovství ČR žactva v dálkoévm plavání. Na nedělní start se postavili naši tři kvalifikovaní a nakonec mezi 2015 na 3 km vyplaval stříbrnou...",
      "body": [
        "Další závod ČP DP se konal ve slezské Opavě. Cesta je to dlouhá, ale o to hezčí pro žáky, kteří zde tradičně mají Mistrovství ČR žactva v dálkoévm plavání. Na nedělní start se postavili naši tři kvalifikovaní a nakonec mezi 2015 na 3 km vyplaval stříbrnou medaili František Tichý. Starší žáci pak plavou již náročnější závod na 5 km a v obou ročních 2014 a 2013 si naši borci vyplavali také stříbrnou medaili - Michal Němec a Niko Srb.",
        "Dvojdenní závod na Stříbrném jezeru od nás dále ke startu i k doplavání využili: Filip Čermák, Petra Čermáková, Tereza Čermáková, Daniel Dolín, Anna Kotschová, Jan Srb, Pavel Srb, Mia Srbová, Radmila Srbová, Nikol Svobodová a Václav Tichý.",
        "Všem moc gratulujeme!",
        "Výsledky v menu Závody. Fotky v menu Foto."
      ]
    },
    {
      "id": "veselska-hodinovka-cp-dp-hodnoceni-2026-07-14",
      "title": "Veselská hodinovka ČP DP - hodnocení",
      "date": "2026-07-14",
      "author": "Jan Srb",
      "image": "assets/aktuality/2225.jpg",
      "excerpt": "Další zástávka Českého poháru v dálkovém plavání byla tradičně na pískově Vlkov u Veselí nad Lužnicí.",
      "body": [
        "Další zástávka Českého poháru v dálkovém plavání byla tradičně na pískově Vlkov u Veselí nad Lužnicí.",
        "10 km: 2. žena Háňa Jurčáková a 9. Ába Dvořáková, 5. muž Ondra Šimsa, 12. Váša Tichý a 17. Daník Dolín.",
        "5 km: muži: 12. Pavel Srb a 16. Pepa Kysilka, ženy: 5. Mia Srbová, 10. Nikol Svobodová, 16. Kačka Augustová a 20. Petra Čermáková. 11. kadet Filip Čermák.",
        "3 km: 2. starší žák Niko Srb a 1. mladší žák Fanda Tichý.",
        "1 km do cíle doplavali: Pavel Štverák, Radka Srbová a Olga Pavelková.",
        "Všem moc gratulujeme a za týden v Opavě :-)"
      ]
    },
    {
      "id": "mistrovstvi-cr-v-dalkovem-plavani-na-10-km-52-brnensky-garoma-maraton--2026-07-12",
      "title": "Mistrovství ČR v dálkovém plavání na 10 km, 52. Brněnský GAROMA+ maratón, 6. Memoriál M. Šindeláře - hodnocení",
      "date": "2026-07-12",
      "author": "Jan Srb",
      "image": "assets/aktuality/2224.jpg",
      "excerpt": "Netradičně na Prýglu (Brněnské přehradě) se konalo MČR v dálkovém plavání na 10 km. Trať se proti Seči nepřehlednější a divácky méně atraktivní. Přesto všichni se s nástrahou přehradního závodu vypořádali dobře a vezeme pěkná umístění.",
      "body": [
        "Netradičně na Prýglu (Brněnské přehradě) se konalo MČR v dálkovém plavání na 10 km. Trať se proti Seči nepřehlednější a divácky méně atraktivní. Přesto všichni se s nástrahou přehradního závodu vypořádali dobře a vezeme pěkná umístění.",
        "Mezi ženami šestá Hanka Jurčáková (a zároveň druhá starší dorosteneka), 9. Terka Čermáková (bramborová starší dorka), 13. Nikol Svobodová a 20. Ába Dvořáková (která je Mistryně masters 65-69). Premiérovou desítku má za sebou čtvtá kadetka Pepina Pistulková.",
        "Mezi muži skončil 11. Ondra Šimsa, 22. Váša Tichý, 32. Pepa Kysilka (Mistr 55-59). Cíle nedohlídl Daník Dolín.",
        "Trojku si dali Kačka Augustová, Petra Čermáková, Filip Čermák, Fanda TIchý (1. mladší žák) a jedničku doplavali Petra Čermáková a Filip Čermák.",
        "Výsledky i foto na obvyklém místě.",
        "Všem moc gratulujeme a ČP DP pokračuje další neděli v pískovně ve Vlkově."
      ]
    },
    {
      "id": "mistrovstvi-cr-2026-open-hodnoceni-2026-06-30",
      "title": "Mistrovství ČR 2026 OPEN - hodnocení",
      "date": "2026-06-30",
      "author": "Jan Srb",
      "image": "assets/aktuality/2223.jpg",
      "excerpt": "Poslední bazénové MČR sezóny je za námi. A bylo opravdu povedené!",
      "body": [
        "Poslední bazénové MČR sezóny je za námi. A bylo opravdu povedené!",
        "Mistrovství České republiky v Podolí uzavřelo letošní bazénovou sezónu ve velkém stylu. Klokani předvedli skvělé výkony a domů si odvezli celkem 14 medailí – 6 zlatých, 4 stříbrné a 4 bronzové.",
        "Nejúspěšnější členkou našeho týmu byla Natálie Zápotocká, která vybojovala zlato na tratích 200 m prsa, 200 m polohový závod a 400 m polohový závod, k tomu přidala stříbro na 200 m znak a zařadila se mezi nejúspěšnější plavkyně celého mistrovství.",
        "Dvě zlaté medaile získal Michal Judickij za vítězství na tratích 200 m znak a 400 m polohový závod. Titul mistryně České republiky si vyplavala také Barbora Škopová, která zvítězila na 100 m znak a přidala stříbro na 50 m znak.",
        "Z medailových umístění se radovali také:",
        "Karla Škopová – 2. místo na 100 m znak,",
        "Patrik Boháč – 3. místo na 200 m polohový závod,",
        "Tereza Čermáková – 3. místo na 200 m motýlek,",
        "Margarita Paroubková – 3. místo na 400 m polohový závod.",
        "Výborně si vedly také naše štafety. Ženská štafeta 4×100 m polohově ve složení Barbora Škopová, Natálie Zápotocká, Karla Škopová a Margarita Paroubková vybojovala stříbrné medaile. Smíšená štafeta 4×100 m polohově ve složení Barbora Škopová, Michal Judickij, Karla Škopová a Patrik Boháč přidala bronz.",
        "Do finálových bojů se probojovali také Hanka Jurčáková, Mia Srbová a Andy Peštová. Ve finále štafet se představili Vašek Eybl, Kačka Lucbauerová a Nikol Svobodová. Jen krůček od finálové účasti zůstali Štěpán, Kája a Ondra, kterým děkujeme za skvělé výkony i bojovnost.",
        "Celé mistrovství se našemu týmu mimořádně vydařilo a všichni závodníci i trenéři si zaslouží velkou pochvalu za reprezentaci klubu.",
        "Děkujeme všem plavcům, trenérům, rodičům i fanouškům za podporu během celé sezóny. Teď už přejeme všem zasloužený odpočinek a těšíme se na setkání v srpnu, kdy společně odstartujeme zimní přípravu.",
        "Výsledky najdete v sekci Závody. Fotografie v menu Foto."
      ]
    },
    {
      "id": "olympiada-deti-a-mladeze-2026-hodnoceni-2026-06-23",
      "title": "Olympiáda dětí a mládeže 2026 - hodnocení",
      "date": "2026-06-23",
      "author": "Jan Srb",
      "image": "assets/aktuality/2222.jpg",
      "excerpt": "Od pondělí do středy se v Podolí koná Olympiáda, kam se do pražského výběru kvalifikovali Ondra Benš a Pepča Pistulková.",
      "body": [
        "Od pondělí do středy se v Podolí koná Olympiáda, kam se do pražského výběru kvalifikovali Ondra Benš a Pepča Pistulková.",
        "Pepča si připisuje nakonec 7. místo na 800 K a Ondra 2x 13. místo.",
        "Závody byly užasné a naši plavci si to rozhodně užili.",
        "Za 2 roky se ODM bude týkat plavců 2014-15.",
        "Gratulujeme k reprezentaci.",
        "Výsledky v menu Závody."
      ]
    },
    {
      "id": "memorial-miroslava-kroufka-cp-dp-hodnoceni-2026-06-23",
      "title": "Memoriál Miroslava Kroufka ČP DP - hodnocení",
      "date": "2026-06-23",
      "author": "Jan Srb",
      "image": "assets/aktuality/2221.jpg",
      "excerpt": "Sečská přehrada na Chrudimce byla letos svědkem \"jen\" kvalifikace na MEJ (Mistrovství Evropy juniorů).",
      "body": [
        "Sečská přehrada na Chrudimce byla letos svědkem \"jen\" kvalifikace na MEJ (Mistrovství Evropy juniorů).",
        "Na ženské desítce se představila Hanka Jurčáková a třetím místem mezi českými juniorkami potvrdila kvalifikaci na MEJ! V mužské obsadil 15. místo Vašek Tichý. Pátou kadetkou byla Anička Kotschová. Reissík a Mia se bohužel do cíle nepodívali. Na trojce vyhrál Fanda Tichý mezi mladšími žáky, Kačka Augustová devátá žena, na jedničce druhý starší žák Míša Němec, 8. a 9. žena Helča a Radka.",
        "V neděli na pětce je desátý Vašek, 21. Lucby, 22. Kysil. 8. kadet Filip Čermák, 2. žena Hanka, 4. Terka Čermáková, 7. Nikol Svobodová, 9. Kačka Lucbauerová a premiérový start za Bohemku Petra Čermáková, která skončila na 21. místě. 8. kadet byl Filip Čermák. Mezi staršími žáky zvítězil Michal na 3km.",
        "ČP DP pokračuje za 2 týdny na Príglu v Brně, kde se koná MČR na 10 km.",
        "Výsledky v menu Závody a fotky v menu Foto.",
        "Všem moc gratulujeme."
      ]
    },
    {
      "id": "prazdninovy-ctyrboj-hodnoceni-2026-06-18",
      "title": "Prázdninový čtyřboj - hodnocení",
      "date": "2026-06-18",
      "author": "Jan Srb",
      "image": "assets/aktuality/2220.jpg",
      "excerpt": "Na poslední společný závod pro všechny v sezóně se sešlo 79 klokanů.",
      "body": [
        "Na poslední společný závod pro všechny v sezóně se sešlo 79 klokanů.",
        "Máme premiérového absolutního vítěze a to Patrika Boháče! Mezi ženami zvítězila posedmé Natálie Zápotocká. Mezi žáky a žákyněmi základky zvítězili Filip Čermák a Anna Kotschová!",
        "Závody proběhly v příjemné atmosféře. Potkali se opět věechny generace. Zúčatnili se naši republikoví medailé a také účastnice letošního Mistrovství Evropy juniorů.",
        "Závody jsou tradičně inspirací pro všechny.",
        "Díky všem za účast. Bylo to moc fajn.",
        "Poslední tréninky jsou pro přípravku příští týden v úterý, pro ostatní ve středu ráno. 17 klokanů pak čeká ještě Mistrovství ČR.",
        "Výsledky jsou v menu Závody. Fotek je spousty. Budou co nejdříve."
      ]
    },
    {
      "id": "praha-2026-hodnoceni-2026-06-14",
      "title": "Praha 2026 - hodnocení",
      "date": "2026-06-14",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2219.jpg",
      "excerpt": "V sobotu a v neděli dopo probíhaly v podolském bazénu závody Praha 2026.",
      "body": [
        "V sobotu a v neděli dopo probíhaly v podolském bazénu závody Praha 2026.",
        "Počasí bylo trošku aprílové, ale jinak bylo venku na bazénu příjemné a všichni si s počasím poradili.",
        "Závodili jak žáci tak i naši nejzkušenější plavci, kteří si mohli bazén vyzkoušet před MČR, které se koná za týden a kousek.",
        "Osobáčky byly, medaile taky.",
        "K výkonům gratulujeme."
      ]
    },
    {
      "id": "letni-pohar-cr-jedenactiletych-cechy-hodnoceni-2026-06-14",
      "title": "Letní pohár ČR jedenáctiletých – Čechy - hodnocení",
      "date": "2026-06-14",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2218.jpg",
      "excerpt": "Letní pohár jedenáctiletých hostil bazén v Písku, kde se představili naši tři plavci: Vojta Vrchlabský, František Tichý a premiéru měla Madla Šťastná.",
      "body": [
        "Letní pohár jedenáctiletých hostil bazén v Písku, kde se představili naši tři plavci: Vojta Vrchlabský, František Tichý a premiéru měla Madla Šťastná.",
        "Kluci se nominovali na všechny disciplíny a měli ve vodě náročný program. Odváží si pár osobáčků. Vojta dominoval na 800m kraul, kde vyplaval po náročném souboji nakonec krásné 5.místo. Fanda patří do top 10tky na 100m motýlek. Madlenka si odváží opravdu velký osobák o 50s na 800m kraul.",
        "Moc gratuluji všem a vidíme se na 4boji."
      ]
    },
    {
      "id": "letni-pohar-cr-desetiletych-cechy-hodnoceni-2026-06-14",
      "title": "Letní pohár ČR desetiletých - Čechy - hodnocení",
      "date": "2026-06-14",
      "author": "Nikita Kalivodová",
      "image": "assets/aktuality/2217.jpg",
      "excerpt": "Letní pohár desetiletých se konal v Mladé Boleslavi, kde nás reprezentovali Filip Bytomský, Ema Peštová a Magdaléna Pirková.",
      "body": [
        "Letní pohár desetiletých se konal v Mladé Boleslavi, kde nás reprezentovali Filip Bytomský, Ema Peštová a Magdaléna Pirková.",
        "Na bazénu panovala příjemná a přátelská atmosféra. Plavci si navzájem hezky fandili, podporovali se a chovali se k sobě kamarádsky. Všichni tři předvedli pěkné výkony a odvážejí si pár krásných osobáčků i cenné závodní zkušenosti.",
        "Všem gratuluji ke krásným výkonům."
      ]
    },
    {
      "id": "tovacovsky-maraton-a-luzicka-mile-zavody-cp-dp-hodnoceni-2026-06-14",
      "title": "Tovačovský maratón a Lužická míle - závody ČP DP - hodnocení",
      "date": "2026-06-14",
      "author": "Radek Šimsa",
      "image": "assets/aktuality/2216.jpg",
      "excerpt": "Další závody Českého poháru pokračovaly na Moravě.",
      "body": [
        "Další závody Českého poháru pokračovaly na Moravě.",
        "V sobotu tradiční Tovačovský maratón, kde naši bojovali na tratích od 15 do 3 km. DD, Váša, Háňa, Nikol, ŠimO, Táborák, Pepča, Mišák.",
        "Následovala pro některé cesta domů a někteří pokračovali na jih Moravy, do domácích podmínek OSPHo.",
        "V Lužici na míli se postupně představili: DD, ŠimO, Táborák a Mišák.",
        "Všem moc gratulujeme!",
        "Výsledky tradičně v menu Závody.",
        "ČP DP pokračuje již za týden na Seči. :-)"
      ]
    },
    {
      "id": "letni-mistrovstvi-cr-mladsiho-zactva-hodnoceni-2026-06-08",
      "title": "Letní mistrovství ČR mladšího žactva - hodnocení",
      "date": "2026-06-08",
      "author": "Klára Svobodová",
      "image": "assets/aktuality/2215.jpg",
      "excerpt": "Na bazénu v Trutnově se první červnový víkend konalo Letní mistrovství ČR mladšího žactva. Za Bohemku zde závodili celkem 3 naši plavci: Míša Němec, David Pirk a Matyáš Hukal. Všichni předvedli skvělé výkony. Ze závodů si naši klokani odvezli několik...",
      "body": [
        "Na bazénu v Trutnově se první červnový víkend konalo Letní mistrovství ČR mladšího žactva. Za Bohemku zde závodili celkem 3 naši plavci: Míša Němec, David Pirk a Matyáš Hukal. Všichni předvedli skvělé výkony. Ze závodů si naši klokani odvezli několik nemalých osobáků, i pěkných umístění. V první desítce se povedlo umístit Míšovi a to hned čtyřikrát - na tratích 100M, 200M, 400K a 1500K. Závody celkově probíhaly ve fajn atmosféře, kluci se navzájem podporovali a brali jak připravu na tyto závody, tak i závody samotné zodpovědně - a to bylo vidět i na výsledcích:) Moc všem gralujeme k předvedným výkonům!"
      ]
    },
    {
      "id": "letni-mistrovstvi-cr-starsiho-zactva-hodnoceni-2026-06-08",
      "title": "Letní mistrovství ČR staršího žactva - hodnocení",
      "date": "2026-06-08",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2214.jpg",
      "excerpt": "O víkendu měli starší žáci vrchol letní sezony v Brně na Lužánkách, kde se konalo mistrovství ČR.",
      "body": [
        "O víkendu měli starší žáci vrchol letní sezony v Brně na Lužánkách, kde se konalo mistrovství ČR.",
        "Na mistrák se kvalifikovali 3 bohemáci a to Pepi Pistuková, Ondra Benš a Mára Boháč.",
        "Závody to byly celkem povedené, osobně mi tam chyběla lepší atmosféra. Jinak z pohledu trenéra hodnotím závody jako povedené. Někomu se dařilo více, někomu méně, ale to je prostě sport.",
        "Všichni bohemáci si z MČR odvažejí alespoň jeden osobáček, nejlépe se pak umístil Ondra Benš, který se na 1500 Vz vešel do top 10. Mára si zaplaval velké osobáky na všechny přijaté disciplíny.",
        "K výkonům gratulujeme.",
        "Pepi a Ondru ještě čeká jedna velká soutěž a tou je Olympiáda dětí a mládeže, kam se nominovali do pražského výběru. Tak držte palce.",
        "Kompletní výsledky v menu Závody."
      ]
    },
    {
      "id": "na-spince-pres-spinku-cp-dp-a-czechman-swim-2026-cp-dp-hodnoceni-2026-06-08",
      "title": "Na Špince přes Špinku ČP DP a CZECHMAN Swim 2026 ČP DP - hodnocení",
      "date": "2026-06-08",
      "author": "Jan Srb",
      "image": "assets/aktuality/2213.jpg",
      "excerpt": "O víkendu proběhly první závody dálkoplavecké sezény na otevřené vodě a hned jsme měli 14 zástupců na startu.",
      "body": [
        "O víkendu proběhly první závody dálkoplavecké sezény na otevřené vodě a hned jsme měli 14 zástupců na startu.",
        "Nejprve v pátek CZECHMAN na 1900 metrů, kde bral celkový bronz a premiérové kačky Váša Tichý a dále startovali DD, Anička a Kačka.",
        "v sobotu na rybníku Špinka startovalo již 12 klokanů, kteří si mohli vybrat trať podle chuti.",
        "Nejdelší trať na 15 km si dali Háňa Jurčáková (2. místo) a Dan DD Dolín (10.).",
        "10 km - 2. Matyáš Táborský, 3. Váša Tichý. Mezi ženami bramborový Ába Dvořáková.",
        "5 km doplaval 7. muž Radek Táborský, 2. kadetka Anča Kotschová.",
        "3 km 2. muž Stefano Mazzia, 2. žena Kačka Lucbauerová a 5. Kačka Augustová a 14. Radka Srbová. Mezi žáky absolutně 4. Fanda Tichý.",
        "Výsledky v menu Závody. Fotky v menu Foto.",
        "Všem moc gratulujeme a za týden mise na Hané a jižní Moravě."
      ]
    },
    {
      "id": "mistrovstvi-cr-junioru-a-u22-hodnoceni-2026-06-01",
      "title": "Mistrovství ČR juniorů a U22 - hodnocení",
      "date": "2026-06-01",
      "author": "Jan Srb",
      "image": "assets/aktuality/2212.jpg",
      "excerpt": "Z ústecké kryté padesátky si přivážíme 18 medailí!",
      "body": [
        "Z ústecké kryté padesátky si přivážíme 18 medailí!",
        "Mistrovství České republiky juniorů a kategorie U22 v Ústí nad Labem pro nás skončilo skvělou bilancí 18 medailí.",
        "Po třech mistrovských titulech vybojovali Michal Judickij a Natka Zápotocká, která k nim navíc přidala ještě bronzovou medaili. Další cenné kovy a jeden titul získaly také Karla a Bára Škopovy. Medailovou sbírku našeho oddílu dále rozšířili Patrik Boháč, Tereza Čermáková a Mia Srbová. Radost nám udělala také mixová polohová štafeta, která vyplavala bronzové medaile.",
        "Všichni naši plavci bojovali naplno a snažili se předvést svá nejlepší výkonnostní maxima. Někomu se dařilo více, jinému méně. Na výsledcích se mohla projevit i nezvykle vysoká teplota vody, která zejména na delších, dvousetmetrových a delších tratích často vedla k přehřátí organismu.",
        "Přesto hodnotíme vystoupení na MČR juniorů a U22 velmi pozitivně. Gratulujeme všem plavcům k předvedeným výkonům a děkujeme za skvělou reprezentaci oddílu.",
        "Nyní už netrpělivě vyhlížíme MČR OPEN a mistrovství České republiky žákovských kategorií.",
        "Ať se daří!",
        "Klokani, do toho!",
        "Výsledky v menu Závody, fotky z vyhlášení jsou v menu Foto."
      ]
    },
    {
      "id": "jarni-krajsky-prebor-zactva-2015-16-hodnoceni-2026-05-24",
      "title": "Jarní Krajský přebor žactva 2015-16 - hodnocení",
      "date": "2026-05-24",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2211.jpg",
      "excerpt": "Neděle opět patřila závodu KPŽ, kde se představily ročníky 2015 a 2016. Už od prvních startů byla vidět skvělá atmosféra a vzájemná podpora mezi plavci. K tomu navíc přidali i řadu osobních rekordů a povedených výkonů. Závod byl zároveň kvalifikací na...",
      "body": [
        "Neděle opět patřila závodu KPŽ, kde se představily ročníky 2015 a 2016. Už od prvních startů byla vidět skvělá atmosféra a vzájemná podpora mezi plavci. K tomu navíc přidali i řadu osobních rekordů a povedených výkonů. Závod byl zároveň kvalifikací na Český pohár, a tak nyní budeme čekat, zda se ročník 2015 kvalifikuje do Písku a ročník 2016 do Mladé Boleslavi.",
        "Na drobné chyby trenéři plavce upozornili, protože děti se stále učí závodit. Byli bychom rádi, aby po doplavání své disciplíny vždy přišly za trenéry pro zpětnou vazbu. Ta nemá být kritikou, ale radou, jak závod zvládnout ještě lépe a na co si dát příště pozor.",
        "Klokani si také zaplavali smíšené štafety, ve kterých naplno ukázali týmového ducha, bojovnost i radost ze společného závodění.",
        "Medailisté:",
        "Tichý František 2015 - 1. 100M, 2. 50M, 2. 200Z, 3. 100Z, 3. 200K",
        "Vrchlabský Vojtěch 2015 - 1. 800K, 2. 200K, 3. 400K",
        "Šťastná Madla 2015 - 1. 800K",
        "Pirková Magdaléna 2016 - 2. 200PZ, 3. 50P, 5. 100PZ",
        "Bytomský Filip 2016 - 2. 50M",
        "Peštová Ema 2016 - 3. 50K, 3. 100Z, 3. 200K",
        "Výsledky v menu Závody.",
        "Všem moc gratulujeme!"
      ]
    },
    {
      "id": "jarni-krajsky-prebor-zactva-2012-14-hodnoceni-2026-05-24",
      "title": "Jarní Krajský přebor žactva 2012-14 - hodnocení",
      "date": "2026-05-24",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2210.jpg",
      "excerpt": "Uplynulý pátek a v sobotu měli dostaveníčko žáci na krajském přeboru, který se konal na bazénu v Radlicích.",
      "body": [
        "Uplynulý pátek a v sobotu měli dostaveníčko žáci na krajském přeboru, který se konal na bazénu v Radlicích.",
        "Z mého pohledu není úplně co vytknout. Bohemáci a Bohemačky závodili velice pěkně a rychle. Myslím si, že ze všech startů máme pouze jednu diskvalifikaci, což považuji za dobré. Na druhou stranu máme spoustu osobních rekordů a medailí. Chování zúčastněných v pořádku, stejně tak i závodní morálka na velmi kvalitní úrovni. Zaplavané disciplíny budeme hlásit na MČR, tak držte palce, ať s co nejvíce plavci odjedeme do Brna, respektive do Trutnova.",
        "Medailisté:",
        "Pistulková Josefína 2012 - 1. 400K, 1. 400PZ, 1. 800K, 2. 100P, 2. 200K, 2. 200PZ, 2. 200P",
        "Pirk David 2014 - 1. 100P, 1. 200P, 1. 1500K,",
        "Němec Michal 2014 - 1. 400K, 2. 100K, 2. 100M, 2. 200K, 2. 200PZ, 2. 200M, 2. 400PZ",
        "Boháč Marek 2012 - 1. 200Z, 2. 100Z, 3. 200K",
        "Srb Niko 2013 - 1. 1500K",
        "Benš Ondřej 2012 - 2. 200K, 2. 400K, 2. 1500K",
        "Hukal Matyáš 2014 - 2. 200P, 3. 100P",
        "Ganziuc Elisabeta 2013 - 3. 800K",
        "K výsledkům gratulujeme. Kompletní výsledky najdete v menu Závody."
      ]
    },
    {
      "id": "vc-pardubic-hodnoceni-2026-05-10",
      "title": "VC Pardubic - hodnocení",
      "date": "2026-05-10",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2209.jpg",
      "excerpt": "Minulý víkend jsme se zúčastnili závodu českého poháru v Pardubicích. Celkem startovalo 14 klokanů.",
      "body": [
        "Minulý víkend jsme se zúčastnili závodu českého poháru v Pardubicích. Celkem startovalo 14 klokanů.",
        "Systém závodu byl, jako už tradičně v Pardubicích takový, že nejdříve startovaly nej 4 rozplavby od každé disciplíny, takzvaný rychlý blok, což pomáhá rychlejším plavcům především v tom, že mají více času na odpočinek mezi rozplavbami a odpoledním finále. Pak následuje pomalý blok, kde startoval zbytek.",
        "Finálka jsme hojně obsazovali a ve velké konkurenci jsme byli pěkně vidět. Byli i osobáčky (M číslo 28) a několik klokanů vytáhlo z pardubického bazénu perníkové medaile. Byli to: Natka Zápotocká (3x zlato), Karla Škopová (zlato a bronz), Michal Judickij (stříbro a bronz), Bára Škopová (stříbro), Patrik Boháč (2x bronz).",
        "Celkové výsledky najdete v menu závody.",
        "Teď máme před sebou první vrchol dlouhé letní sezóny a to je MČR jun a kategorie u22 v Ústí. Makáme dál.",
        "K zaplavaným výsledkům gratulujeme.",
        "#GP"
      ]
    },
    {
      "id": "majovy-viceboj-hodnoceni-2026-05-08",
      "title": "Májový víceboj - hodnocení",
      "date": "2026-05-08",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2208.jpg",
      "excerpt": "V pátek se v Radlicích konal závod Májový víceboj, kde se představili i naši plavci. Hlavní závod byl součet čtyř disciplín, které se lišily v jednotlivých kategoriích.",
      "body": [
        "V pátek se v Radlicích konal závod Májový víceboj, kde se představili i naši plavci. Hlavní závod byl součet čtyř disciplín, které se lišily v jednotlivých kategoriích.",
        "2014 - 100Z, 100P, 100K, 100M",
        "2015 - 100Z, 100P, 100K, 50M",
        "2016 - 50Z, 50P, 50K, 50M",
        "2017+18 - 50Z, 50P, 50K, 25M",
        "Všichni bohémáci si zaplavali krásné časy v podobě osobáků a také je proměnily v medaile. Matěj Vrchlabský 3x zlato, 1x bronz – ve víceboji 1. místo, Majda Pirková 1x zlato, Fíla Bytomský 1x stříbro, Vojta Vrchlabský 1x zlato, 1x bronz – ve víceboji 4. místo, Maty Hukal 1x zlato, 1x bronz, David Pirk 1x stříbro – ve víceboji 6. místo, Míša Němec 1x zlato, 1x stříbro, 1x bronz – ve víceboji 2. místo",
        "Plavci ukázali svou všestrannost a všem moc gratulujeme a děkujeme za reprezentaci! Těšíme se na KPŽ."
      ]
    },
    {
      "id": "mistrovstvi-cr-v-plavani-masters-hodnoceni-2026-04-26",
      "title": "Mistrovství ČR v plavání Masters - hodnocení",
      "date": "2026-04-26",
      "author": "Jan Srb",
      "image": "assets/aktuality/2206.jpg",
      "excerpt": "Naše masters plavci zářili na Mistrovství ČR swvé věkové kategorie!",
      "body": [
        "Naše masters plavci zářili na Mistrovství ČR swvé věkové kategorie!",
        "Jarka Votrubová a Juraj Bránik využili svého nejmladšího ročníku v pětiletých kategoriích a berou spousty rekordů ČR!",
        "Medailisté:",
        "Votrubová Jaroslava - 1. 50P, 1. 50M, 1. 100P, 1. 100M, 1. 200P",
        "Bránik Juraj - 1. 50K, 1. 50Z, 1. 100Z, 1. 200Z, 2. 50M",
        "Felgrová Ivana - 1. 50K, 1. 200PZ, 1. 400PZ, 3. 50P",
        "Brožová Olga - 1. 50Z, 1. 200Z, 2. 100Z",
        "Šťastná Marcela - 1. 50Z, 1. 100Z, 3. 100P",
        "Tyburec Ivo - 1. 100P, 2. 200P, 3. 50P",
        "Smelik Ladislav - 2. 50K, 2. 100K",
        "Mazzia Stefano - 2. 400K, 2. 800K",
        "Lochman Tomáš - 2. 200Z, 3. 50K",
        "Majchránková Alžběta - 2. 50K, 3. 50Z, 3. 100K",
        "Augustová Kateřina - 2. 400K",
        "Všem moc gratulujeme!",
        "Výsledky v menu Závody. Fotky zatím od Leška, klidně posílejte i další. Díky"
      ]
    },
    {
      "id": "int-bauakademie-atus-graz-trophy-2026-hodnoceni-2026-04-26",
      "title": "Int. BAUAkademie ATUS Graz Trophy 2026 - hodnocení",
      "date": "2026-04-26",
      "author": "Martin Břenda",
      "image": "assets/aktuality/2205.jpg",
      "excerpt": "Minulý týden jsem s klokaním výběrem odcestovali do Štýrského Hradce na mezinárodní závody. Účastnila se pouze děvčata a to sestry Škopovi, Natka Zápotocká a Margi Paroubková.",
      "body": [
        "Minulý týden jsem s klokaním výběrem odcestovali do Štýrského Hradce na mezinárodní závody. Účastnila se pouze děvčata a to sestry Škopovi, Natka Zápotocká a Margi Paroubková.",
        "Očekávali jsme nabitou konkurenci. V tomhle ohledu jsem byl já malinko zklamán, ale i tak se tam pár zvučných jmen ukázalo, minimálně naše holky.",
        "Cíl byl jasný, plavat co nejrychleji. To se na nějaké disciplíny podařilo, v některých máme ještě drobné rezervy. Nicméně na rozjíždějící se letní sezonu to nebylo vůbec špatné. Finálové účasti byli pro nás vlastně standardem. Nevyhlašovalo se, takže žádné medaile nevezeme. Na imaginárních stupíncích se holky ale umisťovaly.",
        "Makáme dál.",
        "Komplet výsledky v menu závody."
      ]
    },
    {
      "id": "jarni-krajsky-prebor-prahy-a-stredoceskeho-kraje-hodnoceni-2026-04-26",
      "title": "Jarní Krajský přebor Prahy a Středočeského kraje - hodnocení",
      "date": "2026-04-26",
      "author": "Jan Srb",
      "image": "assets/aktuality/2204.jpg",
      "excerpt": "Další Krajský přebor je za námi a tentokrát pro nejstarší tradičně v Podolí na padesátce.",
      "body": [
        "Další Krajský přebor je za námi a tentokrát pro nejstarší tradičně v Podolí na padesátce.",
        "Docela se nám dařilo, o čemž svědčí M číslo 53.",
        "Medailisté:",
        "Boháč Patrik - 1. 5OK, 1. 100K, 1. 200K, 1. 100Z, 2. 100M",
        "Jurčáková Hana - 1. 400K, 1. 800K, 1. 1500K",
        "Čermáková Tereza - 1. 200M, 1. 400PZ, 2. 100M, 2. 200K, 2. 400K, 2. 800K",
        "Srbová Mia - 1. 200Z, 1. 20OK",
        "Eybl Václav - 1. 200PZ, 2. 50K, 3. 400PZ",
        "Hrdlička Štěpán - 1. 50P, 2. 50M",
        "Šimsa Ondřej - 2. 200M, 3. 400K",
        "Čermák Filip - 2. 200P",
        "Zámečníková Adéla - 2. 1500K",
        "Lucbauerová Kateřina - 3. 200K, 3. 400K, 3. 800K",
        "McDonnell Karoline - 3. 100P, 3. 200P, 3. 400PZ",
        "Zámečník Ondřej - 3. 100Z, 3. 200Z",
        "Dolín Daniel - 3. 200M",
        "Makal Ondřej - 3. 200PZ",
        "Peštová Andtea - 3. 200PZ",
        "Tichý Václav - 3. 800K",
        "Všem moc gratulujeme, zvláště pak k medailím a osobákům!",
        "Výsledky v menu Závody a fotky ve Foto."
      ]
    },
    {
      "id": "mezinarodni-zavody-bergen-hodnoceni-2026-04-19",
      "title": "Mezinárodní závody Bergen - hodnocení",
      "date": "2026-04-19",
      "author": "Jan Srb",
      "image": "assets/aktuality/2203.jpg",
      "excerpt": "Bergen, to je místo, kde to našim plavcům svědčí. Před lety zde Kíťa zaplavala olympijský limit a tentokrát jel bojovat do města severu Michal Judickij.",
      "body": [
        "Bergen, to je místo, kde to našim plavcům svědčí. Před lety zde Kíťa zaplavala olympijský limit a tentokrát jel bojovat do města severu Michal Judickij.",
        "Michal zaplaval na své hlavní disciplíně 400PZ limit na Mistrovství Evropy do Paříže. Gratulujeme!",
        "Dále si připsal osobáky i medailová umístění na obě další disciplíny a to 200Z a 200PZ.",
        "Držíme pěsti i dál do sezóny!"
      ]
    },
    {
      "id": "jarni-krajsky-prebor-na-dlouhe-trate-hodnoceni-2026-04-19",
      "title": "Jarní Krajský přebor na dlouhé tratě - hodnocení",
      "date": "2026-04-19",
      "author": "Klára Svobodová",
      "image": "assets/aktuality/2202.jpg",
      "excerpt": "V neděli se na Zeleném pruhu tradičně konaly Krajské přebory na dlouhé tratě. Celkem se zúčastnilo 14 klokanů. V dopoledním programu, tedy na trati 800VZ jsme viděli hned několik velmi pěkných výkonů i umístění. Medaili na této trati vybojovali: Vojta...",
      "body": [
        "V neděli se na Zeleném pruhu tradičně konaly Krajské přebory na dlouhé tratě. Celkem se zúčastnilo 14 klokanů. V dopoledním programu, tedy na trati 800VZ jsme viděli hned několik velmi pěkných výkonů i umístění. Medaili na této trati vybojovali: Vojta Vrchlabský, který skončil na 3. místě, dále Majda Pirková vybojovala 3. místo a Ema Peštová brala 2. místo. Na trati 1500VZ se na 2. místě v krásném osobáku umístil Ondra Benš, skvělý výkon předvedl i Míša Němec, který bere též 2. místo.",
        "Všem plavcům gratulujeme!",
        "Výsledky již v menu Závody. Fotky v menu Foto :-)"
      ]
    },
    {
      "id": "jarni-krajsky-prebor-zactva-2017-a-mladsi-hodnoceni-2026-04-18",
      "title": "Jarní Krajský přebor žactva 2017 a mladší - hodnocení",
      "date": "2026-04-18",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2201.jpg",
      "excerpt": "Naši nejmladší klokánci v sobotu závodili na krajském přeboru žactva v bazénu Zelený pruh. Některé děti měly premiéru na větších závodech a zkusily si 25m tratě kraulem, znakem a prsy. Ostatní, již zkušenější, se představily na 50m a 100m tratích. Všechny...",
      "body": [
        "Naši nejmladší klokánci v sobotu závodili na krajském přeboru žactva v bazénu Zelený pruh. Některé děti měly premiéru na větších závodech a zkusily si 25m tratě kraulem, znakem a prsy. Ostatní, již zkušenější, se představily na 50m a 100m tratích. Všechny děti i přes nervozitu zvládly závody perfektně. Technické chybičky se sice našly, ale určitě je doladíme v tréninku.",
        "Na stupně vítězů dosáhl čtyřikrát Matěj Vrchlabský, který vše proměnil ve zlato!",
        "František Kincl a Jiřík Hronza získali bronz na 50 m prsa.",
        "Ríša Hanousek vyplaval 1. místo na 25 m prsa a 2. místo na 25 m znak.",
        "Maruška Marešová se umístila na 2. místě na 25 m znak a na 3. místě na 25 m prsa.",
        "Děti závodily i ve štafetách, kde ve složení Emily, Žofka, František a Matěj vybojovaly 2. místo jak v polohové, tak i v kraulové štafetě.",
        "Gratulujeme všem dětem, které závodily, a doufáme, že budou i nadále makat na trénincích!",
        "Výsledky v menu Závody a fotky ve Foto."
      ]
    },
    {
      "id": "krajsky-prebor-zactva-ve-vsestrannosti-drop-cup-hodnoceni-2026-04-18",
      "title": "Krajský přebor žactva ve všestrannosti (DRoP cup) - hodnocení",
      "date": "2026-04-18",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2200.jpg",
      "excerpt": "Na Zeleném pruhu se v sobotu konal také závod všestrannosti.",
      "body": [
        "Na Zeleném pruhu se v sobotu konal také závod všestrannosti.",
        "Každý si zaplaval čtyři stovky (M, Z, P, K) a dle výběru 200 PZ nebo 400 VZ, kde se sčítaly AQVA body. Umístění v TOP 10 získali: Ondra Benš (4. místo), Niko Srb (6. místo) a Michal Němec (2. místo). Všem ostatním gratulujeme k osobním rekordům.",
        "Výsledky v menu Závody a fotky ve Foto."
      ]
    },
    {
      "id": "zimni-mistrovstvi-cr-zactva-kadetu-dorostu-a-dospelych-v-dp-hodnoceni-2026-04-12",
      "title": "Zimní Mistrovství ČR žactva, kadetů, dorostu a dospělých v DP - hodnocení",
      "date": "2026-04-12",
      "author": "Jan Srb",
      "image": "assets/aktuality/2199.jpg",
      "excerpt": "Po patnácté se na Zimní Mistrovství ČR v dálkovém plavání sjeli nejlepší plavci do Podolí.",
      "body": [
        "Po patnácté se na Zimní Mistrovství ČR v dálkovém plavání sjeli nejlepší plavci do Podolí.",
        "Na startu jsme měli 13 klokanů s chutí se porvat o nejlepší výkony a o medaile. Fanda, naše nejmladší naděje, se na vše koukal jen z dálky z postele a téměř jistou medaili zkusí vybojovat tedy až v létě.",
        "Vyplavali jsme si 8 osobáků a 5 medailí!",
        "Žáci 2014 - 2. Michal Němec, žáci 2013 - 2. Niko Srb, kadetky 2012 - 3. Josefína Pistulková, mladší dorostenky - 3. Mia Srbová a starší dorostenky - 2. Hana Jurčáková, která přidala splněný limit na MEJ (1. podmínka). eště musí potvrdit na otevřené vodě v červnu na Seči.",
        "Gratulueme všem k předvedeným výkonům a zvláště pak medailistům.",
        "Výsledky v menu Závody. Fotky v menu Foto.",
        "Členové repre týmu a SCM mají ještě jeden pokus na splnění limitu v bazénu na letošní vrcholné akce. Držíme pěsti."
      ]
    },
    {
      "id": "jarni-cena-prahy-hodnoceni-2026-04-12",
      "title": "Jarní cena Prahy - hodnocení",
      "date": "2026-04-12",
      "author": "Jan Srb",
      "image": "assets/aktuality/2198.jpg",
      "excerpt": "Jsou za námi velké nádherné závody. Pro všechny to byl zážitek a obrovská inspirace a motivace k dalším tréninkům.",
      "body": [
        "Jsou za námi velké nádherné závody. Pro všechny to byl zážitek a obrovská inspirace a motivace k dalším tréninkům.",
        "Plavci byli samostatní a přijímali rady od trenérek a trenérů.",
        "Výkony klokanů byly na velmi dobré úrovni. Nejvíce se dařilo Michalovi Němcovi, který bral 2 medaile.",
        "Zaplavali jsme spousty osobních rekordů.",
        "Všem moc gratulujeme a s chutí do dalších závodů!",
        "Výsledky jsou v menu Závody.",
        "Děkujemem všem, kteří se zapojili do přípravy a úklidu, pečení a pomohli zorganizovat nádherné závody! Tak zas za rok :-)"
      ]
    },
    {
      "id": "velikonocni-soustredeni-vt-tabor-hodnoceni-2026-04-09",
      "title": "Velikonoční soustředění VT Tábor - hodnocení",
      "date": "2026-04-09",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2197.jpg",
      "excerpt": "O Velikonočních prázdninách vyrazili plavci z bohemácké přípravky na soustředění do Tábora.",
      "body": [
        "O Velikonočních prázdninách vyrazili plavci z bohemácké přípravky na soustředění do Tábora.",
        "Děti si mákly jak ve vodě, tak na suchu.",
        "V bazénu jsme pilovali techniku, starty a zároveň naplavávali kilometry. Suchá byla hlavně v duchu běhu, silových, rychlostních a koordinačních cvičeních, v podobě her a štafet. Ve volných chvílích klokani byli venku a hráli fotbálek.",
        "Během soustředění panovala opravdu dobrá nálada a perfektní nasazení k tréninku a všem ostatním aktivitám, které prováděli v týmech.",
        "Zvítězil tým Hříbečků (David, Elisabeta, Sára, Matěj Vrch.) druhé místo Legendy (Oskar, Anet, Matěj, Majda) a třetí místo Nejlepší tým (Ella, Vojta Vrch., Filip, Madla).",
        "Všechny plavce chválím a makejte dál!",
        "Velký dík patří trenérkám za super organizaci a skvělý přístup k dětem!"
      ]
    },
    {
      "id": "barbora-skopova-v-ceske-vyberu-na-multinations-junior-swimming-meet-20-2026-03-29",
      "title": "Barbora Škopová v české výběru na Multinations Junior Swimming Meet 2026",
      "date": "2026-03-29",
      "author": "Jan Srb",
      "image": "assets/aktuality/2196.jpg",
      "excerpt": "O víkendu proběhlo v podolské bazénu mezi 14 státy mezistátkí utkání.",
      "body": [
        "O víkendu proběhlo v podolské bazénu mezi 14 státy mezistátkí utkání.",
        "Ve výběru byla naše Barbora Škopová, která startovala ve všech znakových disciplínách.",
        "Na nejdelší a nejkratší akakovala své osobní rekordy. Byly to pro ni zatím největší závody v sezóně.",
        "Před dalšími závody hodně chuti do tréninku!",
        "Gratulujeme a děkujeme za reprezentaci.",
        "Výsledky v menu Závody."
      ]
    },
    {
      "id": "velka-cena-usti-nad-labem-2026-hodnoceni-2026-03-29",
      "title": "Velká cena Ústí nad Labem 2026 - hodnocení",
      "date": "2026-03-29",
      "author": "Jan Srb",
      "image": "assets/aktuality/2195.jpg",
      "excerpt": "Další závody na padesátce pro všechn ykategorie.",
      "body": [
        "Další závody na padesátce pro všechn ykategorie.",
        "Do Ústí vyrazilo 13 klokanů a vezou si M číslo na půlkou.",
        "V obou hlavních závodech (na 200K a 200P) startovala ve finále a bere medaili. 200K finále plavali i Páťa a Margi. Dále bereme několik medailí z patečních delších tratí.",
        "Gratulujeme!",
        "Výsledky v menu Závody."
      ]
    },
    {
      "id": "velikonocni-zavody-hodnoceni-2026-03-21",
      "title": "Velikonoční závody - hodnocení",
      "date": "2026-03-21",
      "author": "Kateřina Holubová",
      "image": "assets/aktuality/2194.jpg",
      "excerpt": "V sobotu jsme se zúčastnili tradičních Velikonočních závodů, které pořádal plavecký oddíl Olymp Praha. Plavalo se v Radlickém bazénu. O závody byl velký zájem a konkurence byla opravdu silná, proto zde startovalo pouze 6 klokanů.",
      "body": [
        "V sobotu jsme se zúčastnili tradičních Velikonočních závodů, které pořádal plavecký oddíl Olymp Praha. Plavalo se v Radlickém bazénu. O závody byl velký zájem a konkurence byla opravdu silná, proto zde startovalo pouze 6 klokanů.",
        "Skvělá atmosféra se ale promítla do kvalitních výkonů a všichni si zaplavali osobáčky. Na bazéně nechyběl ani maskot, velikonoční zajíček.",
        "Věříme, že v příštím ročníku bude přijato více přihlášených závodníků a podaří se nám zaplavat i štafetu. Všechny zúčastněné chválíme za přístup k závodům od rozcvičky, rozplavání až po samotné výkony.",
        "Na závěr bychom chtěly povzbudit všechny děti, aby se závodů nebály, hlásily se a sbíraly cenné zkušenosti.",
        "Makáme dál.",
        "Výsledky v menu Závody."
      ]
    },
    {
      "id": "mistrovstvi-cr-druzstev-2026-za-nami-a-zeny-maji-bronz-2026-03-15",
      "title": "Mistrovství ČR družstev 2026 za námi a ženy mají bronz",
      "date": "2026-03-15",
      "author": "Jan Srb",
      "image": "assets/aktuality/2193.jpg",
      "excerpt": "Bronzová radost k 80. výročí oddílu! V roce 2026, kdy si připomínáme krásné 80. výročí založení našeho oddílu, přidaly naše ženy do oddílové historie další cenný úspěch. V soutěži družstev vybojovaly skvělou bronzovou medaili! Výborný týmový výkon,...",
      "body": [
        "Bronzová radost k 80. výročí oddílu!",
        "V roce 2026, kdy si připomínáme krásné 80. výročí založení našeho oddílu, přidaly naše ženy do oddílové historie další cenný úspěch. V soutěži družstev vybojovaly skvělou bronzovou medaili!",
        "Výborný týmový výkon, podložený řadou skvělých individuálních výkonů, přinesl zaslouženou odměnu. Po sedmi letech od posledního bronzu se tak naše družstvo žen znovu postavilo na medailový stupínek.",
        "O bronzový úspěch se postaraly především fantastické výkony Natálky, Báry, Karly a Terky, které svými body výrazně pomohly celému týmu. Skvělou práci ale odvedly i Hanka, Mia, Margi a Andrea, jejichž nasazení a bojovnost byly pro konečný výsledek stejně důležité.",
        "Také muži se v silné konkurenci rozhodně neztratili. V sestavě, kterou výrazně ovlivňuje probíhající generační výměna, vybojovali velmi pěkné 7. místo, což je skvělý příslib do dalších let.",
        "Všem plavkyním, plavcům i trenérům moc gratulujeme a děkujeme za skvělou reprezentaci oddílu."
      ]
    },
    {
      "id": "breznovy-vikend-plny-masters-zavodu-2026-03-09",
      "title": "Březnový víkend plný masters závodů",
      "date": "2026-03-09",
      "author": "Jan Srb",
      "image": "assets/aktuality/2192.jpg",
      "excerpt": "Tradiční VC Brna pro masters se konala na letné a naši klokani byli vidět. V celkovém pořadí obsadil mezi muži Juraj Bránik čtvrté místo. V jednotlivých disciplinách byla kromě Juraje na bedně i Marcela Šťastná.",
      "body": [
        "Tradiční VC Brna pro masters se konala na letné a naši klokani byli vidět. V celkovém pořadí obsadil mezi muži Juraj Bránik čtvrté místo. V jednotlivých disciplinách byla kromě Juraje na bedně i Marcela Šťastná.",
        "Hana Eckermann byla otestovat závody v Německu v Gloseru, kde zkusila obě krátší polohovky. V Německu v Drážďanech závodili i naši hostující a na dlouhém bazénu si připsali zajímavé časy.",
        "V neděli pak po Brnu bývá MČR masters na 1500K a 3km ve Vysokém Mýtě. Bronz veze 1500K Stafano Mazzia, bronz 3km Pavel Srb a Ába Dvořáková si připisuje masters titul a nové české rekordy na 1500K i 3km.",
        "Všem moc gratulujeme za předvedené výkony!"
      ]
    },
    {
      "id": "finale-mistrovstvi-cr-hodnoceni-2026-03-01",
      "title": "Finále Mistrovství ČR- hodnocení",
      "date": "2026-03-01",
      "author": "Jan Srb",
      "image": "assets/aktuality/2191.jpg",
      "excerpt": "Máme za sebou první finálové kolo letošního Mistrovství ČR družstev – a hned přineslo spoustu emocí i skvělých výkonů!",
      "body": [
        "Máme za sebou první finálové kolo letošního Mistrovství ČR družstev – a hned přineslo spoustu emocí i skvělých výkonů!",
        "Letos se finále plave nově dvojkolově, takže se o všem rozhodne až druhé dějství.",
        "Obě naše družstva – ženy i muži – startují v 1. lize. Už samotná účast mezi elitou je obrovský úspěch. Navíc jsme jediným pražským klubem v první lize.",
        "Ženský tým se od začátku držel na bronzové příčce a dlouho sahal po medaili. Nakonec z toho je skvělé 4. místo – a hlavně otevřená hra o stupně vítězů! Za 14 dní v Ostravě se rozhodne.",
        "Muži letos procházejí generační obměnou a jejich cílem bylo udržet se kolem 7. místa. To se podařilo – a v silné konkurenci je to velmi cenný výsledek.",
        "Výkony? Parádní! Na tuto fázi sezóny byly předvedené časy opravdu výborné. Tým šlapal, bojovalo se o každý bod a bylo vidět, že všichni nechali ve vodě maximum. A kde to nebylo úplně TOP, tak to jsme si řekli při závěrečné řeči a ve druhém finále se tím poučíme.",
        "Za dva týdny nás čeká druhé finálové kolo v Ostravě. A nebude to jednoduché. Plavat se bude systémem „Jakpot“ – vítěz rozplavby bere body všech pomalejších závodníků, kteří jsou nad stanoveným limitem (daným rozdílem mezi loňským nejlepším a desátým časem v republikovém žebříčku). Může to pořádně zamíchat pořadím!",
        "Děkujeme všem za předvedené výkony a gratulujeme k skvělé reprezentaci oddílu.",
        "Držíme palce do Ostravy – ať to cinkne!",
        "Výsledky najdete v menu Závody, brzy přidáme i spoustu fotografií."
      ]
    },
    {
      "id": "plzensky-vytrvalec-hodnoceni-2026-02-22",
      "title": "Plzeňský vytrvalec - hodnocení",
      "date": "2026-02-22",
      "author": "Jan Srb",
      "image": "assets/aktuality/2190.jpg",
      "excerpt": "Tradiční plzeňská akce nejen pro vytrvalce se konala letos o měsíc dříve a zrovánka mezi pražskými jarňáky.",
      "body": [
        "Tradiční plzeňská akce nejen pro vytrvalce se konala letos o měsíc dříve a zrovánka mezi pražskými jarňáky.",
        "Z původně 7 přihlášených jsme vyrazili jen ve třech plavcích.",
        "Výkony odpovídaly době konání závodů. Vyzkooušeli jsme si start na dlouhém bazénu.",
        "M číslo je 40.",
        "Výsledky v menu Závody. :-)"
      ]
    },
    {
      "id": "mistrovstvi-cr-v-zimnim-plavani-prsarsky-zpusob-hodnoceni-2026-02-22",
      "title": "Mistrovství ČR v zimním plavání - prsařský způsob - hodnocení",
      "date": "2026-02-22",
      "author": "Jan Srb",
      "image": "assets/aktuality/2189.jpg",
      "excerpt": "Po roce máme opět Mistra ČR v prsou v zimním plavání.",
      "body": [
        "Po roce máme opět Mistra ČR v prsou v zimním plavání.",
        "Na loňský titul DD navázal Kryštof Spejchal, když nakonec nemoc DD znemožnila přímý soubor mezi našimi dorostenci.",
        "Kryštof vyhrál na trati 250 metrů prsa v 7 stupňové vodě.",
        "Gratulujeme!"
      ]
    },
    {
      "id": "bum-cup-hodnoceni-2026-02-08",
      "title": "BUM cup - hodnocení",
      "date": "2026-02-08",
      "author": "Klára Svobodová",
      "image": "assets/aktuality/2188.jpg",
      "excerpt": "V neděli se v Radlicích konal 4: ročník BUM cupu. Utkání mezi Bohemians x USK x Motorletem. Závodů se zúčastnilo 31 našich plavců a bereme celkově třetí místo. V kategorii jednotlivců juniorky si pro první místo doplavala Mia Srbová a pro pohár mladších...",
      "body": [
        "V neděli se v Radlicích konal 4: ročník BUM cupu. Utkání mezi Bohemians x USK x Motorletem. Závodů se zúčastnilo 31 našich plavců a bereme celkově třetí místo. V kategorii jednotlivců juniorky si pro první místo doplavala Mia Srbová a pro pohár mladších žáků Michal Němec.",
        "Závody probíhaly ve fajn atmosféře, a i přesto, že většina plavců byla vyčerpána ze soustředění, tak předvedli hned několik velmi pěkných výkonů, ale bohužel se objevilo i několik diskvalifikací, z kterých si jistě poučíme.",
        "M číslo 54",
        "Výsledky jsou v menu Závody a fotky na obvyklém místě.",
        "Všem gratulujeme k předvedeným výkonům!"
      ]
    },
    {
      "id": "bezkarske-soustredeni-na-miseckach-2026-2026-02-01",
      "title": "Běžkařské soustředění na Mísečkách 2026",
      "date": "2026-02-01",
      "author": "Jan Srb",
      "image": "assets/aktuality/2187.jpg",
      "excerpt": "Po úspěchu na Krajské lize jsme se v neděli naložili do autobusu a vyrazili směr Krkonoše. Přesun klapnul, lyže se do trenérské dodávky vešly všechny (ano, i ty bez obalu) a Dolní Mísečky nás přivítaly krásně bílé – silnice naštěstí spíš černé. Ideální...",
      "body": [
        "Po úspěchu na Krajské lize jsme se v neděli naložili do autobusu a vyrazili směr Krkonoše. Přesun klapnul, lyže se do trenérské dodávky vešly všechny (ano, i ty bez obalu) a Dolní Mísečky nás přivítaly krásně bílé – silnice naštěstí spíš černé. Ideální kombinace.",
        "Hned od prvního dne jsme začali poctivě sbírat kilometry. K našemu milému překvapení patřily k nejaktivnějším plnoleté dívky, rekordmanem se stal Niko s parádními 29 km za první půlden a nejmladší Majda zvládla 18 km – klobouk dolů! Nechyběl rychlostní trénink, týmové hry ani expertní přednáška o mazání lyží od Radka (protože správně namazaná lyže = půlka úspěchu).",
        "Počasí nám předvedlo celý horský repertoár: déšť, ledovku, prašan, mlhu, krupičku i slunce jak z katalogu. Kilometry se ale sbíraly za všech podmínek, technika pilovala a morálka... ta tradičně kolísala nahoru a dolů podle únavy a stavu nohou. Večery patřily regeneraci, Kahoot kvízům (trenéři opět potvrdili své zkušenosti), přednášce o čistém sportu a také nezapomenutelné karaoke show pod taktovkou Váši – hudební výkony zůstanou raději bez hodnocení.",
        "Zlatým hřebem týdne byl závěrečný závodní den. Čerstvý sníh, parádní kulisy a závody jednotlivců i týmů. Celkovým vítězem se stal Patrik „Big Pí“ Boháč – gratulujeme! Po tradiční soutěži na 3× střelnice jsme si střihli ještě sprint na 500 metrů (nápad roku), následovala poslední týmovka podle slepé mapy a nakonec stavba huhuláků, kde se bojovalo o výšku, kreativitu i titul nejmenšího mistrovského díla.",
        "Týden jsme zakončili vyhlášením výsledků a diskotékou. Hory, sníh, trénink i zábava – zkrátka povedené soustředění, na které se bude dlouho vzpomínat.",
        "Kompletní výsledky, ujeté kilometry a týmová soutěž je v menu Ke stažení nebo přímo [ODKAZ]",
        "Fotografie jsou komplet v menu Foto.",
        "Díky všem za příjemný týden.",
        "SKOL!"
      ]
    },
    {
      "id": "zeny-ovladly-krajske-kolo-mcr-druzstev-2026-liga-2026-01-24",
      "title": "Ženy ovládly Krajské kolo MČR družstev 2026 (liga)",
      "date": "2026-01-24",
      "author": "Jan Srb",
      "image": "assets/aktuality/2186.jpg",
      "excerpt": "Na Krajském kole Mistrovství ČR družstev se do vody vrhlo hned 6 našich týmů – tři ženské a tři mužské. A rozhodně nebylo ticho po pěšině.",
      "body": [
        "Na Krajském kole Mistrovství ČR družstev se do vody vrhlo hned 6 našich týmů – tři ženské a tři mužské. A rozhodně nebylo ticho po pěšině.",
        "Ženy A si počínaly naprosto suverénně, celé kolo ovládly a s přehledem se staly Vládkyněmi Prahy. B tým vyplaval na pěkné 5. místo a C tým, složený z trenérek (navíc v neúplném počtu – klobouk dolů!), vybojoval 8. místo.",
        "Muži měli díky loňskému finále postup do 1. ligy už v kapse, ale chuť na další titul Vládců Prahy rozhodně nechyběla. Do boje jsme poslali omlazený tým uprostřed generační výměny a i když se na startu vloudila jedna drobná chybička, nakonec z toho bylo 4. místo.",
        "B tým skončil šestý a C tým – nejmladší z našich, vlastně nejmladší úplně ze všech – statečně bral 9. místo.",
        "Po třech týdnech trénování jsme viděli spoustu zajímavých výkonů, a to i od maturantky a jejích hostů po plese.",
        "Atmosféra byla nabíjející – přesně to kouzlo, které tahle soutěž má. A třešnička na dortu? Vyhráli jsme všechny štafety, a to po opravdu strhujících představeních.",
        "Teď už se těšíme – za měsíc nás čeká první finále 1. ligy v Podolí.",
        "Díky všem za parádní závody!",
        "Výsledky najdete v menu Závody a fotky ve Foto."
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
      "place": "Praha – Zelený Pruh (bazén SPŠ, Praha 4)",
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
      "place": "Praha – Zelený Pruh (bazén SPŠ, Praha 4)",
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
      "place": "Kladno – Aquapark Kladno (Sportovců 818)",
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
      "id": "podzimni-krajsky-prebor-zactva-2012-14-2026",
      "name": "Podzimní Krajský přebor žactva 2012-14",
      "place": "dle propozic na boh.cz",
      "date": "2026-11-20",
      "deadline": "2026-11-13",
      "type": "Přebor",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "podzimni-krajsky-prebor-zactva-2015-16-2026",
      "name": "Podzimní Krajský přebor žactva 2015-16",
      "place": "dle propozic na boh.cz",
      "date": "2026-11-22",
      "deadline": "2026-11-13",
      "type": "Přebor",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "velka-cena-kralup-nad-vltavou-2026",
      "name": "Velká cena Kralup nad Vltavou",
      "place": "dle propozic na boh.cz",
      "date": "2026-11-28",
      "deadline": "2026-11-18",
      "type": "Pohár",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "zimni-pohar-cr-desetiletych-cechy-2026",
      "name": "Zimní pohár ČR desetiletých – Čechy",
      "place": "dle propozic na boh.cz",
      "date": "2026-12-05",
      "deadline": "2026-11-25",
      "type": "Pohár",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "zimni-pohar-cr-jedenactiletych-cechy-2026",
      "name": "Zimní pohár ČR jedenáctiletých – Čechy",
      "place": "dle propozic na boh.cz",
      "date": "2026-12-05",
      "deadline": "2026-11-25",
      "type": "Pohár",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "zimni-mistrovstvi-cr-ml-zactva-2014-2026",
      "name": "Zimní mistrovství ČR ml. žactva (2014)",
      "place": "dle propozic na boh.cz",
      "date": "2026-12-12",
      "deadline": "2026-12-02",
      "type": "Mistrovství",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "zimni-mistrovstvi-cr-st-zactva-2012-2026",
      "name": "Zimní mistrovství ČR st. žactva (2012)",
      "place": "dle propozic na boh.cz",
      "date": "2026-12-12",
      "deadline": "2026-12-01",
      "type": "Mistrovství",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
      "id": "zimni-mistrovstvi-cr-st-zactva-2013-2026",
      "name": "Zimní mistrovství ČR st. žactva (2013)",
      "place": "dle propozic na boh.cz",
      "date": "2026-12-12",
      "deadline": "2026-12-01",
      "type": "Mistrovství",
      "kind": "zavod",
      "note": "Termín a uzávěrka převzaty z oficiálního kalendáře boh.cz",
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
    "Infolístek na Zimní přebor Prahy a Středočeského kraje (9. 11. 2026): Kladno, Aquapark Kladno, pátek a sobota 13.–14. 11. 2026. Sraz před bazénem v pátek do 14:45. Odhlášky do středy do 14:30. Vedoucí Jan Srb (777852196).",
    "Infolístek na Podzimní Krajský přebor žactva 2017 a mladší (2. 11. 2026): Praha – Zelený Pruh (bazén SPŠ, Praha 4), sobota 7. 11. 2026, sraz před bazénem do 7:40. Vedoucí Kateřina Holubová, Nikita Kalivodová a Nikola Svobodová.",
    "Infolístek na Podzimní Krajský přebor na dlouhé tratě (2. 11. 2026): Praha – Zelený Pruh, sobota 7. 11. 2026, sraz 800 K do 9:45, 1500 K v 15:15. Vedoucí Kateřina Holubová a Klára Svobodová.",
    "Sobotní trénink v Podolí v listopadu NENÍ. Stále někde závodíme a v jedinou volnou sobotu je v Podolí zavřeno.",
    "Úterý 17. 11.: kurzy, přípravka a ODB na Vinohradech neplavou.",
    "Přípravka ukázková hodina ve čtvrtek 15. 10.: na Vinohradech od 16:30 do 18:45 ukázková hodina pro plavce přípravky. (Jan Srb, 12. 10. 2026)"
  ],

  galleries: [
    {
      "id": "gal-947-1",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86887_small.jpg",
      "caption": "Juraj Bránik"
    },
    {
      "id": "gal-947-2",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86888_small.jpg",
      "caption": "Marcela Šťastná"
    },
    {
      "id": "gal-947-3",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86889_small.jpg",
      "caption": "Marcela Šťastná"
    },
    {
      "id": "gal-947-4",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86890_small.jpg",
      "caption": "Marcela Šťastná"
    },
    {
      "id": "gal-947-5",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86891_small.jpg",
      "caption": "Marcela, Ivana, Juraj"
    },
    {
      "id": "gal-947-6",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86892_small.jpg",
      "caption": "Lešek, Jarka, Bětka, Dodo"
    },
    {
      "id": "gal-947-7",
      "title": "Zimní mezinárodní MČR masters (foto Lešek Smelik)",
      "url": "https://www.boh.cz/fotky/947/small/86893_small.jpg",
      "caption": "Olga, Škochy, Kačka"
    },
    {
      "id": "gal-946-1",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86862_small.jpg",
      "caption": "ŠimO"
    },
    {
      "id": "gal-946-2",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86863_small.jpg",
      "caption": "vyhlášení 200P - 3. Margarita Paroubková"
    },
    {
      "id": "gal-946-3",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86864_small.jpg",
      "caption": "Elen"
    },
    {
      "id": "gal-946-4",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86865_small.jpg",
      "caption": "Elen"
    },
    {
      "id": "gal-946-5",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86866_small.jpg",
      "caption": "ČerT"
    },
    {
      "id": "gal-946-6",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86867_small.jpg",
      "caption": "big Pí"
    },
    {
      "id": "gal-946-7",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86868_small.jpg",
      "caption": "Váša"
    },
    {
      "id": "gal-946-8",
      "title": "Velká cena Prahy (foto Petr Dvořák)",
      "url": "https://www.boh.cz/fotky/946/small/86869_small.jpg",
      "caption": "Kačka a Denča"
    },
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
      "id": "boh-dl-165",
      "title": "Rozřazení do skupin, rozvrh a platby 2026-27",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/165_rozdeleni_plavani_2026-27.pdf",
      "fileSize": "518 KB",
      "updatedAt": "2026-08-20",
      "fileType": "pdf",
      "important": true
    },
    {
      "id": "boh-dl-164",
      "title": "Výklad pravidel plavání (2026)",
      "category": "Závody a pravidla",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/164_pravidla_plavani_vytah_a_vysvetleni_04-26.pdf",
      "fileSize": "356 KB",
      "updatedAt": "2026-04-30",
      "fileType": "pdf",
      "important": true
    },
    {
      "id": "boh-dl-163",
      "title": "Lyžařské soustředění 2026 - výsledky jednotlivců, kilometráž a týmy",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/163_26hory-jednotlivci_kilometraz_tymy.pdf",
      "fileSize": "727 KB",
      "updatedAt": "2026-01-30",
      "fileType": "pdf",
      "important": true
    },
    {
      "id": "boh-dl-162",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2025",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/162_25statistika.pdf",
      "fileSize": "1684 KB",
      "updatedAt": "2026-01-02",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-161",
      "title": "Rozřazení do skupin, rozvrh a platby 2025-26",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/161_rozdeleni_plavani_2025-26.pdf",
      "fileSize": "384 KB",
      "updatedAt": "2025-08-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-160",
      "title": "Lyžařské soustředění 2025 - výsledky jednotlivců, kilometráž a týmy",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/160_25hory-jednotlivci_kilometraz_tymy.pdf",
      "fileSize": "537 KB",
      "updatedAt": "2025-01-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-159",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2024",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/159_24statistika.pdf",
      "fileSize": "1389 KB",
      "updatedAt": "2025-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-158",
      "title": "Rozřazení do skupin, rozvrh a platby 2024-25",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/158_rozdelen_plavani_2024-25.pdf",
      "fileSize": "362 KB",
      "updatedAt": "2024-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-157",
      "title": "Návrh na rozdělení plavců přípravky 2024-25",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/157_navrh_deleni_pripravky_2024-2025.pdf",
      "fileSize": "246 KB",
      "updatedAt": "2024-07-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-156",
      "title": "Lyžařské soustředění 2024 - výsledky jednotlivců, týmů a km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/156_hory_2024.pdf",
      "fileSize": "438 KB",
      "updatedAt": "2024-03-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-155",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2023",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/155_23statistika_boh.pdf",
      "fileSize": "1939 KB",
      "updatedAt": "2024-02-21",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-154",
      "title": "Rozřazení do skupin, rozvrh a platby 2023-24",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/154_rozdeleni_plavani_2023-24.pdf",
      "fileSize": "358 KB",
      "updatedAt": "2023-08-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-153",
      "title": "Návrh na rozdělení plavců přípravky 2023-24",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/153_pripravka_navrh_2023-24.pdf",
      "fileSize": "185 KB",
      "updatedAt": "2023-06-15",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-152",
      "title": "Výklad pravidel plavání (2023)",
      "category": "Závody a pravidla",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/152_vyklad_pravidel_plavani_2023.pdf",
      "fileSize": "365 KB",
      "updatedAt": "2023-02-21",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-151",
      "title": "Lyžařské soustředění 2023 - výsledky jednotlivců, týmů a km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/151_hory_2023.pdf",
      "fileSize": "458 KB",
      "updatedAt": "2023-01-27",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-150",
      "title": "Rozřazení do skupin, rozvrh a platby 2022-23 (aktualizováno 8. 1. 2023)",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/150_rozdeleni_plavaní_2022-23_aktual_leden23.pdf",
      "fileSize": "368 KB",
      "updatedAt": "2023-01-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-149",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2022",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/149_22statistika.pdf",
      "fileSize": "1871 KB",
      "updatedAt": "2022-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-147",
      "title": "Rozřazení do skupin, rozvrh a platby 2022-23",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/147_rozdeleni_plavaní_2022-23.pdf",
      "fileSize": "377 KB",
      "updatedAt": "2022-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-146",
      "title": "Tréninkové ukazatele plavců Bohemians sezóna 8/21-7/22",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/146_treninkova_ukazatele_8-2021-7-2022.pdf",
      "fileSize": "217 KB",
      "updatedAt": "2022-08-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-145",
      "title": "Lyžařské soustředění 2022 - výsledky jednotlivců a týmů",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/145_hory_2022.pdf",
      "fileSize": "178 KB",
      "updatedAt": "2022-01-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-144",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2021",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/144_21statistika.pdf",
      "fileSize": "2621 KB",
      "updatedAt": "2021-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-143",
      "title": "Rozřazení do skupin, rozvrh a platby 2021-22",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/143_rozdeleni_plavaní_2021-22.pdf",
      "fileSize": "429 KB",
      "updatedAt": "2021-08-23",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-142",
      "title": "Čestné prohlášení nutné ke vstupu na bazén (vytištěné a podepsané u sebe)",
      "category": "Zdraví a formuláře",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/142_cestne_prohlaseni_bazen_210608.pdf",
      "fileSize": "136 KB",
      "updatedAt": "2021-06-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-141",
      "title": "Krmítko na DP - 2x velký kelímek (model pro 3D tiskárny od Václava Eybla)",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/141_krmitko_dp-vaclaveybl-logo_bohemians.stl",
      "fileSize": "1954 KB",
      "updatedAt": "2021-04-17",
      "fileType": "stl"
    },
    {
      "id": "boh-dl-140",
      "title": "Krmítko na DP - malý+velký kelímek (model pro 3D tiskárny od Václava Eybla)",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/140_krmitko_malyvelky_dp-vaclaveybl-logo_bohemians.stl",
      "fileSize": "1635 KB",
      "updatedAt": "2021-04-17",
      "fileType": "stl"
    },
    {
      "id": "boh-dl-139",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2020",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/139_20statistika.pdf",
      "fileSize": "1031 KB",
      "updatedAt": "2021-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-138",
      "title": "Rozvrh tréninků v prosinci 2020",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/138_rozvrh_prosinec_2020.pdf",
      "fileSize": "174 KB",
      "updatedAt": "2020-12-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-formular_zdravotni_prohlidka-p",
      "title": "Formulář zdravotní způsobilosti (povinně platný od 1. 9. 2016 pro děti do 10 let, starší plavci by měli absolvovat prohlídku u sportovního lékaře)",
      "category": "Zdraví a formuláře",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/formular_zdravotni_prohlidka.pdf",
      "fileSize": "304 KB",
      "updatedAt": "2020-10-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-135",
      "title": "Rozřazení do skupin, rozvrh a platby 2020-21",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/135_rozdělení_plavání_2020-21.pdf",
      "fileSize": "475 KB",
      "updatedAt": "2020-08-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-133",
      "title": "Vyhodnocení hlášení pohybové aktivity v době Covid 2020",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/133_nahlasena_aktivita_v_covid_dobe_2020.pdf",
      "fileSize": "113 KB",
      "updatedAt": "2020-06-22",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-132",
      "title": "Docházka září 2019 - únor 2020 - ST, ODA, Gy, Přípravka 2.h.",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/132_dochazka_2019-20.pdf",
      "fileSize": "424 KB",
      "updatedAt": "2020-03-09",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-130",
      "title": "Termínová listina jaro - léto 2020",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/130_tl_jaro-leto_2020-1v_trenerska.pdf",
      "fileSize": "235 KB",
      "updatedAt": "2020-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-129",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2019",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/129_19statistika.pdf",
      "fileSize": "827 KB",
      "updatedAt": "2020-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-127",
      "title": "Časy posledních přijatých na Mistrovství ČR a Pohár ČR v zimě 2019",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/127_19z-posledni_prijati_mcr_a_pcr.pdf",
      "fileSize": "2195 KB",
      "updatedAt": "2019-12-06",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-123",
      "title": "Rozřazení do skupin, rozvrh a platby 2019-20",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/123_plavani_2019-20.pdf",
      "fileSize": "279 KB",
      "updatedAt": "2019-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-122",
      "title": "Etický kodex plavců Bohemians",
      "category": "Řády a metodika",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/122_eticky_kodex_plavcu_Boh_v2019.pdf",
      "fileSize": "96 KB",
      "updatedAt": "2019-08-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-121",
      "title": "Termínová listina Boh na podzim - zima 2019",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/121_tl_podzim-zima_2019.pdf",
      "fileSize": "200 KB",
      "updatedAt": "2019-08-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-120",
      "title": "Docházka červen 2019...září 2018 - ODA, ST, starší přípravka",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/120_dochazka_2018-9.pdf",
      "fileSize": "624 KB",
      "updatedAt": "2019-07-17",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-119",
      "title": "Rozdělení přípravky 2019-20 (verze platná k út 25.6.)",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/119_pripravka_9_2019.pdf",
      "fileSize": "676 KB",
      "updatedAt": "2019-06-27",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-118",
      "title": "Postupující 2006 z přípravky do skupiny ST (M. Břendy)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/118_soutez_2006_presuny.pdf",
      "fileSize": "174 KB",
      "updatedAt": "2019-06-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-114",
      "title": "Lyžařské soustředění 2019 - výsledky jednotlivců a týmů",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/114_19hory-souteze.pdf",
      "fileSize": "326 KB",
      "updatedAt": "2019-03-22",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-111",
      "title": "Termínová listina jaro - léto 2019 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/111_tl_jl_2019-pripravka.pdf",
      "fileSize": "244 KB",
      "updatedAt": "2019-01-26",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-110",
      "title": "Termínová listina jaro - léto 2019",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/110_tl_jl_2019.pdf",
      "fileSize": "226 KB",
      "updatedAt": "2019-01-14",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-109",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2018",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/109_18statistika.pdf",
      "fileSize": "1222 KB",
      "updatedAt": "2019-01-02",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-106",
      "title": "Seznam účastníků lyžařského soustředění 2019",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/106_vyber_hory_2019.pdf",
      "fileSize": "143 KB",
      "updatedAt": "2018-11-27",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-105",
      "title": "Výživa mladého plavce (Interní metodický materiál) - autor Kristýna Skuhrová",
      "category": "Řády a metodika",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/105_imm1-vyziva‑kr_skuhrova.pdf",
      "fileSize": "164 KB",
      "updatedAt": "2018-11-26",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-102",
      "title": "Rozdělení tréninkových skupin od září 2018 (v2)",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/102_skupiny_od_zari_2018_v2.pdf",
      "fileSize": "248 KB",
      "updatedAt": "2018-09-11",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-101",
      "title": "Termínová listina podzim - zima 2018 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/101_tl_pz_2018-pripravka.pdf",
      "fileSize": "166 KB",
      "updatedAt": "2018-09-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-99",
      "title": "Termínová listina podzim - zima 2018",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/99_tl_pz_2018.pdf",
      "fileSize": "190 KB",
      "updatedAt": "2018-08-09",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-98",
      "title": "Docházka září 2017 - červen 2018 - ODA, ST, starší přípravka",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/98_dochazka_2017-8.pdf",
      "fileSize": "818 KB",
      "updatedAt": "2018-07-25",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-96",
      "title": "Postupující 2005 z přípravky do skupiny ST (M. Břendy)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/96_postupujici2005_od-zari-2018.pdf",
      "fileSize": "182 KB",
      "updatedAt": "2018-06-13",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-93",
      "title": "Informace o zpracování osobních údajů a souhlas se zpracováním osobních údajů (dle GDPR) verze květen 2018",
      "category": "Řády a metodika",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/93_souhlas_gdpr_v180525.pdf",
      "fileSize": "143 KB",
      "updatedAt": "2018-05-25",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-92",
      "title": "Výsledky běhu na lyžích - soustředění 2018",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/92_hory2018-vysledky_beh.pdf",
      "fileSize": "194 KB",
      "updatedAt": "2018-03-23",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2018-pripravka-pdf",
      "title": "Termínová listina jaro - léto 2018 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2018-pripravka.pdf",
      "fileSize": "150 KB",
      "updatedAt": "2018-01-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2018-pdf",
      "title": "Termínová listina jaro - léto 2018",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2018.pdf",
      "fileSize": "427 KB",
      "updatedAt": "2018-01-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-17statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2017",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/17statistika.pdf",
      "fileSize": "889 KB",
      "updatedAt": "2018-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-17zmcr-kvalifikacni_casy-pdf",
      "title": "Přehled posledních přijatých na Zimní Mistrovství ČR 2017",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/17zmcr-kvalifikacni_casy.pdf",
      "fileSize": "4003 KB",
      "updatedAt": "2017-12-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2017-pdf",
      "title": "Termínová listina podzim - zima 2017",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2017.pdf",
      "fileSize": "383 KB",
      "updatedAt": "2017-09-12",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2017-pripravka-pdf",
      "title": "Termínová listina podzim - zima 2017 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2017-pripravka.pdf",
      "fileSize": "446 KB",
      "updatedAt": "2017-09-12",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-rozvrh_skupin_2017-8-pdf",
      "title": "NOVĚ Rozvrh skupin a rozdělení přípravky, ST a ODA od září 2017",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/rozvrh_skupin_2017-8.pdf",
      "fileSize": "645 KB",
      "updatedAt": "2017-09-11",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-dochazka_2016-7-pdf",
      "title": "Docházka září 2016 - červen 2017 - ODA, ST, starší přípravka",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/dochazka_2016-7.pdf",
      "fileSize": "803 KB",
      "updatedAt": "2017-07-26",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-prezentace_schuzka_plavani_pri",
      "title": "Materiál ze schůzky trenérů a rodičů plavců přípravky (05-2017)",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/prezentace_schuzka_plavani_pripravka_05-2017.pdf",
      "fileSize": "640 KB",
      "updatedAt": "2017-05-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-hory2017-pdf",
      "title": "Lyžařské soustředění 2017 - výsledky závodu a naběhané kilometry",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/hory2017.pdf",
      "fileSize": "372 KB",
      "updatedAt": "2017-02-24",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2017-pripravka-pdf",
      "title": "Termínová listina jaro - léto 2017 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2017-pripravka.pdf",
      "fileSize": "381 KB",
      "updatedAt": "2017-01-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2017-pdf",
      "title": "Termínová listina jaro - léto 2017",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2017.pdf",
      "fileSize": "418 KB",
      "updatedAt": "2017-01-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-16statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2016",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/16statistika.pdf",
      "fileSize": "725 KB",
      "updatedAt": "2016-12-30",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-galavecer_70let_oddilu-pametni",
      "title": "Pamětní brožura na Galavečer plavců Bohemians k výročí 70 let oddílu",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/galavecer_70let_oddilu-pametni_brozura.pdf",
      "fileSize": "2728 KB",
      "updatedAt": "2016-12-22",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2016-pdf",
      "title": "Termínová listina podzim - zima 2016",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2016.pdf",
      "fileSize": "375 KB",
      "updatedAt": "2016-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2016-pripravka-pdf",
      "title": "Termínová listina podzim - zima 2016 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2016-pripravka.pdf",
      "fileSize": "359 KB",
      "updatedAt": "2016-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-rozvrh_treninku_2016-7-pdf",
      "title": "Rozvrh tréninků 2016-7",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/rozvrh_treninku_2016-7.pdf",
      "fileSize": "355 KB",
      "updatedAt": "2016-08-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-15-16_ODA_ST-dochazka-pdf",
      "title": "Docházka ST a ODA 2015-16",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/15-16_ODA_ST-dochazka.pdf",
      "fileSize": "702 KB",
      "updatedAt": "2016-07-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-cenik_zavodnich_plavek-pro_Boh",
      "title": "Ceník závodních plavek u Marshal sportu pro plavce Bohemians (platný od 24. 5. 2016)",
      "category": "Závody a pravidla",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/cenik_zavodnich_plavek-pro_Boh-160524.pdf",
      "fileSize": "43 KB",
      "updatedAt": "2016-05-24",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-15-16_ODA-testy-pdf",
      "title": "Výsledky testování ODA 2015-16",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/15-16_ODA-testy.pdf",
      "fileSize": "384 KB",
      "updatedAt": "2016-05-07",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-16hory-vysl-bezky8km_a_kilomet",
      "title": "Výsledky běžeckých závodů a odjetá kilometráž Lyžařské soustředění 2016",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/16hory-vysl-bezky8km_a_kilometraz.pdf",
      "fileSize": "211 KB",
      "updatedAt": "2016-02-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2016-pripravka-pdf",
      "title": "Termínová listina jaro - léto 2016 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2016-pripravka.pdf",
      "fileSize": "357 KB",
      "updatedAt": "2016-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2016-pdf",
      "title": "Termínová listina jaro - léto 2016",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2016.pdf",
      "fileSize": "471 KB",
      "updatedAt": "2016-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-15statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2015",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/15statistika.pdf",
      "fileSize": "473 KB",
      "updatedAt": "2015-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-Boh_plavani_katalog_obleceni-p",
      "title": "Nabídka společného oblečení",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/Boh_plavani_katalog_obleceni.pdf",
      "fileSize": "847 KB",
      "updatedAt": "2015-11-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-2014-15_oda-dochazka-pdf",
      "title": "Docházka ODA 2014-15",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/2014-15_oda-dochazka.pdf",
      "fileSize": "1602 KB",
      "updatedAt": "2015-07-04",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-14-15_ODA-testy-pdf",
      "title": "Výsledky testování ODA 2014-15",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/14-15_ODA-testy.pdf",
      "fileSize": "470 KB",
      "updatedAt": "2015-06-15",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-15hory-vysl_beh-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2015 na 8km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/15hory-vysl_beh.pdf",
      "fileSize": "199 KB",
      "updatedAt": "2015-04-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2015-pripravka-pdf",
      "title": "Termínová listina jaro - léto 2015 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2015-pripravka.pdf",
      "fileSize": "357 KB",
      "updatedAt": "2015-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2015-pdf",
      "title": "Termínová listina jaro - léto 2015",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2015.pdf",
      "fileSize": "411 KB",
      "updatedAt": "2015-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-14statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2014",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/14statistika.pdf",
      "fileSize": "896 KB",
      "updatedAt": "2015-01-02",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2014-pripravka-pdf",
      "title": "Termínová listina podzim - zima 2014 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2014-pripravka.pdf",
      "fileSize": "225 KB",
      "updatedAt": "2014-09-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_pz_2014-pdf",
      "title": "Termínová listina podzim - zima 2014",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_pz_2014.pdf",
      "fileSize": "306 KB",
      "updatedAt": "2014-09-03",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-14-15_rozvrh_treninku-pdf",
      "title": "Rozvrh tréninků 2014-15",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/14-15_rozvrh_treninku.pdf",
      "fileSize": "375 KB",
      "updatedAt": "2014-08-30",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-2013-14_oda-dochazka-pdf",
      "title": "Docházka ODA 2013-14",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/2013-14_oda-dochazka.pdf",
      "fileSize": "609 KB",
      "updatedAt": "2014-06-30",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-13-14_ODA-testy-pdf",
      "title": "Výsledky testování ODA 2013-14",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/13-14_ODA-testy.pdf",
      "fileSize": "342 KB",
      "updatedAt": "2014-06-15",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-14hory-vysl_beh-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2014 na 8km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/14hory-vysl_beh.pdf",
      "fileSize": "98 KB",
      "updatedAt": "2014-03-14",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2014-pripravka-pdf",
      "title": "Termínová listina jaro - léto 2014 (přípravka)",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2014-pripravka.pdf",
      "fileSize": "173 KB",
      "updatedAt": "2014-01-07",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl_jl_2014-pdf",
      "title": "Termínová listina jaro - léto 2014",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl_jl_2014.pdf",
      "fileSize": "377 KB",
      "updatedAt": "2014-01-07",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-13statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2013",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/13statistika.pdf",
      "fileSize": "646 KB",
      "updatedAt": "2013-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-2012-13_oda-dochazka-pdf",
      "title": "Docházka ODA 2012-13",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/2012-13_oda-dochazka.pdf",
      "fileSize": "310 KB",
      "updatedAt": "2013-06-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-2012-13_oda-testy-pdf",
      "title": "Výsledky testování ODA 2012-13",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/2012-13_oda-testy.pdf",
      "fileSize": "167 KB",
      "updatedAt": "2013-06-21",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-mereni_hory_misecky_2013-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2013 na 6km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/mereni_hory_misecky_2013.pdf",
      "fileSize": "98 KB",
      "updatedAt": "2013-03-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2013jl-pripravka-pdf",
      "title": "Termínová listina jaro-léto 2012 pro přípravku",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2013jl-pripravka.pdf",
      "fileSize": "162 KB",
      "updatedAt": "2012-12-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2013jl-pdf",
      "title": "Termínová listina jaro-léto 2013",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2013jl.pdf",
      "fileSize": "236 KB",
      "updatedAt": "2012-12-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-12statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2012",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/12statistika.pdf",
      "fileSize": "812 KB",
      "updatedAt": "2012-12-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-terminovka_rozvrh_podzimzima20",
      "title": "Termínová listina a rozpis tréninků podzim-zima 2012",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/terminovka_rozvrh_podzimzima2012.pdf",
      "fileSize": "230 KB",
      "updatedAt": "2012-08-30",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-mereni_hory_misecky_2012-pdf-p",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2012 na 6km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/mereni_hory_misecky_2012.pdf.pdf",
      "fileSize": "93 KB",
      "updatedAt": "2012-03-23",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-procenta_jake_casy-pdf",
      "title": "Pomůcka pro OĎáky - časy a procenta",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/procenta_jake_casy.pdf",
      "fileSize": "13 KB",
      "updatedAt": "2012-01-24",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2012jl-pripravka-pdf",
      "title": "Termínová listina jaro-léto 2012 pro přípravku",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2012jl-pripravka.pdf",
      "fileSize": "167 KB",
      "updatedAt": "2012-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2012jl-pdf",
      "title": "Termínová listina jaro-léto 2012",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2012jl.pdf",
      "fileSize": "233 KB",
      "updatedAt": "2011-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-11statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2011",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/11statistika.pdf",
      "fileSize": "359 KB",
      "updatedAt": "2011-12-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-11cpdp-aktuality-pdf",
      "title": "Souhrn aktualit o Českém poháru v dálkovém plavání za rok 2011",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/11cpdp-aktuality.pdf",
      "fileSize": "269 KB",
      "updatedAt": "2011-09-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-terminovalistina_podzim-zima_2",
      "title": "Termínová listina a rozpis tréninků ST podzim-zima 2011",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/terminovalistina_podzim-zima_2011.pdf",
      "fileSize": "311 KB",
      "updatedAt": "2011-08-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-mereni_hory_misecky_2011-pdf",
      "title": "Výsledky měření na horách 2011",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/mereni_hory_misecky_2011.pdf",
      "fileSize": "96 KB",
      "updatedAt": "2011-02-28",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-10statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2010",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/10statistika.pdf",
      "fileSize": "953 KB",
      "updatedAt": "2011-01-02",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-10cpdp-aktuality-pdf",
      "title": "Souhrn aktualit o Českém poháru v dálkovém plavání za rok 2010",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/10cpdp-aktuality.pdf",
      "fileSize": "274 KB",
      "updatedAt": "2010-12-09",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2011jl-pdf",
      "title": "Termínová listina jaro-léto 2011",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2011jl.pdf",
      "fileSize": "232 KB",
      "updatedAt": "2010-12-08",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-10zmrd-limity-pdf",
      "title": "Kvalifikační limity na Zimní MČR dorostu 2010",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/10zmrd-limity.pdf",
      "fileSize": "90 KB",
      "updatedAt": "2010-09-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-terminovalistina_podzim-zima_2",
      "title": "Termínová listina a rozpis tréninků ST podzim-zima 2010",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/terminovalistina_podzim-zima_2010.pdf",
      "fileSize": "314 KB",
      "updatedAt": "2010-08-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-10limity-mcr_mcrd-pdf",
      "title": "Kvalifikační limity na Letní MČR dospělých a dorostu 2010",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/10limity-mcr_mcrd.pdf",
      "fileSize": "154 KB",
      "updatedAt": "2010-03-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-10hory-vysledky-bezky-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2010 na 6km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/10hory-vysledky-bezky.pdf",
      "fileSize": "105 KB",
      "updatedAt": "2010-02-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09statistika-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2009",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09statistika.pdf",
      "fileSize": "413 KB",
      "updatedAt": "2010-01-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09zmcrz-posledniprijati-pdf",
      "title": "Časy posledních přijatých na Zimní Mistrovství ČR žactva 2009",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09zmcrz-posledniprijati.pdf",
      "fileSize": "89 KB",
      "updatedAt": "2009-12-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2010jl-pdf",
      "title": "Termínová listina jaro-léto 2010",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2010jl.pdf",
      "fileSize": "663 KB",
      "updatedAt": "2009-12-10",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-07cpdp-aktuality-pdf",
      "title": "Souhrn aktualit o Českém poháru v dálkovém plavání za rok 2007",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/07cpdp-aktuality.pdf",
      "fileSize": "169 KB",
      "updatedAt": "2009-11-16",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-08cpdp-aktuality-pdf",
      "title": "Souhrn aktualit o Českém poháru v dálkovém plavání za rok 2008",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/08cpdp-aktuality.pdf",
      "fileSize": "232 KB",
      "updatedAt": "2009-11-16",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09cpdp-aktuality-pdf",
      "title": "Souhrn aktualit o Českém poháru v dálkovém plavání za rok 2009",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09cpdp-aktuality.pdf",
      "fileSize": "282 KB",
      "updatedAt": "2009-11-16",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09cpdp-nastenka-pdf",
      "title": "Výběr ze statistiky vítězné sezony ČP DP 2009 - verze nástěnka",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09cpdp-nastenka.pdf",
      "fileSize": "255 KB",
      "updatedAt": "2009-11-15",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09statistika-cpdp-pdf",
      "title": "Statistika vítězné sezony ČP DP 2009 (zpracoval Petr Tomášek)",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09statistika-cpdp.pdf",
      "fileSize": "162 KB",
      "updatedAt": "2009-11-15",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-091218-limity-zmcrd-pdf",
      "title": "Kvalifikační limity na Zimní (prosincové 2009) MČR dorostu",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/091218-limity-zmcrd.pdf",
      "fileSize": "37 KB",
      "updatedAt": "2009-10-19",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09souprava-tjbohemians-pdf",
      "title": "Objednávkový formulář na novou oddílovou soupravu",
      "category": "Zdraví a formuláře",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09souprava-tjbohemians.pdf",
      "fileSize": "77 KB",
      "updatedAt": "2009-10-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-terminovalistina_podzim-zima_2",
      "title": "Termínová listina a rozpis tréninků ST podzim-zima 2009",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/terminovalistina_podzim-zima_2009.pdf",
      "fileSize": "317 KB",
      "updatedAt": "2009-08-31",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09limity-mcr_mcrd-pdf",
      "title": "Kvalifikační limity na Letní MČR dospělých a dorostu 2009",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09limity-mcr_mcrd.pdf",
      "fileSize": "100 KB",
      "updatedAt": "2009-03-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-09hory-vysledky-bezky-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2009 na 6km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/09hory-vysledky-bezky.pdf",
      "fileSize": "55 KB",
      "updatedAt": "2009-03-13",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2009jl-pdf",
      "title": "Termínovka jaro-léto 2009",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2009jl.pdf",
      "fileSize": "193 KB",
      "updatedAt": "2009-01-04",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tabulky2008_internet-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2008",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tabulky2008_internet.pdf",
      "fileSize": "894 KB",
      "updatedAt": "2009-01-04",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-08cpdp_statistika-finalverze-p",
      "title": "Statistika vítězné sezony ČP DP 2008 (zpracoval Petr Hubal)",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/08cpdp_statistika-finalverze.pdf",
      "fileSize": "625 KB",
      "updatedAt": "2008-11-16",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-08zima-kvalifikace-zmcr-pdf",
      "title": "Kvalifikační limity na Zimní MČR dospělých a dorostu 2009",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/08zima-kvalifikace-zmcr.pdf",
      "fileSize": "123 KB",
      "updatedAt": "2008-10-29",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-terminovalistina_podzim-zima_2",
      "title": "Termínová listina a rozpis tréninků podzim-zima 2008",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/terminovalistina_podzim-zima_2008.pdf",
      "fileSize": "209 KB",
      "updatedAt": "2008-09-01",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-08hory-pdf",
      "title": "Výsledky běžeckých závodů Lyžařské soustředění 2008 na 6km",
      "category": "Soustředění a akce",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/08hory.pdf",
      "fileSize": "56 KB",
      "updatedAt": "2008-03-07",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-rozcvicka-mala-pdf",
      "title": "Vzorová každodenní rozcvička",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/rozcvicka-mala.pdf",
      "fileSize": "499 KB",
      "updatedAt": "2008-01-16",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-Tabulky2007_internet-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2007",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/Tabulky2007_internet.pdf",
      "fileSize": "746 KB",
      "updatedAt": "2008-01-05",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-tl-2008-jl-pdf",
      "title": "Termínovka jaro-léto 2008",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/tl-2008-jl.pdf",
      "fileSize": "170 KB",
      "updatedAt": "2007-12-30",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-07cpdpstatistika-pdf",
      "title": "Seznam plavců Bohemians, kteří se přičinili k vítězství v Českém poháru 2007 v dálkovém plavání",
      "category": "Rozvrhy a dráhy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/07cpdpstatistika.pdf",
      "fileSize": "80 KB",
      "updatedAt": "2007-11-09",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-07-08_treninkyaterminovka-st-p",
      "title": "Rozvrh tréninků 2007-8 a termínová listina závodů podzim-zima 2007 pro žáky ST",
      "category": "Termínovky a docházka",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/07-08_treninkyaterminovka-st.pdf",
      "fileSize": "203 KB",
      "updatedAt": "2007-09-03",
      "fileType": "pdf"
    },
    {
      "id": "boh-dl-06tabulky-pdf",
      "title": "Oddílové tabulky, rekordy a TOP 10 výkonů celé historie oddílu k 31. 12. 2006",
      "category": "Statistiky a rekordy",
      "description": "Oficiální dokument z webu boh.cz",
      "fileName": "https://www.boh.cz/download/06tabulky.pdf",
      "fileSize": "1208 KB",
      "updatedAt": "2007-07-09",
      "fileType": "pdf"
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

