import Link from "next/link";
import { CalendarClock, CheckCircle2, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUpcomingWindowAlerts } from "@/lib/business/window-alerts";
import { examTypes } from "@/lib/data/exam-types";
import { mockPatients } from "@/lib/data/mock-patients";
import { programLevels } from "@/lib/data/program-levels";

// Prévia: sempre mostra a primeira paciente de exemplo como "logada".
// TODO(milestone-2): trocar por lib/auth/patient-guard.ts + sessão real.
export default function PortalDashboardPage() {
  const patient = mockPatients[0];
  const level = programLevels.find((l) => l.code === patient.programLevel);
  const today = new Date();

  const realizados = patient.schedule.filter((e) => e.status === "realizado");
  const pendentes = patient.schedule.filter((e) => e.status === "pendente");
  const alerts = getUpcomingWindowAlerts(patient.schedule, today);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-muted-foreground">Olá,</p>
        <h1 className="font-heading text-3xl text-foreground">
          {patient.fullName.split(" ")[0]}
        </h1>
        <Badge variant="secondary" className="mt-2">
          Programa {level?.name}
        </Badge>
      </div>

      {alerts.length > 0 && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex flex-col gap-2 pt-6">
            {alerts.map((alert) => (
              <p
                key={alert.examType}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <CalendarClock className="h-4 w-4 text-primary" />
                {examTypes[alert.examType].name} — janela fecha em{" "}
                {alert.daysRemaining}{" "}
                {alert.daysRemaining === 1 ? "dia" : "dias"}
                {alert.severity === "critical" && (
                  <span className="text-destructive">
                    (sem reembolso se perder)
                  </span>
                )}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 font-heading text-lg text-foreground">
          Exames realizados
        </h2>
        {realizados.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum exame realizado ainda.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {realizados.map((exam) => (
              <Card key={exam.examType}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">
                        {examTypes[exam.examType].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Realizado em{" "}
                        {exam.performedDate?.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  {exam.recordingUrl && (
                    <Link
                      href={exam.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Ver gravação
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 font-heading text-lg text-foreground">
          Próximos exames
        </h2>
        <div className="flex flex-col gap-3">
          {pendentes.map((exam) => (
            <Card key={exam.examType}>
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-base font-medium">
                  {examTypes[exam.examType].name}
                </CardTitle>
                <Badge variant="outline">
                  Previsto para{" "}
                  {exam.suggestedDate.toLocaleDateString("pt-BR")}
                </Badge>
              </CardHeader>
              <CardContent className="pt-2 text-sm text-muted-foreground">
                Janela ideal: {exam.windowStart.toLocaleDateString("pt-BR")} a{" "}
                {exam.windowEnd.toLocaleDateString("pt-BR")}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
