/* Teacher Shokh — site script: language, theme, posts */
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
    uz: {
      skip: "Asosiy qismga o'tish",
      edition: 'Toshkent · Ingliz tili metodikasi',
      'nav.writing': 'Maqolalar', 'nav.watch': 'Videolar', 'nav.work': 'Loyihalar', 'nav.about': 'Men haqimda',
      'hero.kicker': "O'qituvchi daftari",
      'hero.title': "Yaxshi o'qitish&nbsp;— <em>hunar.</em><br>Bular ustaxonamdan qaydlar.",
      'hero.lede': "Men Shokh — Toshkentdagi ingliz tili o'qituvchisiman. Yosh o'quvchilar, o'smirlar va IELTS nomzodlari bilan ishlayman. Metodika haqida yozaman: tadqiqotlar nima deydi, sinfda aslida nima bo'ladi va ikkalasi orasidagi masofa.",
      'facts.teach': "O'qitaman", 'facts.train': 'Malaka', 'facts.now': 'Hozir',
      'facts.delta': 'DELTA (jarayonda)', 'facts.city': 'Toshkent',
      'hero.cta1': "So'nggi maqolalar", 'hero.cta2': "Obuna bo'lish",
      'writing.h': 'Maqolalar',
      'writing.dek': "O'qitish, o'rganish va ikkalasini ham yaxshi bajarish hunari haqida esselar.",
      'filter.all': 'Hammasi', 'reader.back': 'Barcha maqolalar', 'reader.comments': 'Izohlar', 'reader.next': 'Keyingi maqola',
      'writing.all': "Barcha maqolalar Substack'da",
      'post.latest': "So'nggi", 'post.read': "Maqolani o'qish →", 'post.min': 'daqiqa',
      'pull.q': '“Yuragimni bolalarga beraman.”', 'pull.src': 'kitob nomi, 1969',
      'watch.h': 'Videolar',
      'watch.dek': "YouTube'da: yangi o'qituvchilar uchun metodika, aniq va amaliy.",
      'watch.go': 'Kanalni ochish →',
      'watch.s1': "Yosh o'quvchilar va o'smirlarni o'qitish",
      'watch.s2': 'Kattalar uchun CELTA freymvorklari',
      'watch.s3': 'Sinfni boshqarish',
      'watch.s4': "“How to teach…” turkumi: lug'at, grammatika, ko'nikmalar",
      'watch.s5': "O'qiyotgan ELT kitoblarimdan g'oyalar",
      'work.h': 'Loyihalar', 'work.dek': 'Darsdan tashqarida qurayotgan narsalarim.',
      'work.live': 'Ishlamoqda', 'work.soon': 'Tez orada',
      'work.ielts': "IELTS'ga tayyorlanish platformasi: to'liq Listening va Reading testlari. Maqsad: yozish va gapirishda 9 ball darajasiga olib chiqish.",
      'work.podcastT': "O'qituvchilar podkasti",
      'work.podcast': "Metodika haqida suhbatlar: boshlang'ich o'quvchilarni imtihonga tayyorlash, CELTA asoslari (til va ko'nikmalar), dars bosqichlari.",
      'work.gameT': 'Geymifikatsiya',
      'work.game': "Motivatsiyani almashtirmaydigan, balki qo'llab-quvvatlaydigan rag'batlantirish va ball tizimlarini loyihalash.",
      'about.h': 'Men haqimda',
      'about.p1': "Taxminan besh yildan beri dars beraman: Starters'dagi yetti yoshlilardan tortib IELTS'ga tayyorlanayotgan kattalargacha. Hozir Toshkentdagi Rahimov School'da ishlayman va maktabning geymifikatsiya hamda rag'batlantirish tizimlariga mas'ulman.",
      'about.p2': "Meni bir savol qiziqtiradi: o'quvchi aslida qanday o'rganadi va o'qituvchi bunga qanchalik ta'sir qila oladi? Shu sababli ikkinchi tilni o'zlashtirish (SLA) tadqiqotlarini, pedagogika, psixologiya va falsafani o'qiyman, keyin ularni sinfda sinab ko'raman.",
      'about.cap': 'Malaka va tajriba',
      'about.celta': "Cambridge, kattalarga ingliz tilini o'qitish sertifikati",
      'about.ctyl': "International House, yosh o'quvchilarni o'qitish sertifikati",
      'about.ielts': 'Academic, umumiy 8.0',
      'about.delta': 'Tayyorlanmoqda',
      'about.expT': 'Tajriba', 'about.exp': '~5 yil sinfda',
      'sub.h': "Yangi maqolalar to'g'ridan-to'g'ri pochtangizga.",
      'sub.p': 'Spam yo\'q. Faqat yangi maqola chiqqanda xat keladi.',
      'sub.cta': "Substack'da obuna bo'lish",
      'footer.made': 'Toshkentda yozildi',
      months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr']
    },
    en: {
      skip: 'Skip to content',
      edition: 'Tashkent · English teaching methodology',
      'nav.writing': 'Writing', 'nav.watch': 'Watch', 'nav.work': 'Work', 'nav.about': 'About',
      'hero.kicker': "A teacher's notebook",
      'hero.title': 'Teaching well is a <em>craft.</em><br>These are notes from the workshop.',
      'hero.lede': "I'm Shokh, an English teacher in Tashkent. I work with young learners, teens and IELTS candidates, and I write about methodology: what the research says, what actually happens in the classroom, and the distance between the two.",
      'facts.teach': 'Teaching', 'facts.train': 'Training', 'facts.now': 'Now',
      'facts.delta': 'DELTA (in progress)', 'facts.city': 'Tashkent',
      'hero.cta1': 'Latest writing', 'hero.cta2': 'Subscribe',
      'writing.h': 'Writing',
      'writing.dek': 'Essays on teaching, learning, and the craft of doing both well.',
      'filter.all': 'All', 'reader.back': 'All writing', 'reader.comments': 'Comments', 'reader.next': 'Next essay',
      'writing.all': 'All writing on Substack',
      'post.latest': 'Latest', 'post.read': 'Read the essay →', 'post.min': 'min read',
      'pull.q': '“I give my heart to children.”', 'pull.src': 'book title, 1969',
      'watch.h': 'Watch',
      'watch.dek': 'On YouTube: methodology for new teachers, made clear and practical.',
      'watch.go': 'Open the channel →',
      'watch.s1': 'Teaching young learners and teens',
      'watch.s2': 'CELTA frameworks for adult classes',
      'watch.s3': 'Classroom management',
      'watch.s4': 'The “How to teach…” series: vocabulary, grammar, skills',
      'watch.s5': "Ideas from the ELT books I'm reading",
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
  var lang = root.lang === 'en' ? 'en' : 'uz';
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
  function bySlug(slug) {
    for (var i = 0; i < siteArticles.length; i++) if (siteArticles[i].slug === slug) return siteArticles[i];
    return null;
  }
  function allPosts() {
    var list = siteArticles.concat(substack.map(function (p) {
      return { kind: 'substack', title: p.title, subtitle: p.subtitle, url: p.url, date: p.date, lang: p.lang || 'uz', image: p.image, minutes: p.minutes };
    }));
    list.sort(function (a, b) { return toDate(b.date) - toDate(a.date); });
    return filter === 'all' ? list : list.filter(function (p) { return p.lang === filter; });
  }
  function linkAttrs(p) {
    return p.kind === 'substack'
      ? 'href="' + esc(p.url) + '" target="_blank" rel="noopener"'
      : 'href="#' + esc(p.slug) + '"';
  }

  /* ---------- Language ---------- */
  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'uz';
    root.lang = lang;
    var dict = T[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-html')];
      if (typeof v === 'string') el.innerHTML = v; // authored strings only
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
    renderPosts();
    if (currentSlug) { renderReaderMeta(bySlug(currentSlug)); giscusConfig({ lang: lang }); }
    store('ts-lang', lang);
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-set-lang')); });
  });

  /* ---------- Theme ---------- */
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function giscusTheme() { return currentTheme() === 'dark' ? 'dark_dimmed' : 'light'; }
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('ts-theme', next);
    giscusConfig({ theme: giscusTheme() });
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

    list.innerHTML = posts.slice(1).map(function (p) {
      return '<li><a ' + linkAttrs(p) + '>' +
        '<div><h4>' + esc(p.title) + '</h4>' + (p.subtitle ? '<p>' + esc(p.subtitle) + '</p>' : '') + '</div>' +
        '<span class="when mono"><time datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' +
        '<span>' + esc((p.lang || '').toUpperCase()) + (p.kind === 'substack' ? ' · Substack ↗' : '') + '</span></span>' +
        '</a></li>';
    }).join('');
  }

  function loadSubstack() {
    if (location.protocol === 'file:') return;
    fetch('data/substack.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        if (data && Array.isArray(data.posts) && data.posts.length) { substack = data.posts; renderPosts(); }
      })
      .catch(function () { /* keep fallback */ });
  }

  /* ---------- Reader ---------- */
  var home = document.getElementById('home');
  var reader = document.getElementById('reader');

  function renderReaderMeta(a) {
    if (!a) return;
    var dict = T[lang];
    document.getElementById('readerMeta').innerHTML = metaBits(a, dict);
    var next = siteArticles.slice().sort(function (x, y) { return toDate(y.date) - toDate(x.date); });
    var i = next.indexOf(a), n = next[i + 1] || next[0];
    document.getElementById('readerNext').innerHTML = (n && n !== a)
      ? '<span class="mono">' + esc(dict['reader.next']) + '</span><a href="#' + esc(n.slug) + '">' + esc(n.title) + ' →</a>'
      : '';
  }

  function openArticle(a) {
    currentSlug = a.slug;
    document.getElementById('readerTitle').textContent = a.title;
    var body = document.getElementById('readerBody');
    body.innerHTML = a.body; // authored content from articles.js
    body.lang = a.lang;
    document.getElementById('readerTitle').lang = a.lang;
    renderReaderMeta(a);
    home.hidden = true;
    reader.hidden = false;
    document.title = a.title + ' · Teacher Shokh';
    window.scrollTo(0, 0);
    loadGiscus(a.slug);
  }

  function closeArticle() {
    if (!currentSlug) return;
    currentSlug = null;
    reader.hidden = true;
    home.hidden = false;
    document.title = siteTitle;
    document.getElementById('giscus').innerHTML = '';
  }

  /* ---------- Comments (Giscus) ---------- */
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
  loadSubstack();
})();
