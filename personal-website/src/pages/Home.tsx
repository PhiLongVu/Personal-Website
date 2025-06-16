import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import HomePageGallery from '@/components/HomePageGallery';
import HomeBackground from '@/components/HomeBackground';
import NavBar from '@/components/NavBar';
import ThemeToggler from '@/components/ThemeToggler';
import HeroSection from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';

const Home = () => {
  return (<div>
    <ThemeToggler />
 
    <HomeBackground />
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </main>

    </div>
  )
}
export default Home;