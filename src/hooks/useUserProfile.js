"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function useUserProfile() {
  const [user, setUser] = useState({ id: null, username: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const { data: { user }, error } = await supabase.auth.getUser();
     
      if (error || !user) {
        console.error("Error fetching user:", error?.message);
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("users")
        .select("username")
        .eq("_id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching username:", profileError.message);
      }

      setUser({ id: user.id, username: data?.username || null });
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  return { user, loading };
}
