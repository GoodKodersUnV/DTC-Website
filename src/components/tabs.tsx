"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

function Tabs({ tabs }: { tabs: { name: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <div className="max-w-2xl mx-auto mb-8 mt-5">
      <div className="bg-white shadow-md rounded-full p-1 flex justify-between items-center overflow-hidden flex-wrap">
        {tabs.map((tab) => {
          return (
            <Link
              className={`
                max-sm:text-xs text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 ease-in-out ${
                  pathname === tab.href
                    ? "bg-blue-500 text-white shadow-md transform scale-105"
                    : "text-gray-600 hover:bg-gray-200/50"
                }`}
              href={tab.href}
              key={tab.href}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
