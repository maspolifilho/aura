import { examTypes } from "@/lib/data/exam-types";
import { diffInDays } from "@/lib/business/date-utils";
import type { ScheduledExam } from "@/lib/types/domain";

export interface WindowAlert {
  examType: ScheduledExam["examType"];
  windowEnd: Date;
  daysRemaining: number;
  /** Morfológicos perdidos não são reembolsados — alerta mais grave. */
  severity: "critical" | "info";
}

export function getUpcomingWindowAlerts(
  schedule: ScheduledExam[],
  today: Date,
  thresholdDays = 7,
): WindowAlert[] {
  return schedule
    .filter((exam) => exam.status === "pendente")
    .map((exam) => ({
      exam,
      daysRemaining: Math.ceil(diffInDays(exam.windowEnd, today)),
    }))
    .filter(({ daysRemaining }) => daysRemaining >= 0 && daysRemaining <= thresholdDays)
    .map(({ exam, daysRemaining }) => ({
      examType: exam.examType,
      windowEnd: exam.windowEnd,
      daysRemaining,
      severity: examTypes[exam.examType].isMorphological ? "critical" : "info",
    }));
}
