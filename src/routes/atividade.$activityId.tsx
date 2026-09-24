import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lock, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CelebrationModal, celebrationMessage } from "@/components/celebration-modal";
import { PaintCanvas } from "@/components/paint-canvas";
import { getActivity, getModule, nextActivityId } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/atividade/$activityId")({
  head: () => ({ meta: [{ title: "Atividade — Aprender Brincando" }, { name: "description", content: "Atividade interativa de leitura, escrita ou desenho." }] }),
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
    return <AppShell><div className="rounded-3xl bg-card p-6 text-center shadow-soft"><h1 className="font-display text-xl font-bold">Ops! Atividade não encontrada.</h1><Link to="/atividades" className="mt-4 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-6 font-bold text-primary-foreground">Voltar às atividades</Link></div></AppShell>;
  }

  const unlocked = progress.isUnlocked(activity.id);
  const completed = progress.isCompleted(activity.id);
  const module = getModule(activity.moduleId);
  const nextId = nextActivityId(activity.id);
  const correct = choice !== null && choice === activity.answer;
  const finish = () => { progress.complete(activity.id); setCelebrate(true); };

  return (
    <AppShell>
      <Link to="/atividades" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground"><ArrowLeft className="h-4 w-4" aria-hidden /> Voltar às atividades</Link>

      <section className="mt-3 rounded-3xl bg-card p-5 shadow-soft">
        <p className="text-sm font-bold text-primary">Módulo {module?.order} — {module?.title}</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold text-foreground">{activity.title}</h1>
        <p className="mt-3 rounded-2xl bg-secondary p-4 text-base font-medium text-foreground">{activity.instruction}</p>
      </section>

      {!unlocked ? (
        <section className="mt-5 rounded-3xl bg-secondary p-6 text-center">
          <Lock className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="mt-2 font-semibold text-muted-foreground">Complete a atividade anterior para desbloquear esta.</p>
          <Link to="/atividades" className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-primary px-6 font-bold text-primary-foreground">Voltar <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </section>
      ) : (
        <section className="mt-5 space-y-5">
          {activity.display ? <div className="flex min-h-44 items-center justify-center rounded-3xl border-2 border-primary/10 bg-card p-6 text-center shadow-soft"><span className="font-display text-7xl font-extrabold text-primary">{activity.display}</span></div> : null}

          {activity.type === "quiz" ? (
            <div className="space-y-3">
              {(activity.options ?? []).map((opt, i) => {
                const selected = choice === i;
                const state = choice === null ? "border-border bg-card" : selected && i === activity.answer ? "border-leaf bg-leaf/15" : selected ? "border-tangerine bg-tangerine/15" : "border-border bg-card";
                return <button key={opt.label} type="button" onClick={() => setChoice(i)} className={`flex min-h-16 w-full items-center justify-center gap-3 rounded-3xl border-2 text-2xl font-bold text-foreground transition active:scale-[0.98] ${state}`}>{opt.emoji ? <span aria-hidden>{opt.emoji}</span> : null}{opt.label}</button>;
              })}
              {choice !== null && !correct ? <p className="text-center font-semibold text-tangerine">Quase! Tente outra vez 🙂</p> : null}
              <button type="button" disabled={!correct} onClick={finish} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground disabled:opacity-40"><Check className="h-5 w-5" aria-hidden /> Concluir atividade</button>
            </div>
          ) : null}

          {activity.type === "reading" ? <button type="button" onClick={finish} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground">Já fiz isso <Check className="h-5 w-5" aria-hidden /></button> : null}
          {activity.type === "tracing" || activity.type === "writing" ? <div className="space-y-4"><PaintCanvas guide={activity.guide} lines={activity.type === "writing"} /><button type="button" onClick={finish} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground"><Check className="h-5 w-5" aria-hidden /> Concluir atividade</button></div> : null}
          {activity.type === "drawing" ? <div className="space-y-4"><PaintCanvas colors /><button type="button" onClick={finish} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground"><Check className="h-5 w-5" aria-hidden /> Concluir desenho</button></div> : null}

          {completed ? <p className="flex items-center justify-center gap-2 rounded-2xl bg-leaf/15 py-3 font-bold text-leaf"><Check className="h-5 w-5" aria-hidden /> Atividade concluída</p> : null}
          {activity.printable ? (
            <Link
              to={activity.moduleId === "desenhos-animados" ? "/imprimir/desenhos-animados" : "/imprimir"}
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card font-semibold text-foreground"
            >
              <Printer className="h-5 w-5" aria-hidden /> Ver fichas para imprimir
            </Link>
          ) : null}
        </section>
      )}

      <CelebrationModal open={celebrate} message={activity.id === "m1-a1" ? "Muito bem! 🎉 Você já deu o primeiro passo!" : celebrationMessage(progress.done)} stars={progress.stars} nextId={nextId} onClose={() => setCelebrate(false)} />
    </AppShell>
  );
}
