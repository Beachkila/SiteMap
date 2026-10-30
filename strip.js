/* S.We.T.A. station strip. Shows which stop on the Studio Wetware Transit Authority map the current page is.
   Data is generated from index.html by tools/build-strip.js. */
(function () {
  "use strict";
  var DATA = {"stations":{"SW":{"n":"Studio Wetware","u":"https://studiowetware.com/"},"about":{"n":"About Beach","u":"https://studiowetware.com/aboutbeach/"},"netpage":{"n":"The Network (write-up)","u":"https://studiowetware.com/network/","x":["NET"]},"solat":{"n":"SoLaT (write-up)","u":"https://studiowetware.com/solat-digital-negatives/","x":["thinkneg","step1","n_neg","n_learn"]},"cmyk":{"n":"CMYK for UV (write-up)","u":"https://studiowetware.com/cmyk/","x":["n_cmyk"]},"sunprint":{"n":"Sunprint UVI (write-up)","u":"https://studiowetware.com/sunprint/","x":["light","step3","n_forecast","n_learn"]},"enlarger":{"n":"Enlarger (write-up)","u":"https://studiowetware.com/negative-enlarger/","x":["n_enl"]},"NET":{"n":"The Cyanotype Network","u":"https://network.studiowetware.com/","x":["netpage"]},"n_feed":{"n":"Feed","u":"https://network.studiowetware.com/#/feed","a":["https://network.studiowetware.com/#/print"]},"n_neg":{"n":"SoLaT Negatives (tool)","u":"https://network.studiowetware.com/#/negatives","x":["thinkneg","step1","solat"],"a":["https://network.studiowetware.com/negatives.html"]},"n_cmyk":{"n":"CMYK (tool)","u":"https://network.studiowetware.com/#/cmyk","x":["cmyk"],"a":["https://network.studiowetware.com/cmyk.html"]},"n_enl":{"n":"Enlarger (tool)","u":"https://network.studiowetware.com/#/enlarger","x":["enlarger"],"a":["https://network.studiowetware.com/negative-enlarger.html"]},"n_forecast":{"n":"UV Forecast (tool)","u":"https://network.studiowetware.com/#/forecast","x":["light","step3","sunprint"]},"n_bench":{"n":"Gallery Bench","u":"https://network.studiowetware.com/#/gallerybench","a":["https://network.studiowetware.com/gallerybench.html"]},"n_tags":{"n":"Tags","u":"https://network.studiowetware.com/#/tags","a":["https://network.studiowetware.com/tcntags.html"]},"n_mine":{"n":"Profile","u":"https://network.studiowetware.com/#/mine","a":["https://network.studiowetware.com/#/upload","https://network.studiowetware.com/#/edit","https://network.studiowetware.com/#/account","https://network.studiowetware.com/#/collected"]},"n_learn":{"n":"Learn","u":"https://network.studiowetware.com/","nm":1,"x":["process","sbs","solat","sunprint"]},"SMW":{"n":"Small Works","u":"https://smallworks.studiowetware.com/"},"gitbeach":{"n":"GitBeach","u":"https://studiowetware.com/gitbeach/"},"picam":{"n":"Pi-Cam-IR-A","u":"https://studiowetware.com/pi-cam-ir-a/","x":["bp-pi-cam-ir-a"]},"atlas":{"n":"Atlas","u":"https://studiowetware.com/atlas/","x":["bp-atlas"]},"blackbox":{"n":"Black Box","u":"https://studiowetware.com/black-box/","x":["bp-black-box"]},"bucke":{"n":"Buck-E","u":"https://studiowetware.com/buck-e-musical-cipher/","x":["bp-buck-e"]},"pender":{"n":"PENDER Studios","u":"https://studiowetware.com/pender-studios/","x":["bp-pender"]},"bang":{"n":"Bang!","u":"https://studiowetware.com/bang/","x":["bp-bang"]},"potholes":{"n":"Adopt-a-Pothole","u":"https://studiowetware.com/potholes/"},"planes":{"n":"Plane Spotter","u":"https://studiowetware.com/plane-spotter/","x":["bp-plane-spotter"]},"githoods":{"n":"GitHoods","u":"https://studiowetware.com/githoods/","x":["bp-githoods"],"a":["https://beachkila.github.io/GitHoods/"]},"board":{"n":"Project Board","u":"https://board.studiowetware.com/"},"mediums":{"n":"Mediums","u":"https://board.studiowetware.com/spectra/"},"stack":{"n":"Stack","u":"https://board.studiowetware.com/skills/"},"pimaker":{"n":"Pi-Maker","u":"https://beachkila.github.io/Pi-Maker/","a":["https://board.studiowetware.com/p/the-sandbox/"]},"BSG":{"n":"Beach Self-Grading","u":"https://beachselfgrading.com/"},"create":{"n":"Create a Beach-Tag","u":"https://tag.beachselfgrading.com/"},"bsggal":{"n":"Beach-Tag Gallery","u":"https://beachselfgrading.com/gallery/"},"templates":{"n":"Printable templates","u":"https://beachselfgrading.com/templates/"},"whatis":{"n":"What are Beach-Tags?","u":"https://beachselfgrading.com/what-are-beach-tags/"},"contact":{"n":"Tip / Contact","u":"https://beachselfgrading.com/contact-me/"},"galleries":{"n":"All galleries","u":"https://studiowetware.com/galleries/"},"cyanogal":{"n":"Cyanotypes","u":"https://studiowetware.com/cyanotype-gallery/","a":["https://board.studiowetware.com/p/cyanotype/"]},"lino":{"n":"Linocuts","u":"https://studiowetware.com/linocut-gallery/","a":["https://board.studiowetware.com/p/linocuts/"]},"pendergal":{"n":"PENDER plotter","u":"https://studiowetware.com/pender-3d-gallery/","a":["https://board.studiowetware.com/p/pender-art/"]},"irgal":{"n":"IR photography","u":"https://studiowetware.com/infrared-photography-gallery/","a":["https://board.studiowetware.com/p/infrared-photography/"]},"neggal":{"n":"Negatives","u":"https://studiowetware.com/negatives-gallery/"},"digigal":{"n":"Digital","u":"https://studiowetware.com/digital-gallery/"},"ui":{"n":"Interfaces","u":"https://studiowetware.com/program-gallery/"},"undisc":{"n":"Undisciplined","u":"https://studiowetware.com/undisciplined-gallery/"},"process":{"n":"Cyanotype process","u":"https://studiowetware.com/how-cyanotype-works/","x":["n_learn"]},"light":{"n":"Light","u":"https://studiowetware.com/light/","x":["step3","sunprint","n_forecast"]},"salt":{"n":"Salt","u":"https://studiowetware.com/salt/"},"thinkneg":{"n":"Think Negative","u":"https://studiowetware.com/think-negative/","x":["step1","solat","n_neg"]},"seepos":{"n":"See Positive","u":"https://studiowetware.com/see-positive/"},"sbs":{"n":"Step-by-step","u":"https://studiowetware.com/step-by-step/","x":["n_learn"]},"step1":{"n":"Step 1 \u00b7 Negative","u":"https://studiowetware.com/step-1/","x":["thinkneg","solat","n_neg"]},"step2":{"n":"Step 2 \u00b7 Preparation","u":"https://studiowetware.com/step-2/"},"step3":{"n":"Step 3 \u00b7 UV exposure","u":"https://studiowetware.com/step-3/","x":["light","sunprint","n_forecast"]},"step4":{"n":"Step 4 \u00b7 Wash","u":"https://studiowetware.com/step-4/"},"bp-pi-cam-ir-a":{"n":"Pi-Cam-IR-A","u":"https://board.studiowetware.com/p/pi-cam-ir-a/","x":["picam"]},"bp-atlas":{"n":"Atlas","u":"https://board.studiowetware.com/p/atlas/","x":["atlas"]},"bp-black-box":{"n":"Black Box","u":"https://board.studiowetware.com/p/black-box/","x":["blackbox"]},"bp-buck-e":{"n":"Buck-E","u":"https://board.studiowetware.com/p/buck-e/","x":["bucke"]},"bp-pender":{"n":"Pender","u":"https://board.studiowetware.com/p/pender/","x":["pender"]},"bp-bang":{"n":"Bang","u":"https://board.studiowetware.com/p/bang/","x":["bang"]},"bp-plane-spotter":{"n":"Plane Spotter","u":"https://board.studiowetware.com/p/plane-spotter/","x":["planes"]},"bp-githoods":{"n":"GitHoods","u":"https://board.studiowetware.com/p/githoods/","x":["githoods"]},"bp-ai-station":{"n":"AI Station","u":"https://board.studiowetware.com/p/ai-station/"},"bp-dock-to-stock":{"n":"Dock to Stock","u":"https://board.studiowetware.com/p/dock-to-stock/"},"bp-beelab":{"n":"BeeLab","u":"https://board.studiowetware.com/p/beelab/"},"bp-coolpix-ir":{"n":"Coolpix IR conversion","u":"https://board.studiowetware.com/p/coolpix-ir/"},"bp-droneaware-node":{"n":"DroneAware node","u":"https://board.studiowetware.com/p/droneaware-node/"},"bp-fire-hd8-linux-pad":{"n":"Fire HD 8 Linux pad","u":"https://board.studiowetware.com/p/fire-hd8-linux-pad/"},"bp-ink-drawer":{"n":"Ink Drawer","u":"https://board.studiowetware.com/p/ink-drawer/"},"bp-redditprofiler":{"n":"redditprofiler","u":"https://board.studiowetware.com/p/redditprofiler/"},"bp-snake-lcd-pi":{"n":"Snake LCD Pi","u":"https://board.studiowetware.com/p/snake-lcd-pi/"},"bp-ir-dev":{"n":"IR DEV","u":"https://board.studiowetware.com/p/ir-dev/","a":["https://beachkila.github.io/IR/"]},"bp-nmap-subway":{"n":"nmap subway","u":"https://board.studiowetware.com/p/nmap-subway/"},"bp-beach-self-grading":{"n":"Beach Self Grading","u":"https://board.studiowetware.com/p/beach-self-grading/"},"bp-the-cyanotype-network":{"n":"The Cyanotype Network","u":"https://board.studiowetware.com/p/the-cyanotype-network/"},"here":{"n":"S.We.T.A. Map","u":"https://board.studiowetware.com/p/sweta-map/","a":["https://beachkila.github.io/SiteMap/"]}},"lines":[{"id":"red","n":"Cyanotype Process","k":"P","c":"#E3242B","dash":0,"b":[["SW","process","thinkneg","salt","light","seepos"]]},{"id":"orange","n":"Cyanotype Step-by-step","k":"S","c":"#F28C28","dash":0,"b":[["SW","sbs","step1","step2","step3","step4"]]},{"id":"blue","n":"The Cyanotype Network","k":"N","c":"#0072CE","dash":0,"b":[["SW","NET","n_feed","n_neg","n_cmyk","n_enl","n_forecast","n_bench","n_tags","n_mine","n_learn"]]},{"id":"writeups","n":"Tool write-ups","k":"W","c":"#D6459B","dash":0,"b":[["SW","netpage","solat","cmyk","enlarger","sunprint"]]},{"id":"teal","n":"Small Works","k":"S","c":"#00A19C","dash":0,"b":[["SW","SMW"]]},{"id":"green","n":"All Galleries","k":"G","c":"#00964A","dash":0,"b":[["SW","galleries","cyanogal","lino","pendergal","irgal","neggal","digigal","ui","undisc"]]},{"id":"purple","n":"GitBeach","k":"G","c":"#7B2D8E","dash":0,"b":[["SW","gitbeach","picam","atlas","blackbox","bucke","pender","bang","potholes","planes","githoods"]]},{"id":"brown","n":"Board","k":"B","c":"#B07A45","dash":0,"b":[["gitbeach","board"],["board","mediums","stack","pimaker"],["board","bp-pi-cam-ir-a","bp-atlas","bp-black-box","bp-buck-e","bp-pender","bp-bang","bp-plane-spotter","bp-githoods","here","bp-ai-station","bp-dock-to-stock","bp-beelab","bp-coolpix-ir","bp-droneaware-node","bp-fire-hd8-linux-pad","bp-ink-drawer","bp-redditprofiler","bp-snake-lcd-pi","bp-ir-dev","bp-nmap-subway","bp-beach-self-grading","bp-the-cyanotype-network"]]},{"id":"yellow","n":"Beach Self-Grading","k":"B","c":"#F2BF00","dash":0,"b":[["SW","BSG","whatis","bsggal","create","templates","contact"]]},{"id":"gray","n":"About","k":"A","c":"#8A8D91","dash":0,"b":[["SW","about"]]}]};
  var MAP_URL = "https://beachkila.github.io/SiteMap/";
  var TRACK = "https://sweta-tracker.kbmallonee.workers.dev"; // Rider counting endpoint. Empty = off.

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
    ".narrow .lname{font-size:11px}.narrow .in{padding:0 14px}.narrow .track{margin:2px 38px 0;height:58px}.narrow .lab{font-size:11px;top:32px;padding:6px 0}.narrow .msg{font-size:13px;flex-wrap:wrap;gap:2px}.narrow .mqw{flex:1 1 0}.narrow .priv{align-self:flex-end;padding:4px 0 2px}.narrow .mq{width:auto;white-space:normal;flex-wrap:wrap}.narrow .mq .grp{flex-wrap:wrap;gap:6px 9px;padding-right:0}.narrow .chips a{padding:8px 12px;font-size:13px}.wide .lab{font-size:12px}.wide .lname{font-size:12px}.wide .msg{font-size:13px}",
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
      h = '<div class="hd"><div class="bd" style="background:#E3242B;color:#fff">S</div><div class="ln">' + esc(here.n) + '</div><a class="mp" data-to="map" href="' + esc(mapHref(id)) + '">MAP</a></div><div class="g">' +
        p.lines.map(function (l) {
          var first = l.b[0].filter(function (x) { return x !== id && S[x]; })[0];
          return '<a class="b w" style="--lc:' + l.c + '" data-to="' + first + '" href="' + esc(hand(S[first].u)) + '"><i></i>' + esc(l.n) + "</a>";
        }).join("") + "</div>";
    } else {
      var m = p.main, seq = m.seq.filter(function (x) { return S[x]; }), light = m.line.c === "#F2BF00";
      h = '<div class="hd"><div class="bd" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</div><div class="ln">' + esc(m.line.n) + ' line</div><a class="mp" data-to="map" href="' + esc(mapHref(id)) + '">MAP</a></div><div class="g" style="--lc:' + m.line.c + '">' +
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
      html = '<div class="row"><div class="badge" style="background:#E3242B">S</div><div class="lname">' + esc(here.n) + '</div><span class="sp"></span><a class="map" data-to="map" href="' + esc(mapHref(id)) + '">MAP</a></div>' +
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
      html = '<div class="row"><div class="badge" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</div><div class="lname">' + esc(m.line.n) + ' line</div><span class="sp"></span><a class="map" data-to="map" href="' + esc(mapHref(id)) + '">MAP</a></div>' +
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
