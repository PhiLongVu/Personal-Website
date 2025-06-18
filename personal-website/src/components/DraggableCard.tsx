import React, { useState, useRef, useEffect } from "react";

type DraggableCardProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "static" | "draggable" | "fixed"; // NEW prop
};

const DraggableCard: React.FC<DraggableCardProps> = ({
  title = "Card Title",
  children,
  variant = "draggable", // default
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [closed, setClosed] = useState(false);

  const isDraggable = variant === "draggable" || variant === "fixed";
  const isFixed = variant === "fixed";

  const onDragMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!isDraggable) return;

    const onMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      }
    };

    const onMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, isDraggable]);

  if (closed) return null;

  return (
    <div
      ref={cardRef}
      style={
        isDraggable
          ? {
              top: position.y,
              left: position.x,
              position: isFixed ? "fixed" : "absolute",
            }
          : undefined
      }
      className={`${
        isDraggable ? "z-50" : ""
      } w-[650px] h-[400px] bg-white border-2 rounded-xl shadow-lg flex flex-col select-none ${
        isDraggable ? "cursor-move" : ""
      } ${!isDraggable ? "relative" : ""}`}
    >
      {/* Header */}
      <div
        onMouseDown={onDragMouseDown}
        className={`flex justify-between items-center px-6 py-3 bg-card text-white font-mono text-xl ${
          isDraggable ? "cursor-grab" : ""
        }`}
      >
        <div>{title}</div>
        <button
          onClick={() => setClosed(true)}
          onMouseDown={(e) => e.stopPropagation()}
          className="hover:scale-110 active:scale-90 transition-transform duration-100 text-white font-bold text-xl"
          aria-label="Close card"
        >
          [x]
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow p-6 grid grid-cols-4 grid-rows-2 gap-4 place-items-center overflow-auto">
        {children}
      </div>

      {/* Footer */}
      <p className="hidden md:block mt-2 px-12 pt-3 pb-4 rounded-md border border-gray-300 text-sm text-gray-600">
        Clicking any of the links will open a new tab!
      </p>
    </div>
  );
};

export default DraggableCard;
