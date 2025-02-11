"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function VerifyLink() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
console.log( error)
      if (error || !data?.session) {
        setError("Session missing. Please check your email and log in.");
        setLoading(false);
        return;
      }

      // ✅ Get user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError("Failed to get user details.");
        setLoading(false);
        return;
      }

      const userId = userData.user.id;

      // ✅ Store user in DB
      const { error: dbError } = await supabase.from("users").insert([{ email, _id: userId }], { upsert: true });

      if (dbError) {
        setError("Failed to save user data.");
        setLoading(false);
        return;
      }

      router.push(`/user/profile/${userId}`);
    };

    checkSession();
  }, [router, email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold">Verifying...</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Please wait...</p>}
    </div>
  );
}
