import React from 'react'
import CreateBlog from "@/app/(BlogPost)/blog-post/blog-post"
function page() {
  const dummyPost = {
    image: "https://plus.unsplash.com/premium_photo-1664203067979-47448934fd97?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Exploring the Beauty of Nature",
    date: "February 18, 2025",
    likes: 120,
    trendingRank: 1,
    categories: ["Nature", "Travel", "Photography"],
    author: {
      name: "John Doe",
      avatar: "https://i.pinimg.com/736x/fc/f7/35/fcf735232276f747b3154022fd9ec2a5.jpg",
    },
    content: [
      { type: "heading", text: "Introduction" },
      
      { type: "paragraph", 
        text: "Nature is a beautiful and essential part of our lives. It provides us with fresh air, stunning landscapes, and a sense of peace.",
        key: {
          "1" : "loreum23", 
          "2" : "loreum24",
          "3" : "loreum25",
        }
       },
      { type: "heading", text: "The Wonders of Wildlife" },
      { type: "paragraph", image : "https://images.unsplash.com/photo-1739889399685-c73e63753981?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", text: "From majestic mountains to deep blue oceans, every element of nature has its own charm and uniqueness." },
      { type: "heading", text: "Why We Should Protect Nature" },
      { type: "paragraph", text: "Conserving nature is crucial for future generations. Protecting forests, wildlife, and oceans ensures a healthy planet for all." },
    ],
  };
  
  return (
    <CreateBlog post={dummyPost}></CreateBlog>
  )
}

export default page