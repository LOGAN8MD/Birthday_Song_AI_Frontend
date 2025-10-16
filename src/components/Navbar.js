import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#280051] shadow-lg z-50">
      <div className="container mx-auto px-4 py-1 md:py-0">
        <div className="flex items-center justify-between">
          {/* Left: Cadbury Logo */}
          <div className="flex items-center">
            <img
              src="/assets/Cadbury Logo.png"
              alt="Cadbury"
              className="h-8 sm:h-10 md:h-10 w-auto"
            />
            
            {/* Small gap */}
            <div className="w-4 sm:w-6"></div>
            
            {/* 2D Logo */}
            <img
              src="/assets/2d logo.png"
              alt="2D Logo"
              className="h-16 sm:h-9 md:h-20 w-auto"
            />
          </div>

          {/* Right: Hamburger Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-purple-500 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-white rounded"></span>
                <span className="w-full h-0.5 bg-white rounded"></span>
                <span className="w-full h-0.5 bg-white rounded"></span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-purple-600 rounded-md shadow-lg py-1 border border-purple-400">
                {/* <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-purple-500 transition-colors">
                  Home
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-purple-500 transition-colors">
                  About
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-purple-500 transition-colors">
                  Contact
                </a> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;