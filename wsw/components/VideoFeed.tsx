'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import VideoPlayer from './VideoPlayer';
import { fetchVideos } from '../lib/api';
import BottomNav from './BottomNav';

interface Video {
  id: string;
  url: string;
  likes: number;
  comments: Comment[];
}

const FETCH_THRESHOLD = 3; // 当剩余这么多视频时开始获取新视频

export default function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showBottomNav, setShowBottomNav] = useState(true);

  const loadMoreVideos = useCallback(async () => {
    try {
      const newVideos = await fetchVideos(FETCH_THRESHOLD);
      setVideos(prevVideos => [...prevVideos, ...newVideos]);
    } catch (error) {
      console.error('Error loading more videos:', error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadMoreVideos().then(() => setIsLoading(false));
  }, [loadMoreVideos]);

  useEffect(() => {
    if (videos.length - currentIndex <= FETCH_THRESHOLD) {
      loadMoreVideos();
    }
  }, [currentIndex, videos.length, loadMoreVideos]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'));
        if (!isNaN(index)) {
          setCurrentIndex(index);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
      });

      const videoElements = containerRef.current.querySelectorAll('.video-item');
      videoElements.forEach((el) => observerRef.current?.observe(el));

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [videos, handleIntersection]);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    if (containerRef.current) {
      const delta = e.deltaY;
      const currentScroll = containerRef.current.scrollTop;
      const targetScroll = currentScroll + delta;
      
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleCommentVisibilityChange = useCallback((isVisible: boolean) => {
    setShowBottomNav(!isVisible);
  }, []);

  if (isLoading && videos.length === 0) return <div>Loading videos...</div>;

  return (
    <div className="relative h-screen">
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        onWheel={handleScroll}
      >
        {videos.map((video, index) => (
          <div 
            key={video.id} 
            className="video-item h-full snap-start"
            data-index={index}
          >
            <VideoPlayer 
              video={video} 
              isActive={index === currentIndex}
              onCommentVisibilityChange={handleCommentVisibilityChange}
            />
          </div>
        ))}
        {videos.length - currentIndex <= FETCH_THRESHOLD && (
          <div className="h-full flex items-center justify-center">
            Loading more videos...
          </div>
        )}
      </div>
      {showBottomNav && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <BottomNav />
        </div>
      )}
    </div>
  );
}
