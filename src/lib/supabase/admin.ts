import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/supabase";

export function createAdminClient() {
  const url = supabaseConfig.url;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase admin credentials");
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
