/* S.We.T.A. station strip. Shows which stop on the Studio Wetware Transit Authority map the current page is.
   Data is generated from index.html by tools/build-strip.js. */
(function () {
  "use strict";
  var DATA = /*DATA*/null;
  var MAP_URL = "https://beachkila.github.io/SiteMap/";
  var S = DATA.stations, LINES = DATA.lines;

  function norm(u) {
    try {
      var a = new URL(u, location.href);
      return (a.hostname.replace(/^www\./, "") + a.pathname.replace(/\/+$/, "")).toLowerCase();
    } catch (e) { return ""; }
  }
  var byUrl = {};
  Object.keys(S).forEach(function (id) { byUrl[norm(S[id].u)] = id; });

  function placements(id) {
    var out = [];
    LINES.forEach(function (l, li) {
      if (l.dash) return;
      l.b.forEach(function (br, bi) {
        var i = br.indexOf(id);
        if (i > -1) out.push({ li: li, line: l, bi: bi, seq: br, i: i });
      });
    });
    return out;
  }

  function plan(id) {
    var ps = placements(id);
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
  function a(id, cls) { return '<a class="' + (cls || "") + '" href="' + esc(S[id].u) + '">' + esc(S[id].n) + "</a>"; }
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
    ".msg{margin-top:6px;border-top:1px solid #2c2d30;padding-top:7px;overflow:hidden;font-size:12px;color:#ddd}",
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
    ".narrow .lname{font-size:11px}.narrow .in{padding:0 14px}.narrow .track{margin:2px 38px 0;height:58px}.narrow .lab{font-size:11px;top:32px;padding:6px 0}.narrow .msg{font-size:13px}.narrow .mq{width:auto;white-space:normal;flex-wrap:wrap}.narrow .mq .grp{flex-wrap:wrap;gap:6px 9px;padding-right:0}.narrow .chips a{padding:8px 12px;font-size:13px}.wide .lab{font-size:12px}.wide .lname{font-size:12px}.wide .msg{font-size:13px}"
  ].join("");

  function windowOf(seq, i, size) {
    if (seq.length <= size) return { s: 0, e: seq.length };
    var s = Math.max(0, Math.min(i - Math.floor((size - 1) / 2), seq.length - size));
    return { s: s, e: s + size };
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
      html = '<div class="row"><div class="badge" style="background:#E3242B">S</div><div class="lname">' + esc(here.n) + '</div><span class="sp"></span><a class="map" href="' + MAP_URL + '">MAP</a></div>' +
        '<div class="chips">' + p.lines.map(function (l) {
          var first = l.b[0].filter(function (x) { return x !== id && S[x]; })[0];
          return '<a href="' + esc(S[first].u) + '">' + dot(l) + esc(l.n) + "</a>";
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
      html = '<div class="row"><div class="badge" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.n[0]) + '</div><div class="lname">' + esc(m.line.n) + ' line</div><span class="sp"></span><a class="map" href="' + MAP_URL + '">MAP</a></div>' +
        '<div class="track" style="--lw:' + lw + 'px"><div class="bar" style="background:' + m.line.c + '"></div>' + stops + more + "</div>";
      var next = seq[i + 1];
      msg = '<span class="tag">' + (p.transfers.length ? "TRANSFER" : "YOU ARE HERE") + "</span>" +
        (p.transfers.length ? '<span class="chip">' + dot(m.line) + p.transfers.map(dot).join("") + "</span>" : "") +
        "<b>" + esc(here.n) + "</b><span>\u00b7</span>" +
        (next ? "<span>Next stop: " + a(next) + "</span>" : "<span>Last stop on the " + esc(m.line.n) + " line</span>") +
        (p.transfers.length ? "<span>\u00b7</span><span>Change here for " + p.transfers.map(function (l) { return "<b>" + esc(l.n) + "</b>"; }).join(", ") + "</span>" : "");
    }
    root.innerHTML = "<style>" + CSS + '</style><div class="' + (host.hasAttribute("data-contained") ? "contained " : "") + '"><div class="tk' + (narrow ? " narrow" : wide ? " wide" : "") + '" role="navigation" aria-label="Station strip"><div class="in">' + html +
      '<div class="msg"><div class="mq"><div class="grp">' + msg + "</div></div></div></div></div></div>";

    var box = root.querySelector(".msg"), mq = root.querySelector(".mq");
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
    el.style.marginLeft = "0"; el.style.width = "auto";
    var r = el.getBoundingClientRect();
    el.style.marginLeft = (-r.left) + "px";
    el.style.width = document.documentElement.clientWidth + "px";
  }

  function mount(el) {
    var id = el.getAttribute("data-stop");
    if (!id || !S[id]) id = byUrl[norm(location.href)];
    if (!id) { el.style.display = "none"; return; }
    fit(el); render(el, id);
    var tm;
    window.addEventListener("resize", function () {
      clearTimeout(tm);
      tm = setTimeout(function () { fit(el); render(el, id); }, 120);
    });
  }

  function start() {
    var els = document.querySelectorAll(".swt-strip");
    for (var k = 0; k < els.length; k++) mount(els[k]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
