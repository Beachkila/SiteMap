// S.We.T.A. read function for the "TCN" tool-usage sheet.
// Returns download COUNTS only (per Pacific day and per hour for the last 72 hours, by tool, action, format and timezone,
// plus how many different members). The member codes themselves never leave the sheet.
// Paste this as a new file in the sheet's Apps Script project, set READ_KEY, then deploy (see the README).

const TCN_READ_KEY = "PASTE-THE-SAME-KEY-YOU-PUT-IN-CLOUDFLARE";
const TCN_SHEET_ID = "1YqrDXgyvUrkC4LsTkOZrpshglULiEX2sQzAgu0z5D5A";
const TCN_TAB = "All";
const TCN_TZ = "America/Los_Angeles";

function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== TCN_READ_KEY) return tcnOut({ error: "bad key" });
  const book = SpreadsheetApp.openById(TCN_SHEET_ID);
  const sh = book.getSheetByName(TCN_TAB);
  if (!sh) return tcnOut({ error: "No tab named " + TCN_TAB + ". Tabs: " + book.getSheets().map(s => s.getName()).join(", ") });
  const range = sh.getDataRange(), v = range.getDisplayValues(), raw = range.getValues();
  const head = v[0].map(h => String(h).trim().toLowerCase());
  const col = (test) => head.findIndex(test);
  const cTime = col(h => (h.indexOf("time") === 0 && h.indexOf("zone") < 0) || h === "date" || h.indexOf("timestamp") > -1);
  const cTool = col(h => h === "tool");
  const cAction = col(h => h === "action");
  const cFormat = col(h => h === "format");
  const cTz = col(h => h.indexOf("time zone") > -1 || h === "timezone");
  const cUser = col(h => h === "user" || h.indexOf("user") === 0);
  if (cTime < 0) return tcnOut({ error: "No Time column. Headers: " + v[0].join(", ") });
  const utc = head[cTime].indexOf("utc") > -1, recent = Date.now() - 72 * 3600e3;
  const days = {}, hours = {}, users = {}, hUsers = {};
  const blank = () => ({ total: 0, by: {}, action: {}, format: {}, tz: {}, users: 0 });
  const add = (o, i) => {
    o.total++;
    if (cTool > -1) tcnInc(o.by, v[i][cTool]);
    if (cAction > -1) tcnInc(o.action, v[i][cAction]);
    if (cFormat > -1) tcnInc(o.format, String(v[i][cFormat]).toUpperCase());
    if (cTz > -1) tcnInc(o.tz, v[i][cTz]);
  };
  for (let i = 1; i < v.length; i++) {
    const t = tcnWhen(raw[i][cTime], v[i][cTime], utc);
    if (!t) continue;
    const d = Utilities.formatDate(t, TCN_TZ, "yyyy-MM-dd");
    add(days[d] = days[d] || blank(), i);
    if (cUser > -1 && v[i][cUser]) (users[d] = users[d] || {})[v[i][cUser]] = 1;
    if (t.getTime() >= recent) {
      const h = Utilities.formatDate(t, TCN_TZ, "yyyy-MM-dd HH");
      add(hours[h] = hours[h] || blank(), i);
      if (cUser > -1 && v[i][cUser]) (hUsers[h] = hUsers[h] || {})[v[i][cUser]] = 1;
    }
  }
  for (const d in users) days[d].users = Object.keys(users[d]).length;
  for (const h in hUsers) hours[h].users = Object.keys(hUsers[h]).length;
  return tcnOut({ sheet: "tcn", rows: v.length - 1, tz: TCN_TZ, days: days, hours: hours });
}

// The time of a row. A column marked UTC is read as shown; otherwise a real date cell is used as it is.
function tcnWhen(raw, shown, utc) {
  const s = String(shown || "").trim();
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (m && (utc || !(raw instanceof Date))) return new Date(Date.UTC(+m[3], +m[1] - 1, +m[2], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)));
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (m && (utc || !(raw instanceof Date))) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)));
  if (raw instanceof Date && !isNaN(raw)) return raw;
  return null;
}
function tcnInc(o, k) { k = String(k || "").trim(); if (!k) return; o[k] = (o[k] || 0) + 1; }
function tcnOut(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
