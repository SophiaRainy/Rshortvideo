'use client';

import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLike}
      className={`flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full p-3 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
        isLiked ? 'text-apple-blue' : 'text-apple-white'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="text-xs mt-1">{likes}</span>
    </button>
  );
}
