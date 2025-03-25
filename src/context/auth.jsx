import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    setIsAuthenticated(authStatus);
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

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
