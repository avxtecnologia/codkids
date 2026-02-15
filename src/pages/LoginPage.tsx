import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import castleGate from "@/assets/castle-gate.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Floating sparkles */}
      <motion.div
        className="absolute top-20 left-10 text-gold"
        animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles size={28} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-crystal"
        animate={{ y: [10, -10, 10], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Sparkles size={22} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-20 text-secondary"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles size={18} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-6 max-w-md w-full"
      >
        {/* Castle image */}
        <motion.img
          src={castleGate}
          alt="Entrada do Reino CodeKids"
          className="w-64 h-64 object-cover rounded-3xl shadow-card-playful"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />

        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-4xl font-black text-gradient-hero leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            CodeKids
          </motion.h1>
          <motion.p
            className="text-lg font-semibold text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Jornada dos Mestres do Código
          </motion.p>
        </div>

        {/* Login buttons */}
        <motion.div
          className="flex flex-col gap-3 w-full mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={() => navigate("/trail")}
          >
            <Wand2 className="!size-5" />
            Entrar no Reino
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/trail")}
          >
            🌟 Sou Novo Aqui
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Aprenda programação de um jeito mágico! ✨
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
