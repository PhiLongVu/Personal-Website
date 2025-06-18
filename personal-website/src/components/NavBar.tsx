import { NavLink } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { cn } from "@/utils/util";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "home", path: "#hero" },
  { name: "about", path: "#about" },
  { name: "skills", path: "#skills" },
  { name: "projects", path: "#projects" },
  { name: "contact", path: "#contact" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a className="text-xl text-glow flex items-center">
          <img src="/images/logo.svg" alt="Logo" />
        </a>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.path}
              className={cn(
                "text-foreground/80 hover:text-primary hover:animate-lift-up transition-colors duration-300"
              )}
            >
              {item.name.toUpperCase()}
            </a>
          ))}
        </div>
        {/** Mobile Nav */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center gap-y-6">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.path}
                className={cn(
                  "text-foreground/80 hover:text-primary transition-colors duration-300"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
