
import React, { useState } from 'react';
import Button from './Button';

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4 md:p-6">
      <div className="flex items-center mb-3">
        <img
          src={post.authorAvatar}
          alt={post.author}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      
      <p className="text-gray-800 mb-4">{post.content}</p>
      
      {post.image && (
        <img 
          src={post.image} 
          alt="Post content" 
          className="w-full rounded-lg mb-4"
        />
      )}

      <div className="flex justify-between items-center">
        <Button
          onClick={handleLike}
          className={`flex items-center ${isLiked ? 'bg-blue-600' : 'bg-gray-500'}`}
        >
          <span>{likes} Likes</span>
        </Button>
        <Button
          onClick={() => setShowComments(!showComments)}
          className="bg-gray-500"
        >
          {post.comments.length} Comments
        </Button>
        <Button className="bg-gray-500">Share</Button>
      </div>

      {showComments && (
        <div className="mt-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded mb-2">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
