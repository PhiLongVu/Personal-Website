import React from "react";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl max-auto text-center z-10">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="animate-fade-in"> Hi, I'm</span>
            <span className="text-primary animate-fade-in-delay-1">
              {" "}
              Phi
            </span>
            <span className="ml-2 animate-fade-in-delay-2"> Vu</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground max-h-2xl mx-auto animate-fade-in-delay-3">
            I create stellar web experiences with modern technologies. Specializing in front-end development, I build interfaces that areboth beautiful and functional.
          </p>
          <div className="pt-4 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
