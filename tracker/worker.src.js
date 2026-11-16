// S.We.T.A. rider tracker: a Cloudflare Worker that logs visits, keeps them 90 days, and serves a private dashboard.
// Generated worker.js = this file + the dashboard + the map data. Rebuild with: node tools/build-tracker.js
const META = /*META*/null;
const DASH_HTML = /*DASH*/"";

const RETAIN_DAYS = 90;
const SESSION_GAP = 30 * 60 * 1000;
const SHEET_TTL = 10 * 60 * 1000;
const TYPES = new Set(["view", "station", "click"]);
const SRCS = new Set(["strip", "map", "beacon"]); // beacon: a page counted without the strip (IDLA)
const BOT = /bot|crawl|spider|headless|lighthouse|preview|facebookexternalhit|slurp|python|curl\/|wget|puppeteer|playwright|selenium|phantomjs|go-http-client|node-fetch|axios|okhttp|scrapy|gptbot|chatgpt|perplexity|ccbot|bytespider|pagespeed|gtmetrix|pingdom|whatsapp|semrush|ahrefs/i;
// Bot types for the Sources tab, checked in this order. Counts only, by hour; nothing else about the visit is kept.
const BOT_KINDS = [
  ["search", /googlebot|google-inspectiontool|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandexbot|yandex|applebot|petalbot|sogou|seznambot|qwantify|mojeek/i],
  ["seo_ai", /ahrefsbot|ahrefs|semrushbot|semrush|mj12bot|dotbot|rogerbot|screaming frog|serpstatbot|dataforseobot|blexbot|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|anthropic-ai|perplexitybot|perplexity|ccbot|bytespider|amazonbot|meta-externalagent|cohere-ai|diffbot|youbot|ai2bot|timpibot|imagesiftbot/i],
  ["preview", /facebookexternalhit|facebookcatalog|twitterbot|slackbot|slack-imgproxy|discordbot|whatsapp|telegrambot|linkedinbot|pinterestbot|pinterest|skypeuripreview|iframely|embedly|redditbot|vkshare|tumblr|mastodon|bluesky|preview/i],
  ["tool", /headlesschrome|headless|chrome-lighthouse|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|python-requests|python|curl\/|wget|puppeteer|playwright|selenium|phantomjs|go-http-client|node-fetch|axios|okhttp|java\/|scrapy|postman/i]
];
const PT = "America/Los_Angeles";
const DEFAULT_ORIGINS = ["https://studiowetware.com", "https://www.studiowetware.com", "https://network.studiowetware.com",
  "https://smallworks.studiowetware.com", "https://beachselfgrading.com", "https://www.beachselfgrading.com",
  "https://tag.beachselfgrading.com", "https://board.studiowetware.com", "https://beachkila.github.io",
  "https://idla.studiowetware.com"];

// Which map stop each sheet row belongs to.
const DL_STOP = { tags: { Tags: "create", TCN: "n_tags", ACEO: "SMW" }, tcn: { Negatives: "n_neg", CMYK: "n_cmyk", Enlarger: "n_enl", "Gallery Bench": "n_bench" } };

const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...extra } });
const origins = (env) => DEFAULT_ORIGINS.concat((env.DEV_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean));

async function sha256hex(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}

// ---------- Pacific time ----------
const ptFmt = new Intl.DateTimeFormat("en-CA", { timeZone: PT, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23" });
function ptParts(ts) { const o = {}; for (const p of ptFmt.formatToParts(new Date(ts))) o[p.type] = p.value; if (o.hour === "24") o.hour = "00"; return o; }
const ptDay = (ts) => { const o = ptParts(ts); return `${o.year}-${o.month}-${o.day}`; };
const ptHour = (ts) => { const o = ptParts(ts); return `${o.year}-${o.month}-${o.day} ${o.hour}`; };
function ptOffset(ts) { const h = Math.floor(ts / 3600e3) * 3600e3, o = ptParts(h); return Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour) - h; }
function ptMidnight(d) { const [y, m, dd] = d.split("-").map(Number), g = Date.UTC(y, m - 1, dd); let t = g - ptOffset(g); t = g - ptOffset(t); return t; }
const addDays = (d, n) => new Date(Date.parse(d + "T12:00:00Z") + n * 86400e3).toISOString().slice(0, 10);
const weekOf = (d) => addDays(d, -((new Date(d + "T12:00:00Z").getUTCDay() + 6) % 7)); // the Monday that starts the week

// The period the dashboard asked for: 24 hours by hour, 7 and 30 days by Pacific day, a year by week.
function range(days, now = Date.now()) {
  const today = ptDay(now);
  if (days <= 1) {
    const since = now - 86400e3, h0 = Math.floor(now / 3600e3) * 3600e3, keys = [];
    for (let i = 23; i >= 0; i--) keys.push(ptHour(h0 - i * 3600e3));
    return { days: 1, unit: "hour", since, until: now, prevSince: since - 86400e3, keys, key: ptHour, today, first: ptDay(since) };
  }
  const first = addDays(today, -(days - 1)), pFirst = addDays(first, -days), unit = days > 31 ? "week" : "day", keys = [];
  for (let d = first; d <= today; d = addDays(d, 1)) { const k = unit === "week" ? weekOf(d) : d; if (keys[keys.length - 1] !== k) keys.push(k); }
  return { days, unit, since: ptMidnight(first), until: now, prevSince: ptMidnight(pFirst), keys, key: unit === "week" ? (ts) => weekOf(ptDay(ts)) : ptDay, today, first, pFirst };
}

async function countBot(env, ua) {
  let kind = "other", name = null;
  for (const [k, re] of BOT_KINDS) { const m = ua.match(re); if (m) { kind = k; name = m[0]; break; } }
  if (!name) { const m = ua.match(/[A-Za-z0-9._-]*(?:bot|crawl|spider)[A-Za-z0-9._-]*/i); name = m ? m[0] : "unknown"; }
  name = name.toLowerCase().replace(/[\/\s;]+$/, "").slice(0, 40) || "unknown";
  try { await env.DB.prepare("INSERT INTO bots (hour, kind, name, n) VALUES (?,?,?,1) ON CONFLICT(hour, kind, name) DO UPDATE SET n = n + 1").bind(ptHour(Date.now()), kind, name).run(); } catch {}
}

const deviceOf = (ua) => /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua) ? "tablet" : /Mobi|iPhone|iPod|Android|IEMobile|Opera Mini/i.test(ua) ? "phone" : "desktop";

