# S.We.T.A. rider tracker

A Cloudflare Worker with a D1 database. The strip and the map send one small message per stop visit and per S.We.T.A. click. The Worker serves a private dashboard at `/dash` and a read API at `/api/*`.

## What is stored
- Time, stop, destination stop (for strip/map clicks), site and path, strip or map.
- Country, region and timezone from Cloudflare, the site the visitor came from (host name only), and phone / tablet / desktop.
- A rider key: a salted hash of IP + browser, cut to 16 characters. The raw IP is never stored.
- A random browser ID, passed along strip/map links (`?swt=`) so a trip across sites stays one rider.
- Detailed rows are deleted after 90 days. Daily totals per stop are kept.
- Do Not Track and Global Privacy Control: nothing is sent or counted.

## Files
- `worker.src.js`, `dash.html`, `schema.sql`, `wrangler.toml`
- `worker.js` is generated: `node tools/build-tracker.js` (this is the file that gets deployed)
- `config.json`: the Worker URL used by the strip. The map has `TRACK_URL` near the end of `index.html`.

## Deploy (one time)
1. `npm i -g wrangler && wrangler login`
2. `wrangler d1 create sweta`, then paste the `database_id` into `wrangler.toml`
3. `wrangler d1 execute sweta --remote --file=schema.sql`
4. Secrets: `wrangler secret put SALT` (any long random text), `wrangler secret put READ_TOKEN` (any long random text)
5. `wrangler deploy`. The Worker URL it prints is the endpoint.
6. Cloudflare dashboard > Zero Trust > Access > Applications: add a self-hosted app for `<worker-url>/dash` and `<worker-url>/api/*`, policy: allow your email (one-time code). Leave `/hit` outside the app.
7. Then set `ACCESS_TEAM` (`yourteam.cloudflareaccess.com`), `ACCESS_AUD` (the app's AUD tag) and optionally `ALLOWED_EMAILS` as secrets/vars, so the API checks the Access login.
8. Put the Worker URL in `config.json` (`{"endpoint": "https://..."}`) and in `TRACK_URL` in `index.html`, run `node tools/build-strip.js`, commit and push.

## Reading the data
- Dashboard: `<worker-url>/dash`
- API: `GET /api/summary?days=30`, `/api/riders`, `/api/rider?id=<rider>`, `/api/export?days=90&format=csv|json`, with `Authorization: Bearer <READ_TOKEN>`.

## Update: location, live view and downloads (October 2026)
1. D1 console: run the contents of `migrate-location.sql` once (adds the location columns and the `sheets` table). Until then the Worker keeps counting without location.
2. Apps Script, once per sheet:
   - Open the sheet > Extensions > Apps Script > add a file. Paste `apps-script/tags-read.gs` (Tags Generated sheet) or `apps-script/tcn-read.gs` (TCN sheet).
   - Replace `PASTE-THE-SAME-KEY-YOU-PUT-IN-CLOUDFLARE` with one long random key (the same key in both).
   - Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Copy the web app URL (ends in /exec).
   - If the project already has a `doGet`, rename this one's `doGet` and deploy it from its own Apps Script project instead.
3. Cloudflare > the Worker > Settings > Variables and secrets: add `SHEET_KEY` (the key, as a secret), `SHEET_TAGS_URL` and `SHEET_TCN_URL` (the two web app URLs).
4. Paste the new `worker.js` and deploy. Downloads refresh every 10 minutes while the dashboard is open, and daily from the cron.
