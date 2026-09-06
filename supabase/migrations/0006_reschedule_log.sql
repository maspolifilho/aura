-- Log de reagendamentos. Registra mesmo quando a regra das 48h é violada —
-- isso é a própria proteção contratual da clínica, não um erro a esconder.
create table reschedule_log (
  id uuid primary key default gen_random_uuid(),
  patient_exam_schedule_id uuid not null references patient_exam_schedule (id) on delete cascade,
  previous_date date not null,
  new_date date not null,
  requested_at timestamptz not null default now(),
  hours_before_previous_date numeric not null,
  meets_48h_rule boolean not null,
  reason text,
  created_by uuid references auth.users (id)
);
