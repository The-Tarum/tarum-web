import React from 'react';

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

export default Footer;
