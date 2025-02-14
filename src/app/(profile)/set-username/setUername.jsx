"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SetUsername() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
const router = useRouter();

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("File size must be less than 1MB.");
      return;
    }

    setError("");
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    if (!file) {
      setError("Please select an image first.");
      return;
    }

    if (!username) {
      setError("Please enter a username.");
      return;
    }

    setUploading(true);

    try {
      // Convert file to ArrayBuffer
      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${userId}.${fileExt}`;
      const arrayBuffer = await file.arrayBuffer();

      // Upload using ArrayBuffer
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setError("Failed to upload image.");
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const avatarUrl = publicUrlData.publicUrl;

      // Update user in the database
      const { error: dbError } = await supabase
        .from("users")
        .update({ avatar_url: avatarUrl, username: username })
        .eq("_id", userId);

      if (dbError) {
        console.error("Database error:", dbError);
        setError("Failed to update profile.");
      } else {
        setError("");
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
     router.replace(`/${username}`) 
      setUploading(false);
    }
  };

  return (
    <main className="flex justify-center items-center flex-col gap-4 p-4">
      <div className="flex flex-col items-center">
        <img
          src={image || "/profile.jpg"}
          alt="Profile"
          className="w-44 h-44 rounded-full object-cover border"
        />
        <label
          htmlFor="image-upload"
          className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Button className="w-full" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Save"}
      </Button>
    </main>
  );
}
