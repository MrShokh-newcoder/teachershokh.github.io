// Pulls the Substack RSS feed and writes data/substack.json for the homepage.
// Run by .github/workflows/sync-substack.yml (Node 20+, no dependencies).
import { writeFile, mkdir, readFile } from 'node:fs/promises';

const FEED = 'https://teachershokh.substack.com/feed';
const OUT = new URL('../data/substack.json', import.meta.url);

const decode = (s = '') => s
  .replace(/^<!\[CDATA\[|\]\]>$/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&amp;/g, '&').trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};

// Rough language guess: Uzbek Latin has o'/g' and very common function words.
const guessLang = (text) => {
  const uz = (text.match(/\b(va|bilan|uchun|haqida|bu|ham|emas|kerak|qanday)\b|[og][‘'ʻ`]/gi) || []).length;
  return uz >= 2 ? 'uz' : 'en';
};

const res = await fetch(FEED, { headers: { 'user-agent': 'teachershokh.blog sync' } });
if (!res.ok) throw new Error(`Feed returned ${res.status}`);
const xml = await res.text();

const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const title = tag(item, 'title');
  const subtitle = tag(item, 'description');
  const content = tag(item, 'content:encoded');
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const image = (item.match(/<enclosure[^>]+url="([^"]+)"/) || [])[1] || null;
  return {
    title,
    subtitle,
    url: tag(item, 'link'),
    date: new Date(tag(item, 'pubDate')).toISOString(),
    image,
    minutes: words ? Math.max(1, Math.round(words / 200)) : null,
    lang: guessLang(`${title} ${subtitle} ${content.slice(0, 2000)}`)
  };
});

if (!posts.length) throw new Error('No posts found in feed; leaving existing file alone.');

const next = JSON.stringify({ source: FEED, posts }, null, 2) + '\n';
let prev = '';
try { prev = await readFile(OUT, 'utf8'); } catch {}
if (prev === next) { console.log('No changes.'); process.exit(0); }

await mkdir(new URL('../data/', import.meta.url), { recursive: true });
await writeFile(OUT, next);
console.log(`Wrote ${posts.length} posts.`);
