import { PainelSidebar } from "@/components/painel/sidebar";

// TODO(milestone-2): proteger este layout com lib/auth/staff-guard.ts assim
// que o Supabase Auth + staff_profiles existirem. Por enquanto o painel é
// só uma prévia visual, sem login real.
export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <PainelSidebar />
      <main className="flex-1 bg-background px-8 py-8">{children}</main>
    </div>
  );
}
