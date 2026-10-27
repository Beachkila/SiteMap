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
const end = html.indexOf("const LAYOUT");
const code = html.slice(start, end) + "\nreturn {S,L};";
const { S, L } = new Function(code)();
const stations = {};
for (const [id, s] of Object.entries(S)) stations[id] = { n: s.n, u: s.u };
const lines = L.map(l => ({ id: l.id, n: l.n, c: vars[l.c.replace("--", "")], dash: l.dash ? 1 : 0,
  b: l.b.map(br => br.filter(x => !x.startsWith("@") && !x.startsWith("~"))) }));
const out = fs.readFileSync(path.join(__dirname, "strip.template.js"), "utf8")
  .replace("/*DATA*/null", JSON.stringify({ stations, lines }).replace(/[\u0080-\uffff]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")));
fs.writeFileSync(path.join(root, "strip.js"), out);
console.log("strip.js:", Object.keys(stations).length, "stations,", lines.length, "lines,", out.length, "bytes");
