import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { examTypes } from "@/lib/data/exam-types";
import type { ExamStatus, ScheduledExam } from "@/lib/types/domain";

const statusLabel: Record<ExamStatus, string> = {
  pendente: "Pendente",
  realizado: "Realizado",
  perdido: "Perdido (fora da janela)",
};

const statusVariant: Record<
  ExamStatus,
  "secondary" | "default" | "destructive"
> = {
  pendente: "secondary",
  realizado: "default",
  perdido: "destructive",
};

export function ScheduleTable({ schedule }: { schedule: ScheduledExam[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Exame</TableHead>
          <TableHead>Janela ideal</TableHead>
          <TableHead>Data prevista</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedule.map((exam) => (
          <TableRow key={`${exam.examType}-${exam.isExtraAttempt}`}>
            <TableCell className="font-medium">
              {examTypes[exam.examType].name}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {exam.windowStart.toLocaleDateString("pt-BR")} –{" "}
              {exam.windowEnd.toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {exam.suggestedDate.toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[exam.status]}>
                {statusLabel[exam.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
