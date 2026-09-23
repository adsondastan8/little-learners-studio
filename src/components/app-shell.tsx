import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BookOpen, Gift, Home, Printer, Sparkles, TrendingUp } from "lucide-react";
import { SupportButton } from "./support-button";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/atividades", label: "Atividades", icon: BookOpen },
  { to: "/progresso", label: "Progresso", icon: TrendingUp },
  { to: "/imprimir", label: "Imprimir", icon: Printer },
  { to: "/materiais", label: "Materiais", icon: Gift },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-24 sm:pb-8">
      <header className="no-print sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary shadow-soft">
              <Sparkles className="h-5 w-5 text-primary-foreground" aria-hidden />
            </span>
            <span className="truncate font-display text-lg font-extrabold text-foreground">Aprender Brincando</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} activeOptions={{ exact: to === "/" }} activeProps={{ className: "bg-primary/10 text-primary" }} inactiveProps={{ className: "text-muted-foreground" }} className="inline-flex min-h-11 items-center gap-2 rounded-2xl px-3 text-sm font-semibold">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-5">{children}</main>

      <nav aria-label="Navegação principal" className="no-print fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur sm:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}><Link to={to} activeOptions={{ exact: to === "/" }} activeProps={{ className: "text-primary bg-primary/5" }} inactiveProps={{ className: "text-muted-foreground" }} className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold"><Icon className="h-6 w-6" aria-hidden />{label}</Link></li>
          ))}
        </ul>
      </nav>

      <SupportButton />
    </div>
  );
}
