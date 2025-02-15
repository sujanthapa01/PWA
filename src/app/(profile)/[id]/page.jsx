"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Profile from "./profile";
import PageNotFound from "@/app/(profile)/PageNotFound/page";
import { useRedis } from "@/contexts/RedisContext";
import Loader  from "@/components/ui/loader"

export default function UserPage() {
  const params = useParams();
  const id = params?.id; 

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();
  const { setCacheData, getCache } = useRedis();


  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user) {
        router.replace("/auth/login");
        return;
      }
      setSession(data.session);
    };
    getSession();
  }, [router]);


  useEffect(() => {
    if (!session) return; 

    const loadUser = async () => {
      setLoading(true);
      const userId = session.user.id;

      try {
        // Check Redis first
        const userFromRedis = await getCache(userId);
        if (userFromRedis) {
          const parsedData = typeof userFromRedis === "string" ? JSON.parse(userFromRedis) : userFromRedis;
          // console.log("User from Redis:", parsedData);
          setUserData(parsedData);
          setLoading(false);
          return;
        }

        // Fetch from Supabase if not in Redis
        const { data: user, error } = await supabase.from("users").select("username").eq("_id", userId).single();
        if (error || !user) {
          console.error("Error fetching user:", error);
          setUserData(null);
        } else {
          setUserData(user);
          await setCacheData(userId, JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData(null);
      }

      setLoading(false);
    };

    loadUser();
  }, [session, getCache, setCacheData]);

  if (userData && userData.username !== id) {
    return <PageNotFound />;
  }

  return userData ? <Profile user={userData} /> : <></>;
}
