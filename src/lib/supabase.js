import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hypfvstzrrnfacnogvwo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cGZ2c3R6cnJuZmFjbm9ndndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NjQyNTksImV4cCI6MjA0ODU0MDI1OX0.Defh2iw7RR63siAl0YbQL_0l9117XW498DFwe15uzFo";
if(!supabaseUrl || ! supabaseAnonKey){
    console.log("supabaseUrl or supabaseAnonKey are missing!")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
