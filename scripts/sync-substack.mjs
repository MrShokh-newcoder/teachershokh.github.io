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

// The post body is shown on the site's Writing page, so keep the text and images and drop
// anything interactive Substack adds (scripts, forms, subscribe buttons, embeds).
const cleanHtml = (html = '') => html
  .replace(/<(script|style|form|button|iframe|svg|noscript)\b[\s\S]*?<\/\1>/gi, '')
  .replace(/<div class="(?:subscription-widget|button-wrapper|captioned-button-wrap|footnote-anchor-wrap)[\s\S]*?<\/div>\s*<\/div>/gi, '')
  .replace(/\s(on\w+|style|data-[\w-]+|srcset|sizes)="[^"]*"/gi, '')
  .replace(/<a\s/gi, '<a target="_blank" rel="noopener" ')
  .replace(/<p>\s*<\/p>/g, '')
  .trim();

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
    html: cleanHtml(content),
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
