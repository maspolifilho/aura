"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalculatorDisclaimer } from "@/components/calculators/calculator-disclaimer";
import { estimateFetalWeightHadlock } from "@/lib/business/fetal-weight";

export function FetalWeightCalculator() {
  const [bpd, setBpd] = useState("");
  const [hc, setHc] = useState("");
  const [ac, setAc] = useState("");
  const [fl, setFl] = useState("");

  const weight = useMemo(() => {
    const bpdMm = Number(bpd);
    const hcMm = Number(hc);
    const acMm = Number(ac);
    const flMm = Number(fl);
    if (!bpdMm || !hcMm || !acMm || !flMm) return null;
    return estimateFetalWeightHadlock({ bpdMm, hcMm, acMm, flMm });
  }, [bpd, hc, ac, fl]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="bpd">DBP (mm)</Label>
          <Input id="bpd" type="number" min={0} value={bpd} onChange={(e) => setBpd(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="hc">CC (mm)</Label>
          <Input id="hc" type="number" min={0} value={hc} onChange={(e) => setHc(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ac">CA (mm)</Label>
          <Input id="ac" type="number" min={0} value={ac} onChange={(e) => setAc(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fl">CF (mm)</Label>
          <Input id="fl" type="number" min={0} value={fl} onChange={(e) => setFl(e.target.value)} />
        </div>
      </div>

      {weight !== null && (
        <div className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Peso fetal estimado (Hadlock)
          </p>
          <p className="text-xl font-semibold text-foreground">
            {weight.toLocaleString("pt-BR")} g
          </p>
        </div>
      )}

      <CalculatorDisclaimer />
    </div>
  );
}
