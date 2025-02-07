"use client"; // ✅ Ensures it's a Client Component

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";

export default function UserPage() {
  const params = useParams();
  const id = params?.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      // 🔥 Check if user is logged in
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.replace("/auth/login"); // 🔥 Redirect if not authenticated
        return;
      }

      // 🔥 Fetch user data from Supabase
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("_id", id) // Ensure `_id` is the correct column name
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        router.replace("/auth/login"); // Redirect if user not found
      } else {
        setUser(data);
      }

      setLoading(false);
    };

    if (id) fetchUser(); // ✅ Ensure `id` is available before fetching

  }, [id, router]);

  if (loading) return <p>Loading...</p>;

  return user ? <Profile user={user} /> : null;
}
