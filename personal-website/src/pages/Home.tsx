import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import HomePageGallery from '@/components/HomePageGallery';
import HomeBackground from '@/components/HomeBackground';
import NavBar from '../components/NavBar';

const Home = () => {
  return (<div>
    <NavBar />
    <HomeBackground />
    </div>
  )
}
export default Home;