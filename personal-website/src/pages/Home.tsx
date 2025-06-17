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
import { Contact } from 'lucide-react';
import { ContactSection } from '@/components/ContactSection';
import DraggableWindow from '@/components/DraggableWindow';
import Matter from 'matter-js';
import MatterParticles from '@/components/MatterParticles';

const Home = () => {
  return (<div>
    <ThemeToggler />
 
    <HomeBackground />
    <NavBar />
    <main>
      <HeroSection />
          <DraggableWindow title="My Window" width={350} height={250}>
      <p>This content can be shown or hidden by collapsing the window.</p>
    </DraggableWindow>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <MatterParticles />
    </main>

    </div>
  )
}
export default Home;