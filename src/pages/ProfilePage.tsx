import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Diamond, Star, Heart, Shield, Palette, Crown, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MascotBubble from "@/components/MascotBubble";
import ParentAreaDialog from "@/components/ParentAreaDialog";
import PremiumModal from "@/components/PremiumModal";
import { useGame } from "@/contexts/GameContext";
import { useToast } from "@/hooks/use-toast";

const skins = [
  { id: "wizard", emoji: "🧙‍♂️", name: "Mago", cost: 0 },
  { id: "knight", emoji: "🦸‍♂️", name: "Cavaleiro", cost: 50 },
  { id: "elf", emoji: "🧝", name: "Elfo", cost: 100 },
  { id: "dragon", emoji: "🐉", name: "Dragão", cost: 200 },
  { id: "robot", emoji: "🤖", name: "Robô", cost: 150 },
  { id: "astronaut", emoji: "🧑‍🚀", name: "Astronauta", cost: 300 },
];

const getTitle = (level: number) => {
  if (level >= 10) return "Lenda";
  if (level >= 6) return "Mestre";
  if (level >= 3) return "Explorador";
  return "Aprendiz";
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { xp, level, crystals, completedLessons, playerName, playerAvatar, ownedSkins, isPremium, buyAvatar, equipAvatar } = useGame();
  const [showParentArea, setShowParentArea] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  const handleSkinClick = (skin: typeof skins[0]) => {
    if (skin.emoji === playerAvatar) return; // already equipped

    if (ownedSkins.includes(skin.id)) {
      equipAvatar(skin.emoji);
      toast({ title: `${skin.name} equipado!`, description: `Agora você é um ${skin.name}!` });
      return;
    }

    if (crystals < skin.cost) {
      toast({ title: "Cristais insuficientes!", description: `Você precisa de ${skin.cost} cristais.`, variant: "destructive" });
      return;
    }

    const success = buyAvatar(skin.id, skin.cost);
    if (success) {
      equipAvatar(skin.emoji);
      toast({ title: `${skin.name} comprado e equipado!`, description: `Gastou ${skin.cost} cristais.` });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 max-w-md mx-auto">
        <motion.div className="flex flex-col items-center pt-6 pb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center text-5xl shadow-playful">
              {playerAvatar}
            </div>
            {isPremium && (
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Crown className="text-accent-foreground" size={16} />
              </div>
            )}
          </div>
          <h1 className="text-xl font-black mt-3 flex items-center gap-2">
            {playerName || "Aventureiro"}
            {isPremium && <Badge className="bg-accent text-accent-foreground text-[10px]">Premium</Badge>}
          </h1>
          <p className="text-muted-foreground font-semibold text-sm">Nível {level} • {getTitle(level)}</p>
        </motion.div>

        <MascotBubble message={`Você já completou ${completedLessons.length} fases! Continue explorando! 🗺️`} mood="happy" className="mb-4" />

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Star className="text-gold fill-gold" size={22} />, value: String(xp), label: "XP Total" },
            { icon: <Diamond className="text-crystal fill-crystal" size={22} />, value: String(crystals), label: "Cristais" },
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
              const owned = ownedSkins.includes(skin.id);
              const equipped = skin.emoji === playerAvatar;
              const canAfford = crystals >= skin.cost;
              return (
                <motion.button
                  key={skin.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkinClick(skin)}
                  className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl ${
                    equipped
                      ? "bg-primary/15 border-2 border-primary shadow-playful"
                      : owned
                      ? "bg-card shadow-card-playful border-2 border-primary/30"
                      : "bg-card shadow-card-playful border-2 border-transparent"
                  }`}
                >
                  {equipped && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="text-primary-foreground" size={12} />
                    </div>
                  )}
                  <span className="text-3xl">{skin.emoji}</span>
                  <span className="text-xs font-bold">{skin.name}</span>
                  {!owned && (
                    <span className={`flex items-center gap-0.5 text-[10px] font-bold ${canAfford ? "text-crystal" : "text-muted-foreground"}`}>
                      <Diamond size={10} /> {skin.cost}
                    </span>
                  )}
                  {owned && !equipped && (
                    <span className="text-[10px] text-primary font-bold">Equipar</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {!isPremium && (
          <Button variant="gold" className="w-full mb-3" onClick={() => setShowPremium(true)}>
            <Crown size={16} /> CodeKids Premium — R$14,99/mês
          </Button>
        )}

        <Button variant="outline" className="w-full" onClick={() => setShowParentArea(true)}>
          <Shield size={16} /> Área dos Pais
        </Button>
      </div>

      <ParentAreaDialog open={showParentArea} onOpenChange={setShowParentArea} />
      <PremiumModal open={showPremium} onOpenChange={setShowPremium} />

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
