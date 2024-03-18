// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for authentication token
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
