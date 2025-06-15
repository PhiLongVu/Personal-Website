import React from 'react'
import { NavLink } from "react-router-dom";
const About = () => {
  return (
    <div className="relative w-[300px] h-[600px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 600">
        <defs>
          <mask id="l-mask">
            <rect width="100%" height="100%" fill="black" />
            <path
              d={`
                M 0 0
                H 200
                V 300
                Q 200 400 300 400
                V 600
                H 0
                Z
              `}
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0 bg-blue-500 text-white flex items-center justify-center text-center p-4"
        style={{
          mask: 'url(#l-mask)',
          WebkitMask: 'url(#l-mask)',
        }}
      >
        <p className="text-lg font-bold">L-shaped masked content</p>
      </div>
    </div>
  );
};


export default About
