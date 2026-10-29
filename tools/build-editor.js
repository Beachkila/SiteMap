// Builds editor.html from the station data in index.html. Run: node tools/build-editor.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const start = html.indexOf('const SW="https');
const end = html.indexOf("const LAYOUT");
const { S } = new Function(html.slice(start, end) + "\nreturn {S};")();
const stations = {};
for (const [id, s] of Object.entries(S)) stations[id] = { n: s.n, u: s.u, img: s.img || null };
const out = fs.readFileSync(path.join(__dirname, "editor.template.html"), "utf8")
  .replace("/*DATA*/null", JSON.stringify({ stations }).replace(/[\u0080-￿]/g, c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).replace(/</g, "\\u003c"));
fs.writeFileSync(path.join(root, "editor.html"), out);
console.log("editor.html:", Object.keys(stations).length, "stops,", out.length, "bytes");
