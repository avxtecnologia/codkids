

# CodeKids - Plataforma Funcional com Mascote e Fluxo Completo

## Resumo

Transformar o CodeKids em uma experiencia funcional completa estilo Duolingo, com:
- **Mascote assistente** (Codie, um dragao amigavel) presente em todas as telas
- **Fluxo "Sou Novo Aqui"** com onboarding interativo + primeiro desafio antes do cadastro
- **Fluxo "Entrar no Reino"** com tela de login
- **7 desafios unicos e progressivos** para criancas a partir de 7 anos
- **Estado global** para rastrear progresso, vidas, XP e cristais
- **Cadastro apos completar o primeiro desafio** (captura do aluno engajado)

---

## Arquitetura do Fluxo

```text
Login Page
  |
  +-- "Entrar no Reino" --> Tela de Login (email/senha mockado)
  |                              |
  |                              v
  |                          Trail Page (progresso salvo)
  |
  +-- "Sou Novo Aqui" --> Onboarding (mascote se apresenta)
                              |
                              v
                         Desafio 1 (tutorial guiado pelo mascote)
                              |
                              v
                         Tela de Sucesso
                              |
                              v
                         Cadastro (nome, idade, avatar)
                              |
                              v
                         Trail Page (fase 1 completa)
```

---

## O que sera implementado

### 1. Mascote "Codie" - Componente Global
Um dragaozinho amigavel que aparece em bolhas de fala em todas as telas, dando dicas e incentivos.
- Componente `MascotBubble` reutilizavel com animacao de entrada
- Posicionamento flutuante no canto inferior ou inline dependendo do contexto
- Diferentes expressoes: feliz, pensativo, comemorando, triste (quando erra)

### 2. Estado Global com React Context
Criar `GameContext` para gerenciar:
- `xp`, `level`, `crystals`, `lives` (com regeneracao)
- `completedLessons: number[]` - fases concluidas
- `currentPhase: number` - fase atual desbloqueada
- `playerName`, `playerAvatar`, `playerAge`
- `isNewUser: boolean` - controla o fluxo de onboarding
- Persistencia em `localStorage`

### 3. Fluxo "Sou Novo Aqui" (Onboarding)
Nova pagina `/onboarding` com 3 passos animados:
1. Mascote se apresenta: "Ola! Eu sou o Codie! Vou te ensinar a programar!"
2. Explica como funciona: "Voce vai resolver desafios e ganhar XP e cristais!"
3. "Pronto pra sua primeira missao?" --> Vai para `/lessons/1`

### 4. 7 Desafios Unicos e Progressivos
Cada fase tera um tipo de desafio diferente, comecando do mais simples:

| Fase | Nome | Tipo de Desafio | Descricao |
|------|------|----------------|-----------|
| 1 | Variaveis Magicas | Escolha simples | "O que e uma variavel?" - escolher a resposta certa entre 3 opcoes |
| 2 | Loops Encantados | Completar a frase | Arrastar a palavra que falta no codigo |
| 3 | Condicoes Secretas | Verdadeiro ou Falso | Avaliar se afirmacoes sobre "se/senao" estao certas |
| 4 | Funcoes do Dragao | Ordenar blocos | Colocar 3 blocos na ordem certa (versao simples do atual) |
| 5 | Arrays do Tesouro | Selecao multipla | Escolher quais itens pertencem a uma lista |
| 6 | Objetos Misticos | Conectar pares | Ligar propriedades aos valores corretos |
| 7 | Boss Final | Quiz misto | 3 perguntas combinando tudo que aprendeu |

### 5. Pagina de Login Real (mockada)
Nova pagina `/login` com campos de nome e senha magica (mockado), para quem ja tem conta.

### 6. Pagina de Cadastro
Nova pagina `/register` exibida apos completar a Fase 1:
- Escolher nome de aventureiro
- Escolher idade (dropdown: 7-14)
- Escolher avatar entre 6 opcoes de emoji
- Mascote incentivando: "Agora voce faz parte do reino!"

### 7. Trail Page Dinamica
- Fases desbloqueiam conforme progresso real do `GameContext`
- Nenhuma fase comeca completa para novos usuarios
- Mascote aparece com dicas contextuais ("Tente a proxima fase!")

### 8. Tela de Sucesso Dinamica
- Mostra recompensas reais (XP e cristais adicionados ao estado)
- Mascote comemora com animacao
- Se for a fase 1 de novo usuario, redireciona para cadastro

---

## Detalhes Tecnicos

### Arquivos novos:
- `src/contexts/GameContext.tsx` - Estado global com Provider
- `src/components/MascotBubble.tsx` - Componente do mascote
- `src/pages/OnboardingPage.tsx` - Fluxo de boas-vindas
- `src/pages/RegisterPage.tsx` - Cadastro pos-desafio
- `src/data/lessons.ts` - Dados de todos os 7 desafios

### Arquivos modificados:
- `src/App.tsx` - Novas rotas + GameProvider
- `src/pages/LoginPage.tsx` - Separar botoes para fluxos diferentes
- `src/pages/TrailPage.tsx` - Usar GameContext para progresso dinamico
- `src/pages/LessonPage.tsx` - Carregar desafio dinamico por ID com tipos variados
- `src/pages/SuccessPage.tsx` - Atualizar estado real + redirecionar cadastro
- `src/pages/LeaderboardPage.tsx` - Usar dados do GameContext
- `src/pages/ProfilePage.tsx` - Usar dados do GameContext
- `src/components/XpBar.tsx` - Conectar ao GameContext

### Tipos de desafio no LessonPage:
O componente renderizara diferentes UIs baseado no `type` do desafio:
- `quiz` - Botoes de multipla escolha
- `fill-blank` - Arrastar palavra para preencher
- `true-false` - Botoes Verdadeiro/Falso
- `order-blocks` - Ordenar blocos (ja existe)
- `multi-select` - Selecionar multiplos itens
- `match-pairs` - Conectar pares
- `mixed-quiz` - Sequencia de perguntas variadas

