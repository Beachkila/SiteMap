// S.We.T.A. rider tracker: a Cloudflare Worker that logs visits, keeps them 90 days, and serves a private dashboard.
// Generated worker.js = this file + the dashboard + the map data. Rebuild with: node tools/build-tracker.js
const META = /*META*/null;
const DASH_HTML = /*DASH*/"";

const RETAIN_DAYS = 90;
const SESSION_GAP = 30 * 60 * 1000;
const TYPES = new Set(["view", "station", "click"]);
const SRCS = new Set(["strip", "map"]);
const BOT = /bot|crawl|spider|headless|lighthouse|preview|facebookexternalhit|slurp|python-requests|curl\//i;
const DEFAULT_ORIGINS = ["https://studiowetware.com", "https://www.studiowetware.com", "https://network.studiowetware.com",
  "https://smallworks.studiowetware.com", "https://beachselfgrading.com", "https://www.beachselfgrading.com",
  "https://tag.beachselfgrading.com", "https://board.studiowetware.com", "https://beachkila.github.io"];

const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", "cache-control": "no-store", ...extra } });
const origins = (env) => DEFAULT_ORIGINS.concat((env.DEV_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean));

async function sha256hex(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}

// ---------- logging ----------
async function handleHit(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowed = origins(env);
  const cors = origin && allowed.includes(origin) ? { "access-control-allow-origin": origin, "vary": "origin" } : {};
  if (origin && !cors["access-control-allow-origin"]) return new Response(null, { status: 403 });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "POST", "access-control-allow-headers": "content-type", "access-control-max-age": "86400" } });
  if (request.method !== "POST") return new Response(null, { status: 405 });
  // Do Not Track and Global Privacy Control: not counted.
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1") return new Response(null, { status: 204, headers: cors });
  const ua = request.headers.get("user-agent") || "";
  if (BOT.test(ua)) return new Response(null, { status: 204, headers: cors });
  const text = await request.text();
  if (text.length > 2000) return new Response(null, { status: 413, headers: cors });
  let b; try { b = JSON.parse(text); } catch { return new Response(null, { status: 400, headers: cors }); }
  const id = (v) => (typeof v === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : null);
  const type = TYPES.has(b.t) ? b.t : null;
  if (!type) return new Response(null, { status: 400, headers: cors });
  const src = SRCS.has(b.k) ? b.k : null;
  const cid = typeof b.r === "string" && /^[a-z0-9]{8,32}$/.test(b.r) ? b.r : null;
  let host = null, path = null;
  if (typeof b.h === "string" && /^[a-z0-9.-]{3,80}$/i.test(b.h)) host = b.h.toLowerCase();
  if (typeof b.p === "string") path = b.p.split(/[?#]/)[0].slice(0, 200);
  const ip = request.headers.get("cf-connecting-ip") || "";
  const ih = (await sha256hex(`${env.SALT || "unset"}|${ip}|${ua}`)).slice(0, 16);
  await env.DB.prepare("INSERT INTO events (ts, ih, cid, type, stop, to_stop, host, path, src) VALUES (?,?,?,?,?,?,?,?,?)")
    .bind(Date.now(), ih, cid, type, id(b.s), id(b.o), host, path, src).run();
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

function analyse(events) {
  const stops = {}, flows = new Map(), riders = new Set();
  const st = (id) => (stops[id] = stops[id] || { views: 0, riders: new Set(), entries: 0, exits: 0, bounces: 0, clicksOut: 0 });
  const sessions = sessionsOf(events);
  let visits = 0, clicks = 0, assistedFlows = 0, totalFlows = 0, crossSite = 0, multi = 0;
  for (const e of events) {
    riders.add(e.ih);
    if (VISIT(e)) { const s = st(e.stop); s.views++; s.riders.add(e.ih); visits++; }
    if (e.type === "click") { clicks++; if (e.stop) st(e.stop).clicksOut++; }
  }
  for (const s of sessions) {
    const vs = s.events.filter(VISIT);
    if (!vs.length) continue;
    if (vs.length > 1) multi++;
    st(vs[0].stop).entries++;
    st(vs[vs.length - 1].stop).exits++;
    if (vs.length === 1) st(vs[0].stop).bounces++;
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
  const outStops = {};
  for (const [id, s] of Object.entries(stops)) outStops[id] = { views: s.views, riders: s.riders.size, entries: s.entries, exits: s.exits, bounces: s.bounces, clicksOut: s.clicksOut };
  return {
    totals: { riders: riders.size, sessions: sessions.length, visits, clicks, multiStopSessions: multi, moves: totalFlows, assistedMoves: assistedFlows, crossSiteMoves: crossSite },
    stops: outStops,
    flows: [...flows.values()].sort((a, b) => b.n - a.n).slice(0, 500)
  };
}

async function loadEvents(env, days, limit = 50000) {
  const since = Date.now() - Math.min(Math.max(days, 1), RETAIN_DAYS) * 86400e3;
  const r = await env.DB.prepare("SELECT ts, ih, cid, type, stop, to_stop, host, path, src FROM events WHERE ts >= ? ORDER BY ts ASC LIMIT ?").bind(since, limit).all();
  return r.results || [];
}

const day = (ts) => new Date(ts).toISOString().slice(0, 10);

async function handleApi(url, env) {
  const days = Math.min(parseInt(url.searchParams.get("days") || "30", 10) || 30, 365);
  const route = url.pathname.replace(/^\/api\//, "");
  if (route === "meta") return json(META);
  if (route === "summary") {
    const ev = await loadEvents(env, days);
    const a = analyse(ev);
    const trend = {};
    for (const e of ev) if (VISIT(e)) { const d = (trend[day(e.ts)] = trend[day(e.ts)] || { visits: 0, riders: new Set() }); d.visits++; d.riders.add(e.ih); }
    a.trend = Object.keys(trend).sort().map(k => ({ day: k, visits: trend[k].visits, riders: trend[k].riders.size }));
    const old = await env.DB.prepare("SELECT day, SUM(views) AS visits FROM daily GROUP BY day ORDER BY day DESC LIMIT 365").all();
    a.history = old.results || [];
    a.days = days; a.generated = Date.now();
    return json(a);
  }
  if (route === "riders") {
    const ev = await loadEvents(env, days);
    const by = new Map();
    for (const e of ev) {
      const r = by.get(e.ih) || { id: e.ih, first: e.ts, last: e.ts, visits: 0, clicks: 0, stops: new Set(), hosts: new Set(), lastStop: null };
      r.last = e.ts; if (VISIT(e)) { r.visits++; r.stops.add(e.stop); r.lastStop = e.stop; } if (e.type === "click") r.clicks++; if (e.host) r.hosts.add(e.host);
      by.set(e.ih, r);
    }
    const sess = {}; for (const s of sessionsOf(ev)) sess[s.ih] = (sess[s.ih] || 0) + 1;
    const list = [...by.values()].map(r => ({ id: r.id, first: r.first, last: r.last, visits: r.visits, clicks: r.clicks, stops: r.stops.size, sites: r.hosts.size, sessions: sess[r.id] || 0, lastStop: r.lastStop }))
      .sort((a, b) => b.last - a.last).slice(0, Math.min(parseInt(url.searchParams.get("limit") || "200", 10) || 200, 1000));
    return json({ riders: list, days });
  }
  if (route === "rider") {
    const id = url.searchParams.get("id") || "";
    if (!/^[0-9a-f]{16}$/.test(id)) return json({ error: "bad id" }, 400);
    const since = Date.now() - RETAIN_DAYS * 86400e3;
    const r = await env.DB.prepare("SELECT ts, type, stop, to_stop, host, path, src FROM events WHERE ih = ? AND ts >= ? ORDER BY ts ASC LIMIT 5000").bind(id, since).all();
    const rows = r.results || [];
    const sessions = []; let cur = null;
    for (const e of rows) { if (!cur || e.ts - cur.end > SESSION_GAP) { cur = { start: e.ts, end: e.ts, events: [] }; sessions.push(cur); } cur.end = e.ts; cur.events.push(e); }
    return json({ id, sessions });
  }
  if (route === "export") {
    const ev = await loadEvents(env, days, 100000);
    const rows = ev.map(e => ({ time: new Date(e.ts).toISOString(), rider: e.ih, browser_id: e.cid, type: e.type, stop: e.stop, to: e.to_stop, host: e.host, path: e.path, src: e.src }));
    if (url.searchParams.get("format") === "csv") {
      const cols = ["time", "rider", "browser_id", "type", "stop", "to", "host", "path", "src"];
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
  async scheduled(event, env, ctx) { ctx.waitUntil(purge(env)); }
};
