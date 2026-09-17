import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderPage } from './site-template.mjs';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
const serviceParent = { name: 'Paslaugos', route: '/paslaugos/' };
const marketingParent = { name: 'Marketingo paslaugos', route: '/marketingo-paslaugos/' };
const workParent = { name: 'Darbai', route: '/darbai/' };
const knowledgeParent = { name: 'Naudingi patarimai', route: '/zinios/' };
const reviews = {
  agnesa: { author: 'Agnesa Seriogina', company: 'buklaukine.lt', quote: 'Augustė ne tik klausėsi, bet ir išgirdo. Suprato visus mano norus ir sukūrė nuostabų, elegantišką puslapį.' },
  vaida: { author: 'Vaida', company: 'gerasodontologas.lt', quote: 'Augustė įvertina visas aplinkybes, nepalieka sudėtingų klausimų be atsakymų ir įsijaučia į analizuojamo verslo scenarijus.' },
  packus: { author: 'Monika Laukytė', company: 'UAB Packus', quote: 'Augustė skyrė laiko suprasti mūsų poreikius ir tikslus, buvo labai atsakinga, atvira pastaboms ir greitai atliko būtinus pakeitimus.' },
  mytravis: { author: 'Kazimieras Daukšys', company: 'mytravis.com', quote: 'Darbas buvo atliktas geriau, nei tikėjomės, ir viršijo mūsų lūkesčius. Bendravimas buvo profesionalus ir draugiškas.' }
};
const pages = [
  { source: 'index.html', target: 'index.html', route: '/', label: 'Pradžia' },
  { source: 'apie.html', target: 'apie/index.html', route: '/apie/', label: 'Apie' },
  { source: 'paslaugos.html', target: 'paslaugos/index.html', route: '/paslaugos/', label: 'Paslaugos' },
  { source: 'svetainiu-kurimas.html', target: 'svetainiu-kurimas/index.html', route: '/svetainiu-kurimas/', label: 'Svetainių kūrimas', parent: serviceParent, proof: { ...reviews.agnesa, related: { href: '/darbai/vejos-robotai/', label: 'Susijęs projektas: Vejos Robotai' } } },
  { source: 'web-dizainas.html', target: 'web-dizainas/index.html', route: '/web-dizainas/', label: 'Web dizainas', parent: serviceParent, proof: { ...reviews.vaida, related: { href: '/darbai/innohub-lithuania/', label: 'Susijęs projektas: InnoHub Lithuania' } } },
  { source: 'seo-paslaugos.html', target: 'seo-paslaugos/index.html', route: '/seo-paslaugos/', label: 'SEO paslaugos', parent: serviceParent, proof: reviews.packus },
  { source: 'brandingo-kurimas.html', target: 'brandingo-kurimas/index.html', route: '/brandingo-kurimas/', label: 'Brandingo kūrimas', parent: serviceParent, proof: { ...reviews.packus, related: { href: '/darbai/vejos-robotai/', label: 'Susijęs projektas: TESORA identitetas' } } },
  { source: 'svetaines-auditas.html', target: 'svetaines-auditas/index.html', route: '/svetaines-auditas/', label: 'Svetainės auditas', parent: serviceParent, proof: reviews.vaida },
  { source: 'verslo-procesu-automatizavimas.html', target: 'verslo-procesu-automatizavimas/index.html', route: '/verslo-procesu-automatizavimas/', label: 'Procesų automatizavimas', parent: serviceParent, proof: reviews.mytravis },
  { source: 'marketingo-paslaugos.html', target: 'marketingo-paslaugos/index.html', route: '/marketingo-paslaugos/', label: 'Marketingo paslaugos', proof: reviews.mytravis },
  { source: 'marketingo-strategija.html', target: 'marketingo-strategija/index.html', route: '/marketingo-strategija/', label: 'Marketingo strategija', parent: marketingParent, proof: reviews.packus },
  { source: 'google-ads.html', target: 'google-ads/index.html', route: '/google-ads/', label: 'Google Ads', parent: marketingParent, proof: reviews.mytravis },
  { source: 'meta-reklama.html', target: 'meta-reklama/index.html', route: '/meta-reklama/', label: 'Facebook ir Instagram reklama', parent: marketingParent, proof: reviews.mytravis },
  { source: 'reels-kurimas.html', target: 'reels-kurimas/index.html', route: '/reels-kurimas/', label: 'Reels kūrimas', parent: marketingParent, proof: reviews.mytravis },
  { source: 'lead-generation.html', target: 'lead-generation/index.html', route: '/lead-generation/', label: 'Lead generation', parent: marketingParent, proof: reviews.mytravis },
  { source: 'darbai.html', target: 'darbai/index.html', route: '/darbai/', label: 'Darbai' },
  { source: 'vejos-robotai.html', target: 'darbai/vejos-robotai/index.html', route: '/darbai/vejos-robotai/', label: 'Vejos Robotai', parent: workParent, shareImage: '/assets/projects/vejos-robotai/website-desktop.jpg' },
  { source: 'innohub-lithuania.html', target: 'darbai/innohub-lithuania/index.html', route: '/darbai/innohub-lithuania/', label: 'InnoHub Lithuania', parent: workParent, shareImage: '/assets/projects/innohub-lithuania/website-desktop.jpg' },
  { source: 'dainius-zalimas.html', target: 'darbai/dainius-zalimas/index.html', route: '/darbai/dainius-zalimas/', label: 'Dainius Žalimas', parent: workParent, shareImage: '/assets/projects/dainius-zalimas/website-desktop.jpg' },
  { source: 'fanu.html', target: 'darbai/fanu/index.html', route: '/darbai/fanu/', label: 'Fanų sporto projektai', parent: workParent, shareImage: '/assets/projects/fanu/brand-system.jpg' },
  { source: 'zinios.html', target: 'zinios/index.html', route: '/zinios/', label: 'Naudingi patarimai' },
  { source: 'kodel-svetaine-neatnesa-klientu.html', target: 'zinios/kodel-svetaine-neatnesa-klientu/index.html', route: '/zinios/kodel-svetaine-neatnesa-klientu/', label: 'Kodėl svetainė neatneša klientų?', parent: knowledgeParent, article: { datePublished: '2026-09-05', dateModified: '2026-09-17' }, toc: [{ heading: 'Ar problema tikrai svetainėje?', id: 'problema' }, { heading: '15 priežasčių, kurios stabdo užklausas', id: 'priezastys' }, { heading: 'Ką taisyti pirmiausia?', id: 'prioritetai' }, { heading: 'Mini patikra tavo svetainei', id: 'patikra' }] },
  { source: 'seo-pries-svetaines-dizaina.html', target: 'zinios/seo-pries-svetaines-dizaina/index.html', route: '/zinios/seo-pries-svetaines-dizaina/', label: 'SEO prieš svetainės dizainą', parent: knowledgeParent, article: { datePublished: '2026-09-05', dateModified: '2026-09-17' }, toc: [{ heading: 'Kas nutinka, kai SEO paliekamas pabaigai?', id: 'seo-pabaigoje' }, { heading: 'Teisinga darbų seka', id: 'darbu-seka' }, { heading: 'Kaip SEO ir dizainas padeda vienas kitam?', id: 'seo-ir-dizainas' }, { heading: 'SEO-first projekto checklist', id: 'seo-checklist' }] },
  { source: 'pirma-brandingas-ar-svetaine.html', target: 'zinios/pirma-brandingas-ar-svetaine/index.html', route: '/zinios/pirma-brandingas-ar-svetaine/', label: 'Pirma brandingas ar svetainė?', parent: knowledgeParent, article: { datePublished: '2026-09-05', dateModified: '2026-09-17' }, toc: [{ heading: 'Ką iš tiesų reiškia „brandingas“?', id: 'kas-yra-brandingas' }, { heading: 'Kada pirmiausia rinktis brandingą?', id: 'brandingas-pirmas' }, { heading: 'Kada galima pradėti nuo svetainės?', id: 'svetaine-pirma' }, { heading: 'Keturi dažniausi scenarijai', id: 'scenarijai' }] },
  { source: 'privatumo-politika.html', target: 'privatumo-politika/index.html', route: '/privatumo-politika/', label: 'Privatumo politika', description: 'Kaip empat.studio renka, naudoja ir saugo asmens duomenis, kai lankotės svetainėje arba pateikiate užklausą.' },
  { source: 'aciu.html', target: 'aciu/index.html', route: '/aciu/', label: 'Ačiū' }
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await Promise.all(pages.map(async (page) => {
  const destination = resolve(out, page.target);
  await mkdir(resolve(destination, '..'), { recursive: true });
  const source = await readFile(resolve(root, page.source), 'utf8');
  await writeFile(destination, renderPage(source, page));
}));
await cp(resolve(root, 'src'), resolve(out, 'src'), { recursive: true });
await cp(resolve(root, 'public'), out, { recursive: true });
console.log(`Built ${pages.length} pages into ${out}`);
