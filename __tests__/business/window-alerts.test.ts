import { describe, expect, it } from "vitest";
import { getUpcomingWindowAlerts } from "@/lib/business/window-alerts";
import {
  estimatedPregnancyStart,
  generateScheduleForPatient,
} from "@/lib/business/exam-schedule";

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const DUE_DATE = new Date(2026, 11, 1);

describe("getUpcomingWindowAlerts", () => {
  it("alerta com severidade crítica quando um morfológico está perto de fechar", () => {
    const pregnancyStart = estimatedPregnancyStart(DUE_DATE);
    const registrationDate = pregnancyStart;
    const schedule = generateScheduleForPatient(
      "basic",
      DUE_DATE,
      registrationDate,
    );

    // 3 dias antes do fim da janela do morfológico de 1º tri (13s6d).
    const today = addDays(pregnancyStart, 13 * 7 + 3);
    const alerts = getUpcomingWindowAlerts(schedule, today);

    const morfoAlert = alerts.find((a) => a.examType === "morfologico_1t");
    expect(morfoAlert).toBeDefined();
    expect(morfoAlert!.severity).toBe("critical");
    expect(morfoAlert!.daysRemaining).toBe(3);
  });

  it("não alerta exames cuja janela ainda está longe de fechar", () => {
    const pregnancyStart = estimatedPregnancyStart(DUE_DATE);
    const schedule = generateScheduleForPatient(
      "basic",
      DUE_DATE,
      pregnancyStart,
    );
    const today = pregnancyStart; // início da gestação, tudo longe
    const alerts = getUpcomingWindowAlerts(schedule, today);
    expect(alerts).toHaveLength(0);
  });
});
