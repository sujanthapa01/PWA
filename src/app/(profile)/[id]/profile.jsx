"use client";
import React, { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import SpinnerLoader from "@/components/ui/loader";

const Profile = ({ user }) => {
  if (!user) return <SpinnerLoader />;
console.log(user)
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white px-4 sm:px-6 md:px-8">
      {/* Profile Header */}
      <div className="w-full max-w-3xl flex-col flex items-center gap-6 py-6 border-b">
        {/* Avatar */}
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-gray-300">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={128}
              height={128}
              className="rounded-full"
              priority
              unoptimized
            />
          ) : (
            <AvatarFallback className="text-5xl font-extrabold text-purple-700">
              {user.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        {/* Username & Stats */}
        <div className="flex flex-col flex-grow text-center">
          <h2 className="text-2xl font-semibold">
            {user.username} 
          </h2>
          {/* Stats */}
          <div className="flex ml-12 gap-12 mt-2 text-center">
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

        {/* Action Buttons */}
        <div className="flex items-center gap-4 flex-col">
          <div className="flex gap-4">
            <Button variant="outline" className="px-4 py-2 text-sm font-medium">
              Follow
            </Button>
            <Button variant="outline" className="px-4 py-2 text-sm font-medium">
              Message
            </Button>
          </div>
        </div>

        {/* Bio Section */}
        <div className="w-full max-w-3xl p-4">
          <p className="text-sm sm:text-base font-medium">{user.bio || "No bio available."}</p>
          <p className="text-sm text-gray-500 mt-1">
            {user.state}, {user.country}
          </p>
        </div>
      </div>

      {/* Grid for Posts (Placeholder) */}
      <div className="w-full max-w-3xl grid grid-cols-3 gap-2 mt-4">
        <div className="bg-gray-300 w-full aspect-square"></div>
        <div className="bg-gray-300 w-full aspect-square"></div>
        <div className="bg-gray-300 w-full aspect-square"></div>
      </div>
    </div>
  );
};

export default Profile;
