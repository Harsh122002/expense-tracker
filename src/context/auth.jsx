import React, { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

const storedAuth = localStorage.getItem('isAuthenticated') === 'true' || false;
    const storedUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// Auth Provider
export const AuthProvider = ({ children }) => {
  // Initialize state without conflict
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth);
  const [currentUser, setCurrentUser] = useState(storedUser);

  // Load from localStorage on first mount
  useEffect(() => {
    

    if (storedAuth && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(storedUser);
    }
  }, []);

  // Login or Register user
  const login = (formData) => {
    const { username, password } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      setIsAuthenticated(true);
      setCurrentUser(userExists);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(userExists));
      alert('Login Successful');
      return userExists;
    } else {
      const newUser = { ...formData, date: new Date().toISOString() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setIsAuthenticated(true);
      setCurrentUser(newUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      alert('User registered and logged in successfully!');
      return newUser;
    }
  };

  // Logout user
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    alert('Logout Successful');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
