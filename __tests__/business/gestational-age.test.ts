import { describe, expect, it } from "vitest";
import {
  dueDateFromCRL,
  dueDateFromKnownGA,
  dueDateFromLMP,
  gestationalAgeFromCRL,
  gestationalAgeOnDate,
} from "@/lib/business/gestational-age";
import { addDays } from "@/lib/business/date-utils";

describe("dueDateFromLMP", () => {
  it("soma 280 dias à DUM", () => {
    const lmp = new Date(2026, 0, 1);
    expect(dueDateFromLMP(lmp)).toEqual(addDays(lmp, 280));
  });
});

describe("gestationalAgeFromCRL", () => {
  it("cresce com o CRL (quanto maior o embrião, maior a IG)", () => {
    const early = gestationalAgeFromCRL(10);
    const late = gestationalAgeFromCRL(60);
    const earlyDays = early.weeks * 7 + early.days;
    const lateDays = late.weeks * 7 + late.days;
    expect(lateDays).toBeGreaterThan(earlyDays);
  });

  it("fica dentro da faixa esperada de 1º trimestre para CRL típico", () => {
    // CRL de 45mm é um valor típico de datação de 1º trimestre.
    const ga = gestationalAgeFromCRL(45);
    expect(ga.weeks).toBeGreaterThanOrEqual(10);
    expect(ga.weeks).toBeLessThanOrEqual(12);
  });
});

describe("dueDateFromCRL e gestationalAgeFromCRL são consistentes", () => {
  it("a DPP derivada do CRL implica a mesma IG na data do exame", () => {
    const examDate = new Date(2026, 5, 1);
    const crlMm = 40;
    const dueDate = dueDateFromCRL(crlMm, examDate);
    const gaOnExamDate = gestationalAgeOnDate(dueDate, examDate);
    const expectedGa = gestationalAgeFromCRL(crlMm);
    expect(gaOnExamDate.weeks * 7 + gaOnExamDate.days).toBe(
      expectedGa.weeks * 7 + expectedGa.days,
    );
  });
});

describe("dueDateFromKnownGA + gestationalAgeOnDate", () => {
  it("fazem roundtrip: a IG calculada na data de referência bate com a informada", () => {
    const referenceDate = new Date(2026, 3, 10);
    const informedGa = { weeks: 24, days: 3 };
    const dueDate = dueDateFromKnownGA(referenceDate, informedGa);
    const recomputed = gestationalAgeOnDate(dueDate, referenceDate);
    expect(recomputed).toEqual(informedGa);
  });
});
