import React, { useState } from 'react';

export interface TabsProps {
  tabs: { label: string; value: string }[];
  children: React.ReactNode[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = ({ tabs, children, defaultValue, onValueChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-[#e9e5dd]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`py-2 px-4 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.value
                ? 'text-[#e66000] border-b-2 border-[#e66000]'
                : 'text-[#4a4a4a] hover:text-[#1a2e1a]'
            }`}
            onClick={() => handleTabClick(tab.value)}
            role="tab"
            aria-selected={activeTab === tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children[tabs.findIndex((t) => t.value === activeTab)]}
      </div>
    </div>
  );
};