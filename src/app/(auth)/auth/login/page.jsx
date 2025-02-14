"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "@/components/login-form";
import SpinnerLoader from "@/components/ui/loader";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


 
  useEffect(() => {
    async function checkUser() {
      setLoading(true);

      // Get session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        setLoading(false);
        return;
      }

      // Get user ID
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        console.log("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      const userId = userData.user.id;

      // Fetch username
      const { data: userRecord, error: userDataError } = await supabase
        .from("users")
        .select("username")
        .eq("_id", userId) 
        .single();

      if (userDataError) {
        console.log("Error fetching user data:", userDataError);
        setLoading(false);
        return;
      }

      if (!userRecord?.username) {
        router.replace(`/set-username/${userId}`);
      } else {
        router.replace(`/${userRecord.username}`);
      }

      setLoading(false);
    }

    checkUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
