"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useUserProfile from "@/hooks/useUserProfile";
import { useEffect } from "react";
import HomePage from "@/components/HomePage";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  const { user: authUser } = useAuth();
  const { user, loading } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) return; // If not logged in, stay on HomePage
    if (!loading && user?.username) {
      router.replace(`/${user.username}`);
    }
  }, [authUser, user?.username, loading, router]);


  if (loading) return null;
  if (!authUser) return <LoginForm />;
  return null; 
}
