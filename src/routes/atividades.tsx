import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/atividades")({
  head: () => ({
    meta: [
      { title: "Atividades — Aprender Brincando" },
      {
        name: "description",
        content: "Módulos de letras, traçado, palavras, desenho e revisão, um passo de cada vez.",
      },
      { property: "og:title", content: "Atividades — Aprender Brincando" },
      {
        property: "og:description",
        content: "Todas as atividades de leitura, escrita e desenho organizadas por módulo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const progress = useProgress();

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-extrabold text-foreground">📚 Atividades</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Complete uma atividade para desbloquear a seguinte.
      </p>

      <div className="mt-5 space-y-8">
        {modules.map((m) => (
          <section key={m.id}>
            <h2 className="font-display text-xl font-bold text-foreground">
              <span aria-hidden>{m.emoji}</span> Módulo {m.order} — {m.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
            <ul className="mt-3 space-y-3">
              {m.activities.map((a) => {
                const completed = progress.isCompleted(a.id);
                const unlocked = progress.isUnlocked(a.id);
                return (
                  <li key={a.id} className="rounded-3xl bg-card p-4 shadow-soft">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-base font-bold text-foreground">
                          {a.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{a.description}</p>
                      </div>
                      {completed ? (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-leaf/20 px-3 py-2 text-sm font-bold text-leaf">
                          <Check className="h-4 w-4" aria-hidden /> Concluída
                        </span>
                      ) : null}
                    </div>
                    {unlocked ? (
                      <Link
                        to="/atividade/$activityId"
                        params={{ activityId: a.id }}
                        className="mt-3 flex min-h-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground active:scale-[0.98]"
                      >
                        {completed ? "Repetir →" : "Começar →"}
                      </Link>
                    ) : (
                      <p className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-secondary text-sm font-semibold text-muted-foreground">
                        <Lock className="h-4 w-4" aria-hidden /> Complete a atividade anterior
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
