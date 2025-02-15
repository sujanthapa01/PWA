"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";
import Image from "next/image";
import SpinnerLoader from "@/components/ui/loader";

const Profile = ({ user }) => {
  const { session } = useAuth();
  const router = useRouter();

  if (!session) return <SpinnerLoader />;

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Profile Header */}
      <div className="w-full max-w-xl p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">{user?.username}</h2>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/settings")}
        >
          <Settings className="w-5 h-5" />
          Settings
        </Button>
      </div>

      {/* Profile Info */}
      <div className="w-full max-w-xl p-4 flex items-center gap-4">
        {/* Avatar */}
        <Avatar className="w-24 h-24 border-2 border-gray-300">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={96}  // Match the Avatar size
              height={96}
              className="rounded-full"
              priority
              unoptimized={true} 
             
            />
          ) : (
            <AvatarFallback className="text-5xl font-extrabold text-purple-700">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        {/* Stats */}
        <div className="flex-1 flex justify-around text-center">
          <div>
            <p className="text-lg font-semibold">10</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
          <div>
            <p className="text-lg font-semibold">1.2K</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold">500</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="w-full max-w-xl px-4">
        <p className="font-medium">{user?.bio || "No bio available."}</p>
        <p className="text-sm text-gray-500">{user?.state}, {user?.country}</p>
      </div>
    </div>
  );
};

export default Profile;
