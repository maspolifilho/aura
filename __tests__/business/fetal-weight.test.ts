import { describe, expect, it } from "vitest";
import { estimateFetalWeightHadlock } from "@/lib/business/fetal-weight";

describe("estimateFetalWeightHadlock", () => {
  it("estima um peso clinicamente plausível para biometria de termo (~39 sem.)", () => {
    const weight = estimateFetalWeightHadlock({
      bpdMm: 92,
      hcMm: 330,
      acMm: 340,
      flMm: 73,
    });
    expect(weight).toBeGreaterThan(2800);
    expect(weight).toBeLessThan(4200);
  });

  it("estima um peso clinicamente plausível para biometria de 2º trimestre (~20 sem.)", () => {
    const weight = estimateFetalWeightHadlock({
      bpdMm: 47,
      hcMm: 175,
      acMm: 150,
      flMm: 32,
    });
    expect(weight).toBeGreaterThan(250);
    expect(weight).toBeLessThan(450);
  });

  it("aumenta o peso estimado quando a circunferência abdominal aumenta (mantendo o resto)", () => {
    const base = { bpdMm: 80, hcMm: 280, acMm: 260, flMm: 60 };
    const smaller = estimateFetalWeightHadlock(base);
    const larger = estimateFetalWeightHadlock({ ...base, acMm: 300 });
    expect(larger).toBeGreaterThan(smaller);
  });
});
