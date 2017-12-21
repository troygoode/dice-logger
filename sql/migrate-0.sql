BEGIN TRANSACTION;

  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS logs (
      id UUID
        NOT NULL
        DEFAULT uuid_generate_v4()
        PRIMARY KEY,

      name TEXT
        NOT NULL
        DEFAULT ''
        CHECK (CHAR_LENGTH(name) <= 32),
      key UUID
        NOT NULL
        DEFAULT uuid_generate_v4(),

      created_at TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW()::TIMESTAMPTZ,
      updated_at TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW()::TIMESTAMPTZ
        CHECK (updated_at >= created_at)
    );

  CREATE TABLE IF NOT EXISTS entries (
      log_id UUID
        NOT NULL
        REFERENCES logs (id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

      message TEXT
        NOT NULL
        DEFAULT ''
        CHECK (CHAR_LENGTH(message) <= 1024),
      roll TEXT
        NOT NULL
        DEFAULT ''
        CHECK (CHAR_LENGTH(roll) <= 8),
      result TEXT
        NOT NULL
        DEFAULT ''
        CHECK (CHAR_LENGTH(result) <= 7),

      created_at TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW()::TIMESTAMPTZ
    );

  CREATE INDEX log_entries_idx ON entries (log_id, created_at DESC);
  CREATE INDEX recent_entries_idx ON entries (created_at DESC);

COMMIT;
