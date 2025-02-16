import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRedis } from "@/contexts/RedisContext";

export const useAuth = () => {
  const { removeCache } = useRedis();
  const [session, setSession] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("session")) || null;
    }
    return null;
  });

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
        localStorage.setItem("session", JSON.stringify(data.session));
      }
    };

    if (!session) {
      fetchSession();
    }

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        localStorage.setItem("session", JSON.stringify(newSession));
      } else {
        localStorage.removeItem("session");
        router.replace("/auth/login");
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]); // Remove `session` from dependencies

  // Memoized logout function
  const logout = useCallback(async () => {
    if (session?.user?.id) {
      removeCache(session.user.id);
    }

    await supabase.auth.signOut();
    setSession(null);
    localStorage.removeItem("session");

    router.push("/auth/login");
  }, [router, session, removeCache]);

  console.log(session)
  return { session, logout };
};
