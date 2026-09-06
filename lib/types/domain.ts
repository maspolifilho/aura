/**
 * Tipos do domínio clínico, escritos à mão por enquanto — quando o Supabase
 * existir, os tipos de tabela vêm de `supabase gen types` e estes tipos
 * de negócio passam a derivar deles (mesmos nomes/formas).
 */
import type { ProgramLevelCode } from "@/lib/data/program-levels";

export type ExamTypeCode =
  | "morfologico_1t"
  | "cervicometria_1t"
  | "morfologico_2t"
  | "cervicometria_2t"
  | "morfologico_3t"
  | "doppler_3t"
  | "exame_3d"
  | "exame_3d_extra";

export type ExamStatus = "pendente" | "realizado" | "perdido";

export interface GestationalAge {
  weeks: number;
  days: number;
}

export interface ExamTypeDefinition {
  code: ExamTypeCode;
  name: string;
  /** Início da janela ideal, em idade gestacional. */
  windowStart: GestationalAge;
  /** Fim da janela ideal, em idade gestacional. */
  windowEnd: GestationalAge;
  /** Morfológicos perdidos não são reembolsados (regra contratual). */
  isMorphological: boolean;
  /** Exame que compartilha a mesma janela (ex.: cervicometria/doppler). */
  linkedTo?: ExamTypeCode;
}

export interface ScheduledExam {
  examType: ExamTypeCode;
  isExtraAttempt: boolean;
  windowStart: Date;
  windowEnd: Date;
  /** Data prevista/sugerida — editável pela secretaria depois. */
  suggestedDate: Date;
  status: ExamStatus;
}

export { type ProgramLevelCode };
