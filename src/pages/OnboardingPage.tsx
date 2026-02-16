import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";

const steps = [
  {
    message: "Olá! Eu sou o Codie, seu dragão amigo! 🐲 Vou te ensinar a programar de um jeito mágico e divertido!",
    mood: "waving" as const,
    emoji: "🐲",
    title: "Bem-vindo ao Reino!",
  },
  {
    message: "Aqui você resolve desafios, ganha estrelas ⭐ e cristais 💎, e sobe de nível! É como um jogo!",
    mood: "happy" as const,
    emoji: "🎮",
    title: "Como Funciona?",
  },
  {
    message: "Pronto pra sua primeira missão? Vamos aprender o que é uma variável! É super fácil, eu prometo! 🤞",
    mood: "celebrating" as const,
    emoji: "🚀",
    title: "Primeira Missão!",
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { startNewUserFlow } = useGame();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      startNewUserFlow();
      navigate("/lessons/1");
    }
  };

  const current = steps[step];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      {["✨", "⭐", "💫", "🌟"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ top: `${15 + i * 20}%`, left: `${10 + (i * 23) % 80}%` }}
          animate={{ y: [-15, 15, -15], rotate: [0, 360] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-col items-center gap-6 max-w-sm w-full"
        >
          <motion.div
            className="text-7xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {current.emoji}
          </motion.div>

          <h1 className="text-2xl font-black text-gradient-hero text-center">
            {current.title}
          </h1>

          <MascotBubble message={current.message} mood={current.mood} />

          {/* Progress dots */}
          <div className="flex gap-2 mt-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button variant="hero" size="xl" className="w-full mt-2" onClick={handleNext}>
            {step < steps.length - 1 ? "Continuar ➡️" : "Vamos lá! 🚀"}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
