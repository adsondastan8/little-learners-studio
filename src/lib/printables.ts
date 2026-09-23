export type PrintCategory = "letras" | "escrita" | "desenho" | "leitura" | "revisao";

export type Printable = {
  id: string;
  category: PrintCategory;
  title: string;
  description: string;
  kind: "trace" | "lines" | "draw" | "match" | "review";
  letters?: string[];
  words?: string[];
  pairs?: { word: string; emoji: string }[];
};

export const printCategories: { id: PrintCategory; label: string; emoji: string; description: string }[] = [
  { id: "letras", label: "Letras e sons", emoji: "🔤", description: "Traçado, reconhecimento e prática das letras." },
  { id: "escrita", label: "Escrita", emoji: "✏️", description: "Letras, sílabas, palavras e frases para copiar." },
  { id: "desenho", label: "Desenho", emoji: "🎨", description: "Atividades para desenhar, observar e contar." },
  { id: "leitura", label: "Leitura", emoji: "📚", description: "Palavras, sílabas e associação entre palavra e imagem." },
  { id: "revisao", label: "Revisão", emoji: "✅", description: "Fichas de revisão para consolidar a alfabetização." },
];

const basePrintables: Printable[] = [
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

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const vowels = ["A", "E", "I", "O", "U"];
const syllables = [
  "BA", "BE", "BI", "BO", "BU", "CA", "CE", "CI", "CO", "CU",
  "DA", "DE", "DI", "DO", "DU", "FA", "FE", "FI", "FO", "FU",
  "GA", "GE", "GI", "GO", "GU", "JA", "JE", "JI", "JO", "JU",
  "LA", "LE", "LI", "LO", "LU", "MA", "ME", "MI", "MO", "MU",
  "NA", "NE", "NI", "NO", "NU", "PA", "PE", "PI", "PO", "PU",
  "RA", "RE", "RI", "RO", "RU", "SA", "SE", "SI", "SO", "SU",
  "TA", "TE", "TI", "TO", "TU", "VA", "VE", "VI", "VO", "VU",
];

const words = [
  "BOLA", "BONECA", "BOTA", "BEBÉ", "CASA", "CAMA", "CAVALO", "COPO",
  "DADO", "DENTE", "FADA", "FACA", "FITA", "GATO", "GALO", "GIRAFA",
  "JACA", "JANELA", "LATA", "LEÃO", "LUA", "MALA", "MAMA", "MAPA",
  "MESA", "MOLA", "MOTO", "NAVE", "PATO", "PIPA", "PATO", "RATO",
  "REI", "RODA", "SAPO", "SACO", "SALA", "SOPA", "TATU", "TELA",
  "TOMATE", "UVA", "VACA", "VELA", "VOVÓ", "ZEBRA",
];

const pictures = [
  ["SOL", "☀️"], ["GATO", "🐱"], ["BOLA", "⚽"], ["CASA", "🏠"],
  ["PATO", "🦆"], ["SAPO", "🐸"], ["RATO", "🐭"], ["UVA", "🍇"],
  ["BOLO", "🍰"], ["FLOR", "🌸"], ["LUA", "🌙"], ["PEIXE", "🐟"],
];

const generated: Printable[] = [];

// 26 fichas de traçado de letras maiúsculas.
alphabet.forEach((letter, index) => {
  generated.push({
    id: `alfabeto-letra-${letter.toLowerCase()}`,
    category: "letras",
    title: `Atividade ${index + 1} — Letra ${letter}`,
    description: `Trace, reconheça e escreva a letra ${letter}.`,
    kind: "trace",
    letters: [letter],
  });
});

// 60 fichas de traçado de sílabas.
syllables.forEach((syllable, index) => {
  generated.push({
    id: `silaba-${syllable.toLowerCase()}-${index + 1}`,
    category: "letras",
    title: `Atividade ${index + 27} — Sílaba ${syllable}`,
    description: `Pratique a leitura e a escrita da sílaba ${syllable}.`,
    kind: "trace",
    letters: [syllable],
  });
});

// 50 fichas de escrita de palavras.
words.forEach((word, index) => {
  generated.push({
    id: `escrita-palavra-${index + 1}`,
    category: "escrita",
    title: `Atividade ${index + 87} — Escreva: ${word}`,
    description: `Copie a palavra ${word} e pratique a escrita.`,
    kind: "lines",
    letters: [word],
  });
});

// 40 fichas de leitura e associação.
for (let i = 0; i < 40; i += 1) {
  const start = i % pictures.length;
  const selected = [0, 1, 2, 3].map((offset) => pictures[(start + offset) % pictures.length]);
  generated.push({
    id: `leitura-associacao-${i + 1}`,
    category: "leitura",
    title: `Atividade ${i + 137} — Palavra e imagem ${i + 1}`,
    description: "Leia as palavras e ligue cada uma à imagem correta.",
    kind: "match",
    pairs: selected.map(([word, emoji]) => ({ word, emoji })),
  });
}

// 30 fichas de revisão.
for (let i = 0; i < 30; i += 1) {
  const letter = alphabet[i % alphabet.length];
  const word1 = words[i % words.length];
  const word2 = words[(i + 7) % words.length];
  generated.push({
    id: `revisao-alfabetizacao-${i + 1}`,
    category: "revisao",
    title: `Atividade ${i + 177} — Revisão ${i + 1}`,
    description: "Revise letras, palavras, escrita e desenho.",
    kind: "review",
    letters: [letter, vowels[i % vowels.length], syllables[i % syllables.length]],
    words: [word1, word2],
  });
}

export const printables: Printable[] = [...basePrintables, ...generated];

export function getPrintable(id: string) {
  return printables.find((p) => p.id === id);
}
