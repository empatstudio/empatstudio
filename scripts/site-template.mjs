const siteUrl = 'https://empat.studio';
const defaultShareImage = `${siteUrl}/assets/social-share-auguste.jpg`;

const escapeJson = (value) => value.replace(/</g, '\\u003c');
const stripTags = (value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
const readTag = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';

const activeSection = (route) => {
  if (route === '/paslaugos/' || [
    '/svetainiu-kurimas/', '/web-dizainas/', '/seo-paslaugos/', '/brandingo-kurimas/',
    '/svetaines-auditas/', '/verslo-procesu-automatizavimas/'
  ].includes(route)) return 'services';
  if (route === '/marketingo-paslaugos/' || ['/marketingo-strategija/', '/google-ads/', '/meta-reklama/', '/reels-kurimas/', '/lead-generation/'].includes(route)) return 'marketing';
  if (route.startsWith('/darbai/')) return 'work';
  if (route === '/apie/') return 'about';
  if (route.startsWith('/zinios/')) return 'knowledge';
  return '';
};

const navLink = (href, label, key, active) => `<a href="${href}"${key === active ? ' aria-current="page"' : ''}>${label}</a>`;

const header = (route) => {
  const active = activeSection(route);
  const contactHref = route === '/' ? '#kontaktai' : '/#kontaktai';
  return `<header class="site-header" data-header>
    <a class="brand" href="/" aria-label="empat.studio pradžia"><img src="/assets/logo-dark.svg" alt="empat.studio" width="150" height="50"></a>
    <nav class="desktop-nav" id="primary-navigation" aria-label="Pagrindinė navigacija">
      ${navLink('/paslaugos/', 'Paslaugos', 'services', active)}
      ${navLink('/marketingo-paslaugos/', 'Marketingas', 'marketing', active)}
      ${navLink('/darbai/', 'Darbai', 'work', active)}
      ${navLink('/apie/', 'Apie', 'about', active)}
      ${navLink('/zinios/', 'Naudingi patarimai', 'knowledge', active)}
      <a class="mobile-nav-cta" href="${contactHref}">Aptarkime projektą</a>
    </nav>
    <a class="button button-small header-cta" href="${contactHref}">Nemokamas pokalbis</a>
    <button class="menu-toggle" type="button" aria-label="Atverti meniu" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle><span></span><span></span></button>
  </header>`;
};

const footer = (route) => {
  const active = activeSection(route);
  return `<footer class="site-footer">
    <a class="brand" href="/" aria-label="empat.studio pradžia"><img src="/assets/logo-light.svg" alt="empat.studio" width="150" height="50"></a>
    <nav aria-label="Apatinė navigacija">
      ${navLink('/paslaugos/', 'Paslaugos', 'services', active)}
      ${navLink('/marketingo-paslaugos/', 'Marketingas', 'marketing', active)}
      ${navLink('/darbai/', 'Darbai', 'work', active)}
      ${navLink('/apie/', 'Apie', 'about', active)}
      ${navLink('/zinios/', 'Naudingi patarimai', 'knowledge', active)}
      <a href="/privatumo-politika/">Privatumas</a>
    </nav>
    <small>© 2026 empat.studio</small>
  </footer>`;
};

const serviceProof = (proof) => `<section class="service-testimonial section" aria-labelledby="service-review-title">
  <div class="testimonial-copy"><span class="eyebrow">Bendradarbiavimo patirtis</span><h2 id="service-review-title">Svarbu ne tik rezultatas, bet ir <em>kaip iki jo ateiname.</em></h2>${proof.related ? `<a class="text-link service-related-link" href="${proof.related.href}">${proof.related.label} →</a>` : ''}</div>
  <blockquote><div class="review-stars" aria-label="5 iš 5 žvaigždučių">★★★★★</div><p>„${proof.quote}“</p><footer>${proof.author} · ${proof.company}</footer><a class="button button-outline" href="https://www.facebook.com/empatstudio/reviews/" target="_blank" rel="noopener noreferrer">Daugiau atsiliepimų ↗</a></blockquote>
</section>`;

const breadcrumbSchema = (page) => {
  if (page.route === '/') return null;
  const items = [{ name: 'Pradžia', url: `${siteUrl}/` }];
  if (page.parent) items.push({ name: page.parent.name, url: `${siteUrl}${page.parent.route}` });
  items.push({ name: page.label, url: `${siteUrl}${page.route}` });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: item.url
    }))
  };
};

