import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, ListChecks, Printer, Square } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/materiais")({
  head: () => ({
    meta: [
      { title: "Materiais de apoio — Aprender Brincando" },
      {
        name: "description",
        content: "Checklist diário, tarefas, resumos e atividades extras para apoiar a criança.",
      },
      { property: "og:title", content: "Materiais de apoio — Aprender Brincando" },
      {
        property: "og:description",
        content: "Guias curtos e tarefas simples para praticar leitura, escrita e desenho em casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaterialsPage,
});

const CHECKLIST = [
  "Praticar as letras",
  "Fazer atividade de escrita",
  "Praticar uma palavra",
  "Fazer um desenho",
];

const TASKS = [
  "Dizer o nome de 3 letras em voz alta",
  "Escrever a primeira letra do nome",
  "Encontrar uma letra em um livro ou embalagem",
  "Desenhar algo que começa com A",
];

const SUMMARIES = [
  {
    title: "Como ajudar na leitura",
    text: "Aponte a letra, diga o som e peça para a criança repetir. Sessões curtas de 5 minutos.",
  },
  {
    title: "Como ajudar no traçado",
    text: "Comece por letras retas (A, E, M) antes das curvas (S, C). Sempre de cima para baixo.",
  },
  {
    title: "Como ajudar no desenho",
    text: "Elogie o esforço e não o resultado. Deixe a criança escolher as cores livremente.",
  },
];

function useLocalChecklist() {
  const [checked, setChecked] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("checklist-apoio") ?? "[]") as string[];
    } catch {
      return [];
    }
  });
  const toggle = (item: string) => {
    const next = checked.includes(item) ? checked.filter((c) => c !== item) : [...checked, item];
    setChecked(next);
    try {
      window.localStorage.setItem("checklist-apoio", JSON.stringify(next));
    } catch {
      /* ignora */
    }
  };
  return { checked, toggle };
}

function MaterialsPage() {
  const { checked, toggle } = useLocalChecklist();

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-extrabold text-foreground">📚 Materiais de apoio</h1>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Checklist do dia</h2>
        <ul className="mt-3 space-y-2">
          {CHECKLIST.map((item) => {
            const on = checked.includes(item);
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(item)}
                  className="flex min-h-13 w-full items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-left text-base font-semibold text-foreground"
                >
                  {on ? (
                    <CheckSquare className="h-6 w-6 shrink-0 text-leaf" aria-hidden />
                  ) : (
                    <Square className="h-6 w-6 shrink-0 text-muted-foreground" aria-hidden />
                  )}
                  <span className={on ? "line-through opacity-60" : ""}>{item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <ListChecks className="h-5 w-5 text-primary" aria-hidden /> Tarefas
        </h2>
        <ul className="mt-3 space-y-2 text-base text-foreground">
          {TASKS.map((t) => (
            <li key={t} className="rounded-2xl bg-secondary px-4 py-3">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        {SUMMARIES.map((s) => (
          <article key={s.title} className="rounded-3xl bg-card p-5 shadow-soft">
            <h3 className="font-display text-base font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Atividades extras</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fichas em papel para praticar letras, escrita, leitura e desenho.
        </p>
        <Link
          to="/imprimir"
          className="mt-4 flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
        >
          <Printer className="h-5 w-5" aria-hidden /> Abrir biblioteca para imprimir
        </Link>
      </section>
    </AppShell>
  );
}
