import { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
  isLoading: boolean;
}

const today = () => new Date().toISOString().slice(0, 10);

const DAILY_LIVES_LIMIT = 5;
const STORAGE_KEY = "codekids-game";

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

// Map DB row -> local GameState
const rowToState = (row: any, prev: GameState): GameState => ({
  ...prev,
  xp: row.xp ?? 0,
  level: row.level ?? 1,
  crystals: row.crystals ?? 0,
  lives: row.lives ?? 3,
  maxLives: row.max_lives ?? 3,
  currentPhase: row.current_phase ?? 1,
  playerName: row.player_name ?? "",
  playerAvatar: row.player_avatar ?? "🧙‍♂️",
  playerAge: row.player_age ?? 0,
  ownedSkins: row.owned_skins ?? ["wizard"],
  isPremium: row.is_premium ?? false,
  dailyLivesUsed: row.daily_lives_used ?? 0,
  lastLivesReset: row.last_lives_reset ?? today(),
  isNewUser: false,
  isRegistered: true,
});

const stateToRow = (state: GameState, userId: string) => ({
  user_id: userId,
  xp: state.xp,
  level: state.level,
  crystals: state.crystals,
  lives: state.lives,
  max_lives: state.maxLives,
  current_phase: state.currentPhase,
  player_name: state.playerName,
  player_avatar: state.playerAvatar,
  player_age: state.playerAge,
  owned_skins: state.ownedSkins,
  is_premium: state.isPremium,
  daily_lives_used: state.dailyLivesUsed,
  last_lives_reset: state.lastLivesReset,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);
  const prevCompletedRef = useRef<number[]>([]);

  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          ownedSkins: parsed.ownedSkins || ["wizard"],
          isPremium: parsed.isPremium || false,
          dailyLivesUsed: parsed.dailyLivesUsed || 0,
          lastLivesReset: parsed.lastLivesReset || today(),
        };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Cache locally to avoid flicker
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Load from Supabase when user becomes available
  useEffect(() => {
    if (!user) {
      hasLoadedRef.current = false;
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    (async () => {
      const { data, error } = await (supabase as any)
        .from("cdkids_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (!error && data) {
        setState((prev) => rowToState(data, prev));

        // Load completed lessons
        const { data: lessons } = await (supabase as any)
          .from("cdkids_lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id);
        if (!cancelled && lessons) {
          const ids = lessons.map((l: any) => Number(l.lesson_id)).filter((n: number) => !Number.isNaN(n));
          setState((prev) => ({
            ...prev,
            completedLessons: Array.from(new Set([...prev.completedLessons, ...ids])),
          }));
          prevCompletedRef.current = ids;
        }
      }
      hasLoadedRef.current = true;
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Sync state -> Supabase (debounced)
  useEffect(() => {
    if (!user || !hasLoadedRef.current) return;
    const handle = setTimeout(() => {
      (supabase as any)
        .from("cdkids_profiles")
        .upsert(stateToRow(state, user.id), { onConflict: "user_id" })
        .then(() => {});
    }, 400);
    return () => clearTimeout(handle);
  }, [state, user?.id]);

  // Daily reset
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

      // Persist lesson progress (best-effort)
      if (user) {
        (supabase as any)
          .from("cdkids_lesson_progress")
          .insert({
            user_id: user.id,
            lesson_id: String(lessonId),
            xp_earned: 0,
            crystals_earned: 0,
            attempts: 1,
          })
          .then(() => {});
      }

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
    setState({
      ...defaultState,
      isNewUser: false,
      isRegistered: true,
      playerName: state.playerName,
      playerAvatar: state.playerAvatar,
      playerAge: state.playerAge,
    });
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
        isLoading,
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
