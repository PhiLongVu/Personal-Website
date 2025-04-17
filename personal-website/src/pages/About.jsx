import React from 'react'
import { NavLink } from "react-router-dom";
const About = () => {
  return (
    <div>
          <NavLink to="/">
        <img
          src="https://placehold.co/600x400"
          alt="Placeholder"
          className="cursor-pointer mx-auto mt-4 rounded-lg shadow-md transition-transform hover:scale-105"
        />
      </NavLink>
    </div>
  )
}

export default About
