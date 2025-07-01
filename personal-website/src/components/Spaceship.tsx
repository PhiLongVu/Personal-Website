import React, { useState } from "react";

const sampleItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const Spaceship = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="fixed z-50 pointer-events-auto max-w-[80px] right-[1%] bottom-[1.5%] flex justify-end">
      <div className="relative">
        <button
          className="
            cursor-pointer
            duration-150
            hover:scale-105
            hover:drop-shadow-flat-hover
            animate-bobbing
            p-0
            bg-transparent
            border-none
            outline-none
            w-25
            h-25
          "
          aria-label="Spaceship icon"
          onClick={() => setShowPopup(!showPopup)}
        >
          <img
            src="images/spaceship.webp"
            alt="Spaceship icon"
            draggable={false}
            loading="lazy"
            decoding="async"
            className="hidden dark:block w-full h-full object-contain"
            style={{ color: "transparent" }}
          />
        </button>

        {showPopup && (
          <div className="overscroll-contain absolute bottom-full mb-2 right-0 w-48 h-60 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg z-50 overflow-y-auto p-3 scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">

            <h3 className="text-sm font-semibold mb-2">🚀 Spaceship Menu</h3>
            <ul className="space-y-1 text-sm">
              {sampleItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spaceship;
