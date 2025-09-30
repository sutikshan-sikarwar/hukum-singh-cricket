import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleApplyNow = () => {
    navigate('/');
    // The modal will be handled by the Homepage component
    setTimeout(() => {
      const applyButton = document.querySelector('[data-apply-now]');
      if (applyButton) {
        applyButton.click();
      }
    }, 100);
  };

  return (
    <nav className="bg-orange-400 text-white py-4 px-4 sm:px-6 flex justify-between items-center relative">
      {/* Logo / Title */}
      <div className="flex items-center space-x-4">
        <img 
          src="/logo.jpg" 
          alt="Tournament Logo" 
          className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full object-cover"
        />
        <span className="text-lg pr-4 sm:text-lg md:text-xl lg:text-2xl font-medium ">
          Late Hukum Singh Thakur Memorial Cricket Tournament
        </span>
      </div>

      {/* Hamburger icon for mobile screens */}
      <div className="md:hidden relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Popup Menu for mobile screens */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-orange-500 text-white rounded-lg shadow-lg z-50">
            <a href="/adminlogin" className="block px-3 py-2 sm:px-4 hover:bg-orange-600">Admin Panel</a>
            <button onClick={handleApplyNow} className="block w-full text-left px-3 py-2 sm:px-4 hover:bg-orange-600">Apply Now</button>
          </div>
        )}
      </div>

      {/* Links for larger screens */}
      <div className="hidden md:flex text-sm sm:text-base md:text-lg space-x-4 sm:space-x-6">
        <a href="/adminlogin" className="hover:underline">Admin Panel</a>
        <button onClick={handleApplyNow} className="hover:underline">Apply Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
