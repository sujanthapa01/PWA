"use client"
import React from "react";
import Link from "next/link";
import { Home, User, Settings, BookOpen, Search } from "lucide-react";
import useUserProfile from "@/hooks/useUserProfile";
import { MdCreate } from "react-icons/md";

export default function NavigationBar() {
  const { user, loading } = useUserProfile();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md p-2">
      <div className="flex justify-around items-center text-gray-700">
        <NavItem href="/dashboard"icon={<BookOpen size={24} />} label="Home" />
        <NavItem href="/createBlog" icon={<MdCreate size={24}/>} label="Blogs" />
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
