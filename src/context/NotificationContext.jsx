// src/context/NotificationContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const NotificationContext = createContext();

// Provide notification state to the rest of the app
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a notification
  const addNotification = (type, message) => {
    const newNotification = { id: Date.now(), type, message };
    setNotifications((prev) => [...prev, newNotification]);
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);
