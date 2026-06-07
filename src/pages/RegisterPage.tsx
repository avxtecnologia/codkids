import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";
import { useAuth } from "@/hooks/useAuth";

const avatars = ["🧙‍♂️", "🧝", "🦸‍♂️", "👩‍🔬", "🧑‍🚀", "🧚"];
const ages = [7, 8, 9, 10, 11, 12, 13, 14];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useGame();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🧙‍♂️");
  const [selectedAge, setSelectedAge] = useState(8);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 6;

  const handleRegister = async () => {
    if (!isValid) return;
    setLoading(true);
    setErrorMsg("");
    const { error } = await signUp(email.trim(), password);
    if (error) {
      setLoading(false);
      const msg = (error as any).message?.toLowerCase?.() ?? "";
      if (msg.includes("already") || msg.includes("registered") || msg.includes("exists")) {
        setErrorMsg("Este email já tem uma conta! Tenta fazer login. 🧙‍♂️");
      } else {
        setErrorMsg("Ops! Não consegui criar sua conta. Tenta de novo! 🐲");
      }
      return;
    }
    // GameContext will detect new user_id and upsert profile with these values
    register(name.trim(), selectedAvatar, selectedAge);
    setLoading(false);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm w-full flex flex-col gap-6"
      >
        <h1 className="text-2xl font-black text-gradient-hero text-center">
          Crie seu Personagem! 🎭
        </h1>

        <MascotBubble
          message="Agora você faz parte do reino! Escolha seu nome de aventureiro e seu avatar!"
          mood="celebrating"
        />

        {/* Name */}
        <div>
          <label className="text-sm font-bold text-muted-foreground mb-2 block">
            Nome de Aventureiro
          </label>
          <Input
            placeholder="Ex: Super Coder"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl text-base font-semibold"
            maxLength={20}
          />
        </div>

        {/* Parent Email */}
        <div>
          <label className="text-sm font-bold text-muted-foreground mb-2 block">
            Email dos pais (para relatórios de progresso)
          </label>
          <Input
            type="email"
            placeholder="pais@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl text-base font-semibold"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-bold text-muted-foreground mb-2 block">
            Crie uma senha secreta
          </label>
          <Input
            type="password"
            placeholder="Mínimo 6 letrinhas"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl text-base font-semibold"
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-sm font-bold text-muted-foreground mb-2 block">
            Sua Idade
          </label>
          <div className="flex flex-wrap gap-2">
            {ages.map((age) => (
              <motion.button
                key={age}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedAge(age)}
                className={`w-11 h-11 rounded-xl font-black text-sm transition-colors ${
                  selectedAge === age
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground"
                }`}
              >
                {age}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label className="text-sm font-bold text-muted-foreground mb-2 block">
            Escolha seu Avatar
          </label>
          <div className="grid grid-cols-3 gap-3">
            {avatars.map((avatar) => (
              <motion.button
                key={avatar}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedAvatar(avatar)}
                className={`h-20 rounded-2xl text-4xl flex items-center justify-center transition-all ${
                  selectedAvatar === avatar
                    ? "bg-primary/15 border-2 border-primary shadow-playful"
                    : "bg-card border-2 border-border"
                }`}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
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
          onClick={handleRegister}
          disabled={!isValid || loading}
        >
          {loading ? (
            <>
              <Loader2 className="!size-5 animate-spin" />
              Criando...
            </>
          ) : (
            <>Entrar no Reino! 🏰</>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
