import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diamond, Star, Sparkles, Crown } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import PremiumModal from "@/components/PremiumModal";
import { useGame } from "@/contexts/GameContext";
import { lessons } from "@/data/lessons";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { completeLesson, addXp, addCrystals, resetLives, isNewUser, isRegistered, completedLessons } = useGame();
  const rewarded = useRef(false);
  const [showPremium, setShowPremium] = useState(false);

  const lessonId = parseInt(id || "1");
  const lesson = lessons.find((l) => l.id === lessonId);

  const xpReward = lesson?.xpReward || 50;
  const crystalReward = lesson?.crystalReward || 15;

  const isModule1Complete = lessonId === 5;
  const isModule2Complete = lessonId === 10;
  const isModule3Complete = lessonId === 14;
  const isModuleMilestone = isModule1Complete || isModule2Complete || isModule3Complete;

  useEffect(() => {
    if (!rewarded.current) {
      rewarded.current = true;
      completeLesson(lessonId);
      addXp(xpReward);
      addCrystals(crystalReward);
      resetLives();
    }
  }, []);

  const handleContinue = () => {
    if (isNewUser && lessonId === 1 && !isRegistered) {
      navigate("/register");
    } else {
      navigate("/trail");
    }
  };

  if (isModuleMilestone) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold"
            style={{ top: `${10 + i * 10}%`, left: `${5 + (i * 13) % 90}%` }}
            animate={{ y: [-20, 20, -20], rotate: [0, 360], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
          >
            <Sparkles size={14 + i * 3} />
          </motion.div>
        ))}

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="text-9xl mb-4">
          {isModule3Complete ? "🚀" : isModule2Complete ? "💬" : "🧠"}
        </motion.div>

        <motion.h1
          className="text-3xl font-black text-gradient-hero text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          {isModule3Complete ? "Mestre da IA!" : isModule2Complete ? "Módulo 2 Completo!" : "Módulo 1 Completo!"}
        </motion.h1>

        <motion.p
          className="text-muted-foreground font-bold text-center mt-2 max-w-xs"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {isModule3Complete
            ? "Você criou seu primeiro app com IA! Você é oficialmente um Mestre do Vibecode!"
            : isModule2Complete
            ? "Você já sabe conversar com a IA! Agora é hora de CRIAR apps de verdade!"
            : "Parabéns! Você entendeu o que é IA! Agora vamos aprender a conversar com ela!"
          }
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4">
          <MascotBubble
            message={isModule3Complete
              ? "INCRÍVEL! Você completou tudo! Continue criando coisas mágicas! 🌟"
              : isModule2Complete
              ? "Uau! Você é craque em prompts! Bora criar apps de verdade! 🚀"
              : "Muito bem! Agora vem a parte mais legal: falar com a IA! 💬"
            }
            mood="celebrating"
          />
        </motion.div>

        <motion.div className="flex gap-6 mt-6 bg-card rounded-2xl p-6 shadow-card-playful" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="flex flex-col items-center gap-1">
            <Star className="text-gold fill-gold" size={32} />
            <span className="font-black text-xl">+{xpReward}</span>
            <span className="text-xs text-muted-foreground font-bold">XP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Diamond className="text-crystal fill-crystal" size={32} />
            <span className="font-black text-xl">+{crystalReward}</span>
            <span className="text-xs text-muted-foreground font-bold">Cristais</span>
          </div>
        </motion.div>

        <motion.div className="w-full max-w-xs mt-8 flex flex-col gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Button variant="hero" size="xl" className="w-full" onClick={handleContinue}>
            {isModule3Complete ? "Voltar à Jornada 🏰" : isModule2Complete ? "Criar meu App! 🚀" : "Explorar Módulo 2 💬"}
          </Button>
          {isModule3Complete && (
            <Button variant="gold" size="lg" className="w-full" onClick={() => setShowPremium(true)}>
              <Crown size={18} /> Assinar Premium
            </Button>
          )}
        </motion.div>

        <PremiumModal open={showPremium} onOpenChange={setShowPremium} />
      </div>
    );
  }

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
          <Diamond className="text-crystal fill-crystal" size={32} />
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
