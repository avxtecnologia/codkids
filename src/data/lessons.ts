export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizLesson {
  type: "quiz";
  question: string;
  options: QuizOption[];
  correctId: string;
  mascotHint: string;
}

export interface FillBlankLesson {
  type: "fill-blank";
  sentence: string; // use ___ for the blank
  options: string[];
  correctOption: string;
  mascotHint: string;
}

export interface TrueFalseLesson {
  type: "true-false";
  statements: { text: string; correct: boolean }[];
  mascotHint: string;
}

export interface OrderBlocksLesson {
  type: "order-blocks";
  instruction: string;
  blocks: { id: string; label: string }[];
  correctOrder: string[];
  mascotHint: string;
}

export interface MultiSelectLesson {
  type: "multi-select";
  question: string;
  options: { id: string; label: string }[];
  correctIds: string[];
  mascotHint: string;
}

export interface MatchPairsLesson {
  type: "match-pairs";
  instruction: string;
  pairs: { left: string; right: string }[];
  mascotHint: string;
}

export interface MixedQuizLesson {
  type: "mixed-quiz";
  questions: (QuizLesson | TrueFalseLesson | FillBlankLesson)[];
  mascotHint: string;
}

export type Lesson = {
  id: number;
  name: string;
  icon: string;
  xpReward: number;
  crystalReward: number;
  challenge: QuizLesson | FillBlankLesson | TrueFalseLesson | OrderBlocksLesson | MultiSelectLesson | MatchPairsLesson | MixedQuizLesson;
};

// ============================================================
// MÓDULO 1: O QUE É IA? (Fases 1-5)
// ============================================================
export const lessons: Lesson[] = [
  {
    id: 1,
    name: "O que é IA?",
    icon: "🧠",
    xpReward: 30,
    crystalReward: 10,
    challenge: {
      type: "quiz",
      question: "IA significa Inteligência Artificial. O que é uma IA?",
      options: [
        { id: "a", label: "🧠 Um cérebro mágico de computador que aprende!" },
        { id: "b", label: "🍕 Um tipo novo de pizza" },
        { id: "c", label: "🚗 Um carro voador" },
      ],
      correctId: "a",
      mascotHint: "A IA é como um cérebro feito de computador! Ela aprende olhando muitos exemplos.",
    },
  },
  {
    id: 2,
    name: "Como a IA Aprende",
    icon: "📚",
    xpReward: 35,
    crystalReward: 12,
    challenge: {
      type: "true-false",
      statements: [
        { text: "A IA aprende vendo muitos exemplos, como uma criança", correct: true },
        { text: "A IA já nasce sabendo tudo sem precisar estudar", correct: false },
        { text: "Quanto mais exemplos, melhor a IA aprende", correct: true },
      ],
      mascotHint: "Pra ensinar a IA o que é um gato, mostramos MILHARES de fotos de gatos!",
    },
  },
  {
    id: 3,
    name: "Dados: A Comida da IA",
    icon: "🍎",
    xpReward: 40,
    crystalReward: 15,
    challenge: {
      type: "multi-select",
      question: "Quais destes são DADOS que podem alimentar uma IA?",
      options: [
        { id: "photos", label: "📷 Fotos" },
        { id: "texts", label: "📝 Textos e palavras" },
        { id: "rock", label: "🪨 Uma pedra" },
        { id: "music", label: "🎵 Músicas" },
        { id: "cloud", label: "☁️ Uma nuvem no céu" },
      ],
      correctIds: ["photos", "texts", "music"],
      mascotHint: "Dados são informações que o computador pode ler: fotos, textos, sons, números!",
    },
  },
  {
    id: 4,
    name: "Achando Padrões",
    icon: "🔍",
    xpReward: 45,
    crystalReward: 16,
    challenge: {
      type: "quiz",
      question: "A IA é craque em achar PADRÕES. Qual é o padrão aqui? 🔴🔵🔴🔵🔴 ___",
      options: [
        { id: "a", label: "🔵 Azul" },
        { id: "b", label: "🟢 Verde" },
        { id: "c", label: "🟡 Amarelo" },
      ],
      correctId: "a",
      mascotHint: "Olha a sequência! Vermelho, azul, vermelho, azul... o que vem agora?",
    },
  },
  {
    id: 5,
    name: "IA no Dia a Dia",
    icon: "🌍",
    xpReward: 50,
    crystalReward: 20,
    challenge: {
      type: "match-pairs",
      instruction: "A IA está em todo lugar! Conecte cada uso da IA ao que ela faz.",
      pairs: [
        { left: "🎬 Netflix", right: "Sugere filmes pra você" },
        { left: "📱 Alexa/Siri", right: "Responde suas perguntas" },
        { left: "🎮 Jogos", right: "Controla inimigos espertos" },
        { left: "📸 Câmera", right: "Reconhece rostos nas fotos" },
      ],
      mascotHint: "A IA já faz parte da sua vida! Conecte cada coisa ao que ela usa de IA!",
    },
  },
];

// Import and merge advanced modules (2 and 3)
import { advancedLessons } from "./lessons-advanced";
lessons.push(...advancedLessons);
