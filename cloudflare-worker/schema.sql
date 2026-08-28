CREATE TABLE IF NOT EXISTS kv_store (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at INTEGER
);

CREATE TABLE IF NOT EXISTS telemetry_devices (
    anonymous_id TEXT PRIMARY KEY,
    country TEXT,
    city TEXT,
    region TEXT,
    os TEXT,
    app_version TEXT,
    vscode_version TEXT,
    locale TEXT,
    first_seen INTEGER,
    last_seen INTEGER
);

CREATE TABLE IF NOT EXISTS telemetry_daily_stats (
    date TEXT PRIMARY KEY,
    active_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    countries_count INTEGER DEFAULT 0,
    top_countries TEXT,
    updated_at INTEGER
);
