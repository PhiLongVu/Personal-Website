import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import HomeBackground from "@/components/HomeBackground";
import NavBar from "@/components/NavBar";
import ThemeToggler from "@/components/ThemeToggler";
import HeroSection from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Contact } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import DraggableWindow from "@/components/DraggableWindow";
import MatterParticles from "@/components/MatterParticles";
import CursorFollower from "@/components/CursorFollower";
import Spaceship from "@/components/Spaceship";
import DraggableCard from "@/components/DraggableCard"; // Add this import if Card is a component

const Home = () => {
  return (
    <div>
      <Spaceship />
      <ThemeToggler />
      <CursorFollower />
      <HomeBackground />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};
export default Home;
