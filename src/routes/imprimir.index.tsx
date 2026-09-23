import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { printCategories, printables } from "@/lib/printables";

export const Route = createFileRoute("/imprimir/")({
  head: () => ({
    meta: [
      { title: "Biblioteca para imprimir — Aprender Brincando" },
      {
        name: "description",
        content: "Fichas A4 de letras, escrita, leitura, desenho e revisão para imprimir ou guardar como PDF.",
      },
      { property: "og:title", content: "Biblioteca para imprimir — Aprender Brincando" },
      {
        property: "og:description",
        content: "Imprima fichas educacionais prontas em A4 vertical, limpas e econômicas em tinta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrintLibrary,
});

function PrintLibrary() {
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-extrabold text-foreground">
        🖨️ Biblioteca para imprimir
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Você também pode escolher “Guardar como PDF” na tela de impressão.
      </p>

      <div className="mt-5 space-y-8">
        {printCategories.map((cat) => {
          const items = printables.filter((p) => p.category === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id}>
              <h2 className="font-display text-xl font-bold text-foreground">
                <span aria-hidden>{cat.emoji}</span> {cat.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item.id} className="rounded-3xl bg-card p-5 shadow-soft">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to="/imprimir/$sheetId"
                        params={{ sheetId: item.id }}
                        className="flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-4 text-base font-bold text-primary-foreground active:scale-[0.98]"
                      >
                        Ver atividade →
                      </Link>
                      <Link
                        to="/imprimir/$sheetId"
                        params={{ sheetId: item.id }}
                        search={{ print: true }}
                        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 text-base font-semibold text-foreground active:scale-[0.98]"
                      >
                        <Printer className="h-5 w-5" aria-hidden /> Imprimir
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
