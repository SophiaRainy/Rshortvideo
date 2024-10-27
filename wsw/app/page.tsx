'use client';

import VideoFeed from '../components/VideoFeed';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <VideoFeed />
    </main>
  );
}
