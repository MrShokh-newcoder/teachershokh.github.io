# teachershokh.blog

Static site served by GitHub Pages (custom domain in `CNAME`).

- `index.html`, `styles.css`, `app.js`: the page, design and text (all interface text lives in `T.en` in `app.js`; the site is English-only, posts keep their own language).
- `articles.js`: essays hosted on the site. Each one opens at `teachershokh.blog/#<slug>` and has Giscus comments tied to that slug, so never rename a published slug.
- `data/substack.json`: Substack posts, refreshed every 6 hours by `.github/workflows/sync-substack.yml` (run it by hand from the repo's Actions tab with "Run workflow").
- `telegram/`, `telegram.js`, `covers/`: Telegram posts by topic.
- `watch/`, `youtube.js`: videos from @InspiringTeacherShokh and @mrshokh. Click a card to play it in place. New uploads are added daily by `.github/workflows/sync-youtube.yml`; to move a video, change its `ch` (`teaching` or `personal`) in `youtube.js`.
- `reading/`: the "What I read" page.

Add an essay: copy a block in `articles.js`, set a new `slug`, `title`, `date` (YYYY-MM-DD), `lang` (`uz` or `en`) and HTML `body`, then commit.

GitHub pauses scheduled workflows after 60 days with no commits. If the Substack or YouTube lists stop updating, open Actions and re-enable the workflow.
