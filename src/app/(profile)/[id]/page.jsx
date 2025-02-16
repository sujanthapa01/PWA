"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";
import PageNotFound from "@/app/(profile)/PageNotFound/page";
import { useRedis } from "@/contexts/RedisContext";
import Loader from "@/components/ui/loader";

export default function UserPage() {
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();
  const { setCacheData, getCache } = useRedis();

  // Fetch session once using useCallback
  const getSession = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error || !data?.session?.user) {
      router.replace("/auth/login");
      return;
    }
    setSession(data.session);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  // Fetch user data using useCallback
  const loadUser = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    const userId = session.user.id;

    try {
      // Check Redis first
      const userFromRedis = await getCache(userId);
      if (userFromRedis) {
        const parsedData = typeof userFromRedis === "string" ? JSON.parse(userFromRedis) : userFromRedis;

        // Only update state if the user data has changed
        if (JSON.stringify(parsedData) !== JSON.stringify(userData)) {
          setUserData(parsedData);
        }

        setLoading(false);
        return;
      }

      // Fetch from Supabase if not in Redis
      const { data: user, error } = await supabase
        .from("users")
        .select("username, avatar_url, bio, country, state")
        .eq("_id", userId)
        .single();

      if (error || !user) {
        console.error("Error fetching user:", error);
        setUserData(null);
      } else {
        // Only update state if necessary
        if (JSON.stringify(user) !== JSON.stringify(userData)) {
          setUserData(user);
          await setCacheData(userId, JSON.stringify(user));
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserData(null);
    }

    setLoading(false);
  }, [session, userData, getCache, setCacheData]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) return <Loader />;

  console.log(userData)
  if (!userData || userData.username !== id) {
    return <PageNotFound />;
  }

  return <Profile user={userData} />;
}
