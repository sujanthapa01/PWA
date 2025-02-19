"use client";
import { Heart, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const BlogPost = ({ post }) => {
  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Blog Image */}
        <div className="relative w-full h-80 md:h-[450px]">
          {/* Fading effect overlay (Ensure it's below other elements) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 transition-opacity duration-500 hover:opacity-90 z-10"></div>

          {/* Blog Image */}
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full transition-transform duration-300 hover:scale-105"
            unoptimized
          />

          {/* Trending Badge (Top Left) */}
          <div className="absolute top-4 left-4 bg-red-500/70 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
            🔥 Trending #{post.trendingRank}
          </div>

          {/* Category Tags (Bottom Center) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 justify-center z-20">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="bg-white/80 text-gray-900 text-xs px-3 py-1 rounded-full font-medium shadow-md hover:bg-white transition"
              >
                #{category}
              </span>
            ))}
          </div>
        </div>


        {/* Blog Content */}
        <div className="p-6 space-y-6">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={50}
              height={50}
              className="rounded-full border-2 border-gray-300 shadow-md"
              unoptimized
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{post.author.name}</h4>
              <span className="text-sm text-gray-500">Posted on {post.date}</span>
            </div>
          </div>
          <div className="flex justify-center">
          <div className="flex w-[16rem] justify-center border-2 rounded-full items-center text-sm text-gray-600 border-b border-gray-200 py-2 px-4">
            <div className="flex gap-4">
              <motion.button
                whileTap={{ scale: 0.8, opacity: 0.7 }}
                className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
              >
                <Heart size={20} /> {post.likes}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.8, opacity: 0.7 }}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition"
              >
                <Share2 size={20} /> Share
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.8, opacity: 0.7 }}
                className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition"
              >
                <Bookmark size={20} /> Save
              </motion.button>
            </div>
          </div>
          </div>

       {/* Blog Title */}
{/* Blog Title */}
<h1 className="relative text-4xl font-bold text-center text-gray-900 py-4">
  <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
  <span className="px-4 py-2 bg-white shadow-lg rounded-md">
    {post.title}
  </span>
</h1>

{/* Blog Content */}
<div className="prose max-w-none text-base leading-relaxed text-gray-800">
  {post.content.map((block, index) => {
    if (block.type === "heading") {
      return (
        <h2 key={index} className="text-2xl font-semibold mt-6 text-gray-900">
          {block.text}
        </h2>
      );
    } else if (block.type === "paragraph") {
      return (
        <div key={index} className="mt-4 text-gray-700 text-base">
          {/* Check if paragraph has an image */}
          {block.image && (
            <div className="w-full flex justify-center py-2">
              <Image
                src={block.image}
                alt="Content Image"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                unoptimized
              />
            </div>
          )}
          <p>{block.text}</p>

          {/* Check if `key` exists and display its values */}
          {block.key && (
            <ul className="mt-2 pl-5 list-disc text-gray-600">
              {Object.entries(block.key).map(([key, value]) => (
                <li key={key} className="text-sm">
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  })}
</div>

        </div>
      </div>
    </div>
  );
};

export default BlogPost;
