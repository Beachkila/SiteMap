// Builds tracker/worker.js (the file you deploy) from worker.src.js + dash.html + the station data in index.html.
// Run: node tools/build-tracker.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = html.match(/:root\{[^}]*\}/)[0];
const vars = {};
for (const m of css.matchAll(/--([a-z]+):(#[0-9A-Fa-f]{6})/g)) vars[m[1]] = m[2];
const start = html.indexOf('const SW="https'), end = html.indexOf("const LAYOUT");
const { S, L, LINKS } = new Function(html.slice(start, end) + "\nreturn {S,L,LINKS};")();
const lines = L.map(l => ({ id: l.id, n: l.n, c: vars[l.c.replace("--", "")], dash: l.dash ? 1 : 0 }));
const stops = {};
for (const [id, s] of Object.entries(S)) {
  const ls = L.filter(l => l.b.some(br => br.includes(id))).map(l => l.id);
  stops[id] = { n: s.n, u: s.u, lines: ls, hub: s.hub ? 1 : 0, closed: s.closed ? 1 : 0 };
}
const meta = { stops, lines, links: LINKS.map(k => [k[0], k[1]]), map: "https://beachkila.github.io/SiteMap/" };
const dash = fs.readFileSync(path.join(root, "tracker", "dash.html"), "utf8");
const safe = (v) => JSON.stringify(v).replace(/[\u0080-￿]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
const out = fs.readFileSync(path.join(root, "tracker", "worker.src.js"), "utf8")
  .replace("/*META*/null", () => safe(meta)).replace('/*DASH*/""', () => safe(dash));
fs.writeFileSync(path.join(root, "tracker", "worker.js"), out);
console.log("tracker/worker.js:", Object.keys(stops).length, "stops,", out.length, "bytes");
