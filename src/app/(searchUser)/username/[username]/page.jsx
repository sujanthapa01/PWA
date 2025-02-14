"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import searchUser from "@/hooks/searchUser";
import SpinnerLoader from "@/components/ui/loader"; 

export default function Page() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await searchUser(username);
      if (!userData) {
        router.replace("/404"); 
        return;
      }
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, [username, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <SpinnerLoader /> */}<></>
      </div>
    );
  }

  if (!user) return notFound(); 

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url || "/default-avatar.png"}
          alt={user.username}
          className="w-20 h-20 rounded-full border border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Bio, Country, and State */}
      <div className="mt-2">
        <p className="text-gray-700">{user.bio || "No bio available"}</p>
        <p className="text-gray-500 text-sm">
          {user.country && user.state ? `${user.state}, ${user.country}` : "Location not specified"}
        </p>
      </div>

      {/* Profile Actions */}
      <div className="mt-4 flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Follow</button>
        <button className="border px-4 py-2 rounded-lg">Message</button>
      </div>
    </div>
  );
}
