// UserContext.js

import React, { createContext, useContext, useState , useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // Retrieve userId from localStorage on initial render
    return localStorage.getItem('userId') || '';
  });
  useEffect(() => {
    // Save userId to localStorage whenever it changes
    localStorage.setItem('userId', userId);
  }, [userId]);


  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
