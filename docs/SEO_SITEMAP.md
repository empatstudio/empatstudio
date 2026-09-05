# empat.studio SEO-first sitemap

## Pagrindinė navigacija

```text
Pradžia
├── Paslaugos
│   ├── Svetainių kūrimas
│   ├── Web dizainas
│   ├── El. parduotuvių kūrimas [kai paslauga patvirtinta]
│   ├── SEO paslaugos [kai paslauga patvirtinta]
│   ├── Brandingo kūrimas
│   ├── Svetainių atnaujinimas
│   └── Svetainių priežiūra [kai paslauga patvirtinta]
├── Darbai
│   └── Atvejo studija: /darbai/{projektas}/
├── Apie mus
├── Žinios
│   └── Straipsnis: /zinios/{tema}/
└── Kontaktai
```

Navigacijoje rodyti 5–6 svarbiausias nuorodas, o ne visą medį. Likusias paslaugas pateikti „Paslaugos“ išskleidžiamame meniu ir footer'yje.

## URL ir puslapių žemėlapis

| Prioritetas | URL | Pagrindinė paskirtis / raktažodis | Index |
|---:|---|---|---|
| P0 | `/` | empat.studio / web dizaino ir svetainių kūrimo studija | taip |
| P0 | `/svetainiu-kurimas/` | svetainių kūrimas | taip |
| P0 | `/web-dizainas/` | web dizainas / svetainių dizainas | taip |
| P0 | `/darbai/` | svetainių kūrimo darbai / portfolio | taip |
| P0 | `/darbai/{projektas}/` | konkreti atvejo studija | taip |
| P0 | `/apie-mus/` | web dizaino agentūra / pasitikėjimas | taip |
| P0 | `/kontaktai/` | kontaktas / projekto užklausa | taip |
| P1 | `/seo-paslaugos/` | SEO paslaugos | jei realiai teikiama |
| P1 | `/brandingo-kurimas/` | brandingo kūrimas | taip |
| P1 | `/el-parduotuviu-kurimas/` | el. parduotuvių kūrimas | jei realiai teikiama |
| P1 | `/svetainiu-atnaujinimas/` | svetainės atnaujinimas | taip |
| P1 | `/svetainiu-prieziura/` | svetainių priežiūra | jei realiai teikiama |
| P1 | `/svetainiu-kurimo-kaina/` | svetainių kūrimas kaina | taip |
| P2 | `/landing-page-kurimas/` | landing page kūrimas | tik su unikaliu pasiūlymu |
| P2 | `/svetaines-auditas/` | svetainės auditas | tik jei realiai siūloma |
| P1 | `/zinios/` | žinių centras | taip |
| P1 | `/zinios/{tema}/` | vienas informacinis klasteris | taip |
| P0 | `/privatumo-politika/` | teisinė informacija | taip, be SEO prioriteto |
| P0 | `/slapuku-politika/` | teisinė informacija | taip, be SEO prioriteto |
| — | `/aciu/` | formos patvirtinimas | `noindex, follow` |
| — | `/404/` | klaidos puslapis | `noindex` |

## Puslapių turinio blokai

### Pradžia

1. Aiškus H1: ką kuriame, kam ir kokią vertę suteikiame.
2. Pagrindinis CTA ir antrinis CTA į darbus.
3. Atrinkti darbai su rezultatais.
4. Pagrindinės paslaugos su tekstinėmis nuorodomis.
5. empat.studio skirtumas / metodas.
6. Procesas.
7. Atsiliepimai ir klientų ženklai.
8. Trumpas DUK.
9. Kontaktinis CTA.

### Paslaugos puslapis

1. H1 su viena pagrindine intencija.
2. Problema ir rezultatas, ne abstraktus prisistatymas.
3. Kam skirta / kam netinka.
4. Kas įeina į paslaugą.
5. Procesas ir terminai.
6. Susijusios atvejo studijos.
7. Kainos logika arba orientyras.
8. DUK iš realių klientų klausimų.
9. Vienas pagrindinis CTA.
10. Nuorodos į 2–4 susijusius žinių centro straipsnius.

### Atvejo studija

1. Klientas, sektorius ir paslauga.
2. Pradinė problema ir tikslai.
3. Tyrimas / strategija.
4. Dizaino ir techniniai sprendimai.
5. Prieš / po arba proceso vizualai.
6. Pamatuojami rezultatai su laikotarpiu.
7. Kliento atsiliepimas.
8. Komandos vaidmenys ir data.
9. Nuoroda į atitinkamą paslaugą.
10. CTA panašiam projektui.

### Žinių centro straipsnis

1. Tiesus atsakymas į užklausą įžangoje.
2. Turinys / jump links ilgesniam straipsniui.
3. Originalūs pavyzdžiai, skaičiavimai arba empat.studio patirtis.
4. Autorius ir paskutinės esminės peržiūros data.
5. Susijusios paslaugos kontekstinis CTA.
6. Nuorodos į kitus to paties klasterio puslapius.

## Vidinių nuorodų modelis

```text
Pradžia
  → pagrindinės paslaugos
  → darbai

Paslaugos puslapis
  ↔ susijusios atvejo studijos
  ↔ susiję žinių straipsniai
  → kontaktai

Žinių straipsnis
  → vienas pagrindinis paslaugos puslapis
  ↔ 2–4 tos pačios temos straipsniai

Atvejo studija
  → atliktos paslaugos puslapis
  → kontaktai
```

Kiekvienas indeksuojamas puslapis turi būti pasiekiamas ne daugiau kaip per 3 paspaudimus nuo pradžios.

