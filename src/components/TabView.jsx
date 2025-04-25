import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TabView = () => {
  return (
    <div className="flex flex-col min-h-screen md:pb-0 bg-gray-50">
      <Tabs />
      <main className="flex-grow">
        <Outlet />
      </main>

    </div>
  );
};

const Tabs= () => {
  const [activeTab, setActiveTab] = useState('Product');
  const navigate = useNavigate();
  const switchtab = (label , path) =>{
    navigate(path)
    setActiveTab(label)

  }
  
  const tabs = [
    {label :"Product", path:"products"},
    {label: "Supplier" , path:"supplier"}
];
  
  
  return (
 

      <div className="bg-pimrary-dark shadow-sm">
 <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Tabs */}
            <div className="flex space-x-6">
              {tabs.map(({label ,path}) => (
                <button
                  key={label}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === label
                      ? ' text-[#005399]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => switchtab(label,path)}
                >
                  {label}
                </button>
              ))}
            </div>
        </div>
        <div className="relative w-full md:w-96 py-3">
                    <input
                      type="text"
                      placeholder="Search products or suppliers..."
                      className="w-full p-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
           
                    />
                    <FiSearch className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  </div>
    </div>
</div>        

           
  );
};


export default TabView;


