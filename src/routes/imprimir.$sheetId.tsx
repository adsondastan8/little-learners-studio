import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PrintableSheet } from "@/components/printable-sheet";
import { getPrintable } from "@/lib/printables";

type Search = { print?: boolean };

export const Route = createFileRoute("/imprimir/$sheetId")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    print: search["print"] === true || search["print"] === "true",
  }),
  head: () => ({
    meta: [
      { title: "Ficha para imprimir — Aprender Brincando" },
      { name: "description", content: "Ficha educacional em A4 vertical, pronta para imprimir." },
      { property: "og:title", content: "Ficha para imprimir — Aprender Brincando" },
      {
        property: "og:description",
        content: "Imprima a ficha ou escolha “Guardar como PDF” na tela de impressão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SheetPage,
});

function SheetPage() {
  const { sheetId } = Route.useParams();
  const { print } = Route.useSearch();
  const item = getPrintable(sheetId);

  useEffect(() => {
    if (item && print) {
      const id = window.setTimeout(() => window.print(), 400);
      return () => window.clearTimeout(id);
    }
    return;
  }, [item, print]);

  if (!item) {
    return (
      <AppShell>
        <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
          <h1 className="font-display text-xl font-bold">Ops! Algo não carregou.</h1>
          <Link
            to="/imprimir"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-6 font-bold text-primary-foreground"
          >
            Tentar novamente
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="no-print">
        <Link
          to="/imprimir"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar à biblioteca
        </Link>
        <h1 className="mt-2 font-display text-2xl font-extrabold text-foreground">{item.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.description} Você também pode escolher “Guardar como PDF” na tela de impressão.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98] sm:w-auto sm:px-8"
        >
          <Printer className="h-5 w-5" aria-hidden /> Imprimir
        </button>
      </div>

      <div className="print-area mt-5 rounded-3xl bg-white shadow-soft">
        <PrintableSheet item={item} />
      </div>
    </AppShell>
  );
}
