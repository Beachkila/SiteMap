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
  function hand(u) { return RID ? u + (u.indexOf("?") > -1 ? "&" : "?") + "swt=" + RID : u; }
  function track(type, stop, to) {
    if (!TRACK || OPTOUT || !RID) return;
    try {
      var body = JSON.stringify({ t: type, s: stop || "", o: to || "", r: RID, h: location.hostname, p: location.pathname, k: "strip" });
      if (navigator.sendBeacon && navigator.sendBeacon(TRACK + "/hit", new Blob([body], { type: "text/plain" }))) return;
      fetch(TRACK + "/hit", { method: "POST", body: body, keepalive: true, mode: "cors", headers: { "content-type": "text/plain" } }).catch(function () {});
    } catch (e) {}
  }
  var S = DATA.stations, LINES = DATA.lines;

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

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function a(id, cls) { return '<a class="' + (cls || "") + '" data-to="' + id + '" href="' + esc(hand(S[id].u)) + '">' + esc(S[id].n) + "</a>"; }
  function dot(l) { return '<i class="ld" style="background:' + l.c + '"></i>'; }
  function lineChip(l) { return '<span class="chip">' + dot(l) + esc(l.n) + "</span>"; }

  var CSS = [
    ":host{display:block;font-family:Arial,Helvetica,sans-serif;line-height:1.25;margin:0;max-width:none}",
    "*{box-sizing:border-box}",
    ".tk{background:#121314;color:#fff;padding:12px 0 11px;overflow:hidden;width:100%}",".in{max-width:1280px;margin:0 auto;padding:0 22px}",".contained .tk{border-radius:8px}",
    ".row{display:flex;align-items:center;gap:10px}",
    ".badge{flex:none;width:22px;height:22px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 11px Arial}",
    ".lname{flex:none;font:700 11px Arial;letter-spacing:.06em;text-transform:uppercase}",
    ".sp{flex:1}",
    ".map{flex:none;color:#bbb;font:700 11px Arial;letter-spacing:.08em;text-decoration:none;border:1px solid #444;border-radius:4px;padding:6px 10px;min-height:30px;display:inline-flex;align-items:center}",
    ".map:hover,.map:focus{color:#fff;border-color:#fff}",
    ".track{position:relative;height:50px;margin:2px 26px 0}",
    ".bar{position:absolute;left:-14px;right:-14px;top:13px;height:6px;border-radius:3px}",
    ".st{position:absolute;top:0;width:0}",
    ".dot{position:absolute;left:-6px;top:10px;width:12px;height:12px;border-radius:50%;background:#121314;border:3px solid #fff}",
    ".st.cur .dot{left:-9px;top:7px;width:18px;height:18px;border-width:4px}",
    ".st.first .lab{left:-6px;transform:none;text-align:left}",".st.last .lab{left:auto;right:-6px;transform:none;text-align:right}",".lab{position:absolute;top:30px;padding:2px 0;left:50%;transform:translateX(-50%);font-size:11px;white-space:nowrap;color:#b5b5b5;text-decoration:none;max-width:var(--lw,84px);overflow:hidden;text-overflow:ellipsis;text-align:center}",
    "a.lab:hover,a.lab:focus{color:#fff;text-decoration:underline}",
    ".st.cur .lab{color:#fff;font-weight:700}",
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
    ".narrow .lname{font-size:11px}.narrow .in{padding:0 14px}.narrow .track{margin:2px 38px 0;height:58px}.narrow .lab{font-size:11px;top:32px;padding:6px 0}.narrow .msg{font-size:13px;flex-wrap:wrap;gap:2px}.narrow .mqw{flex:1 1 100%}.narrow .priv{margin-left:auto;padding:8px 0 2px}.narrow .mq{width:auto;white-space:normal;flex-wrap:wrap}.narrow .mq .grp{flex-wrap:wrap;gap:6px 9px;padding-right:0}.narrow .chips a{padding:8px 12px;font-size:13px}.wide .lab{font-size:12px}.wide .lname{font-size:12px}.wide .msg{font-size:13px}",
    // light theme (opted in with data-theme="light")
    ".lt .tk{background:#fcfbf7;color:#14171a;border-bottom:1px solid #e6e2d8}",
    ".lt .badge{border-color:#fcfbf7;box-shadow:0 0 0 1px #cfcabb}",
    ".lt .map{color:#16385c;border-color:#cfcabb}.lt .map:hover,.lt .map:focus{color:#0e2a47;border-color:#16385c}",
    ".lt .dot{background:#fff;border-color:#14171a}",
    ".lt .lab{color:#4a4a44}.lt a.lab:hover,.lt a.lab:focus{color:#14171a}.lt .st.cur .lab{color:#14171a}",
    ".lt .st.cur .dot{animation:none}",
    ".lt .more{color:#5b6770}",
    ".lt .msg{border-top-color:#e6e2d8;color:#3f4a52}.lt .mq b{color:#14171a}.lt .mq a{color:#16385c}",
    ".lt .tag{background:#16385c;color:#fff}",
    ".lt .ld{border-color:#14171a}",
    ".lt .chips a{color:#16385c;border-color:#cfcabb}.lt .chips a:hover,.lt .chips a:focus{border-color:#16385c}",
    ".lt .priv{color:#5b6770}.lt .priv:hover,.lt .priv:focus{color:#14171a}"
  ].join("");

  // phone sheet: the full line as buttons, opened from a button on the host page
  var SCSS = [
    ":host([hidden]){display:none}*{box-sizing:border-box}",
    ".scrim{position:fixed;inset:0;z-index:43;background:rgba(20,23,26,.35)}",
    ".sh{position:fixed;left:0;right:0;bottom:var(--bar,0px);z-index:44;max-height:72vh;overflow-y:auto;border-radius:16px 16px 0 0;padding:10px 14px 14px;font-family:Arial,Helvetica,sans-serif;line-height:1.25;background:#121314;color:#fff;border-top:1px solid #333;box-shadow:0 -10px 30px rgba(0,0,0,.25)}",
    ".grab{width:40px;height:4px;border-radius:2px;background:#555;margin:0 auto 10px}",
    ".hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}",
    ".bd{flex:none;width:30px;height:30px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 14px Arial}",
    ".ln{flex:1;font:700 13px Arial;letter-spacing:.05em;text-transform:uppercase}",
    ".mp{flex:none;color:#ddd;font:700 12px Arial;letter-spacing:.08em;text-decoration:none;border:1px solid #555;border-radius:6px;padding:9px 13px}",
    ".g{display:grid;grid-template-columns:1fr 1fr;gap:8px}",
    ".b{display:flex;align-items:center;gap:9px;min-height:46px;padding:9px 10px;border:1px solid #3a3b3e;border-radius:8px;color:#fff;text-decoration:none;font:600 14px Arial;background:#1b1d1f}",
    ".b i{flex:none;width:12px;height:12px;border-radius:50%;border:3px solid var(--lc,#fff);background:#121314}",
    ".b.cur{background:#fff;color:#121314;border-color:#fff}.b.cur i{background:var(--lc,#121314);border-color:#121314}",
    ".b.w{grid-column:span 2}",
    ".nt{margin-top:11px;padding-top:10px;border-top:1px solid #333;font-size:13px;color:#ccc;line-height:1.55}",
    ".nt a{color:#fff;text-decoration:underline;text-underline-offset:2px}",
    ".pv{display:inline-block;margin-top:8px;color:#8d8f94;font-size:12px}",
    ".lt .sh{background:#fcfbf7;color:#14171a;border-top-color:#e6e2d8;box-shadow:0 -10px 30px rgba(0,0,0,.12)}",
    ".lt .grab{background:#cfcabb}.lt .bd{border-color:#fcfbf7;box-shadow:0 0 0 1px #cfcabb}",
    ".lt .mp{color:#16385c;border-color:#cfcabb}",
    ".lt .b{background:#fff;color:#14171a;border-color:#e6e2d8}.lt .b i{background:#fff}",
    ".lt .b.cur{background:#16385c;color:#fff;border-color:#16385c}.lt .b.cur i{background:#16385c;border-color:#fff}",
    ".lt .nt{border-top-color:#e6e2d8;color:#3f4a52}.lt .nt a{color:#16385c}.lt .pv{color:#5b6770}"
  ].join("");

  function windowOf(seq, i, size) {
    if (seq.length <= size) return { s: 0, e: seq.length };
    var s = Math.max(0, Math.min(i - Math.floor((size - 1) / 2), seq.length - size));
    return { s: s, e: s + size };
  }

  function sheetHTML(id, p) {
    var here = S[id], h = "", info = "";
    if (p.hub) {
      h = '<div class="hd"><div class="bd" style="background:#E3242B;color:#fff">S</div><div class="ln">' + esc(here.n) + '</div><a class="mp" data-to="map" href="' + esc(hand(MAP_URL)) + '">MAP</a></div><div class="g">' +
        p.lines.map(function (l) {
          var first = l.b[0].filter(function (x) { return x !== id && S[x]; })[0];
          return '<a class="b w" style="--lc:' + l.c + '" data-to="' + first + '" href="' + esc(hand(S[first].u)) + '"><i></i>' + esc(l.n) + "</a>";
        }).join("") + "</div>";
    } else {
      var m = p.main, seq = m.seq.filter(function (x) { return S[x]; }), light = m.line.c === "#F2BF00";
      h = '<div class="hd"><div class="bd" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</div><div class="ln">' + esc(m.line.n) + ' line</div><a class="mp" data-to="map" href="' + esc(hand(MAP_URL)) + '">MAP</a></div><div class="g" style="--lc:' + m.line.c + '">' +
        seq.map(function (sid) {
          var long = S[sid].n.length > 24;
          return sid === id ? '<span class="b cur' + (long ? " w" : "") + '" aria-current="page"><i></i>' + esc(S[sid].n) + "</span>"
            : '<a class="b' + (long ? " w" : "") + '" data-to="' + sid + '" href="' + esc(hand(S[sid].u)) + '"><i></i>' + esc(S[sid].n) + "</a>";
        }).join("") + "</div>";
      if (p.transfers.length) info += "<div>Change here for " + p.transfers.map(function (l) { return "<b>" + esc(l.n) + "</b>"; }).join(", ") + "</div>";
      if (S[id].x) info += "<div>Connects to " + S[id].x.map(function (q) { return a(q); }).join(", ") + "</div>";
    }
    return h + '<div class="nt">' + info + '<a class="pv" data-to="privacy" href="' + esc(hand(MAP_URL + "?privacy=1")) + '">Privacy</a></div>';
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
      html = '<div class="row"><div class="badge" style="background:#E3242B">S</div><div class="lname">' + esc(here.n) + '</div><span class="sp"></span><a class="map" data-to="map" href="' + esc(hand(MAP_URL)) + '">MAP</a></div>' +
        '<div class="chips">' + p.lines.map(function (l) {
          var first = l.b[0].filter(function (x) { return x !== id && S[x]; })[0];
          return '<a data-to="' + first + '" href="' + esc(hand(S[first].u)) + '">' + dot(l) + esc(l.n) + "</a>";
        }).join("") + "</div>";
      msg = '<span class="tag">YOU ARE HERE</span><b>' + esc(here.n) + '</b><span>\u00b7</span><span>Hub station. Pick a line to ride.</span>';
    } else {
      var m = p.main, seq = m.seq.filter(function (x) { return S[x]; }), i = seq.indexOf(id);
      var win = windowOf(seq, i, w < 480 ? 3 : w < 760 ? 5 : w < 1100 ? 7 : 9);
      var vis = seq.slice(win.s, win.e), n = vis.length;
      var pos = function (k) { return n === 1 ? 50 : k * 100 / (n - 1); };
      var lw = Math.max(48, Math.min(wide ? 120 : 96, Math.floor((Math.min(w, 1280) - 100) / Math.max(n - 1, 1)) - 6));
      var stops = vis.map(function (sid, k) {
        var cur = sid === id;
        return '<div class="st' + (cur ? " cur" : "") + '" style="left:' + pos(k) + '%"><span class="dot"></span>' +
          (cur ? '<span class="lab">' + esc(S[sid].n) + "</span>" : a(sid, "lab")) + "</div>";
      }).join("");
      var more = (win.s > 0 ? '<span class="more" style="left:-26px">\u2026</span>' : "") + (win.e < seq.length ? '<span class="more" style="right:-26px">\u2026</span>' : "");
      var light = m.line.c === "#F2BF00";
      html = '<div class="row"><div class="badge" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</div><div class="lname">' + esc(m.line.n) + ' line</div><span class="sp"></span><a class="map" data-to="map" href="' + esc(hand(MAP_URL)) + '">MAP</a></div>' +
        '<div class="track" style="--lw:' + lw + 'px"><div class="bar" style="background:' + m.line.c + '"></div>' + stops + more + "</div>";
      var next = seq[i + 1];
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
        var t = ev.target && ev.target.closest ? ev.target.closest("a") : null;
        if (t) track("click", id, t.getAttribute("data-to") || "");
      });
    }
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
    function drawSheet() {
      if (!phone || !phone.matches) { if (sheet) { sheet.host.remove(); sheet = null; if (open) setOpen(false); } return; }
      var p = curId && plan(curId);
      if (!p) return;
      if (!sheet) {
        var hh = document.createElement("div"); hh.hidden = true; hh.className = "swt-sheet";
        document.body.appendChild(hh);
        sheet = { host: hh, root: hh.attachShadow({ mode: "open" }) };
        sheet.root.addEventListener("click", function (ev) {
          var t = ev.target && ev.target.closest ? ev.target.closest("a,.scrim") : null;
          if (!t) return;
          if (t.classList.contains("scrim")) { setOpen(false); return; }
          track("click", curId, t.getAttribute("data-to") || "");
          setOpen(false);
        });
      }
      sheet.root.innerHTML = "<style>" + SCSS + '</style><div class="' + (light ? "lt" : "") + '"><div class="scrim"></div><div class="sh" role="dialog" aria-label="Line stops"><div class="grab"></div>' + sheetHTML(curId, p) + "</div></div>";
      if (open) setOpen(true);
    }
    window.SWTStrip = window.SWTStrip || {};
    window.SWTStrip.toggle = function () { drawSheet(); setOpen(!open); };
    window.SWTStrip.open = function () { drawSheet(); setOpen(true); };
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
      if (id !== cur) { cur = id; track("view", id, ""); }
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
