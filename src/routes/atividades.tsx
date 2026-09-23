import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Lock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/atividades")({
  head: () => ({ meta: [{ title: "Atividades — Aprender Brincando" }, { name: "description", content: "Escolha uma atividade de leitura, escrita ou desenho." }] }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const progress = useProgress();

  return (
    <AppShell>
      <section className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-soft">
        <p className="text-sm font-bold opacity-90">Escolha uma missão 🎯</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold">📚 Atividades</h1>
        <p className="mt-2 text-sm opacity-90">Complete uma atividade para desbloquear a seguinte.</p>
      </section>

      <div className="mt-6 space-y-7">
        {modules.map((m) => {
          const done = m.activities.filter((a) => progress.isCompleted(a.id)).length;
          return (
            <section key={m.id}>
              <div className="flex items-center justify-between gap-3">
                <div><h2 className="font-display text-xl font-bold text-foreground"><span aria-hidden>{m.emoji}</span> Módulo {m.order} — {m.title}</h2><p className="mt-1 text-sm text-muted-foreground">{m.description}</p></div>
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{done}/{m.activities.length}</span>
              </div>
              <ul className="mt-3 space-y-3">
                {m.activities.map((a, index) => {
                  const completed = progress.isCompleted(a.id);
                  const unlocked = progress.isUnlocked(a.id);
                  return (
                    <li key={a.id} className={`rounded-3xl border bg-card p-4 shadow-soft ${completed ? "border-leaf/40" : unlocked ? "border-primary/20" : "border-border"}`}>
                      <div className="flex items-center gap-4">
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-extrabold ${completed ? "bg-leaf/15 text-leaf" : unlocked ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{completed ? "✓" : index + 1}</span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-bold text-foreground">{a.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                        </div>
                        {completed ? <Check className="h-5 w-5 shrink-0 text-leaf" aria-label="Concluída" /> : !unlocked ? <Lock className="h-5 w-5 shrink-0 text-muted-foreground" aria-label="Bloqueada" /> : null}
                      </div>
                      {unlocked ? (
                        <Link to="/atividade/$activityId" params={{ activityId: a.id }} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground">
                          {completed ? "Repetir atividade" : "Começar atividade"} <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      ) : (
                        <p className="mt-3 rounded-2xl bg-secondary py-3 text-center text-sm font-semibold text-muted-foreground">🔒 Complete a atividade anterior para desbloquear</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