// ---------- logging ----------
async function handleHit(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = origins(env);
  const cors = origin && allowed.includes(origin) ? { "access-control-allow-origin": origin, "vary": "origin" } : {};
  if (origin && !cors["access-control-allow-origin"]) return new Response(null, { status: 403 });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "POST", "access-control-allow-headers": "content-type", "access-control-max-age": "86400" } });
  if (request.method !== "POST") return new Response(null, { status: 405 });
  const ua = request.headers.get("user-agent") || "";
  // Bots: counted by type and name only, never as riders.
  if (BOT.test(ua)) { await countBot(env, ua); return new Response(null, { status: 204, headers: cors }); }
  // Do Not Track and Global Privacy Control: not counted at all.
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1") return new Response(null, { status: 204, headers: cors });
  const text = await request.text();
  if (text.length > 2000) return new Response(null, { status: 413, headers: cors });
  let b; try { b = JSON.parse(text); } catch { return new Response(null, { status: 400, headers: cors }); }
  const id = (v) => (typeof v === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : null);
  const type = TYPES.has(b.t) ? b.t : null;
  if (!type) return new Response(null, { status: 400, headers: cors });
  const src = SRCS.has(b.k) ? b.k : null;
  const cid = typeof b.r === "string" && /^[a-z0-9]{8,32}$/.test(b.r) ? b.r : null;
  let host = null, path = null, ref = null;
  if (typeof b.h === "string" && /^[a-z0-9.-]{3,80}$/i.test(b.h)) host = b.h.toLowerCase();
  if (typeof b.p === "string") path = b.p.split(/[?#]/)[0].slice(0, 200);
  if (typeof b.f === "string" && /^[a-z0-9.-]{3,80}$/i.test(b.f)) ref = b.f.toLowerCase().replace(/^www\./, "");
  const ip = request.headers.get("cf-connecting-ip") || "";
  const ih = (await sha256hex(`${env.SALT || "unset"}|${ip}|${ua}`)).slice(0, 16);
  // Location comes from Cloudflare, at country and region level only. The IP is never stored.
  const cf = request.cf || {};
  const country = typeof cf.country === "string" && /^[A-Z]{2}$/.test(cf.country) ? cf.country : null;
  const region = typeof cf.region === "string" ? cf.region.slice(0, 60) : null;
  const tz = typeof cf.timezone === "string" && /^[A-Za-z_\/+-]{2,40}$/.test(cf.timezone) ? cf.timezone : null;
  const row = [Date.now(), ih, cid, type, id(b.s), id(b.o), host, path, src];
  try {
    await env.DB.prepare("INSERT INTO events (ts, ih, cid, type, stop, to_stop, host, path, src, country, region, tz, ref, dev) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
      .bind(...row, country, region, tz, ref, deviceOf(ua)).run();
  } catch {
    // The location columns are not added yet (see README): keep counting without them.
    await env.DB.prepare("INSERT INTO events (ts, ih, cid, type, stop, to_stop, host, path, src) VALUES (?,?,?,?,?,?,?,?,?)").bind(...row).run();
  }
  try { await env.DB.prepare("INSERT INTO riders (ih, first, last) VALUES (?, ?, ?) ON CONFLICT(ih) DO UPDATE SET last = excluded.last").bind(ih, row[0], row[0]).run(); }
  catch { try { await env.DB.prepare("INSERT OR IGNORE INTO riders (ih, first) VALUES (?, ?)").bind(ih, row[0]).run(); } catch {} }
  return new Response(null, { status: 204, headers: cors });
}

// ---------- access ----------
let certCache = { at: 0, keys: null };
const b64u = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), c => c.charCodeAt(0));

