export type BMICategory =
  | "baixo_peso"
  | "peso_normal"
  | "sobrepeso"
  | "obesidade";

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function classifyPrePregnancyBMI(
  weightKg: number,
  heightCm: number,
): { bmi: number; category: BMICategory } {
  const bmi = calculateBMI(weightKg, heightCm);
  let category: BMICategory;
  if (bmi < 18.5) category = "baixo_peso";
  else if (bmi < 25) category = "peso_normal";
  else if (bmi < 30) category = "sobrepeso";
  else category = "obesidade";
  return { bmi, category };
}

/**
 * Faixa de ganho de peso total recomendado na gestação, pela tabela do
 * Institute of Medicine (2009) — referência padrão endossada pelo ACOG.
 */
export function recommendedWeightGainRangeKg(category: BMICategory): {
  minKg: number;
  maxKg: number;
} {
  switch (category) {
    case "baixo_peso":
      return { minKg: 12.5, maxKg: 18 };
    case "peso_normal":
      return { minKg: 11.5, maxKg: 16 };
    case "sobrepeso":
      return { minKg: 7, maxKg: 11.5 };
    case "obesidade":
      return { minKg: 5, maxKg: 9 };
  }
}
