import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Play, RotateCcw, Check } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";
import { lessons } from "@/data/lessons";
import type { Lesson, QuizLesson, FillBlankLesson, TrueFalseLesson, OrderBlocksLesson, MultiSelectLesson, MatchPairsLesson, MixedQuizLesson } from "@/data/lessons";

const LessonPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lives, loseLife } = useGame();
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(true);

  const lessonId = parseInt(id || "1");
  const lesson = lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground font-bold">Fase não encontrada!</p>
      </div>
    );
  }

  const handleCorrect = () => {
    setFeedback("correct");
    setTimeout(() => navigate(`/lessons/${lessonId}/success`), 1500);
  };

  const handleWrong = () => {
    setFeedback("wrong");
    loseLife();
    setTimeout(() => setFeedback(null), 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <button onClick={() => navigate("/trail")}>
          <ArrowLeft className="text-foreground" size={24} />
        </button>
        <h2 className="font-black text-lg">{lesson.icon} {lesson.name}</h2>
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} size={20} className={i < lives ? "text-heart fill-heart" : "text-muted-foreground"} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full flex flex-col gap-4">
        {showHint && (
          <MascotBubble
            message={lesson.challenge.mascotHint}
            mood="thinking"
            className="w-full"
          />
        )}

        <ChallengeRenderer
          challenge={lesson.challenge}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              feedback === "correct" ? "bg-primary/20" : "bg-destructive/20"
            }`}
          >
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-6xl">
              {feedback === "correct" ? "🎉" : "❌"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---- Challenge Renderers ----

interface ChallengeProps {
  challenge: Lesson["challenge"];
  onCorrect: () => void;
  onWrong: () => void;
}

const ChallengeRenderer = ({ challenge, onCorrect, onWrong }: ChallengeProps) => {
  switch (challenge.type) {
    case "quiz":
      return <QuizChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "fill-blank":
      return <FillBlankChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "true-false":
      return <TrueFalseChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "order-blocks":
      return <OrderBlocksChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "multi-select":
      return <MultiSelectChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "match-pairs":
      return <MatchPairsChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    case "mixed-quiz":
      return <MixedQuizChallenge challenge={challenge} onCorrect={onCorrect} onWrong={onWrong} />;
    default:
      return null;
  }
};

// Quiz (multiple choice)
const QuizChallenge = ({ challenge, onCorrect, onWrong }: { challenge: QuizLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    if (id === challenge.correctId) {
      onCorrect();
    } else {
      onWrong();
      setTimeout(() => setSelected(null), 1300);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold text-foreground text-center">{challenge.question}</p>
      <div className="flex flex-col gap-3">
        {challenge.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(opt.id)}
            className={`p-4 rounded-2xl text-left font-bold text-base transition-all border-2 ${
              selected === opt.id
                ? opt.id === challenge.correctId
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-destructive/20 border-destructive text-destructive"
                : "bg-card border-border text-foreground shadow-card-playful"
            }`}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Fill in the blank
const FillBlankChallenge = ({ challenge, onCorrect, onWrong }: { challenge: FillBlankLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const parts = challenge.sentence.split("___");

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === challenge.correctOption) {
      onCorrect();
    } else {
      onWrong();
      setTimeout(() => setSelected(null), 1300);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-card rounded-2xl p-5 shadow-card-playful border border-border">
        <p className="text-base font-bold text-foreground font-mono leading-relaxed">
          {parts[0]}
          <span className={`inline-block min-w-[80px] px-3 py-1 mx-1 rounded-xl text-center border-2 border-dashed ${
            selected
              ? selected === challenge.correctOption
                ? "bg-primary/20 border-primary text-primary"
                : "bg-destructive/20 border-destructive text-destructive"
              : "border-primary/50 text-muted-foreground"
          }`}>
            {selected || "???"}
          </span>
          {parts[1]}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {challenge.options.map((opt) => (
          <motion.button
            key={opt}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(opt)}
            disabled={!!selected}
            className={`px-5 py-3 rounded-xl font-bold text-base transition-colors ${
              selected === opt
                ? opt === challenge.correctOption
                  ? "bg-primary text-primary-foreground"
                  : "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground shadow-playful"
            }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// True or False
