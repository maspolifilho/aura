"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorDisclaimer } from "@/components/calculators/calculator-disclaimer";
import {
  classifyPrePregnancyBMI,
  recommendedWeightGainRangeKg,
  type BMICategory,
} from "@/lib/business/maternal-health";

const categoryLabel: Record<BMICategory, string> = {
  baixo_peso: "Baixo peso",
  peso_normal: "Peso normal",
  sobrepeso: "Sobrepeso",
  obesidade: "Obesidade",
};

export function BmiCalculator() {
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const result = useMemo(() => {
    const weight = Number(weightKg);
    const height = Number(heightCm);
    if (!weight || !height) return null;
    return classifyPrePregnancyBMI(weight, height);
  }, [weightKg, heightCm]);

  const gainRange = result
    ? recommendedWeightGainRangeKg(result.category)
    : null;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="weight">Peso antes da gestação (kg)</Label>
          <Input
            id="weight"
            type="number"
            min={0}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            min={0}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
          />
        </div>
      </div>

      {result && gainRange && (
        <div className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            IMC pré-gestacional: {result.bmi.toFixed(1)} —{" "}
            <span className="font-medium text-foreground">
              {categoryLabel[result.category]}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ganho de peso total recomendado na gestação:{" "}
            <span className="font-medium text-foreground">
              {gainRange.minKg} a {gainRange.maxKg} kg
            </span>
          </p>
        </div>
      )}

      <CalculatorDisclaimer />
    </div>
  );
}
