import React from 'react';
import { Link } from 'react-router-dom'; 


const Header = () => {
  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-bold text-2xl">
          <Link to="/">Tarum</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-indigo-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-300">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 MyApp. All rights reserved.</p>
          <div className="space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };

  
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
