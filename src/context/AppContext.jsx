import React, { createContext, useContext, useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMobileApp, setIsMobileApp] = useState(false);
  const [platform, setPlatform] = useState("web");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const plat = Capacitor.getPlatform();
    setPlatform(plat);
    setIsMobileApp(true);
  }, []);

  return (
    <AppContext.Provider value={{ isMobileApp, platform, title , setTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};