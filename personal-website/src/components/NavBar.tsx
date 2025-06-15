import { NavLink } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";

const NavBar = () => {
  return (
    <header className="header bg-gradient-to-b from-black from-80% via-transparent to-zinc-900 to-95% z-100 mx-auto">
      <div className="flex w-full items-center gap-30">
        <NavLink
          to="/"
          end
          className="items-center justify-center flex font-bold shadow-md text-black p-3"
        >
            <img
              src="images/logo.svg"
              alt="Logo"
            />
        </NavLink>
        <nav className="flex text-lg gap-12 mx-7 font-light">
          <ThemeToggler />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-white"
            }
          >
            CONTACT
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
