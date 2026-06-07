import { supabase } from "@/integrations/supabase/client";

export function getSupabaseClient() {
  return supabase;
}
