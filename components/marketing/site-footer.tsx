import { AuraMark } from "@/components/marketing/aura-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <AuraMark className="text-foreground" />
        <div className="flex flex-col gap-1 md:text-right">
          <span>Feira de Santana, Bahia</span>
          <span>@clinicaaura.fsa · (75) 98829-2479</span>
          <span>Dr. Máspoli Filho — CRM-BA 24476 · RQE 15371</span>
        </div>
      </div>
    </footer>
  );
}
