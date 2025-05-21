import React, { useState } from "react";
import { Link } from "react-router-dom";
import ScrollView from "../../components/ScrollView";
import PostCard from "@/components/Post.jsx";

const HomePage = () => {
  const dummyPosts = [
    {
      userImage: "https://via.placeholder.com/40",
      userName: "Mike Zap",
      role: "Sales Manager",
      company: "Kirk Industries",
      items: ["Citric Acid 1.1/kg", "Coffee 3/kg", "Palm oil 2/kg"],
      delivery: "EXW New Jersey, 10025",
      images: [
        "/src/assets/sale.jpg",
        "/src/assets/sale.jpg",
        "/src/assets/sale.jpg",
      ],
      likes: 1580,
      comments: 20,
      reposts: 71,
      commentsList: [],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {dummyPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
