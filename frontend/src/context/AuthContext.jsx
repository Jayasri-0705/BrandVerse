import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('brandverse_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('brandverse_access_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const accessToken = localStorage.getItem('brandverse_access_token');
      if (accessToken) {
        try {
          const res = await authApi.getProfile();
          setUser(res.data);
          localStorage.setItem('brandverse_user', JSON.stringify(res.data));
        } catch (err) {
          console.error("Token verification failed", err);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    const { access, refresh, user: userData } = res.data;

    localStorage.setItem('brandverse_access_token', access);
    localStorage.setItem('brandverse_refresh_token', refresh);
    localStorage.setItem('brandverse_user', JSON.stringify(userData));

    setToken(access);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    try {
      authApi.logout();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('brandverse_access_token');
    localStorage.removeItem('brandverse_refresh_token');
    localStorage.removeItem('brandverse_user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('brandverse_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isStaff: !!user?.is_staff || !!user?.is_superuser,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
