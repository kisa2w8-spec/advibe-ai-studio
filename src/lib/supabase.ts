import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ozsshipryxfnouwppfot.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_qzl1VEB9OFl5pBtNJGgSDQ_sdfnZFYz";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SavedAdItem {
  id: string;
  user_id?: string;
  product_name: string;
  description?: string;
  audience?: string;
  platform: string;
  tone: string;
  hook: string;
  body: string;
  cta: string;
  ctr_score: number;
  created_at?: string;
}
