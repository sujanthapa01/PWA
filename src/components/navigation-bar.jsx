"use client"
import React from "react";
import Link from "next/link";
import { Home, User, Settings, BookOpen, Search } from "lucide-react";
import useUserProfile from "@/hooks/useUserProfile";

export default function NavigationBar() {
  const { user, loading } = useUserProfile();
  console.log("user", user)
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md p-2">
      <div className="flex justify-around items-center text-gray-700">
        <NavItem href="/dashboard" icon={<Home size={24} />} label="Home" />
        <NavItem href="/blogs" icon={<BookOpen size={24} />} label="Blogs" />
        <NavItem
          href={!loading && user?.username ? `/${user.username}` : "#"}
          icon={<User size={24} />}
          label="Profile"
        />
        <NavItem href="/search" icon={<Search size={24} />} label="Search" />
      </div>
    </nav>
  );
}

function NavItem({ href, icon, label }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 text-sm">
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}
