-- Funções auxiliares de autorização.
create or replace function is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from staff_profiles
    where auth_user_id = auth.uid() and active
  );
$$;

create or replace function is_master()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from staff_profiles
    where auth_user_id = auth.uid() and role = 'master' and active
  );
$$;

create or replace function current_patient_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from patients where auth_user_id = auth.uid();
$$;

alter table program_levels enable row level security;
alter table exam_types enable row level security;
alter table program_exams enable row level security;
alter table obstetricians enable row level security;
alter table staff_profiles enable row level security;
alter table patients enable row level security;
alter table patient_exam_schedule enable row level security;
alter table reschedule_log enable row level security;
alter table cancellation_requests enable row level security;
alter table leads enable row level security;
alter table payments enable row level security;

-- Catálogo (níveis/exames): leitura pública (usado na página de planos do
-- site), escrita só por master/admin.
create policy "program_levels_select_all" on program_levels
  for select using (true);
create policy "program_levels_write_admin" on program_levels
  for all using (is_master() or is_staff()) with check (is_master());

create policy "exam_types_select_all" on exam_types
  for select using (true);
create policy "exam_types_write_admin" on exam_types
  for all using (is_master() or is_staff()) with check (is_master());

create policy "program_exams_staff_only" on program_exams
  for all using (is_staff()) with check (is_master());

-- Operação interna: só staff.
create policy "obstetricians_staff_only" on obstetricians
  for all using (is_staff()) with check (is_staff());

create policy "staff_profiles_self_or_staff_select" on staff_profiles
  for select using (auth_user_id = auth.uid() or is_staff());
create policy "staff_profiles_master_write" on staff_profiles
  for all using (is_master()) with check (is_master());

-- Pacientes: staff tem acesso completo; a própria paciente só lê seus dados.
create policy "patients_staff_all" on patients
  for all using (is_staff()) with check (is_staff());
create policy "patients_self_select" on patients
  for select using (auth_user_id = auth.uid());

create policy "patient_exam_schedule_staff_all" on patient_exam_schedule
  for all using (is_staff()) with check (is_staff());
create policy "patient_exam_schedule_self_select" on patient_exam_schedule
  for select using (patient_id = current_patient_id());

-- Reagendamento e desistência são fluxos mediados pela clínica: paciente não
-- acessa essas tabelas diretamente (ela vê o reflexo na própria agenda).
create policy "reschedule_log_staff_only" on reschedule_log
  for all using (is_staff()) with check (is_staff());

create policy "cancellation_requests_staff_all" on cancellation_requests
  for all using (is_staff()) with check (is_staff());
-- (colunas de reembolso/retenção/status são reforçadas pelo trigger em
-- 0007_cancellation_requests.sql, restrito a role = 'master')

create policy "leads_staff_all" on leads
  for all using (is_staff()) with check (is_staff());
-- Inserção pública de leads acontece via service role em app/api/leads
-- (rota server-side), não diretamente pelo cliente anônimo.

create policy "payments_staff_only" on payments
  for all using (is_staff()) with check (is_staff());
