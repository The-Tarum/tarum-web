import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col justify-center items-center text-white py-16">
      <h1 className="text-5xl font-bold text-center mb-4">Welcome to MyApp!</h1>
      <p className="text-lg text-center mb-8">Your one-stop solution for all your needs. Start exploring now!</p>
      <button className="bg-blue-700 hover:bg-blue-800 text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
        Get Started
      </button>
      <button className="bg-primary hover:bg-primary-dark text-white p-4 text-lg font-semibold">
  Click Me
</button>
    </div>
  );
};

export default HomePage;
