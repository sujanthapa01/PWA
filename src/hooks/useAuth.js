import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const useAuth = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  // Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  console.log("useAuth:", session);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/auth/login");
  };

  return { session, logout };
};
