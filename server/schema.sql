-- Halol Avlod — полная схема PostgreSQL
-- Запустить один раз: psql $DATABASE_URL -f server/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Пользователи ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  birth_date    DATE NOT NULL,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Сценарии (создаёт учитель) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS scenarios (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  lang          TEXT NOT NULL DEFAULT 'ru' CHECK (lang IN ('uz','ru','en')),
  is_published  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Акты (сцены) внутри сценария ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS acts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id     UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  act_number      INTEGER NOT NULL,
  is_optional     BOOLEAN NOT NULL DEFAULT false,
  stage           TEXT NOT NULL,          -- "ПЕРВЫЙ КОМПРОМИСС"
  setting         TEXT,                   -- место действия
  title           TEXT NOT NULL,
  narrator        TEXT NOT NULL,
  quote           TEXT NOT NULL,
  timer           INTEGER NOT NULL DEFAULT 40,
  real_story      BOOLEAN NOT NULL DEFAULT false,
  real_story_note TEXT,
  UNIQUE(scenario_id, act_number)
);

-- ─── Варианты выбора для акта ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS choices (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  act_id           UUID NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
  choice_key       TEXT NOT NULL CHECK (choice_key IN ('a','b','c')),
  type             TEXT NOT NULL CHECK (type IN ('halol','gray','shortcut','risky-halol')),
  label            TEXT NOT NULL,
  subtitle         TEXT,
  outcome          TEXT NOT NULL,
  delta_integrity  INTEGER NOT NULL DEFAULT 0,
  delta_money      INTEGER NOT NULL DEFAULT 0,
  delta_risk       INTEGER NOT NULL DEFAULT 0,
  delta_reputation INTEGER NOT NULL DEFAULT 0,
  UNIQUE(act_id, choice_key)
);

-- ─── Ветвление: какой акт идёт следующим ────────────────────────────────────
-- Если condition_type IS NULL — это дефолтная ветка.
-- Иначе condition_type='choice_type', condition_value='shortcut' и т.д.
CREATE TABLE IF NOT EXISTS act_branches (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_act_id      UUID NOT NULL REFERENCES acts(id) ON DELETE CASCADE,
  condition_type   TEXT,                  -- NULL = default | 'choice_type'
  condition_value  TEXT,                  -- 'halol','gray','shortcut','risky-halol'
  to_act_id        UUID REFERENCES acts(id) ON DELETE SET NULL,  -- NULL = идём в финал
  priority         INTEGER NOT NULL DEFAULT 0
);

-- ─── Финалы сценария ─────────────────────────────────────────────────────────
-- Условия проверяются в порядке возрастания condition_order.
-- Первое совпадение — побеждает. Последний финал без условий — дефолт.
CREATE TABLE IF NOT EXISTS scenario_endings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id      UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  ending_key       TEXT NOT NULL,         -- 'halol_leader', 'imprisoned', ...
  title            TEXT NOT NULL,
  subtitle         TEXT,
  body             TEXT[],                -- массив абзацев
  stat_quote       TEXT,
  share_text       TEXT,
  badge_color      TEXT DEFAULT 'bg-ink-700 text-ink-100 border-ink-500',
  -- Условие (например: integrity >= 65 AND reputation >= 55)
  -- Храним как JSONB массив [{field, op, value}, ...]
  conditions       JSONB NOT NULL DEFAULT '[]',
  condition_order  INTEGER NOT NULL DEFAULT 0,
  UNIQUE(scenario_id, ending_key)
);

-- ─── Игровые сессии (как комнаты в Kahoot) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scenario_id  UUID NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
  code         TEXT UNIQUE NOT NULL,      -- 6-символьный код для входа
  status       TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting','active','finished')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  started_at   TIMESTAMPTZ,
  finished_at  TIMESTAMPTZ
);

-- ─── Участники сессии ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS session_players (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  player_name  TEXT,
  joined_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- ─── Результаты игры ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS game_results (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID REFERENCES sessions(id) ON DELETE SET NULL,
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scenario_id    UUID REFERENCES scenarios(id) ON DELETE SET NULL,
  ending_key     TEXT NOT NULL,
  final_stats    JSONB NOT NULL,          -- {integrity, money, risk, reputation}
  history        JSONB NOT NULL,          -- [{scenarioId, choiceId, type, deltas, timedOut}]
  behavior_tags  JSONB NOT NULL,          -- {dominant, counts}
  completed_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Индексы ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_scenarios_teacher ON scenarios(teacher_id);
CREATE INDEX IF NOT EXISTS idx_acts_scenario     ON acts(scenario_id);
CREATE INDEX IF NOT EXISTS idx_choices_act       ON choices(act_id);
CREATE INDEX IF NOT EXISTS idx_branches_from     ON act_branches(from_act_id);
CREATE INDEX IF NOT EXISTS idx_endings_scenario  ON scenario_endings(scenario_id, condition_order);
CREATE INDEX IF NOT EXISTS idx_sessions_teacher  ON sessions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_sessions_code     ON sessions(code);
CREATE INDEX IF NOT EXISTS idx_results_user      ON game_results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_session   ON game_results(session_id);
