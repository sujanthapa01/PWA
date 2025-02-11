"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SpinnerLoader from '@/components/ui/loader'

const Profile = ({ user }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setSession(null); 
    router.push("/auth/login");
  };

  if (!session) return <div><SpinnerLoader/></div>;
  if (!session) { 
    router.push("/auth/login");
  } 


  return (
    <div className="p-6 flex flex-col items-center justify-center h-[100vh]">
      <h1 className="text-xl font-bold">User Profile</h1>
      <img src={user?.avatar_url} className="rounded-full  h-[10rem] w-[10rem]  object-cover " alt="avatar"/>
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
