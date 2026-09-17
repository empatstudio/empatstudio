import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const issues = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]));
  return files.flat();
}

const htmlFiles = (await walk(dist)).filter((file) => extname(file) === '.html');
const count = (html, pattern) => [...html.matchAll(pattern)].length;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const label = file.replace(`${dist}\\`, '');
  const checks = [
    ['H1', /<h1\b/gi, 1], ['main', /<main\b/gi, 1], ['footer', /<footer class="site-footer"/gi, 1],
    ['mobile menu', /data-menu-toggle/gi, 1], ['skip link', /class="skip-link"/gi, 1],
    ['canonical', /rel="canonical"/gi, 1], ['description', /name="description"/gi, 1],
    ['OG image', /property="og:image"/gi, 1], ['main script', /src="\/src\/main\.js"/gi, 1]
  ];
  for (const [name, pattern, expected] of checks) {
    const actual = count(html, pattern);
    if (actual !== expected) issues.push(`${label}: ${name} count ${actual}, expected ${expected}`);
  }
  if (/href="#"/i.test(html)) issues.push(`${label}: empty hash link`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { issues.push(`${label}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/gi)) {
    const url = match[1];
    const target = url.endsWith('/') ? join(dist, url, 'index.html') : join(dist, url);
    try { await access(target); } catch { issues.push(`${label}: missing internal target ${url}`); }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} HTML pages: structure, metadata, JSON-LD and internal targets passed.`);
}
