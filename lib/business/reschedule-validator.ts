import { diffInHours } from "@/lib/business/date-utils";

/** Reagendamento de exames exige no mínimo 48h de antecedência (contrato). */
const MIN_HOURS_BEFORE = 48;

export function validateReschedule(
  previousScheduledDate: Date,
  requestedAt: Date,
): { meetsRule: boolean; hoursBefore: number } {
  const hoursBefore = diffInHours(previousScheduledDate, requestedAt);
  return { meetsRule: hoursBefore >= MIN_HOURS_BEFORE, hoursBefore };
}

/** Desistência exige no mínimo 24h de antecedência do próximo exame agendado. */
const MIN_HOURS_BEFORE_CANCELLATION = 24;

export function meetsCancellationNoticeRule(
  nextScheduledExamDate: Date | null,
  requestedAt: Date,
): { meetsRule: boolean; hoursBefore: number | null } {
  if (!nextScheduledExamDate) {
    return { meetsRule: true, hoursBefore: null };
  }
  const hoursBefore = diffInHours(nextScheduledExamDate, requestedAt);
  return { meetsRule: hoursBefore >= MIN_HOURS_BEFORE_CANCELLATION, hoursBefore };
}
