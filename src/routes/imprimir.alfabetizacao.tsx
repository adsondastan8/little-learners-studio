import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrintableSheet } from "@/components/printable-sheet";
import { printCategories, printables } from "@/lib/printables";

export const Route = createFileRoute("/imprimir/alfabetizacao")({
  head: () => ({
    meta: [
      { title: "PDF completo de alfabetização — Aprender Brincando" },
      { name: "description", content: "Mais de 200 fichas de alfabetização organizadas para imprimir." },
    ],
  }),
  component: FullAlphabetizationPdf,
});

function FullAlphabetizationPdf() {
  useEffect(() => {
    const id = window.setTimeout(() => window.print(), 500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AppShell>
      <div className="no-print">
        <Link to="/imprimir" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar à biblioteca
        </Link>
        <div className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
          <p className="text-sm font-bold text-primary">📘 Alfabetização completa</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground">PDF com {printables.length} atividades</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            As fichas estão organizadas por categoria e cada atividade fica em uma página própria.
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-primary-foreground sm:w-auto sm:px-8"
          >
            <Printer className="h-5 w-5" aria-hidden /> Imprimir / Guardar PDF
          </button>
        </div>
      </div>

      <div className="print-area mt-5 bg-white">
        <section className="sheet mx-auto w-full max-w-[820px] bg-white p-8 text-black sm:p-12 print-break">
          <h1 className="text-4xl font-bold">Alfabetização — Aprender Brincando</h1>
          <p className="mt-4 text-xl">Coleção completa de {printables.length} atividades.</p>
          <p className="mt-3 text-base">Organizada por letras e sons, escrita, desenho, leitura e revisão.</p>
          <div className="mt-10 space-y-3 text-lg">
            {printCategories.map((category) => (
              <p key={category.id}>{category.emoji} <strong>{category.label}</strong> — {printables.filter((item) => item.category === category.id).length} fichas</p>
            ))}
          </div>
          <p className="mt-12 text-base">Nome: ______________________________</p>
        </section>

        {printCategories.map((category) => (
          <div key={category.id}>
            <section className="sheet mx-auto w-full max-w-[820px] bg-white p-8 text-black sm:p-12 print-break">
              <h2 className="text-3xl font-bold">{category.emoji} {category.label}</h2>
              <p className="mt-3 text-lg">{category.description}</p>
              <p className="mt-6 text-base">Esta secção contém {printables.filter((item) => item.category === category.id).length} fichas.</p>
            </section>
            {printables.filter((item) => item.category === category.id).map((item) => (
              <div key={item.id} className="print-break">
                <PrintableSheet item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
