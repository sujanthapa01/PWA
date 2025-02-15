"use client";
import redis from "@/lib/redis";
import { useContext, createContext, useState, useCallback } from "react";

const RedisContext = createContext();

export function RedisProvider({ children }) {
    const [cache, setCache] = useState({});

    const getCache = useCallback(async (key) => {
        if (cache[key]) return cache[key]; 
        
        try {
            const data = await redis.get(`userID:${key}`); 
            if (data) {
                setCache((prev) => ({ ...prev, [key]: data })); 
                return data; 
            }
        } catch (error) {
            console.error("Error fetching from Redis:", error);
        }
        return null; 
    }, [cache]); 

  
    const setCacheData = useCallback(async (key, value) => {
        try {
            await redis.set(`userID:${key}`, JSON.stringify(value), { ex: 1209600 });
            setCache((prev) => ({ ...prev, [key]: value })); 
        } catch (error) {
            console.error("Error setting data in Redis:", error);
        }
    }, []);

  
    const removeCache = useCallback(async (key) => {
        try {
            await redis.del(`userID:${key}`); 
            setCache((prev) => {
                const newCache = { ...prev };
                delete newCache[key]; 
                return newCache;
            });
        } catch (error) {
            console.error("Error removing from Redis:", error);
        }
    }, []);

    return (
        <RedisContext.Provider value={{ setCacheData, getCache, removeCache }}>
            {children}
        </RedisContext.Provider>
    );
}

export function useRedis() {
    return useContext(RedisContext);
}
