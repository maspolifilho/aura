-- Funil de conversão: contato -> fechamento de programa, por origem.
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  origin lead_origin not null,
  obstetrician_id uuid references obstetricians (id),
  status lead_status not null default 'novo',
  interested_level_id uuid references program_levels (id),
  converted_patient_id uuid references patients (id),
  notes text,
  created_at timestamptz not null default now()
);
