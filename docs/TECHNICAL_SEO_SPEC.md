# empat.studio techninis SEO pagrindas

Šios taisyklės taikomos programuojant svetainę nepriklausomai nuo pasirinkto frameworko ar CMS.

## Renderinimas ir indeksavimas

- Kiekvienas indeksuojamas URL turi grąžinti prasmingą HTML be būtinybės laukti klientinio JavaScript.
- Rinktis SSR, SSG arba patikimą serverinį renderinimą.
- Kiekviena atskira turinio tema turi turėti savo tikrą URL.
- Vidinės nuorodos turi būti įprasti `<a href>` elementai.
- Produkcijoje nepalikti `noindex`, autentifikacijos ar robots blokavimo.
- Staging aplinką apsaugoti autentifikacija ir `noindex`; jos URL nepateikti sitemap'e.

## Metadata kontraktas

Kiekvienas indeksuojamas puslapis privalo turėti:

- unikalų `<title>` (dažniausiai 45–60 simbolių, bet rašyti žmonėms, ne pagal aklą limitą);
- unikalų meta description su nauda ir kontekstu;
- vieną aiškų H1;
- canonical į save arba sąmoningai pasirinktą pagrindinį URL;
- Open Graph title, description, image ir URL;
- prasmingą `lang="lt"`;
- favicon ir pilną logotipo / Organization informaciją.

Title šablonai:

```text
Pradžia: Web dizainas ir svetainių kūrimas | empat.studio
Paslauga: Svetainių kūrimas verslui | empat.studio
Darbas: {Projektas}: svetainės kūrimo atvejo studija | empat.studio
Straipsnis: {Aiškus temos pavadinimas} | empat.studio
```

Šablonus koreguoti pagal realų SERP ir turinį; nekartoti identiškų title.

## Sitemap ir robots

- Generuoti `https://empat.studio/sitemap.xml` su tik canonical, 200 statusą grąžinančiais ir indeksuojamais URL.
- Sitemap naudoti absoliučius HTTPS URL ir UTF-8.
- `lastmod` keisti tik atlikus realų turinio pakeitimą.
- Neįtraukti `/aciu/`, 404, filtrų, paieškos rezultatų, dublių ir nukreipimų.
- `robots.txt` nurodyti `Sitemap: https://empat.studio/sitemap.xml`.
- Po paleidimo sitemap pateikti Google Search Console ir Bing Webmaster Tools.

## Struktūriniai duomenys

- Visame domene: `Organization` arba, jei yra reali klientų aptarnavimo vieta, tinkamas `LocalBusiness` tipas.
- Pradžioje: `WebSite` ir Organization ryšys.
- Paslaugose: `Service` tik pagal realiai matomą puslapio turinį.
- Atvejo studijose ir straipsniuose: `Article` / `BlogPosting`, tikras autorius ir datos.
- Vidiniuose puslapiuose: `BreadcrumbList`.
- Nenaudoti savų atsiliepimų žvaigždučių kaip klaidinančio rich result triuko.
- FAQ schema savaime negarantuoja FAQ rich result; ją naudoti tik jei klausimai ir atsakymai matomi vartotojui.
- Kiekvieną šabloną tikrinti Google Rich Results Test ir Schema Markup Validator.

Minimalus Organization JSON-LD karkasas (užpildyti tikrais duomenimis):

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://empat.studio/#organization",
  "name": "empat.studio",
  "url": "https://empat.studio/",
  "logo": "https://empat.studio/assets/logo.svg",
  "email": "info@empat.studio",
  "telephone": "+37060824275",
  "sameAs": []
}
```

Prieš publikavimą patvirtinti el. paštą, telefono numerį, juridinį pavadinimą, adresą ir socialinių profilių URL.

## Tarptautiškumas

- Pradėti nuo kokybiškos lietuviškos svetainės.
- Anglų kalbos versiją pridėti tik turint pilnai išverstą ir prižiūrimą turinį.
- Jei bus LT ir EN: naudoti `/lt/` ir `/en/` arba palikti LT šaknyje bei EN `/en/`; pasirinkimo nekeisti po paleidimo.
- Abipusiai `hreflang="lt"`, `hreflang="en"` ir `x-default`; kiekviena kalba turi canonical į save.
- Automatiškai nenukreipti pagal IP ar naršyklės kalbą.

## Vaizdai ir brand assetai

- Logotipams naudoti savarankiškus SVG; SVG su išorine JPG nuoroda pirmiausia sutvarkyti.
- Fotografijas eksportuoti AVIF ir WebP su JPEG fallback, jei reikalingas.
- Kiekvienam responsive vaizdui pateikti `srcset` ir `sizes`.
- Hero vaizdo nelazy-loadinti, jei jis yra LCP elementas; kitus vaizdus krauti tingiai.
- Nurodyti `width` ir `height`, kad nebūtų layout shift.
- Alt tekstas apibūdina vaizdo paskirtį; dekoratyviniams elementams `alt=""`.
- Grūdo efektą optimizuoti: vengti milžiniško animuoto video ar pilno ekrano triukšmo tekstūros telefone.

## Core Web Vitals biudžetas

- LCP ≤ 2,5 s 75-ajame realių lankytojų percentile.
- INP < 200 ms.
- CLS < 0,1.
- Pradinis JS kiekis kuo mažesnis; dekoratyvinė animacija neturi blokuoti pagrindinio turinio.
- Fontus laikyti lokaliai tik turint licenciją, preload'inti tik būtiną variantą, naudoti `font-display: swap`.
- Gerbti `prefers-reduced-motion`.

## Statusai, nukreipimai ir canonical

- Pašalintas URL su tiesioginiu atitikmeniu: vienas 301 į artimiausią naują puslapį.
- Be atitikmens: tikras 404 arba 410, ne nukreipimas į pradžią.
- Vengti redirect grandinių.
- Viena HTTPS host versija (`https://empat.studio/` arba `https://www.empat.studio/`) ir 301 iš visų kitų variantų.
- Vienoda trailing slash politika.
- UTM ir sekimo parametrai neturi kurti indeksuojamų dublikatų.

## Analitika ir konversijos

- Google Search Console domeno nuosavybė.
- GA4 arba kita analitika su sutikimų valdymu.
- Įvykiai: `generate_lead`, kontaktinės formos sėkmė, el. pašto paspaudimas, telefono paspaudimas, darbų peržiūra, brief atsisiuntimas.
- Ačiū puslapis `noindex`; konversiją fiksuoti tik po sėkmingo serverio atsakymo.
- Saugoti landing page ir UTM kartu su lead'u, kad SEO būtų vertinamas pagal pajamas, ne vien srautą.

## Paleidimo QA

- Crawl: nėra orphan puslapių, 4xx vidinių nuorodų, redirect grandinių ar dubliuotų title/H1.
- Patikrinti canonical, robots, sitemap, `lang`, hreflang (jei naudojamas).
- Patikrinti mobile layout, klaviatūros navigaciją ir kontrastą.
- Lighthouse yra laboratorinis signalas; po paleidimo stebėti realius CWV Search Console / CrUX.
- Patikrinti indeksavimą su URL Inspection bent pradžiai, paslaugoms, darbui ir straipsniui.
- Patikrinti struktūrinius duomenis ir social share preview.
- Užregistruoti Google Business Profile tik su tikrais ir nuosekliais NAP duomenimis.

