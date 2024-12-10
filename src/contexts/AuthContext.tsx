// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const seedAdminUser = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.some((u: User) => u.role === 'admin');
    
    if (!adminExists) {
      const adminUser: User = {
        id: crypto.randomUUID(),
        email: 'admin@clinic.com',
        name: 'Admin',
        role: 'admin'
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    seedAdminUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === email);
      console.log(password)
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      setError('Invalid credentials');
      return false;
    } catch (err) {
      setError('An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        role: 'patient'
      };
      console.log(password)
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    } catch (err) {
      setError('An error occurred during registration');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);