import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-400 text-white py-3 px-6 flex justify-between items-center relative">
      {/* Logo / Title */}
      <div className="flex items-center space-x-4">
        <span className="text-xl md:text-2xl font-medium">
          Hukum Singh Thakur Cricket Tournament
        </span>
      </div>

      {/* Hamburger icon for mobile screens */}
      <div className="md:hidden relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-8 h-8 text-white"
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
          <div className="absolute right-0 mt-2 w-48 bg-orange-500 text-white rounded-lg shadow-lg z-50">
            <a href="/admin" className="block px-4 py-2 hover:bg-orange-600">Admin Panel</a>
            <a href="/register" className="block px-4 py-2 hover:bg-orange-600">Apply for Tournament</a>
            <a href="/regulations" className="block px-4 py-2 hover:bg-orange-600">Rules & Regulations</a>
          </div>
        )}
      </div>

      {/* Links for larger screens */}
      <div className="hidden md:flex text-base md:text-lg space-x-6">
        <a href="#" className="hover:underline">Admin Panel</a>
        <a href="/register" className="hover:underline">Apply for Tournament</a>
        <a href="/regulations" className="hover:underline">Rules & Regulations</a>
      </div>
    </nav>
  );
};

export default Navbar;
