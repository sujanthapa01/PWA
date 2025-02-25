"use client";

import { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button"; // shadcn button
import { Input } from "@/components/ui/input"; // shadcn input
import { Badge } from "@/components/ui/badge"; // shadcn badge

const BlogEditor = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      ListItem,
      Placeholder.configure({ placeholder: "Start writing your blog..." }),
      Image.configure({ inline: true, allowBase64: true }), // Image upload support
    ],
    content: "",
  });

  const fileInputRef = useRef(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      editor.chain().focus().setImage({ src: url }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const contentHTML = editor.getHTML();
    const blogData = {
      content: contentHTML,
      tags,
    };

    console.log("Blog JSON Data:", JSON.stringify(blogData, null, 2));
    alert("Blog submitted! Check the console for JSON data.");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create a Blog</h2>

      {/* Tags Input */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Enter a tag"
          className="flex-1"
        />
        <Button onClick={handleAddTag} className="bg-blue-500 text-white">
          Add Tag
        </Button>
      </div>

      {/* Display Tags as Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} ✕
          </Badge>
        ))}
      </div>

      {/* Image Upload Button */}
      <Button
        onClick={() => fileInputRef.current.click()}
        className="mb-4 bg-gray-600 text-white"
      >
        Upload Image
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleUploadImage}
      />

      {/* Blog Editor */}
      <div className="border rounded-md p-4 bg-gray-50">
        {!previewMode ? (
          <EditorContent editor={editor} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-yellow-500 text-white"
        >
          {previewMode ? "Edit" : "Preview"}
        </Button>
        <Button onClick={handleSubmit} className="bg-green-500 text-white">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
