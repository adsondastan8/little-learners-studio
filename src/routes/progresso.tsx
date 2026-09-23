import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flame, PartyPopper, Star, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progresso")({
  head: () => ({ meta: [{ title: "Progresso — Aprender Brincando" }, { name: "description", content: "Acompanhe atividades, estrelas e módulos concluídos." }] }),
  component: ProgressPage,
});

function ProgressPage() {
  const progress = useProgress();

  return (
    <AppShell>
      <section className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-soft">
        <p className="text-sm font-bold opacity-90">Cada passo conta ⭐</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold">📊 Seu progresso</h1>
        <p className="mt-2 text-sm opacity-90">Veja o que já foi conquistado e continue a jornada.</p>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-soft">
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-sm font-bold text-muted-foreground">Progresso geral</p><p className="mt-1 text-sm text-muted-foreground">{progress.done} de {progress.total} atividades</p></div>
          <strong className="font-display text-4xl text-primary">{progress.percent}%</strong>
        </div>
        <div className="mt-4"><ProgressBar percent={progress.percent} /></div>
      </section>

      <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
        <li className="rounded-2xl bg-sun/20 p-4"><Star className="mx-auto h-6 w-6 text-sun" aria-hidden /><b className="mt-1 block text-xl">{progress.stars}</b><span className="text-xs text-muted-foreground">Estrelas</span></li>
        <li className="rounded-2xl bg-leaf/20 p-4"><Trophy className="mx-auto h-6 w-6 text-leaf" aria-hidden /><b className="mt-1 block text-xl">{progress.completedModules.length}</b><span className="text-xs text-muted-foreground">Módulos</span></li>
        <li className="rounded-2xl bg-tangerine/20 p-4"><Flame className="mx-auto h-6 w-6 text-tangerine" aria-hidden /><b className="mt-1 block text-xl">{progress.streakDays}</b><span className="text-xs text-muted-foreground">Sequência</span></li>
      </ul>

      {progress.percent === 100 ? (
        <section className="mt-5 rounded-3xl bg-card p-6 text-center shadow-soft">
          <PartyPopper className="mx-auto h-12 w-12 text-tangerine" aria-hidden />
          <h2 className="mt-3 font-display text-2xl font-extrabold">Parabéns! 🎉</h2>
          <p className="mt-2 text-muted-foreground">A jornada foi concluída. Pode repetir as atividades quando quiser.</p>
          <Link to="/atividades" className="mt-5 flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-primary font-bold text-primary-foreground">Rever atividades <ArrowRight className="h-5 w-5" aria-hidden /></Link>
        </section>
      ) : null}

      <section className="mt-6 space-y-3">
        {modules.map((m) => {
          const done = m.activities.filter((a) => progress.isCompleted(a.id)).length;
          const percent = Math.round((done / m.activities.length) * 100);
          return (
            <Link key={m.id} to="/atividades" className="block rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display font-bold text-foreground"><span aria-hidden>{m.emoji}</span> {m.title}</h2>
                {percent === 100 ? <Check className="h-5 w-5 text-leaf" aria-hidden /> : <span className="text-sm font-bold text-primary">{percent}%</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{done} de {m.activities.length} concluídas</p>
              <div className="mt-3"><ProgressBar percent={percent} /></div>
            </Link>
          );
        })}
      </section>
    </AppShell>
  );
}
