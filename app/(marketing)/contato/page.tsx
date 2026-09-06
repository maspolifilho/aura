import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contato | Clínica Aura",
};

export default function ContatoPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">
          Contato
        </span>
        <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
          Vamos conversar sobre a sua gestação
        </h1>
        <p className="mt-4 text-muted-foreground">
          Preencha seus dados e nossa equipe entra em contato para explicar o
          programa e ajudar você a escolher o formato ideal.
        </p>
      </div>

      <Card className="mt-12">
        <CardContent className="pt-6">
          <ContactForm />
        </CardContent>
      </Card>
    </section>
  );
}
