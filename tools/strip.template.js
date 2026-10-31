/* S.We.T.A. station strip. Shows which stop on the Studio Wetware Transit Authority map the current page is.
   Data is generated from index.html by tools/build-strip.js. */
(function () {
  "use strict";
  var DATA = /*DATA*/null;
  var MAP_URL = "https://beachkila.github.io/SiteMap/";
  var TRACK = /*TRACK*/""; // Rider counting endpoint. Empty = off.

  // ---- rider counting: anonymous browser ID, handed along links the strip builds ----
  var RID = "";
  var OPTOUT = false;
  try { OPTOUT = navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true; } catch (e) {}
  function newId() {
    var a = new Uint8Array(16), s = "";
    (window.crypto || window.msCrypto).getRandomValues(a);
    for (var i = 0; i < a.length; i++) s += (a[i] % 36).toString(36);
    return s;
  }
  (function () {
    if (!TRACK || OPTOUT) return;
    try {
      var q = new URLSearchParams(location.search), h = q.get("swt");
      if (h && /^[a-z0-9]{8,32}$/.test(h)) {
        localStorage.setItem("swt_rid", h);
        q.delete("swt");
        var qs = q.toString();
        history.replaceState(history.state, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
      }
      RID = localStorage.getItem("swt_rid") || "";
      if (!/^[a-z0-9]{8,32}$/.test(RID)) { RID = newId(); localStorage.setItem("swt_rid", RID); }
    } catch (e) { RID = ""; }
  })();
  // The id goes before any #route, so the Network site's hash routes (#/cmyk) stay intact.
  function hand(u) {
    if (!RID) return u;
    var i = u.indexOf("#"), base = i > -1 ? u.slice(0, i) : u, hash = i > -1 ? u.slice(i) : "";
    return base + (base.indexOf("?") > -1 ? "&" : "?") + "swt=" + RID + hash;
  }
  // The site the visitor came from (host name only), when it is another site.
  var REF = ""; try { var ru = new URL(document.referrer); if (ru.hostname !== location.hostname) REF = ru.hostname; } catch (e) {}
  function track(type, stop, to) {
    if (!TRACK || OPTOUT || !RID) return;
    try {
      var body = JSON.stringify({ t: type, s: stop || "", o: to || "", r: RID, h: location.hostname, p: location.pathname, k: "strip", f: REF });
      if (navigator.sendBeacon && navigator.sendBeacon(TRACK + "/hit", new Blob([body], { type: "text/plain" }))) return;
      fetch(TRACK + "/hit", { method: "POST", body: body, keepalive: true, mode: "cors", headers: { "content-type": "text/plain" } }).catch(function () {});
    } catch (e) {}
  }
  var S = DATA.stations, LINES = DATA.lines;
  var TOUCH = window.matchMedia ? window.matchMedia("(hover:none)") : null;

  // The Network site is one page that switches by #/route, so the route is part of the address.
  function norm(u) {
    try {
      var a = new URL(u, location.href);
      var h = /^#\/[^\/?]+/.exec(a.hash);
      return (a.hostname.replace(/^www\./, "") + a.pathname.replace(/\/+$/, "") + (h ? h[0] : "")).toLowerCase();
    } catch (e) { return ""; }
  }
  var byUrl = {};
  Object.keys(S).forEach(function (id) {
    if (S[id].nm) return;
    byUrl[norm(S[id].u)] = id;
    (S[id].a || []).forEach(function (u) { if (!byUrl[norm(u)]) byUrl[norm(u)] = id; });
  });
  function here() {
    var n = norm(location.href);
    if (byUrl[n]) return byUrl[n];
    var m = /^([^#\/]+)(\/[^#]*)?#\//.exec(n); // an unknown route on a site with routes opens its first screen
    return m ? (byUrl[m[1] + "#/feed"] || null) : null;
  }

  function placements(id, withDash) {
    var out = [];
    LINES.forEach(function (l, li) {
      if (l.dash && !withDash) return;
      l.b.forEach(function (br, bi) {
        var i = br.indexOf(id);
        if (i > -1) out.push({ li: li, line: l, bi: bi, seq: br, i: i });
      });
    });
    return out;
  }

  function plan(id) {
    var ps = placements(id);
    if (!ps.length) ps = placements(id, true); // stops only on the dashed GitHub Pages line
    if (!ps.length) return null;
    var mid = ps.filter(function (p) { return p.i > 0; });
    var lineIds = {};
    ps.forEach(function (p) { lineIds[p.line.id] = p.line; });
    var lines = Object.keys(lineIds).map(function (k) { return lineIds[k]; });
    if (!mid.length && lines.length > 1) return { hub: true, id: id, lines: lines };
    var main = (mid.length ? mid : ps)[0];
    var transfers = lines.filter(function (l) { return l.id !== main.line.id; });
    return { hub: false, id: id, main: main, transfers: transfers };
  }

  function mapHref(id) { return hand(MAP_URL + "?from=" + encodeURIComponent(id)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function a(id, cls) { return '<a class="' + (cls || "") + '" data-to="' + id + '" href="' + esc(hand(S[id].u)) + '">' + esc(S[id].n) + "</a>"; }
  function dot(l) { return '<i class="ld" style="background:' + l.c + '"></i>'; }
  function lineChip(l) { return '<span class="chip">' + dot(l) + esc(l.n) + "</span>"; }

  var CSS = [
    ":host{display:block;font-family:Arial,Helvetica,sans-serif;line-height:1.25;margin:0;max-width:none}",
    "*{box-sizing:border-box}",
    ".tk{background:#121314;color:#fff;padding:12px 0 11px;overflow:hidden;width:100%}",".in{max-width:1280px;margin:0 auto;padding:0 22px}",".contained .tk{border-radius:8px}",
    ".row{display:flex;align-items:center;gap:10px}",
    ".open{display:flex;align-items:center;gap:10px;background:none;border:0;padding:4px 6px 4px 0;margin:-4px 0;color:inherit;cursor:pointer;font:inherit;text-align:left;border-radius:6px;min-height:34px}",
    ".open:hover .lname,.open:focus-visible .lname{text-decoration:underline;text-underline-offset:3px}",
    ".open .chev{font-size:10px;color:#9a9a9a;margin-left:-4px}",
    "button.map{background:none;cursor:pointer;font-family:Arial}",
    ".tw{overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch;margin:2px 0 0}",".tw::-webkit-scrollbar{display:none}",
    ".labs{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:baseline;font-size:12px;margin-top:2px;min-height:18px}",
    ".labs>*{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
    ".labs .pv{text-align:left}.labs .nx{text-align:right}.labs .cu{font-weight:700;color:#fff;max-width:46vw;text-align:center}",
    ".labs a{color:#b5b5b5;text-decoration:none}.labs a:hover,.labs a:focus{color:#fff;text-decoration:underline}",
    ".labs .cu a{color:#fff;text-decoration:underline;text-underline-offset:2px}.labs .cu small{font-weight:400;color:#9a9a9a;margin-left:6px}",
    "a.st{display:block}a.st:hover .dot,a.st:focus-visible .dot,.st.arm .dot{background:#fff}",
    ".st.arm .dot{box-shadow:0 0 0 4px rgba(255,255,255,.35)}",
    ".badge{flex:none;width:22px;height:22px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 11px Arial}",
    ".lname{flex:none;font:700 11px Arial;letter-spacing:.06em;text-transform:uppercase}",
    ".sp{flex:1}",
    ".map{flex:none;color:#bbb;font:700 11px Arial;letter-spacing:.08em;text-decoration:none;border:1px solid #444;border-radius:4px;padding:6px 10px;min-height:30px;display:inline-flex;align-items:center}",
    ".map:hover,.map:focus{color:#fff;border-color:#fff}",
    ".track{position:relative;height:30px;margin:0 26px}",
    ".bar{position:absolute;left:-14px;right:-14px;top:13px;height:6px;border-radius:3px}",
    ".st{position:absolute;top:0;width:24px;height:30px;margin-left:-12px}",
    ".dot{position:absolute;left:6px;top:10px;width:12px;height:12px;border-radius:50%;background:#121314;border:3px solid #fff}",
    ".st.cur .dot{left:3px;top:7px;width:18px;height:18px;border-width:4px}",
    ".st.cur .dot{box-shadow:0 0 0 0 rgba(255,255,255,.55);animation:ping 2.4s ease-out infinite}",
    "@keyframes ping{70%{box-shadow:0 0 0 9px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}",
    ".more{position:absolute;top:8px;color:#888;font-size:13px;letter-spacing:2px}",
    ".msg{margin-top:6px;border-top:1px solid #2c2d30;padding-top:7px;font-size:12px;color:#ddd;display:flex;align-items:center;gap:14px}",".mqw{flex:1;min-width:0;overflow:hidden}",".priv{flex:none;color:#8d8f94;font:11px Arial;text-decoration:underline;text-underline-offset:2px;padding:4px 0}",".priv:hover,.priv:focus{color:#fff}",
    ".mq{display:flex;gap:0;white-space:nowrap;width:max-content;align-items:center}",
    ".mq .grp{display:flex;align-items:center;gap:9px;padding-right:36px}",
    ".mq b{color:#fff}",
    ".mq a{color:#fff;text-decoration:underline;text-underline-offset:2px}",
    ".tag{font:700 9px Arial;background:#fff;color:#121314;border-radius:3px;padding:2px 5px;letter-spacing:.06em}",
    ".ld{display:inline-block;width:10px;height:10px;border-radius:50%;border:1.5px solid #fff;vertical-align:-1px;margin-right:4px}",
    ".chip{display:inline-flex;align-items:center;margin-right:2px}",
    ".chips{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:9px}",
    ".chips a{color:#fff;text-decoration:none;font-size:12px;display:inline-flex;align-items:center;border:1px solid #3a3b3e;border-radius:14px;padding:3px 9px}",
    ".chips a:hover,.chips a:focus{border-color:#fff}",
    ".go .mq{animation:go var(--dur,20s) linear infinite}",
    ".go:hover .mq{animation-play-state:paused}",
    "@keyframes go{to{transform:translateX(-50%)}}",
    "@media (prefers-reduced-motion:reduce){.go .mq{animation:none;width:auto;flex-wrap:wrap;white-space:normal}.go .grp+.grp{display:none}.st.cur .dot{animation:none}}",
    ".narrow .lname{font-size:11px}.narrow .in{padding:0 14px}.narrow .track{margin:0 20px}.narrow .msg{font-size:13px;flex-wrap:wrap;gap:2px}.narrow .mqw{flex:1 1 0}.narrow .priv{align-self:flex-end;padding:4px 0 2px}.narrow .mq{width:auto;white-space:normal;flex-wrap:wrap}.narrow .mq .grp{flex-wrap:wrap;gap:6px 9px;padding-right:0}.narrow .chips a{padding:8px 12px;font-size:13px}.wide .labs{font-size:13px}.wide .lname{font-size:12px}.wide .msg{font-size:13px}",
    // light theme (opted in with data-theme="light")
    ".lt .tk{background:#fcfbf7;color:#14171a;border-bottom:1px solid #e6e2d8}",
    ".lt .badge{border-color:#fcfbf7;box-shadow:0 0 0 1px #cfcabb}",
    ".lt .map{color:#16385c;border-color:#cfcabb}.lt .map:hover,.lt .map:focus{color:#0e2a47;border-color:#16385c}",
    ".lt .dot{background:#fff;border-color:#14171a}",
    ".lt .labs a{color:#4a4a44}.lt .labs a:hover{color:#14171a}.lt .labs .cu,.lt .labs .cu a{color:#14171a}.lt a.st:hover .dot,.lt .st.arm .dot{background:#14171a}.lt .open .chev{color:#5b6770}",
    ".lt .st.cur .dot{animation:none}",
    ".lt .more{color:#5b6770}",
    ".lt .msg{border-top-color:#e6e2d8;color:#3f4a52}.lt .mq b{color:#14171a}.lt .mq a{color:#16385c}",
    ".lt .tag{background:#16385c;color:#fff}",
    ".lt .ld{border-color:#14171a}",
    ".lt .chips a{color:#16385c;border-color:#cfcabb}.lt .chips a:hover,.lt .chips a:focus{border-color:#16385c}",
    ".lt .priv{color:#5b6770}.lt .priv:hover,.lt .priv:focus{color:#14171a}"
  ].join("");

  // line panel: the whole line as a station diagram. Bottom sheet on phones, side panel on wider screens.
  var SCSS = [
    ":host([hidden]){display:none}*{box-sizing:border-box}",
    ".scrim{position:fixed;inset:0;z-index:2147483000;background:rgba(20,23,26,.4)}",
    ".sh{position:fixed;top:0;right:0;bottom:var(--bar,0px);z-index:2147483001;width:min(420px,100vw);overflow-y:auto;padding:16px 18px 22px;font-family:Arial,Helvetica,sans-serif;line-height:1.25;background:#121314;color:#fff;border-left:1px solid #333;box-shadow:-10px 0 30px rgba(0,0,0,.3)}",
    "@media (max-width:640px){.sh{top:auto;left:0;width:auto;max-height:82vh;border-left:0;border-top:1px solid #333;border-radius:16px 16px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.3);padding-top:10px}}",
    ".grab{display:none;width:40px;height:4px;border-radius:2px;background:#555;margin:0 auto 10px}@media (max-width:640px){.grab{display:block}}",
    ".hd{display:flex;align-items:center;gap:10px;margin-bottom:12px}",
    ".bd{flex:none;width:30px;height:30px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 14px Arial}",
    ".ln{flex:1;font:700 13px Arial;letter-spacing:.05em;text-transform:uppercase}",
    ".x{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid #444;background:none;color:#ddd;font:400 20px Arial;cursor:pointer;line-height:1}",
    ".chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 14px}",
    ".chips button{display:inline-flex;align-items:center;gap:6px;border:1px solid #3a3b3e;border-radius:16px;padding:6px 11px;background:none;color:#ddd;font:600 12px Arial;cursor:pointer}",
    ".chips button i{width:10px;height:10px;border-radius:50%;border:1.5px solid #fff}",
    ".chips button.on{background:#fff;color:#121314;border-color:#fff}.chips button.on i{border-color:#121314}",
    ".hint{color:#9a9a9a;font-size:13px;margin:4px 0 0}",
    "ul.lv{list-style:none;margin:0;padding:0;position:relative}",
    "ul.lv li{position:relative;padding:0}",
    ".r{position:relative;display:flex;align-items:center;gap:8px;min-height:40px;padding:0 0 0 34px}",
    ".r .d{position:absolute;left:5px;top:12px;width:16px;height:16px;border-radius:50%;background:#121314;border:3.5px solid #fff;z-index:2}",
    "li:not(:last-child)>.rail{position:absolute;left:10.5px;top:20px;bottom:-20px;width:5px;background:var(--lc);z-index:1}",
    ".r a,.r .nm{color:#fff;text-decoration:none;font-size:15px;padding:8px 0}",
    ".r a:hover,.r a:focus{text-decoration:underline;text-underline-offset:3px}",
    ".r.cur .d{width:22px;height:22px;left:2px;top:9px;border-width:5px;background:var(--lc)}",
    ".r.cur .nm{font-weight:700}",
    ".tag{font:700 9px Arial;background:#fff;color:#121314;border-radius:3px;padding:2px 5px;letter-spacing:.06em;white-space:nowrap}",
    ".xf{display:inline-flex;gap:3px;margin-left:2px}.xf i{width:9px;height:9px;border-radius:50%;border:1.5px solid #fff}",
    ".r.hub a,.r.hub .nm{font-weight:700}",
    "ul.br{margin-left:24px;position:relative}",
    "ul.br>.elb{position:absolute;left:-13.5px;top:-20px;width:30px;height:42.5px;border-left:5px solid var(--lc);border-bottom:5px solid var(--lc);border-bottom-left-radius:14px;z-index:1}",
    "ul.br+ul.br>.elb{top:0;height:22.5px}",
    ".kids>ul.br:not(:last-child)::after{content:'';position:absolute;left:-13.5px;top:0;bottom:0;width:5px;background:var(--lc);z-index:1}",
    ".bl{font:700 10px Arial;letter-spacing:.08em;color:#8d8f94;text-transform:uppercase;padding:2px 0 0 34px}",
    ".ft{margin-top:14px;padding-top:12px;border-top:1px solid #333;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;font-size:13px;color:#ccc;line-height:1.55}",
    ".mp{color:#fff;font:700 12px Arial;letter-spacing:.08em;text-decoration:none;border:1px solid #555;border-radius:6px;padding:10px 14px}",
    ".mp:hover,.mp:focus{border-color:#fff}",
    ".nt a{color:#fff;text-decoration:underline;text-underline-offset:2px}",
    ".pv{color:#8d8f94;font-size:12px;margin-left:auto}",
    ".lt .sh{background:#fcfbf7;color:#14171a;border-color:#e6e2d8;box-shadow:-10px 0 30px rgba(0,0,0,.12)}",
    ".lt .grab{background:#cfcabb}.lt .bd{border-color:#fcfbf7;box-shadow:0 0 0 1px #cfcabb}.lt .x{border-color:#cfcabb;color:#14171a}",
    ".lt .chips button{color:#16385c;border-color:#cfcabb}.lt .chips button i{border-color:#14171a}.lt .chips button.on{background:#16385c;color:#fff;border-color:#16385c}.lt .chips button.on i{border-color:#fff}",
    ".lt .r .d{background:#fff;border-color:#14171a}.lt .r.cur .d{background:var(--lc)}.lt .r a,.lt .r .nm{color:#14171a}",
    ".lt .tag{background:#16385c;color:#fff}.lt .xf i{border-color:#14171a}",
    ".lt .ft{border-top-color:#e6e2d8;color:#3f4a52}.lt .mp{color:#16385c;border-color:#cfcabb}.lt .nt a{color:#16385c}.lt .pv{color:#5b6770}"
  ].join("");

  // The run of stops the bar shows: from the start of the line, through this stop, to the end of its longest way on.
  function pathThrough(l, id) {
    var brs = l.b.map(function (br) { return br.filter(function (x) { return S[x]; }); });
    function before(sid, depth) { // stops leading up to sid, sid included
      if (depth > 6) return [sid];
      for (var k = 0; k < brs.length; k++) {
        var j = brs[k].indexOf(sid);
        if (j > 0 || (j === 0 && k === 0)) return k && j > 0 ? before(brs[k][0], depth + 1).concat(brs[k].slice(1, j + 1)) : brs[k].slice(0, j + 1);
      }
      return [sid];
    }
    function after(sid, depth) { // longest way on from sid, sid excluded
      var best = [];
      if (depth > 6) return best;
      brs.forEach(function (br) { var j = br.indexOf(sid); if (j > -1 && j < br.length - 1) { var rest = br.slice(j + 1); rest = rest.concat(after(rest[rest.length - 1], depth + 1)); if (rest.length > best.length) best = rest; } });
      return best;
    }
    return before(id, 0).concat(after(id, 0));
  }
  var linesOf = function (sid) { return LINES.filter(function (l) { return l.b.some(function (br) { return br.indexOf(sid) > -1; }); }); };
  var textOn = function (c) { return c === "#F2BF00" ? "#121314" : "#fff"; };

  // One line drawn as a station diagram: the first branch is the trunk, later branches fork off the stop they start from.
  function lineHTML(l, id) {
    var brs = l.b.map(function (br) { return br.filter(function (x) { return S[x]; }); }).filter(function (br) { return br.length; });
    var kids = {}, placed = {}, extra = [];
    (brs[0] || []).forEach(function (x) { placed[x] = 1; });
    brs.slice(1).forEach(function (br) {
      if (placed[br[0]]) { (kids[br[0]] = kids[br[0]] || []).push(br.slice(1)); br.slice(1).forEach(function (x) { placed[x] = 1; }); }
      else { extra.push(br); br.forEach(function (x) { placed[x] = 1; }); }
    });
    function item(sid) {
      var cur = sid === id, other = linesOf(sid).filter(function (o) { return o.id !== l.id; });
      var xf = other.length ? '<span class="xf" title="Change for ' + esc(other.map(function (o) { return o.n; }).join(", ")) + '">' + other.map(function (o) { return '<i style="background:' + o.c + '"></i>'; }).join("") + "</span>" : "";
      var name = cur ? '<span class="nm">' + esc(S[sid].n) + '</span><span class="tag">YOU ARE HERE</span>' : '<a data-to="' + sid + '" href="' + esc(hand(S[sid].u)) + '">' + esc(S[sid].n) + "</a>";
      var sub = kids[sid] ? '<div class="kids">' + kids[sid].map(function (br) { return '<ul class="lv br"><span class="elb"></span>' + br.map(item).join("") + "</ul>"; }).join("") + "</div>" : "";
      return '<li><span class="rail"></span><div class="r' + (cur ? " cur" : "") + (S[sid].hub ? " hub" : "") + '"><span class="d"></span>' + name + xf + "</div>" + sub + "</li>";
    }
    return '<div style="--lc:' + l.c + '"><ul class="lv">' + (brs[0] || []).map(item).join("") + "</ul>" +
      extra.map(function (br, i) { return '<div class="bl">Branch ' + (i + 2) + '</div><ul class="lv">' + br.map(item).join("") + "</ul>"; }).join("") + "</div>";
  }

  function panelHTML(id, p, pick) {
    var here = S[id], lines = p.hub ? p.lines : [p.main.line].concat(p.transfers);
    var l = pick ? lines.filter(function (x) { return x.id === pick; })[0] : (p.hub ? null : p.main.line);
    var head = l ? '<div class="bd" style="background:' + l.c + ";color:" + textOn(l.c) + '">' + esc(l.k) + '</div><div class="ln">' + esc(l.n) + " line</div>"
      : '<div class="bd" style="background:#E3242B;color:#fff">S</div><div class="ln">' + esc(here.n) + "</div>";
    var chips = lines.length > 1 ? '<div class="chips">' + lines.map(function (x) { return '<button type="button" data-line="' + x.id + '" class="' + (l && x.id === l.id ? "on" : "") + '"><i style="background:' + x.c + '"></i>' + esc(x.n) + "</button>"; }).join("") + "</div>" : "";
    var body = l ? lineHTML(l, id) : '<p class="hint">' + esc(here.n) + " is a hub. Pick a line to see its stops.</p>";
    var info = here.x ? '<span class="nt">Connects to ' + here.x.map(function (q) { return a(q); }).join(", ") + "</span>" : "";
    return '<div class="grab"></div><div class="hd">' + head + '<button type="button" class="x" data-close aria-label="Close">×</button></div>' + chips + body +
      '<div class="ft"><a class="mp" data-to="map" href="' + esc(mapHref(id)) + '">OPEN FULL MAP</a>' + info + '<a class="pv" data-to="privacy" href="' + esc(hand(MAP_URL + "?privacy=1")) + '">Privacy</a></div>';
  }

  function render(host, id) {
    var p = plan(id);
    if (!p) { host.style.display = "none"; return; }
    var root = host.shadowRoot || host.attachShadow({ mode: "open" });
    var w = host.clientWidth || 600;
    var narrow = w < 480, wide = w >= 1100;
    var html = "", msg = "";
    var here = S[id];

    if (p.hub) {
      html = '<div class="row"><button type="button" class="open" data-open aria-label="Show the lines at ' + esc(here.n) + '"><span class="badge" style="background:#E3242B">S</span><span class="lname">' + esc(here.n) + '</span><span class="chev">▾</span></button><span class="sp"></span><button type="button" class="map" data-open>MAP</button></div>' +
        '<div class="chips">' + p.lines.map(function (l) {
          var first = l.b[0].filter(function (x) { return x !== id && S[x]; })[0];
          return '<a data-to="' + first + '" href="' + esc(hand(S[first].u)) + '">' + dot(l) + esc(l.n) + "</a>";
        }).join("") + "</div>";
      msg = '<span class="tag">YOU ARE HERE</span><b>' + esc(here.n) + '</b><span>\u00b7</span><span>Hub station. Pick a line to ride.</span>';
    } else {
      var m = p.main, seq = pathThrough(m.line, id), i = seq.indexOf(id), n = seq.length;
      // Every stop on the line is a dot. When they do not fit, the track scrolls with this stop in the middle.
      var gap = narrow ? 30 : wide ? 48 : 38, avail = Math.min(w, 1280) - (narrow ? 28 : 44) - (narrow ? 40 : 52);
      var tw = Math.max(avail, (n - 1) * gap), px = function (k) { return n === 1 ? tw / 2 : k * tw / (n - 1); };
      var stops = seq.map(function (sid, k) {
        var cur = sid === id;
        return cur ? '<span class="st cur" style="left:' + px(k) + 'px" title="' + esc(S[sid].n) + ' (you are here)"><span class="dot"></span></span>'
          : '<a class="st" data-to="' + sid + '" data-dot href="' + esc(hand(S[sid].u)) + '" style="left:' + px(k) + 'px" title="' + esc(S[sid].n) + '" aria-label="' + esc(S[sid].n) + '"><span class="dot"></span></a>';
      }).join("");
      var prev = seq[i - 1], nxt = seq[i + 1];
      var light = m.line.c === "#F2BF00";
      html = '<div class="row"><button type="button" class="open" data-open aria-label="Show every stop on the ' + esc(m.line.n) + ' line"><span class="badge" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</span><span class="lname">' + esc(m.line.n) + ' line</span><span class="chev">▾</span></button><span class="sp"></span><button type="button" class="map" data-open>MAP</button></div>' +
        '<div class="tw"><div class="track" style="width:' + tw + 'px"><div class="bar" style="background:' + m.line.c + '"></div>' + stops + "</div></div>" +
        '<div class="labs"><span class="pv">' + (prev ? "← " + a(prev) : "") + '</span><span class="cu">' + esc(here.n) + '</span><span class="nx">' + (nxt ? a(nxt) + " →" : "") + "</span></div>";
      var next = nxt;
      msg = '<span class="tag">' + (p.transfers.length ? "TRANSFER" : "YOU ARE HERE") + "</span>" +
        (p.transfers.length ? '<span class="chip">' + dot(m.line) + p.transfers.map(dot).join("") + "</span>" : "") +
        "<b>" + esc(here.n) + "</b><span>\u00b7</span>" +
        (next ? "<span>Next stop: " + a(next) + "</span>" : "<span>Last stop on " + (/^the /i.test(m.line.n) ? "" : "the ") + esc(m.line.n) + " line</span>") +
        (S[id].x ? "<span>\u00b7</span><span>Connects to " + S[id].x.map(function (q) { return a(q); }).join(", ") + "</span>" : "") +
        (p.transfers.length ? "<span>\u00b7</span><span>Change here for " + p.transfers.map(function (l) { return "<b>" + esc(l.n) + "</b>"; }).join(", ") + "</span>" : "");
    }
    root.innerHTML = "<style>" + CSS + '</style><div class="' + (host.hasAttribute("data-contained") ? "contained " : "") + (host.getAttribute("data-theme") === "light" ? "lt " : "") + '"><div class="tk' + (narrow ? " narrow" : wide ? " wide" : "") + '" role="navigation" aria-label="Station strip"><div class="in">' + html +
      '<div class="msg"><div class="mqw"><div class="mq"><div class="grp">' + msg + '</div></div></div><a class="priv" data-to="privacy" href="' + esc(hand(MAP_URL + "?privacy=1")) + '">Privacy</a></div></div></div></div>';

    if (!root._swt) {
      root._swt = 1;
      root.addEventListener("click", function (ev) {
        var cur = host._swtId || id;
        var o = ev.target && ev.target.closest ? ev.target.closest("[data-open]") : null;
        if (o) { if (host._openPanel) host._openPanel(); return; }
        var t = ev.target && ev.target.closest ? ev.target.closest("a") : null;
        if (!t) return;
        // On touch screens the first tap on a dot shows its name; a second tap goes there.
        if (t.hasAttribute("data-dot") && TOUCH && TOUCH.matches && root._arm !== t.getAttribute("data-to")) {
          ev.preventDefault();
          root._arm = t.getAttribute("data-to");
          [].forEach.call(root.querySelectorAll(".st.arm"), function (x) { x.classList.remove("arm"); });
          t.classList.add("arm");
          var cu = root.querySelector(".labs .cu");
          if (cu) cu.innerHTML = '<a data-to="' + root._arm + '" href="' + esc(t.getAttribute("href")) + '">' + esc(S[root._arm].n) + "</a><small>tap again</small>";
          clearTimeout(root._armT);
          root._armT = setTimeout(function () { root._arm = null; t.classList.remove("arm"); if (cu) cu.textContent = S[cur].n; }, 4000);
          return;
        }
        track("click", cur, t.getAttribute("data-to") || "");
      });
    }
    host._swtId = id; root._arm = null;
    var twb = root.querySelector(".tw"), curDot = root.querySelector(".st.cur");
    if (twb && curDot && twb.scrollWidth > twb.clientWidth) twb.scrollLeft = curDot.offsetLeft + 26 - twb.clientWidth / 2;
    var box = root.querySelector(".mqw"), mq = root.querySelector(".mq");
    if (!narrow && mq.scrollWidth > box.clientWidth + 2) {
      var g = mq.firstChild.cloneNode(true);
      g.setAttribute("aria-hidden", "true");
      mq.appendChild(g);
      box.style.setProperty("--dur", Math.max(12, Math.round(mq.scrollWidth / 2 / 45)) + "s");
      box.classList.add("go");
    }
  }

  function fit(el) {
    if (el.hasAttribute("data-contained")) return;
    var st = el.style;
    // Block themes center and cap direct children with !important rules, so override with !important too.
    st.setProperty("max-width", "none", "important");
    st.setProperty("margin-right", "0", "important");
    st.setProperty("margin-left", "0", "important");
    st.setProperty("width", "auto", "important");
    var r = el.getBoundingClientRect();
    st.setProperty("margin-left", (-r.left) + "px", "important");
    st.setProperty("width", document.documentElement.clientWidth + "px", "important");
  }

  function mount(el) {
    var fixed = el.getAttribute("data-stop");
    if (fixed && !S[fixed]) fixed = null;
    var cur = null, tm;
    var phone = el.getAttribute("data-phone") === "sheet" && window.matchMedia ? window.matchMedia("(max-width:999px)") : null;
    var barSel = el.getAttribute("data-bar"), light = el.getAttribute("data-theme") === "light";
    var sheet = null, open = false, curId = null;
    function setOpen(v) {
      open = !!v && !!sheet;
      if (sheet) sheet.host.hidden = !open;
      if (open) {
        var bar = barSel ? document.querySelector(barSel) : null;
        var bh = bar && !bar.hidden && bar.offsetHeight ? bar.offsetHeight : 0;
        sheet.host.style.setProperty("--bar", bh + "px");
      }
      window.dispatchEvent(new CustomEvent("swt-sheet", { detail: { open: open } }));
    }
    var pick = null;
    function ensure() {
      if (sheet) return;
      var hh = document.createElement("div"); hh.hidden = true; hh.className = "swt-sheet";
      document.body.appendChild(hh);
      sheet = { host: hh, root: hh.attachShadow({ mode: "open" }) };
      sheet.root.addEventListener("click", function (ev) {
        var t = ev.target && ev.target.closest ? ev.target.closest("a,.scrim,[data-close],[data-line]") : null;
        if (!t) return;
        if (t.hasAttribute("data-line")) { pick = t.getAttribute("data-line"); drawSheet(); return; }
        if (t.tagName !== "A") { setOpen(false); return; }
        track("click", curId, t.getAttribute("data-to") || "");
        setOpen(false);
      });
    }
    function drawSheet() {
      if (!sheet) return;
      var p = curId && plan(curId);
      if (!p) { if (open) setOpen(false); return; }
      sheet.root.innerHTML = "<style>" + SCSS + '</style><div class="' + (light ? "lt" : "") + '"><div class="scrim"></div><div class="sh" role="dialog" aria-modal="true" aria-label="Stops on this line">' + panelHTML(curId, p, pick) + "</div></div>";
      if (open) setOpen(true);
    }
    function openPanel() { ensure(); pick = null; drawSheet(); setOpen(true); var x = sheet.root.querySelector("[data-close]"); if (x) x.focus(); }
    el._openPanel = openPanel;
    window.SWTStrip = window.SWTStrip || {};
    window.SWTStrip.toggle = function () { if (open) setOpen(false); else openPanel(); };
    window.SWTStrip.open = openPanel;
    window.SWTStrip.close = function () { setOpen(false); };
    window.SWTStrip.isOpen = function () { return open; };
    window.SWTStrip.hasSheet = function () { return !!(phone && phone.matches); };
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) setOpen(false); });
    function show() {
      var id = fixed || here();
      if (!id) { el.style.display = "none"; cur = null; curId = null; return; }
      curId = id;
      if (phone && phone.matches) { el.style.display = "none"; }
      else { el.style.display = ""; fit(el); render(el, id); }
      drawSheet();
      window.dispatchEvent(new CustomEvent("swt-sheet", { detail: { open: open } }));
      if (id !== cur) { cur = id; pick = null; track("view", id, ""); }
    }
    show();
    window.addEventListener("hashchange", function () { setOpen(false); });
    window.addEventListener("resize", function () { clearTimeout(tm); tm = setTimeout(show, 120); });
    window.addEventListener("hashchange", show); // the Network site switches screens by #/route
  }

  function start() {
    var els = document.querySelectorAll(".swt-strip");
    for (var k = 0; k < els.length; k++) mount(els[k]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
