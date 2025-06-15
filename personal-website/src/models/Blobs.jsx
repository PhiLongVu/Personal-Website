import React from 'react';
import { spline } from '@georgedoescode/spline';

const Blob = ({ id, cx, cy, r, delay }) => {
  // Convert percentage-based cx, cy to pixel coordinates
  const svgWidth = 100; // Match mask div width (100px)
  const svgHeight = 750; // Approximate h-[80vh] (~750px)
  const cxPercent = parseFloat(cx); // e.g., 0 to 100
  const cyPercent = parseFloat(cy); // e.g., 0 to 100
  if (isNaN(cxPercent) || isNaN(cyPercent)) {
    console.error(`Invalid cx or cy for blob ${id}: ${cx}, ${cy}`);
    return null;
  }
  const cxPixels = (cxPercent / 100) * svgWidth;
  const cyPixels = (cyPercent / 100) * svgHeight;

  // Generate random points for the blob
  const numPoints = 13; // Fewer points for smaller blobs in 100px width
  const angleStep = (Math.PI * 2) / numPoints;
  const points = [];
  let lastRadius = r;
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep + (Math.random() - 0.5) * 0.2; // Jitter
    const targetRadius = r * (0.7 + Math.random() * 0.6); // 70%-130%
    const randomRadius = (lastRadius + targetRadius) / 2; // Smooth transitions
    lastRadius = randomRadius;
    const x = cxPixels + Math.cos(angle) * randomRadius;
    const y = cyPixels + Math.sin(angle) * randomRadius;
    points.push({ x, y });
  }

  // Generate smooth SVG path
  const path = spline(points, 1, true); // tension=1, closed=true

  // Animation
  const randomDuration = 7 + Math.random() * 3; // 7s to 10s
  const easing = ['ease-in-out', 'ease-in', 'ease-out', 'linear'][Math.floor(Math.random() * 4)];

  return (
    <path
      key={id}
      id={`blob-${id}`}
      className="blob"
      d={path}
      fill="black" // Black for mask (inverted in mask)
      style={{
        animationDelay: `-${delay}s`,
        animationDuration: `${randomDuration}s`,
        animationTimingFunction: easing,
      }}
    />
  );
};

export default Blob;