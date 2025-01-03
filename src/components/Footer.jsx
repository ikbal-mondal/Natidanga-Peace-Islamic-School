// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Logo and Description */}
           <div>
            <div className="flex items-center mb-3">
              <img src="/src/assets/school_logo.svg" alt="Natidanga School Logo" className="w-12 h-12 mr-3" />
              <h2 className="text-2xl font-bold">Natidanga School</h2>
            </div>
            <p className="text-gray-400">
              Empowering students with knowledge and skills to excel in life. Join us for a journey of discovery and learning.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary">
                  Admissions
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Address: Natidanga, Peace Islamic School</li>
              <li>Phone: +880 123-456-7890</li>
              <li>Email: info@natidangaschool.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Natidanga School. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f text-gray-400 hover:text-yellow-400"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter text-gray-400 hover:text-yellow-400"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in text-gray-400 hover:text-yellow-400"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