const TrueFalseChallenge = ({ challenge, onCorrect, onWrong }: { challenge: TrueFalseLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);

  const stmt = challenge.statements[currentIndex];

  const handleAnswer = (answer: boolean) => {
    if (answered) return;
    setAnswered(true);

    if (answer === stmt.correct) {
      if (currentIndex === challenge.statements.length - 1) {
        onCorrect();
      } else {
        setTimeout(() => {
          setCurrentIndex((i) => i + 1);
          setAnswered(false);
        }, 800);
      }
    } else {
      onWrong();
      setTimeout(() => setAnswered(false), 1300);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide text-center">
        Pergunta {currentIndex + 1} de {challenge.statements.length}
      </p>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-2xl p-6 shadow-card-playful border border-border"
      >
        <p className="text-base font-bold text-foreground text-center">{stmt.text}</p>
      </motion.div>

      <div className="flex gap-4">
        <Button
          variant="hero"
          size="lg"
          className="flex-1"
          onClick={() => handleAnswer(true)}
          disabled={answered}
        >
          ✅ Verdadeiro
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
          onClick={() => handleAnswer(false)}
          disabled={answered}
        >
          ❌ Falso
        </Button>
      </div>
    </div>
  );
};

// Order blocks
const OrderBlocksChallenge = ({ challenge, onCorrect, onWrong }: { challenge: OrderBlocksLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState(challenge.blocks.map((b) => b.id));

  const addBlock = (id: string) => {
    setPlaced((p) => [...p, id]);
    setAvailable((a) => a.filter((x) => x !== id));
  };

  const removeBlock = (id: string) => {
    setPlaced((p) => p.filter((x) => x !== id));
    setAvailable((a) => [...a, id]);
  };

  const checkAnswer = () => {
    if (JSON.stringify(placed) === JSON.stringify(challenge.correctOrder)) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const reset = () => {
    setPlaced([]);
    setAvailable(challenge.blocks.map((b) => b.id));
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-bold text-foreground text-center">{challenge.instruction}</p>

      <div className="bg-card rounded-2xl border-2 border-dashed border-border p-4 min-h-[140px] shadow-card-playful">
        <p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wide">Área de Execução</p>
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {placed.map((blockId) => {
              const block = challenge.blocks.find((b) => b.id === blockId)!;
              return (
                <motion.button
                  key={blockId}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-secondary text-secondary-foreground font-bold py-3 px-4 rounded-xl text-sm text-left"
                  onClick={() => removeBlock(blockId)}
                >
                  {block.label}
                </motion.button>
              );
            })}
          </AnimatePresence>
          {placed.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-6">Toque nos blocos abaixo ⬇️</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wide">Blocos Disponíveis</p>
        <div className="flex flex-wrap gap-2">
          {available.map((blockId) => {
            const block = challenge.blocks.find((b) => b.id === blockId)!;
            return (
              <motion.button
                key={blockId}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm"
                onClick={() => addBlock(blockId)}
              >
                {block.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <Button variant="ghost" size="lg" onClick={reset} className="flex-1">
          <RotateCcw size={18} /> Resetar
        </Button>
        <Button variant="hero" size="lg" onClick={checkAnswer} disabled={placed.length !== challenge.blocks.length} className="flex-1">
          <Play size={18} /> Verificar
        </Button>
      </div>
    </div>
  );
};

// Multi select
const MultiSelectChallenge = ({ challenge, onCorrect, onWrong }: { challenge: MultiSelectLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const toggle = (id: string) => {
    if (checked) return;
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const checkAnswer = () => {
    setChecked(true);
    const sortedSelected = [...selected].sort();
    const sortedCorrect = [...challenge.correctIds].sort();
    if (JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)) {
      onCorrect();
    } else {
      onWrong();
      setTimeout(() => { setChecked(false); setSelected([]); }, 1300);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-bold text-foreground text-center">{challenge.question}</p>
      <p className="text-sm text-muted-foreground text-center">Selecione todos que se encaixam!</p>

      <div className="flex flex-col gap-3">
        {challenge.options.map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(opt.id)}
            className={`p-4 rounded-2xl text-left font-bold text-base transition-all border-2 flex items-center gap-3 ${
              selected.includes(opt.id)
                ? "bg-primary/15 border-primary text-primary"
                : "bg-card border-border text-foreground shadow-card-playful"
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
              selected.includes(opt.id) ? "bg-primary border-primary" : "border-border"
            }`}>
              {selected.includes(opt.id) && <Check size={14} className="text-primary-foreground" />}
            </div>
            {opt.label}
          </motion.button>
        ))}
      </div>

      <Button variant="hero" size="lg" onClick={checkAnswer} disabled={selected.length === 0 || checked} className="w-full">
        <Play size={18} /> Verificar
      </Button>
    </div>
  );
};

// Match pairs
const MatchPairsChallenge = ({ challenge, onCorrect, onWrong }: { challenge: MatchPairsLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const shuffledRight = useState(() => [...challenge.pairs].sort(() => Math.random() - 0.5).map(p => p.right))[0];

  const handleLeftClick = (left: string) => {
    if (matched.includes(left)) return;
    setSelectedLeft(left);
  };

  const handleRightClick = (right: string) => {
    if (!selectedLeft) return;
    const pair = challenge.pairs.find((p) => p.left === selectedLeft);
    if (pair && pair.right === right) {
      setMatched((m) => [...m, selectedLeft]);
      setSelectedLeft(null);
      if (matched.length + 1 === challenge.pairs.length) {
        setTimeout(onCorrect, 500);
      }
    } else {
      onWrong();
      setSelectedLeft(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-bold text-foreground text-center">{challenge.instruction}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {challenge.pairs.map((pair) => (
            <motion.button
              key={pair.left}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLeftClick(pair.left)}
              className={`p-3 rounded-xl font-bold text-sm transition-all border-2 ${
                matched.includes(pair.left)
                  ? "bg-primary/20 border-primary text-primary opacity-60"
                  : selectedLeft === pair.left
                  ? "bg-secondary/30 border-secondary text-secondary"
                  : "bg-card border-border text-foreground"
              }`}
              disabled={matched.includes(pair.left)}
            >
              {pair.left}
            </motion.button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledRight.map((right) => {
            const isMatched = challenge.pairs.some((p) => p.right === right && matched.includes(p.left));
            return (
              <motion.button
                key={right}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRightClick(right)}
                className={`p-3 rounded-xl font-bold text-sm transition-all border-2 ${
                  isMatched
                    ? "bg-primary/20 border-primary text-primary opacity-60"
                    : "bg-card border-border text-foreground"
                }`}
                disabled={isMatched || !selectedLeft}
              >
                {right}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Mixed quiz (Boss)
const MixedQuizChallenge = ({ challenge, onCorrect, onWrong }: { challenge: MixedQuizLesson; onCorrect: () => void; onWrong: () => void }) => {
  const [currentQ, setCurrentQ] = useState(0);

  const handleSubCorrect = () => {
    if (currentQ === challenge.questions.length - 1) {
      onCorrect();
    } else {
      setTimeout(() => setCurrentQ((i) => i + 1), 800);
    }
  };

  const q = challenge.questions[currentQ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide text-center">
        Boss Final • Pergunta {currentQ + 1} de {challenge.questions.length}
      </p>

      <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
        <ChallengeRenderer challenge={q} onCorrect={handleSubCorrect} onWrong={onWrong} />
      </motion.div>
    </div>
  );
};

export default LessonPage;
