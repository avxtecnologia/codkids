import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, RotateCcw, Star, Diamond, BookOpen, Crown } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { lessons } from "@/data/lessons";
import PremiumModal from "./PremiumModal";

interface ParentAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ParentAreaDialog = ({ open, onOpenChange }: ParentAreaDialogProps) => {
  const { xp, level, crystals, completedLessons, playerName, isPremium, resetProgress } = useGame();
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  const handlePinSubmit = () => {
    if (pin === "1234") {
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja resetar todo o progresso?")) {
      resetProgress();
      onOpenChange(false);
      setAuthenticated(false);
      setPin("");
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setAuthenticated(false);
      setPin("");
      setPinError(false);
    }
    onOpenChange(open);
  };

  if (!authenticated) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-xs rounded-2xl">
          <DialogHeader className="text-center items-center">
            <Shield className="text-primary" size={32} />
            <DialogTitle className="text-lg font-black">Área dos Pais</DialogTitle>
            <DialogDescription>Digite o PIN para acessar</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <Input
              type="password"
              placeholder="PIN (4 dígitos)"
              maxLength={4}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
              className="text-center text-xl tracking-widest font-bold"
            />
            {pinError && <p className="text-destructive text-xs text-center font-bold">PIN incorreto. Tente 1234.</p>}
            <Button variant="hero" onClick={handlePinSubmit} disabled={pin.length < 4}>Acessar</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader className="text-center items-center">
            <Shield className="text-primary" size={28} />
            <DialogTitle className="text-lg font-black">Painel dos Pais</DialogTitle>
            <DialogDescription>Progresso de {playerName || "Aventureiro"}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { icon: <Star className="text-gold" size={18} />, value: `${xp} XP`, label: "Experiência" },
              { icon: <Diamond className="text-crystal" size={18} />, value: `${crystals}`, label: "Cristais" },
              { icon: <BookOpen className="text-primary" size={18} />, value: `${completedLessons.length}/${lessons.length}`, label: "Fases" },
              { icon: <Crown className="text-accent" size={18} />, value: `Nível ${level}`, label: "Nível" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-xl p-3 flex flex-col items-center gap-1">
                {s.icon}
                <span className="font-black text-sm">{s.value}</span>
                <span className="text-[10px] text-muted-foreground font-bold">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" className="w-full" onClick={() => setShowPremium(true)}>
              <Crown size={16} /> {isPremium ? "Gerenciar Premium" : "Assinar Premium"}
            </Button>
            <Button variant="ghost" className="w-full text-destructive hover:text-destructive" onClick={handleReset}>
              <RotateCcw size={16} /> Resetar Progresso
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PremiumModal open={showPremium} onOpenChange={setShowPremium} />
    </>
  );
};

export default ParentAreaDialog;
