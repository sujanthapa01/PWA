"use client"
import React from 'react';
import Settings from '@/components/settings';
export default function layout({ children }) {
  
    return (
        <>
         <Settings></Settings> 
            <div>{children}</div>
        </>
    )
}
