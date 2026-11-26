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
  const isVideo = extname(file) === '.mp4';
  const size = statSync(file).size;
  const headers = { 'Content-Type': isVideo ? 'video/mp4' : types[extname(file)] || 'application/octet-stream', 'Content-Length': size };
  let range;
  if (isVideo) {
    headers['Accept-Ranges'] = 'bytes';
    const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (match && (match[1] || match[2])) {
      const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
      const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
      if (start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}` });
        res.end();
        return;
      }
      range = { start, end };
      headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
      headers['Content-Length'] = end - start + 1;
    }
  }
  res.writeHead(range ? 206 : 200, headers);
  if (req.method === 'HEAD') res.end();
  else createReadStream(file, range).pipe(res);
});
server.listen(port, '127.0.0.1', () => console.log(`empat.studio: http://127.0.0.1:${port}`));
