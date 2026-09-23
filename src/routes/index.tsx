import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Star, Trophy } from "lucide-react";
import heroImg from "@/assets/hero-aprender.jpg";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { allActivities, getActivity, modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aprender Brincando — Ler, escrever e desenhar" },
      { name: "description", content: "Aprendizagem infantil divertida para leitura, escrita e desenho." },
      { property: "og:title", content: "Aprender Brincando" },
      { property: "og:description", content: "Atividades interativas para aprender brincando." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const progress = useProgress();
  const firstId = allActivities[0]?.id ?? "";
  const lastActivity = progress.lastActivity ? getActivity(progress.lastActivity) : undefined;

  if (!progress.started) {
    return (
      <AppShell>
        <section className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-card p-5 shadow-soft sm:p-8">
          <div className="grid items-center gap-7 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                <Sparkles className="h-4 w-4" aria-hidden /> Área de aprendizagem
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
                Vamos aprender juntos, um passo de cada vez! 🌟
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                Atividades simples e divertidas para desenvolver leitura, escrita e desenho.
              </p>
              <Link
                to="/atividades"
                onClick={progress.markStarted}
                className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
              >
                Começar Agora <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Sem cadastro. O progresso fica guardado neste aparelho.
              </p>
            </div>
            <img
              src={heroImg}
              alt="Criança a ler um livro com letras coloridas"
              width={1024}
              height={768}
              className="mx-auto w-full max-w-md rounded-3xl"
            />
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-lift sm:p-8">
        <p className="text-sm font-bold opacity-90">Área de aprendizagem 🌟</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Olá! Vamos continuar aprendendo?</h1>
        <p className="mt-2 max-w-2xl text-sm opacity-90 sm:text-base">
          Escolha uma atividade, pratique e ganhe estrelas.
        </p>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-soft">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Seu progresso</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {progress.done} de {progress.total} atividades concluídas
            </p>
          </div>
          <span className="font-display text-4xl font-extrabold text-primary">{progress.percent}%</span>
        </div>
        <div className="mt-4"><ProgressBar percent={progress.percent} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-sun/20 p-3"><Star className="mx-auto h-5 w-5 text-sun" aria-hidden /><b className="mt-1 block">{progress.stars}</b><span className="text-xs text-muted-foreground">Estrelas</span></div>
          <div className="rounded-2xl bg-leaf/20 p-3"><Trophy className="mx-auto h-5 w-5 text-leaf" aria-hidden /><b className="mt-1 block">{progress.completedModules.length}</b><span className="text-xs text-muted-foreground">Módulos</span></div>
          <div className="rounded-2xl bg-tangerine/20 p-3"><Flame className="mx-auto h-5 w-5 text-tangerine" aria-hidden /><b className="mt-1 block">{progress.streakDays}</b><span className="text-xs text-muted-foreground">Sequência</span></div>
        </div>
      </section>

      {lastActivity ? (
        <section className="mt-5 rounded-3xl border-2 border-primary/15 bg-card p-5 shadow-soft">
          <p className="text-sm font-semibold text-primary">Continue de onde parou</p>
          <h2 className="mt-1 font-display text-xl font-bold text-foreground">{lastActivity.title}</h2>
          <Link to="/atividade/$activityId" params={{ activityId: lastActivity.id }} className="mt-4 flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground">
            Continuar <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </section>
      ) : null}

      <section className="mt-7">
        <div className="flex items-end justify-between">
          <div><h2 className="font-display text-2xl font-bold text-foreground">Módulos</h2><p className="text-sm text-muted-foreground">Escolha por onde começar.</p></div>
          <Link to="/atividades" className="text-sm font-bold text-primary">Ver todos</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {modules.map((m) => {
            const done = m.activities.filter((a) => progress.isCompleted(a.id)).length;
            return (
              <Link key={m.id} to="/atividades" className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5 active:scale-[0.99]">
                <span className="text-3xl" aria-hidden>{m.emoji}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">Módulo {m.order} — {m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                <p className="mt-3 text-sm font-bold text-primary">{done} de {m.activities.length} concluídas</p>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
