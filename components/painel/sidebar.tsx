"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Handshake,
  Wallet,
  BarChart3,
} from "lucide-react";
import { AuraMark } from "@/components/marketing/aura-mark";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/obstetras", label: "Obstetras", icon: Stethoscope },
  { href: "/leads", label: "Leads", icon: Handshake },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/indicadores", label: "Indicadores", icon: BarChart3 },
];

export function PainelSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-sidebar-border bg-sidebar px-4 py-6">
      <div className="px-2">
        <AuraMark />
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active &&
                  "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
