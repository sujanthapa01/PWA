"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";
import SpinnerLoader from "@/components/ui/loader";

export default function UserPage() {
  const { username } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user) {
        router.replace("/auth/login");
        return;
      }
      setSession(data.session);
    };

    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
      } else {
        localStorage.removeItem("userData");
        setUser(null);
        router.replace("/auth/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

 
  useEffect(() => {
    if (!session) return;

    const loadUser = async () => {
      setLoading(true);

      const cachedUser = localStorage.getItem("userData");
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setLoading(false);
        return;
      }

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
        localStorage.setItem("userData", JSON.stringify(data)); 
      }

      setLoading(false);
    };

    loadUser();
  }, [session]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerLoader />
      </div>
    );

  return user ? <Profile user={user} /> : <p className="text-center text-red-500">User not found</p>;
}
