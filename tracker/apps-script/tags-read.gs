// S.We.T.A. read function for the "Tags Generated" sheet.
// Returns download COUNTS only (per day, by source, timezone and frame colour).
// No tag text, thumbnails or image links ever leave the sheet.
// Paste this as a new file in the sheet's Apps Script project, set READ_KEY, then deploy (see the README).

const SWT_READ_KEY = "PASTE-THE-SAME-KEY-YOU-PUT-IN-CLOUDFLARE";
const SWT_SHEET_ID = "13DVeSW-RddrDKsJcc2ahb67ZawNG3my3p2mE406o3HA";
const SWT_TAB = "All";

function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== SWT_READ_KEY) return swtOut({ error: "bad key" });
  const book = SpreadsheetApp.openById(SWT_SHEET_ID);
  const sh = book.getSheetByName(SWT_TAB);
  if (!sh) return swtOut({ error: "No tab named " + SWT_TAB + ". Tabs: " + book.getSheets().map(s => s.getName()).join(", ") });
  const v = sh.getDataRange().getDisplayValues();
  const head = v[0].map(h => String(h).trim().toLowerCase());
  const col = (test) => head.findIndex(test);
  const cTime = col(h => h.indexOf("time") === 0 && h.indexOf("zone") < 0);
  const cSrc = col(h => h === "source");
  const cColor = col(h => h.indexOf("color") > -1 || h.indexOf("colour") > -1 || h.indexOf("frame") > -1);
  const cTz = col(h => h.indexOf("time zone") > -1 || h === "timezone");
  if (cTime < 0) return swtOut({ error: "No Time column. Headers: " + v[0].join(", ") });
  const days = {};
  for (let i = 1; i < v.length; i++) {
    const d = swtDay(v[i][cTime]);
    if (!d) continue;
    const o = days[d] = days[d] || { total: 0, by: {}, tz: {}, color: {} };
    o.total++;
    swtInc(o.by, cSrc > -1 ? v[i][cSrc] || "Tags" : "Tags");
    if (cTz > -1) swtInc(o.tz, v[i][cTz]);
    if (cColor > -1) swtInc(o.color, String(v[i][cColor]).toLowerCase());
  }
  return swtOut({ sheet: "tags", rows: v.length - 1, days: days });
}

// The Time (UTC) column, read as shown, e.g. 10/30/2026 10:56:41 or 2026-10-30T10:56:41Z.
function swtDay(s) {
  s = String(s || "").trim();
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return m[3] + "-" + ("0" + m[1]).slice(-2) + "-" + ("0" + m[2]).slice(-2);
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[1] + "-" + m[2] + "-" + m[3];
  return null;
}
function swtInc(o, k) { k = String(k || "").trim(); if (!k) return; o[k] = (o[k] || 0) + 1; }
function swtOut(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
