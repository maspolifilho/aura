import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/marketing/program-card";
import { programLevels, sharedBenefits } from "@/lib/data/program-levels";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="flex flex-col gap-6">
          <span className="text-sm uppercase tracking-[0.2em] text-primary">
            Programa de Acompanhamento da Gestante
          </span>
          <h1 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">
            Cada fase da sua gestação, acompanhada com o cuidado que ela
            merece.
          </h1>
          <p className="text-lg text-muted-foreground">
            Uma jornada de exames guiada do primeiro ao terceiro trimestre,
            com medicina fetal especializada, ambiente premium e equipamento
            de alta tecnologia — em Feira de Santana, Bahia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/programa">Conhecer os planos</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contato">Falar com a equipe</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-exame.jpg"
            alt="Médico realizando ultrassonografia obstétrica em paciente gestante, com imagem 3D exibida na tela"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-4 px-6 py-8 text-center text-sm text-muted-foreground">
          {sharedBenefits.map((benefit) => (
            <span key={benefit}>{benefit}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl text-foreground md:text-4xl">
            Escolha o formato ideal para cada fase da sua gestação
          </h2>
          <p className="mt-4 text-muted-foreground">
            Três níveis pensados para diferentes necessidades, todos com o
            mesmo padrão de excelência clínica.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {programLevels.map((level) => (
            <ProgramCard key={level.code} level={level} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/programa" className="underline underline-offset-4">
            Ver comparação completa dos planos
          </Link>
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:order-2">
          <Image
            src="/images/hero-consultorio.jpg"
            alt="Consultório da Clínica Aura, ambiente premium com equipamento de ultrassonografia"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 480px, 100vw"
          />
        </div>
        <div className="flex flex-col gap-4 md:order-1">
          <h2 className="font-heading text-3xl text-foreground">
            Um ambiente pensado para o seu bem-estar
          </h2>
          <p className="text-muted-foreground">
            Cada exame acontece num espaço acolhedor, com equipamento de alta
            tecnologia e uma equipe dedicada a explicar cada etapa da sua
            gestação com clareza e cuidado.
          </p>
          <p className="text-muted-foreground">
            Dr. Máspoli Filho — CRM-BA 24476, RQE 15371 — especialista em
            medicina fetal e ultrassonografia.
          </p>
        </div>
      </section>
    </>
  );
}
