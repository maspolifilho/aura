import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/marketing/program-card";
import { programLevels, sharedBenefits } from "@/lib/data/program-levels";

export const metadata: Metadata = {
  title: "Planos do Programa | Clínica Aura",
};

export default function ProgramaPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">
          Programa de Acompanhamento da Gestante
        </span>
        <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
          Escolha o formato ideal para acompanhar cada fase da sua gestação
        </h1>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {programLevels.map((level) => (
          <ProgramCard key={level.code} level={level} />
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-3xl space-y-3 text-center text-sm text-muted-foreground">
        <p>
          Em todos os planos, você é atendida em ambiente premium e
          acolhedor, com equipamento de alta tecnologia — não é diferencial
          de nenhum nível específico, é o padrão da Clínica Aura.
        </p>
        <p>
          {sharedBenefits.join(" · ")}
        </p>
        <p className="text-xs">
          *Exame 3D sujeito a limitações técnicas (posição fetal, líquido
          amniótico, biotipo materno). Valores válidos conforme tabela
          vigente da Clínica Aura.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="font-heading text-xl text-foreground">
          Fale com a nossa equipe e escolha o formato ideal para a sua
          jornada.
        </p>
        <Button asChild size="lg">
          <Link href="/contato">Falar com a equipe</Link>
        </Button>
      </div>
    </section>
  );
}
