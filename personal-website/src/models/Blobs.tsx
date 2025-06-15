import React from 'react';
// @ts-ignore
import { spline } from '@georgedoescode/spline';

interface BlobProps {
  id: number | string;
  cx: string; // assuming percentage-based input, e.g., "50"
  cy: string;
  r: number;
  delay: number;
}

const Blob: React.FC<BlobProps> = ({ id, cx, cy, r, delay }) => {
  // Convert percentage-based cx, cy to pixel coordinates
  const svgWidth = 100; // Match mask div width (100px)
  const svgHeight = 750; // Approximate h-[80vh] (~750px)
  const cxPercent = parseFloat(cx);
  const cyPercent = parseFloat(cy);

  if (isNaN(cxPercent) || isNaN(cyPercent)) {
    console.error(`Invalid cx or cy for blob ${id}: ${cx}, ${cy}`);
    return null;
  }

  const cxPixels = (cxPercent / 100) * svgWidth;
  const cyPixels = (cyPercent / 100) * svgHeight;

  // Generate random points for the blob
  const numPoints = 13;
  const angleStep = (Math.PI * 2) / numPoints;
  const points: { x: number; y: number }[] = [];
  let lastRadius = r;

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep + (Math.random() - 0.5) * 0.2;
    const targetRadius = r * (0.7 + Math.random() * 0.6);
    const randomRadius = (lastRadius + targetRadius) / 2;
    lastRadius = randomRadius;
    const x = cxPixels + Math.cos(angle) * randomRadius;
    const y = cyPixels + Math.sin(angle) * randomRadius;
    points.push({ x, y });
  }

  // Generate smooth SVG path
  const path: string = spline(points, 1, true); // tension=1, closed=true

  // Animation
  const randomDuration = 7 + Math.random() * 3;
  const easingOptions = ['ease-in-out', 'ease-in', 'ease-out', 'linear'] as const;
  const easing = easingOptions[Math.floor(Math.random() * easingOptions.length)];

  return (
    <path
      key={id}
      id={`blob-${id}`}
      className="blob"
      d={path}
      fill="black"
      style={{
        animationDelay: `-${delay}s`,
        animationDuration: `${randomDuration}s`,
        animationTimingFunction: easing,
      }}
    />
  );
};

export default Blob;
