import React from "react";

const images = [
  "https://placekitten.com/100/100",
  "https://placebear.com/100/100",
  "https://placeimg.com/100/100/any",
  "https://picsum.photos/100/100",
  "https://loremflickr.com/100/100",
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Random3DImages = () => {
  const items = images.slice(0, 5).map((src, i) => {
    const z = getRandomInt(1, 10); // z-index 1 (far) to 10 (close)
    // Map z-index to size, e.g. from 50px (far) to 150px (close)
    const size = 50 + (z / 10) * 100; // 50px to 150px

    // To keep images within container, limit x and y based on size
    const maxPosition = 500 - size;
    const x = getRandomInt(0, maxPosition);
    const y = getRandomInt(0, maxPosition);

    return (
      <img
        key={i}
        src={src}
        alt={`random-${i}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          zIndex: z,
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: 8,
          userSelect: "none",
          pointerEvents: "none",
          transition: "all 0.3s ease",
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "relative",
        width: 500,
        height: 500,
        border: "1px solid #ccc",
        overflow: "hidden",
        background: "#f0f0f0",
      }}
    >
      {items}
    </div>
  );
};

export default Random3DImages;
