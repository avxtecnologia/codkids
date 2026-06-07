// TypeScript types for cdkids_* Supabase tables.
// Hand-written; mirrors the live schema.

export interface CdkidsProfile {
  id: string;
  user_id: string;
  player_name: string;
  player_avatar: string;
  player_age: number;
  xp: number;
  level: number;
  crystals: number;
  lives: number;
  max_lives: number;
  current_phase: number;
  owned_skins: string[];
  is_premium: boolean;
  daily_lives_used: number;
  last_lives_reset: string;
  created_at: string;
  updated_at: string;
}

export interface CdkidsLessonProgress {
  id: string;
  user_id: string;
  lesson_id: number;
  xp_earned: number;
  crystals_earned: number;
  attempts: number;
  completed_at: string;
}

export interface CdkidsAchievement {
  id: string;
  user_id: string;
  achievement_key: string;
  earned_at: string;
}

export type SubscriptionPlan = "free" | "pro" | "family";
export type SubscriptionStatus = "active" | "cancelled" | "expired";

export interface CdkidsSubscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  price_brl: number | null;
  started_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CdkidsParentSettings {
  id: string;
  user_id: string;
  parent_email: string | null;
  weekly_report_enabled: boolean;
  daily_time_limit_min: number | null;
  blocked_until: string | null;
  created_at: string;
  updated_at: string;
}

// Helpers for Insert/Update payloads: auto-managed fields are optional.
type AutoFields = "id" | "created_at" | "updated_at";

type InsertOf<T, Optional extends keyof T = never> = Omit<T, Extract<AutoFields, keyof T> | Optional> &
  Partial<Pick<T, Extract<AutoFields | Optional, keyof T>>>;

type UpdateOf<T> = Partial<T>;

export interface Database {
  public: {
    Tables: {
      cdkids_profiles: {
        Row: CdkidsProfile;
        Insert: InsertOf<CdkidsProfile>;
        Update: UpdateOf<CdkidsProfile>;
      };
      cdkids_lesson_progress: {
        Row: CdkidsLessonProgress;
        Insert: InsertOf<CdkidsLessonProgress, "completed_at">;
        Update: UpdateOf<CdkidsLessonProgress>;
      };
      cdkids_achievements: {
        Row: CdkidsAchievement;
        Insert: InsertOf<CdkidsAchievement, "earned_at">;
        Update: UpdateOf<CdkidsAchievement>;
      };
      cdkids_subscriptions: {
        Row: CdkidsSubscription;
        Insert: InsertOf<CdkidsSubscription, "started_at" | "expires_at" | "price_brl">;
        Update: UpdateOf<CdkidsSubscription>;
      };
      cdkids_parent_settings: {
        Row: CdkidsParentSettings;
        Insert: InsertOf<
          CdkidsParentSettings,
          "parent_email" | "daily_time_limit_min" | "blocked_until"
        >;
        Update: UpdateOf<CdkidsParentSettings>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      subscription_plan: SubscriptionPlan;
      subscription_status: SubscriptionStatus;
    };
  };
}
