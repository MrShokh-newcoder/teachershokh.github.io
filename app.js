/* Teacher Shokh — site script: text, theme, posts. The site is in English; posts keep their own language. */
(function () {
  'use strict';

  var SUBSTACK = 'https://teachershokh.substack.com';

  // Substack posts used when data/substack.json is missing (e.g. opened as a local file).
  // The GitHub Action in .github/workflows refreshes that JSON from the Substack RSS feed.
  var FALLBACK_SUBSTACK = [
    { title: 'Bolalarga jonim fido', subtitle: "Sukhamlinskiyning bu darajada bolalarga mehr qo'yishiga sabab bo'lgan inson haqida", url: SUBSTACK + '/p/bolalarga-jonim-fido', date: '2026-01-18T15:43:14Z', lang: 'uz' },
    { title: 'Shu inson sabab hali ham teaching sohasidaman', subtitle: "Yosh bolalarni o'qitishda ELT sohasida eng TOP laridan", url: SUBSTACK + '/p/shu-inson-sabab-hali-ham-teaching', date: '2026-01-09T04:22:22Z', lang: 'uz' },
    { title: 'Task-Based-Learning (TBL) va Project-Based-Learning (PBL)', subtitle: "O'quvchilarga turli topshiriq va loyihalar berish", url: SUBSTACK + '/p/task-based-learning-tbl-va-project', date: '2025-11-24T08:57:49Z', lang: 'uz' },
    { title: 'Avvalo qiziqtirib olish kerak', subtitle: 'Yosh bolalarni Ingliz tiliga qiziqtirish', url: SUBSTACK + '/p/avvalo-qiziqtirib-olish-kerak', date: '2025-11-24T08:45:12Z', lang: 'uz' }
  ];

  var T = {
    en: {
      skip: 'Skip to content',
      edition: 'Tashkent · English teaching methodology',
      'nav.notes': 'Notes', 'nav.writing': 'Writing', 'nav.watch': 'Watch', 'nav.work': 'Work', 'nav.about': 'About',
      'hero.kicker': "A teacher's notebook",
      'hero.title': "Teaching is an <em>art.</em><br>Teaching well is a <em>craft.</em>",
      'hero.lede': "I'm Teacher Shokh (Shokhrukh Rejavaliev), an English teacher in Tashkent, Uzbekistan. I work with young learners, teens and IELTS candidates, and I write about methodology: what the research says, what actually happens in the classroom, and the distance between the two.",
      'facts.teach': 'Teaching', 'facts.train': 'Training', 'facts.now': 'Now',
      'facts.delta': 'DELTA (in progress)', 'facts.city': 'Tashkent',
      'hero.cta1': 'Latest writing', 'hero.cta2': 'Subscribe',
      'writing.h': 'Writing',
      'writing.dek': 'Essays on teaching, learning, and the craft of doing both well.',
      'filter.all': 'All', 'reader.back': 'All writing', 'reader.comments': 'Comments', 'reader.next': 'Next essay',
      'writing.all': 'All writing on Substack',
      'post.latest': 'Latest', 'post.read': 'Read the essay →', 'post.min': 'min read',
      'pull.q': '“I give my heart to children.”', 'pull.src': 'book title, 1969',
      'tg.h': 'Telegram posts',
      "nav.reading": "What I read",
      "read.kicker": "Reading list",
      "read.h": "What I read",
      "read.lede": "The blogs and sites I follow to keep learning the craft: methodology, SLA, young learners, DELTA and research. All in English, almost all free.",
      "read.sources": "sources",
      "read.topics": "topics",
      "read.cat1": "Methodology and second language acquisition",
      "read.cat2": "Vocabulary and lexis",
      "read.cat3": "Young learners",
      "read.cat4": "DELTA and teacher development",
      "read.cat5": "Research and evidence",
      "read.cat6": "Lesson ideas",
      "read.cat7": "Edtech and AI",
      "read.cat8": "Motivation and education",
      "read.cat9": "Organisations and exam boards",
      'tg.dek': 'From the @inspiring_teacher channel: classroom notes, games, books and reflections.',
      'tg.more': 'Show more', 'tg.join': 'Join the channel', 'tg.count': '{n} posts',
      'tg.back': 'All posts', 'tg.open': 'Open on Telegram ↗',
      'tg.photos': '{n} photo(s)', 'tg.video': 'a video', 'tg.file': 'a file',
      'tg.note': 'This post includes {m}. See them on Telegram.',
      'nav.telegram': 'Telegram', 'tg.kicker': 'Telegram · @inspiring_teacher',
      'tg.lede': "What I've written on the @inspiring_teacher channel since 2024, sorted by topic: teaching tips, methodology, classroom games, books, my CELTA journey and one-liners.",
      'tg.posts': 'posts', 'tg.next': 'Next post', 'tg.discuss': 'Open the discussion in Telegram', 'tg.showAll': 'Show all {n}', 'tg.showLess': 'Show fewer', 'tg.cats': 'topics',
      'tg.cat.tips': 'Teaching tips', 'tg.dek.tips': "From Penny Ur's 100 Teaching Tips, one at a time, and how each plays out in my classes.",
      'tg.cat.method': 'Methodology', 'tg.dek.method': 'How languages are learned and taught: acquisition, TBL, TPR, assessment, exam preparation.',
      'tg.cat.classroom': 'Classroom & rapport', 'tg.dek.classroom': 'Being the teacher students look forward to: respect, names, control vs guidance, parents.',
      'tg.cat.games': 'Games & activities', 'tg.dek.games': 'Tried in class: icebreakers, treasure hunts, vocabulary games, class blogs.',
      'tg.cat.books': 'Books & resources', 'tg.dek.books': "What I'm reading and watching, and what I recommend.",
      'tg.cat.reflections': 'Reflections & journey', 'tg.dek.reflections': 'CELTA, courses, events and lessons learned the hard way.',
      'tg.cat.oneliners': 'One-liners & quotes', 'tg.dek.oneliners': 'Short thoughts and lines worth keeping.',
      'watch.h': 'Watch',
      'watch.dek': 'My two YouTube channels: one on teaching, one personal. You can watch the videos right here.',
      'more.work': 'See all work', 'ap.title': 'Articles & Posts', 'ap.search': 'Search posts…', 'ap.toggle': 'Show or hide the list', 'ap.none': 'Nothing matches that search.', 'ap.newer': 'Newer', 'ap.older': 'Older', 'ap.onSubstack': 'Also on Substack', 'ap.readSubstack': 'Read it on Substack', 'ap.commentSubstack': 'Comments for this post are on Substack', 'more.read': 'Read all', 'more.watch': 'Watch all', 'writing.kicker': 'Essays · Substack',
      'watch.go': 'All videos →', 'watch.label': 'YouTube · 2 channels',
      'yt.kicker': 'YouTube · 2 channels', 'yt.h': 'Watch', 'yt.videos': 'videos', 'yt.channels': 'channels',
      'yt.lede': 'Two channels: teaching on @InspiringTeacherShokh, and my personal thinking on @mrshokh. Click a video to watch it here, or open it on YouTube.',
      'yt.cat.teaching': 'On teaching', 'yt.dek.teaching': 'For teachers: what works in class, and why.',
      'yt.cat.personal': 'Personal videos', 'yt.dek.personal': 'Thinking out loud about reading, writing, work and time.',
      'yt.cat.shorts': 'Shorts', 'yt.dek.shorts': 'One-minute thoughts.',
      'yt.open': 'Open on YouTube', 'yt.play': 'Play',
      'work.h': 'Work', 'work.dek': "Things I'm building outside the classroom.",
      'work.live': 'Live', 'work.soon': 'Coming soon',
      'work.ielts': 'An IELTS preparation platform with full Listening and Reading tests, built to take learners toward band 9 writing and speaking.',
      'work.podcastT': 'Teacher podcast',
      'work.podcast': 'Conversations on methodology: preparing beginners for exams, CELTA fundamentals (language vs skills), lesson staging.',
      'work.gameT': 'Gamification',
      'work.game': 'Designing reward and points systems that support motivation rather than replace it.',
      'about.h': 'About',
      'about.p1': "I've taught for about five years, from seven-year-olds in Starters to adults preparing for IELTS. I currently work at Rahimov School in Tashkent, where I lead the school's gamification and reward systems.",
      'about.p2': 'One question drives me: how do learners actually learn, and how much of that can a teacher influence? So I read second language acquisition research, pedagogy, psychology and philosophy, then test what I find in the classroom.',
      'about.p3': "I'm a human being, not a job title. I have a lot of interests, and I can't be defined by a single word, so I try to embrace the complexity of my passions: teaching, vibe-coding tools for EdTech, writing, poetry and literature, entrepreneurship, videos for Instagram and YouTube, and singing, just for myself. Each one has its own corner.",
      'about.elsewhere': "My Telegram channels",
      'ch.inspiring_teacher': "English teaching, mostly primary students",
      'ch.mrshokh_blog': "My blog in Uzbek",
      'ch.mrshokh_notes': "My notes",
      'ch.mrshokh_insights': "Key insights, in English only",
      'ch.mrshokh_poetry': "Poetry & literature",
      'ch.mrshokh_wantrepreneurship': "My curiosity about entrepreneurship",
      'ch.mrshokh_reminders': "We need reminders",
      'ch.classblog_4A': "My students' digital project",
      'about.cap': 'Qualifications & experience',
      'about.celta': 'Cambridge Certificate in Teaching English to Adults',
      'about.ctyl': 'International House Certificate in Teaching Young Learners',
      'about.ielts': 'Academic, overall band 8.0',
      'about.delta': 'In preparation',
      'about.expT': 'Experience', 'about.exp': '~5 years in the classroom',
      'sub.h': 'New essays, straight to your inbox.',
      'sub.p': 'No spam. One email when a new piece comes out.',
      'sub.cta': 'Subscribe on Substack',
      'footer.made': 'Written in Tashkent',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  var GISCUS = {
    repo: 'MrShokh-newcoder/teachershokh.github.io',
    repoId: 'R_kgDORtn81g',
    category: 'General',
    categoryId: 'DIC_kwDORtn81s4C5BOA'
  };

  var root = document.documentElement;
  var lang = 'en';
  var filter = 'all';
  var substack = FALLBACK_SUBSTACK;
  var currentSlug = null;
  var siteTitle = document.title;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toDate(iso) {
    // 'YYYY-MM-DD' is treated as a calendar day; full timestamps as UTC.
    return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(iso + 'T12:00:00Z') : new Date(iso);
  }
  function fmtDate(iso) {
    var d = toDate(iso);
    if (isNaN(d)) return '';
    var m = T[lang].months[d.getUTCMonth()], day = d.getUTCDate(), y = d.getUTCFullYear();
    return lang === 'uz' ? y + '-yil ' + day + '-' + m : day + ' ' + m + ' ' + y;
  }
  function plain(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* ---------- Data: on-site essays + Substack ---------- */
  var siteArticles = (window.ARTICLES || []).map(function (a) {
    var text = plain(a.body);
    var firstP = plain((a.body.match(/<p>([\s\S]*?)<\/p>/) || [, a.body])[1]);
    return {
      kind: 'site', slug: a.slug, title: a.title, date: a.date, lang: a.lang || 'en', body: a.body,
      subtitle: firstP.length > 150 ? firstP.slice(0, 147).replace(/\s+\S*$/, '') + '…' : firstP,
      minutes: Math.max(1, Math.round(text.split(' ').length / 200)),
      url: '#' + a.slug
    };
  });
  var BASE = document.body.getAttribute('data-base') || '';   // '../' on pages one folder down
  var TG_ORDER = ['tips', 'method', 'classroom', 'games', 'books', 'reflections', 'oneliners'];
  var tgPosts = (window.TELEGRAM || []).map(function (p) {
    return {
      kind: 'telegram', slug: p.slug, title: p.title, fullTitle: p.fullTitle || p.title, date: p.date, lang: p.lang,
      body: p.html, minutes: p.minutes, tags: p.tags || [], cover: BASE + p.cover, url: p.url, media: p.media || {},
      excerpt: p.excerpt, cat: p.cat || 'reflections', id: p.id
    };
  });
  // within a topic: the numbered tips series reads in order, everything else newest first
  function tgInCat(cat) {
    var list = tgPosts.filter(function (p) { return p.cat === cat; });
    return cat === 'tips' ? list.sort(function (a, b) { return a.id - b.id; }) : list.sort(function (a, b) { return toDate(b.date) - toDate(a.date); });
  }
  // old links pointed at teachershokh.blog/#tg-N; posts now live on the Telegram page
  if (/^#tg-\d+$/.test(location.hash) && !BASE && document.getElementById('featured')) location.replace('telegram/' + location.hash);
  function bySlug(slug) {
    var all = siteArticles.concat(tgPosts);
    for (var i = 0; i < all.length; i++) if (all[i].slug === slug) return all[i];
    return null;
  }
  var ON_WRITING = document.body.classList.contains('page-writing');
  function substackItems() {
    return substack.map(function (p) {
      var key = (String(p.url || '').match(/\/p\/([^/?#]+)/) || [, String(p.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')])[1];
      return { kind: 'substack', slug: 's-' + key, title: p.title, subtitle: p.subtitle, url: p.url, date: p.date,
        lang: p.lang || 'uz', image: p.image && p.image !== 'None' ? p.image : null, minutes: p.minutes, html: p.html || '' };
    });
  }
  function everyPost() {
    var list = siteArticles.concat(substackItems());
    list.sort(function (a, b) { return toDate(b.date) - toDate(a.date); });
    return list;
  }
  function allPosts() {
    var list = everyPost();
    return filter === 'all' ? list : list.filter(function (p) { return p.lang === filter; });
  }
  // every essay and Substack post opens on the Writing page
  function linkAttrs(p) {
    return 'href="' + (ON_WRITING ? '' : BASE + 'writing/') + '#' + esc(p.slug) + '"';
  }
  // old links to an essay on the home page (teachershokh.blog/#slug) now go to the Writing page
  (function () {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!BASE && h && document.getElementById('featured')) {
      for (var i = 0; i < siteArticles.length; i++) if (siteArticles[i].slug === h) { location.replace('writing/#' + h); break; }
    }
  })();

  /* ---------- Language ---------- */
  function applyLang(next) {
    var dict = T[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-html')];
      if (typeof v === 'string') el.innerHTML = v; // authored strings only
    });
    renderPosts();
    renderTelegram();
    renderWatch();
    if (currentSlug) { renderReaderMeta(bySlug(currentSlug)); giscusConfig({ lang: lang }); }
  }

  /* ---------- Theme ---------- */
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function giscusTheme() { return currentTheme() === 'dark' ? 'dark_dimmed' : 'transparent_dark'; }
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('ts-theme', next);
    giscusConfig({ theme: giscusTheme() });
    var cur = currentSlug && bySlug(currentSlug);
    if (cur && cur.kind === 'telegram') loadTelegramComments(cur.id);
  });

  /* ---------- Writing list ---------- */
  document.querySelectorAll('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      renderPosts();
    });
  });

  function metaBits(p, dict) {
    return '<time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' +
      (p.minutes ? '<span>' + p.minutes + ' ' + esc(dict['post.min']) + '</span>' : '') +
      '<span>' + esc((p.lang || '').toUpperCase()) + '</span>' +
      (p.kind === 'substack' ? '<span class="src">Substack ↗</span>' : '');
  }

  function renderPosts() {
    var dict = T[lang];
    var featured = document.getElementById('featured');
    var list = document.getElementById('postIndex');
    if (!featured || !list) return;
    var posts = allPosts();
    if (!posts.length) { featured.innerHTML = ''; list.innerHTML = ''; return; }

    var f = posts[0];
    var media = f.image
      ? '<a class="feature__media" ' + linkAttrs(f) + ' tabindex="-1" aria-hidden="true"><img src="' + esc(f.image) + '" alt="" loading="lazy"></a>'
      : '<a class="feature__media feature__media--empty" ' + linkAttrs(f) + ' tabindex="-1" aria-hidden="true"><span>' + esc(f.title.charAt(0)) + '</span></a>';
    featured.innerHTML =
      media +
      '<div class="feature__body">' +
        '<div class="feature__meta mono"><span class="tag">' + esc(dict['post.latest']) + '</span>' + metaBits(f, dict) + '</div>' +
        '<h3><a ' + linkAttrs(f) + '>' + esc(f.title) + '</a></h3>' +
        (f.subtitle ? '<p>' + esc(f.subtitle) + '</p>' : '') +
        '<a class="readlink" ' + linkAttrs(f) + '>' + esc(dict['post.read']) + '</a>' +
      '</div>';

    var limit = parseInt(list.getAttribute('data-limit'), 10);   // the home page shows only a few
    list.innerHTML = posts.slice(1, limit ? limit + 1 : undefined).map(function (p) {
      return '<li><a ' + linkAttrs(p) + '>' +
        '<div><h4>' + esc(p.title) + '</h4>' + (p.subtitle ? '<p>' + esc(p.subtitle) + '</p>' : '') + '</div>' +
        '<span class="when mono"><time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' +
        '<span>' + esc((p.lang || '').toUpperCase()) + (p.kind === 'substack' ? ' · Substack ↗' : '') + '</span></span>' +
        '</a></li>';
    }).join('');
  }

  function loadSubstack() {
    if (location.protocol === 'file:' || !(document.getElementById('featured') || ON_WRITING)) return;
    fetch(BASE + 'data/substack.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        if (data && Array.isArray(data.posts) && data.posts.length) { substack = data.posts; renderPosts(); renderWritingApp(true); }
      })
      .catch(function () { /* keep fallback */ });
  }

  /* ---------- Writing page: Articles & Posts (list on the left, the piece on the right) ---------- */
  var ap = document.querySelector('[data-ap]');
  var apQuery = '', apFilter = 'all', apCurrent = null;
  function apItems() {
    var q = apQuery.trim().toLowerCase();
    return everyPost().filter(function (p) {
      if (apFilter !== 'all' && p.lang !== apFilter) return false;
      return !q || (p.title + ' ' + (p.subtitle || '')).toLowerCase().indexOf(q) > -1;
    });
  }
  function renderWritingApp(refreshArticle) {
    if (!ap) return;
    var all = everyPost(), items = apItems(), list = document.getElementById('apList');
    var order = {}; all.forEach(function (p, i) { order[p.slug] = all.length - i; });
    list.innerHTML = items.length ? items.map(function (p) {
      var n = order[p.slug];
      return '<li><a href="#' + esc(p.slug) + '"' + (p.slug === apCurrent ? ' aria-current="page"' : '') + '>' +
        '<span class="ap-list__n mono">' + n + '.</span><span class="ap-list__t" lang="' + esc(p.lang) + '">' + esc(p.title) + '</span>' +
        '<span class="ap-list__m mono">' + esc(fmtDate(p.date)) + ' · ' + esc((p.lang || '').toUpperCase()) + (p.kind === 'substack' ? ' · Substack' : '') + '</span></a></li>';
    }).join('') : '<li class="ap-list__empty">' + esc(T[lang]['ap.none']) + '</li>';
    if (refreshArticle && apCurrent) apOpen(apCurrent, false);
  }
  function apOpen(slug, scroll) {
    if (!ap) return;
    var all = everyPost(), i = -1;
    for (var k = 0; k < all.length; k++) if (all[k].slug === slug) { i = k; break; }
    if (i < 0) { i = 0; slug = all[0] && all[0].slug; }
    var p = all[i], dict = T[lang];
    if (!p) return;
    var changed = apCurrent !== slug;
    apCurrent = slug;
    document.getElementById('apMeta').innerHTML = '<time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' +
      (p.minutes ? '<span>' + p.minutes + ' ' + esc(dict['post.min']) + '</span>' : '') + '<span>' + esc((p.lang || '').toUpperCase()) + '</span>' +
      (p.kind === 'substack' ? '<span>Substack</span>' : '');
    var title = document.getElementById('apTitle');
    title.textContent = p.title; title.lang = p.lang;
    var body = document.getElementById('apBody');
    body.lang = p.lang;
    var cover = document.getElementById('apCover');
    if (p.kind === 'site') {
      cover.hidden = true;
      body.innerHTML = p.body;   // authored: articles.js
    } else {
      cover.hidden = !(p.image && !p.html);
      if (!cover.hidden) cover.querySelector('img').src = p.image;
      // Substack posts: the post itself (from the feed), or its summary until the feed has been synced
      body.innerHTML = p.html ||
        (p.subtitle ? '<p class="ap-dek">' + esc(p.subtitle) + '</p>' : '');
      body.insertAdjacentHTML('beforeend', '<p class="ap-src"><a class="btn btn--solid" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
        esc(dict[p.html ? 'ap.onSubstack' : 'ap.readSubstack']) + ' <span aria-hidden="true">↗</span></a></p>');
    }
    var older = all[i + 1], newer = all[i - 1];
    document.getElementById('apNav').innerHTML =
      (newer ? '<a class="ap-nav__newer" href="#' + esc(newer.slug) + '"><span class="mono">← ' + esc(dict['ap.newer']) + '</span><span lang="' + esc(newer.lang) + '">' + esc(newer.title) + '</span></a>' : '<span></span>') +
      (older ? '<a class="ap-nav__older" href="#' + esc(older.slug) + '"><span class="mono">' + esc(dict['ap.older']) + ' →</span><span lang="' + esc(older.lang) + '">' + esc(older.title) + '</span></a>' : '');
    var comments = document.getElementById('apComments');
    if (p.kind === 'site') {
      comments.hidden = false;
      if (changed || !document.querySelector('#giscus iframe, #giscus script')) loadGiscus(p.slug);
      document.getElementById('apCommentsSubstack').hidden = true;
    } else {
      comments.hidden = true;
      document.getElementById('giscus').innerHTML = '';
      var cs = document.getElementById('apCommentsSubstack');
      cs.hidden = false;
      cs.querySelector('a').href = p.url + (p.url.indexOf('?') > -1 ? '&' : '?') + 'comments=true';
    }
    document.title = p.title + ' · Teacher Shokh';
    document.querySelectorAll('#apList a').forEach(function (a) {
      if (a.getAttribute('href') === '#' + slug) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (scroll) {
      var top = ap.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > top) window.scrollTo(0, top);
    }
    if (window.matchMedia('(max-width: 880px)').matches) apSide(false);
  }
  function apSide(open) {
    if (!ap) return;
    var mobile = window.matchMedia('(max-width: 880px)').matches;
    ap.classList.toggle(mobile ? 'is-drawer-open' : 'is-collapsed', mobile ? open : !open);
    if (!mobile) store('ts-ap-side', open ? 'open' : 'closed');
    document.getElementById('apToggle').setAttribute('aria-expanded', String(open));
  }
  function apSideIsOpen() {
    return window.matchMedia('(max-width: 880px)').matches ? ap.classList.contains('is-drawer-open') : !ap.classList.contains('is-collapsed');
  }
  if (ap) {
    try { if (localStorage.getItem('ts-ap-side') === 'closed' && !window.matchMedia('(max-width: 880px)').matches) ap.classList.add('is-collapsed'); } catch (e) {}
    document.getElementById('apToggle').setAttribute('aria-expanded', String(apSideIsOpen()));
    document.getElementById('apToggle').addEventListener('click', function () { apSide(!apSideIsOpen()); });
    document.getElementById('apScrim').addEventListener('click', function () { apSide(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ap.classList.contains('is-drawer-open')) apSide(false); });
    document.getElementById('apList').addEventListener('click', function (e) {
      if (e.target.closest('a') && window.matchMedia('(max-width: 880px)').matches) apSide(false);
    });
    document.getElementById('apSearch').addEventListener('input', function (e) { apQuery = e.target.value; renderWritingApp(false); });
    document.querySelectorAll('[data-ap-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        apFilter = b.getAttribute('data-ap-filter');
        document.querySelectorAll('[data-ap-filter]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        renderWritingApp(false);
      });
    });
    window.addEventListener('hashchange', function () { apOpen(decodeURIComponent(location.hash.slice(1)), true); });
    renderWritingApp(false);
    apOpen(decodeURIComponent(location.hash.slice(1)), false);
  }

  /* ---------- Telegram page: posts by topic ---------- */
  var tgFilter = 'all', TG_PREVIEW = 6, tgOpen = {};
  function mediaLabel(m, dict) {
    var bits = [];
    if (m.photos) bits.push(dict['tg.photos'].replace('{n}', m.photos));
    if (m.video) bits.push(dict['tg.video']);
    if (m.doc) bits.push(dict['tg.file']);
    return bits.join(', ');
  }
  function tgCard(p, cat) {
    var meta = '<span class="tg-card__meta mono"><time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time><span>' + esc(p.lang.toUpperCase()) + '</span></span>';
    if (cat === 'oneliners') {
      var stub = p.title === 'Quote';
      var rest = (p.excerpt || '').replace(/^…/, '');
      var line = stub ? rest : (rest && rest !== p.title ? p.title.replace(/…$/, '') + ' ' + rest : p.title);
      return '<li><a class="tg-quote" href="#' + esc(p.slug) + '">' +
        '<span class="tg-quote__text" lang="' + esc(p.lang) + '">' + esc(line) + '</span>' + meta + '</a></li>';
    }
    return '<li><a class="tg-card" href="#' + esc(p.slug) + '">' +
      '<span class="tg-card__img"><img src="' + esc(p.cover) + '" alt="" width="1200" height="750" loading="lazy" decoding="async"></span>' +
      meta + '<span class="tg-card__title" lang="' + esc(p.lang) + '">' + esc(p.title) + '</span>' +
      (p.excerpt && p.excerpt !== p.title ? '<span class="tg-card__ex" lang="' + esc(p.lang) + '">' + esc(p.excerpt) + '</span>' : '') +
      '</a></li>';
  }
  function renderTelegram() {
    var lists = document.querySelectorAll('[data-tg-list]');
    if (!lists.length) return;
    var dict = T[lang];
    lists.forEach(function (ul) {
      var cat = ul.getAttribute('data-tg-list');
      var all = tgInCat(cat).filter(function (p) { return tgFilter === 'all' || p.lang === tgFilter; });
      var shown = tgOpen[cat] ? all : all.slice(0, TG_PREVIEW);
      ul.innerHTML = shown.map(function (p) { return tgCard(p, cat); }).join('');
      var section = ul.closest('[data-tg-cat]');
      section.hidden = !all.length;
      section.querySelector('.rl__count').textContent = all.length;
      var btn = section.querySelector('[data-tg-more]');
      btn.hidden = all.length <= TG_PREVIEW;
      btn.textContent = tgOpen[cat] ? dict['tg.showLess'] : dict['tg.showAll'].replace('{n}', all.length);
      var chip = document.querySelector('[data-tg-chip="' + cat + '"] .tg-chip__n');
      if (chip) chip.textContent = all.length;
    });
    var total = document.getElementById('tgTotal');
    if (total) total.textContent = tgPosts.filter(function (p) { return tgFilter === 'all' || p.lang === tgFilter; }).length;
  }
  document.querySelectorAll('[data-tg-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      tgFilter = b.getAttribute('data-tg-filter');
      document.querySelectorAll('[data-tg-filter]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderTelegram();
    });
  });
  document.querySelectorAll('[data-tg-more]').forEach(function (b) {
    b.addEventListener('click', function () {
      var cat = b.getAttribute('data-tg-more');
      tgOpen[cat] = !tgOpen[cat];
      renderTelegram();
      if (!tgOpen[cat]) document.getElementById('cat-' + cat).scrollIntoView();
    });
  });

  /* ---------- Watch: YouTube videos, played in place ---------- */
  var YT = window.YOUTUBE || { channels: {}, videos: [] };
  var YT_PREVIEW = { teaching: 6, personal: 6, shorts: 10 }, ytOpen = {}, ytPlaying = null, ytBuilt = false;
  function ytTitle(t) {
    return String(t || '').replace(/\s*\|\s*Teacher Shokh\s*$/i, '').replace(/#vlog\s*(\d+)/i, '· vlog $1')
      .replace(/\s*#[\wÀ-ɏ]+/g, '').trim();
  }
  function ytDur(s) {
    if (!s) return '';
    var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return (h ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (x < 10 ? '0' : '') + x;
  }
  function ytUrl(v) { return v.short ? 'https://www.youtube.com/shorts/' + v.id : 'https://www.youtube.com/watch?v=' + v.id; }
  function ytById(id) { for (var i = 0; i < YT.videos.length; i++) if (YT.videos[i].id === id) return YT.videos[i]; return null; }
  function ytIn(key) {
    return YT.videos.filter(function (v) { return key === 'shorts' ? v.short : v.ch === key && !v.short; })
      .sort(function (a, b) { return toDate(b.date) - toDate(a.date); });
  }
  function ytThumb(v) {
    return '<button type="button" class="yt__thumb" data-yt-play="' + esc(v.id) + '" aria-label="' + esc(T[lang]['yt.play'] + ': ' + ytTitle(v.title)) + '">' +
      '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" width="480" height="360" loading="lazy" decoding="async">' +
      '<span class="yt__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5v14l11-7z"/></svg></span>' +
      (v.secs ? '<span class="yt__dur mono">' + ytDur(v.secs) + '</span>' : '') + '</button>';
  }
  function ytCard(v, hide) {
    var l = v.lang || 'en';
    return '<li class="yt" id="v-' + esc(v.id) + '"' + (hide ? ' hidden' : '') + '>' +
      '<div class="yt__media">' + ytThumb(v) + '</div>' +
      '<span class="tg-card__meta mono"><time datetime="' + esc(v.date) + '">' + esc(fmtDate(v.date)) + '</time><span>' + esc(l.toUpperCase()) + '</span></span>' +
      '<h3 class="yt__title" lang="' + esc(l) + '">' + esc(ytTitle(v.title)) + '</h3>' +
      '<a class="readlink yt__open" href="' + esc(ytUrl(v)) + '" target="_blank" rel="noopener"><span data-yt-open>' + esc(T[lang]['yt.open']) + '</span> <span aria-hidden="true">↗</span></a></li>';
  }
  function ytPlay(id, autoplay) {
    var v = ytById(id), li = document.getElementById('v-' + id);
    if (!v || !li) return;
    if (ytPlaying && ytPlaying !== id) ytStop(ytPlaying);
    li.hidden = false;
    li.querySelector('.yt__media').innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?rel=0&playsinline=1' + (autoplay ? '&autoplay=1' : '') + '" title="' + esc(ytTitle(v.title)) + '"' +
      ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
      ' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    li.classList.add('is-playing');
    ytPlaying = id;
  }
  function ytStop(id) {
    var v = ytById(id), li = document.getElementById('v-' + id);
    if (v && li) { li.querySelector('.yt__media').innerHTML = ytThumb(v); li.classList.remove('is-playing'); }
    if (ytPlaying === id) ytPlaying = null;
  }
  function ytSync() {   // counts and show-all buttons; cards are built once so a playing video survives
    var dict = T[lang];
    var total = document.getElementById('ytTotal');
    if (total) total.textContent = YT.videos.length;
    document.querySelectorAll('[data-yt-list]').forEach(function (ul) {
      var key = ul.getAttribute('data-yt-list'), n = ytIn(key).length, max = YT_PREVIEW[key] || 6;
      var section = ul.closest('section');
      section.hidden = !n;
      section.querySelector('.rl__count').textContent = n;
      [].forEach.call(ul.children, function (li, i) { if (i >= max && li.id !== 'v-' + ytPlaying) li.hidden = !ytOpen[key]; });
      var btn = section.querySelector('[data-yt-more]');
      btn.hidden = n <= max;
      btn.textContent = ytOpen[key] ? dict['tg.showLess'] : dict['tg.showAll'].replace('{n}', n);
      var chip = document.querySelector('[data-yt-chip="' + key + '"] .tg-chip__n');
      if (chip) chip.textContent = n;
    });
  }
  function renderWatch() {
    var homeYt = document.querySelector('[data-yt-home]');
    if (homeYt && !homeYt.children.length) {   // home page: the two newest teaching videos and the newest personal one
      homeYt.innerHTML = ytIn('teaching').slice(0, 2).concat(ytIn('personal').slice(0, 1))
        .map(function (v) { return ytCard(v, false); }).join('');
    }
    var lists = document.querySelectorAll('[data-yt-list]');
    if (!lists.length) return;
    if (!ytBuilt) {
      lists.forEach(function (ul) {
        var key = ul.getAttribute('data-yt-list'), max = YT_PREVIEW[key] || 6;
        ul.innerHTML = ytIn(key).map(function (v, i) { return ytCard(v, i >= max); }).join('');
      });
      ytBuilt = true;
    } else {   // language change: relabel in place
      var dict = T[lang];
      document.querySelectorAll('.yt').forEach(function (li) {
        var v = ytById(li.id.slice(2));
        if (!v) return;
        li.querySelector('time').textContent = fmtDate(v.date);
        li.querySelector('[data-yt-open]').textContent = dict['yt.open'];
        var b = li.querySelector('.yt__thumb');
        if (b) b.setAttribute('aria-label', dict['yt.play'] + ': ' + ytTitle(v.title));
      });
    }
    ytSync();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-yt-play]');
    if (b) { ytPlay(b.getAttribute('data-yt-play'), true); return; }
    var more = e.target.closest && e.target.closest('[data-yt-more]');
    if (more) {
      var key = more.getAttribute('data-yt-more');
      ytOpen[key] = !ytOpen[key];
      ytSync();
      if (!ytOpen[key]) document.getElementById('ch-' + key).scrollIntoView();
    }
  });
  function ytFromHash() {   // watch/#v-ID opens that video, ready to play
    var m = /^#v-([\w-]{11})$/.exec(location.hash);
    if (!m || !document.getElementById('v-' + m[1])) return;
    ytPlay(m[1], false);
    document.getElementById('v-' + m[1]).scrollIntoView({ block: 'center' });
  }
  window.addEventListener('hashchange', ytFromHash);

  /* ---------- Reader ---------- */
  var home = document.getElementById('home');
  var reader = document.getElementById('reader');

  function renderReaderMeta(a) {
    if (!a) return;
    var dict = T[lang];
    document.getElementById('readerMeta').innerHTML = metaBits(a, dict);
    var isTg = a.kind === 'telegram';
    var back = document.getElementById('backLink');
    back.setAttribute('href', isTg ? '#cat-' + a.cat : '#writing');
    back.querySelector('[data-i18n]').textContent = isTg ? dict['tg.back'] : dict['reader.back'];
    var mediaEl = document.getElementById('readerMedia');
    if (isTg) {
      var m = mediaLabel(a.media, dict);
      mediaEl.innerHTML = (m ? esc(dict['tg.note'].replace('{m}', m)) + ' ' : '') +
        '<a class="readlink" href="' + esc(a.url) + '" target="_blank" rel="noopener">' + esc(dict['tg.open']) + '</a>';
    }
    mediaEl.hidden = !isTg;
    var next = isTg ? tgInCat(a.cat) : siteArticles.slice().sort(function (x, y) { return toDate(y.date) - toDate(x.date); });
    var i = next.indexOf(a), n = next[i + 1] || next[0];
    document.getElementById('readerNext').innerHTML = (n && n !== a)
      ? '<span class="mono">' + esc(dict[isTg ? 'tg.next' : 'reader.next']) + '</span><a href="#' + esc(n.slug) + '">' + esc(n.title) + ' →</a>'
      : '';
  }

  function openArticle(a) {
    currentSlug = a.slug;
    document.getElementById('readerTitle').textContent = a.fullTitle || a.title;
    var body = document.getElementById('readerBody');
    // authored content: articles.js, or the author's own Telegram posts (telegram.js)
    body.innerHTML = a.kind === 'telegram' ? '<div class="tg-text">' + a.body + '</div>' : a.body;
    var cover = document.getElementById('readerCover');
    cover.hidden = !a.cover;
    if (a.cover) document.getElementById('readerCoverImg').src = a.cover;
    var tags = document.getElementById('readerTags');
    tags.hidden = !(a.tags && a.tags.length);
    tags.innerHTML = (a.tags || []).map(function (t) { return '<span class="mono">' + esc(t) + '</span>'; }).join('');
    body.lang = a.lang;
    document.getElementById('readerTitle').lang = a.lang;
    renderReaderMeta(a);
    home.hidden = true;
    reader.hidden = false;
    document.title = a.title + ' · Teacher Shokh';
    window.scrollTo(0, 0);
    if (a.kind === 'telegram') loadTelegramComments(a.id); else loadGiscus(a.slug);
  }

  function closeArticle() {
    if (!currentSlug) return;
    currentSlug = null;
    reader.hidden = true;
    home.hidden = false;
    document.title = siteTitle;
    document.getElementById('giscus').innerHTML = '';
  }

  /* ---------- Comments: Telegram posts use the channel's own discussion group ---------- */
  // The widget shows the comments under the post in @inspiring_teacher's linked group, and readers
  // can reply from here after logging in with Telegram, so the site and the channel share one thread.
  var TG_CHANNEL = 'inspiring_teacher', tgCommentsIO = null;
  function loadTelegramComments(id) {
    var box = document.getElementById('giscus');
    box.innerHTML = '';
    if (tgCommentsIO) { tgCommentsIO.disconnect(); tgCommentsIO = null; }
    var mount = function () {
      if (!box.isConnected || currentSlug !== 'tg-' + id) return;
      var accent = currentTheme() === 'dark' ? '36B872' : '01B36C';
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://telegram.org/js/telegram-widget.js?24';
      s.setAttribute('data-telegram-discussion', TG_CHANNEL + '/' + id);
      s.setAttribute('data-comments-limit', '10');
      s.setAttribute('data-color', accent);
      s.setAttribute('data-dark', '1');
      s.setAttribute('data-dark-color', accent);
      box.appendChild(s);
      var p = document.createElement('p');
      p.className = 'tg-discuss';
      p.innerHTML = '<a class="readlink" href="https://t.me/' + TG_CHANNEL + '/' + encodeURIComponent(id) + '" target="_blank" rel="noopener">' +
        esc(T[lang]['tg.discuss']) + ' ↗</a>';
      box.appendChild(p);
    };
    // load it only when the reader scrolls near the comments
    if ('IntersectionObserver' in window) {
      tgCommentsIO = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { tgCommentsIO.disconnect(); tgCommentsIO = null; mount(); }
      }, { rootMargin: '600px 0px' });
      tgCommentsIO.observe(box);
    } else mount();
  }

  /* ---------- Comments on essays (Giscus) ---------- */
  function loadGiscus(slug) {
    var box = document.getElementById('giscus');
    box.innerHTML = '';
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    var cfg = {
      'data-repo': GISCUS.repo, 'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category, 'data-category-id': GISCUS.categoryId,
      'data-mapping': 'specific', 'data-term': slug, 'data-strict': '0',
      'data-reactions-enabled': '1', 'data-emit-metadata': '0', 'data-input-position': 'top',
      'data-theme': giscusTheme(), 'data-lang': lang, 'data-loading': 'lazy'
    };
    Object.keys(cfg).forEach(function (k) { s.setAttribute(k, cfg[k]); });
    s.crossOrigin = 'anonymous';
    s.async = true;
    box.appendChild(s);
  }
  function giscusConfig(conf) {
    var f = document.querySelector('iframe.giscus-frame');
    if (f && f.contentWindow) f.contentWindow.postMessage({ giscus: { setConfig: conf } }, 'https://giscus.app');
  }

  /* ---------- Router: #slug opens an essay, any other hash is a section ---------- */
  function route() {
    if (!reader || !home) return;
    var hash = decodeURIComponent(location.hash.slice(1));
    var a = hash && bySlug(hash);
    if (a) { openArticle(a); return; }
    var wasReading = !!currentSlug;
    closeArticle();
    if (wasReading) {
      var target = hash && document.getElementById(hash);
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }
  window.addEventListener('hashchange', route);

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    if (!('IntersectionObserver' in window) || currentSlug) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.section, .pull, .subscribe').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal'); io.observe(el); }
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  applyLang(lang);
  route();
  setupReveal();
  ytFromHash();
  loadSubstack();
})();
