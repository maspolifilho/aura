import type { ExamTypeCode, ExamTypeDefinition } from "@/lib/types/domain";
import type { ProgramLevelCode } from "@/lib/data/program-levels";

export const examTypes: Record<ExamTypeCode, ExamTypeDefinition> = {
  morfologico_1t: {
    code: "morfologico_1t",
    name: "Morfológico do 1º trimestre",
    windowStart: { weeks: 12, days: 0 },
    windowEnd: { weeks: 13, days: 6 },
    isMorphological: true,
  },
  cervicometria_1t: {
    code: "cervicometria_1t",
    name: "Cervicometria do 1º trimestre",
    windowStart: { weeks: 12, days: 0 },
    windowEnd: { weeks: 13, days: 6 },
    isMorphological: false,
    linkedTo: "morfologico_1t",
  },
  morfologico_2t: {
    code: "morfologico_2t",
    name: "Morfológico do 2º trimestre",
    windowStart: { weeks: 22, days: 0 },
    windowEnd: { weeks: 24, days: 0 },
    isMorphological: true,
  },
  cervicometria_2t: {
    code: "cervicometria_2t",
    name: "Cervicometria do 2º trimestre",
    windowStart: { weeks: 22, days: 0 },
    windowEnd: { weeks: 24, days: 0 },
    isMorphological: false,
    linkedTo: "morfologico_2t",
  },
  morfologico_3t: {
    code: "morfologico_3t",
    name: "Morfológico do 3º trimestre",
    windowStart: { weeks: 32, days: 0 },
    windowEnd: { weeks: 38, days: 0 },
    isMorphological: true,
  },
  doppler_3t: {
    code: "doppler_3t",
    name: "Obstétrico com doppler (3º trimestre)",
    windowStart: { weeks: 32, days: 0 },
    windowEnd: { weeks: 38, days: 0 },
    isMorphological: false,
    linkedTo: "morfologico_3t",
  },
  exame_3d: {
    code: "exame_3d",
    name: "Exame 3D",
    windowStart: { weeks: 30, days: 0 },
    windowEnd: { weeks: 34, days: 0 },
    isMorphological: false,
  },
  exame_3d_extra: {
    code: "exame_3d_extra",
    name: "Tentativa adicional de exame 3D",
    windowStart: { weeks: 30, days: 0 },
    windowEnd: { weeks: 34, days: 0 },
    isMorphological: false,
    linkedTo: "exame_3d",
  },
};

/** Exames inclusos em cada nível do programa, na ordem do cronograma. */
export const programExamsByLevel: Record<ProgramLevelCode, ExamTypeCode[]> = {
  basic: [
    "morfologico_1t",
    "cervicometria_1t",
    "morfologico_2t",
    "cervicometria_2t",
    "morfologico_3t",
    "doppler_3t",
  ],
  ideal: [
    "morfologico_1t",
    "cervicometria_1t",
    "morfologico_2t",
    "cervicometria_2t",
    "morfologico_3t",
    "doppler_3t",
    "exame_3d",
  ],
  advanced: [
    "morfologico_1t",
    "cervicometria_1t",
    "morfologico_2t",
    "cervicometria_2t",
    "morfologico_3t",
    "doppler_3t",
    "exame_3d",
    "exame_3d_extra",
  ],
};
