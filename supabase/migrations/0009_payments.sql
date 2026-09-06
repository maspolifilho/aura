-- Registros de faturamento (programa fechado, exames extras, estornos).
create table payments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id),
  amount_cents integer not null,
  type text not null check (type in ('programa', 'exame_extra', 'estorno')),
  payment_date date not null default current_date,
  program_level_id uuid references program_levels (id),
  notes text,
  created_at timestamptz not null default now()
);
