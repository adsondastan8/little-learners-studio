import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { printCategories, printables } from "@/lib/printables";

export const Route = createFileRoute("/imprimir/")({
  head: () => ({ meta: [{ title: "Biblioteca para imprimir — Aprender Brincando" }, { name: "description", content: "Fichas A4 de letras, escrita, leitura, desenho e revisão." }] }),
  component: PrintLibrary,
});

function PrintLibrary() {
  return (
    <AppShell>
      <section className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-soft">
        <p className="text-sm font-bold opacity-90">Pratique também no papel 🖨️</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold">Biblioteca para imprimir</h1>
        <p className="mt-2 text-sm opacity-90">Temos <strong>{printables.length} fichas de alfabetização</strong> para abrir, imprimir ou guardar como PDF.</p>
      </section>

      <section className="mt-6 rounded-3xl border-2 border-primary/20 bg-card p-5 shadow-soft">
        <p className="text-sm font-bold text-primary">📘 Alfabetização completa</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-foreground">Um único PDF com todas as fichas</h2>
        <p className="mt-2 text-sm text-muted-foreground">As {printables.length} atividades ficam organizadas por tema e em páginas separadas, prontas para imprimir.</p>
        <Link to="/imprimir/alfabetizacao" className="mt-4 flex min-h-14 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground">📥 Baixar PDF completo</Link>
      </section>
      <div className="mt-6 space-y-8">
        {printCategories.map((cat) => {
          const items = printables.filter((p) => p.category === cat.id);
          if (!items.length) return null;
          return <section key={cat.id}><h2 className="font-display text-xl font-bold text-foreground"><span aria-hidden>{cat.emoji}</span> {cat.label}</h2><p className="mt-1 text-sm text-muted-foreground">{cat.description}</p><ul className="mt-3 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft"><h3 className="font-display text-base font-bold text-foreground">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.description}</p><div className="mt-4 grid gap-2 sm:grid-cols-2"><Link to="/imprimir/$sheetId" params={{ sheetId: item.id }} className="flex min-h-12 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground">Ver ficha</Link><Link to="/imprimir/$sheetId" params={{ sheetId: item.id }} search={{ print: true }} className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card font-semibold text-foreground"><Printer className="h-5 w-5" aria-hidden /> Baixar PDF</Link></div></li>)}</ul></section>;
        })}
      </div>
    </AppShell>
  );
}
