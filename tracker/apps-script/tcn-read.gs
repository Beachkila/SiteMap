// S.We.T.A. read function for the "TCN" tool-usage sheet.
// Returns download COUNTS only (per day, by tool, action, format and timezone, plus how many different members).
// The member codes themselves never leave the sheet.
// Paste this as a new file in the sheet's Apps Script project, set READ_KEY, then deploy (see the README).

const SWT_READ_KEY = "PASTE-THE-SAME-KEY-YOU-PUT-IN-CLOUDFLARE";
const SWT_SHEET_ID = "1YqrDXgyvUrkC4LsTkOZrpshglULiEX2sQzAgu0z5D5A";
const SWT_TAB = "All";

function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== SWT_READ_KEY) return swtOut({ error: "bad key" });
  const book = SpreadsheetApp.openById(SWT_SHEET_ID);
  const sh = book.getSheetByName(SWT_TAB);
  if (!sh) return swtOut({ error: "No tab named " + SWT_TAB + ". Tabs: " + book.getSheets().map(s => s.getName()).join(", ") });
  const v = sh.getDataRange().getDisplayValues();
  const head = v[0].map(h => String(h).trim().toLowerCase());
  const col = (test) => head.findIndex(test);
  const cTime = col(h => (h.indexOf("time") === 0 && h.indexOf("zone") < 0) || h === "date" || h.indexOf("timestamp") > -1);
  const cTool = col(h => h === "tool");
  const cAction = col(h => h === "action");
  const cFormat = col(h => h === "format");
  const cTz = col(h => h.indexOf("time zone") > -1 || h === "timezone");
  const cUser = col(h => h === "user" || h.indexOf("user") === 0);
  if (cTime < 0) return swtOut({ error: "No Time column. Headers: " + v[0].join(", ") });
  const days = {}, users = {};
  for (let i = 1; i < v.length; i++) {
    const d = swtDay(v[i][cTime]);
    if (!d) continue;
    const o = days[d] = days[d] || { total: 0, by: {}, action: {}, format: {}, tz: {}, users: 0 };
    o.total++;
    if (cTool > -1) swtInc(o.by, v[i][cTool]);
    if (cAction > -1) swtInc(o.action, v[i][cAction]);
    if (cFormat > -1) swtInc(o.format, String(v[i][cFormat]).toUpperCase());
    if (cTz > -1) swtInc(o.tz, v[i][cTz]);
    if (cUser > -1 && v[i][cUser]) { const u = users[d] = users[d] || {}; u[v[i][cUser]] = 1; }
  }
  for (const d in users) days[d].users = Object.keys(users[d]).length;
  return swtOut({ sheet: "tcn", rows: v.length - 1, days: days });
}

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
