"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFetalSizeForWeek } from "@/lib/data/fetal-size-by-week";

export function BabySizeCalculator({
  initialWeek = 20,
}: {
  initialWeek?: number;
}) {
  const [week, setWeek] = useState(String(initialWeek));
  const size = getFetalSizeForWeek(Number(week));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label>Semana de gestação</Label>
        <Select value={week} onValueChange={setWeek}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 33 }, (_, i) => i + 8).map((w) => (
              <SelectItem key={w} value={String(w)}>
                {w} semanas
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {size && (
        <div className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            Na {size.week}ª semana, seu bebê tem cerca do tamanho de
          </p>
          <p className="mt-1 font-heading text-2xl text-foreground">
            {size.comparison}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ≈ {size.lengthCm} cm
            {size.weightG ? ` · ≈ ${size.weightG} g` : ""}
          </p>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Valores médios de referência — o tamanho real do seu bebê é
        acompanhado nos exames de ultrassom.
      </p>
    </div>
  );
}
