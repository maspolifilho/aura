import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleTable } from "@/components/painel/schedule-table";
import { mockPatients } from "@/lib/data/mock-patients";
import { programLevels } from "@/lib/data/program-levels";

export default async function PatientDetailPage(
  props: PageProps<"/pacientes/[id]">,
) {
  const { id } = await props.params;
  const patient = mockPatients.find((p) => p.id === id);

  if (!patient) notFound();

  const level = programLevels.find((l) => l.code === patient.programLevel);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-foreground">
          {patient.fullName}
        </h1>
        <p className="text-sm text-muted-foreground">
          CPF {patient.cpf} · Obstetra:{" "}
          {patient.obstetricianName ?? "não informado"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Nível do programa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">
            {level?.name}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Data do cadastro
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">
            {patient.registrationDate.toLocaleDateString("pt-BR")}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-muted-foreground">
              DPP
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium">
            {patient.dueDate.toLocaleDateString("pt-BR")}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cronograma de exames</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScheduleTable schedule={patient.schedule} />
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Prévia somente leitura — edição de datas, marcação de status e
        reagendamento entram quando o Supabase estiver conectado.
      </p>
    </div>
  );
}
