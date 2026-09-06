import { examTypes, programExamsByLevel } from "@/lib/data/exam-types";
import type {
  ExamTypeDefinition,
  GestationalAge,
  ProgramLevelCode,
  ScheduledExam,
} from "@/lib/types/domain";

const DAYS_PER_WEEK = 7;
/** Convenção obstétrica: DPP = início da gestação + 40 semanas. */
const GESTATION_LENGTH_DAYS = 40 * DAYS_PER_WEEK;

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function gestationalAgeToDays(ga: GestationalAge): number {
  return ga.weeks * DAYS_PER_WEEK + ga.days;
}

/**
 * Data estimada do início da gestação, derivada da DPP.
 *
 * O cadastro também registra a idade gestacional na data do cadastro, mas
 * usamos a DPP como referência única do cronograma para não ter dois
 * relógios que podem divergir — a IG no cadastro serve para validar/perceber
 * discrepância, não para recalcular as janelas.
 */
export function estimatedPregnancyStart(dueDate: Date): Date {
  return addDays(dueDate, -GESTATION_LENGTH_DAYS);
}

export function computeExamWindow(
  definition: ExamTypeDefinition,
  pregnancyStart: Date,
): { windowStart: Date; windowEnd: Date } {
  return {
    windowStart: addDays(
      pregnancyStart,
      gestationalAgeToDays(definition.windowStart),
    ),
    windowEnd: addDays(
      pregnancyStart,
      gestationalAgeToDays(definition.windowEnd),
    ),
  };
}

/**
 * Gera o cronograma completo de exames do nível contratado a partir da DPP.
 *
 * `today` (por padrão, a data do cadastro) decide se um exame cuja janela já
 * fechou nasce como "perdido" em vez de "pendente" — ex.: cadastro tardio.
 */
export function generateScheduleForPatient(
  level: ProgramLevelCode,
  dueDate: Date,
  registrationDate: Date,
  today: Date = registrationDate,
): ScheduledExam[] {
  const pregnancyStart = estimatedPregnancyStart(dueDate);
  const examCodes = programExamsByLevel[level];

  return examCodes.map((code) => {
    const definition = examTypes[code];
    const windowDefinition = definition.linkedTo
      ? examTypes[definition.linkedTo]
      : definition;
    const { windowStart, windowEnd } = computeExamWindow(
      windowDefinition,
      pregnancyStart,
    );

    return {
      examType: code,
      isExtraAttempt: code === "exame_3d_extra",
      windowStart,
      windowEnd,
      suggestedDate: windowStart,
      status: windowEnd < today ? "perdido" : "pendente",
    };
  });
}

/**
 * Recalcula a janela válida da tentativa adicional de 3D (Advanced) depois
 * que a 1ª tentativa é realizada: vale a janela padrão (30-34 sem.) OU até 1
 * semana após a data da 1ª tentativa — o que for mais tarde.
 */
export function recalculateExtraAttemptWindow(
  pregnancyStart: Date,
  firstAttemptPerformedDate: Date,
): { windowStart: Date; windowEnd: Date } {
  const base = computeExamWindow(examTypes.exame_3d, pregnancyStart);
  const oneWeekAfterFirstAttempt = addDays(
    firstAttemptPerformedDate,
    DAYS_PER_WEEK,
  );

  return {
    windowStart: base.windowStart,
    windowEnd:
      oneWeekAfterFirstAttempt > base.windowEnd
        ? oneWeekAfterFirstAttempt
        : base.windowEnd,
  };
}
