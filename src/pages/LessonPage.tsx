import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Play, RotateCcw } from "lucide-react";

const challengeBlocks = [
  { id: "print", label: 'print("Olá!")', color: "bg-secondary" },
  { id: "var", label: "nome = input()", color: "bg-primary" },
  { id: "if", label: "se idade > 10:", color: "bg-accent" },
  { id: "loop", label: "repita 3 vezes:", color: "bg-crystal" },
];

const correctOrder = ["var", "if", "print", "loop"];

const LessonPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lives, setLives] = useState(3);
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState(challengeBlocks.map((b) => b.id));
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const addBlock = (blockId: string) => {
    setPlaced((prev) => [...prev, blockId]);
    setAvailable((prev) => prev.filter((id) => id !== blockId));
  };

  const removeBlock = (blockId: string) => {
    setPlaced((prev) => prev.filter((id) => id !== blockId));
    setAvailable((prev) => [...prev, blockId]);
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(placed) === JSON.stringify(correctOrder);
    if (isCorrect) {
      setFeedback("correct");
      setTimeout(() => navigate(`/lessons/${id}/success`), 1500);
    } else {
      setFeedback("wrong");
      setLives((prev) => Math.max(0, prev - 1));
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const reset = () => {
    setPlaced([]);
    setAvailable(challengeBlocks.map((b) => b.id));
    setFeedback(null);
  };

  const getBlock = (id: string) => challengeBlocks.find((b) => b.id === id)!;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <button onClick={() => navigate("/trail")}>
          <ArrowLeft className="text-foreground" size={24} />
        </button>
        <h2 className="font-black text-lg">🧩 Desafio #{id}</h2>
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              size={20}
              className={i < lives ? "text-heart fill-heart" : "text-muted-foreground"}
            />
          ))}
        </div>
      </div>

      {/* Instruction */}
      <div className="px-4 py-6 text-center">
        <p className="text-muted-foreground font-semibold">
          Organize os blocos na ordem correta para criar o programa! 🧙‍♂️
        </p>
      </div>

      {/* Drop zone */}
      <div className="flex-1 px-4">
        <div className="bg-card rounded-2xl border-2 border-dashed border-border p-4 min-h-[180px] shadow-card-playful">
          <p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wide">
            Área de Execução
          </p>
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {placed.map((blockId) => {
                const block = getBlock(blockId);
                return (
                  <motion.button
                    key={blockId}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className={`${block.color} text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm text-left`}
                    onClick={() => removeBlock(blockId)}
                  >
                    {block.label}
                  </motion.button>
                );
              })}
            </AnimatePresence>
            {placed.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">
                Toque nos blocos abaixo para adicioná-los aqui ⬇️
              </p>
            )}
          </div>
        </div>

        {/* Available blocks */}
        <div className="mt-6">
          <p className="text-xs text-muted-foreground font-bold mb-3 uppercase tracking-wide">
            Blocos Disponíveis
          </p>
          <div className="flex flex-wrap gap-2">
            {available.map((blockId) => {
              const block = getBlock(blockId);
              return (
                <motion.button
                  key={blockId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${block.color} text-primary-foreground font-bold py-3 px-4 rounded-xl text-sm`}
                  onClick={() => addBlock(blockId)}
                >
                  {block.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              feedback === "correct"
                ? "bg-primary/20"
                : "bg-destructive/20"
            }`}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-6xl"
            >
              {feedback === "correct" ? "🎉" : "❌"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="p-4 flex gap-3">
        <Button variant="ghost" size="lg" onClick={reset} className="flex-1">
          <RotateCcw size={18} />
          Resetar
        </Button>
        <Button
          variant="hero"
          size="lg"
          onClick={checkAnswer}
          disabled={placed.length !== challengeBlocks.length}
          className="flex-1"
        >
          <Play size={18} />
          Verificar
        </Button>
      </div>
    </div>
  );
};

export default LessonPage;
