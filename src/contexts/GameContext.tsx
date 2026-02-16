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
  maxXp: number;
}

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
};

const GameContext = createContext<GameContextType | null>(null);

const XP_PER_LEVEL = 100;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem("codekids-game");
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem("codekids-game", JSON.stringify(state));
  }, [state]);

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
    setState((prev) => ({ ...prev, lives: Math.max(0, prev.lives - 1) }));
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
      // Mock: returning user has some progress
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

  const maxXp = state.level * XP_PER_LEVEL;

  return (
    <GameContext.Provider
      value={{ ...state, addXp, addCrystals, loseLife, resetLives, completeLesson, register, login, startNewUserFlow, maxXp }}
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
