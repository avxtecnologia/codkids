import { motion } from "framer-motion";
import { Heart, Diamond, Star } from "lucide-react";

interface XpBarProps {
  xp: number;
  maxXp: number;
  level: number;
  crystals: number;
  lives: number;
}

const XpBar = ({ xp, maxXp, level, crystals, lives }: XpBarProps) => {
  const progress = (xp / maxXp) * 100;

  return (
    <div className="flex items-center gap-4 bg-card rounded-2xl px-4 py-3 shadow-card-playful">
      {/* Level */}
      <div className="flex items-center gap-1.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center">
          <span className="text-primary-foreground font-black text-sm">{level}</span>
        </div>
      </div>

      {/* XP bar */}
      <div className="flex-1">
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-hero rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold mt-0.5 block">
          {xp}/{maxXp} XP
        </span>
      </div>

      {/* Crystals */}
      <div className="flex items-center gap-1">
        <Diamond className="text-crystal" size={18} />
        <span className="font-bold text-sm">{crystals}</span>
      </div>

      {/* Lives */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart
            key={i}
            size={16}
            className={i < lives ? "text-heart fill-heart" : "text-muted-foreground opacity-30"}
          />
        ))}
      </div>
    </div>
  );
};

export default XpBar;
