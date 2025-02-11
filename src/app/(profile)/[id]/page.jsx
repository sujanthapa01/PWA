"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";
import SpinnerLoader from "@/components/ui/loader";

export default function UserPage() {
  const { username } = useParams(); // ✅ Get `username` from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      // 🔥 Get authenticated user session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session?.user) {
        router.replace("/auth/login");
        return;
      }

      const userId = sessionData.session.user.id; // ✅ Authenticated user ID
      console.log("Authenticated User ID:", userId);

      // 🔥 Fetch user data using `userId`
      const { data, error } = await supabase
        .from("users")
        .select("*") // ✅ Get all user data
        .eq("_id", userId) // ✅ Fetch by `id` (not username)
        .single();

      if (error || !data) {
        console.error("Error fetching user:", error);
        setLoading(false);
        return;
      }else{
        setUser(data)
      }

      console.log("Fetched User Data:", data);
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [username, router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerLoader />
      </div>
    );

  return user ? <Profile user={user} /> : <p className="text-center text-red-500">User not found</p>;
}
