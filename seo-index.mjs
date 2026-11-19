// Publish search-indexing signals without altering the visible Carnival Careers site.
import fs from 'node:fs';
import path from 'node:path';

const site = 'https://carnival-careers-live-current.vercel.app';
const dist = path.resolve('dist');
const homepage = path.join(dist, 'index.html');

if (!fs.existsSync(homepage)) throw new Error('Build dist/index.html before SEO finalization');
let html = fs.readFileSync(homepage, 'utf8');
if (!/<head\b[^>]*>/i.test(html) || !/<\/head>/i.test(html)) {
  throw new Error('Cannot safely add canonical URL: HTML head is missing');
}

// One and only one canonical homepage. Leave all visible content, JS and CSS unchanged.
html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
html = html.replace(/<head\b[^>]*>/i, match => match + '\n  <link rel="canonical" href="' + site + '/">');
fs.writeFileSync(homepage, html, 'utf8');

fs.writeFileSync(path.join(dist, 'robots.txt'),
  'User-agent: *\nAllow: /\nSitemap: ' + site + '/sitemap.xml\n', 'utf8');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc></url>
  <url><loc>${site}/business-solution.html</loc></url>
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

console.log('CC_SEO_CANONICAL_SITEMAP_PUBLISHED', site);
