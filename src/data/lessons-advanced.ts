import type { Lesson } from "./lessons";

// ============================================================
// MÓDULO 2: CONVERSANDO COM A IA (Fases 6-10)
// MÓDULO 3: CRIANDO COM VIBECODE (Fases 11-14)
// ============================================================
export const advancedLessons: Lesson[] = [
  // ===== MÓDULO 2 =====
  {
    id: 6,
    name: "O que é um Prompt?",
    icon: "💬",
    xpReward: 50,
    crystalReward: 18,
    challenge: {
      type: "quiz",
      question: "Um PROMPT é um pedido mágico que fazemos pra IA. Qual destes é um prompt?",
      options: [
        { id: "a", label: "✨ \"Desenhe um dragão verde voando!\"" },
        { id: "b", label: "🪑 Sentar numa cadeira" },
        { id: "c", label: "🥪 Comer um lanche" },
      ],
      correctId: "a",
      mascotHint: "Um prompt é tudo que você ESCREVE ou FALA pra IA. É como um pedido mágico!",
    },
  },
  {
    id: 7,
    name: "Prompts Bons vs Ruins",
    icon: "⭐",
    xpReward: 55,
    crystalReward: 20,
    challenge: {
      type: "quiz",
      question: "Você quer que a IA desenhe seu herói. Qual prompt é MELHOR?",
      options: [
        { id: "a", label: "🦸 \"Um herói\"" },
        { id: "b", label: "🐲 \"Um herói criança com capa azul, segurando uma espada brilhante, num castelo\"" },
        { id: "c", label: "❓ \"Coisa\"" },
      ],
      correctId: "b",
      mascotHint: "Quanto mais detalhes você der, melhor a IA entende! Seja específico!",
    },
  },
  {
    id: 8,
    name: "Pedindo Imagens",
    icon: "🎨",
    xpReward: 55,
    crystalReward: 22,
    challenge: {
      type: "order-blocks",
      instruction: "Monte um prompt na ordem certa pra IA desenhar uma cena legal!",
      blocks: [
        { id: "what", label: "🐱 \"Um gatinho\"" },
        { id: "detail", label: "🎨 \"laranja com olhos azuis\"" },
        { id: "where", label: "🌳 \"numa floresta mágica\"" },
      ],
      correctOrder: ["what", "detail", "where"],
      mascotHint: "Primeiro diga O QUE é, depois COMO É, e por último ONDE está!",
    },
  },
  {
    id: 9,
    name: "Pedindo Histórias",
    icon: "📖",
    xpReward: 60,
    crystalReward: 24,
    challenge: {
      type: "fill-blank",
      sentence: "Pra IA inventar uma história, peça assim: \"Conte uma história sobre um ___ que vira herói\"",
      options: ["dragão", "sabonete", "controle"],
      correctOption: "dragão",
      mascotHint: "Quanto mais legal o personagem, mais legal a história! Escolha algo aventureiro!",
    },
  },
  {
    id: 10,
    name: "Boss: O Prompt Perfeito",
    icon: "🏆",
    xpReward: 80,
    crystalReward: 30,
    challenge: {
      type: "mixed-quiz",
      mascotHint: "Hora do desafio! Mostre que você sabe falar com a IA!",
      questions: [
        {
          type: "quiz",
          question: "Qual prompt vai gerar a MELHOR imagem?",
          options: [
            { id: "a", label: "\"Um robô fofo dançando num espaço cheio de estrelas\"" },
            { id: "b", label: "\"Robô\"" },
            { id: "c", label: "\"Coisa que se mexe\"" },
          ],
          correctId: "a",
          mascotHint: "",
        },
        {
          type: "true-false",
          statements: [
            { text: "Quanto mais detalhes o prompt tiver, melhor a IA entende", correct: true },
          ],
          mascotHint: "",
        },
        {
          type: "fill-blank",
          sentence: "O pedido que fazemos pra IA se chama ___",
          options: ["prompt", "passeio", "pulo"],
          correctOption: "prompt",
          mascotHint: "",
        },
      ],
    },
  },

  // ===== MÓDULO 3: CRIANDO COM VIBECODE =====
  {
    id: 11,
    name: "O que é um App?",
    icon: "📱",
    xpReward: 60,
    crystalReward: 22,
    challenge: {
      type: "multi-select",
      question: "Um APP tem várias partes. Quais destas fazem parte de um app?",
      options: [
        { id: "screens", label: "🖼️ Telas" },
        { id: "buttons", label: "🔘 Botões" },
        { id: "actions", label: "✨ Ações (quando aperta acontece algo)" },
        { id: "rain", label: "🌧️ Chuva de verdade" },
        { id: "colors", label: "🎨 Cores e desenhos" },
      ],
      correctIds: ["screens", "buttons", "actions", "colors"],
      mascotHint: "Um app é feito de telas, botões, cores e ações! Marque tudo que faz parte!",
    },
  },
  {
    id: 12,
    name: "Descrevendo seu App",
    icon: "✍️",
    xpReward: 65,
    crystalReward: 25,
    challenge: {
      type: "quiz",
      question: "Você quer criar um app de adivinhar cores. Qual é o MELHOR pedido pra IA?",
      options: [
        { id: "a", label: "\"Faz um app\"" },
        { id: "b", label: "\"Um jogo que mostra uma cor, e a criança clica entre 3 opções pra adivinhar o nome dela. Ganha pontos a cada acerto!\"" },
        { id: "c", label: "\"App legal\"" },
      ],
      correctId: "b",
      mascotHint: "Pra IA criar seu app, explique: O QUE faz, COMO funciona, e QUEM vai usar!",
    },
  },
  {
    id: 13,
    name: "Melhorando seu App",
    icon: "🔧",
    xpReward: 70,
    crystalReward: 28,
    challenge: {
      type: "match-pairs",
      instruction: "Depois do app pronto, você pode pedir melhorias! Conecte cada pedido ao resultado.",
      pairs: [
        { left: "🎨 \"Deixa mais colorido\"", right: "Mais cores na tela" },
        { left: "🔊 \"Adicione sons\"", right: "Sons ao clicar" },
        { left: "🏆 \"Coloque um placar\"", right: "Mostra os pontos" },
        { left: "🐲 \"Adicione um mascote\"", right: "Personagem fofo aparece" },
      ],
      mascotHint: "A mágica do vibecode: você pede mudanças, e a IA atualiza seu app!",
    },
  },
  {
    id: 14,
    name: "Boss Final: Seu Mini-App!",
    icon: "🚀",
    xpReward: 120,
    crystalReward: 50,
    challenge: {
      type: "mixed-quiz",
      mascotHint: "Desafio final! Você vai criar seu primeiro mini-app usando tudo que aprendeu!",
      questions: [
        {
          type: "quiz",
          question: "Pra criar um app, primeiro você precisa de uma...",
          options: [
            { id: "a", label: "💡 Ideia clara do que quer" },
            { id: "b", label: "🍕 Pizza" },
            { id: "c", label: "🛏️ Cama" },
          ],
          correctId: "a",
          mascotHint: "",
        },
        {
          type: "true-false",
          statements: [
            { text: "Você pode pedir pra IA mudar o app várias vezes até ficar perfeito", correct: true },
          ],
          mascotHint: "",
        },
        {
          type: "fill-blank",
          sentence: "Criar app conversando com a IA se chama ___",
          options: ["vibecode", "videogame", "vitamina"],
          correctOption: "vibecode",
          mascotHint: "",
        },
        {
          type: "quiz",
          question: "Qual é o segredo de um bom app feito com IA?",
          options: [
            { id: "a", label: "🎯 Descrever bem o que você quer" },
            { id: "b", label: "😴 Não falar nada" },
            { id: "c", label: "🙈 Esconder a ideia" },
          ],
          correctId: "a",
          mascotHint: "",
        },
      ],
    },
  },
];
