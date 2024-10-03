import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExploreMore from './ExploreMore';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] bg-cover bg-center">
        
        {/* Add this image to the public folder and use its relative path */}
        <div className="absolute inset-0 bg-black bg-opacity-20">
        <img className='h-[400px] w-full opacity-60' src="homeimage.jpg" alt="" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="bg-white text-center py-8 px-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to the Late Shri Hukum Singh Thakur Memorial Cricket Tournament
        </h1>
        <p className="text-2xl mb-6">
          Mayank Chaturvedi cricket organization Committee and Cricket Academy presents
        </p>
        <p className='mb-6'>
          B.D.C.A Affilated, All India level day night cricket T-20 & 50 over Tournament  
        </p>
        <div className="flex justify-center space-x-4">
            <Link to="/register">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
            Apply Now
          </button>
          </Link>
          <Link to="/regulations">
          <button className="border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-100">
            View Rules & Regulations
          </button>
          </Link>
        </div>
      </section>
      <ExploreMore/>
      <Footer/>
    </div>
  );
};

export default Homepage;
