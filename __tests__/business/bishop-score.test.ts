import { describe, expect, it } from "vitest";
import {
  calculateBishopScore,
  interpretBishopScore,
} from "@/lib/business/bishop-score";

describe("calculateBishopScore", () => {
  it("dá o score máximo (13) para o colo mais favorável possível", () => {
    const score = calculateBishopScore({
      dilationCm: 6,
      effacementPct: 90,
      station: 2,
      consistency: "amolecida",
      position: "anterior",
    });
    expect(score).toBe(13);
  });

  it("dá o score mínimo (0) para o colo mais desfavorável possível", () => {
    const score = calculateBishopScore({
      dilationCm: 0,
      effacementPct: 0,
      station: -3,
      consistency: "firme",
      position: "posterior",
    });
    expect(score).toBe(0);
  });
});

describe("interpretBishopScore", () => {
  it("classifica >= 8 como favorável", () => {
    expect(interpretBishopScore(8)).toBe("favoravel");
    expect(interpretBishopScore(13)).toBe("favoravel");
  });

  it("classifica 6-7 como intermediário", () => {
    expect(interpretBishopScore(6)).toBe("intermediario");
    expect(interpretBishopScore(7)).toBe("intermediario");
  });

  it("classifica < 6 como desfavorável", () => {
    expect(interpretBishopScore(5)).toBe("desfavoravel");
    expect(interpretBishopScore(0)).toBe("desfavoravel");
  });
});
