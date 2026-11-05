// Adds new uploads from both YouTube channels to youtube.js (the Watch page reads it).
// Run by .github/workflows/sync-youtube.yml (Node 20+, no dependencies).
// Each channel's feed lists its latest 15 uploads; videos already in youtube.js are kept,
// so older ones never drop off. If YouTube can't be reached, the file is left as it is.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../youtube.js', import.meta.url);
const UA = { 'user-agent': 'Mozilla/5.0 (teachershokh.blog sync)', 'accept-language': 'en' };

const src = await readFile(FILE, 'utf8');
const data = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf(';')));
const known = new Map(data.videos.map((v) => [v.id, v]));

const decode = (s = '') => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&amp;/g, '&').trim();
const guessLang = (t) => (t.match(/\b(va|bilan|uchun|haqida|bu|ham|emas|kerak|qanday|nima|bor|yo'q)\b|[og][‘'ʻ’`]/gi) || []).length ? 'uz' : 'en';

async function channelId(handleUrl) {
  // the handle page names its channel in a canonical link; read it at run time
  const html = await (await fetch(handleUrl, { headers: UA })).text();
  const m = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/([\w-]+)"/) ||
            html.match(/"externalId":"([\w-]+)"/);
  if (!m) throw new Error(`no channel id on ${handleUrl}`);
  return m[1];
}
async function isShort(id) {
  // /shorts/<id> answers 200 for a Short and redirects to /watch for a normal video
  const r = await fetch(`https://www.youtube.com/shorts/${id}`, { headers: UA, redirect: 'manual' });
  return r.status === 200;
}
async function seconds(id) {
  try {
    const html = await (await fetch(`https://www.youtube.com/watch?v=${id}`, { headers: UA })).text();
    const m = html.match(/"lengthSeconds":"(\d+)"/);
    return m ? +m[1] : null;
  } catch { return null; }
}

let added = 0, renamed = 0;
try {
  for (const [ch, info] of Object.entries(data.channels)) {
    const id = await channelId(info.url);
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`, { headers: UA });
    if (!res.ok) throw new Error(`feed for ${info.handle} returned ${res.status}`);
    const xml = await res.text();
    for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const vid = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
      const title = decode((entry.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
      const date = ((entry.match(/<published>([^<]+)<\/published>/) || [])[1] || '').slice(0, 10);
      if (!vid) continue;
      const old = known.get(vid);
      if (old) {
        if (title && old.title !== title) { old.title = title; renamed++; }
        continue;
      }
      const v = { id: vid, ch, short: await isShort(vid), date, secs: await seconds(vid), lang: guessLang(title), title };
      data.videos.push(v); known.set(vid, v); added++;
      console.log(`+ ${info.handle} ${v.short ? 'short' : 'video'} ${date} ${title}`);
    }
  }
} catch (e) {
  console.warn(`YouTube sync skipped: ${e.message}`);
  process.exit(0);
}

if (!added && !renamed) { console.log('Nothing new.'); process.exit(0); }
data.videos.sort((a, b) => (a.ch === b.ch ? (a.short === b.short ? b.date.localeCompare(a.date) : a.short - b.short) : a.ch === 'teaching' ? -1 : 1));
await writeFile(FILE, '/* Videos from the two YouTube channels. Kept current by scripts/sync-youtube.mjs. */\n' +
  'window.YOUTUBE = ' + JSON.stringify(data, null, 1) + ';\n');
console.log(`Added ${added}, retitled ${renamed}.`);
