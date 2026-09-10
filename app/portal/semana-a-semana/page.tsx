import { Card, CardContent } from "@/components/ui/card";
import { BabySizeCalculator } from "@/components/calculators/baby-size-calculator";
import { gestationalAgeOnDate } from "@/lib/business/gestational-age";
import { mockPatients } from "@/lib/data/mock-patients";

// Prévia: sempre mostra a primeira paciente de exemplo como "logada".
// TODO(milestone-2): trocar por lib/auth/patient-guard.ts + sessão real.
export default function SemanaASemanaPage() {
  const patient = mockPatients[0];
  const ga = gestationalAgeOnDate(patient.dueDate, new Date());

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Você está com {ga.weeks} semanas e {ga.days} dias
        </p>
        <h1 className="font-heading text-2xl text-foreground">
          Semana a semana
        </h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <BabySizeCalculator initialWeek={ga.weeks} />
        </CardContent>
      </Card>
    </div>
  );
}
