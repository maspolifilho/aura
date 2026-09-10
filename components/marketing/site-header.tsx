import Link from "next/link";
import { AuraMark } from "@/components/marketing/aura-mark";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Início" },
  { href: "/programa", label: "Programa" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Clínica Aura — início">
          <AuraMark />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href="/contato">Fale com a equipe</Link>
        </Button>
      </div>
    </header>
  );
}
