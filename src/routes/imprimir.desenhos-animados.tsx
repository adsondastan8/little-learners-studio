import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrintableSheet } from "@/components/printable-sheet";
import { cartoonPrintables } from "@/lib/printables";

export const Route = createFileRoute("/imprimir/desenhos-animados")({
  head: () => ({
    meta: [
      { title: "Desenhos Animados para imprimir — Aprender Brincando" },
      { name: "description", content: "30 desenhos e atividades criativas para pintar e imprimir." },
    ],
  }),
  component: CartoonPrintPdf,
});

function CartoonPrintPdf() {
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
          <p className="text-sm font-bold text-amber-700">🎨 Desenhos Animados</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground">30 desenhos para pintar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cada atividade fica numa página própria, pronta para imprimir ou guardar como PDF.
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
          <h1 className="text-4xl font-bold">Desenhos Animados — Aprender Brincando</h1>
          <p className="mt-4 text-xl">Coleção de {cartoonPrintables.length} atividades para pintar.</p>
          <p className="mt-3 text-base">Animais, personagens, veículos, cenários e atividades criativas.</p>
          <p className="mt-12 text-base">Nome: ______________________________</p>
        </section>

        {cartoonPrintables.map((item) => (
          <div key={item.id} className="print-break">
            <PrintableSheet item={item} />
          </div>
        ))}
      </div>
    </AppShell>
  );
}
