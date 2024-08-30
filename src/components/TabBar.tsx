'use client';

import React, { useState } from "react";

function TabBar({
  topBar,
  setTab
}: {
  topBar: {
    name: string;
    value: string;
  }[];
  setTab: (value: string) => void;
}) {
  const [platform, setPlatform] = useState("all");

  const handleTabChange = (value: string) => {
    setTab(value);
    setPlatform(value);
  }

  return (
    <div className="bg-white shadow-md rounded-full p-1 flex justify-between items-center overflow-hidden flex-wrap">
      {topBar.map((item: { name: string; value: string }) => (
        <button
          key={item.name}
          onClick={() => handleTabChange(item.value)}
          className={`
                max-sm:text-xs text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 ease-in-out
                ${
                  platform === item.value
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:bg-gray-200/50"
                }
              `}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default TabBar;
