'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import  searchUser  from '@/hooks/searchUser'; 
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const user = await searchUser(e.target.value);
    setResults(user ? [user] : []);
    setLoading(false);
  
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input
        placeholder="Search users..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 rounded-lg border"
      />

      {loading ? (
        <Skeleton className="h-12 w-full mt-2 rounded-md" />
      ) : (
        <div className="mt-2 space-y-2">
          {results.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => router.push(`/username/${user.username}`)}
            >
              <Avatar>
                <AvatarImage src={user.avatar_url} alt={user.username} />
                <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-lg font-medium">{user.username}</span>
            </div>
          ))}
          {query.length > 0 && results.length === 0 && !loading && (
            <p className="text-gray-500 text-sm mt-2">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}