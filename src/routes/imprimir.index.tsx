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

      <section className="mt-6 rounded-3xl border-2 border-primary/20 bg-card p-6 shadow-soft">
        <p className="text-sm font-bold text-primary">📘 Alfabetização completa</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-foreground">224 atividades para imprimir</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Todas as fichas de alfabetização estão reunidas num único PDF, organizadas em várias páginas.
        </p>
        <Link
          to="/imprimir/alfabetizacao"
          className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground"
        >
          📥 Baixar PDF completo
        </Link>
      </section>
    </AppShell>
  );
}
