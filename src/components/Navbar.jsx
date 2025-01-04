// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary p-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/school_logo.svg"
              alt="Natidanga School Logo"
              className="h-12 w-12 object-cover" // Adjust height and width as needed
            />
            <span className="text-white text-xl font-semibold ml-2">
              Natidanga School
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/about"
            className="text-white relative pb-1 group font-semibold"
          >
            About
            {/* Animated Border */}
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] rounded-full bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-white"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu (Hidden by default, appears when the button is clicked) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform duration-300 ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        onClick={toggleMenu} // Close the menu if the overlay is clicked
      >
        <div
          className={`bg-primary w-64 h-full absolute left-0 top-0 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white"
              aria-label="Close Menu"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Links */}
          <div className="space-y-4 p-4">
            <Link
              to="/about"
              className="block text-white hover:text-primary text-lg px-4 py-2 hover:bg-white"
              onClick={toggleMenu} // Close the menu after link click
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
