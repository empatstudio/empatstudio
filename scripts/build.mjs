import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
const pages = {
  'index.html': 'index.html',
  'svetainiu-kurimas.html': 'svetainiu-kurimas/index.html',
  'web-dizainas.html': 'web-dizainas/index.html',
  'seo-paslaugos.html': 'seo-paslaugos/index.html',
  'brandingo-kurimas.html': 'brandingo-kurimas/index.html',
  'svetaines-auditas.html': 'svetaines-auditas/index.html',
  'privatumo-politika.html': 'privatumo-politika/index.html'
};

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await Promise.all(Object.entries(pages).map(async ([source, target]) => {
  const destination = resolve(out, target);
  await mkdir(resolve(destination, '..'), { recursive: true });
  await cp(resolve(root, source), destination);
}));
await cp(resolve(root, 'src'), resolve(out, 'src'), { recursive: true });
await cp(resolve(root, 'public'), out, { recursive: true });
console.log(`Built ${Object.keys(pages).length} pages into ${out}`);
