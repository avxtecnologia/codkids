import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Heart, Palette, Zap, Star } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const benefits = [
  { icon: <Heart className="text-heart" size={20} />, text: "Vidas infinitas — jogue sem limites!" },
  { icon: <Palette className="text-crystal" size={20} />, text: "Skins exclusivas desbloqueadas" },
  { icon: <Zap className="text-accent" size={20} />, text: "Sem espera para novas vidas" },
  { icon: <Star className="text-gold" size={20} />, text: "Badge Premium no perfil" },
];

const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  const { togglePremium, isPremium } = useGame();

  const handleSubscribe = () => {
    togglePremium();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader className="text-center items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center text-3xl mb-2">
            <Crown className="text-primary-foreground" size={32} />
          </div>
          <DialogTitle className="text-xl font-black">CodeKids Premium</DialogTitle>
          <DialogDescription className="text-muted-foreground font-semibold">
            Desbloqueie todo o potencial do aprendizado!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
              {b.icon}
              <span className="text-sm font-bold text-foreground">{b.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-3xl font-black text-foreground">R$ 14,99<span className="text-sm text-muted-foreground font-bold">/mês</span></p>
          <p className="text-xs text-muted-foreground mt-1">Cancele quando quiser</p>
        </div>

        <Button variant="hero" size="xl" className="w-full mt-4" onClick={handleSubscribe}>
          {isPremium ? "Cancelar Assinatura" : "Assinar Agora! 🚀"}
        </Button>

        {!isPremium && (
          <p className="text-xs text-center text-muted-foreground mt-1">
            Pagamento mockado — funcionalidade de teste
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
