import { motion } from "framer-motion";

type MascotMood = "happy" | "thinking" | "celebrating" | "sad" | "waving";

const moodEmojis: Record<MascotMood, string> = {
  happy: "😊",
  thinking: "🤔",
  celebrating: "🥳",
  sad: "😢",
  waving: "👋",
};

interface MascotBubbleProps {
  message: string;
  mood?: MascotMood;
  position?: "inline" | "floating";
  className?: string;
}

const MascotBubble = ({ message, mood = "happy", position = "inline", className = "" }: MascotBubbleProps) => {
  const isFloating = position === "floating";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`flex items-end gap-3 ${isFloating ? "fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto" : ""} ${className}`}
    >
      {/* Dragon mascot */}
      <motion.div
        className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center text-2xl shadow-playful"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🐲
      </motion.div>

      {/* Speech bubble */}
      <div className="relative flex-1 bg-card rounded-2xl rounded-bl-md p-4 shadow-card-playful border border-border">
        <div className="flex items-start gap-2">
          <span className="text-lg">{moodEmojis[mood]}</span>
          <p className="text-sm font-semibold text-foreground leading-relaxed">{message}</p>
        </div>
        {/* Tail */}
        <div className="absolute bottom-2 -left-2 w-3 h-3 bg-card border-l border-b border-border rotate-45" />
      </div>
    </motion.div>
  );
};

export default MascotBubble;
