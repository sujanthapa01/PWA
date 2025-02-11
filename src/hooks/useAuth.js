import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const useAuth = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  console.log(session)
  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userData")
    setSession(null);
    router.push("/auth/login");
  };

  return { session, logout };
};




