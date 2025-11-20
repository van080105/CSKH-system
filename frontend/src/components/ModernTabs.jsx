"use client"

import { useState } from "react";
import "../components-css/modern-tabs.css";

export default function ModernTabs({ tabs = [], initialKey = "", onChange }) {
  const defaultKey = initialKey || (tabs[0]?.key ?? "");
  const [activeKey, setActiveKey] = useState(defaultKey);

  const handleTabClick = (key) => {
    setActiveKey(key);
    if (onChange) onChange(key);
  };

  return (
    <div className="flex gap-4 mb-6 relative bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-full p-1 justify-center shadow-md border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      {tabs.map(({ key, label }) => {
        const isActive = activeKey === key;
        return (
          <button
            key={key}
            onClick={() => handleTabClick(key)}
            className={`
              relative px-5 py-2 rounded-full font-semibold transition-all duration-300
              ${isActive 
                ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl scale-105"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:scale-105"
              }
            `}
          >
            <span className={isActive ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 animate-gradient-x" : ""}>
              {label}
            </span>

            {isActive && (
              <>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg animate-slideX"></span>
                <span className="absolute -top-1 right-2 w-2 h-2 bg-white rounded-full shadow-md animate-bounce"></span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
