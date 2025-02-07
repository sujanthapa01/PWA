"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Profile = ({ user }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check user session when component mounts
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    fetchSession();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setSession(null); // Clear state
    router.push("/auth/login"); // Redirect to login page
  };

  if (!session) return <p>redirecting...</p>
  if (!session) {
    
    router.push("/auth/login");
  } // Prevent access if not logged in

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">User Profile</h1>
      <p className="text-black"><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Bio:</strong> {user.bio}</p>

      <button
        type="button"
        onClick={handleLogOut}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
