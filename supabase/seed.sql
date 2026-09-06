-- Espelha lib/data/program-levels.ts e lib/data/exam-types.ts. Se um desses
-- arquivos mudar, atualize este seed junto (ou migre a leitura do site para
-- o banco, o que torna este arquivo a única fonte de verdade).

insert into program_levels (code, name, price_cents, extra_exam_discount_pct) values
  ('basic', 'Basic', 175000, 0),
  ('ideal', 'Ideal', 189990, 15),
  ('advanced', 'Advanced', 269090, 15);

insert into exam_types (code, name, window_start_weeks, window_start_days, window_end_weeks, window_end_days, is_morphological, linked_exam_code) values
  ('morfologico_1t', 'Morfológico do 1º trimestre', 12, 0, 13, 6, true, null),
  ('cervicometria_1t', 'Cervicometria do 1º trimestre', 12, 0, 13, 6, false, 'morfologico_1t'),
  ('morfologico_2t', 'Morfológico do 2º trimestre', 22, 0, 24, 0, true, null),
  ('cervicometria_2t', 'Cervicometria do 2º trimestre', 22, 0, 24, 0, false, 'morfologico_2t'),
  ('morfologico_3t', 'Morfológico do 3º trimestre', 32, 0, 38, 0, true, null),
  ('doppler_3t', 'Obstétrico com doppler (3º trimestre)', 32, 0, 38, 0, false, 'morfologico_3t'),
  ('exame_3d', 'Exame 3D', 30, 0, 34, 0, false, null),
  ('exame_3d_extra', 'Tentativa adicional de exame 3D', 30, 0, 34, 0, false, 'exame_3d');

-- Basic: exames essenciais.
insert into program_exams (program_level_id, exam_type_id, is_extra_attempt)
select pl.id, et.id, false
from program_levels pl
cross join exam_types et
where pl.code = 'basic'
  and et.code in (
    'morfologico_1t', 'cervicometria_1t',
    'morfologico_2t', 'cervicometria_2t',
    'morfologico_3t', 'doppler_3t'
  );

-- Ideal: Basic + exame 3D.
insert into program_exams (program_level_id, exam_type_id, is_extra_attempt)
select pl.id, et.id, false
from program_levels pl
cross join exam_types et
where pl.code = 'ideal'
  and et.code in (
    'morfologico_1t', 'cervicometria_1t',
    'morfologico_2t', 'cervicometria_2t',
    'morfologico_3t', 'doppler_3t', 'exame_3d'
  );

-- Advanced: Ideal + tentativa adicional de 3D.
insert into program_exams (program_level_id, exam_type_id, is_extra_attempt)
select pl.id, et.id, et.code = 'exame_3d_extra'
from program_levels pl
cross join exam_types et
where pl.code = 'advanced'
  and et.code in (
    'morfologico_1t', 'cervicometria_1t',
    'morfologico_2t', 'cervicometria_2t',
    'morfologico_3t', 'doppler_3t', 'exame_3d', 'exame_3d_extra'
  );
