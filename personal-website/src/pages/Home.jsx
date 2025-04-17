import React from 'react'
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    
    <div>    <h1>Rick Astley</h1> 
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">hi</button>
    <h2>Never Gonna Give You Up</h2> 
    <h3>Lyrics</h3> 
    <h3>Cover Versions</h3> 
    <h3>Rick-rolling</h3> 
    <h2>
    <h2>
      "Never Gonna Give You Up" is a pop song by English singer Rick Astley, 
released on 27 July 1987. 
 
The song became a worldwide hit, initially in the United Kingdom in 1987, 
where it stayed at the top of the chart for five weeks and was the 
best-selling single of that year. 
 
The video resurged in popularity in 2007 due to the bait-and-switch 
"Rickroll" Internet meme.
    </h2>

    </h2>
    <NavLink to="/about">
        <img
          src="https://placehold.co/600x400"
          alt="Placeholder"
          className="cursor-pointer mx-auto mt-4 rounded-lg shadow-md transition-transform hover:scale-105"
        />
      </NavLink>
    </div>
    
  )
}

export default Home
