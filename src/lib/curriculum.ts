export type QuizOption = { label: string; emoji?: string };

export type Activity = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: "quiz" | "tracing" | "drawing" | "reading" | "writing";
  printable: boolean;
  /** Instrução curta mostrada para o responsável. */
  instruction: string;
  /** Conteúdo grande em destaque (letra, palavra ou emoji). */
  display?: string;
  options?: QuizOption[];
  answer?: number;
  /** Letra/forma usada como guia no canvas de traçado. */
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

function a(activity: Activity): Activity {
  return activity;
}

export const modules: LearningModule[] = [
  {
    id: "m1",
    order: 1,
    emoji: "🔤",
    title: "Primeiras letras",
    description: "Reconheça letras e comece a familiarizar-se com o alfabeto.",
    activities: [
      a({
        id: "m1-a1",
        moduleId: "m1",
        title: "Primeiro desafio 🌟",
        description: "A sua primeira vitória com a letra A.",
        type: "reading",
        printable: true,
        instruction: "Reconheça esta letra e diga o seu nome.",
        display: "A",
      }),
      a({
        id: "m1-a2",
        moduleId: "m1",
        title: "Letras iguais",
        description: "Encontre a letra igual ao modelo.",
        type: "quiz",
        printable: true,
        instruction: "Toque na letra igual a esta:",
        display: "B",
        options: [{ label: "D" }, { label: "B" }, { label: "P" }],
        answer: 1,
      }),
      a({
        id: "m1-a3",
        moduleId: "m1",
        title: "A letra correta",
        description: "Com que letra começa a palavra?",
        type: "quiz",
        printable: false,
        instruction: "Com que letra começa esta imagem?",
        display: "🍎",
        options: [{ label: "A" }, { label: "E" }, { label: "O" }],
        answer: 0,
      }),
      a({
        id: "m1-a4",
        moduleId: "m1",
        title: "Letra e imagem",
        description: "Relacione a letra com a imagem certa.",
        type: "quiz",
        printable: true,
        instruction: "Qual imagem começa com a letra S?",
        display: "S",
        options: [
          { label: "Sol", emoji: "☀️" },
          { label: "Bola", emoji: "⚽" },
          { label: "Gato", emoji: "🐱" },
        ],
        answer: 0,
      }),
      a({
        id: "m1-a5",
        moduleId: "m1",
        title: "Encontre a letra M",
        description: "Procure a letra pedida.",
        type: "quiz",
        printable: false,
        instruction: "Toque na letra M.",
        display: "M?",
        options: [{ label: "N" }, { label: "W" }, { label: "M" }],
        answer: 2,
      }),
    ],
  },
  {
    id: "m2",
    order: 2,
    emoji: "✏️",
    title: "Traçando e escrevendo",
    description: "Pratique os movimentos necessários para desenvolver a escrita.",
    activities: [
      a({
        id: "m2-a1",
        moduleId: "m2",
        title: "Trace a letra A",
        description: "Siga o contorno com o dedo.",
        type: "tracing",
        printable: true,
        instruction: "Use o dedo para traçar a letra por cima do modelo.",
        guide: "A",
      }),
      a({
        id: "m2-a2",
        moduleId: "m2",
        title: "Copie a letra E",
        description: "Trace e depois repita.",
        type: "tracing",
        printable: true,
        instruction: "Trace a letra E três vezes.",
        guide: "E",
      }),
      a({
        id: "m2-a3",
        moduleId: "m2",
        title: "Siga as linhas",
        description: "Movimentos de coordenação.",
        type: "tracing",
        printable: true,
        instruction: "Siga as ondas de um lado ao outro.",
        guide: "∼∼∼",
      }),
      a({
        id: "m2-a4",
        moduleId: "m2",
        title: "Complete a letra M",
        description: "Termine o traçado que falta.",
        type: "tracing",
        printable: true,
        instruction: "Complete a letra M por cima do modelo.",
        guide: "M",
      }),
      a({
        id: "m2-a5",
        moduleId: "m2",
        title: "Escreva sozinho",
        description: "Escrita livre na folha digital.",
        type: "writing",
        printable: true,
        instruction: "Escreva as letras A, E e M sobre as linhas.",
      }),
    ],
  },
  {
    id: "m3",
    order: 3,
    emoji: "📖",
    title: "Primeiras palavras",
    description: "Comece a reconhecer e formar palavras simples.",
    activities: [
      a({
        id: "m3-a1",
        moduleId: "m3",
        title: "Complete a palavra",
        description: "Qual letra falta?",
        type: "quiz",
        printable: true,
        instruction: "Qual letra completa a palavra B _ L A?",
        display: "B _ L A",
        options: [{ label: "O" }, { label: "I" }, { label: "U" }],
        answer: 0,
      }),
      a({
        id: "m3-a2",
        moduleId: "m3",
        title: "Identifique a palavra",
        description: "Ligue a imagem à palavra.",
        type: "quiz",
        printable: true,
        instruction: "Que palavra corresponde à imagem?",
        display: "🐱",
        options: [{ label: "GATO" }, { label: "BOLO" }, { label: "MALA" }],
        answer: 0,
      }),
      a({
        id: "m3-a3",
        moduleId: "m3",
        title: "Palavra e imagem",
        description: "Escolha a imagem da palavra.",
        type: "quiz",
        printable: false,
        instruction: "Qual imagem é a palavra SOL?",
        display: "SOL",
        options: [
          { label: "Sol", emoji: "☀️" },
          { label: "Casa", emoji: "🏠" },
          { label: "Peixe", emoji: "🐟" },
        ],
        answer: 0,
      }),
      a({
        id: "m3-a4",
        moduleId: "m3",
        title: "Monte a palavra",
        description: "Qual é a primeira letra?",
        type: "quiz",
        printable: false,
        instruction: "Qual é a primeira letra de LUA?",
        display: "🌙",
        options: [{ label: "U" }, { label: "L" }, { label: "A" }],
        answer: 1,
      }),
      a({
        id: "m3-a5",
        moduleId: "m3",
        title: "Leia comigo",
        description: "Leitura em voz alta.",
        type: "reading",
        printable: true,
        instruction: "Leia esta palavra em voz alta, letra por letra.",
        display: "M A L A",
      }),
    ],
  },
  {
    id: "m4",
    order: 4,
    emoji: "🎨",
    title: "Desenho e criatividade",
    description: "Pratique o desenho enquanto desenvolve coordenação e criatividade.",
    activities: [
      a({
        id: "m4-a1",
        moduleId: "m4",
        title: "Desenhe o sol",
        description: "Formas redondas e raios.",
        type: "drawing",
        printable: true,
        instruction: "Desenhe um sol bem grande com as cores que quiser.",
      }),
      a({
        id: "m4-a2",
        moduleId: "m4",
        title: "Desenhe a sua casa",
        description: "Formas simples.",
        type: "drawing",
        printable: true,
        instruction: "Desenhe uma casa com porta e janela.",
      }),
      a({
        id: "m4-a3",
        moduleId: "m4",
        title: "Letra colorida",
        description: "Desenhe a letra A com cores.",
        type: "drawing",
        printable: true,
        instruction: "Desenhe a letra A bem grande e pinte-a.",
      }),
      a({
        id: "m4-a4",
        moduleId: "m4",
        title: "Desenho livre",
        description: "Criatividade sem regras.",
        type: "drawing",
        printable: true,
        instruction: "Desenhe o que mais gostar hoje.",
      }),
    ],
  },
  {
    id: "m5",
    order: 5,
    emoji: "🏆",
    title: "Revisão divertida",
    description: "Uma mistura de tudo o que já aprendeu.",
    activities: [
      a({
        id: "m5-a1",
        moduleId: "m5",
        title: "Revisão de letras",
        description: "Reconhecimento rápido.",
        type: "quiz",
        printable: true,
        instruction: "Toque na letra E.",
        display: "?",
        options: [{ label: "F" }, { label: "E" }, { label: "L" }],
        answer: 1,
      }),
      a({
        id: "m5-a2",
        moduleId: "m5",
        title: "Revisão de traçado",
        description: "Traçado da letra S.",
        type: "tracing",
        printable: true,
        instruction: "Trace a letra S por cima do modelo.",
        guide: "S",
      }),
      a({
        id: "m5-a3",
        moduleId: "m5",
        title: "Revisão de palavras",
        description: "Complete a palavra.",
        type: "quiz",
        printable: true,
        instruction: "Qual letra completa C A S _ ?",
        display: "C A S _",
        options: [{ label: "A" }, { label: "O" }, { label: "E" }],
        answer: 0,
      }),
      a({
        id: "m5-a4",
        moduleId: "m5",
        title: "Revisão de escrita",
        description: "Escreva o seu nome.",
        type: "writing",
        printable: true,
        instruction: "Escreva o nome da criança nas linhas.",
      }),
      a({
        id: "m5-a5",
        moduleId: "m5",
        title: "Desenho final",
        description: "Celebre com um desenho.",
        type: "drawing",
        printable: true,
        instruction: "Desenhe algo que aprendeu nesta jornada.",
      }),
    ],
  },
];

export const allActivities: Activity[] = modules.flatMap((m) => m.activities);

export function getActivity(id: string): Activity | undefined {
  return allActivities.find((a) => a.id === id);
}

export function getModule(id: string): LearningModule | undefined {
  return modules.find((m) => m.id === id);
}

export function nextActivityId(id: string): string | null {
  const index = allActivities.findIndex((a) => a.id === id);
  if (index < 0 || index === allActivities.length - 1) return null;
  return allActivities[index + 1]?.id ?? null;
}
