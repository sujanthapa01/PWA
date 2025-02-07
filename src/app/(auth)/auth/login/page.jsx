"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  // const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user?.id) {
          router.replace(`/user/${userData.user.id}`);
        }
      }
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
