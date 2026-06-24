import React, { createContext, useState, useContext, useEffect } from 'react';
import '../style/UserContext.css'
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('seyshoppy_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('seyshoppy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('seyshoppy_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('seyshoppy_user');     
    localStorage.removeItem('seyshoppy_cart');    
    localStorage.removeItem('seyshoppy_wishlist'); 
    window.location.reload(); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);