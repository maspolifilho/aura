"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalculatorDisclaimer } from "@/components/calculators/calculator-disclaimer";
import {
  calculateBishopScore,
  interpretBishopScore,
  type CervicalConsistency,
  type CervicalPosition,
} from "@/lib/business/bishop-score";

const interpretationLabel = {
  favoravel: "Favorável",
  intermediario: "Intermediário",
  desfavoravel: "Desfavorável",
} as const;

const interpretationVariant = {
  favoravel: "default",
  intermediario: "secondary",
  desfavoravel: "destructive",
} as const;

export function BishopScoreCalculator() {
  const [dilationCm, setDilationCm] = useState("0");
  const [effacementPct, setEffacementPct] = useState("0");
  const [station, setStation] = useState("-3");
  const [consistency, setConsistency] =
    useState<CervicalConsistency>("firme");
  const [position, setPosition] = useState<CervicalPosition>("posterior");

  const score = useMemo(
    () =>
      calculateBishopScore({
        dilationCm: Number(dilationCm),
        effacementPct: Number(effacementPct),
        station: Number(station),
        consistency,
        position,
      }),
    [dilationCm, effacementPct, station, consistency, position],
  );
  const interpretation = interpretBishopScore(score);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="dilation">Dilatação (cm)</Label>
          <Input
            id="dilation"
            type="number"
            min={0}
            max={10}
            value={dilationCm}
            onChange={(e) => setDilationCm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="effacement">Esvaecimento (%)</Label>
          <Input
            id="effacement"
            type="number"
            min={0}
            max={100}
            value={effacementPct}
            onChange={(e) => setEffacementPct(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Altura da apresentação (De Lee)</Label>
          <Select value={station} onValueChange={setStation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[-3, -2, -1, 0, 1, 2, 3].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s > 0 ? `+${s}` : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Consistência do colo</Label>
          <Select
            value={consistency}
            onValueChange={(v) => setConsistency(v as CervicalConsistency)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="firme">Firme</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="amolecida">Amolecida</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Posição do colo</Label>
          <Select
            value={position}
            onValueChange={(v) => setPosition(v as CervicalPosition)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="posterior">Posterior</SelectItem>
              <SelectItem value="intermediaria">Intermediária</SelectItem>
              <SelectItem value="anterior">Anterior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
        <div>
          <p className="text-sm text-muted-foreground">Escore de Bishop</p>
          <p className="text-xl font-semibold text-foreground">
            {score} / 13
          </p>
        </div>
        <Badge variant={interpretationVariant[interpretation]}>
          {interpretationLabel[interpretation]}
        </Badge>
      </div>

      <CalculatorDisclaimer />
    </div>
  );
}
