/* S.We.T.A. beacon: counts a visit to one map stop without drawing anything on the page.
   For sites that are on the map but don't show the station strip (IDLA).
   Use: <script src="https://beachkila.github.io/SiteMap/beacon.js" data-stop="IDLA" defer></script>
   Same rules as the strip: an anonymous random rider ID kept in this browser and handed along
   S.We.T.A. links (?swt=), nothing sent with Do Not Track or Global Privacy Control. */
(function () {
  "use strict";
  var TRACK = "https://sweta-tracker.kbmallonee.workers.dev";
  var me = document.currentScript;
  var stop = (me && me.getAttribute("data-stop")) || "";
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(stop)) return;
  try {
    if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true) return;
  } catch (e) {}
  var rid = "";
  try {
    // A rider arriving from another S.We.T.A. page brings its ID in ?swt=; keep it and tidy the address.
    var q = new URLSearchParams(location.search), h = q.get("swt");
    if (h && /^[a-z0-9]{8,32}$/.test(h)) {
      localStorage.setItem("swt_rid", h);
      q.delete("swt");
      var qs = q.toString();
      history.replaceState(history.state, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    }
    rid = localStorage.getItem("swt_rid") || "";
    if (!/^[a-z0-9]{8,32}$/.test(rid)) {
      var a = new Uint8Array(16); rid = "";
      crypto.getRandomValues(a);
      for (var i = 0; i < a.length; i++) rid += (a[i] % 36).toString(36);
      localStorage.setItem("swt_rid", rid);
    }
  } catch (e) { return; }
  var ref = "";
  try { var ru = new URL(document.referrer); if (ru.hostname !== location.hostname) ref = ru.hostname; } catch (e) {}
  try {
    var body = JSON.stringify({ t: "view", s: stop, o: "", r: rid, h: location.hostname, p: location.pathname, k: "beacon", f: ref });
    if (navigator.sendBeacon && navigator.sendBeacon(TRACK + "/hit", new Blob([body], { type: "text/plain" }))) return;
    fetch(TRACK + "/hit", { method: "POST", body: body, keepalive: true, mode: "cors", headers: { "content-type": "text/plain" } }).catch(function () {});
  } catch (e) {}
})();
