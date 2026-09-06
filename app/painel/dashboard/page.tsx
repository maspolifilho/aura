import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUpcomingWindowAlerts } from "@/lib/business/window-alerts";
import { examTypes } from "@/lib/data/exam-types";
import { formatPriceCents, programLevels } from "@/lib/data/program-levels";
import { mockPatients } from "@/lib/data/mock-patients";

export default function DashboardPage() {
  const today = new Date();

  const patientsByLevel = programLevels.map((level) => ({
    level,
    count: mockPatients.filter((p) => p.programLevel === level.code).length,
  }));

  const faturamentoTotalCents = mockPatients.reduce((sum, patient) => {
    const level = programLevels.find((l) => l.code === patient.programLevel);
    return sum + (level?.priceCents ?? 0);
  }, 0);

  const alerts = mockPatients.flatMap((patient) =>
    getUpcomingWindowAlerts(patient.schedule, today).map((alert) => ({
      ...alert,
      patientName: patient.fullName,
    })),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral do programa — dados de exemplo até o banco estar
          conectado.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Pacientes ativas
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">
            {mockPatients.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Faturamento (programas ativos)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold whitespace-nowrap">
            {formatPriceCents(faturamentoTotalCents)}
          </CardContent>
        </Card>
        {patientsByLevel.map(({ level, count }) => (
          <Card key={level.code}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                Nível {level.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold">
              {count}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Janelas próximas de fechar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma janela de exame perto de fechar nos próximos 7 dias.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {alerts.map((alert, index) => (
                <li
                  key={`${alert.patientName}-${alert.examType}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {alert.patientName}
                    </p>
                    <p className="text-muted-foreground">
                      {examTypes[alert.examType].name} — janela fecha em{" "}
                      {alert.daysRemaining}{" "}
                      {alert.daysRemaining === 1 ? "dia" : "dias"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "critical" ? "destructive" : "secondary"
                    }
                  >
                    {alert.severity === "critical"
                      ? "Sem reembolso se perder"
                      : "Atenção"}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