async function verifyAccessJwt(token, env) {
  if (!env.ACCESS_TEAM || !env.ACCESS_AUD) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const head = JSON.parse(new TextDecoder().decode(b64u(parts[0])));
  const payload = JSON.parse(new TextDecoder().decode(b64u(parts[1])));
  if (Date.now() - certCache.at > 3600e3 || !certCache.keys) {
    const r = await fetch(`https://${env.ACCESS_TEAM}/cdn-cgi/access/certs`);
    if (!r.ok) return null;
    certCache = { at: Date.now(), keys: (await r.json()).keys };
  }
  const jwk = certCache.keys.find(k => k.kid === head.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64u(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  if (!ok) return null;
  const aud = [].concat(payload.aud || []);
  if (!aud.includes(env.ACCESS_AUD)) return null;
  if (payload.exp && payload.exp * 1000 < Date.now()) return null;
  if (payload.iss !== `https://${env.ACCESS_TEAM}`) return null;
  if (env.ALLOWED_EMAILS) {
    const list = env.ALLOWED_EMAILS.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    if (list.length && !list.includes(String(payload.email || "").toLowerCase())) return null;
  }
  return payload.email || "access-user";
}

async function authorized(request, env) {
  const auth = request.headers.get("authorization") || "";
  if (env.READ_TOKEN && auth.startsWith("Bearer ")) {
    const a = await sha256hex(auth.slice(7)), b = await sha256hex(env.READ_TOKEN);
    if (a === b) return "token";
  }
  const jwt = request.headers.get("cf-access-jwt-assertion");
  if (jwt) { try { return await verifyAccessJwt(jwt, env); } catch { return null; } }
  return null;
}

// ---------- analysis ----------
const VISIT = (e) => (e.type === "view" || e.type === "station") && e.stop;
const inc = (o, k, n = 1) => { if (k == null || k === "") return; o[k] = (o[k] || 0) + n; };

function sessionsOf(events) {
  const by = new Map();
  for (const e of events) { if (!by.has(e.ih)) by.set(e.ih, []); by.get(e.ih).push(e); }
  const out = [];
  for (const [ih, list] of by) {
    list.sort((a, b) => a.ts - b.ts);
    let cur = null;
    for (const e of list) {
      if (!cur || e.ts - cur.end > SESSION_GAP) { cur = { ih, start: e.ts, end: e.ts, events: [] }; out.push(cur); }
      cur.end = e.ts; cur.events.push(e);
    }
  }
  return out;
}

// Local hour and weekday in the visitor's own timezone (falls back to UTC).
const fmtCache = {};
function localParts(ts, tz) {
  const k = tz || "UTC";
  let f = fmtCache[k];
  if (!f) { try { f = new Intl.DateTimeFormat("en-US", { timeZone: k, hour: "numeric", hourCycle: "h23", weekday: "short" }); } catch { f = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", hour: "numeric", hourCycle: "h23", weekday: "short" }); } fmtCache[k] = f; }
  const p = f.formatToParts(new Date(ts)); let h = 0, w = "Sun";
  for (const x of p) { if (x.type === "hour") h = parseInt(x.value, 10) % 24; if (x.type === "weekday") w = x.value; }
  return { h, w: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(w) };
}

function analyse(events, newSet) {
  const stops = {}, flows = new Map(), riders = new Set();
  const st = (id) => (stops[id] = stops[id] || { views: 0, riders: new Set(), entries: 0, exits: 0, bounces: 0, clicksOut: 0, clicksIn: 0 });
  const sessions = sessionsOf(events);
  let visits = 0, clicks = 0, assistedFlows = 0, totalFlows = 0, crossSite = 0, multi = 0, duration = 0;
  const countries = {}, regions = {}, tzs = {}, devices = {}, refs = {}, hours = new Array(24).fill(0), weekdays = new Array(7).fill(0), clickSrc = {}, visitSrc = {}, hosts = {};
  const countryRiders = {};
  for (const e of events) {
    riders.add(e.ih);
    if (VISIT(e)) {
      const s = st(e.stop); s.views++; s.riders.add(e.ih); visits++;
      if (e.country) { inc(countries, e.country); (countryRiders[e.country] = countryRiders[e.country] || new Set()).add(e.ih); }
      if (e.country && e.region) inc(regions, e.country + "|" + e.region);
      inc(tzs, e.tz); inc(visitSrc, e.src || "other"); inc(hosts, e.host);
      const lp = localParts(e.ts, e.tz); hours[lp.h]++; weekdays[lp.w]++;
    }
    if (e.type === "click") { clicks++; if (e.stop) st(e.stop).clicksOut++; if (e.to_stop) st(e.to_stop).clicksIn++; inc(clickSrc, e.src || "other"); }
  }
  // per rider: device of their last event
  const devOf = {}; for (const e of events) if (e.dev) devOf[e.ih] = e.dev;
  for (const ih of riders) inc(devices, devOf[ih] || "unknown");
  let newR = 0, retR = 0;
  for (const ih of riders) { if (newSet && !newSet.has(ih)) retR++; else newR++; }
  for (const s of sessions) {
    duration += s.end - s.start;
    const vs = s.events.filter(VISIT);
    if (!vs.length) continue;
    if (vs.length > 1) multi++;
    st(vs[0].stop).entries++;
    st(vs[vs.length - 1].stop).exits++;
    if (vs.length === 1) st(vs[0].stop).bounces++;
    const r = s.events.find(e => e.ref);
    inc(refs, r ? r.ref : "direct");
    for (let i = 1; i < vs.length; i++) {
      const a = vs[i - 1], b = vs[i];
      if (a.stop === b.stop) continue;
      const key = a.stop + ">" + b.stop;
      const assisted = s.events.some(c => c.type === "click" && c.ts >= a.ts && c.ts <= b.ts + 5000 && c.to_stop === b.stop);
      const cross = !!(a.host && b.host && a.host !== b.host);
      const f = flows.get(key) || { from: a.stop, to: b.stop, n: 0, assisted: 0, cross: 0 };
      f.n++; if (assisted) f.assisted++; if (cross) f.cross++;
      flows.set(key, f);
      totalFlows++; if (assisted) assistedFlows++; if (cross) crossSite++;
    }
  }
  // lines: visits on each line's stops, trips that rode it, and how far they went
  const lines = {};
  if (META) for (const l of META.lines) {
    const set = new Set(Object.keys(META.stops).filter(id => META.stops[id].lines.includes(l.id)));
    let v = 0; const rs = new Set(); let trips = 0, depth = 0;
    for (const e of events) if (VISIT(e) && set.has(e.stop)) { v++; rs.add(e.ih); }
    for (const s of sessions) { const seen = new Set(s.events.filter(e => VISIT(e) && set.has(e.stop)).map(e => e.stop)); if (seen.size) { trips++; depth += seen.size; } }
    lines[l.id] = { visits: v, riders: rs.size, trips, avgStops: trips ? +(depth / trips).toFixed(2) : 0 };
  }
  const outStops = {};
  for (const [id, s] of Object.entries(stops)) outStops[id] = { views: s.views, riders: s.riders.size, entries: s.entries, exits: s.exits, bounces: s.bounces, clicksOut: s.clicksOut, clicksIn: s.clicksIn };
  const cr = {}; for (const k in countryRiders) cr[k] = countryRiders[k].size;
  return {
    totals: { riders: riders.size, sessions: sessions.length, visits, clicks, multiStopSessions: multi, moves: totalFlows, assistedMoves: assistedFlows, crossSiteMoves: crossSite,
      newRiders: newR, returningRiders: retR, avgTripMin: sessions.length ? +(duration / sessions.length / 60000).toFixed(1) : 0 },
    stops: outStops, lines,
    geo: { countries, countryRiders: cr, regions, tz: tzs },
    time: { hours, weekdays },
    sources: { refs, devices, clickSrc, visitSrc, hosts },
    flows: [...flows.values()].sort((a, b) => b.n - a.n).slice(0, 500)
  };
}

const COLS_NEW = "ts, ih, cid, type, stop, to_stop, host, path, src, country, region, tz, ref, dev";
const COLS_OLD = "ts, ih, cid, type, stop, to_stop, host, path, src";
async function sel(env, where, binds, limit) {
  try { return (await env.DB.prepare(`SELECT ${COLS_NEW} FROM events ${where} ORDER BY ts ASC LIMIT ?`).bind(...binds, limit).all()).results || []; }
  catch { return (await env.DB.prepare(`SELECT ${COLS_OLD} FROM events ${where} ORDER BY ts ASC LIMIT ?`).bind(...binds, limit).all()).results || []; }
}
async function loadEvents(env, days, limit = 50000) {
  const since = Date.now() - Math.min(Math.max(days, 1), RETAIN_DAYS) * 86400e3;
  return sel(env, "WHERE ts >= ?", [since], limit);
}

const day = (ts) => new Date(ts).toISOString().slice(0, 10);

// ---------- download counts from the Google Sheets ----------
async function sheets(env, force) {
  const out = {};
  const src = { tags: env.SHEET_TAGS_URL, tcn: env.SHEET_TCN_URL };
  let cache = {};
  try { for (const r of (await env.DB.prepare("SELECT name, fetched, data FROM sheets").all()).results || []) cache[r.name] = r; } catch { return { error: "The sheets table is not set up yet (see README)." }; }
  for (const [name, url] of Object.entries(src)) {
    const c = cache[name];
    if (url && env.SHEET_KEY && (force || !c || Date.now() - c.fetched > SHEET_TTL)) {
      try {
        const r = await fetch(url + (url.includes("?") ? "&" : "?") + "key=" + encodeURIComponent(env.SHEET_KEY), { redirect: "follow" });
        const d = await r.json();
        if (r.ok && d && d.days) {
          const data = JSON.stringify(d);
          await env.DB.prepare("INSERT OR REPLACE INTO sheets (name, fetched, data) VALUES (?,?,?)").bind(name, Date.now(), data).run();
          cache[name] = { name, fetched: Date.now(), data };
        } else out[name + "Error"] = (d && d.error) || "HTTP " + r.status;
      } catch (e) { out[name + "Error"] = String(e.message || e); }
    }
    if (cache[name]) { out[name] = JSON.parse(cache[name].data); out[name].fetched = cache[name].fetched; }
    else if (!url) out[name + "Error"] = "Not connected";
  }
  return out;
}

// Sum the sheet counts in the period: per stop, per bucket (hour, day or week) and the period before, for comparison.
// The sheet scripts key days (and the last 72 hours) by Pacific time.
function downloads(sh, R) {
  let earliest = null;
  const res = { stops: {}, trend: {}, series: {}, prev: 0, bySheet: {}, byKind: {}, tz: {}, colors: {}, formats: {}, actions: {}, users: 0, fetched: {}, unit: R.unit, hourly: true };
  const hNow = ptHour(R.until), hFrom = ptHour(R.since), hPrev = ptHour(R.prevSince);
  for (const name of ["tags", "tcn"]) {
    const s = sh[name]; if (!s) continue;
    res.fetched[name] = s.fetched;
    let src = s.days || {}, inNow, inPrev, bucket;
    if (R.unit === "hour" && s.hours) { src = s.hours; inNow = (k) => k > hFrom && k <= hNow; inPrev = (k) => k > hPrev && k <= hFrom; bucket = (k) => k; }
    else if (R.unit === "hour") { res.hourly = false; inNow = (k) => k >= R.first && k <= R.today; inPrev = () => false; bucket = (k) => k; }
    else { inNow = (k) => k >= R.first && k <= R.today; inPrev = (k) => k >= R.pFirst && k < R.first; bucket = R.unit === "week" ? weekOf : (k) => k; }
    for (const d of Object.keys(s.days || {})) if (!earliest || d < earliest) earliest = d;
    for (const [d, v] of Object.entries(src)) {
      if (inPrev(d)) { res.prev += v.total || 0; continue; }
      if (!inNow(d)) continue;
      inc(res.bySheet, name, v.total || 0); inc(res.trend, d, v.total || 0); inc(res.series, bucket(d), v.total || 0);
      for (const [k, n] of Object.entries(v.by || {})) { inc(res.byKind, k, n); const stop = (DL_STOP[name] || {})[k]; if (stop) inc(res.stops, stop, n); }
      for (const [k, n] of Object.entries(v.tz || {})) inc(res.tz, k, n);
      for (const [k, n] of Object.entries(v.color || {})) inc(res.colors, k, n);
      for (const [k, n] of Object.entries(v.format || {})) inc(res.formats, k, n);
      for (const [k, n] of Object.entries(v.action || {})) inc(res.actions, k, n);
      res.users += v.users || 0;
    }
  }
  // no comparison when the sheets did not exist yet in the period before
  if (R.unit === "hour" ? !res.hourly : (!earliest || earliest >= R.first)) res.prev = null;
  return res;
}

// ---------- daily totals kept for good ----------
// Each finished Pacific day is summed into one row of the rollup table. The year view reads these rows instead of the rides.
// The rider keys in a row (used to count unique riders across days) are removed once the day is older than 90 days.
const add = (o, src) => { for (const k in src || {}) o[k] = (o[k] || 0) + src[k]; };
function rollOf(events) {
  const a = analyse(events, null), t = a.totals;
  let dur = 0; for (const s of sessionsOf(events)) dur += s.end - s.start;
  const st = {}; for (const [id, s] of Object.entries(a.stops)) st[id] = [s.views, s.riders, s.entries, s.exits, s.bounces, s.clicksOut, s.clicksIn];
  const ln = {}; for (const [id, l] of Object.entries(a.lines)) if (l.visits || l.trips) ln[id] = [l.visits, l.riders, l.trips, Math.round(l.avgStops * l.trips)];
  return { v: t.visits, r: t.riders, s: t.sessions, c: t.clicks, ms: t.multiStopSessions, m: t.moves, am: t.assistedMoves, x: t.crossSiteMoves, dur, st, ln,
    co: a.geo.countries, cr: a.geo.countryRiders, rg: a.geo.regions, tz: a.geo.tz, h: a.time.hours, w: a.time.weekdays,
    rf: a.sources.refs, dv: a.sources.devices, cs: a.sources.clickSrc, vs: a.sources.visitSrc, ho: a.sources.hosts,
    fl: a.flows.slice(0, 200).map(f => [f.from, f.to, f.n, f.assisted, f.cross]), ih: [...new Set(events.map(e => e.ih))] };
}
// Add rollup rows back up into the same shape analyse() gives.
function fromRolls(list) {
  const T = { riders: 0, sessions: 0, visits: 0, clicks: 0, multiStopSessions: 0, moves: 0, assistedMoves: 0, crossSiteMoves: 0 };
  const stops = {}, L = {}, geo = { countries: {}, countryRiders: {}, regions: {}, tz: {} }, time = { hours: new Array(24).fill(0), weekdays: new Array(7).fill(0) };
  const sources = { refs: {}, devices: {}, clickSrc: {}, visitSrc: {}, hosts: {} }, flows = new Map(), ids = new Set();
  let dur = 0, idsOk = true;
  for (const r of list) {
    T.visits += r.v || 0; T.sessions += r.s || 0; T.clicks += r.c || 0; T.multiStopSessions += r.ms || 0; T.moves += r.m || 0; T.assistedMoves += r.am || 0; T.crossSiteMoves += r.x || 0; T.riders += r.r || 0; dur += r.dur || 0;
    if (r.ih) r.ih.forEach(i => ids.add(i)); else if (r.r) idsOk = false;
    for (const [id, q] of Object.entries(r.st || {})) { const s = stops[id] = stops[id] || { views: 0, riders: 0, entries: 0, exits: 0, bounces: 0, clicksOut: 0, clicksIn: 0 }; ["views", "riders", "entries", "exits", "bounces", "clicksOut", "clicksIn"].forEach((k, i) => { s[k] += q[i] || 0; }); }
    for (const [id, q] of Object.entries(r.ln || {})) { const l = L[id] = L[id] || [0, 0, 0, 0]; q.forEach((n, i) => { l[i] += n || 0; }); }
    add(geo.countries, r.co); add(geo.countryRiders, r.cr); add(geo.regions, r.rg); add(geo.tz, r.tz);
    (r.h || []).forEach((n, i) => { time.hours[i] += n; }); (r.w || []).forEach((n, i) => { time.weekdays[i] += n; });
    add(sources.refs, r.rf); add(sources.devices, r.dv); add(sources.clickSrc, r.cs); add(sources.visitSrc, r.vs); add(sources.hosts, r.ho);
    for (const [from, to, n, as, cr] of r.fl || []) { const k = from + ">" + to, f = flows.get(k) || { from, to, n: 0, assisted: 0, cross: 0 }; f.n += n; f.assisted += as; f.cross += cr; flows.set(k, f); }
  }
  if (idsOk) T.riders = ids.size; else T.ridersSummed = true;
  T.avgTripMin = T.sessions ? +(dur / T.sessions / 60000).toFixed(1) : 0;
  const lines = {};
  if (META) for (const l of META.lines) { const q = L[l.id] || [0, 0, 0, 0]; lines[l.id] = { visits: q[0], riders: q[1], trips: q[2], avgStops: q[2] ? +(q[3] / q[2]).toFixed(2) : 0 }; }
  return { totals: T, stops, lines, geo, time, sources, flows: [...flows.values()].sort((a, b) => b.n - a.n).slice(0, 500) };
}
async function readRolls(env, from, to) { // days from..to-1
  try { return ((await env.DB.prepare("SELECT day, data FROM rollup WHERE day >= ? AND day < ? ORDER BY day").bind(from, to).all()).results || []).map(r => Object.assign(JSON.parse(r.data), { day: r.day })); }
  catch { return []; }
}
// Fill in any finished day in the last 90 days that has no rollup yet (a few days per call, so no single call runs long).
async function rollup(env, maxDays) {
  const today = ptDay(Date.now()), start = addDays(today, -(RETAIN_DAYS - 1));
  let have;
  try { have = new Set(((await env.DB.prepare("SELECT day FROM rollup WHERE day >= ?").bind(start).all()).results || []).map(r => r.day)); } catch { return 0; }
  const o = await env.DB.prepare("SELECT MIN(ts) AS t FROM events").first();
  if (!o || !o.t) return 0;
  let n = 0;
  for (let d = ptDay(o.t) > start ? ptDay(o.t) : start; d < today && n < maxDays; d = addDays(d, 1)) {
    if (have.has(d)) continue;
    const ev = await sel(env, "WHERE ts >= ? AND ts < ?", [ptMidnight(d), ptMidnight(addDays(d, 1))], 60000);
    await env.DB.prepare("INSERT OR REPLACE INTO rollup (day, data) VALUES (?, ?)").bind(d, JSON.stringify(rollOf(ev))).run();
    n++;
  }
  try { await env.DB.prepare("UPDATE rollup SET data = json_remove(data, '$.ih') WHERE day < ? AND json_extract(data, '$.ih') IS NOT NULL").bind(addDays(today, -RETAIN_DAYS)).run(); } catch {}
  return n;
}

// ---------- one pass, cached ----------
// Every dashboard number for a period comes from a single read, kept for a few minutes,
// so opening tabs, refreshing and clicking stations do not re-read the database (D1's free plan counts every row read).
const CACHE_MS = 10 * 60 * 1000, FRESH_MIN_MS = 60 * 1000;
const top = (o, n) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n));

async function bundle(env, days, fresh) {
  const key = "b2:" + days;
  let row = null;
  try { row = await env.DB.prepare("SELECT at, data FROM cache WHERE k = ?").bind(key).first(); } catch {}
  if (row && Date.now() - row.at < (fresh ? FRESH_MIN_MS : CACHE_MS)) return JSON.parse(row.data);
  try { await rollup(env, 5); } catch {}
  const B = await computeBundle(env, days);
  try { await env.DB.prepare("INSERT OR REPLACE INTO cache (k, at, data) VALUES (?,?,?)").bind(key, Date.now(), JSON.stringify(B)).run(); } catch {}
  return B;
}

const quick = (events) => { const vs = events.filter(VISIT); return { visits: vs.length, riders: new Set(events.map(e => e.ih)).size, sessions: sessionsOf(events).length, clicks: events.filter(e => e.type === "click").length }; };
function prevFromRolls(rolls, days) {
  if (!rolls.length) return null;
  const t = fromRolls(rolls).totals;
  return { visits: t.visits, riders: t.riders, sessions: t.sessions, clicks: t.clicks, ridersSummed: !!t.ridersSummed, daysCovered: rolls.length, days };
}

async function botsFor(env, R) {
  try {
    const rs = (await env.DB.prepare("SELECT kind, name, SUM(n) AS n FROM bots WHERE hour >= ? GROUP BY kind, name").bind(R.unit === "hour" ? ptHour(R.since) : R.first + " 00").all()).results || [];
    const out = { kinds: {}, names: {}, total: 0 };
    for (const r of rs) { inc(out.kinds, r.kind, r.n); (out.names[r.kind] = out.names[r.kind] || {})[r.name] = r.n; out.total += r.n; }
    const p = await env.DB.prepare("SELECT SUM(n) AS n FROM bots WHERE hour >= ? AND hour < ?").bind(R.unit === "hour" ? ptHour(R.prevSince) : R.pFirst + " 00", R.unit === "hour" ? ptHour(R.since) : R.first + " 00").first();
    out.prev = (p && p.n) || 0;
    return out;
  } catch { return null; }
}

async function computeBundle(env, days) {
  const R = range(days), now = R.until;
  const year = R.unit === "week";
  let a, ev, sessions, riders;
  if (!year) {
    const loadSince = Math.min(R.since, now - 14 * 86400e3);
    const all = await loadEvents(env, Math.ceil((now - loadSince) / 86400e3) + 1);
    ev = all.filter(e => e.ts >= R.since);
    // riders first seen inside this period (one small indexed read); everyone else in the period is returning
    let newSet = null;
    try { newSet = new Set(((await env.DB.prepare("SELECT ih FROM riders WHERE first >= ?").bind(R.since).all()).results || []).map(r => r.ih)); } catch {}
    a = analyse(ev, newSet);
    if (!newSet) { a.totals.newRiders = a.totals.riders; a.totals.returningRiders = 0; }
    const wk = {};
    for (const e of all) if (VISIT(e)) { const age = now - e.ts; const w = wk[e.stop] = wk[e.stop] || [0, 0]; if (age < 7 * 86400e3) w[0]++; else if (age < 14 * 86400e3) w[1]++; }
    a.week = wk;
    // the period before, for comparison: from the rides when they are loaded, otherwise from the daily totals
    if (R.prevSince >= loadSince) { a.prev = quick(all.filter(e => e.ts >= R.prevSince && e.ts < R.since)); a.prev.days = R.days; a.prev.daysCovered = R.days; }
    else a.prev = prevFromRolls(await readRolls(env, R.pFirst, R.first), R.days);
    const sb = {};
    for (const e of ev) if (VISIT(e)) { const k = R.key(e.ts), b = sb[k] = sb[k] || { visits: 0, riders: new Set() }; b.visits++; b.riders.add(e.ih); }
    a.series = R.keys.map(k => ({ k, visits: sb[k] ? sb[k].visits : 0, riders: sb[k] ? sb[k].riders.size : 0 }));
    sessions = sessionsOf(ev);
  } else {
    // a year: one saved row per finished day, plus today's rides; older days saved before rollups started come from the daily table
    const rolls = await readRolls(env, R.first, R.today);
    ev = await sel(env, "WHERE ts >= ?", [ptMidnight(R.today)], 60000);
    rolls.push(Object.assign(rollOf(ev), { day: R.today }));
    const have = new Set(rolls.map(r => r.day));
    try {
      const old = {};
      for (const r of (await env.DB.prepare("SELECT day, stop, views, riders FROM daily WHERE day >= ?").bind(R.first).all()).results || []) {
        if (have.has(r.day)) continue;
        const o = old[r.day] = old[r.day] || { day: r.day, v: 0, r: 0, st: {}, old: true };
        o.v += r.views; o.st[r.stop] = [r.views, r.riders, 0, 0, 0, 0, 0];
      }
      Object.values(old).forEach(o => { rolls.push(o); });
    } catch {}
    rolls.sort((x, y) => (x.day < y.day ? -1 : 1));
    a = fromRolls(rolls);
    // unique riders over the year: everyone whose last visit falls in it
    try { const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM riders WHERE last >= ?").bind(R.since).first(); if (c && c.n != null) { a.totals.riders = c.n; delete a.totals.ridersSummed; } } catch {}
    try { const c = await env.DB.prepare("SELECT COUNT(*) AS n FROM riders WHERE first >= ?").bind(R.since).first(); a.totals.newRiders = Math.min(c.n, a.totals.riders); a.totals.returningRiders = a.totals.riders - a.totals.newRiders; }
    catch { a.totals.newRiders = a.totals.riders; a.totals.returningRiders = 0; }
    const sb = {}, wk = {}, d7 = addDays(R.today, -6), d14 = addDays(R.today, -13);
    for (const r of rolls) {
      const k = weekOf(r.day), b = sb[k] = sb[k] || { visits: 0, riders: 0, ids: new Set(), idsOk: true };
      b.visits += r.v || 0; b.riders += r.r || 0; if (r.ih) r.ih.forEach(i => b.ids.add(i)); else if (r.r) b.idsOk = false;
      for (const [id, q] of Object.entries(r.st || {})) { const w = wk[id] = wk[id] || [0, 0]; if (r.day >= d7) w[0] += q[0]; else if (r.day >= d14) w[1] += q[0]; }
    }
    a.series = R.keys.map(k => { const b = sb[k]; return { k, visits: b ? b.visits : 0, riders: b ? (b.idsOk ? b.ids.size : b.riders) : 0 }; });
    a.week = wk;
    a.prev = prevFromRolls(await readRolls(env, R.pFirst, R.first), R.days);
    a.firstDay = rolls.length ? rolls[0].day : R.today;
    a.rollStart = (rolls.find(r => !r.old) || {}).day || R.today;
    a.yearRolls = rolls;
  }
  a.unit = R.unit; a.keys = R.keys; a.days = R.days; a.generated = now; a.since = R.since;
  a.bots = await botsFor(env, R);
  try { a.history = (await env.DB.prepare("SELECT day, SUM(views) AS visits FROM daily GROUP BY day ORDER BY day DESC LIMIT 365").all()).results || []; } catch { a.history = []; }

  // riders list (the year view lists the last 30 days)
  if (year) riders = (await bundle(env, 30)).riders;
  else {
    const by = new Map();
    for (const e of ev) {
      const r = by.get(e.ih) || { id: e.ih, first: e.ts, last: e.ts, visits: 0, clicks: 0, stops: new Set(), hosts: new Set(), lastStop: null, country: null, dev: null };
      r.last = e.ts; if (VISIT(e)) { r.visits++; r.stops.add(e.stop); r.lastStop = e.stop; } if (e.type === "click") r.clicks++; if (e.host) r.hosts.add(e.host);
      if (e.country) r.country = e.country; if (e.dev) r.dev = e.dev;
      by.set(e.ih, r);
    }
    const sess = {}; for (const s of sessions) sess[s.ih] = (sess[s.ih] || 0) + 1;
    riders = [...by.values()].map(r => ({ id: r.id, first: r.first, last: r.last, visits: r.visits, clicks: r.clicks, stops: r.stops.size, sites: r.hosts.size, sessions: sess[r.id] || 0, lastStop: r.lastStop, country: r.country, dev: r.dev }))
      .sort((x, y) => y.last - x.last).slice(0, 200);
  }

  // details for every station, so clicking one on the map costs nothing
  const stopInfo = {};
  if (!year) {
    const S = {}, st = (id) => (S[id] = S[id] || { riders: new Set(), trend: {}, countries: {}, refs: {}, from: {}, to: {} });
    for (const s of sessions) {
      const vs = s.events.filter(VISIT);
      vs.forEach((e, i) => {
        const o = st(e.stop);
        o.riders.add(e.ih); inc(o.trend, R.key(e.ts)); inc(o.countries, e.country || "?");
        if (i === 0) { const r = s.events.find(x => x.ref); inc(o.refs, r ? r.ref : "direct"); } else if (vs[i - 1].stop !== e.stop) inc(o.from, vs[i - 1].stop);
        if (i < vs.length - 1 && vs[i + 1].stop !== e.stop) inc(o.to, vs[i + 1].stop); else if (i === vs.length - 1) inc(o.to, "(left)");
      });
    }
    for (const [id, o] of Object.entries(S)) stopInfo[id] = { riders: o.riders.size, trend: o.trend, countries: top(o.countries, 8), refs: top(o.refs, 8), from: top(o.from, 8), to: top(o.to, 8) };
  } else {
    const S = {}, st = (id) => (S[id] = S[id] || { trend: {}, from: {}, to: {} });
    for (const r of a.yearRolls) for (const [id, q] of Object.entries(r.st || {})) inc(st(id).trend, weekOf(r.day), q[0]);
    for (const f of a.flows) { inc(st(f.to).from, f.from, f.n); inc(st(f.from).to, f.to, f.n); }
    for (const [id, o] of Object.entries(S)) stopInfo[id] = { riders: (a.stops[id] || {}).riders || 0, trend: o.trend, countries: null, refs: null, from: top(o.from, 8), to: top(o.to, 8) };
    delete a.yearRolls;
  }
  return { summary: a, riders, stopInfo };
}

async function handleApi(url, env) {
  const days = Math.max(1, Math.min(parseInt(url.searchParams.get("days") || "30", 10) || 30, 365));
  const route = url.pathname.replace(/^\/api\//, "");
  if (route === "meta") return json(META);
  if (route === "summary" || route === "riders" || route === "stop") {
    const B = await bundle(env, days, url.searchParams.get("fresh") === "1");
    if (route === "riders") return json({ riders: B.riders, days });
    if (route === "stop") {
      const id = url.searchParams.get("id") || "";
      return json(Object.assign({ id, days, riders: 0, trend: {}, countries: {}, refs: {}, from: {}, to: {} }, B.stopInfo[id] || {}));
    }
    return json(Object.assign({}, B.summary, { riders: B.riders }));
  }
  if (route === "live") {
    const since = Math.max(parseInt(url.searchParams.get("since") || "0", 10) || 0, Date.now() - 15 * 60e3);
    const rows = (await sel(env, "WHERE ts > ?", [since], 200)).filter(VISIT);
    const act = await env.DB.prepare("SELECT COUNT(DISTINCT ih) AS n FROM events WHERE ts > ?").bind(Date.now() - 5 * 60e3).first();
    return json({ now: Date.now(), active: (act && act.n) || 0, events: rows.map(e => ({ ts: e.ts, stop: e.stop, rider: e.ih.slice(0, 8), country: e.country || null, region: e.region || null, src: e.src, host: e.host })) });
  }
  if (route === "downloads") {
    const sh = await sheets(env, url.searchParams.get("refresh") === "1");
    if (sh.error) return json({ error: sh.error });
    const d = downloads(sh, range(days));
    d.errors = Object.fromEntries(Object.entries(sh).filter(([k]) => k.endsWith("Error")));
    return json(d);
  }
  if (route === "rider") {
    const id = url.searchParams.get("id") || "";
    if (!/^[0-9a-f]{16}$/.test(id)) return json({ error: "bad id" }, 400);
    const since = Date.now() - RETAIN_DAYS * 86400e3;
    const rows = await sel(env, "WHERE ih = ? AND ts >= ?", [id, since], 5000);
    const sessions = []; let cur = null;
    for (const e of rows) { if (!cur || e.ts - cur.end > SESSION_GAP) { cur = { start: e.ts, end: e.ts, events: [] }; sessions.push(cur); } cur.end = e.ts; delete e.ih; delete e.cid; cur.events.push(e); }
    return json({ id, sessions });
  }
  if (route === "export") {
    const ev = await loadEvents(env, days, 100000);
    const rows = ev.map(e => ({ time: new Date(e.ts).toISOString(), rider: e.ih, browser_id: e.cid, type: e.type, stop: e.stop, to: e.to_stop, host: e.host, path: e.path, src: e.src, country: e.country, region: e.region, timezone: e.tz, referrer: e.ref, device: e.dev }));
    if (url.searchParams.get("format") === "csv") {
      const cols = ["time", "rider", "browser_id", "type", "stop", "to", "host", "path", "src", "country", "region", "timezone", "referrer", "device"];
      const esc = (v) => (v == null ? "" : /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v));
      const body = cols.join(",") + "\n" + rows.map(r => cols.map(c => esc(r[c])).join(",")).join("\n");
      return new Response(body, { headers: { "content-type": "text/csv", "content-disposition": "attachment; filename=sweta-events.csv", "cache-control": "no-store" } });
    }
    return json({ days, count: rows.length, events: rows });
  }
  return json({ error: "not found" }, 404);
}

// ---------- retention ----------
async function purge(env) {
  const startOfToday = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const cutoff = startOfToday - RETAIN_DAYS * 86400e3; // whole UTC days only
  await env.DB.batch([
    env.DB.prepare("INSERT OR REPLACE INTO daily (day, stop, views, riders) SELECT date(ts/1000,'unixepoch'), stop, COUNT(*), COUNT(DISTINCT ih) FROM events WHERE ts < ? AND stop IS NOT NULL AND type IN ('view','station') GROUP BY 1, 2").bind(cutoff),
    env.DB.prepare("DELETE FROM events WHERE ts < ?").bind(cutoff)
  ]);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/hit") return handleHit(request, env);
    if (url.pathname === "/dash" || url.pathname === "/") return new Response(DASH_HTML, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
    if (url.pathname.startsWith("/api/")) {
      const who = await authorized(request, env);
      if (!who) return json({ error: "unauthorized" }, 401);
      return handleApi(url, env);
    }
    return new Response("Not found", { status: 404 });
  },
  // nightly: save the finished days first, then delete rides older than 90 days, then refresh the sheets
  async scheduled(event, env, ctx) { ctx.waitUntil((async () => { try { await rollup(env, 31); } catch {} await purge(env); await sheets(env, true).catch(() => {}); })()); }
};
