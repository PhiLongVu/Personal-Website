import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="header bg-gradient-to-b from-black from-80% via-transparent to-zinc-900 to-95% ">
      <div className="flex w-full items-center">
        <NavLink
          to="/"
          end
          className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md text-black"
        >
          <p className="blue-gradient_text">PV</p>
        </NavLink>
        <nav className="flex text-lg gap-7 mx-7 font-light">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            Projects
          </NavLink>
          <NavLink to="/contact"   className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
