import { describe, expect, it } from "vitest";
import {
  classifyPrePregnancyBMI,
  recommendedWeightGainRangeKg,
} from "@/lib/business/maternal-health";

describe("classifyPrePregnancyBMI", () => {
  it("classifica peso normal (IMC 18.5-24.9)", () => {
    const { bmi, category } = classifyPrePregnancyBMI(60, 165);
    expect(bmi).toBeCloseTo(22.04, 1);
    expect(category).toBe("peso_normal");
  });

  it("classifica baixo peso (IMC < 18.5)", () => {
    expect(classifyPrePregnancyBMI(45, 165).category).toBe("baixo_peso");
  });

  it("classifica sobrepeso (IMC 25-29.9)", () => {
    expect(classifyPrePregnancyBMI(75, 165).category).toBe("sobrepeso");
  });

  it("classifica obesidade (IMC >= 30)", () => {
    expect(classifyPrePregnancyBMI(90, 165).category).toBe("obesidade");
  });
});

describe("recommendedWeightGainRangeKg", () => {
  it("segue a tabela do Institute of Medicine (2009)", () => {
    expect(recommendedWeightGainRangeKg("baixo_peso")).toEqual({
      minKg: 12.5,
      maxKg: 18,
    });
    expect(recommendedWeightGainRangeKg("peso_normal")).toEqual({
      minKg: 11.5,
      maxKg: 16,
    });
    expect(recommendedWeightGainRangeKg("sobrepeso")).toEqual({
      minKg: 7,
      maxKg: 11.5,
    });
    expect(recommendedWeightGainRangeKg("obesidade")).toEqual({
      minKg: 5,
      maxKg: 9,
    });
  });
});
