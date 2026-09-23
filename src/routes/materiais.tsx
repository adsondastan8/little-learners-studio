import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, ListChecks, Printer, Square, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/materiais")({
  head: () => ({ meta: [{ title: "Materiais de apoio — Aprender Brincando" }, { name: "description", content: "Materiais e tarefas simples para praticar em casa." }] }),
  component: MaterialsPage,
});

const CHECKLIST = ["Praticar as letras", "Fazer atividade de escrita", "Praticar uma palavra", "Fazer um desenho"];
const TASKS = ["Dizer o nome de 3 letras em voz alta", "Escrever a primeira letra do nome", "Encontrar uma letra em um livro ou embalagem", "Desenhar algo que começa com A"];
const SUMMARIES = [
  { title: "Leitura", text: "Aponte a letra, diga o som e peça para a criança repetir. Prefira sessões curtas e divertidas." },
  { title: "Traçado", text: "Comece por letras simples e incentive movimentos lentos, sempre valorizando o esforço." },
  { title: "Desenho", text: "Deixe a criança escolher cores e formas. A criatividade é parte importante da aprendizagem." },
];

function useLocalChecklist() {
  const [checked, setChecked] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("checklist-apoio") ?? "[]") as string[]; } catch { return []; }
  });
  const toggle = (item: string) => {
    const next = checked.includes(item) ? checked.filter((c) => c !== item) : [...checked, item];
    setChecked(next);
    try { window.localStorage.setItem("checklist-apoio", JSON.stringify(next)); } catch {}
  };
  return { checked, toggle };
}

function MaterialsPage() {
  const { checked, toggle } = useLocalChecklist();
  return (
    <AppShell>
      <section className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-soft">
        <p className="flex items-center gap-2 text-sm font-bold"><Sparkles className="h-4 w-4" aria-hidden /> Apoio para casa</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold">🎒 Materiais</h1>
        <p className="mt-2 text-sm opacity-90">Pequenas tarefas para continuar a aprender fora das atividades.</p>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Checklist do dia</h2>
        <ul className="mt-3 space-y-2">
          {CHECKLIST.map((item) => {
            const on = checked.includes(item);
            return <li key={item}><button type="button" onClick={() => toggle(item)} className="flex min-h-13 w-full items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-left font-semibold text-foreground">{on ? <CheckSquare className="h-6 w-6 shrink-0 text-leaf" aria-hidden /> : <Square className="h-6 w-6 shrink-0 text-muted-foreground" aria-hidden />}<span className={on ? "line-through opacity-60" : ""}>{item}</span></button></li>;
          })}
        </ul>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground"><ListChecks className="h-5 w-5 text-primary" aria-hidden /> Tarefas rápidas</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">{TASKS.map((t) => <li key={t} className="rounded-2xl bg-secondary px-4 py-3 text-sm text-foreground">{t}</li>)}</ul>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        {SUMMARIES.map((s) => <article key={s.title} className="rounded-3xl bg-card p-5 shadow-soft"><h3 className="font-display font-bold text-foreground">{s.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{s.text}</p></article>)}
      </section>

      <section className="mt-5 rounded-3xl border-2 border-primary/15 bg-card p-5 shadow-soft">
        <h2 className="font-display text-lg font-bold text-foreground">Fichas para praticar no papel</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escolha uma ficha, abra e imprima ou guarde como PDF.</p>
        <Link to="/imprimir" className="mt-4 flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground"><Printer className="h-5 w-5" aria-hidden /> Abrir biblioteca</Link>
      </section>
    </AppShell>
  );
}
