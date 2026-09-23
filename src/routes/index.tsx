import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Sparkles, Star, Trophy } from "lucide-react";
import heroImg from "@/assets/hero-aprender.jpg";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { allActivities, getActivity, modules } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aprender Brincando — Ler, escrever e desenhar" },
      {
        name: "description",
        content:
          "Atividades simples e divertidas para a criança desenvolver a leitura, a escrita e o desenho, com fichas para imprimir.",
      },
      { property: "og:title", content: "Aprender Brincando — Ler, escrever e desenhar" },
      {
        property: "og:description",
        content: "Área de aprendizagem com atividades interativas, progresso e fichas imprimíveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <section className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-sun/25 px-4 py-1.5 text-sm font-bold text-foreground">
            <Sparkles className="h-4 w-4" aria-hidden /> Área de aprendizagem
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Vamos aprender juntos, um passo de cada vez! 🌟
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Atividades simples e divertidas para ajudar a criança a desenvolver a leitura, a escrita
            e o desenho.
          </p>
          <img
            src={heroImg}
            alt="Criança a ler um livro com letras coloridas"
            width={1024}
            height={768}
            className="mx-auto mt-6 w-full max-w-md rounded-3xl"
          />
          <Link
            to="/atividade/$activityId"
            params={{ activityId: firstId }}
            onClick={progress.markStarted}
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lift active:scale-[0.98]"
          >
            Começar Agora →
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Sem cadastro. O progresso fica guardado neste aparelho.
          </p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-extrabold text-foreground">
        Olá! Vamos continuar aprendendo? 👋
      </h1>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="text-base font-bold text-foreground">Seu progresso</h2>
        <p className="mt-2 font-display text-4xl font-extrabold text-primary">{progress.percent}%</p>
        <div className="mt-3">
          <ProgressBar percent={progress.percent} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {progress.done} de {progress.total} atividades concluídas
        </p>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-center">
          <li className="rounded-2xl bg-sun/20 p-3">
            <Star className="mx-auto h-5 w-5 text-sun" aria-hidden />
            <span className="mt-1 block text-lg font-bold">{progress.stars}</span>
            <span className="text-xs text-muted-foreground">Estrelas</span>
          </li>
          <li className="rounded-2xl bg-leaf/20 p-3">
            <Trophy className="mx-auto h-5 w-5 text-leaf" aria-hidden />
            <span className="mt-1 block text-lg font-bold">{progress.completedModules.length}</span>
            <span className="text-xs text-muted-foreground">Módulos</span>
          </li>
          <li className="rounded-2xl bg-tangerine/20 p-3">
            <Flame className="mx-auto h-5 w-5 text-tangerine" aria-hidden />
            <span className="mt-1 block text-lg font-bold">{progress.streakDays}</span>
            <span className="text-xs text-muted-foreground">Sequência</span>
          </li>
        </ul>
      </section>

      {lastActivity ? (
        <section className="mt-4 rounded-3xl bg-card p-5 shadow-soft">
          <h2 className="text-base font-bold text-foreground">Continue de onde parou</h2>
          <p className="mt-1 text-sm text-muted-foreground">{lastActivity.title}</p>
          <Link
            to="/atividade/$activityId"
            params={{ activityId: lastActivity.id }}
            className="mt-4 flex min-h-13 items-center justify-center rounded-2xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground active:scale-[0.98]"
          >
            Continuar →
          </Link>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="font-display text-xl font-bold text-foreground">Módulos</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {modules.map((m) => {
            const done = m.activities.filter((a) => progress.isCompleted(a.id)).length;
            return (
              <Link
                key={m.id}
                to="/atividades"
                className="rounded-3xl bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span className="text-2xl" aria-hidden>
                  {m.emoji}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                  Módulo {m.order} — {m.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  {done} de {m.activities.length} concluídas
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
