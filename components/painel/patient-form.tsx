"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleTable } from "@/components/painel/schedule-table";
import { GestationalAgeCalculator } from "@/components/calculators/gestational-age-calculator";
import {
  estimatedPregnancyStart,
  generateScheduleForPatient,
} from "@/lib/business/exam-schedule";
import { diffInDays } from "@/lib/business/date-utils";
import { programLevels, type ProgramLevelCode } from "@/lib/data/program-levels";

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function PatientForm() {
  const today = useMemo(() => new Date(), []);
  const [programLevel, setProgramLevel] = useState<ProgramLevelCode | "">("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [registrationDateInput, setRegistrationDateInput] = useState(
    toDateInputValue(today),
  );
  const [gaWeeks, setGaWeeks] = useState("");
  const [gaDays, setGaDays] = useState("0");
  const [showGaCalculator, setShowGaCalculator] = useState(false);

  const dueDate = parseDateInput(dueDateInput);
  const registrationDate = parseDateInput(registrationDateInput);

  const schedule =
    programLevel && dueDate && registrationDate
      ? generateScheduleForPatient(programLevel, dueDate, registrationDate)
      : null;

  const gaMismatchDays = useMemo(() => {
    if (!dueDate || !registrationDate || gaWeeks === "") return null;
    const pregnancyStart = estimatedPregnancyStart(dueDate);
    const impliedDays = diffInDays(registrationDate, pregnancyStart);
    const informedDays = Number(gaWeeks) * 7 + Number(gaDays || 0);
    return Math.round(impliedDays - informedDays);
  }, [dueDate, registrationDate, gaWeeks, gaDays]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    toast.info(
      "Cronograma gerado! O cadastro só será salvo de fato quando o Supabase estiver conectado.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados da paciente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" name="cpf" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="obstetricianName">Obstetra de origem</Label>
            <Input id="obstetricianName" name="obstetricianName" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Nível do programa</Label>
            <Select
              value={programLevel}
              onValueChange={(value) =>
                setProgramLevel(value as ProgramLevelCode)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {programLevels.map((level) => (
                  <SelectItem key={level.code} value={level.code}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dueDate">DPP (data provável do parto)</Label>
              <button
                type="button"
                onClick={() => setShowGaCalculator((v) => !v)}
                className="text-xs text-primary hover:underline"
              >
                {showGaCalculator ? "Fechar calculadora" : "Calcular pela DUM/CCN"}
              </button>
            </div>
            <Input
              id="dueDate"
              type="date"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="registrationDate">Data do cadastro</Label>
            <Input
              id="registrationDate"
              type="date"
              value={registrationDateInput}
              onChange={(e) => setRegistrationDateInput(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="gaWeeks">
              Idade gestacional no cadastro — semanas
            </Label>
            <Input
              id="gaWeeks"
              type="number"
              min={0}
              max={42}
              value={gaWeeks}
              onChange={(e) => setGaWeeks(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="gaDays">Dias</Label>
            <Input
              id="gaDays"
              type="number"
              min={0}
              max={6}
              value={gaDays}
              onChange={(e) => setGaDays(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {showGaCalculator && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Calcular DPP</CardTitle>
          </CardHeader>
          <CardContent>
            <GestationalAgeCalculator
              onApplyDueDate={(date) => {
                setDueDateInput(toDateInputValue(date));
                setShowGaCalculator(false);
              }}
            />
          </CardContent>
        </Card>
      )}

      {gaMismatchDays !== null && Math.abs(gaMismatchDays) > 7 && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            A idade gestacional informada não bate com a DPP (diferença de
            cerca de {Math.abs(gaMismatchDays)} dias). Confira os dois
            valores antes de salvar.
          </span>
        </div>
      )}

      {schedule && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Cronograma gerado automaticamente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScheduleTable schedule={schedule} />
          </CardContent>
        </Card>
      )}

      <Button type="submit" size="lg" className="self-start">
        Salvar cadastro
      </Button>
    </form>
  );
}
