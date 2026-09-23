import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CelebrationModal, celebrationMessage } from "@/components/celebration-modal";
import { PaintCanvas } from "@/components/paint-canvas";
import { getActivity, getModule, nextActivityId } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/atividade/$activityId")({
  head: () => ({
    meta: [
      { title: "Atividade — Aprender Brincando" },
      { name: "description", content: "Atividade interativa de leitura, escrita ou desenho." },
      { property: "og:title", content: "Atividade — Aprender Brincando" },
      {
        property: "og:description",
        content: "Faça a atividade no celular e guarde o progresso automaticamente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  const { activityId } = Route.useParams();
  const progress = useProgress();
  const activity = getActivity(activityId);
  const [choice, setChoice] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setChoice(null);
    if (activity) progress.visit(activity.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId]);

  if (!activity) {
    return (
      <AppShell>
        <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
          <h1 className="font-display text-xl font-bold">Ops! Algo não carregou.</h1>
          <Link
            to="/atividades"
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-6 font-bold text-primary-foreground"
          >
            Tentar novamente
          </Link>
        </div>
      </AppShell>
    );
  }

  const unlocked = progress.isUnlocked(activity.id);
  const completed = progress.isCompleted(activity.id);
  const module = getModule(activity.moduleId);
  const nextId = nextActivityId(activity.id);
  const correct = choice !== null && choice === activity.answer;

  const finish = () => {
    progress.complete(activity.id);
    setCelebrate(true);
  };

  return (
    <AppShell>
      <Link
        to="/atividades"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar às atividades
      </Link>

      <header className="mt-2">
        <p className="text-sm font-semibold text-primary">
          Módulo {module?.order} — {module?.title}
        </p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground">
          {activity.title}
        </h1>
        <p className="mt-2 rounded-2xl bg-secondary p-3 text-base text-foreground">
          {activity.instruction}
        </p>
      </header>

      {!unlocked ? (
        <p className="mt-5 flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-secondary text-base font-semibold text-muted-foreground">
          <Lock className="h-5 w-5" aria-hidden /> Complete a atividade anterior
        </p>
      ) : (
        <section className="mt-5 space-y-5">
          {activity.display ? (
            <div className="flex min-h-40 items-center justify-center rounded-3xl bg-card p-6 text-center shadow-soft">
              <span className="font-display text-7xl font-extrabold text-primary">
                {activity.display}
              </span>
            </div>
          ) : null}

          {activity.type === "quiz" ? (
            <div className="space-y-3">
              {(activity.options ?? []).map((opt, i) => {
                const selected = choice === i;
                const state =
                  choice === null
                    ? "border-border bg-card"
                    : selected && i === activity.answer
                      ? "border-leaf bg-leaf/15"
                      : selected
                        ? "border-tangerine bg-tangerine/15"
                        : "border-border bg-card";
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setChoice(i)}
                    className={`flex min-h-16 w-full items-center justify-center gap-3 rounded-3xl border-2 text-2xl font-bold text-foreground transition active:scale-[0.98] ${state}`}
                  >
                    {opt.emoji ? <span aria-hidden>{opt.emoji}</span> : null}
                    {opt.label}
                  </button>
                );
              })}
              {choice !== null && !correct ? (
                <p className="text-center text-base font-semibold text-tangerine">
                  Quase! Tente outra vez 🙂
                </p>
              ) : null}
              <button
                type="button"
                disabled={!correct}
                onClick={finish}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground disabled:opacity-40"
              >
                <Check className="h-5 w-5" aria-hidden /> Concluir atividade
              </button>
            </div>
          ) : null}

          {activity.type === "reading" ? (
            <button
              type="button"
              onClick={finish}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98]"
            >
              Já fiz isso ✓
            </button>
          ) : null}

          {activity.type === "tracing" || activity.type === "writing" ? (
            <div className="space-y-4">
              <PaintCanvas guide={activity.guide} lines={activity.type === "writing"} />
              <button
                type="button"
                onClick={finish}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98]"
              >
                <Check className="h-5 w-5" aria-hidden /> Concluir atividade
              </button>
            </div>
          ) : null}

          {activity.type === "drawing" ? (
            <div className="space-y-4">
              <PaintCanvas colors />
              <button
                type="button"
                onClick={finish}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground active:scale-[0.98]"
              >
                <Check className="h-5 w-5" aria-hidden /> Concluir
              </button>
            </div>
          ) : null}

          {completed ? (
            <p className="flex items-center justify-center gap-2 rounded-2xl bg-leaf/15 py-3 text-base font-bold text-leaf">
              <Check className="h-5 w-5" aria-hidden /> Atividade concluída
            </p>
          ) : null}

          {activity.printable ? (
            <Link
              to="/imprimir"
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card text-base font-semibold text-foreground"
            >
              <Printer className="h-5 w-5" aria-hidden /> Ver ficha para imprimir
            </Link>
          ) : null}
        </section>
      )}

      <CelebrationModal
        open={celebrate}
        message={
          activity.id === "m1-a1"
            ? "Muito bem! 🎉 Você já deu o primeiro passo!"
            : celebrationMessage(progress.done)
        }
        stars={progress.stars}
        nextId={nextId}
        onClose={() => setCelebrate(false)}
      />
    </AppShell>
  );
}
