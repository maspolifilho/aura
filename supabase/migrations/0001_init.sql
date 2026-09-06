-- Extensões e enums de base do sistema.
create extension if not exists pgcrypto;

create type program_level_code as enum ('basic', 'ideal', 'advanced');
create type exam_status as enum ('pendente', 'realizado', 'perdido');
create type lead_origin as enum ('obstetra', 'outro_canal');
create type lead_status as enum ('novo', 'contatado', 'convertido', 'perdido');
create type cancellation_status as enum (
  'solicitada',
  'em_analise',
  'aprovada',
  'reembolsada',
  'negada'
);
create type staff_role as enum ('master', 'admin', 'medico', 'secretaria', 'financeiro');
