"use client";

import React, { useEffect, useRef, useState } from "react";

const ScrollVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollSpeedFactor = 0.05;
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  // Set the initial scroll position on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollYRef.current = window.scrollY;
    }
  }, []);

  // When metadata is loaded, set duration and "prime" the video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log("Metadata loaded. Duration:", video.duration);
      setVideoDuration(video.duration);
      // Prime the video: play then pause so that updates to currentTime render
      video.play()
        .then(() => {
          video.pause();
          console.log("Video primed with play-pause.");
        })
        .catch((error) => {
          console.error("Error playing the video:", error);
        });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, []);

  // Update the video time – you can use a smooth easing or direct assignment for testing
  useEffect(() => {
    let animationFrameId: number;
    const easeFactor = 0.1;
    let lastLogTime = Date.now();

    const updateVideoTime = () => {
      const video = videoRef.current;
      if (video && isFinite(video.currentTime) && isFinite(targetTimeRef.current)) {
        // Clamp the targetTime between 0 and videoDuration
        targetTimeRef.current = Math.max(
          0,
          Math.min(videoDuration ?? 10, targetTimeRef.current)
        );
        // Option 1: Smooth easing
        video.currentTime += (targetTimeRef.current - video.currentTime) * easeFactor;

        // Option 2: Direct assignment (for debugging, uncomment to test)
        // video.currentTime = targetTimeRef.current;
      }

      // Log every second to see updates
      const now = Date.now();
      if (now - lastLogTime > 1000) {
        console.log("updateVideoTime -> currentTime:", video?.currentTime, "targetTime:", targetTimeRef.current);
        lastLogTime = now;
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, [videoDuration]);

  // Listen for scroll events and update targetTime accordingly
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video || videoDuration === null || !isFinite(videoDuration)) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Update targetTime based on scroll delta
      targetTimeRef.current = Math.max(
        0,
        Math.min(videoDuration, targetTimeRef.current + delta * scrollSpeedFactor)
      );
      console.log("handleScroll -> delta:", delta, "new targetTime:", targetTimeRef.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videoDuration]);

  return (
    <div style={{ height: "200vh", margin: 0, padding: 0 }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          muted
          playsInline
          autoPlay={false}
        >
          <source
            src="https://cdn.pixabay.com/video/2016/04/02/2637-161442811_medium.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ScrollVideo;
