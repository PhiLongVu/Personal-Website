import React from "react";

const Spaceship = () => {
  return (
    <div className="fixed z-50 pointer-events-auto max-w-[80px] right-[1%] bottom-[1.5%] flex justify-end">
      <div>
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
          onClick={() => alert('Spaceship clicked!')}
        >
          <img
            src="images/spaceship.webp"
            alt="Spaceship icon"
            draggable={false}
            loading="lazy"
            decoding="async"
            className="hidden dark:block w-full h-full object-contain"
            style={{ color: 'transparent' }}
          />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default Spaceship;
