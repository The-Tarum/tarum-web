import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const TabView = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <Tabs />
      <main className="flex-grow  ">
        <Outlet />
      </main>
    </div>
  );
};

const Tabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle } = useAppContext();

  const tabs = [
    { label: "Home", path: "home" },
    { label: "Product", path: "products" },
    { label: "Supplier", path: "supplier" },
    { label: "Request Quota", path: "quota" },
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname.split("/").pop();
    const matchedTab = tabs.find((tab) => tab.path === currentPath);
    return matchedTab ? matchedTab.label : "Home";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    const currentLabel = getActiveTab();
    setActiveTab(currentLabel);
    setTitle(currentLabel);
  }, [location.pathname]);

  const switchtab = (label, path) => {
    navigate(path);
    setActiveTab(label);
    setTitle(label);
  };

  return (
    <header className="bg-primary-dark shadow-sm  sticky top-14 z-10 pb-2 ">
      <div className="container mx-auto flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto px-1 scrollbar-hide">
          {tabs.map(({ label, path }) => (
            <button
              key={label}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition whitespace-nowrap
                ${
                  activeTab === label
                    ? "bg-yellow-400 text-primary-dark"
                    : "bg-transparent border border-[#D2D6DB26] text-[#D2D6DB]"
                }`}
              onClick={() => switchtab(label, path)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Profile + Search */}
        <div className="flex items-center gap-4 w-full max-w-xl px-4">
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
    </header>
  );
};

export default TabView;
