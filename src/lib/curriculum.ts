import type { Printable } from "@/lib/printables";
import { printables } from "@/lib/printables";

export type QuizOption = { label: string; emoji?: string };

export type Activity = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: "quiz" | "tracing" | "drawing" | "reading" | "writing";
  printable: boolean;
  instruction: string;
  display?: string;
  options?: QuizOption[];
  answer?: number;
  guide?: string;
};

export type LearningModule = {
  id: string;
  order: number;
  title: string;
  description: string;
  emoji: string;
  activities: Activity[];
};

function printableToActivity(item: Printable): Activity {
  const type =
    item.kind === "trace"
      ? "tracing"
      : item.kind === "lines"
        ? "writing"
        : item.kind === "draw"
          ? "drawing"
          : "reading";

  return {
    id: item.id,
    moduleId: "alfabetizacao",
    title: item.title,
    description: item.description,
    type,
    printable: true,
    instruction:
      item.kind === "trace"
        ? "Trace o modelo com o dedo e depois pratique sozinho."
        : item.kind === "lines"
          ? "Escreva a palavra ou as letras nas linhas."
          : item.kind === "draw"
            ? "Faça a atividade no papel e use as cores que quiser."
            : item.kind === "match"
              ? "Leia as palavras e relacione cada uma com a imagem correta."
              : "Faça a ficha de revisão com calma.",
    display:
      item.kind === "trace"
        ? item.letters?.join(" · ")
        : item.kind === "lines"
          ? item.letters?.[0]
          : undefined,
    guide: item.letters?.[0],
  };
}

export const alfabetizacaoActivities: Activity[] = printables.map(printableToActivity);

export const modules: LearningModule[] = [
  {
    id: "alfabetizacao",
    order: 1,
    emoji: "🔤",
    title: "Alfabetização",
    description: "Mais de 200 atividades de letras, sílabas, escrita, leitura, desenho e revisão.",
    activities: alfabetizacaoActivities,
  },
];

export const allActivities: Activity[] = alfabetizacaoActivities;

export function getActivity(id: string): Activity | undefined {
  return allActivities.find((activity) => activity.id === id);
}

export function getModule(id: string): LearningModule | undefined {
  return modules.find((module) => module.id === id);
}

export function nextActivityId(id: string): string | null {
  const index = allActivities.findIndex((activity) => activity.id === id);
  if (index < 0 || index === allActivities.length - 1) return null;
  return allActivities[index + 1]?.id ?? null;
}
