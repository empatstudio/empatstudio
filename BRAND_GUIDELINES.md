# empat.studio vizualinio identiteto taisyklės

Šis failas yra autoritetinga empat.studio web dizaino santrauka, parengta pagal 2025-07-17 brandbooką ir pateiktus originalius SVG/JPG failus. Jei tarp eksportuotų failų ir brandbooko yra skirtumas, pirmenybė teikiama brandbookui. Žemiau pažymėta, kur taisyklė yra tiesiogiai nurodyta šaltinyje, o kur ji pritaikyta web naudojimui.

## 1. Prekės ženklo charakteris

- Pozicionavimas / šūkis: **„Geriausias tavo svetainės draugas“**.
- Komunikacijos kryptis: šilta, empatiška, draugiška, švelni ir žaisminga, bet profesionali.
- Pagrindinė vizualinė nuotaika: tamsi organiška fotografija, minkštos žalios ir smėlio šviesos, ryškus grūdėtumas, baltas tekstas, apvalios formos.
- Vengti sterilaus „tech“ įvaizdžio, aštrių kampų, agresyvių neoninių spalvų ir pernelyg korporatyvaus tono.

## 2. Spalvos

### Oficialios brandbooko spalvos

| Tokenas | HEX | RGB | CMYK | Paskirtis |
|---|---:|---:|---:|---|
| `--color-forest` | `#434F3F` | 67, 79, 63 | 69, 47, 67, 48 | Pagrindinė žalia; fonai, tekstas šviesiame fone, dideli plotai |
| `--color-sand` | `#ECCFB6` | 236, 207, 182 | 8, 21, 30, 0 | Šiltas akcentas; kortelės, formos, subtilūs fonai |

### Neutralios spalvos iš originalių SVG

| Tokenas | HEX | Paskirtis |
|---|---:|---|
| `--color-ink` | `#1D1D1B` | Tamsus logotipas ir tekstas ant šviesių fonų |
| `--color-white` | `#FFFFFF` | Logotipas ir tekstas ant tamsių / fotografinių fonų |

### Web naudojimo taisyklės

- Pagrindinė paletė turi likti ribota: `forest`, `sand`, `ink`, `white`.
- Brandbooke parodyti šviesesni žalios ir smėlio tonai yra tos pačios spalvos tono variacijos; web'e juos kurti maišant bazinę spalvą su balta, o ne įvedant naują akcentinę spalvą.
- Dekoratyviniuose `sypsenele logo-08.svg` ir `sypsenele logo-09.svg` yra `#435040`. Tai artimas eksporto neatitikimas; web'e normalizuoti į oficialų `#434F3F`.
- Ant fotografinių fonų naudoti baltą tekstą ir tikrinti realų kontrastą. Kai fonas per šviesus, pridėti subtilų tamsų sluoksnį, o ne šešėlį aplink kiekvieną raidę.

Siūlomi CSS tokenai:

```css
:root {
  --color-forest: #434f3f;
  --color-sand: #eccfb6;
  --color-ink: #1d1d1b;
  --color-white: #ffffff;
}
```

## 3. Tipografija

### Oficialiai nurodyta

- Poppins: antraštėms ir pagrindiniam tekstui. Brandbooko pavyzdys: heading 32, main text 12.
- Century Gothic Bold: didelėms akcentinėms antraštėms. Brandbooko pavyzdys: 80.
- Century Gothic Regular: pagrindiniam ir papildomam tekstui. Brandbooko pavyzdys: 26.
- Logotipo žodis „empat“ originaliuose SVG yra `Candara Bold`, 700 svorio, su `0.01em` raidžių tarpu. Tai logotipo konstrukcijos dalis, ne bendras svetainės teksto šriftas.

### Web hierarchija

- Pirminė svetainės šeima: `Poppins`, `Arial`, sans-serif.
- `Century Gothic` naudoti tik kaip display / kampanijinį akcentą, jei turima teisė web'e pateikti šrifto failus. Saugus pakaitalas: `Poppins`.
- Logotipo teksto naršyklėje neperrašinėti šriftu: naudoti oficialų SVG, kad ženklas nesikeistų skirtinguose įrenginiuose.
- Antraštės: 600–700 svoris; tekstas: 400; etiketės ir CTA: 600–700.
- Rekomenduojamas web mastelis: hero `clamp(3rem, 7vw, 6rem)`, H2 `clamp(2rem, 4vw, 4rem)`, H3 `clamp(1.25rem, 2vw, 2rem)`, body `clamp(1rem, 1.2vw, 1.125rem)`.
- Kūno teksto eilutės ilgis iki maždaug 65 simbolių, `line-height` 1.5–1.7.

## 4. Logotipo sistema

Yra trys oficialūs ženklinimo lygiai:

1. **Pilnas logotipas su šūkiu** – naudoti dideliame formate, kai smulkus šūkio tekstas išlieka aiškiai įskaitomas.
2. **Logotipas be šūkio** – naudoti mažesniuose formatuose: svetainės navigacijoje, vizitinėse, profilio vaizde ar ten, kur ženklas nėra pagrindinis dėmesio centras.
3. **Šypsenėlė** – naudoti dokumentuose, socialiniuose įrašuose, favicon / ženkliuko situacijose ir kaip subtilią turinio žymą, nenukreipiant dėmesio nuo pagrindinės žinutės.

