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

export const lessons: Lesson[] = [
  {
    id: 1,
    name: "Variáveis Mágicas",
    icon: "🧪",
    xpReward: 30,
    crystalReward: 10,
    challenge: {
      type: "quiz",
      question: "Uma variável é como uma caixinha mágica onde guardamos coisas. O que podemos guardar dentro dela?",
      options: [
        { id: "a", label: "🔢 Números, palavras e listas" },
        { id: "b", label: "🍕 Só pizza" },
        { id: "c", label: "🎮 Só jogos" },
      ],
      correctId: "a",
      mascotHint: "Pense numa caixa de brinquedos… você pode guardar vários tipos de coisas!",
    },
  },
  {
    id: 2,
    name: "Loops Encantados",
    icon: "🔄",
    xpReward: 40,
    crystalReward: 12,
    challenge: {
      type: "fill-blank",
      sentence: "Para o robô dançar 5 vezes, usamos: ___ 5 vezes: dançar()",
      options: ["repita", "pare", "pule"],
      correctOption: "repita",
      mascotHint: "Quando queremos fazer algo de novo e de novo, usamos um loop!",
    },
  },
  {
    id: 3,
    name: "Condições Secretas",
    icon: "🔮",
    xpReward: 45,
    crystalReward: 15,
    challenge: {
      type: "true-false",
      statements: [
        { text: "\"SE está chovendo, ENTÃO leve guarda-chuva\" é uma condição", correct: true },
        { text: "O computador pode tomar decisões usando SE e SENÃO", correct: true },
        { text: "Uma condição só pode ser sobre números", correct: false },
      ],
      mascotHint: "Condições são como escolhas: SE algo acontecer, ENTÃO faço isso, SENÃO faço aquilo!",
    },
  },
  {
    id: 4,
    name: "Funções do Dragão",
    icon: "🐉",
    xpReward: 50,
    crystalReward: 18,
    challenge: {
      type: "order-blocks",
      instruction: "Coloque os blocos na ordem certa para o dragão soltar fogo!",
      blocks: [
        { id: "open", label: "🐉 acordar_dragão()" },
        { id: "fire", label: "🔥 preparar_fogo()" },
        { id: "blast", label: "💥 soltar_fogo()" },
      ],
      correctOrder: ["open", "fire", "blast"],
      mascotHint: "Primeiro o dragão acorda, depois prepara, e por fim solta o fogo! Passo a passo!",
    },
  },
  {
    id: 5,
    name: "Arrays do Tesouro",
    icon: "💎",
    xpReward: 50,
    crystalReward: 20,
    challenge: {
      type: "multi-select",
      question: "Uma lista (array) de frutas pode ter quais itens?",
      options: [
        { id: "apple", label: "🍎 Maçã" },
        { id: "car", label: "🚗 Carro" },
        { id: "banana", label: "🍌 Banana" },
        { id: "grape", label: "🍇 Uva" },
        { id: "house", label: "🏠 Casa" },
      ],
      correctIds: ["apple", "banana", "grape"],
      mascotHint: "Uma lista de frutas só tem… frutas! Escolha todas as frutas que você encontrar!",
    },
  },
  {
    id: 6,
    name: "Objetos Místicos",
    icon: "🏰",
    xpReward: 55,
    crystalReward: 22,
    challenge: {
      type: "match-pairs",
      instruction: "Conecte cada propriedade do personagem ao seu valor!",
      pairs: [
        { left: "nome", right: "Codie" },
        { left: "idade", right: "100 anos" },
        { left: "cor", right: "Verde" },
        { left: "poder", right: "Fogo" },
      ],
      mascotHint: "Um objeto é como uma ficha do personagem: cada campo tem um valor! Conecte os pares!",
    },
  },
  {
    id: 7,
    name: "Boss Final",
    icon: "⚔️",
    xpReward: 80,
    crystalReward: 30,
    challenge: {
      type: "mixed-quiz",
      mascotHint: "Esse é o desafio final! Use tudo que aprendeu!",
      questions: [
        {
          type: "quiz",
          question: "O que é um loop (laço)?",
          options: [
            { id: "a", label: "Repetir algo várias vezes" },
            { id: "b", label: "Parar o programa" },
            { id: "c", label: "Apagar uma variável" },
          ],
          correctId: "a",
          mascotHint: "",
        },
        {
          type: "true-false",
          statements: [
            { text: "Uma função é um bloco de código que podemos reutilizar", correct: true },
          ],
          mascotHint: "",
        },
        {
          type: "fill-blank",
          sentence: "Para guardar o nome do jogador, criamos uma ___",
          options: ["variável", "música", "imagem"],
          correctOption: "variável",
          mascotHint: "",
        },
      ],
    },
  },
];

// Import and merge advanced lessons
import { advancedLessons } from "./lessons-advanced";
lessons.push(...advancedLessons);
