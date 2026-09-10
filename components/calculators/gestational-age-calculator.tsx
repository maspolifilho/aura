"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalculatorDisclaimer } from "@/components/calculators/calculator-disclaimer";
import {
  dueDateFromCRL,
  dueDateFromLMP,
  gestationalAgeOnDate,
} from "@/lib/business/gestational-age";

type Method = "dum" | "ccn" | "dpp_conhecida";

function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function GestationalAgeCalculator({
  onApplyDueDate,
}: {
  onApplyDueDate?: (dueDate: Date) => void;
}) {
  const [method, setMethod] = useState<Method>("dum");
  const [lmpInput, setLmpInput] = useState("");
  const [crlInput, setCrlInput] = useState("");
  const [examDateInput, setExamDateInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");

  const result = useMemo(() => {
    const today = new Date();
    let dueDate: Date | null = null;

    if (method === "dum") {
      const lmp = parseDateInput(lmpInput);
      if (lmp) dueDate = dueDateFromLMP(lmp);
    } else if (method === "ccn") {
      const examDate = parseDateInput(examDateInput);
      const crl = Number(crlInput);
      if (examDate && crl > 0) dueDate = dueDateFromCRL(crl, examDate);
    } else {
      dueDate = parseDateInput(dueDateInput);
    }

    if (!dueDate) return null;
    const ga = gestationalAgeOnDate(dueDate, today);
    return { dueDate, ga };
  }, [method, lmpInput, crlInput, examDateInput, dueDateInput]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label>Como você quer calcular?</Label>
        <Select value={method} onValueChange={(v) => setMethod(v as Method)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dum">
              Pela data da última menstruação (DUM)
            </SelectItem>
            <SelectItem value="ccn">
              Pelo comprimento cabeça-nádegas (CCN) do 1º trimestre
            </SelectItem>
            <SelectItem value="dpp_conhecida">
              Já sei a data provável do parto (DPP)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === "dum" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="lmp">Data da última menstruação</Label>
          <Input
            id="lmp"
            type="date"
            value={lmpInput}
            onChange={(e) => setLmpInput(e.target.value)}
          />
        </div>
      )}

      {method === "ccn" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="crl">CCN (mm)</Label>
            <Input
              id="crl"
              type="number"
              min={0}
              value={crlInput}
              onChange={(e) => setCrlInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="examDate">Data do exame</Label>
            <Input
              id="examDate"
              type="date"
              value={examDateInput}
              onChange={(e) => setExamDateInput(e.target.value)}
            />
          </div>
        </div>
      )}

      {method === "dpp_conhecida" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="dueDate">Data provável do parto</Label>
          <Input
            id="dueDate"
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
          />
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-border/60 bg-secondary/30 px-4 py-3">
          <p className="text-sm text-muted-foreground">Idade gestacional hoje</p>
          <p className="text-xl font-semibold text-foreground">
            {result.ga.weeks} semanas e {result.ga.days} dias
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Data provável do parto:{" "}
            <span className="font-medium text-foreground">
              {result.dueDate.toLocaleDateString("pt-BR")}
            </span>
          </p>
          {onApplyDueDate && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="mt-3"
              onClick={() => onApplyDueDate(result.dueDate)}
            >
              Usar esta DPP no cadastro
            </Button>
          )}
        </div>
      )}

      <CalculatorDisclaimer />
    </div>
  );
}
