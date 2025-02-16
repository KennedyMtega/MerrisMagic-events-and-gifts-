
import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'customer' | 'vendor' | 'admin';

interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for testing
const DUMMY_USERS = [
  {
    id: '1',
    email: 'customer@test.com',
    password: 'customer123',
    role: 'customer' as Role,
    name: 'Test Customer'
  },
  {
    id: '2',
    email: 'vendor@test.com',
    password: 'vendor123',
    role: 'vendor' as Role,
    name: 'Test Vendor'
  },
  {
    id: '3',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin' as Role,
    name: 'Test Admin'
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('dummyUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    const foundUser = DUMMY_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('dummyUser', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dummyUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
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
