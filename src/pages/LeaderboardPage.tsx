import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trophy, Medal, Crown } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Luna ⭐", xp: 2450, avatar: "🧙‍♀️" },
  { rank: 2, name: "Pedro 🚀", xp: 2100, avatar: "🧑‍💻" },
  { rank: 3, name: "Sofia 💎", xp: 1980, avatar: "👩‍🔬" },
  { rank: 4, name: "Miguel 🎯", xp: 1750, avatar: "🦸‍♂️" },
  { rank: 5, name: "Você ✨", xp: 1340, avatar: "🧝" },
  { rank: 6, name: "Ana 🌟", xp: 1200, avatar: "🧚" },
  { rank: 7, name: "Lucas 🔥", xp: 980, avatar: "🧑‍🚀" },
];

const trophies = [
  { name: "Mestre dos Loops", icon: "🔄", earned: true },
  { name: "Lógica de Ferro", icon: "🧠", earned: true },
  { name: "Primeiro Código", icon: "💻", earned: true },
  { name: "Domador de Bugs", icon: "🐛", earned: false },
  { name: "Guardião dos Arrays", icon: "📦", earned: false },
];

const LeaderboardPage = () => {
  const navigate = useNavigate();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-gold fill-gold" size={24} />;
    if (rank === 2) return <Medal className="text-muted-foreground" size={22} />;
    if (rank === 3) return <Trophy className="text-accent" size={22} />;
    return <span className="font-black text-muted-foreground text-lg w-6 text-center">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-black text-center mb-6">🏆 Salão da Fama</h1>

        {/* Trophies */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
            Suas Medalhas
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {trophies.map((trophy) => (
              <motion.div
                key={trophy.name}
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center gap-1 min-w-[80px] p-3 rounded-2xl ${
                  trophy.earned
                    ? "bg-card shadow-card-playful"
                    : "bg-muted opacity-50"
                }`}
              >
                <span className="text-3xl">{trophy.icon}</span>
                <span className="text-[10px] font-bold text-center leading-tight">
                  {trophy.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
          Liga Semanal
        </h3>
        <div className="flex flex-col gap-2">
          {leaderboardData.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`flex items-center gap-3 p-3 rounded-2xl ${
                player.rank === 5
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-card shadow-card-playful"
              }`}
            >
              {getRankIcon(player.rank)}
              <span className="text-2xl">{player.avatar}</span>
              <div className="flex-1">
                <p className="font-bold text-sm">{player.name}</p>
                <p className="text-xs text-muted-foreground">{player.xp} XP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around py-3 max-w-md mx-auto">
          <button onClick={() => navigate("/trail")} className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <span className="text-xl">🗺️</span>
            <span className="text-xs font-bold">Jornada</span>
          </button>
          <button onClick={() => navigate("/leaderboard")} className="flex flex-col items-center gap-0.5 text-primary">
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

export default LeaderboardPage;
