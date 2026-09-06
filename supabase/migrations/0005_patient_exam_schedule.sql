-- Cronograma/checklist de exames por paciente. `computed_window_*` é o
-- cálculo original do sistema (auditoria, nunca editado); `scheduled_date` é
-- a data prevista que a secretaria pode ajustar por indicação médica.
create table patient_exam_schedule (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  exam_type_id uuid not null references exam_types (id),
  is_extra_attempt boolean not null default false,
  computed_window_start date not null,
  computed_window_end date not null,
  scheduled_date date,
  status exam_status not null default 'pendente',
  performed_date date,
  recording_url text,
  notes text,
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now(),
  unique (patient_id, exam_type_id, is_extra_attempt)
);
