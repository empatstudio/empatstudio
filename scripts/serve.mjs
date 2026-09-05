import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8' };
const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = join(root, pathname === '/' ? 'index.html' : pathname);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
server.listen(port, '127.0.0.1', () => console.log(`empat.studio: http://127.0.0.1:${port}`));
