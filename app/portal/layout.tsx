import Link from "next/link";
import { AuraMark } from "@/components/marketing/aura-mark";

// TODO(milestone-2): proteger com lib/auth/patient-guard.ts assim que o
// Supabase Auth + patients.auth_user_id existirem. Por enquanto é só uma
// prévia visual, sem login real.
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-secondary/20">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-3xl items-center justify-between px-6">
          <AuraMark />
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/portal/dashboard" className="hover:text-foreground">
              Meus exames
            </Link>
            <Link
              href="/portal/semana-a-semana"
              className="hover:text-foreground"
            >
              Semana a semana
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
