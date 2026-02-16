import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Lock, Star } from "lucide-react";
import XpBar from "@/components/XpBar";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";
import { lessons } from "@/data/lessons";

const TrailPage = () => {
  const navigate = useNavigate();
  const { completedLessons, currentPhase, xp, maxXp, level, crystals, lives } = useGame();

  const getMascotMessage = () => {
    if (completedLessons.length === 0) return "Sua jornada começa aqui! Toque na primeira fase! 🌟";
    if (completedLessons.length === lessons.length) return "Você completou TUDO! Você é um verdadeiro mestre! 🏆";
    return `Muito bem! Você já completou ${completedLessons.length} fases! Continue assim! 💪`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4">
        <XpBar xp={xp % maxXp} maxXp={maxXp} level={level} crystals={crystals} lives={lives} />
      </div>

      {/* Trail */}
      <div className="flex flex-col items-center gap-2 pt-4 px-4 max-w-md mx-auto">
        <h2 className="text-2xl font-black text-foreground mb-2">🗺️ Mapa da Jornada</h2>

        <MascotBubble message={getMascotMessage()} mood={completedLessons.length === 0 ? "waving" : "happy"} className="mb-4 w-full" />

        {lessons.map((lesson, index) => {
          const isComplete = completedLessons.includes(lesson.id);
          const isCurrent = lesson.id === currentPhase && !isComplete;
          const isLocked = lesson.id > currentPhase;

          const offset = index % 2 === 0 ? -40 : 40;

          return (
            <div key={lesson.id} className="flex flex-col items-center">
              {index > 0 && (
                <div className={`w-1 h-8 rounded-full ${isComplete || isCurrent ? "bg-primary" : "bg-node-locked"}`} />
              )}

              <motion.button
                style={{ marginLeft: offset }}
                className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center text-2xl border-4 transition-colors
                  ${isComplete ? "bg-primary border-primary" : ""}
                  ${isCurrent ? "bg-node-current border-node-current animate-pulse-glow" : ""}
                  ${isLocked ? "bg-muted border-node-locked cursor-not-allowed" : ""}
                `}
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => { if (!isLocked) navigate(`/lessons/${lesson.id}`); }}
                disabled={isLocked}
              >
                {isComplete ? (
                  <Check className="text-primary-foreground" size={28} />
                ) : isLocked ? (
                  <Lock className="text-node-locked" size={22} />
                ) : (
                  <span>{lesson.icon}</span>
                )}

                {isCurrent && (
                  <motion.div className="absolute -top-2 -right-2" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Star className="text-gold fill-gold" size={20} />
                  </motion.div>
                )}
              </motion.button>

              <span
                className={`mt-1 text-xs font-bold text-center max-w-[100px] ${isLocked ? "text-muted-foreground" : "text-foreground"}`}
                style={{ marginLeft: offset }}
              >
                {lesson.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-3 max-w-md mx-auto">
          <button onClick={() => navigate("/trail")} className="flex flex-col items-center gap-0.5 text-primary">
            <span className="text-xl">🗺️</span>
            <span className="text-xs font-bold">Jornada</span>
          </button>
          <button onClick={() => navigate("/leaderboard")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xl">🏆</span>
            <span className="text-xs font-bold">Ranking</span>
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xl">🎒</span>
            <span className="text-xs font-bold">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailPage;
