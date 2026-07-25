import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (adminData: Admin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setAdmin(data);
      } catch (error) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = (adminData: Admin) => {
    setAdmin(adminData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setAdmin(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
