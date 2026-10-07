'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => console.log('Autoplay error:', err));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none"
    >
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  );
}