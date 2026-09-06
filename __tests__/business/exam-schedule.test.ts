import { describe, expect, it } from "vitest";
import {
  computeExamWindow,
  estimatedPregnancyStart,
  generateScheduleForPatient,
  recalculateExtraAttemptWindow,
} from "@/lib/business/exam-schedule";
import { examTypes } from "@/lib/data/exam-types";

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const DUE_DATE = new Date(2026, 11, 1); // 1º de dezembro de 2026

describe("estimatedPregnancyStart", () => {
  it("volta 40 semanas (280 dias) a partir da DPP", () => {
    const start = estimatedPregnancyStart(DUE_DATE);
    expect(start).toEqual(addDays(DUE_DATE, -280));
  });
});

describe("computeExamWindow", () => {
  it("calcula a janela do morfológico de 1º trimestre (12 a 13s6d)", () => {
    const pregnancyStart = estimatedPregnancyStart(DUE_DATE);
    const { windowStart, windowEnd } = computeExamWindow(
      examTypes.morfologico_1t,
      pregnancyStart,
    );
    expect(windowStart).toEqual(addDays(pregnancyStart, 12 * 7));
    expect(windowEnd).toEqual(addDays(pregnancyStart, 13 * 7 + 6));
  });
});

describe("generateScheduleForPatient", () => {
  const registrationDate = estimatedPregnancyStart(DUE_DATE); // cadastro no início da gestação

  it("Basic: 6 exames, todos pendentes num cadastro precoce", () => {
    const schedule = generateScheduleForPatient(
      "basic",
      DUE_DATE,
      registrationDate,
    );
    expect(schedule).toHaveLength(6);
    expect(schedule.map((e) => e.examType)).toEqual([
      "morfologico_1t",
      "cervicometria_1t",
      "morfologico_2t",
      "cervicometria_2t",
      "morfologico_3t",
      "doppler_3t",
    ]);
    expect(schedule.every((e) => e.status === "pendente")).toBe(true);
  });

  it("Ideal: inclui o exame 3D além do Basic", () => {
    const schedule = generateScheduleForPatient(
      "ideal",
      DUE_DATE,
      registrationDate,
    );
    expect(schedule).toHaveLength(7);
    expect(schedule.at(-1)?.examType).toBe("exame_3d");
  });

  it("Advanced: inclui a tentativa adicional de 3D, marcada como extra", () => {
    const schedule = generateScheduleForPatient(
      "advanced",
      DUE_DATE,
      registrationDate,
    );
    expect(schedule).toHaveLength(8);
    const extra = schedule.at(-1)!;
    expect(extra.examType).toBe("exame_3d_extra");
    expect(extra.isExtraAttempt).toBe(true);
  });

  it("cervicometria e doppler compartilham a janela do morfológico correspondente", () => {
    const schedule = generateScheduleForPatient(
      "basic",
      DUE_DATE,
      registrationDate,
    );
    const morfo1 = schedule.find((e) => e.examType === "morfologico_1t")!;
    const cervico1 = schedule.find((e) => e.examType === "cervicometria_1t")!;
    expect(cervico1.windowStart).toEqual(morfo1.windowStart);
    expect(cervico1.windowEnd).toEqual(morfo1.windowEnd);

    const morfo3 = schedule.find((e) => e.examType === "morfologico_3t")!;
    const doppler3 = schedule.find((e) => e.examType === "doppler_3t")!;
    expect(doppler3.windowStart).toEqual(morfo3.windowStart);
    expect(doppler3.windowEnd).toEqual(morfo3.windowEnd);
  });

  it("cadastro tardio: marca como perdido um exame cuja janela já fechou", () => {
    const pregnancyStart = estimatedPregnancyStart(DUE_DATE);
    // Cadastro feito às 20 semanas: a janela do morfológico de 1º tri
    // (12-13s6d) já fechou, mas a do 2º tri (22-24s) ainda não.
    const lateRegistration = addDays(pregnancyStart, 20 * 7);

    const schedule = generateScheduleForPatient(
      "basic",
      DUE_DATE,
      lateRegistration,
    );

    const morfo1 = schedule.find((e) => e.examType === "morfologico_1t")!;
    const morfo2 = schedule.find((e) => e.examType === "morfologico_2t")!;
    expect(morfo1.status).toBe("perdido");
    expect(morfo2.status).toBe("pendente");
  });
});

describe("recalculateExtraAttemptWindow", () => {
  const pregnancyStart = estimatedPregnancyStart(DUE_DATE);

  it("mantém a janela padrão quando a 1ª tentativa é cedo o suficiente", () => {
    const firstAttempt = addDays(pregnancyStart, 31 * 7); // 31 semanas
    const { windowEnd } = recalculateExtraAttemptWindow(
      pregnancyStart,
      firstAttempt,
    );
    const baseWindowEnd = addDays(pregnancyStart, 34 * 7);
    expect(windowEnd).toEqual(baseWindowEnd);
  });

  it("estende 1 semana além da 1ª tentativa quando ela é tardia", () => {
    const firstAttempt = addDays(pregnancyStart, 34 * 7); // no limite da janela
    const { windowEnd } = recalculateExtraAttemptWindow(
      pregnancyStart,
      firstAttempt,
    );
    expect(windowEnd).toEqual(addDays(firstAttempt, 7));
  });
});
