import React, { useMemo } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const images = [
  "images/star_1.webp",
  "images/star_2.webp",
  "images/star_3.webp",
  "images/star_4.webp",
  "images/star_5.webp",
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const BATCHES = 5;
const SCROLL_RANGE = 10000;
const MOTION_RANGE = 1000; // vertical motion distance
const SCROLL_SPEED_FACTOR = 0.3; // slow down multiplier
const MAX_SIZE = 15;

const InfiniteScrollFloatImages: React.FC = () => {
  const { scrollY } = useViewportScroll();

  const containerWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;

  // Precompute batches once
  const batches = useMemo(() => {
    return Array.from({ length: BATCHES }, (_, batchIndex) => {
      return images.map((src, i) => {
        const z = getRandomInt(1, 10); // 1 = farthest, 10 = closest
        const size = 50 + (z / 10) * (MAX_SIZE - 50);
        const x = getRandomInt(0, containerWidth - size);

        const baseY = batchIndex * 600 + i * 100;
        const scrollOffset = baseY + getRandomInt(-50, 50);

        // Rotation between -30 and +30 degrees
        const rotation = getRandomFloat(-30, 30);

        return { src, size, x, baseY: scrollOffset, z, rotation };
      });
    }).flat();
  }, [containerWidth]);

  return (
    <div style={{ height: `${SCROLL_RANGE}px`, position: "relative" }}>
      {/* Tailwind container with fixed position, full viewport size, pointer-events none, overflow hidden, and behind cursor with negative z-index */}
      <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden">
        {batches.map(({ src, size, x, baseY, z, rotation }, i) => {
          const speed = 0.1 + ((z - 1) / 9) * 0.9;

          const y = useTransform(
            scrollY,
            [0, SCROLL_RANGE],
            [baseY, baseY - MOTION_RANGE * speed * SCROLL_SPEED_FACTOR]
          );

          const opacityValue = 0.2 + ((z - 1) / 9) * 0.8;

          return (
            <motion.img
              key={`img-${i}`}
              src={src}
              loading="lazy"
              alt={`img-${i}`}
              style={{
                position: "absolute",
                left: x,
                width: size,
                height: size,
                objectFit: "cover",
                borderRadius: 8,
                userSelect: "none",
                pointerEvents: "none",
                y,
                opacity: opacityValue,
                rotate: rotation,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                zIndex: -10,
              }}
              className="select-none pointer-events-none rounded-md"
            />
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteScrollFloatImages;
