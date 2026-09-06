-- Obstetras de origem — vínculo estratégico para o funil de indicação.
create table obstetricians (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  crm text,
  phone text,
  email text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Equipe interna da clínica (painel). Provisionado manualmente pelo master/
-- admin — não existe cadastro público de staff.
create table staff_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users (id) on delete cascade,
  full_name text not null,
  role staff_role not null default 'secretaria',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table patients (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  full_name text not null,
  cpf text unique not null,
  phone text,
  email text,
  obstetrician_id uuid references obstetricians (id),
  program_level_id uuid not null references program_levels (id),
  registration_date date not null default current_date,
  gestational_age_weeks_at_registration integer not null,
  gestational_age_days_at_registration integer not null default 0,
  due_date date not null,
  status text not null default 'ativa' check (status in ('ativa', 'cancelada', 'finalizada')),
  created_at timestamptz not null default now()
);
