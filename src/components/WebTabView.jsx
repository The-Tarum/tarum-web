import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { getProfile } from "../services/UserService";
import { useIsMobile } from "../hooks/use-mobile";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar.jsx";

const WebTabView = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!isMobile && <WebSidebar />}
      <div className={`flex-1 ${!isMobile ? "ml-64" : ""}`}>
        {isMobile && <MobileHeader />}
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const WebSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle } = useAppContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const tabs = [
    { label: "Home", path: "home" },
    { label: "Product", path: "products" },
    { label: "Supplier", path: "supplier" },
    { label: "Request Quota", path: "quota" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.user);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getActiveTab = () => {
    const currentPath = location.pathname.split("/").pop();
    return tabs.find((tab) => tab.path === currentPath)?.label || "Home";
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary-dark shadow-lg p-4">
      {/* Profile Section */}
      <div className="mb-8">
        {loading ? (
          <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={error ? undefined : user?.profileImage}
              alt={user ? `${user.firstName} ${user.lastName}` : "User avatar"}
            />
            <AvatarFallback>
              {user?.firstName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {tabs.map(({ label, path }) => (
          <button
            key={label}
            onClick={() => {
              navigate(path);
              setTitle(label);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors
              ${
                getActiveTab() === label
                  ? "bg-yellow-400 text-primary-dark font-semibold"
                  : "text-gray-200 hover:bg-white/10"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="mt-8">
        <div className="flex items-center bg-[#005399] rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search products, stores..."
            className="bg-transparent text-white placeholder-white/60 flex-1 outline-none"
          />
          <FaSearch className="text-white text-lg ml-2" />
        </div>
      </div>
    </aside>
  );
};

const MobileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTitle } = useAppContext();
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { label: "Home", path: "home" },
    { label: "Product", path: "products" },
    { label: "Supplier", path: "supplier" },
    { label: "Request Quota", path: "quota" },
  ];

  useEffect(() => {
    const currentLabel = tabs.find(
      (tab) => tab.path === location.pathname.split("/").pop()
    )?.label || "Home";
    setActiveTab(currentLabel);
    setTitle(currentLabel);
  }, [location.pathname, setTitle]);

  return (
    <header className="bg-primary-dark shadow-sm sticky top-0 z-10 pb-2">
      <div className="container mx-auto flex flex-col gap-4">
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
              onClick={() => {
                navigate(path);
                setActiveTab(label);
                setTitle(label);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};



export default WebTabView;