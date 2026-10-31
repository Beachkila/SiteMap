// Builds tracker/worker.js (the file you deploy) from worker.src.js + dash.html + the station data in index.html.
// Run: node tools/build-tracker.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = html.match(/:root\{[^}]*\}/)[0];
const vars = {};
for (const m of css.matchAll(/--([a-z]+):(#[0-9A-Fa-f]{6})/g)) vars[m[1]] = m[2];
const start = html.indexOf('const SW="https'), end = html.indexOf("const SITES=");
const { S, L, LINKS, LAYOUT, GROUPS } = new Function(html.slice(start, end) + "\nreturn {S,L,LINKS,LAYOUT,GROUPS};")();
const hubIcon = new Function(html.slice(html.indexOf("const HUBICON="), html.indexOf(";", html.indexOf("const HUBICON=")) + 1) + "\nreturn HUBICON;")();
// Map geometry for the dashboard's own map (desktop layout): stop points and each line's drawn path.
const LW = LAYOUT.wide, P = id => LW.p[id];
const expandBr = br => { const o = []; let prev = null; br.forEach(q => { if (q[0] !== "@") { const e = (LW.eb || {})[prev + ">" + q]; if (prev && e) o.push("@~" + prev + ">" + q); prev = q } o.push(q) }); return o };
const bendOf = q => q[1] === "~" ? LW.eb[q.slice(2)] : LW.bend[q.slice(1)];
const pts = br => { const out = []; expandBr(br).forEach(q => { if (q[0] === "@") (bendOf(q) || []).forEach(b => out.push([b[0], b[1]])); else { const p = P(q); out.push([p[0], p[1]]) } }); return out };
const SITE = "https://beachkila.github.io/SiteMap/";
const lines = L.map(l => ({ id: l.id, n: l.n, c: vars[l.c.replace("--", "")], dash: l.dash ? 1 : 0, paths: l.b.map(pts), stops: l.b.map(br => br.filter(x => x[0] !== "@")) }));
const stops = {};
for (const [id, s] of Object.entries(S)) {
  const ls = L.filter(l => l.b.some(br => br.includes(id))).map(l => l.id);
  const p = P(id);
  stops[id] = { n: s.n, u: s.u, lines: ls, hub: s.hub ? 1 : 0, xfer: s.xfer ? 1 : 0, here: s.here ? 1 : 0, closed: s.closed ? 1 : 0, p: p ? [p[0], p[1]] : null, side: p ? p[2] || "r" : "r" };
  if (hubIcon[id]) stops[id].icon = [SITE + hubIcon[id][0], hubIcon[id][1]];
}
const groups = GROUPS.map(g => ({ id: g.id, n: g.n, a: (LW.ga || {})[g.id] || g.a, m: g.m, side: (LW.gs || {})[g.id] || "r" }));
const meta = { stops, lines, groups, links: LINKS.map(k => [k[0], k[1]]), map: SITE };
const dash = fs.readFileSync(path.join(root, "tracker", "dash.html"), "utf8");
const safe = (v) => JSON.stringify(v).replace(/[\u0080-￿]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
const out = fs.readFileSync(path.join(root, "tracker", "worker.src.js"), "utf8")
  .replace("/*META*/null", () => safe(meta)).replace('/*DASH*/""', () => safe(dash));
fs.writeFileSync(path.join(root, "tracker", "worker.js"), out);
console.log("tracker/worker.js:", Object.keys(stops).length, "stops,", out.length, "bytes");
