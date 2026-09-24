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

const desenhosAnimados: Activity[] = [
  ["🎨","Pinte o arco-íris","Escolha cores e pinte um arco-íris bem bonito."],
  ["🦁","Pinte o leão","Pinte a juba, o rosto e o corpo do leão."],
  ["🐘","Pinte o elefante","Use cores divertidas para pintar o elefante."],
  ["🦒","Pinte a girafa","Pinte as manchas e deixe a girafa colorida."],
  ["🐒","Pinte o macaco","Escolha as suas cores para o macaco."],
  ["🐼","Pinte o panda","Pinte o panda e complete o cenário."],
  ["🐸","Pinte o sapo","Pinte o sapo e desenhe algumas folhas."],
  ["🦋","Pinte a borboleta","Crie asas coloridas para a borboleta."],
  ["🐢","Pinte a tartaruga","Pinte o casco com as cores que preferir."],
  ["🐰","Pinte o coelho","Pinte o coelho e desenhe flores ao redor."],
  ["🐱","Pinte o gatinho","Pinte o gatinho e faça um fundo divertido."],
  ["🐶","Pinte o cachorrinho","Pinte o cachorrinho e desenhe a sua casinha."],
  ["🚗","Pinte o carro","Escolha as cores do carro e das rodas."],
  ["🚀","Pinte o foguete","Pinte o foguete e desenhe estrelas no espaço."],
  ["🏰","Pinte o castelo","Pinte o castelo e crie um céu colorido."],
  ["🧙","Pinte o personagem mágico","Dê cores à roupa, ao chapéu e ao cenário."],
  ["🦸","Pinte o super-herói","Crie um uniforme colorido para o herói."],
  ["🧚","Pinte a fada","Pinte as asas e desenhe um jardim mágico."],
  ["🐉","Pinte o dragão","Escolha as cores do dragão e do seu castelo."],
  ["🦄","Pinte o unicórnio","Crie um unicórnio com muitas cores."],
  ["🌈","Crie o seu mundo colorido","Pinte o cenário e acrescente os seus próprios desenhos."],
  ["⭐","Pinte as estrelas","Pinte estrelas de várias cores e tamanhos."],
  ["🎭","Crie uma máscara","Pinte e decore uma máscara de personagem."],
  ["🧩","Complete e pinte","Complete o desenho e depois escolha as cores."],
  ["✂️","Recorte e decore","Pinte as formas, recorte com ajuda de um adulto e decore."],
  ["🔎","Encontre e pinte","Encontre os elementos pedidos e pinte-os."],
  ["🖍️","Desenho livre","Desenhe o seu personagem favorito e pinte."],
  ["☁️","Crie um cenário","Pinte o céu e invente um cenário para os personagens."],
  ["🎨","Mistura de cores","Pinte cada espaço usando uma combinação de cores diferente."],
  ["🎉","Festa dos personagens","Pinte os personagens e decore o espaço da festa."],
].map(([emoji, title, description], index): Activity => ({
  id: `desenho-animado-${index + 1}`,
  moduleId: "desenhos-animados", title: `${emoji} ${title}`, description,
  type: "drawing", printable: true,
  instruction: description,
}));

export const modules: LearningModule[] = [
  {
    id: "alfabetizacao",
    order: 1,
    emoji: "🔤",
    title: "Alfabetização",
    description: "Mais de 200 atividades de letras, sílabas, escrita, leitura, desenho e revisão.",
    activities: alfabetizacaoActivities,
  },
  {
    id: "desenhos-animados",
    order: 2,
    emoji: "🎨",
    title: "Desenhos Animados",
    description: "Desenhos para pintar, colorir, completar, decorar e criar.",
    activities: desenhosAnimados,
  },
];

export const allActivities: Activity[] = [...alfabetizacaoActivities, ...desenhosAnimados];

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
