import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Determine which key to use based on context.
// Service role key is only used on the server side for secure administration queries,
// while anon key is used on the client.
const supabaseKey = typeof window === "undefined" 
  ? (supabaseServiceKey || supabaseAnonKey) 
  : supabaseAnonKey;

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

if (!supabase) {
  if (typeof window === "undefined") {
    console.warn(
      "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing. Running with local fallback active."
    );
  }
}
