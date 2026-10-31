/* S.We.T.A. station strip. Shows which stop on the Studio Wetware Transit Authority map the current page is.
   Data is generated from index.html by tools/build-strip.js. */
(function () {
  "use strict";
  var DATA = {"stations":{"SW":{"n":"Studio Wetware","u":"https://studiowetware.com/"},"about":{"n":"About Beach","u":"https://studiowetware.com/aboutbeach/"},"netpage":{"n":"The Network (write-up)","u":"https://studiowetware.com/network/"},"solat":{"n":"SoLaT (write-up)","u":"https://studiowetware.com/solat-digital-negatives/","x":["thinkneg","step1","n_neg","n_learn"]},"cmyk":{"n":"CMYK for UV (write-up)","u":"https://studiowetware.com/cmyk/","x":["n_cmyk"]},"sunprint":{"n":"Sunprint UVI (write-up)","u":"https://studiowetware.com/sunprint/","x":["light","step3","n_forecast","n_learn"]},"enlarger":{"n":"Enlarger (write-up)","u":"https://studiowetware.com/negative-enlarger/","x":["n_enl"]},"NET":{"n":"The Cyanotype Network","u":"https://network.studiowetware.com/"},"n_feed":{"n":"Feed","u":"https://network.studiowetware.com/#/feed","a":["https://network.studiowetware.com/#/print"]},"n_neg":{"n":"SoLaT Negatives (tool)","u":"https://network.studiowetware.com/#/negatives","x":["thinkneg","step1","solat"],"a":["https://network.studiowetware.com/negatives.html"]},"n_cmyk":{"n":"CMYK (tool)","u":"https://network.studiowetware.com/#/cmyk","x":["cmyk"],"a":["https://network.studiowetware.com/cmyk.html"]},"n_enl":{"n":"Enlarger (tool)","u":"https://network.studiowetware.com/#/enlarger","x":["enlarger"],"a":["https://network.studiowetware.com/negative-enlarger.html"]},"n_forecast":{"n":"UV Forecast (tool)","u":"https://network.studiowetware.com/#/forecast","x":["light","step3","sunprint"]},"n_bench":{"n":"Gallery Bench","u":"https://network.studiowetware.com/#/gallerybench","a":["https://network.studiowetware.com/gallerybench.html"]},"n_tags":{"n":"Tags","u":"https://network.studiowetware.com/#/tags","a":["https://network.studiowetware.com/tcntags.html"]},"n_mine":{"n":"Profile","u":"https://network.studiowetware.com/#/mine","a":["https://network.studiowetware.com/#/upload","https://network.studiowetware.com/#/edit","https://network.studiowetware.com/#/account","https://network.studiowetware.com/#/collected"]},"n_learn":{"n":"Learn","u":"https://network.studiowetware.com/","nm":1,"x":["process","sbs","solat","sunprint"]},"SMW":{"n":"Small Works","u":"https://smallworks.studiowetware.com/"},"gitbeach":{"n":"GitBeach","u":"https://studiowetware.com/gitbeach/"},"picam":{"n":"Pi-Cam-IR-A","u":"https://studiowetware.com/pi-cam-ir-a/","x":["bp-pi-cam-ir-a"]},"atlas":{"n":"Atlas","u":"https://studiowetware.com/atlas/","x":["bp-atlas"]},"blackbox":{"n":"Black Box","u":"https://studiowetware.com/black-box/","x":["bp-black-box"]},"bucke":{"n":"Buck-E","u":"https://studiowetware.com/buck-e-musical-cipher/","x":["bp-buck-e"]},"pender":{"n":"PENDER Studios","u":"https://studiowetware.com/pender-studios/","x":["bp-pender"]},"bang":{"n":"Bang!","u":"https://studiowetware.com/bang/","x":["bp-bang"]},"potholes":{"n":"Adopt-a-Pothole","u":"https://studiowetware.com/potholes/"},"planes":{"n":"Plane Spotter","u":"https://studiowetware.com/plane-spotter/","x":["bp-plane-spotter"]},"githoods":{"n":"GitHoods","u":"https://studiowetware.com/githoods/","x":["bp-githoods"],"a":["https://beachkila.github.io/GitHoods/"]},"board":{"n":"Project Board","u":"https://board.studiowetware.com/"},"mediums":{"n":"Mediums","u":"https://board.studiowetware.com/spectra/"},"stack":{"n":"Stack","u":"https://board.studiowetware.com/skills/"},"pimaker":{"n":"Pi-Maker","u":"https://beachkila.github.io/Pi-Maker/","a":["https://board.studiowetware.com/p/the-sandbox/"]},"BSG":{"n":"Beach Self-Grading","u":"https://beachselfgrading.com/"},"create":{"n":"Create a Beach-Tag","u":"https://tag.beachselfgrading.com/"},"bsggal":{"n":"Beach-Tag Gallery","u":"https://beachselfgrading.com/gallery/"},"templates":{"n":"Printable templates","u":"https://beachselfgrading.com/templates/"},"whatis":{"n":"What are Beach-Tags?","u":"https://beachselfgrading.com/what-are-beach-tags/"},"contact":{"n":"Tip / Contact","u":"https://beachselfgrading.com/contact-me/"},"galleries":{"n":"All galleries","u":"https://studiowetware.com/galleries/"},"cyanogal":{"n":"Cyanotypes","u":"https://studiowetware.com/cyanotype-gallery/","a":["https://board.studiowetware.com/p/cyanotype/"]},"lino":{"n":"Linocuts","u":"https://studiowetware.com/linocut-gallery/","a":["https://board.studiowetware.com/p/linocuts/"]},"pendergal":{"n":"PENDER plotter","u":"https://studiowetware.com/pender-3d-gallery/","a":["https://board.studiowetware.com/p/pender-art/"]},"irgal":{"n":"IR photography","u":"https://studiowetware.com/infrared-photography-gallery/","a":["https://board.studiowetware.com/p/infrared-photography/"]},"neggal":{"n":"Negatives","u":"https://studiowetware.com/negatives-gallery/"},"digigal":{"n":"Digital","u":"https://studiowetware.com/digital-gallery/"},"ui":{"n":"Interfaces","u":"https://studiowetware.com/program-gallery/"},"undisc":{"n":"Undisciplined","u":"https://studiowetware.com/undisciplined-gallery/"},"process":{"n":"Cyanotype process","u":"https://studiowetware.com/how-cyanotype-works/","x":["n_learn"]},"light":{"n":"Light","u":"https://studiowetware.com/light/","x":["step3","sunprint","n_forecast"]},"salt":{"n":"Salt","u":"https://studiowetware.com/salt/"},"thinkneg":{"n":"Think Negative","u":"https://studiowetware.com/think-negative/","x":["step1","solat","n_neg"]},"seepos":{"n":"See Positive","u":"https://studiowetware.com/see-positive/"},"sbs":{"n":"Step-by-step","u":"https://studiowetware.com/step-by-step/","x":["n_learn"]},"step1":{"n":"Step 1 \u00b7 Negative","u":"https://studiowetware.com/step-1/","x":["thinkneg","solat","n_neg"]},"step2":{"n":"Step 2 \u00b7 Preparation","u":"https://studiowetware.com/step-2/"},"step3":{"n":"Step 3 \u00b7 UV exposure","u":"https://studiowetware.com/step-3/","x":["light","sunprint","n_forecast"]},"step4":{"n":"Step 4 \u00b7 Wash","u":"https://studiowetware.com/step-4/"},"bp-pi-cam-ir-a":{"n":"Pi-Cam-IR-A","u":"https://board.studiowetware.com/p/pi-cam-ir-a/","x":["picam"]},"bp-atlas":{"n":"Atlas","u":"https://board.studiowetware.com/p/atlas/","x":["atlas"]},"bp-black-box":{"n":"Black Box","u":"https://board.studiowetware.com/p/black-box/","x":["blackbox"]},"bp-buck-e":{"n":"Buck-E","u":"https://board.studiowetware.com/p/buck-e/","x":["bucke"]},"bp-pender":{"n":"Pender","u":"https://board.studiowetware.com/p/pender/","x":["pender"]},"bp-bang":{"n":"Bang","u":"https://board.studiowetware.com/p/bang/","x":["bang"]},"bp-plane-spotter":{"n":"Plane Spotter","u":"https://board.studiowetware.com/p/plane-spotter/","x":["planes"]},"bp-githoods":{"n":"GitHoods","u":"https://board.studiowetware.com/p/githoods/","x":["githoods"]},"bp-ai-station":{"n":"AI Station","u":"https://board.studiowetware.com/p/ai-station/"},"bp-dock-to-stock":{"n":"Dock to Stock","u":"https://board.studiowetware.com/p/dock-to-stock/"},"bp-beelab":{"n":"BeeLab","u":"https://board.studiowetware.com/p/beelab/"},"bp-coolpix-ir":{"n":"Coolpix IR conversion","u":"https://board.studiowetware.com/p/coolpix-ir/"},"bp-droneaware-node":{"n":"DroneAware node","u":"https://board.studiowetware.com/p/droneaware-node/"},"bp-fire-hd8-linux-pad":{"n":"Fire HD 8 Linux pad","u":"https://board.studiowetware.com/p/fire-hd8-linux-pad/"},"bp-ink-drawer":{"n":"Ink Drawer","u":"https://board.studiowetware.com/p/ink-drawer/"},"bp-redditprofiler":{"n":"redditprofiler","u":"https://board.studiowetware.com/p/redditprofiler/"},"bp-snake-lcd-pi":{"n":"Snake LCD Pi","u":"https://board.studiowetware.com/p/snake-lcd-pi/"},"bp-ir-dev":{"n":"IR DEV","u":"https://board.studiowetware.com/p/ir-dev/","a":["https://beachkila.github.io/IR/"]},"bp-nmap-subway":{"n":"nmap subway","u":"https://board.studiowetware.com/p/nmap-subway/"},"bp-beach-self-grading":{"n":"Beach Self Grading","u":"https://board.studiowetware.com/p/beach-self-grading/"},"bp-the-cyanotype-network":{"n":"The Cyanotype Network","u":"https://board.studiowetware.com/p/the-cyanotype-network/"},"here":{"n":"S.We.T.A. Map","u":"https://board.studiowetware.com/p/sweta-map/","a":["https://beachkila.github.io/SiteMap/"]}},"lines":[{"id":"red","n":"Cyanotype Process","k":"P","c":"#E3242B","dash":0,"b":[["SW","process","thinkneg","salt","light","seepos"]]},{"id":"orange","n":"Cyanotype Step-by-step","k":"S","c":"#F28C28","dash":0,"b":[["SW","sbs","step1","step2","step3","step4"]]},{"id":"blue","n":"The Cyanotype Network","k":"N","c":"#0072CE","dash":0,"b":[["SW","NET","n_feed","n_neg","n_cmyk","n_enl","n_forecast","n_bench","n_tags","n_mine","n_learn"]]},{"id":"writeups","n":"Tool write-ups","k":"W","c":"#D6459B","dash":0,"b":[["SW","netpage","solat","cmyk","enlarger","sunprint"]]},{"id":"teal","n":"Small Works","k":"S","c":"#00A19C","dash":0,"b":[["SW","SMW"]]},{"id":"green","n":"All Galleries","k":"G","c":"#00964A","dash":0,"b":[["SW","galleries","cyanogal","lino","pendergal","irgal","neggal","digigal","ui","undisc"]]},{"id":"purple","n":"GitBeach","k":"G","c":"#7B2D8E","dash":0,"b":[["SW","here","gitbeach","picam","atlas","blackbox","bucke","pender","bang","potholes","planes","githoods"]]},{"id":"brown","n":"Board","k":"B","c":"#B07A45","dash":0,"b":[["gitbeach","board"],["board","mediums","stack","pimaker"],["board","bp-pi-cam-ir-a","bp-atlas","bp-black-box","bp-buck-e","bp-pender","bp-bang","bp-plane-spotter","bp-githoods","bp-ai-station","bp-dock-to-stock","bp-beelab","bp-coolpix-ir","bp-droneaware-node","bp-fire-hd8-linux-pad","bp-ink-drawer","bp-redditprofiler","bp-snake-lcd-pi","bp-ir-dev","bp-nmap-subway","bp-beach-self-grading","bp-the-cyanotype-network"]]},{"id":"yellow","n":"Beach Self-Grading","k":"B","c":"#F2BF00","dash":0,"b":[["SW","BSG","whatis","bsggal","create","templates","contact"]]},{"id":"gray","n":"About","k":"A","c":"#8A8D91","dash":0,"b":[["SW","about"]]}],"geo":{"p":{"SW":[500,400],"about":[500,320],"netpage":[610,370],"solat":[904,313],"cmyk":[1036,313],"sunprint":[1238,253],"enlarger":[1176,253],"NET":[750,400],"n_feed":[832,368],"n_neg":[904,330],"n_cmyk":[1036,330],"n_enl":[1176,270],"n_forecast":[1238,270],"n_bench":[1350,62],"n_tags":[1350,10],"n_mine":[1350,-42],"n_learn":[1350,-94],"SMW":[390,374],"gitbeach":[500,575],"picam":[595,657],"atlas":[655,657],"blackbox":[770,697],"bucke":[830,697],"pender":[890,697],"bang":[950,697],"potholes":[1030,677],"planes":[1080,657],"githoods":[1150,657],"board":[517,610],"mediums":[610,610],"stack":[700,610],"pimaker":[850,575],"BSG":[300,300],"create":[260,135],"bsggal":[260,185],"templates":[260,85],"whatis":[260,235],"contact":[260,35],"galleries":[395,455],"cyanogal":[335,455],"lino":[275,455],"pendergal":[165,495],"irgal":[105,495],"neggal":[115,645],"digigal":[175,645],"ui":[285,685],"undisc":[345,685],"process":[588,336],"light":[1238,219],"salt":[970,279],"thinkneg":[904,279],"seepos":[1299,166],"sbs":[742,353],"step1":[904,296],"step2":[1096,276],"step3":[1238,236],"step4":[1316,114],"bp-pi-cam-ir-a":[595,640],"bp-atlas":[655,640],"bp-black-box":[770,680],"bp-buck-e":[830,680],"bp-pender":[890,680],"bp-bang":[950,680],"bp-plane-spotter":[1080,640],"bp-githoods":[1150,640],"bp-ai-station":[1163,830],"bp-dock-to-stock":[1111,830],"bp-beelab":[1059,830],"bp-coolpix-ir":[1007,830],"bp-droneaware-node":[955,830],"bp-fire-hd8-linux-pad":[903,830],"bp-ink-drawer":[851,830],"bp-redditprofiler":[730,855],"bp-snake-lcd-pi":[678,855],"bp-ir-dev":[626,855],"bp-nmap-subway":[574,855],"bp-beach-self-grading":[522,855],"bp-the-cyanotype-network":[470,855],"here":[500,520]},"l":{"red":[[[500,400],[564,336],[588,336],[792,336],[849,279],[904,279],[970,279],[1069,279],[1129,219],[1238,219],[1259,219],[1299,179],[1299,166]]],"orange":[[[500,400],[547,353],[742,353],[799,353],[856,296],[904,296],[1076,296],[1096,276],[1136,236],[1238,236],[1266,236],[1316,186],[1316,114]]],"blue":[[[500,400],[750,400],[800,400],[832,368],[870,330],[904,330],[1036,330],[1090,330],[1150,270],[1176,270],[1238,270],[1280,270],[1350,200],[1350,62],[1350,10],[1350,-42],[1350,-94]]],"writeups":[[[500,400],[530,370],[610,370],[806,370],[863,313],[904,313],[1036,313],[1083,313],[1143,253],[1176,253],[1238,253]]],"teal":[[[500,400],[488,412],[450,374],[390,374]]],"green":[[[500,400],[445,455],[395,455],[335,455],[275,455],[240,455],[200,495],[165,495],[105,495],[65,495],[35,525],[35,615],[65,645],[115,645],[175,645],[210,645],[250,685],[285,685],[345,685]]],"purple":[[[500,400],[500,520],[500,575],[500,657],[595,657],[655,657],[700,657],[740,697],[770,697],[830,697],[890,697],[950,697],[1010,697],[1030,677],[1050,657],[1080,657],[1150,657]]],"brown":[[[500,575],[517,592],[517,610]],[[517,610],[610,610],[700,610],[740,610],[775,575],[850,575]],[[517,610],[517,640],[595,640],[655,640],[707,640],[747,680],[770,680],[830,680],[890,680],[950,680],[1003,680],[1043,640],[1080,640],[1150,640],[1250,640],[1295,685],[1295,785],[1250,830],[1163,830],[1111,830],[1059,830],[1007,830],[955,830],[903,830],[851,830],[820,830],[795,855],[730,855],[678,855],[626,855],[574,855],[522,855],[470,855]]],"yellow":[[[500,400],[400,300],[300,300],[260,235],[260,185],[260,135],[260,85],[260,35]]],"gray":[[[500,400],[500,320]]]}}};
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
    ".tl{position:absolute;top:31px;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#b5b5b5;padding:2px 0}",
    ".tl a{color:#b5b5b5;text-decoration:none}.tl a:hover,.tl a:focus{color:#fff;text-decoration:underline}",
    ".tl.fo{color:#fff;z-index:3;font-weight:700}.tl.fo a{color:#fff;text-decoration:underline;text-underline-offset:2px}.tl.fo small{font-weight:400;color:#9a9a9a;margin-left:6px}.tl.cu{font-weight:700;color:#fff}.tl.cu a{color:#fff;text-decoration:underline;text-underline-offset:2px}.tl.cu small{font-weight:400;color:#9a9a9a;margin-left:6px}",
    ".tl[hidden]{display:none}",
    "a.st{display:block}a.st:hover .dot,a.st:focus-visible .dot,.st.arm .dot{background:#fff}",
    ".st.arm .dot{box-shadow:0 0 0 4px rgba(255,255,255,.35)}",
    ".badge{flex:none;width:22px;height:22px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 11px Arial}",
    ".lname{flex:none;font:700 11px Arial;letter-spacing:.06em;text-transform:uppercase}",
    ".sp{flex:1}",
    ".map{flex:none;color:#bbb;font:700 11px Arial;letter-spacing:.08em;text-decoration:none;border:1px solid #444;border-radius:4px;padding:6px 10px;min-height:30px;display:inline-flex;align-items:center}",
    ".map:hover,.map:focus{color:#fff;border-color:#fff}",
    ".track{position:relative;height:54px;margin:0 26px}",
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
    ".narrow .lname{font-size:11px}.narrow .in{padding:0 14px}.narrow .track{margin:0 20px}.narrow .tl{font-size:12px}.narrow .msg{font-size:13px;flex-wrap:wrap;gap:2px}.narrow .mqw{flex:1 1 0}.narrow .priv{align-self:flex-end;padding:4px 0 2px}.narrow .mq{width:auto;white-space:normal;flex-wrap:wrap}.narrow .mq .grp{flex-wrap:wrap;gap:6px 9px;padding-right:0}.narrow .chips a{padding:8px 12px;font-size:13px}.wide .tl{font-size:13px}.wide .lname{font-size:12px}.wide .msg{font-size:13px}",
    // light theme (opted in with data-theme="light")
    ".lt .tk{background:#fcfbf7;color:#14171a;border-bottom:1px solid #e6e2d8}",
    ".lt .badge{border-color:#fcfbf7;box-shadow:0 0 0 1px #cfcabb}",
    ".lt .map{color:#16385c;border-color:#cfcabb}.lt .map:hover,.lt .map:focus{color:#0e2a47;border-color:#16385c}",
    ".lt .dot{background:#fff;border-color:#14171a}",
    ".lt .tl,.lt .tl a{color:#4a4a44}.lt .tl a:hover{color:#14171a}.lt .tl.cu,.lt .tl.cu a,.lt .tl.fo,.lt .tl.fo a{color:#14171a}.lt a.st:hover .dot,.lt .st.arm .dot{background:#14171a}.lt .open .chev{color:#5b6770}",
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
    return '<div class="grab"></div><div class="hd">' + head + '<button type="button" class="x" data-close aria-label="Close">\u00d7</button></div>' + chips + body +
      '<div class="ft"><a class="mp" data-to="map" href="' + esc(mapHref(id)) + '">OPEN FULL MAP</a>' + info + '<a class="pv" data-to="privacy" href="' + esc(hand(MAP_URL + "?privacy=1")) + '">Privacy</a></div>';
  }

  // Names sit under their own dots: this stop centred under its dot, the stops either side under theirs,
  // pushed aside (and shortened) only as far as needed so nothing overlaps.
  function placeLabels(root) {
    var tr = root.querySelector(".track"); if (!tr) return;
    var W = tr.clientWidth, gap = 12, taken = [];
    var wOf = function (e) { return Math.ceil(e.getBoundingClientRect().width) + 1; };
    var fo = tr.querySelector(".tl.fo"), cu = tr.querySelector(".tl.cu"), eds = [].slice.call(tr.querySelectorAll(".tl.ed"));
    var order = (fo && !fo.hidden ? [fo] : []).concat(cu ? [cu] : [], eds);
    order.forEach(function (e) { if (e !== fo) e.hidden = false; e.style.maxWidth = ""; e.style.left = "0px"; });
    order.forEach(function (e) {
      var w = Math.min(wOf(e), W), x = parseFloat(e.getAttribute("data-x")), l = Math.max(0, Math.min(W - w, x - w / 2));
      if (taken.some(function (t) { return l < t[1] + gap && l + w > t[0] - gap; })) { e.hidden = true; return; }
      e.style.left = l + "px"; e.style.maxWidth = w + "px"; taken.push([l, l + w]);
    });
  }
  // Show one stop's name under its dot (hover, or the first tap on a touch screen). null puts things back.
  function focusDot(root, t, armed) {
    var fo = root.querySelector(".tl.fo"); if (!fo) return;
    if (!t) { fo.hidden = true; fo.innerHTML = ""; placeLabels(root); return; }
    var sid = t.getAttribute("data-to");
    fo.innerHTML = armed ? '<a data-to="' + sid + '" href="' + esc(t.getAttribute("href")) + '">' + esc(S[sid].n) + "</a><small>tap again</small>" : esc(S[sid].n);
    fo.setAttribute("data-x", parseFloat(t.style.left)); fo.hidden = false; placeLabels(root);
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
      html = '<div class="row"><button type="button" class="open" data-open aria-label="Show the lines at ' + esc(here.n) + '"><span class="badge" style="background:#E3242B">S</span><span class="lname">' + esc(here.n) + '</span><span class="chev">\u25be</span></button><span class="sp"></span><button type="button" class="map" data-open>MAP</button></div>' +
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
          : '<a class="st" data-to="' + sid + '" data-dot href="' + esc(hand(S[sid].u)) + '" style="left:' + px(k) + 'px" aria-label="' + esc(S[sid].n) + '"><span class="dot"></span></a>';
      }).join("");
      var prev = seq[i - 1], nxt = seq[i + 1];
      var light = m.line.c === "#F2BF00";
      html = '<div class="row"><button type="button" class="open" data-open aria-label="Show every stop on the ' + esc(m.line.n) + ' line"><span class="badge" style="background:' + m.line.c + ";color:" + (light ? "#121314" : "#fff") + '">' + esc(m.line.k) + '</span><span class="lname">' + esc(m.line.n) + ' line</span><span class="chev">\u25be</span></button><span class="sp"></span><button type="button" class="map" data-open>MAP</button></div>' +
        '<div class="tw"><div class="track" style="width:' + tw + 'px"><div class="bar" style="background:' + m.line.c + '"></div>' + stops +
        (i > 0 ? '<span class="tl ed" data-x="' + px(0) + '">' + a(seq[0]) + "</span>" : "") +
        '<span class="tl cu" data-x="' + px(i) + '">' + esc(here.n) + "</span>" +
        (i < n - 1 ? '<span class="tl ed" data-x="' + px(n - 1) + '">' + a(seq[n - 1]) + "</span>" : "") +
        '<span class="tl fo" hidden></span>' + "</div></div>";
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
          focusDot(root, t, true);
          clearTimeout(root._armT);
          root._armT = setTimeout(function () { root._arm = null; t.classList.remove("arm"); focusDot(root, null); }, 4000);
          return;
        }
        track("click", cur, t.getAttribute("data-to") || "");
      });
      root.addEventListener("mouseover", function (ev) { if (TOUCH && TOUCH.matches) return; var t = ev.target.closest && ev.target.closest("a[data-dot]"); if (t) focusDot(root, t, false); });
      root.addEventListener("mouseout", function (ev) { if (TOUCH && TOUCH.matches) return; var t = ev.target.closest && ev.target.closest("a[data-dot]"); if (t && !(ev.relatedTarget && t.contains(ev.relatedTarget))) focusDot(root, null); });
    }
    host._swtId = id; root._arm = null;
    placeLabels(root);
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


  // ---------- line menu: opened by any element with data-swt-menu (the site header's hamburger) ----------
  var MCSS = [
    ":host([hidden]){display:none}*{box-sizing:border-box}",
    ".scrim{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.45)}",
    ".sh{position:fixed;top:0;right:0;bottom:0;z-index:2147483001;width:min(420px,100vw);overflow-y:auto;padding:16px 18px 14px;font-family:Arial,Helvetica,sans-serif;line-height:1.25;background:#121314;color:#fff;border-left:1px solid #333;box-shadow:-10px 0 30px rgba(0,0,0,.35);display:flex;flex-direction:column}",
    "@media (max-width:640px){.sh{width:100vw;border-left:0;padding:12px 14px 10px}}",
    ".hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}",
    ".seal{flex:none;width:32px;height:32px;border-radius:6px;border:1px solid #444;background:#000 center/contain no-repeat}",
    ".hn{flex:1;font:700 13px Arial;letter-spacing:.06em;text-transform:uppercase}.hn small{display:block;font:400 11px Arial;letter-spacing:0;text-transform:none;color:#9a9a9a;margin-top:2px}",
    ".x{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid #444;background:none;color:#ddd;font:400 20px Arial;cursor:pointer;line-height:1}",
    ".row{display:flex;align-items:center;gap:12px;padding:8px;border-radius:8px;text-decoration:none;color:#fff;border:1px solid transparent}",
    ".row:hover,.row:focus-visible{background:#1c1d20}.row.on{background:#1c1d20;border-color:#3a3b3e}",
    "@media (max-width:640px){.row{padding:5px 6px;gap:10px}}",
    ".bd{flex:none;width:28px;height:28px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center;font:700 13px Arial}",
    ".mid{flex:1;min-width:0;display:block}.nm{display:block;font:700 12px Arial;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".rail{display:block;position:relative;height:12px;margin-top:5px}.rail b{position:absolute;left:0;right:0;top:4px;height:4px;border-radius:2px}",
    ".rail i{position:absolute;top:1px;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#121314;border:2px solid #fff}.rail i.me{background:#fff}",
    ".rail em{position:absolute;right:-2px;top:-2px;font:700 10px Arial;font-style:normal;color:#bbb;background:#121314;padding:0 2px}",
    ".cnt{flex:none;font:11px Arial;color:#8d8f94;width:50px;text-align:right}.go{flex:none;color:#888;font-size:16px}",
    ".mini{margin-top:auto;padding-top:12px;border-top:1px solid #333}",
    ".mini h4{margin:0 0 6px;font:700 11px Arial;letter-spacing:.08em;color:#8d8f94;text-transform:uppercase;display:flex}.mini h4 span{margin-left:auto;font-weight:400;letter-spacing:0;text-transform:none;color:#bbb}",
    ".mini a{display:block;border-radius:8px;border:1px solid #2a2a2a;background:#0b0b0b;overflow:hidden}.mini a:hover,.mini a:focus-visible{border-color:#666}",
    ".mini svg{display:block;width:100%;height:auto}",
    ".ft{display:flex;justify-content:flex-end;margin-top:6px}.ft a{color:#8d8f94;font-size:12px}"
  ].join("");
  var SEAL = MAP_URL + "icons/sweta.png";
  function firstStop(l) { var br = l.b[0].filter(function (x) { return S[x]; }); return S[br[0]] && S[br[0]].hub && br.length > 1 && br[0] === "SW" ? br[1] : br[0]; }
  function allStops(l) { var o = []; l.b.forEach(function (br) { br.forEach(function (x) { if (S[x] && o.indexOf(x) < 0) o.push(x); }); }); return o; }

  function miniMap(lineId, id) {
    var G = DATA.geo; if (!G) return "";
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, add = function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); };
    LINES.forEach(function (l) { (G.l[l.id] || []).forEach(function (pa) { pa.forEach(add); }); });
    var fs = Math.max(20, (x1 - x0) / 46), labs = [], o = "";
    var dim = function (l) { return lineId && l.id !== lineId ? .22 : 1; };
    LINES.forEach(function (l) {
      if (l.dash) return;
      (G.l[l.id] || []).forEach(function (pa) { if (pa.length > 1) o += '<path d="M' + pa.map(function (q) { return q.join(" "); }).join(" L") + '" fill="none" stroke="' + l.c + '" stroke-width="' + (l.id === lineId ? 10 : 7) + '" stroke-linejoin="round" stroke-linecap="round" opacity="' + dim(l) + '"/>'; });
    });
    var seen = {};
    LINES.forEach(function (l) {
      if (l.dash) return;
      allStops(l).forEach(function (sid) {
        var q = G.p[sid]; if (!q || (seen[sid] && sid !== id)) return; seen[sid] = 1;
        var me = sid === id;
        o += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="' + (me ? 11 : 5) + '" fill="' + (me ? "#fff" : "#0b0b0b") + '" stroke="#fff" stroke-width="' + (me ? 4 : 2.4) + '" opacity="' + (me ? 1 : Math.max(dim(l), lineId && l.b.some(function (b) { return b.indexOf(sid) > -1; }) && l.id === lineId ? 1 : dim(l))) + '"/>';
      });
    });
    // Line names: past the far end of each line on the side it is heading; All Galleries sits at its middle;
    // GitBeach and Board trade places so each name sits by its own run.
    var spots = {};
    LINES.forEach(function (l) {
      if (l.dash) return;
      var pa = (G.l[l.id] || [])[0]; if (!pa || !pa.length) return;
      var f = l.id === lineId ? fs * 1.25 : fs, w = l.n.length * f * .62, e = pa[pa.length - 1];
      var pv = pa.length > 1 ? pa[pa.length - 2] : [e[0] - 1, e[1]], dx = e[0] - pv[0], dy = e[1] - pv[1];
      var right = dx < 0 || e[0] + w + 16 > x1 + 140, x = right ? e[0] - 14 : e[0] + 14, y = dy > 0 && Math.abs(dx) < 1 ? e[1] + f + 10 : e[1] - 10;
      if (dx < 0) { x = e[0] - 16; y = e[1] + f * .35; }
      if (l.id === "green") { // in the middle of the line: beside its longest run, inside the loop
        var bi = 1, bl = -1; for (var i = 1; i < pa.length; i++) { var d = Math.hypot(pa[i][0] - pa[i - 1][0], pa[i][1] - pa[i - 1][1]); if (d > bl) { bl = d; bi = i; } }
        var A = pa[bi - 1], B = pa[bi], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
        right = false;
        if (Math.abs(B[0] - A[0]) < 1) { x = mx + 18; y = my + f * .35; } else { x = mx - w / 2; y = my - 14; }
      }
      spots[l.id] = { x: x, y: y, right: right, f: f, w: w };
    });
    if (spots.purple && spots.brown) { var sw = spots.purple; spots.purple = Object.assign({}, spots.brown, { f: sw.f, w: sw.w, y: spots.brown.y + sw.f * 1.1 }); spots.brown = Object.assign({}, sw, { f: spots.brown.f, w: spots.brown.w }); }
    LINES.forEach(function (l) {
      var sp = spots[l.id]; if (!sp) return;
      var f = sp.f, w = l.n.length * f * .62, x = sp.x, y = sp.y, bx = sp.right ? x - w : x;
      for (var k = 0; k < 12 && labs.some(function (b) { return bx < b[2] && bx + w > b[0] && y - f < b[3] && y > b[1]; }); k++) y += f * 1.15;
      labs.push([bx, y - f, bx + w, y]); add([bx, y - f]); add([bx + w, y + 4]);
      o += '<text x="' + x + '" y="' + y + '" text-anchor="' + (sp.right ? "end" : "start") + '" fill="' + l.c + '" font-family="Arial" font-weight="700" font-size="' + f + '" opacity="' + (lineId && l.id !== lineId ? .35 : 1) + '" paint-order="stroke" stroke="#0b0b0b" stroke-width="' + (f / 4) + '">' + esc(l.n.toUpperCase()) + "</text>";
    });
    var pad = 24;
    return '<svg viewBox="' + (x0 - pad) + " " + (y0 - pad) + " " + (x1 - x0 + 2 * pad) + " " + (y1 - y0 + 2 * pad) + '" role="img" aria-label="S.We.T.A. system map">' + o + "</svg>";
  }

  function menuHTML(id) {
    var p = id && plan(id), lineId = p && !p.hub ? p.main.line.id : null;
    var where = !id ? "" : lineId ? "You are on the " + esc(p.main.line.n) + " line" : "You are at " + esc(S[id].n);
    var rows = LINES.filter(function (l) { return !l.dash; }).map(function (l) {
      var st = allStops(l), n = st.length, cap = 14, shown = n > cap ? st.slice(0, cap - 1) : st, k = shown.length;
      var dots = shown.map(function (sid, i) { return '<i class="' + (sid === id ? "me" : "") + '" style="left:' + (k === 1 ? 50 : 4 + i * (n > cap ? 84 : 92) / (k - 1)) + '%"></i>'; }).join("") + (n > cap ? "<em>+" + (n - k) + "</em>" : "");
      var f = firstStop(l);
      return '<a class="row' + (l.id === lineId ? " on" : "") + '" data-to="' + f + '" href="' + esc(hand(S[f].u)) + '"><span class="bd" style="background:' + l.c + ";color:" + (l.c === "#F2BF00" ? "#121314" : "#fff") + '">' + esc(l.k) + '</span><span class="mid"><span class="nm">' + esc(l.n) + '</span><span class="rail"><b style="background:' + l.c + '"></b>' + dots + '</span></span><span class="cnt">' + n + ' stops</span><span class="go">\u203a</span></a>';
    }).join("");
    return '<div class="hd"><span class="seal" style="background-image:url(' + SEAL + ')"></span><div class="hn">S.We.T.A. Lines' + (where ? "<small>" + where + "</small>" : "") + '</div><button type="button" class="x" data-close aria-label="Close">\u00d7</button></div>' +
      '<nav aria-label="S.We.T.A. lines">' + rows + "</nav>" +
      '<div class="mini"><h4>System map <span>Tap to open the full map</span></h4><a data-to="map" href="' + esc(id ? mapHref(id) : hand(MAP_URL)) + '" aria-label="Open the full map">' + miniMap(lineId, id) + "</a></div>" +
      '<div class="ft"><a data-to="privacy" href="' + esc(hand(MAP_URL + "?privacy=1")) + '">Privacy</a></div>';
  }

  var MENU = null;
  function menuStop() { var f = document.querySelector(".swt-strip[data-stop]"); var v = f && f.getAttribute("data-stop"); return v && S[v] ? v : here(); }
  function openMenu(btn) {
    var id = menuStop();
    if (!MENU) {
      var hh = document.createElement("div"); hh.hidden = true; hh.className = "swt-menu-panel";
      document.body.appendChild(hh);
      MENU = { host: hh, root: hh.attachShadow({ mode: "open" }), btn: null };
      MENU.root.addEventListener("click", function (ev) {
        var t = ev.target && ev.target.closest ? ev.target.closest("a,.scrim,[data-close]") : null;
        if (!t) return;
        if (t.tagName !== "A") { closeMenu(); return; }
        track("click", MENU.id || "", t.getAttribute("data-to") || "");
        closeMenu();
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && MENU && !MENU.host.hidden) closeMenu(); });
    }
    MENU.id = id; MENU.btn = btn || null;
    MENU.root.innerHTML = "<style>" + MCSS + '</style><div class="scrim"></div><div class="sh" role="dialog" aria-modal="true" aria-label="S.We.T.A. lines">' + menuHTML(id) + "</div>";
    MENU.host.hidden = false;
    if (btn) btn.setAttribute("aria-expanded", "true");
    var x = MENU.root.querySelector("[data-close]"); if (x) x.focus();
  }
  function closeMenu() {
    if (!MENU) return; MENU.host.hidden = true;
    if (MENU.btn) { MENU.btn.setAttribute("aria-expanded", "false"); try { MENU.btn.focus(); } catch (e) {} }
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest("[data-swt-menu]") : null;
    if (!b) return;
    ev.preventDefault();
    if (MENU && !MENU.host.hidden) closeMenu(); else openMenu(b);
  });
  window.SWTStrip = window.SWTStrip || {};
  window.SWTStrip.menu = function () { openMenu(null); };

  function start() {
    var els = document.querySelectorAll(".swt-strip");
    for (var k = 0; k < els.length; k++) mount(els[k]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
