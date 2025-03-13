// components/RainAnimation.tsx
"use client";

import React, { useEffect, useRef } from "react";

interface Raindrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  splashRadius: number;
  splashAlpha: number;
  isSplashing: boolean;
}

const RainAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const raindrops: Raindrop[] = [];

    const createRaindrop = (): Raindrop => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      speed: 4 + Math.random() * 4,
      length: 10 + Math.random() * 10,
      opacity: 0.5 + Math.random() * 0.5,
      splashRadius: 0,
      splashAlpha: 0,
      isSplashing: false,
    });

    // Initialize a fixed number of raindrops for testing
    const raindropCount = Math.floor(width / 27);
    for (let i = 0; i < raindropCount; i++) {
      raindrops.push(createRaindrop());
    }

    const draw = () => {
      // Clear canvas; background is drawn via CSS
      ctx.clearRect(0, 0, width, height);

      raindrops.forEach((drop) => {
        if (!drop.isSplashing) {
          // Draw falling raindrop (white)
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;

          // Trigger splash when nearing the bottom
          if (drop.y > height - drop.length) {
            drop.isSplashing = true;
            drop.splashAlpha = drop.opacity;
          }
        } else {
          // Draw splash as an expanding white circle at the bottom
          ctx.beginPath();
          ctx.arc(drop.x, height - 2, drop.splashRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${drop.splashAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          drop.splashRadius += drop.speed * 0.5;
          drop.splashAlpha -= 0.02;
          // Reset drop when splash fades out
          if (drop.splashAlpha <= 0) {
            Object.assign(drop, createRaindrop());
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black", // Black background
        zIndex: -1,
      }}
    />
  );
};

export default RainAnimation;
