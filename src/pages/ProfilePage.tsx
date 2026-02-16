import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diamond, Star, Heart, Shield, Palette } from "lucide-react";
import MascotBubble from "@/components/MascotBubble";
import { useGame } from "@/contexts/GameContext";

const skins = [
  { id: "wizard", emoji: "🧙‍♂️", name: "Mago", cost: 0, owned: true },
  { id: "knight", emoji: "🦸‍♂️", name: "Cavaleiro", cost: 50 },
  { id: "elf", emoji: "🧝", name: "Elfo", cost: 100 },
  { id: "dragon", emoji: "🐉", name: "Dragão", cost: 200 },
  { id: "robot", emoji: "🤖", name: "Robô", cost: 150 },
  { id: "astronaut", emoji: "🧑‍🚀", name: "Astronauta", cost: 300 },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { xp, level, crystals, completedLessons, playerName, playerAvatar } = useGame();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 max-w-md mx-auto">
        <motion.div className="flex flex-col items-center pt-6 pb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center text-5xl shadow-playful">
            {playerAvatar}
          </div>
          <h1 className="text-xl font-black mt-3">{playerName || "Aventureiro"}</h1>
          <p className="text-muted-foreground font-semibold text-sm">Nível {level} • Aprendiz</p>
        </motion.div>

        <MascotBubble message={`Você já completou ${completedLessons.length} fases! Continue explorando! 🗺️`} mood="happy" className="mb-4" />

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Star className="text-gold" size={22} />, value: String(xp), label: "XP Total" },
            { icon: <Diamond className="text-crystal" size={22} />, value: String(crystals), label: "Cristais" },
            { icon: <Heart className="text-heart fill-heart" size={22} />, value: String(completedLessons.length), label: "Fases" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 flex flex-col items-center gap-1 shadow-card-playful">
              {stat.icon}
              <span className="font-black text-lg">{stat.value}</span>
              <span className="text-[10px] text-muted-foreground font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={18} className="text-crystal" />
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Loja de Skins</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {skins.map((skin) => {
              const owned = skin.owned || crystals >= skin.cost;
              return (
                <motion.button
                  key={skin.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl ${
                    skin.emoji === playerAvatar
                      ? "bg-primary/15 border-2 border-primary shadow-playful"
                      : "bg-card shadow-card-playful border-2 border-transparent"
                  }`}
                >
                  <span className="text-3xl">{skin.emoji}</span>
                  <span className="text-xs font-bold">{skin.name}</span>
                  {!skin.owned && (
                    <span className="flex items-center gap-0.5 text-[10px] text-crystal font-bold">
                      <Diamond size={10} /> {skin.cost}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={() => {}}>
          <Shield size={16} /> Área dos Pais
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-3 max-w-md mx-auto">
          <button onClick={() => navigate("/trail")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xl">🗺️</span>
            <span className="text-xs font-bold">Jornada</span>
          </button>
          <button onClick={() => navigate("/leaderboard")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xl">🏆</span>
            <span className="text-xs font-bold">Ranking</span>
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-0.5 text-primary">
            <span className="text-xl">🎒</span>
            <span className="text-xs font-bold">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
