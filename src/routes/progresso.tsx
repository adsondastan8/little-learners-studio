import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, PartyPopper, Star, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progresso")({
  head: () => ({
    meta: [
      { title: "Progresso — Aprender Brincando" },
      {
        name: "description",
        content: "Acompanhe atividades concluídas, estrelas conquistadas e módulos terminados.",
      },
      { property: "og:title", content: "Progresso — Aprender Brincando" },
      {
        property: "og:description",
        content: "Veja em segundos o que a criança já concluiu e o que vem a seguir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const progress = useProgress();
  const finished = progress.percent === 100;

  if (finished) {
    return (
      <AppShell>
        <section className="mx-auto max-w-md rounded-3xl bg-card p-6 text-center shadow-soft">
          <PartyPopper className="mx-auto h-12 w-12 animate-bounce-soft text-tangerine" aria-hidden />
          <h1 className="mt-3 font-display text-3xl font-extrabold text-foreground">Parabéns!</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Você completou sua jornada de aprendizagem!
          </p>
          <p className="mt-4 font-display text-4xl font-extrabold text-primary">100% concluído</p>
          <ul className="mt-4 space-y-2 text-base font-semibold text-foreground">
            <li>{progress.done} atividades concluídas</li>
            <li>{progress.stars} estrelas conquistadas</li>
            <li>{progress.completedModules.length} módulos concluídos</li>
          </ul>
          <div className="mt-6 space-y-3">
            <Link
              to="/atividades"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground"
            >
              Revisar atividades
            </Link>
            <Link
              to="/"
              className="flex min-h-12 items-center justify-center rounded-2xl border-2 border-border bg-card text-base font-semibold text-foreground"
            >
              Voltar ao início
            </Link>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-extrabold text-foreground">📊 Seu progresso</h1>

      <section className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
        <p className="font-display text-4xl font-extrabold text-primary">{progress.percent}%</p>
        <div className="mt-3">
          <ProgressBar percent={progress.percent} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {progress.done} de {progress.total} atividades concluídas
        </p>
      </section>

      <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
        <li className="rounded-2xl bg-sun/20 p-4">
          <Star className="mx-auto h-6 w-6 text-sun" aria-hidden />
          <span className="mt-1 block text-xl font-bold">{progress.stars}</span>
          <span className="text-xs text-muted-foreground">Estrelas</span>
        </li>
        <li className="rounded-2xl bg-leaf/20 p-4">
          <Trophy className="mx-auto h-6 w-6 text-leaf" aria-hidden />
          <span className="mt-1 block text-xl font-bold">{progress.completedModules.length}</span>
          <span className="text-xs text-muted-foreground">Módulos</span>
        </li>
        <li className="rounded-2xl bg-tangerine/20 p-4">
          <Flame className="mx-auto h-6 w-6 text-tangerine" aria-hidden />
          <span className="mt-1 block text-xl font-bold">{progress.streakDays}</span>
          <span className="text-xs text-muted-foreground">Sequência</span>
        </li>
      </ul>

      <section className="mt-6 space-y-3">
        {modules.map((m) => {
          const done = m.activities.filter((a) => progress.isCompleted(a.id)).length;
          const percent = Math.round((done / m.activities.length) * 100);
          return (
            <div key={m.id} className="rounded-3xl bg-card p-5 shadow-soft">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h2 className="truncate font-display text-base font-bold text-foreground">
                  <span aria-hidden>{m.emoji}</span> {m.title}
                </h2>
                {percent === 100 ? (
                  <Check className="h-5 w-5 shrink-0 text-leaf" aria-hidden />
                ) : (
                  <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                    {percent}%
                  </span>
                )}
              </div>
              <div className="mt-3">
                <ProgressBar percent={percent} />
              </div>
            </div>
          );
        })}
      </section>
    </AppShell>
  );
}
