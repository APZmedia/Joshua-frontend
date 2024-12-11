import React, { useState } from 'react';

const DropdownNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {/* Notification Icon */}
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405M4.635 4.635L5 17h5m10 0v2a3 3 0 01-6 0v-2M5 8h14m-1-5H6m1 5v10m0-10V5m0 0L5 8"
          />
        </svg>
        {/* Add notification counter badge if needed */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-boxdark border border-gray-200 dark:border-strokedark shadow-lg">
          {/* Notifications content */}
          <ul>
            <li className="p-2">No new notifications</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
