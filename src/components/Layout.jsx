import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center md:px-6 border-b border-indigo-500/50">
        {/* Logo */}
        <div className="font-bold text-2xl tracking-wide">
          <Link to="/" className="hover:opacity-90 transition">Tarum</Link>
        </div>

        {/* Search bar - visible on all devices now */}
        <div className="flex-1 mx-4">
          <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm text-black">
            <Search className="w-4 h-4 mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop nav only */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="hover:text-indigo-300">Products</Link>
          <Link to="/categories" className="hover:text-indigo-300">Categories</Link>
          <Link to="/about" className="hover:text-indigo-300">About</Link>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-4 py-1 rounded-full hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/categories', label: 'Categories', icon: '📂' },
    { path: '/products', label: 'Products', icon: '🔍' },
    { path: '/orders', label: 'Orders', icon: '📦' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm px-4 py-2 flex justify-around text-sm text-gray-700 md:hidden z-50">
      {navItems.map(({ path, label, icon }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center transition ${
            isActive(path) ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-400'
          }`}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm">&copy; 2025 Tarum. All rights reserved.</p>
        <div className="space-x-6 mt-4 text-sm">
          <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
