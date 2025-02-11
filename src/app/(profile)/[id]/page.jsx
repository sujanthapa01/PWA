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
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // ✅ Fetch session ONCE when component mounts
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user) {
        router.replace("/auth/login");
        return;
      }
      setSession(data.session);
    };

    getSession();

    // ✅ Listen for auth state changes (so it doesn’t refetch every time)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session);
      } else {
        setUser(null);
        router.replace("/auth/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (!session) return; // Wait for session to be set

    const fetchUser = async () => {
      setLoading(true);
      const userId = session.user.id;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("_id", userId)
        .single();

      if (error || !data) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data);
      }

      setLoading(false);
    };

    fetchUser();
  }, [session]); // ✅ Only runs when session is set

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerLoader />
      </div>
    );

  return user ? <Profile user={user} /> : <p className="text-center text-red-500">User not found</p>;
}
