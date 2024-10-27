'use client';

import { useState, useEffect, useRef } from 'react';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

interface Video {
  id: string;
  url: string;
  likes: number;
  comments: Comment[];
}

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  onCommentVisibilityChange: (isVisible: boolean) => void;
}

export default function VideoPlayer({ video, isActive, onCommentVisibilityChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let playPromise: Promise<void> | undefined;

    if (isActive) {
      playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Error playing video:', error);
          }
        });
      }
    } else {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoElement.pause();
        }).catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Error pausing video:', error);
          }
        });
      } else {
        videoElement.pause();
      }
    }

    setIsPlaying(isActive);

    return () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoElement.pause();
        }).catch(() => {
          // Ignore the error
        });
      } else {
        videoElement.pause();
      }
    };
  }, [isActive, video.url]);

  const toggleComments = () => {
    setShowComments(!showComments);
    onCommentVisibilityChange(!showComments);
  };

  return (
    <div className="relative w-full h-full bg-black">
      <div className={`transition-all duration-300 ${showComments ? 'h-1/2' : 'h-full'}`}>
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
        />
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        <LikeButton initialLikes={video.likes} />
        <button
          onClick={toggleComments}
          className="flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-full p-3 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs mt-1">{video.comments.length}</span>
        </button>
      </div>
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl transition-all duration-300 ease-in-out transform translate-y-0 h-1/2">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">评论 ({video.comments.length})</h3>
            <button onClick={toggleComments} className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
            <CommentSection comments={video.comments} />
          </div>
        </div>
      )}
    </div>
  );
}
