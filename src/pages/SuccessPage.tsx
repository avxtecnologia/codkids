import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diamond, Star, Sparkles } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold"
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + (i * 17) % 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles size={16 + i * 3} />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-8xl mb-6"
      >
        🏆
      </motion.div>

      <motion.h1
        className="text-3xl font-black text-gradient-hero text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Missão Completa!
      </motion.h1>

      <motion.p
        className="text-muted-foreground font-semibold mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Você é incrível, jovem mestre! 🌟
      </motion.p>

      {/* Rewards */}
      <motion.div
        className="flex gap-6 mt-8 bg-card rounded-2xl p-6 shadow-card-playful"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex flex-col items-center gap-1">
          <Star className="text-gold fill-gold" size={32} />
          <span className="font-black text-xl">+50</span>
          <span className="text-xs text-muted-foreground font-bold">XP</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Diamond className="text-crystal" size={32} />
          <span className="font-black text-xl">+15</span>
          <span className="text-xs text-muted-foreground font-bold">Cristais</span>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-xs mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={() => navigate("/trail")}
        >
          Continuar Jornada 🚀
        </Button>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
