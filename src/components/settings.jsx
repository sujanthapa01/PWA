import React from 'react'
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useRouter } from 'next/navigation';
function settings() {
    const router = useRouter();
  return (
       <nav className='w-full flex justify-end'>
                <Button
                    variant="ghost"
                    onClick={() => router.push("/settings")}>
                    <Settings className="w-5 h-5" />
                </Button>
            </nav> 
  )
}

export default settings