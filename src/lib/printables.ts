export type PrintCategory = "letras" | "escrita" | "desenho" | "leitura" | "revisao";

export type Printable = {
  id: string;
  category: PrintCategory;
  title: string;
  description: string;
  /** Formato da ficha impressa. */
  kind: "trace" | "lines" | "draw" | "match" | "review";
  letters?: string[];
  words?: string[];
  pairs?: { word: string; emoji: string }[];
};

export const printCategories: { id: PrintCategory; label: string; emoji: string; description: string }[] = [
  { id: "letras", label: "Letras", emoji: "🔤", description: "Fichas para praticar letras." },
  { id: "escrita", label: "Escrita", emoji: "✏️", description: "Exercícios para praticar a escrita." },
  { id: "desenho", label: "Desenho", emoji: "🎨", description: "Desenhos e atividades para fazer no papel." },
  { id: "leitura", label: "Leitura", emoji: "📚", description: "Atividades de leitura." },
  { id: "revisao", label: "Revisão", emoji: "✅", description: "Fichas para revisar o conteúdo." },
];

export const printables: Printable[] = [
  {
    id: "ficha-alfabeto",
    category: "letras",
    title: "Ficha — Alfabeto",
    description: "Pratique as primeiras letras.",
    kind: "trace",
    letters: ["A", "B", "C", "D"],
  },
  {
    id: "ficha-vogais",
    category: "letras",
    title: "Ficha — Vogais",
    description: "Trace e reconheça as vogais.",
    kind: "trace",
    letters: ["A", "E", "I", "O", "U"],
  },
  {
    id: "ficha-escrita-letras",
    category: "escrita",
    title: "Ficha — Escrever letras",
    description: "Linhas para escrever sozinho.",
    kind: "lines",
    letters: ["A", "E", "M"],
  },
  {
    id: "ficha-escrita-nome",
    category: "escrita",
    title: "Ficha — O meu nome",
    description: "Linhas grandes para treinar o nome.",
    kind: "lines",
    letters: ["Nome"],
  },
  {
    id: "ficha-desenho-livre",
    category: "desenho",
    title: "Ficha — Desenhe e pinte",
    description: "Um espaço grande em branco para criar.",
    kind: "draw",
  },
  {
    id: "ficha-desenho-sol",
    category: "desenho",
    title: "Ficha — Desenhe o sol",
    description: "Complete e pinte o desenho.",
    kind: "draw",
  },
  {
    id: "ficha-leitura-palavras",
    category: "leitura",
    title: "Ficha — Ligue palavra e imagem",
    description: "Leitura de palavras simples.",
    kind: "match",
    pairs: [
      { word: "SOL", emoji: "☀️" },
      { word: "GATO", emoji: "🐱" },
      { word: "BOLA", emoji: "⚽" },
      { word: "CASA", emoji: "🏠" },
    ],
  },
  {
    id: "ficha-revisao",
    category: "revisao",
    title: "Ficha — Revisão geral",
    description: "Letras, palavras, escrita e desenho numa folha.",
    kind: "review",
    letters: ["A", "M", "S"],
    words: ["SOL", "MALA"],
  },
];

export function getPrintable(id: string) {
  return printables.find((p) => p.id === id);
}