const articleSchema = (page, title, description) => page.article ? {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title.replace(/ \| empat\.studio$/, ''),
  description,
  dateModified: page.article.dateModified,
  datePublished: page.article.datePublished,
  inLanguage: 'lt-LT',
  mainEntityOfPage: `${siteUrl}${page.route}`,
  author: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'empat.studio' },
  publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'empat.studio', logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/logo-dark.svg` } }
} : null;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'empat.studio',
  url: `${siteUrl}/`,
  logo: `${siteUrl}/assets/logo-dark.svg`,
  email: 'info.empatstudio@gmail.com',
  telephone: '+37060824275',
  description: 'Svetainių kūrimo, UX/UI dizaino, brandingo, SEO ir skaitmeninio marketingo studija.'
};

export function renderPage(source, page) {
  let html = source;
  const title = stripTags(readTag(html, /<title>([\s\S]*?)<\/title>/i)) || `${page.label} | empat.studio`;
  const description = readTag(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || page.description || 'empat.studio – svetainių kūrimo ir skaitmeninio marketingo studija.';
  const canonical = `${siteUrl}${page.route}`;
  const shareImage = page.shareImage ? `${siteUrl}${page.shareImage}` : defaultShareImage;
  const shareImageType = shareImage.endsWith('.png') ? 'image/png' : shareImage.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
  const shareImageDimensions = page.shareImage ? '' : `
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">`;
  const ogType = page.article ? 'article' : 'website';

  page.toc?.forEach(({ heading, id }) => {
    html = html.replace(`<h2>${heading}</h2>`, `<h2 id="${id}">${heading}</h2>`);
    html = html.replace('<a href="#">', `<a href="#${id}">`);
  });

  if (page.proof) {
    const proofSection = serviceProof(page.proof);
    if (/<section class="service-testimonial[\s\S]*?<\/section>/i.test(html)) html = html.replace(/<section class="service-testimonial[\s\S]*?<\/section>/i, proofSection);
    else html = html.replace('<section class="subcta">', `${proofSection}\n<section class="subcta">`);
  }

  html = html.replace(/<a class="skip-link"[\s\S]*?<\/a>\s*/i, '');
  html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/i, header(page.route));
  html = html.replace(/<footer class="site-footer"[\s\S]*?<\/footer>/i, footer(page.route));
  html = html.replace(/<main(?![^>]*\bid=)[^>]*>/i, (match) => match.replace('<main', '<main id="content"'));
  html = html.replace(/<body([^>]*)>/i, `<body$1>\n  <a class="skip-link" href="#content">Pereiti prie turinio</a>`);
  html = html.replace(/\s*<script type="module" src="\/src\/main\.js"><\/script>/gi, '');

  const removePatterns = [
    /\s*<meta property="og:title"[^>]*>/gi,
    /\s*<meta property="og:description"[^>]*>/gi,
    /\s*<meta property="og:type"[^>]*>/gi,
    /\s*<meta property="og:url"[^>]*>/gi,
    /\s*<meta property="og:image(?::[^"]+)?"[^>]*>/gi,
    /\s*<meta name="twitter:[^"]+"[^>]*>/gi,
    /\s*<link rel="canonical"[^>]*>/gi
  ];
  removePatterns.forEach((pattern) => { html = html.replace(pattern, ''); });

  if (!/<meta\s+name=["']description["']/i.test(html)) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, (match) => `${match}\n  <meta name="description" content="${description}">`);
  }

  const jsonLd = [organizationSchema, breadcrumbSchema(page), articleSchema(page, title, description)]
    .filter(Boolean)
    .map((data) => `<script type="application/ld+json">${escapeJson(JSON.stringify(data))}</script>`)
    .join('\n  ');
  const socialMeta = `
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="empat.studio">
  <meta property="og:locale" content="lt_LT">
  <meta property="og:image" content="${shareImage}">
  <meta property="og:image:secure_url" content="${shareImage}">
  <meta property="og:image:type" content="${shareImageType}">${shareImageDimensions}
  <meta property="og:image:alt" content="empat.studio – ${page.label}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${shareImage}">
  <meta name="twitter:image:alt" content="empat.studio – ${page.label}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  ${jsonLd}`;
  html = html.replace('</head>', `${socialMeta}\n</head>`);
  html = html.replace('</body>', '  <script type="module" src="/src/main.js"></script>\n</body>');
  return html;
}
