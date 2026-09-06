import { PatientForm } from "@/components/painel/patient-form";

export default function NovaPacientePage() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-foreground">
          Nova paciente
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha os dados do cadastro — o cronograma de exames é gerado
          automaticamente a partir da DPP e do nível do programa.
        </p>
      </div>
      <PatientForm />
    </div>
  );
}
