"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";
import SpinnerLoader from "@/components/ui/loader";
import cacheUser from "@/hooks/useCacheUser";
import redis from "@/lib/redis";

export default function UserPage() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
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
        router.replace("/auth/login");
      }
    });

    return () => {
      authListener?.unsubscribe?.();
    };
  }, [router]);

  useEffect(() => {
    if (!session) return;

    const loadUser = async () => {
      setLoading(true);
      const userId = session.user.id;

      // Fetch from Redis & Supabase in parallel
      const redisPromise = redis.get(`userID:${userId}`);
      const supabasePromise = supabase.from("users").select("*").eq("_id", userId).single();
      
      try {
        const userFromRedis = await redisPromise;
        if (userFromRedis) {
          const parsedData = typeof userFromRedis === "string" ? JSON.parse(userFromRedis) : userFromRedis;
          console.log("User from Redis:", parsedData);
          setUserData(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error parsing Redis data:", error);
      }

      try {
        const { data: user, error } = await supabasePromise;
        if (error || !user) {
          console.error("Error fetching user from Supabase:", error);
          setLoading(false);
          return;
        }
        setUserData(user);
        await cacheUser(userId, user);
      } catch (dbError) {
        console.error("Error fetching from Supabase:", dbError);
      }
      setLoading(false);
    };

    loadUser();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SpinnerLoader />
      </div>
    );
  }

  return userData ? <Profile user={userData} /> : <p className="text-center text-red-500">User not found</p>;
}
