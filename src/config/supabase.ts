/**
 * Public Supabase credentials (anon key is safe to expose in the browser).
 * Fallbacks keep production working when Vercel env vars were not set at build time.
 */
export const supabaseConfig = {
  url:
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://wmrpolxnlhmyzprstaol.supabase.co",
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcnBvbHhubGhteXpwcnN0YW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyOTA1NjksImV4cCI6MjA5Njg2NjU2OX0.MGnA5qakV8pc9MiIGIdxS63Ud63Nk9WADN8NMdaQ4Bo",
} as const;
