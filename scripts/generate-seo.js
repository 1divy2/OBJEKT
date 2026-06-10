import fs from 'fs';
import path from 'path';

// Note: Using a lightweight script to generate SEO before build.
// Since gray-matter is available in node (devDependencies) we can use it here.
const JOURNAL_DIR = path.join(process.cwd(), 'src/content/journal');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const files = fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.md'));

let sitemapEntries = ``;
let rssEntries = ``;

const SITE_URL = 'https://objekt.studio';

files.forEach(file => {
  const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf-8');
  const slug = file.replace('.md', '');
  
  // Custom minimal parser since gray-matter was removed from package.json!
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        data[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
      }
    });
  }

  const date = data.d ? new Date(data.d).toISOString() : new Date().toISOString();
  const title = data.t || 'Untitled';
  
  const url = `${SITE_URL}/journal/${slug}`;

  sitemapEntries += `
  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  rssEntries += `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
    </item>`;
});

// Write Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/work</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/journal</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>${sitemapEntries}
</urlset>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
console.log('✅ Generated sitemap.xml');

// Write RSS
const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>OBJEKT Studio Journal</title>
  <link>${SITE_URL}</link>
  <description>Occasional writing on type, identity, and the slow web.</description>
  <language>en-us</language>${rssEntries}
</channel>
</rss>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss);
console.log('✅ Generated rss.xml');
