/* S.We.T.A. station strip. Shows which stop on the Studio Wetware Transit Authority map the current page is.
   Data is generated from index.html by tools/build-strip.js. */
(function () {
  "use strict";
  var DATA = {"stations":{"SW":{"n":"Studio Wetware","u":"https://studiowetware.com/"},"about":{"n":"About Beach","u":"https://studiowetware.com/aboutbeach/"},"netpage":{"n":"Network page","u":"https://studiowetware.com/network/"},"solat":{"n":"SoLaT negatives","u":"https://studiowetware.com/solat-digital-negatives/"},"cmyk":{"n":"CMYK for UV","u":"https://studiowetware.com/cmyk/"},"sunprint":{"n":"Sunprint UVI","u":"https://studiowetware.com/sunprint/"},"enlarger":{"n":"Negative enlarger","u":"https://studiowetware.com/negative-enlarger/"},"NET":{"n":"The Cyanotype Network","u":"https://network.studiowetware.com/"},"SMW":{"n":"Small Works","u":"https://smallworks.studiowetware.com/"},"gitbeach":{"n":"GitBeach","u":"https://studiowetware.com/gitbeach/"},"picam":{"n":"Pi-Cam-IR-A","u":"https://studiowetware.com/pi-cam-ir-a/"},"atlas":{"n":"Atlas","u":"https://studiowetware.com/atlas/"},"blackbox":{"n":"Black Box","u":"https://studiowetware.com/black-box/"},"bucke":{"n":"Buck-E","u":"https://studiowetware.com/buck-e-musical-cipher/"},"pender":{"n":"PENDER Studios","u":"https://studiowetware.com/pender-studios/"},"bang":{"n":"Bang!","u":"https://studiowetware.com/bang/"},"potholes":{"n":"Adopt-a-Pothole","u":"https://studiowetware.com/potholes/"},"planes":{"n":"Plane Spotter","u":"https://studiowetware.com/plane-spotter/"},"githoods":{"n":"GitHoods","u":"https://studiowetware.com/githoods/"},"board":{"n":"Project Board","u":"https://board.studiowetware.com/"},"mediums":{"n":"Mediums","u":"https://board.studiowetware.com/spectra/"},"stack":{"n":"Stack","u":"https://board.studiowetware.com/skills/"},"pimaker":{"n":"Pi-Maker","u":"https://beachkila.github.io/Pi-Maker/"},"BSG":{"n":"Beach Self-Grading","u":"https://beachselfgrading.com/"},"create":{"n":"Create a Beach-Tag","u":"https://tag.beachselfgrading.com/"},"bsggal":{"n":"Beach-Tag Gallery","u":"https://beachselfgrading.com/gallery/"},"templates":{"n":"Printable templates","u":"https://beachselfgrading.com/templates/"},"whatis":{"n":"What are Beach-Tags?","u":"https://beachselfgrading.com/what-are-beach-tags/"},"contact":{"n":"Tip / Contact","u":"https://beachselfgrading.com/contact-me/"},"galleries":{"n":"All galleries","u":"https://studiowetware.com/galleries/"},"cyanogal":{"n":"Cyanotypes","u":"https://studiowetware.com/cyanotype-gallery/"},"lino":{"n":"Linocuts","u":"https://studiowetware.com/linocut-gallery/"},"pendergal":{"n":"PENDER plotter","u":"https://studiowetware.com/pender-3d-gallery/"},"irgal":{"n":"IR photography","u":"https://studiowetware.com/infrared-photography-gallery/"},"neggal":{"n":"Negatives","u":"https://studiowetware.com/negatives-gallery/"},"digigal":{"n":"Digital","u":"https://studiowetware.com/digital-gallery/"},"ui":{"n":"Interfaces","u":"https://studiowetware.com/program-gallery/"},"undisc":{"n":"Undisciplined","u":"https://studiowetware.com/undisciplined-gallery/"},"process":{"n":"Cyanotype process","u":"https://studiowetware.com/how-cyanotype-works/"},"light":{"n":"Light","u":"https://studiowetware.com/light/"},"salt":{"n":"Salt","u":"https://studiowetware.com/salt/"},"thinkneg":{"n":"Think Negative","u":"https://studiowetware.com/think-negative/"},"seepos":{"n":"See Positive","u":"https://studiowetware.com/see-positive/"},"sbs":{"n":"Step-by-step","u":"https://studiowetware.com/step-by-step/"},"step1":{"n":"Step 1 \u00b7 Negative","u":"https://studiowetware.com/step-1/"},"step2":{"n":"Step 2 \u00b7 Preparation","u":"https://studiowetware.com/step-2/"},"step3":{"n":"Step 3 \u00b7 UV exposure","u":"https://studiowetware.com/step-3/"},"step4":{"n":"Step 4 \u00b7 Wash","u":"https://studiowetware.com/step-4/"},"bp-ai-station":{"n":"AI Station","u":"https://board.studiowetware.com/p/ai-station/"},"bp-dock-to-stock":{"n":"Dock to Stock","u":"https://board.studiowetware.com/p/dock-to-stock/"},"bp-beelab":{"n":"BeeLab","u":"https://board.studiowetware.com/p/beelab/"},"bp-coolpix-ir":{"n":"Coolpix IR conversion","u":"https://board.studiowetware.com/p/coolpix-ir/"},"bp-droneaware-node":{"n":"DroneAware node","u":"https://board.studiowetware.com/p/droneaware-node/"},"bp-fire-hd8-linux-pad":{"n":"Fire HD 8 Linux pad","u":"https://board.studiowetware.com/p/fire-hd8-linux-pad/"},"bp-ink-drawer":{"n":"Ink Drawer","u":"https://board.studiowetware.com/p/ink-drawer/"},"bp-redditprofiler":{"n":"redditprofiler","u":"https://board.studiowetware.com/p/redditprofiler/"},"bp-snake-lcd-pi":{"n":"Snake LCD Pi","u":"https://board.studiowetware.com/p/snake-lcd-pi/"},"bp-ir-dev":{"n":"IR DEV","u":"https://board.studiowetware.com/p/ir-dev/"},"bp-nmap-subway":{"n":"nmap subway","u":"https://board.studiowetware.com/p/nmap-subway/"},"here":{"n":"S.We.T.A. Map","u":"https://board.studiowetware.com/p/sweta-map/"}},"lines":[{"id":"red","n":"Process","c":"#E3242B","dash":0,"b":[["SW","process","light","salt","thinkneg","seepos"]]},{"id":"orange","n":"Step-by-Step","c":"#F28C28","dash":0,"b":[["SW","sbs","step1","step2","step3","step4"]]},{"id":"blue","n":"Network","c":"#0072CE","dash":0,"b":[["SW","netpage","solat","cmyk","sunprint","enlarger","NET"]]},{"id":"teal","n":"Small Works","c":"#00A19C","dash":0,"b":[["SW","SMW"]]},{"id":"green","n":"Gallery","c":"#00964A","dash":0,"b":[["SW","galleries","cyanogal","lino","pendergal","irgal","neggal","digigal","ui","undisc"]]},{"id":"purple","n":"GitBeach","c":"#7B2D8E","dash":0,"b":[["SW","gitbeach","picam","atlas","blackbox","bucke","pender","bang","potholes","planes","githoods"]]},{"id":"brown","n":"Board","c":"#B07A45","dash":0,"b":[["gitbeach","board","mediums","stack"],["board","here","bp-ai-station","bp-dock-to-stock","bp-beelab","bp-coolpix-ir","bp-droneaware-node","bp-fire-hd8-linux-pad","bp-ink-drawer","bp-redditprofiler","bp-snake-lcd-pi","bp-ir-dev","bp-nmap-subway"]]},{"id":"pages","n":"GitHub Pages","c":"#00A19C","dash":1,"b":[["stack","pimaker"]]},{"id":"yellow","n":"Beach","c":"#F2BF00","dash":0,"b":[["SW","BSG","create","bsggal","templates"],["BSG","whatis","contact"]]},{"id":"gray","n":"About","c":"#8A8D91","dash":0,"b":[["SW","about"]]}]};
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
