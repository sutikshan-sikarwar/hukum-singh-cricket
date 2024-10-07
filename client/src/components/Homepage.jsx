import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExploreMore from './ExploreMore';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
<section className="relative w-full h-[400px] bg-cover bg-center">
  <div className="absolute inset-0">
    {/* Mobile Image */}
    <img className="h-full w-full opacity-90 block md:hidden" src="banner.png" alt="Banner" />
    {/* Desktop Image */}
    <img className="h-full w-full opacity-90 hidden md:block" src="homeimage.png" alt="Hero" />
  </div>
</section>


      {/* Welcome Section */}
      <section className="bg-white text-center py-8 px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to the Late Shri Hukum Singh Thakur Memorial Cricket Tournament
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Mayank Chaturvedi cricket organization Committee and Cricket Academy presents
        </p>
        <p className="mb-6 text-sm md:text-base">
          B.D.C.A Affiliated, All India level day night cricket T-20 & 50 over Tournament
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
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

      {/* Explore More Section */}
      <ExploreMore />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
