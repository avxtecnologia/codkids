import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diamond, Star, Sparkles } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";
import { lessons } from "@/data/lessons";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { completeLesson, addXp, addCrystals, resetLives, isNewUser, isRegistered } = useGame();

  const lessonId = parseInt(id || "1");
  const lesson = lessons.find((l) => l.id === lessonId);

  const xpReward = lesson?.xpReward || 50;
  const crystalReward = lesson?.crystalReward || 15;

  // Apply rewards on mount
  const [rewarded, setRewarded] = useState(false);
  if (!rewarded) {
    completeLesson(lessonId);
    addXp(xpReward);
    addCrystals(crystalReward);
    resetLives();
    setRewarded(true);
  }

  const handleContinue = () => {
    // If new user just completed lesson 1, go to register
    if (isNewUser && lessonId === 1 && !isRegistered) {
      navigate("/register");
    } else {
      navigate("/trail");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold"
          style={{ top: `${15 + i * 12}%`, left: `${10 + (i * 17) % 80}%` }}
          animate={{ y: [-20, 20, -20], rotate: [0, 360], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        >
          <Sparkles size={16 + i * 3} />
        </motion.div>
      ))}

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-8xl mb-6">
        🏆
      </motion.div>

      <motion.h1 className="text-3xl font-black text-gradient-hero text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Missão Completa!
      </motion.h1>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 w-full max-w-sm">
        <MascotBubble message="Você é incrível, jovem mestre! Continue assim e vai dominar a programação! 🌟" mood="celebrating" />
      </motion.div>

      <motion.div className="flex gap-6 mt-6 bg-card rounded-2xl p-6 shadow-card-playful" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex flex-col items-center gap-1">
          <Star className="text-gold fill-gold" size={32} />
          <span className="font-black text-xl">+{xpReward}</span>
          <span className="text-xs text-muted-foreground font-bold">XP</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Diamond className="text-crystal" size={32} />
          <span className="font-black text-xl">+{crystalReward}</span>
          <span className="text-xs text-muted-foreground font-bold">Cristais</span>
        </div>
      </motion.div>

      <motion.div className="w-full max-w-xs mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button variant="hero" size="xl" className="w-full" onClick={handleContinue}>
          {isNewUser && lessonId === 1 && !isRegistered ? "Criar Meu Personagem! 🎭" : "Continuar Jornada 🚀"}
        </Button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
