-- Solicitação de desistência. O sistema só registra os dados de referência
-- (motivo, exames já realizados, prazos contratuais) — o VALOR do reembolso
-- e o valor retido são preenchidos manualmente pelo acesso master (decisão
-- de negócio, tratada caso a caso pelo jurídico), sem fórmula automática de
-- rateio por exame.
create table cancellation_requests (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  requested_at timestamptz not null default now(),
  reason text not null,

  -- Regra dos 24h de antecedência do próximo exame agendado.
  next_scheduled_exam_date date,
  hours_before_next_exam numeric,
  meets_24h_rule boolean,

  -- Snapshot informativo do que já foi realizado até a solicitação (não é
  -- usado para calcular valor automaticamente, só para referência de quem
  -- decide o reembolso).
  exams_completed_snapshot jsonb not null default '[]'::jsonb,
  program_value_cents integer not null,

  -- Preenchido manualmente pelo master ao decidir o caso.
  refund_amount_cents integer,
  retained_amount_cents integer,
  status cancellation_status not null default 'solicitada',
  decided_by uuid references auth.users (id),
  decided_at timestamptz,

  -- Prazo contratual: até 30 dias corridos após a solicitação.
  refund_deadline date not null,
  refunded_at timestamptz,
  letter_url text
);

-- Só o acesso master pode definir os valores de reembolso/retenção ou
-- aprovar/negar/efetivar o estorno — reforçado aqui via trigger porque RLS
-- por si só não distingue colunas dentro da mesma linha.
create or replace function enforce_cancellation_master_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (
    new.refund_amount_cents is distinct from old.refund_amount_cents
    or new.retained_amount_cents is distinct from old.retained_amount_cents
    or new.status is distinct from old.status
  ) and not exists (
    select 1 from staff_profiles
    where auth_user_id = auth.uid() and role = 'master' and active
  ) then
    raise exception 'Somente o acesso master pode definir reembolso, retenção ou status da desistência.';
  end if;
  return new;
end;
$$;

create trigger cancellation_requests_master_only
  before update on cancellation_requests
  for each row
  execute function enforce_cancellation_master_fields();
