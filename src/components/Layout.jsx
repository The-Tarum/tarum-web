import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

// Import SVGs
import MailIcon from '../assets/mail.svg';
import BookOpenIcon from '../assets/book-open.svg';
import StorefrontIcon from '../assets/storefront.svg';
import UsersIcon from '../assets/users.svg';
import SettingsIcon from '../assets/settings.svg';
import Message from '../assets/message.svg';

import MailIconFill from '../assets/mail-filled.svg';
import BookOpenIconFill from '../assets/book-open-filled.svg';
import StorefrontIconFill from '../assets/storefront-filled.svg';
import UsersIconFill from '../assets/users-filled.svg';
import SettingsIconFill from '../assets/settings-filled.svg';
import MessageFill from '../assets/message-filled.svg';

import { useAppContext } from '../context/AppContext';

// Mobile header
const MobileHeader = () => {
  const navigate = useNavigate();
  const { title } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-primary-dark text-white sticky top-0 z-10 pt-3">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center  border-b border-primary-dark">
        <div className="font-semibold text-md tracking-wide">
          <Link to="/" className="hover:opacity-90 transition">{title}</Link>
        </div>
   
      </div>
    </header>
  );
};

// Desktop header
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-primary-dark text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center md:px-6 border-b border-primary-dark">
        <div className="font-semibold text-md tracking-wide">
          <Link to="/" className="hover:opacity-90 transition">Tarum</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="hover:text-indigo-300">Products</Link>
          <Link to="/categories" className="hover:text-indigo-300">Categories</Link>
          <Link to="/about" className="hover:text-indigo-300">About</Link>
          <button
            onClick={handleLogout}
            className="bg-white text-primary-light px-4 py-1 rounded-full hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

// Mobile bottom navigation
const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    path.startsWith('/marketplace')
      ? location.pathname.startsWith('/marketplace')
      : location.pathname === path;

  const navItems = [
    { path: '/email', label: 'Email', icon: MailIcon, iconFill: MailIconFill },
    { path: '/products', label: 'Contacts', icon: BookOpenIcon, iconFill: BookOpenIconFill },
    { path: '/marketplace/home', label: 'Marketplace', icon: StorefrontIcon, iconFill: StorefrontIconFill },
    { path: '/chats', label: 'Chats', icon: Message, iconFill: MessageFill },
    { path: '/groups', label: 'Groups', icon: UsersIcon, iconFill: UsersIconFill },
    { path: '/settings', label: 'Settings', icon: SettingsIcon, iconFill: SettingsIconFill },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 grid grid-cols-6 font-medium">
      {navItems.map(({ path, label, icon, iconFill }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`group inline-flex flex-col items-center justify-center transition-colors ${!isActive(path) ? 'hover:bg-gray-50' : ''}`}
        >
          <img src={isActive(path) ? iconFill : icon} alt={label} className="w-5 h-5" />
          <span
            className={`text-[11px] leading-[20px] text-center font-[Graphik] font-normal transition-colors ${
              isActive(path)
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#1F73F7] to-[#F15F60]'
                : 'text-[#9DA4AE]'
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

// Footer (only for desktop)
const Footer = () => (
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

// Main layout component
const Layout = () => {
  const { isMobileApp } = useAppContext();
  console.log(isMobileApp)

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 bg-gray-50 ">
      {isMobileApp ? <MobileHeader /> : <Header />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
