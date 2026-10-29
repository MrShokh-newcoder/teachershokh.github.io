# teachershokh.blog

Static site served by GitHub Pages (custom domain in `CNAME`).

- `index.html`, `styles.css`, `app.js`: the page, design, and UZ/EN text (all translations live in the `T` object in `app.js`).
- `articles.js`: essays hosted on the site. Each one opens at `teachershokh.blog/#<slug>` and has Giscus comments tied to that slug, so never rename a published slug.
- `data/substack.json`: Substack posts, refreshed every 6 hours by `.github/workflows/sync-substack.yml` (run it by hand from the repo's Actions tab with "Run workflow").

Add an essay: copy a block in `articles.js`, set a new `slug`, `title`, `date` (YYYY-MM-DD), `lang` (`uz` or `en`) and HTML `body`, then commit.

GitHub pauses scheduled workflows after 60 days with no commits. If the Substack list stops updating, open Actions and re-enable the workflow.
