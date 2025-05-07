import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TabView = () => {
  return (
    <div className="flex flex-col min-h-screen md:pb-0 bg-gray-50 sticky">
      <Tabs />
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};

const Tabs= () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();
  const switchtab = (label , path) =>{
    navigate(path)
    setActiveTab(label)

  }
  
  const tabs = [
    {label :"Home", path:"home"},
    {label :"Product", path:"products"},
    {label: "Supplier" , path:"supplier"},
    {label: "Rquest Quota" , path:"quota"}
];
  


  
  return (
 
<div className="bg-primary-dark shadow-sm py-3 ">
  <div className="container mx-auto px-4 flex  flex-col  justify-between gap-4">
    
    {/* Tabs */}
    <div className="flex gap-4 overflow-auto">
      {tabs.map(({ label, path }) => (
        <button
          key={label}
          className={`px-4 py-1.5 rounded-md text-xs  font-semibold transition
            ${activeTab === label
              ? 'bg-yellow-400 text-primary-dark'
              : 'bg-transparent border border-[#D2D6DB26] text-[#D2D6DB]'}`}
          onClick={() => switchtab(label, path)}
        >
          {label}
        </button>
      ))}
    </div>

    {/* Profile + Search */}
    <div className="flex items-center gap-4 w-full max-w-xl">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />

      <div className="flex items-center bg-[#005399] rounded-full px-4 py-2 flex-1">
        <input
          type="text"
          placeholder="Search products, stores..."
          className="bg-transparent text-white placeholder-white/60 flex-1 outline-none"
        />
        <FaSearch className="text-white text-lg" />
      </div>
    </div>

  </div>
</div>
    

           
  );
};


export default TabView;


