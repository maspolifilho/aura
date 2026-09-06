import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatPriceCents, type ProgramLevel } from "@/lib/data/program-levels";

export function ProgramCard({ level }: { level: ProgramLevel }) {
  return (
    <Card
      className={cn(
        "relative flex flex-col gap-6 border-border/70 py-8",
        level.highlighted &&
          "border-primary/60 shadow-lg shadow-primary/10 md:-translate-y-2",
      )}
    >
      {level.highlighted && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Mais escolhido
        </Badge>
      )}
      <CardHeader className="gap-3 text-center">
        <CardTitle className="font-heading text-2xl tracking-wide">
          {level.name}
        </CardTitle>
        <p className="text-3xl font-semibold text-foreground">
          {formatPriceCents(level.priceCents)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            /programa
          </span>
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <ul className="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
          {level.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
