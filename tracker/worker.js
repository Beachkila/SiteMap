// S.We.T.A. rider tracker: a Cloudflare Worker that logs visits, keeps them 90 days, and serves a private dashboard.
// Generated worker.js = this file + the dashboard + the map data. Rebuild with: node tools/build-tracker.js
const META = {"stops":{"SW":{"n":"Studio Wetware","u":"https://studiowetware.com/","lines":["red","orange","blue","teal","green","purple","yellow","gray"],"hub":1,"closed":0},"about":{"n":"About Beach","u":"https://studiowetware.com/aboutbeach/","lines":["gray"],"hub":0,"closed":0},"netpage":{"n":"Network page","u":"https://studiowetware.com/network/","lines":["blue"],"hub":0,"closed":0},"solat":{"n":"SoLaT negatives","u":"https://studiowetware.com/solat-digital-negatives/","lines":["blue"],"hub":0,"closed":0},"cmyk":{"n":"CMYK for UV","u":"https://studiowetware.com/cmyk/","lines":["blue"],"hub":0,"closed":0},"sunprint":{"n":"Sunprint UVI","u":"https://studiowetware.com/sunprint/","lines":["blue"],"hub":0,"closed":0},"enlarger":{"n":"Negative enlarger","u":"https://studiowetware.com/negative-enlarger/","lines":["blue"],"hub":0,"closed":0},"NET":{"n":"The Cyanotype Network","u":"https://network.studiowetware.com/","lines":["blue"],"hub":1,"closed":0},"SMW":{"n":"Small Works","u":"https://smallworks.studiowetware.com/","lines":["teal"],"hub":1,"closed":0},"gitbeach":{"n":"GitBeach","u":"https://studiowetware.com/gitbeach/","lines":["purple","brown"],"hub":0,"closed":0},"picam":{"n":"Pi-Cam-IR-A","u":"https://studiowetware.com/pi-cam-ir-a/","lines":["purple"],"hub":0,"closed":0},"atlas":{"n":"Atlas","u":"https://studiowetware.com/atlas/","lines":["purple"],"hub":0,"closed":0},"blackbox":{"n":"Black Box","u":"https://studiowetware.com/black-box/","lines":["purple"],"hub":0,"closed":0},"bucke":{"n":"Buck-E","u":"https://studiowetware.com/buck-e-musical-cipher/","lines":["purple"],"hub":0,"closed":0},"pender":{"n":"PENDER Studios","u":"https://studiowetware.com/pender-studios/","lines":["purple"],"hub":0,"closed":0},"bang":{"n":"Bang!","u":"https://studiowetware.com/bang/","lines":["purple"],"hub":0,"closed":0},"potholes":{"n":"Adopt-a-Pothole","u":"https://studiowetware.com/potholes/","lines":["purple"],"hub":0,"closed":1},"planes":{"n":"Plane Spotter","u":"https://studiowetware.com/plane-spotter/","lines":["purple"],"hub":0,"closed":0},"githoods":{"n":"GitHoods","u":"https://studiowetware.com/githoods/","lines":["purple"],"hub":0,"closed":0},"board":{"n":"Project Board","u":"https://board.studiowetware.com/","lines":["brown"],"hub":0,"closed":0},"mediums":{"n":"Mediums","u":"https://board.studiowetware.com/spectra/","lines":["brown"],"hub":0,"closed":0},"stack":{"n":"Stack","u":"https://board.studiowetware.com/skills/","lines":["brown","pages"],"hub":0,"closed":0},"pimaker":{"n":"Pi-Maker","u":"https://beachkila.github.io/Pi-Maker/","lines":["pages"],"hub":0,"closed":0},"BSG":{"n":"Beach Self-Grading","u":"https://beachselfgrading.com/","lines":["yellow"],"hub":1,"closed":0},"create":{"n":"Create a Beach-Tag","u":"https://tag.beachselfgrading.com/","lines":["yellow"],"hub":0,"closed":0},"bsggal":{"n":"Beach-Tag Gallery","u":"https://beachselfgrading.com/gallery/","lines":["yellow"],"hub":0,"closed":0},"templates":{"n":"Printable templates","u":"https://beachselfgrading.com/templates/","lines":["yellow"],"hub":0,"closed":0},"whatis":{"n":"What are Beach-Tags?","u":"https://beachselfgrading.com/what-are-beach-tags/","lines":["yellow"],"hub":0,"closed":0},"contact":{"n":"Tip / Contact","u":"https://beachselfgrading.com/contact-me/","lines":["yellow"],"hub":0,"closed":0},"galleries":{"n":"All galleries","u":"https://studiowetware.com/galleries/","lines":["green"],"hub":0,"closed":0},"cyanogal":{"n":"Cyanotypes","u":"https://studiowetware.com/cyanotype-gallery/","lines":["green"],"hub":0,"closed":0},"lino":{"n":"Linocuts","u":"https://studiowetware.com/linocut-gallery/","lines":["green"],"hub":0,"closed":0},"pendergal":{"n":"PENDER plotter","u":"https://studiowetware.com/pender-3d-gallery/","lines":["green"],"hub":0,"closed":0},"irgal":{"n":"IR photography","u":"https://studiowetware.com/infrared-photography-gallery/","lines":["green"],"hub":0,"closed":0},"neggal":{"n":"Negatives","u":"https://studiowetware.com/negatives-gallery/","lines":["green"],"hub":0,"closed":0},"digigal":{"n":"Digital","u":"https://studiowetware.com/digital-gallery/","lines":["green"],"hub":0,"closed":0},"ui":{"n":"Interfaces","u":"https://studiowetware.com/program-gallery/","lines":["green"],"hub":0,"closed":0},"undisc":{"n":"Undisciplined","u":"https://studiowetware.com/undisciplined-gallery/","lines":["green"],"hub":0,"closed":0},"process":{"n":"Cyanotype process","u":"https://studiowetware.com/how-cyanotype-works/","lines":["red"],"hub":0,"closed":0},"light":{"n":"Light","u":"https://studiowetware.com/light/","lines":["red"],"hub":0,"closed":0},"salt":{"n":"Salt","u":"https://studiowetware.com/salt/","lines":["red"],"hub":0,"closed":0},"thinkneg":{"n":"Think Negative","u":"https://studiowetware.com/think-negative/","lines":["red"],"hub":0,"closed":0},"seepos":{"n":"See Positive","u":"https://studiowetware.com/see-positive/","lines":["red"],"hub":0,"closed":0},"sbs":{"n":"Step-by-step","u":"https://studiowetware.com/step-by-step/","lines":["orange"],"hub":0,"closed":0},"step1":{"n":"Step 1 \u00b7 Negative","u":"https://studiowetware.com/step-1/","lines":["orange"],"hub":0,"closed":0},"step2":{"n":"Step 2 \u00b7 Preparation","u":"https://studiowetware.com/step-2/","lines":["orange"],"hub":0,"closed":0},"step3":{"n":"Step 3 \u00b7 UV exposure","u":"https://studiowetware.com/step-3/","lines":["orange"],"hub":0,"closed":0},"step4":{"n":"Step 4 \u00b7 Wash","u":"https://studiowetware.com/step-4/","lines":["orange"],"hub":0,"closed":0},"bp-ai-station":{"n":"AI Station","u":"https://board.studiowetware.com/p/ai-station/","lines":["brown"],"hub":0,"closed":0},"bp-dock-to-stock":{"n":"Dock to Stock","u":"https://board.studiowetware.com/p/dock-to-stock/","lines":["brown"],"hub":0,"closed":0},"bp-beelab":{"n":"BeeLab","u":"https://board.studiowetware.com/p/beelab/","lines":["brown"],"hub":0,"closed":0},"bp-coolpix-ir":{"n":"Coolpix IR conversion","u":"https://board.studiowetware.com/p/coolpix-ir/","lines":["brown"],"hub":0,"closed":0},"bp-droneaware-node":{"n":"DroneAware node","u":"https://board.studiowetware.com/p/droneaware-node/","lines":["brown"],"hub":0,"closed":0},"bp-fire-hd8-linux-pad":{"n":"Fire HD 8 Linux pad","u":"https://board.studiowetware.com/p/fire-hd8-linux-pad/","lines":["brown"],"hub":0,"closed":0},"bp-ink-drawer":{"n":"Ink Drawer","u":"https://board.studiowetware.com/p/ink-drawer/","lines":["brown"],"hub":0,"closed":0},"bp-redditprofiler":{"n":"redditprofiler","u":"https://board.studiowetware.com/p/redditprofiler/","lines":["brown"],"hub":0,"closed":0},"bp-snake-lcd-pi":{"n":"Snake LCD Pi","u":"https://board.studiowetware.com/p/snake-lcd-pi/","lines":["brown"],"hub":0,"closed":0},"bp-ir-dev":{"n":"IR DEV","u":"https://board.studiowetware.com/p/ir-dev/","lines":["brown"],"hub":0,"closed":0},"bp-nmap-subway":{"n":"nmap subway","u":"https://board.studiowetware.com/p/nmap-subway/","lines":["brown"],"hub":0,"closed":0},"here":{"n":"S.We.T.A. Map","u":"https://board.studiowetware.com/p/sweta-map/","lines":["brown"],"hub":0,"closed":0}},"lines":[{"id":"red","n":"Cyanotype Process","c":"#E3242B","dash":0},{"id":"orange","n":"Cyanotype Step-by-step","c":"#F28C28","dash":0},{"id":"blue","n":"The Cyanotype Network","c":"#0072CE","dash":0},{"id":"teal","n":"Small Works","c":"#00A19C","dash":0},{"id":"green","n":"Gallery","c":"#00964A","dash":0},{"id":"purple","n":"GitBeach","c":"#7B2D8E","dash":0},{"id":"brown","n":"Board","c":"#8C5A2B","dash":0},{"id":"pages","n":"GitHub Pages","c":"#00A19C","dash":1},{"id":"yellow","n":"Beach Self-Grading","c":"#F2BF00","dash":0},{"id":"gray","n":"About","c":"#8A8D91","dash":0}],"map":"https://beachkila.github.io/SiteMap/"};
const DASH_HTML = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<meta name=\"robots\" content=\"noindex,nofollow\">\n<title>S.We.T.A. Ridership</title>\n<style>\n:root{--bg:#141413;--panel:#1c1c1a;--panel2:#242421;--ink:#ecebe6;--muted:#9a9a93;--rule:#33332f;--amber:#f2b134;--hot:#e5483b;--ok:#6fbf73;\n  --mono:ui-monospace,Menlo,Consolas,monospace;--sans:\"Helvetica Neue\",Arial,system-ui,sans-serif;color-scheme:dark}\n*{box-sizing:border-box}\nhtml,body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.45 var(--sans)}\nheader{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;padding:12px 16px;border-bottom:3px solid var(--ink)}\nh1{font-size:18px;margin:0;font-weight:800;letter-spacing:-.01em}\nh1 small{font-weight:400;color:var(--muted);font-size:12px;margin-left:8px}\n.sp{flex:1}\nselect,button,input{font:inherit;color:var(--ink);background:var(--panel2);border:1px solid var(--rule);border-radius:8px;padding:5px 10px}\nbutton{cursor:pointer}\nbutton:hover,select:hover{border-color:var(--muted)}\nnav{display:flex;gap:4px;padding:8px 16px 0;border-bottom:1px solid var(--rule);overflow-x:auto}\nnav button{border:0;border-bottom:3px solid transparent;border-radius:0;background:none;padding:8px 12px;color:var(--muted);font-weight:700;white-space:nowrap}\nnav button[aria-selected=true]{color:var(--ink);border-bottom-color:var(--amber)}\nmain{padding:16px;max-width:1400px;margin:0 auto}\n.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:16px}\n.card{background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:10px 12px}\n.card b{display:block;font-size:24px;font-family:var(--mono);line-height:1.1}\n.card span{color:var(--muted);font-size:12px}\n.grid{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,1fr);gap:16px}\n@media(max-width:900px){.grid{grid-template-columns:1fr}}\n.box{background:var(--panel);border:1px solid var(--rule);border-radius:10px;overflow:hidden}\n.box h2{margin:0;padding:10px 12px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);border-bottom:1px solid var(--rule);display:flex;gap:8px;align-items:center}\n.box h2 .sp{flex:1}\niframe{display:block;width:100%;height:560px;border:0;background:#fff}\ntable{width:100%;border-collapse:collapse}\nth,td{text-align:left;padding:6px 10px;border-bottom:1px solid var(--rule);vertical-align:middle}\nth{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);font-weight:700;cursor:pointer;white-space:nowrap}\ntd.n,th.n{text-align:right;font-family:var(--mono)}\ntr.click{cursor:pointer}\ntr.click:hover td{background:var(--panel2)}\n.bar{display:inline-block;height:8px;border-radius:4px;background:var(--amber);vertical-align:middle;min-width:2px}\n.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;vertical-align:-1px}\n.pill{display:inline-block;font-size:11px;padding:1px 8px;border-radius:999px;border:1px solid var(--rule);color:var(--muted)}\n.pill.hot{color:var(--hot);border-color:var(--hot)}.pill.amber{color:var(--amber);border-color:var(--amber)}.pill.ok{color:var(--ok);border-color:var(--ok)}\n.muted{color:var(--muted)}\n.empty{padding:30px 16px;text-align:center;color:var(--muted)}\n.tl{padding:8px 12px 12px}\n.tl .sess{margin:10px 0 4px;font-weight:700;font-size:12px;color:var(--amber);font-family:var(--mono)}\n.tl .ev{display:grid;grid-template-columns:96px 1fr;gap:8px;padding:3px 0 3px 12px;border-left:2px solid var(--rule);font-size:13px}\n.tl .ev .t{white-space:nowrap;color:var(--muted);font-family:var(--mono);font-size:12px}\n.tl .ev.click{border-left-color:var(--amber)}\n.tl .ev.click .what{color:var(--amber)}\n.spark{display:flex;align-items:flex-end;gap:2px;height:60px;padding:8px 12px}\n.spark i{flex:1;background:var(--amber);min-width:2px;border-radius:2px 2px 0 0;opacity:.85}\n.build{padding:0}\n.build .it{padding:10px 12px;border-bottom:1px solid var(--rule)}\n.build .it:last-child{border:0}\n.build .it b{display:block}\n#login{max-width:420px;margin:60px auto;padding:20px;background:var(--panel);border:1px solid var(--rule);border-radius:10px}\n#login input{width:100%;margin:10px 0}\n.err{color:var(--hot)}\n</style>\n</head>\n<body>\n<header>\n  <h1>S.We.T.A. Ridership<small>private</small></h1>\n  <span class=\"sp\"></span>\n  <label class=\"muted\">Period <select id=\"days\"><option value=\"7\">7 days</option><option value=\"30\" selected>30 days</option><option value=\"90\">90 days</option></select></label>\n  <button id=\"refresh\">Refresh</button>\n  <button id=\"csv\">Export CSV</button>\n  <button id=\"json\">Export JSON</button>\n</header>\n<nav id=\"tabs\" role=\"tablist\"></nav>\n<main id=\"main\"></main>\n\n<script>\n(function () {\n  \"use strict\";\n  var $ = function (s, r) { return (r || document).querySelector(s); };\n  var esc = function (v) { return String(v == null ? \"\" : v).replace(/[&<>\"]/g, function (c) { return { \"&\": \"&amp;\", \"<\": \"&lt;\", \">\": \"&gt;\", '\"': \"&quot;\" }[c]; }); };\n  var TOKEN = \"\"; try { TOKEN = sessionStorage.getItem(\"swt_tok\") || \"\"; } catch (e) {}\n  var META = null, SUM = null, RIDERS = null, TAB = \"heat\", METRIC = \"views\", SORT = { k: \"visits\", d: -1 };\n\n  var TABS = [[\"heat\", \"Heat map\"], [\"stations\", \"Stations\"], [\"riders\", \"Riders\"], [\"flows\", \"Flows\"], [\"build\", \"Build out\"]];\n  $(\"#tabs\").innerHTML = TABS.map(function (t) { return '<button role=\"tab\" data-t=\"' + t[0] + '\" aria-selected=\"' + (t[0] === TAB) + '\">' + t[1] + \"</button>\"; }).join(\"\");\n  $(\"#tabs\").onclick = function (e) { var b = e.target.closest(\"button\"); if (!b) return; TAB = b.dataset.t; [].forEach.call($(\"#tabs\").children, function (x) { x.setAttribute(\"aria-selected\", x === b); }); draw(); };\n\n  function api(path) {\n    var h = TOKEN ? { authorization: \"Bearer \" + TOKEN } : {};\n    return fetch(path, { headers: h, cache: \"no-store\", credentials: \"same-origin\" }).then(function (r) {\n      if (r.status === 401) { var e = new Error(\"unauthorized\"); e.code = 401; throw e; }\n      if (!r.ok) throw new Error(\"HTTP \" + r.status);\n      return r;\n    });\n  }\n  function days() { return $(\"#days\").value; }\n  function load() {\n    $(\"#main\").innerHTML = '<div class=\"empty\">Loading\u2026</div>';\n    return Promise.all([META ? META : api(\"/api/meta\").then(function (r) { return r.json(); }), api(\"/api/summary?days=\" + days()).then(function (r) { return r.json(); }), api(\"/api/riders?days=\" + days()).then(function (r) { return r.json(); })])\n      .then(function (a) { META = a[0]; SUM = a[1]; RIDERS = a[2].riders; draw(); })\n      .catch(function (e) { if (e.code === 401) login(); else $(\"#main\").innerHTML = '<div class=\"empty err\">Could not load: ' + esc(e.message) + \"</div>\"; });\n  }\n  function login(msg) {\n    $(\"#main\").innerHTML = '<div id=\"login\"><b>Read token</b><p class=\"muted\">This page is behind Cloudflare Access. If you are seeing this, paste the read token instead.</p><input id=\"tok\" type=\"password\" autocomplete=\"off\" placeholder=\"READ_TOKEN\"><button id=\"go\">Open</button><p class=\"err\">' + esc(msg || \"\") + \"</p></div>\";\n    $(\"#go\").onclick = function () { TOKEN = $(\"#tok\").value.trim(); try { sessionStorage.setItem(\"swt_tok\", TOKEN); } catch (e) {} load(); };\n  }\n\n  var nm = function (id) { return META.stops[id] ? META.stops[id].n : id; };\n  var lineOf = function (id) { var s = META.stops[id]; if (!s || !s.lines.length) return null; for (var i = 0; i < META.lines.length; i++) if (s.lines.indexOf(META.lines[i].id) > -1) return META.lines[i]; return null; };\n  var dotFor = function (id) { var l = lineOf(id); return '<i class=\"dot\" style=\"background:' + (l ? l.c : \"#777\") + '\"></i>'; };\n  var num = function (n) { return Number(n || 0).toLocaleString(); };\n  var pct = function (a, b) { return b ? Math.round(100 * a / b) + \"%\" : \"\u2013\"; };\n  var when = function (ts) { var d = new Date(ts); return d.toLocaleDateString(undefined, { month: \"short\", day: \"numeric\" }) + \" \" + d.toLocaleTimeString(undefined, { hour: \"2-digit\", minute: \"2-digit\" }); };\n\n  function rows() {\n    var out = [];\n    Object.keys(META.stops).forEach(function (id) {\n      var s = SUM.stops[id] || { views: 0, riders: 0, entries: 0, exits: 0, bounces: 0, clicksOut: 0 };\n      out.push({ id: id, name: nm(id), views: s.views, riders: s.riders, entries: s.entries, exits: s.exits, bounces: s.bounces, clicksOut: s.clicksOut });\n    });\n    return out;\n  }\n  function cards() {\n    var t = SUM.totals;\n    return '<div class=\"cards\">' + [[\"Riders\", t.riders], [\"Trips\", t.sessions], [\"Stop visits\", t.visits], [\"Moves between stops\", t.moves], [\"Moves using S.We.T.A.\", t.assistedMoves], [\"Cross-site moves\", t.crossSiteMoves]]\n      .map(function (c) { return '<div class=\"card\"><b>' + num(c[1]) + \"</b><span>\" + c[0] + \"</span></div>\"; }).join(\"\") + \"</div>\";\n  }\n  function spark() {\n    var t = SUM.trend || []; if (!t.length) return \"\";\n    var mx = Math.max.apply(null, t.map(function (d) { return d.visits; })) || 1;\n    return '<div class=\"box\" style=\"margin-bottom:16px\"><h2>Visits per day</h2><div class=\"spark\">' + t.map(function (d) { return '<i title=\"' + d.day + \": \" + d.visits + ' visits, ' + d.riders + ' riders\" style=\"height:' + Math.max(3, 100 * d.visits / mx) + '%\"></i>'; }).join(\"\") + \"</div></div>\";\n  }\n\n  function draw() {\n    if (!META || !SUM) return;\n    var m = $(\"#main\"); m.onclick = null;\n    if (TAB === \"heat\") {\n      var r = rows().sort(function (a, b) { return b[METRIC] - a[METRIC]; }), mx = (r[0] && r[0][METRIC]) || 1;\n      m.innerHTML = cards() + spark() + '<div class=\"grid\"><div class=\"box\"><h2>Busiest stations<span class=\"sp\"></span><select id=\"metric\"><option value=\"views\">Visits</option><option value=\"riders\">Riders</option><option value=\"entries\">Entries</option></select></h2><iframe id=\"map\" title=\"Map\" src=\"' + esc(META.map) + '?embed=1\"></iframe></div>' +\n        '<div class=\"box\"><h2>Ranking</h2><table>' + r.filter(function (x) { return x[METRIC] > 0; }).slice(0, 25).map(function (x) {\n          return '<tr class=\"click\" data-s=\"' + x.id + '\"><td>' + dotFor(x.id) + esc(x.name) + '</td><td class=\"n\">' + num(x[METRIC]) + '</td><td style=\"width:30%\"><span class=\"bar\" style=\"width:' + Math.max(2, 100 * x[METRIC] / mx) + '%\"></span></td></tr>';\n        }).join(\"\") + (r.some(function (x) { return x[METRIC] > 0; }) ? \"\" : '<tr><td class=\"empty\">No rides counted yet.</td></tr>') + \"</table></div></div>\";\n      $(\"#metric\").value = METRIC; $(\"#metric\").onchange = function () { METRIC = this.value; draw(); };\n      var f = $(\"#map\"), send = function () { var d = {}; rows().forEach(function (x) { if (x[METRIC] > 0) d[x.id] = x[METRIC]; }); try { f.contentWindow.postMessage({ swt: \"heat\", data: d }, \"*\"); } catch (e) {} };\n      f.onload = function () { send(); setTimeout(send, 600); };\n    } else if (TAB === \"stations\") {\n      var rs = rows(); rs.forEach(function (x) { x.bouncePct = x.entries ? x.bounces / x.entries : 0; x.exitPct = x.views ? x.exits / x.views : 0; });\n      rs.sort(function (a, b) { var A = a[SORT.k], B = b[SORT.k]; return (typeof A === \"string\" ? A.localeCompare(B) : A - B) * SORT.d; });\n      var cols = [[\"name\", \"Station\"], [\"views\", \"Visits\"], [\"riders\", \"Riders\"], [\"entries\", \"Entries\"], [\"exits\", \"Exits\"], [\"bounces\", \"Bounces\"], [\"clicksOut\", \"Map/strip clicks\"]];\n      m.innerHTML = '<div class=\"box\"><h2>All stations</h2><div style=\"overflow-x:auto\"><table><thead><tr>' + cols.map(function (c) { return '<th class=\"' + (c[0] === \"name\" ? \"\" : \"n\") + '\" data-k=\"' + c[0] + '\">' + c[1] + (SORT.k === c[0] ? (SORT.d < 0 ? \" \u25be\" : \" \u25b4\") : \"\") + \"</th>\"; }).join(\"\") + \"</tr></thead><tbody>\" +\n        rs.map(function (x) { return \"<tr><td>\" + dotFor(x.id) + esc(x.name) + '</td><td class=\"n\">' + num(x.views) + '</td><td class=\"n\">' + num(x.riders) + '</td><td class=\"n\">' + num(x.entries) + '</td><td class=\"n\">' + num(x.exits) + '</td><td class=\"n\">' + num(x.bounces) + '</td><td class=\"n\">' + num(x.clicksOut) + \"</td></tr>\"; }).join(\"\") + \"</tbody></table></div></div>\";\n      m.querySelector(\"thead\").onclick = function (e) { var th = e.target.closest(\"th\"); if (!th) return; SORT = { k: th.dataset.k, d: SORT.k === th.dataset.k ? -SORT.d : -1 }; draw(); };\n    } else if (TAB === \"riders\") {\n      m.innerHTML = '<div class=\"grid\"><div class=\"box\"><h2>Riders <span class=\"muted\">(anonymous)</span></h2><div style=\"overflow-x:auto\"><table><thead><tr><th>Rider</th><th>Last seen</th><th class=\"n\">Trips</th><th class=\"n\">Visits</th><th class=\"n\">Stops</th><th class=\"n\">Sites</th><th class=\"n\">Clicks</th></tr></thead><tbody>' +\n        (RIDERS.length ? RIDERS.map(function (x) { return '<tr class=\"click\" data-r=\"' + x.id + '\"><td style=\"font-family:var(--mono)\">' + x.id.slice(0, 8) + \"</td><td>\" + when(x.last) + '</td><td class=\"n\">' + x.sessions + '</td><td class=\"n\">' + x.visits + '</td><td class=\"n\">' + x.stops + '</td><td class=\"n\">' + x.sites + '</td><td class=\"n\">' + x.clicks + \"</td></tr>\"; }).join(\"\") : '<tr><td colspan=\"7\" class=\"empty\">No riders yet.</td></tr>') +\n        '</tbody></table></div></div><div class=\"box\"><h2>Journey</h2><div id=\"jny\" class=\"empty\">Pick a rider.</div></div></div>';\n      m.onclick = function (e) { var tr = e.target.closest(\"tr[data-r]\"); if (!tr) return; journey(tr.dataset.r); };\n    } else if (TAB === \"flows\") {\n      var fl = SUM.flows;\n      m.innerHTML = '<div class=\"box\"><h2>Moves between stations <span class=\"muted\">(assisted = used the strip or map)</span></h2><div style=\"overflow-x:auto\"><table><thead><tr><th>From</th><th>To</th><th class=\"n\">Moves</th><th class=\"n\">Assisted</th><th class=\"n\">Cross-site</th><th></th></tr></thead><tbody>' +\n        (fl.length ? fl.slice(0, 80).map(function (f) { return \"<tr><td>\" + dotFor(f.from) + esc(nm(f.from)) + \"</td><td>\" + dotFor(f.to) + esc(nm(f.to)) + '</td><td class=\"n\">' + f.n + '</td><td class=\"n\">' + f.assisted + \" (\" + pct(f.assisted, f.n) + ')</td><td class=\"n\">' + f.cross + '</td><td style=\"width:20%\"><span class=\"bar\" style=\"width:' + Math.max(3, 100 * f.n / fl[0].n) + '%\"></span></td></tr>'; }).join(\"\") : '<tr><td colspan=\"6\" class=\"empty\">No moves counted yet.</td></tr>') + \"</tbody></table></div></div>\";\n    } else if (TAB === \"build\") {\n      buildOut(m);\n    }\n    var tr = m.querySelectorAll(\"tr[data-s]\"); [].forEach.call(tr, function (r) { r.onclick = function () { TAB = \"stations\"; [].forEach.call($(\"#tabs\").children, function (x) { x.setAttribute(\"aria-selected\", x.dataset.t === TAB); }); draw(); }; });\n  }\n\n  function journey(id) {\n    var box = $(\"#jny\"); box.className = \"\"; box.innerHTML = '<div class=\"empty\">Loading\u2026</div>';\n    api(\"/api/rider?id=\" + encodeURIComponent(id)).then(function (r) { return r.json(); }).then(function (d) {\n      box.innerHTML = '<div class=\"tl\">' + d.sessions.map(function (s, i) {\n        return '<div class=\"sess\">Trip ' + (i + 1) + \" \u00b7 \" + when(s.start) + \" \u00b7 \" + Math.max(1, Math.round((s.end - s.start) / 60000)) + \" min</div>\" + s.events.map(function (e) {\n          var t = new Date(e.ts).toLocaleTimeString(undefined, { hour: \"2-digit\", minute: \"2-digit\", second: \"2-digit\" });\n          var what = e.type === \"click\" ? \"Used S.We.T.A.: \" + esc(e.stop === \"map\" ? \"map\" : nm(e.stop)) + \" \u2192 \" + esc(e.to_stop === \"map\" ? \"map\" : nm(e.to_stop)) : (e.type === \"station\" ? \"Opened \" : \"Visited \") + esc(nm(e.stop)) + ' <span class=\"muted\">' + esc((e.host || \"\") + (e.path || \"\")) + \"</span>\";\n          return '<div class=\"ev ' + e.type + '\"><span class=\"t\">' + t + '</span><span class=\"what\">' + what + \"</span></div>\";\n        }).join(\"\");\n      }).join(\"\") + \"</div>\";\n    }).catch(function (e) { box.innerHTML = '<div class=\"empty err\">' + esc(e.message) + \"</div>\"; });\n  }\n\n  // Where to build: plain rules over the numbers, each with the reason shown.\n  function buildOut(m) {\n    var rs = rows(), items = [], total = SUM.totals.visits;\n    var by = {}; rs.forEach(function (x) { by[x.id] = x; });\n    if (total < 20) {\n      m.innerHTML = cards() + '<div class=\"box\"><h2>Where to build out</h2><div class=\"empty\">Not enough rides yet. Suggestions start once there are about 20 stop visits.</div></div>'; return;\n    }\n    var live = rs.filter(function (x) { return !(META.stops[x.id] || {}).closed; });\n    var avg = total / Math.max(1, live.length);\n    live.forEach(function (x) {\n      var s = META.stops[x.id];\n      if (x.views >= avg * 1.5 && x.entries && x.exits / x.views > 0.7 && x.clicksOut === 0)\n        items.push({ w: x.views, tag: \"hot\", t: \"Dead end: \" + x.name, d: x.views + \" visits, \" + pct(x.exits, x.views) + \" of them end here and nobody used the strip or map. Add a visible next stop.\" });\n      if (x.entries >= 5 && x.bounces / x.entries > 0.7)\n        items.push({ w: x.entries, tag: \"amber\", t: \"Leaves quickly: \" + x.name, d: pct(x.bounces, x.entries) + \" of \" + x.entries + \" arrivals saw only this page. The entrance may not match what people expect.\" });\n    });\n    var none = live.filter(function (x) { return x.views === 0; });\n    if (none.length) items.push({ w: 2, tag: \"\", t: \"No visits in \" + SUM.days + \" days (\" + none.length + \" stations)\", d: none.map(function (x) { return x.name; }).join(\", \") });\n    SUM.flows.forEach(function (f) {\n      var a = META.stops[f.from], b = META.stops[f.to];\n      if (!a || !b || f.n < 3) return;\n      var shared = a.lines.some(function (l) { return b.lines.indexOf(l) > -1; });\n      if (!shared) items.push({ w: f.n, tag: \"ok\", t: \"Riders already cross: \" + nm(f.from) + \" \u2192 \" + nm(f.to), d: f.n + \" moves between stops on different lines\" + (f.assisted ? \", \" + f.assisted + \" using S.We.T.A\" : \"\") + \". A transfer or a direct link would make this official.\" });\n    });\n    var unassisted = SUM.totals.moves - SUM.totals.assistedMoves;\n    if (SUM.totals.moves >= 10 && unassisted / SUM.totals.moves > 0.7)\n      items.push({ w: unassisted, tag: \"amber\", t: \"Strip is under-used\", d: pct(unassisted, SUM.totals.moves) + \" of moves between stops did not go through the strip or map.\" });\n    items.sort(function (a, b) { return b.w - a.w; });\n    m.innerHTML = cards() + '<div class=\"box build\"><h2>Where to build out <span class=\"muted\">(rules on the numbers, not predictions)</span></h2>' +\n      (items.length ? items.slice(0, 30).map(function (i) { return '<div class=\"it\"><b>' + esc(i.t) + (i.tag ? ' <span class=\"pill ' + i.tag + '\">' + (i.tag === \"hot\" ? \"fix\" : i.tag === \"ok\" ? \"opportunity\" : \"watch\") + \"</span>\" : \"\") + '</b><span class=\"muted\">' + esc(i.d) + \"</span></div>\"; }).join(\"\") : '<div class=\"empty\">Nothing stands out.</div>') + \"</div>\";\n  }\n\n  function download(fmt) {\n    api(\"/api/export?days=\" + days() + \"&format=\" + fmt).then(function (r) { return r.blob(); }).then(function (b) {\n      var a = document.createElement(\"a\"); a.href = URL.createObjectURL(b); a.download = \"sweta-events.\" + fmt; document.body.appendChild(a); a.click(); a.remove();\n    }).catch(function (e) { alert(e.message); });\n  }\n  $(\"#refresh\").onclick = load; $(\"#days\").onchange = load;\n  $(\"#csv\").onclick = function () { download(\"csv\"); }; $(\"#json\").onclick = function () { download(\"json\"); };\n  load();\n})();\n</script>\n</body>\n</html>\n";

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
