import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log((supabaseUrl,supabaseAnonKey) => {
    console.log(supabase,supabaseAnonKey)
})

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Anon Key is missing! Check environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true }, 
  });
  
