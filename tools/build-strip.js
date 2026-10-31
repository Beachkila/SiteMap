// Builds strip.js from the station and line data in index.html. Run: node tools/build-strip.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = html.match(/:root\{[^}]*\}/)[0];
const dark = html.match(/:root:not\(\[data-theme="light"\]\)\{[^}]*\}/)[0];
const vars = {};
for (const m of css.matchAll(/--([a-z]+):(#[0-9A-Fa-f]{6})/g)) vars[m[1]] = m[2];
const b = dark.match(/--brown:(#[0-9A-Fa-f]{6})/); if (b) vars.brown = b[1]; // the strip is always dark
const start = html.indexOf('const SW="https');
const end = html.indexOf("const SITES=");
const code = html.slice(start, end) + "\nreturn {S,L,LINKS,LAYOUT};";
const { S, L, LINKS, LAYOUT } = new Function(code)();
// Desktop map geometry for the small system map in the line menu: each line's drawn path and every stop's point.
const LW = LAYOUT.wide;
const expandBr = br => { const o = []; let prev = null; br.forEach(q => { if (q[0] !== "@") { const e = (LW.eb || {})[prev + ">" + q]; if (prev && e) o.push("@~" + prev + ">" + q); prev = q } o.push(q) }); return o };
const bendOf = q => q[1] === "~" ? LW.eb[q.slice(2)] : LW.bend[q.slice(1)];
const pathOf = br => { const out = []; expandBr(br).forEach(q => { if (q[0] === "@") (bendOf(q) || []).forEach(b => out.push([b[0], b[1]])); else { const p = LW.p[q]; if (p) out.push([p[0], p[1]]) } }); return out };
const geo = { p: {}, l: {} };
Object.keys(S).forEach(id => { const p = LW.p[id]; if (p) geo.p[id] = [Math.round(p[0]), Math.round(p[1])]; });
L.forEach(l => { geo.l[l.id] = l.b.map(pathOf).map(pa => pa.map(q => [Math.round(q[0]), Math.round(q[1])])); });
// Extra addresses that show the same stop: a project's board page and its live GitHub Pages site.
const BOARD = "https://board.studiowetware.com/p/";
const BOARD_SLUGS = { cyanogal: "cyanotype", lino: "linocuts", pendergal: "pender-art", irgal: "infrared-photography", pimaker: "the-sandbox" };
// The Network site is one page that switches by #/route. These routes belong to the stop named here.
const NETU = "https://network.studiowetware.com/";
const HASH_ALIASES = { n_feed: ["#/print"], n_mine: ["#/upload", "#/edit", "#/account", "#/collected"],
  // the tools are also separate pages that the Network site loads inside itself
  n_neg: ["negatives.html"], n_cmyk: ["cmyk.html"], n_enl: ["negative-enlarger.html"], n_bench: ["gallerybench.html"], n_tags: ["tcntags.html"] };
const stations = {};
for (const [id, s] of Object.entries(S)) {
  stations[id] = { n: s.n, u: s.u };
  if (s.nm) stations[id].nm = 1; // a stop with no page of its own (Learn is a menu): never matched by address
  const xs = LINKS.filter(k => k[0] === id || k[1] === id).map(k => (k[0] === id ? k[1] : k[0]));
  if (xs.length) stations[id].x = xs;
  const a = [];
  (HASH_ALIASES[id] || []).forEach(h => a.push(NETU + h));
  if (BOARD_SLUGS[id]) a.push(BOARD + BOARD_SLUGS[id] + "/");
  if (s.live) a.push(s.live);
  if (a.length) stations[id].a = a;
}
const KEY = { red: "P", orange: "S", blue: "N", teal: "S", green: "G", purple: "G", brown: "B", yellow: "B", gray: "A", writeups: "W" };
const lines = L.map(l => ({ id: l.id, n: l.n, k: KEY[l.id] || l.n[0], c: vars[l.c.replace("--", "")], dash: l.dash ? 1 : 0,
  b: l.b.map(br => br.filter(x => !x.startsWith("@") && !x.startsWith("~"))) }));
const cfgPath = path.join(__dirname, "..", "tracker", "config.json");
const TRACK = fs.existsSync(cfgPath) ? (JSON.parse(fs.readFileSync(cfgPath, "utf8")).endpoint || "") : "";
const out = fs.readFileSync(path.join(__dirname, "strip.template.js"), "utf8")
  .replace("/*TRACK*/\"\"", JSON.stringify(TRACK)).replace("/*DATA*/null", JSON.stringify({ stations, lines, geo }).replace(/[\u0080-\uffff]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")));
fs.writeFileSync(path.join(root, "strip.js"), out.replace(/[\u0080-\uffff]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")));
console.log("strip.js:", Object.keys(stations).length, "stations,", lines.length, "lines,", out.length, "bytes");
