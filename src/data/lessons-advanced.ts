import type { Lesson } from "./lessons";

export const advancedLessons: Lesson[] = [
  {
    id: 8,
    name: "Strings Mágicas",
    icon: "✨",
    xpReward: 55,
    crystalReward: 20,
    challenge: {
      type: "quiz",
      question: "Uma string é um texto no código. Qual dessas é uma string válida?",
      options: [
        { id: "a", label: "\"Olá, mundo!\"" },
        { id: "b", label: "123 + 456" },
        { id: "c", label: "verdadeiro" },
      ],
      correctId: "a",
      mascotHint: "Strings ficam entre aspas! São palavras e frases que o computador entende como texto.",
    },
  },
  {
    id: 9,
    name: "Operadores Poderosos",
    icon: "⚡",
    xpReward: 60,
    crystalReward: 22,
    challenge: {
      type: "fill-blank",
      sentence: "Se temos 10 moedas e ganhamos 5, o resultado de 10 ___ 5 é 15",
      options: ["+", "-", "x"],
      correctOption: "+",
      mascotHint: "Operadores são como mágicas da matemática! Qual símbolo usamos para juntar valores?",
    },
  },
  {
    id: 10,
    name: "Depuração (Debug)",
    icon: "🔍",
    xpReward: 60,
    crystalReward: 24,
    challenge: {
      type: "true-false",
      statements: [
        { text: "Depurar (debug) significa encontrar e corrigir erros no código", correct: true },
        { text: "Um bug é um nome bonito para uma funcionalidade nova", correct: false },
        { text: "Testar o código ajuda a encontrar bugs antes dos usuários", correct: true },
      ],
      mascotHint: "Bug quer dizer 'inseto' em inglês! Os primeiros erros de computador eram causados por insetos de verdade nas máquinas!",
    },
  },
  {
    id: 11,
    name: "Eventos do Castelo",
    icon: "🏰",
    xpReward: 65,
    crystalReward: 25,
    challenge: {
      type: "order-blocks",
      instruction: "Coloque na ordem certa o que acontece quando o herói clica num botão mágico!",
      blocks: [
        { id: "click", label: "🖱️ herói_clica_botão()" },
        { id: "event", label: "⚡ evento_detectado()" },
        { id: "action", label: "🎯 executar_magia()" },
      ],
      correctOrder: ["click", "event", "action"],
      mascotHint: "Eventos são como alarmes: algo acontece (clique), o sistema detecta, e então executa uma ação!",
    },
  },
  {
    id: 12,
    name: "Listas Encadeadas",
    icon: "🔗",
    xpReward: 65,
    crystalReward: 26,
    challenge: {
      type: "multi-select",
      question: "Uma lista de tarefas do herói pode conter quais itens?",
      options: [
        { id: "fight", label: "⚔️ Derrotar dragão" },
        { id: "sleep", label: "😴 Dormir 8 horas" },
        { id: "code", label: "💻 Programar" },
        { id: "music", label: "🎵 Nota musical Dó" },
        { id: "quest", label: "🗺️ Completar missão" },
      ],
      correctIds: ["fight", "code", "quest"],
      mascotHint: "Uma lista de TAREFAS do herói só tem coisas que ele precisa FAZER! Selecione apenas as tarefas!",
    },
  },
  {
    id: 13,
    name: "APIs do Reino",
    icon: "📡",
    xpReward: 70,
    crystalReward: 28,
    challenge: {
      type: "match-pairs",
      instruction: "Uma API conecta pedidos a respostas. Conecte cada pedido à resposta correta!",
      pairs: [
        { left: "GET /clima", right: "☀️ Ensolarado" },
        { left: "GET /heroi", right: "🧙‍♂️ Dados do herói" },
        { left: "POST /magia", right: "✨ Magia lançada!" },
        { left: "GET /tesouro", right: "💎 50 cristais" },
      ],
      mascotHint: "APIs são como mensageiros: você faz um pedido e recebe uma resposta! Conecte cada pedido ao que ele retorna!",
    },
  },
  {
    id: 14,
    name: "Boss Final II",
    icon: "🐲",
    xpReward: 100,
    crystalReward: 40,
    challenge: {
      type: "mixed-quiz",
      mascotHint: "O dragão ancestral te desafia! Use todo o conhecimento avançado!",
      questions: [
        {
          type: "quiz",
          question: "O que uma API faz?",
          options: [
            { id: "a", label: "Conecta programas e troca dados" },
            { id: "b", label: "Desliga o computador" },
            { id: "c", label: "Desenha na tela" },
          ],
          correctId: "a",
          mascotHint: "",
        },
        {
          type: "true-false",
          statements: [
            { text: "Uma string \"123\" é diferente do número 123", correct: true },
          ],
          mascotHint: "",
        },
        {
          type: "fill-blank",
          sentence: "Para encontrar erros no código, fazemos ___",
          options: ["debug", "delete", "download"],
          correctOption: "debug",
          mascotHint: "",
        },
      ],
    },
  },
];
