"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Button
        variant="destructive"
        className="flex items-center gap-2"
        onClick={logout}
      >
        <LogOut className="w-5 h-5" />
        Logout
      </Button>
    </div>
  );
};

export default Settings;
