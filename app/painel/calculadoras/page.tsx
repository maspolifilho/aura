import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GestationalAgeCalculator } from "@/components/calculators/gestational-age-calculator";
import { BmiCalculator } from "@/components/calculators/bmi-calculator";
import { FetalWeightCalculator } from "@/components/calculators/fetal-weight-calculator";
import { BishopScoreCalculator } from "@/components/calculators/bishop-score-calculator";

export default function PainelCalculadorasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-foreground">
          Calculadoras clínicas
        </h1>
        <p className="text-sm text-muted-foreground">
          Ferramentas de apoio à decisão baseadas em fórmulas publicadas e
          amplamente validadas.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="ig">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ig">IG / DPP</TabsTrigger>
              <TabsTrigger value="peso-fetal">Peso fetal</TabsTrigger>
              <TabsTrigger value="imc">IMC / ganho de peso</TabsTrigger>
              <TabsTrigger value="bishop">Escore de Bishop</TabsTrigger>
            </TabsList>
            <TabsContent value="ig" className="pt-6">
              <GestationalAgeCalculator />
            </TabsContent>
            <TabsContent value="peso-fetal" className="pt-6">
              <FetalWeightCalculator />
            </TabsContent>
            <TabsContent value="imc" className="pt-6">
              <BmiCalculator />
            </TabsContent>
            <TabsContent value="bishop" className="pt-6">
              <BishopScoreCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Rastreio de risco (pré-eclâmpsia, trissomias)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Essas calculadoras usam algoritmos proprietários da Fetal
            Medicine Foundation, calibrados e auditados — não reproduzimos
            aqui. Use a ferramenta oficial com sua conta certificada.
          </p>
          <Link
            href="https://fetalmedicine.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Abrir FMF
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