Logotipas turi šviesią ir tamsią versijas:

- Baltą versiją naudoti ant tamsiai žalio, juodo ar pakankamai tamsaus fotografijos ploto.
- Tamsią `#1D1D1B` versiją naudoti ant balto, smėlio ar kito šviesaus fono.
- Logotipo neperpiešti, neištempti, nekeisti proporcijų, nekeisti vidinių spalvų, nepridėti šešėlių ir nenaudoti kaip paprasto redaguojamo teksto.
- Aplink ženklą palikti vizualiai ramų apsauginį lauką. Brandbookas tikslaus skaitinio dydžio nenurodo; web'e kaip minimalią darbinę taisyklę naudoti bent šypsenėlės vidinio žiedo storio lauką iš visų pusių.
- Pilno logotipo su šūkiu nenaudoti, jei šūkio tekstas tampa neįskaitomas; tokiu atveju pereiti prie logotipo be šūkio.

## 5. Formos ir komponentai

- Pagrindinis motyvas: keturlapė organiška forma su apvalia anga, susijungiantys apvalūs „molekuliniai“ segmentai ir atskiri apskritimai.
- Šias formas naudoti ten, kur trūksta vizualo, arba lengvam žaismingumui suteikti. Jos neturi konkuruoti su pagrindine žinute.
- Formos gali būti baltos, smėlio, miško žalios arba užpildytos brandine tekstūra / fotografija.
- Teksto burbulams brandbooke nurodytas **37% kampų apvalinimas**. CSS neturi procentiškai atkartoti netinkamai skirtingų proporcijų kortelėse; vizualiai siekti kapsulės / itin minkšto stačiakampio formos (`border-radius` apie 24–40 px, o trumpoms etiketėms `999px`).
- Dideli blokai ir rėmai gali naudoti „arkos / kapsulės“ geometriją su labai apvaliais galais ir plonu baltu kontūru.
- Sąrašų žymekliams tinka mažoji šypsenėlė apskritime, kaip parodyta baneryje.

## 6. Fotografija ir tekstūra

- Naudoti abstrakčią, organišką, minkštai išfokusuotą fotografiją su žalios, smėlio, pilkos ir juodos spalvų šviesos dėmėmis.
- Ryškus analoginis grūdas yra identiteto dalis. Jis turi būti matomas, bet nesumažinti teksto įskaitomumo.
- Nuotraukos labiau veikia kaip atmosferinis fonas nei kaip pažodinis paslaugos vaizdas.
- Ant vieno ekrano vengti per daug konkuruojančių tekstūrų; turėti aiškų ramų plotą tekstui.

## 7. Kompozicija ir web elgsena

- Derinti plačius tamsius atmosferinius blokus su švariais baltais ar smėlio tarpais.
- Kompozicija gali būti asimetriška: dekoratyvios formos vienoje pusėje, aiški žinutė ir CTA kitoje.
- Turinį laikyti aiškiai hierarchišką ir erdvų; didelės antraštės, trumpos pastraipos, ryškūs kapsulės formos CTA.
- Animacijos turi būti švelnios ir organiškos: lėtas formų slinkimas, lengvas mastelio ar grūdo judėjimas. Vengti staigių „tech“ perėjimų.
- Gerbti `prefers-reduced-motion`; dekoratyvinis triukšmas negali trukdyti našumui ar prieinamumui.

## 8. Balso tonas

- Kreiptis „tu“, paprastai ir žmogiškai.
- Kalbėti kaip rūpestingas partneris: aiškiai, ramiai, be tuščio agentūrinio žargono.
- Pabrėžti supratimą, bendradarbiavimą ir verslo rezultatą.
- Trumpos, draugiškos formuluotės dera geriau nei pompastiški pažadai.
- Pavyzdinė kryptis: „Šilta, empatiška komanda, kuriai nuoširdžiai rūpi tavo verslo sėkmė.“

## 9. Prieinamumas ir kokybės kontrolė

- Kiekvienam tekstui patikrinti WCAG kontrastą pagal faktinį foną; vien brandinės spalvos pasirinkimas kontrasto negarantuoja.
- Teksto ant tekstūros nedėti į chaotiškiausią ar šviesiausią vaizdo vietą.
- Visos interaktyvios būsenos turi būti matomos ne vien spalva.
- SVG su tekstu gali priklausyti nuo lokaliai įdiegto `Candara`; produkcijai rinktis patikrintą eksportą su kreivėmis arba pateiktą rastrinę versiją, jei naršyklė atvaizduoja kitaip.
- `sypsenele logo-08.svg` ir `sypsenele logo-09.svg` turi nuorodą į išorinį failą `../../praktika/green.jpg`; tokie SVG nėra savarankiški. Prieš naudojimą web'e įterpti vaizdą į SVG arba naudoti pateiktas PNG versijas.

## 10. Šaltinių prioritetas

1. `Empat. studio. brandbook.pdf` – spalvų, tipografijos, logotipo naudojimo ir bendros krypties autoritetas.
2. Originalūs SVG – tiksli logotipo ir dekoratyvių formų geometrija bei šviesios / tamsios versijos.
3. Vizitinės ir baneris – praktiniai kompozicijos, tekstūros, tono ir elementų derinimo pavyzdžiai.
4. Šio failo „Web“ rekomendacijos – adaptacija, kai brandbookas nepateikia tikslaus skaitinio sprendimo.
