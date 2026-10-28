# S.We.T.A. rider tracker

A Cloudflare Worker with a D1 database. The strip and the map send one small message per stop visit and per S.We.T.A. click. The Worker serves a private dashboard at `/dash` and a read API at `/api/*`.

## What is stored
- Time, stop, destination stop (for strip/map clicks), site and path, strip or map.
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
