import { Card, CardContent } from "@/components/ui/card";
import { PortalLoginForm } from "@/components/portal/login-form";

export default function PortalLoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-8">
      <div className="text-center">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">
          Portal da paciente
        </span>
        <h1 className="mt-3 font-heading text-3xl text-foreground">
          Acompanhe sua jornada
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entre com seu CPF e senha para ver seus exames.
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <PortalLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
