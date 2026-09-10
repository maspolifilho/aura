import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GestationalAgeCalculator } from "@/components/calculators/gestational-age-calculator";
import { BabySizeCalculator } from "@/components/calculators/baby-size-calculator";
import { BmiCalculator } from "@/components/calculators/bmi-calculator";

export const metadata: Metadata = {
  title: "Calculadoras para Gestantes | Clínica Aura",
};

export default function CalculadorasPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">
          Ferramentas gratuitas
        </span>
        <h1 className="mt-4 font-heading text-4xl text-foreground md:text-5xl">
          Calculadoras para a sua gestação
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ferramentas baseadas em fórmulas obstétricas reconhecidas, para
          acompanhar a sua gravidez com mais informação.
        </p>
      </div>

      <Card className="mt-12">
        <CardContent className="pt-6">
          <Tabs defaultValue="idade-gestacional">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="idade-gestacional">
                Idade gestacional
              </TabsTrigger>
              <TabsTrigger value="tamanho-bebe">Tamanho do bebê</TabsTrigger>
              <TabsTrigger value="imc">IMC gestante</TabsTrigger>
            </TabsList>
            <TabsContent value="idade-gestacional" className="pt-6">
              <GestationalAgeCalculator />
            </TabsContent>
            <TabsContent value="tamanho-bebe" className="pt-6">
              <BabySizeCalculator />
            </TabsContent>
            <TabsContent value="imc" className="pt-6">
              <BmiCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
