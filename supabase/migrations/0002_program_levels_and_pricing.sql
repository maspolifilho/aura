-- Níveis do programa e preços. Tabela (não enum) porque a secretaria/master
-- pode precisar reajustar preços sem depender de uma migration.
create table program_levels (
  id uuid primary key default gen_random_uuid(),
  code program_level_code unique not null,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  extra_exam_discount_pct numeric(5, 2) not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
