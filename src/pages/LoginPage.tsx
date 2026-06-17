import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Wand2, Loader2 } from "lucide-react";
const castleGate = "/uploads/mario-castle.png";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, startNewUserFlow } = useGame();
  const { signIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    setLoading(true);
    setErrorMsg("");
    const { error } = await signIn(loginEmail.trim(), loginPassword);
    setLoading(false);
    if (error) {
      setErrorMsg("Ops! Email ou senha incorretos. Tenta de novo! 🐲");
      return;
    }
    if (loginName.trim()) login(loginName.trim());
    navigate("/trail");
  };

  const handleNewUser = () => {
    startNewUserFlow();
    navigate("/onboarding");
  };

  if (showLogin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm w-full flex flex-col gap-6"
        >
          <h1 className="text-2xl font-black text-gradient-hero text-center">
            Entrar no Reino 🏰
          </h1>

          <MascotBubble message="Bem-vindo de volta, aventureiro! Digite seu email e senha para entrar!" mood="happy" />

          <div>
            <label className="text-sm font-bold text-muted-foreground mb-2 block">
              Nome Mágico (opcional)
            </label>
            <Input
              placeholder="Seu nome de aventureiro"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="rounded-xl text-base font-semibold"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-muted-foreground mb-2 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="email@exemplo.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="rounded-xl text-base font-semibold"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-muted-foreground mb-2 block">
              Senha Secreta
            </label>
            <Input
              type="password"
              placeholder="Sua senha mágica"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="rounded-xl text-base font-semibold"
            />
          </div>

          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold text-destructive text-center bg-destructive/10 rounded-xl p-3"
            >
              {errorMsg}
            </motion.p>
          )}

          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={handleLogin}
            disabled={!loginEmail.trim() || !loginPassword.trim() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="!size-5 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <Wand2 className="!size-5" />
                Entrar!
              </>
            )}
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => setShowLogin(false)} disabled={loading}>
            ← Voltar
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden relative">
      {/* Floating sparkles */}
      <motion.div className="absolute top-20 left-10 text-gold" animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        <Sparkles size={28} />
      </motion.div>
      <motion.div className="absolute top-40 right-16 text-crystal" animate={{ y: [10, -10, 10], rotate: [0, -15, 15, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
        <Sparkles size={22} />
      </motion.div>
      <motion.div className="absolute bottom-32 left-20 text-secondary" animate={{ y: [-8, 8, -8] }} transition={{ duration: 3, repeat: Infinity }}>
        <Sparkles size={18} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-6 max-w-md w-full"
      >
        <motion.img
          src={castleGate}
          alt="Entrada do Reino CodeKids"
          className="w-64 h-64 object-cover rounded-3xl shadow-card-playful"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />

        <div className="text-center">
          <motion.h1 className="text-4xl font-black leading-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
CodeKids
          </motion.h1>
          <motion.p className="text-lg font-semibold text-muted-foreground mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Jornada dos Mestres do Código
          </motion.p>
        </div>

        <motion.div className="flex flex-col gap-3 w-full mt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Button variant="hero" size="xl" className="w-full" onClick={() => setShowLogin(true)}>
            <Wand2 className="!size-5" />
            Entrar no Reino
          </Button>

          <Button variant="outline" size="lg" className="w-full" onClick={handleNewUser}>
            🌟 Sou iniciante aqui!
          </Button>
        </motion.div>

        <motion.p className="text-sm text-muted-foreground text-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Aprenda programação de um jeito mágico! ✨
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
