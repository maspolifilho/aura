import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPatients } from "@/lib/data/mock-patients";
import { programLevels } from "@/lib/data/program-levels";

export default function PacientesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-foreground">Pacientes</h1>
          <p className="text-sm text-muted-foreground">
            Cadastro e cronograma de exames do programa.
          </p>
        </div>
        <Button asChild>
          <Link href="/pacientes/novo">Nova paciente</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Obstetra</TableHead>
              <TableHead>DPP</TableHead>
              <TableHead className="text-right">Exames pendentes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPatients.map((patient) => {
              const level = programLevels.find(
                (l) => l.code === patient.programLevel,
              );
              const pendentes = patient.schedule.filter(
                (e) => e.status === "pendente",
              ).length;

              return (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Link
                      href={`/pacientes/${patient.id}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {patient.fullName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {patient.cpf}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{level?.name}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.obstetricianName ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.dueDate.toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">{pendentes}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
