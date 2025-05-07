
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleRepost = () => {
    setPost(prev => ({
      ...prev,
      reposts: prev.reposts + 1
    }));
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setPost(prev => ({
        ...prev,
        comments: prev.comments + 1,
        commentsList: [...(prev.commentsList || []), {
          id: Date.now(),
          text: newComment,
          user: 'Current User',
          timestamp: new Date().toISOString()
        }]
      }));
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center mb-3">
        <img src={post.userImage} alt="" className="w-10 h-10 rounded-full" />
        <div className="ml-3">
          <h3 className="font-semibold text-gray-800">{post.userName}</h3>
          <p className="text-sm text-gray-500">{post.role} - {post.company}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="font-medium text-gray-900">Offering</h4>
        {post.items.map((item, index) => (
          <p key={index} className="text-gray-700">{item}</p>
        ))}
        <p className="text-gray-700">Delivery {post.delivery}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {post.images.map((image, index) => (
          <img key={index} src={image} alt="" className="w-full h-24 object-cover rounded-lg" />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>{post.likes} likes</span>
          <span>•</span>
          <span>{post.comments} comments</span>
          <span>•</span>
          <span>{post.reposts} Reposts</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <button 
          onClick={handleLike}
          className={`flex items-center ${isLiked ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-700 transition-colors`}
        >
          <svg className="w-5 h-5 mr-2" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Like
        </button>
        <button 
          onClick={handleComment}
          className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>
        <button 
          onClick={handleRepost}
          className="flex items-center text-gray-600 hover:text-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Repost
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <form onSubmit={submitComment} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </div>
          </form>
          
          <div className="space-y-4">
            {post.commentsList?.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const dummyPosts = [
    {
      userImage: "https://via.placeholder.com/40",
      userName: "Mike Zap",
      role: "Sales Manager",
      company: "Kirk Industries",
      items: [
        "Citric Acid 1.1/kg",
        "Coffee 3/kg",
        "Palm oil 2/kg"
      ],
      delivery: "EXW New Jersey, 10025",
      images: [
        "/src/assets/sale.jpg",
        "/src/assets/sale.jpg",
        "/src/assets/sale.jpg"
      ],
      likes: 1580,
      comments: 20,
      reposts: 71,
      commentsList: []
    }
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
