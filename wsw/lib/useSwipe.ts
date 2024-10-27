import { useState, TouchEvent } from 'react';

export const useSwipe = () => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = (): 'up' | 'down' | null => {
    if (!touchStart || !touchEnd) return null;
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    if (isUpSwipe) return 'up';
    if (isDownSwipe) return 'down';
    return null;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
