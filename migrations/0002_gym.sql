-- Per-user gym data. user_id is TEXT (Better Auth ids / preview 'dev-user').

create table if not exists profiles (
  user_id text primary key,
  name text not null default '',
  goal text not null default 'hipertrofia',
  level text not null default 'intermedio',
  days_per_week integer not null default 4,
  unit text not null default 'kg',
  body_weight_kg double precision not null default 75,
  height_cm double precision not null default 170,
  gender text not null default 'hombre',
  birth_date text not null default '1995-01-01',
  onboarded boolean not null default false,
  theme text not null default 'dark',
  notifications boolean not null default false,
  notify_hour text not null default '08:00',
  keep_awake boolean not null default true,
  vibration boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists custom_routines (
  id text primary key,
  user_id text not null,
  name text not null,
  focus text not null default 'Personal',
  duration_min integer not null default 40,
  level text not null default 'intermedio',
  cover text not null default 'dumbbells',
  schedule_days jsonb not null default '[]',
  exercises jsonb not null default '[]',
  created_at timestamptz not null default now()
);
create index if not exists custom_routines_user_id_idx on custom_routines (user_id);

create table if not exists completed_sessions (
  id text primary key,
  user_id text not null,
  routine_id text not null,
  routine_name text not null,
  started_at bigint not null,
  ended_at bigint not null,
  volume_kg double precision not null default 0,
  sets_completed integer not null default 0,
  exercises jsonb not null default '[]',
  prs jsonb not null default '[]'
);
create index if not exists completed_sessions_user_idx on completed_sessions (user_id, ended_at desc);

create table if not exists personal_records (
  user_id text not null,
  exercise_id text not null,
  weight_kg double precision not null,
  reps integer not null,
  e1rm double precision not null,
  date text not null,
  primary key (user_id, exercise_id)
);

create table if not exists body_logs (
  user_id text not null,
  date text not null,
  weight_kg double precision not null,
  primary key (user_id, date)
);
