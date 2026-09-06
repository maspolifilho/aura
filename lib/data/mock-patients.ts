/**
 * Pacientes de exemplo para a prévia do painel, enquanto o Supabase não
 * existe. Substituir por consultas reais na Milestone 2.
 */
import { generateScheduleForPatient } from "@/lib/business/exam-schedule";
import type { ProgramLevelCode } from "@/lib/data/program-levels";
import type { ScheduledExam } from "@/lib/types/domain";

export interface MockPatient {
  id: string;
  fullName: string;
  cpf: string;
  programLevel: ProgramLevelCode;
  obstetricianName: string | null;
  registrationDate: Date;
  dueDate: Date;
  schedule: ScheduledExam[];
}

function makePatient(
  id: string,
  fullName: string,
  cpf: string,
  programLevel: ProgramLevelCode,
  obstetricianName: string | null,
  registrationDate: Date,
  dueDate: Date,
): MockPatient {
  return {
    id,
    fullName,
    cpf,
    programLevel,
    obstetricianName,
    registrationDate,
    dueDate,
    schedule: generateScheduleForPatient(programLevel, dueDate, registrationDate),
  };
}

export const mockPatients: MockPatient[] = [
  makePatient(
    "1",
    "Camila Souza Andrade",
    "123.456.789-00",
    "advanced",
    "Dr. Ricardo Nunes",
    new Date(2026, 7, 1),
    new Date(2027, 2, 15),
  ),
  makePatient(
    "2",
    "Fernanda Lima Costa",
    "987.654.321-00",
    "ideal",
    "Dra. Paula Menezes",
    new Date(2026, 8, 10),
    new Date(2027, 3, 2),
  ),
  makePatient(
    "3",
    "Juliana Ramos Prado",
    "456.789.123-00",
    "basic",
    null,
    new Date(2026, 6, 20),
    new Date(2027, 1, 8),
  ),
];
