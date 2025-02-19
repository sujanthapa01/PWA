"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(true); // Toggle password or magic link
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    try {
      let authResponse;

      if (usePassword) {
        authResponse = await supabase.auth.signUp({ email, password });
      } else {
        authResponse = await supabase.auth.signInWithOtp({
          email,
          options: { 
            shouldCreateUser: true, 
            emailRedirectTo: `${window.location.origin}/auth/login` 
          },
        });

        router.push(`/auth/signup/verify-link?email=${email}`);
        return;
      }

      if (authResponse.error) {
        throw new Error(authResponse.error.message);
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
      if (sessionError) throw new Error(sessionError.message);

      const userId = sessionData.user.id;

      const { error: dbError } = await supabase
        .from("users")
        .insert([{ email, _id: userId }]);

      if (dbError) throw new Error(dbError.message);

      console.log("User signed up successfully!");
      router.push(`/auth/login`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold">Sign Up</h2>

      <form onSubmit={handleSignUp} className="space-y-4 w-full max-w-sm">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled={usePassword == false ? true : false}
            placeholder={usePassword == false ? "comming soon..." : "Email" }
            value={usePassword == false ? "" : email }
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {usePassword && (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full"  disabled={usePassword == false ? true : false}>
          {loading ? "Processing..." : usePassword ? "Sign Up with Password" : "Send Magic Link"}
        </Button>

        <button
          type="button"
          onClick={() => setUsePassword(!usePassword)}
         
          className="mt-2 text-sm text-blue-500 underline"
        >
          {usePassword ? "Use Magic Link Instead" : "Use Password Instead"}
        </button>
        <p>
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
