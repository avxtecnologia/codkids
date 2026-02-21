
# CodeKids - Plataforma Totalmente Funcional + Freemium + Novas Fases

## Problemas Identificados

1. **Boss Final trava**: O componente `MixedQuizChallenge` renderiza sub-desafios via `ChallengeRenderer`, mas ao trocar de pergunta, os componentes internos (Quiz, TrueFalse, FillBlank) nao resetam seu estado porque o React reutiliza a mesma instancia. Falta uma `key` no `ChallengeRenderer` para forcar a recriacao.

2. **Perfil nao funciona**: Os botoes de skin nao fazem nada (sem handler de compra/equipar). Falta metodo `buyAvatar`/`setAvatar` no GameContext. O botao "Area dos Pais" tem `onClick` vazio.

---

## O Que Sera Implementado

### 1. Correcao do Boss Final (Bug Critico)
Adicionar `key={currentQ}` ao `ChallengeRenderer` dentro do `MixedQuizChallenge` para forcar reset de estado a cada sub-pergunta.

### 2. Novas Fases (8-14) - Modulos Avancados
Adicionar 7 novas licoes ao `src/data/lessons.ts` com temas progressivos:

| Fase | Nome | Tipo | Tema |
|------|------|------|------|
| 8 | Strings Magicas | quiz | Textos e palavras no codigo |
| 9 | Operadores Poderosos | fill-blank | Soma, subtracao e comparacao |
| 10 | Depuracao (Debug) | true-false | Encontrar erros no codigo |
| 11 | Eventos do Castelo | order-blocks | Cliques e acoes do usuario |
| 12 | Listas Encadeadas | multi-select | Organizar dados em sequencia |
| 13 | APIs do Reino | match-pairs | Conectar pedidos e respostas |
| 14 | Boss Final II | mixed-quiz | Quiz misto avancado |

### 3. Perfil Funcional
- **Comprar skins**: Ao clicar numa skin, gastar cristais e equipar automaticamente
- **Equipar skins**: Skins ja compradas podem ser re-equipadas com um toque
- **Estado persistente**: Adicionar `ownedSkins: string[]` e metodo `buyAvatar(skinId, cost)` ao GameContext
- **Titulo dinamico**: Baseado no nivel (Aprendiz, Explorador, Mestre, Lenda)
- **Area dos Pais**: Modal simples com PIN "1234" mostrando estatisticas do aluno e opcao de resetar progresso

### 4. Sistema Freemium (Tudo Gratis com Limites)
- **Vidas diarias**: Usuarios gratuitos tem 5 vidas por dia, resetam a meia-noite
- **Regeneracao**: Ao perder todas as vidas, mostrar tela com timer "Novas vidas em X horas" OU botao "Assinar Premium"
- **Premium mockado**: Botao "CodeKids Premium" que mostra beneficios (vidas infinitas, skins exclusivas, sem espera) por R$14,99/mes
- **Paywall suave**: Ao acabar as vidas, oferecer assinatura. Nunca bloquear conteudo, apenas limitar tentativas diarias
- **Badge Premium**: Usuarios premium tem um selo especial no perfil

### 5. Tela de Conclusao de Modulo
Ao completar a fase 7 (Boss Final I), mostrar tela de "Modulo 1 Completo!" com animacao especial antes de desbloquear as fases 8-14. Ao completar a fase 14, mostrar "Mestre do Codigo!" com convite para assinar premium para futuros modulos.

---

## Detalhes Tecnicos

### Arquivos modificados:

**`src/contexts/GameContext.tsx`**
- Adicionar `ownedSkins: string[]`, `isPremium: boolean`, `dailyLivesUsed: number`, `lastLivesReset: string`
- Novos metodos: `buyAvatar(skinId, cost)`, `togglePremium()`, `checkDailyLives()`
- Logica de reset diario de vidas baseada em data

**`src/data/lessons.ts`**
- Adicionar fases 8-14 com conteudo pedagogico adequado para criancas 7+

**`src/pages/LessonPage.tsx`**
- Corrigir `MixedQuizChallenge`: adicionar `key={currentQ}` ao ChallengeRenderer
- Integrar verificacao de vidas diarias (freemium)
- Tela "Sem vidas" atualizada com timer e botao premium

**`src/pages/ProfilePage.tsx`**
- Tornar loja de skins funcional (comprar e equipar)
- Implementar Area dos Pais com dialog protegido por PIN
- Mostrar badge premium se ativo
- Titulo dinamico por nivel

**`src/pages/SuccessPage.tsx`**
- Detectar conclusao do modulo (fase 7 e 14) e mostrar tela especial

**`src/pages/TrailPage.tsx`**
- Separador visual entre Modulo 1 (fases 1-7) e Modulo 2 (fases 8-14)
- Label "Modulo 1: Fundamentos" e "Modulo 2: Avancado"

### Arquivos novos:

**`src/components/PremiumModal.tsx`**
- Modal mostrando beneficios do plano premium R$14,99/mes
- Botao "Assinar" (mockado, futuramente Stripe)
- Lista de beneficios: vidas infinitas, skins exclusivas, sem espera

**`src/components/ParentAreaDialog.tsx`**
- Dialog com campo de PIN (padrao "1234")
- Estatisticas do aluno: tempo jogado, fases completas, acertos
- Botao de gerenciar assinatura e resetar progresso
