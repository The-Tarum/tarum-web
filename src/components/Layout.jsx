import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // You can replace with any icon lib you use

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-indigo-600 text-white py-4 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-bold text-2xl">
          <Link to="/">Tarum</Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <Link to="/products" className="hover:text-indigo-300">Products</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-indigo-300">Categories</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-300">About</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden px-6 mt-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link to="/products" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>Categories</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; 2025 Tarum. All rights reserved.</p>
        <div className="space-x-4 mt-4">
          <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
