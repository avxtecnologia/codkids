import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GameState {
  xp: number;
  level: number;
  crystals: number;
  lives: number;
  maxLives: number;
  completedLessons: number[];
  currentPhase: number;
  playerName: string;
  playerAvatar: string;
  playerAge: number;
  isNewUser: boolean;
  isRegistered: boolean;
  ownedSkins: string[];
  isPremium: boolean;
  dailyLivesUsed: number;
  lastLivesReset: string;
}

interface GameContextType extends GameState {
  addXp: (amount: number) => void;
  addCrystals: (amount: number) => void;
  loseLife: () => void;
  resetLives: () => void;
  completeLesson: (lessonId: number) => void;
  register: (name: string, avatar: string, age: number) => void;
  login: (name: string) => void;
  startNewUserFlow: () => void;
  buyAvatar: (skinId: string, cost: number) => boolean;
  equipAvatar: (emoji: string) => void;
  togglePremium: () => void;
  resetProgress: () => void;
  maxXp: number;
  dailyLivesLeft: number;
  canPlay: boolean;
  hoursUntilReset: number;
}

const today = () => new Date().toISOString().slice(0, 10);

const DAILY_LIVES_LIMIT = 5;

const defaultState: GameState = {
  xp: 0,
  level: 1,
  crystals: 0,
  lives: 3,
  maxLives: 3,
  completedLessons: [],
  currentPhase: 1,
  playerName: "",
  playerAvatar: "🧙‍♂️",
  playerAge: 0,
  isNewUser: true,
  isRegistered: false,
  ownedSkins: ["wizard"],
  isPremium: false,
  dailyLivesUsed: 0,
  lastLivesReset: today(),
};

const GameContext = createContext<GameContextType | null>(null);

const XP_PER_LEVEL = 100;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem("codekids-game");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate old saves
      return {
        ...defaultState,
        ...parsed,
        ownedSkins: parsed.ownedSkins || ["wizard"],
        isPremium: parsed.isPremium || false,
        dailyLivesUsed: parsed.dailyLivesUsed || 0,
        lastLivesReset: parsed.lastLivesReset || today(),
      };
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem("codekids-game", JSON.stringify(state));
  }, [state]);

  // Check daily reset
  useEffect(() => {
    if (state.lastLivesReset !== today()) {
      setState((prev) => ({
        ...prev,
        dailyLivesUsed: 0,
        lastLivesReset: today(),
        lives: prev.maxLives,
      }));
    }
  }, [state.lastLivesReset]);

  const addXp = (amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const addCrystals = (amount: number) => {
    setState((prev) => ({ ...prev, crystals: prev.crystals + amount }));
  };

  const loseLife = () => {
    setState((prev) => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
      dailyLivesUsed: prev.dailyLivesUsed + 1,
    }));
  };

  const resetLives = () => {
    setState((prev) => ({ ...prev, lives: prev.maxLives }));
  };

  const completeLesson = (lessonId: number) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const completedLessons = [...prev.completedLessons, lessonId];
      const currentPhase = Math.max(prev.currentPhase, lessonId + 1);
      return { ...prev, completedLessons, currentPhase };
    });
  };

  const register = (name: string, avatar: string, age: number) => {
    setState((prev) => ({
      ...prev,
      playerName: name,
      playerAvatar: avatar,
      playerAge: age,
      isNewUser: false,
      isRegistered: true,
    }));
  };

  const login = (name: string) => {
    setState((prev) => ({
      ...prev,
      playerName: name,
      isNewUser: false,
      isRegistered: true,
      xp: 150,
      level: 2,
      crystals: 45,
      completedLessons: [1, 2],
      currentPhase: 3,
    }));
  };

  const startNewUserFlow = () => {
    setState({ ...defaultState, isNewUser: true });
  };

  const buyAvatar = (skinId: string, cost: number): boolean => {
    if (state.ownedSkins.includes(skinId)) return false;
    if (state.crystals < cost) return false;
    setState((prev) => ({
      ...prev,
      crystals: prev.crystals - cost,
      ownedSkins: [...prev.ownedSkins, skinId],
    }));
    return true;
  };

  const equipAvatar = (emoji: string) => {
    setState((prev) => ({ ...prev, playerAvatar: emoji }));
  };

  const togglePremium = () => {
    setState((prev) => ({ ...prev, isPremium: !prev.isPremium }));
  };

  const resetProgress = () => {
    setState({ ...defaultState, isNewUser: false, isRegistered: true, playerName: state.playerName, playerAvatar: state.playerAvatar, playerAge: state.playerAge });
  };

  const maxXp = state.level * XP_PER_LEVEL;
  const dailyLivesLeft = state.isPremium ? 99 : Math.max(0, DAILY_LIVES_LIMIT - state.dailyLivesUsed);
  const canPlay = state.isPremium || dailyLivesLeft > 0 || state.lives > 0;

  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const hoursUntilReset = Math.ceil((midnight.getTime() - now.getTime()) / (1000 * 60 * 60));

  return (
    <GameContext.Provider
      value={{
        ...state,
        addXp, addCrystals, loseLife, resetLives, completeLesson,
        register, login, startNewUserFlow, buyAvatar, equipAvatar,
        togglePremium, resetProgress, maxXp, dailyLivesLeft, canPlay, hoursUntilReset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
