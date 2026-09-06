import { describe, expect, it } from "vitest";
import {
  meetsCancellationNoticeRule,
  validateReschedule,
} from "@/lib/business/reschedule-validator";

describe("validateReschedule", () => {
  it("aprova quando há 48h ou mais de antecedência", () => {
    const scheduled = new Date(2026, 0, 10, 12, 0);
    const requestedAt = new Date(2026, 0, 8, 12, 0); // exatas 48h antes
    const { meetsRule, hoursBefore } = validateReschedule(scheduled, requestedAt);
    expect(hoursBefore).toBe(48);
    expect(meetsRule).toBe(true);
  });

  it("reprova com menos de 48h, mas ainda assim retorna as horas calculadas", () => {
    const scheduled = new Date(2026, 0, 10, 12, 0);
    const requestedAt = new Date(2026, 0, 9, 12, 0); // 24h antes
    const { meetsRule, hoursBefore } = validateReschedule(scheduled, requestedAt);
    expect(hoursBefore).toBe(24);
    expect(meetsRule).toBe(false);
  });
});

describe("meetsCancellationNoticeRule", () => {
  it("aprova quando não há próximo exame agendado", () => {
    const result = meetsCancellationNoticeRule(null, new Date());
    expect(result.meetsRule).toBe(true);
    expect(result.hoursBefore).toBeNull();
  });

  it("exige 24h de antecedência do próximo exame", () => {
    const nextExam = new Date(2026, 0, 10, 12, 0);
    const requestedAt = new Date(2026, 0, 10, 0, 0); // 12h antes
    const result = meetsCancellationNoticeRule(nextExam, requestedAt);
    expect(result.hoursBefore).toBe(12);
    expect(result.meetsRule).toBe(false);
  });
});
