-- Extra preferences for the Ajustes screen: sound, haptics, rest defaults,
-- plate maths and the weekly goal. Everything is additive with a default, so an
-- existing row keeps behaving exactly as it did before.

alter table profiles add column if not exists sound boolean not null default true;
alter table profiles add column if not exists volume integer not null default 70;
alter table profiles add column if not exists tone text not null default 'clasico';
alter table profiles add column if not exists countdown_sound boolean not null default true;
alter table profiles add column if not exists haptics boolean not null default false;
alter table profiles add column if not exists auto_theme boolean not null default false;
alter table profiles add column if not exists prefill_last_weight boolean not null default true;
alter table profiles add column if not exists auto_advance boolean not null default true;
alter table profiles add column if not exists default_rest_sec integer not null default 90;
alter table profiles add column if not exists min_plate_kg double precision not null default 1.25;
alter table profiles add column if not exists weekly_goal integer not null default 4;