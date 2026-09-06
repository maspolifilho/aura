-- Catálogo de exames e janelas gestacionais ideais (em semanas + dias),
-- espelhando lib/data/exam-types.ts. Tabela, não enum/constante de código,
-- porque a clínica pode precisar ajustar janelas sem depender de deploy.
create table exam_types (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  window_start_weeks integer not null,
  window_start_days integer not null default 0,
  window_end_weeks integer not null,
  window_end_days integer not null default 0,
  is_morphological boolean not null default false,
  linked_exam_code text references exam_types (code),
  created_at timestamptz not null default now()
);

-- Quais exames entram em cada nível do programa (join data-driven em vez de
-- hardcoded em código, para o dia em que os níveis mudarem de composição).
create table program_exams (
  id uuid primary key default gen_random_uuid(),
  program_level_id uuid not null references program_levels (id) on delete cascade,
  exam_type_id uuid not null references exam_types (id) on delete cascade,
  is_extra_attempt boolean not null default false,
  unique (program_level_id, exam_type_id, is_extra_attempt)
);
