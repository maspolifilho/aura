import { addDays } from "@/lib/business/date-utils";
import type { GestationalAge } from "@/lib/types/domain";

const DAYS_PER_WEEK = 7;
const GESTATION_LENGTH_DAYS = 40 * DAYS_PER_WEEK;

/** DPP pela regra padrão (ACOG/Naegele): DUM + 280 dias. */
export function dueDateFromLMP(lmpDate: Date): Date {
  return addDays(lmpDate, GESTATION_LENGTH_DAYS);
}

/**
 * Idade gestacional pelo comprimento cabeça-nádegas (CCN/CRL), fórmula de
 * Robinson & Fleming (1975) — datação padrão de 1º trimestre, a mais usada
 * mundialmente (ACOG, ISUOG): GA(dias) = 8.052·√CRL·1.037 + 23.73, CRL em mm.
 */
export function gestationalAgeFromCRL(crlMm: number): GestationalAge {
  const totalDays = Math.round(
    8.052 * Math.sqrt(crlMm) * 1.037 + 23.73,
  );
  return {
    weeks: Math.floor(totalDays / DAYS_PER_WEEK),
    days: totalDays % DAYS_PER_WEEK,
  };
}

/** DPP a partir de uma medida de CCN feita em `examDate`. */
export function dueDateFromCRL(crlMm: number, examDate: Date): Date {
  const ga = gestationalAgeFromCRL(crlMm);
  const gaDays = ga.weeks * DAYS_PER_WEEK + ga.days;
  return addDays(examDate, GESTATION_LENGTH_DAYS - gaDays);
}

/** DPP a partir de uma idade gestacional conhecida numa certa data. */
export function dueDateFromKnownGA(
  referenceDate: Date,
  ga: GestationalAge,
): Date {
  const gaDays = ga.weeks * DAYS_PER_WEEK + ga.days;
  return addDays(referenceDate, GESTATION_LENGTH_DAYS - gaDays);
}

/** Idade gestacional em `targetDate`, dada a DPP. */
export function gestationalAgeOnDate(
  dueDate: Date,
  targetDate: Date,
): GestationalAge {
  const pregnancyStart = addDays(dueDate, -GESTATION_LENGTH_DAYS);
  const totalDays = Math.floor(
    (targetDate.getTime() - pregnancyStart.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return {
    weeks: Math.floor(totalDays / DAYS_PER_WEEK),
    days: totalDays % DAYS_PER_WEEK,
  };
}
