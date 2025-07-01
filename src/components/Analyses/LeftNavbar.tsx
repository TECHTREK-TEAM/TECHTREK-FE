import { useState } from 'react';

const tabItems = [
  'Overview',
  'Profile',
  'Settings',
  'Messages',
  'Notifications',
  'Security',
  'Billing',
  'Help',
];

const LeftNavbar = () => {
  const [selectedTab, setSelectedTab] = useState<string>(tabItems[0]);

  return (
    <div className="w-60 h-screen bg-gray-100 border-r border-gray-200 p-4">
      <ul className="flex flex-col gap-2">
        {tabItems.map((item) => (
          <li
            key={item}
            onClick={() => setSelectedTab(item)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all
              ${
                selectedTab === item
                  ? 'bg-blue-500 text-white font-semibold shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftNavbar;
