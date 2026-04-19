import React, { useState } from 'react';

export interface TabProps {
  label: string;
  children: React.ReactNode;
}

export interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(tabs[0].props.label);

  return (
    <div className="w-full">
      <div className="border-b border-surface flex flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.props.label}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === tab.props.label
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-dim hover:text-text'
            }`}
            onClick={() => setActiveTab(tab.props.label)}
            role="tab"
            aria-selected={activeTab === tab.props.label}
            tabIndex={activeTab === tab.props.label ? 0 : -1}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((tab) => tab.props.label === activeTab)?.props.children}
      </div>
    </div>
  );
};

export default Tabs;