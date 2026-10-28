-- S.We.T.A. rider tracker. Run this once in the D1 console.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,          -- milliseconds since 1970, set by the server
  ih TEXT NOT NULL,             -- scrambled rider ID (salted hash of IP + browser). The IP is never stored.
  cid TEXT,                     -- random ID kept in the visitor's browser
  type TEXT NOT NULL,           -- view | station | click
  stop TEXT,                    -- station id the event happened at
  to_stop TEXT,                 -- for clicks: station id the link led to (empty for other sites)
  host TEXT,                    -- site the event came from
  path TEXT,                    -- page path, no query string
  src TEXT                      -- strip | map
);
CREATE INDEX IF NOT EXISTS ev_ts ON events(ts);
CREATE INDEX IF NOT EXISTS ev_ih ON events(ih, ts);
-- Daily totals kept after detailed rows are deleted at 90 days.
CREATE TABLE IF NOT EXISTS daily (
  day TEXT NOT NULL,
  stop TEXT NOT NULL,
  views INTEGER NOT NULL,
  riders INTEGER NOT NULL,
  PRIMARY KEY (day, stop)
);
