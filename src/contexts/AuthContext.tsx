import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin' | 'guest';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
  loginAsGuest: (name: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  onAuthSuccess: () => void; // Callback for successful auth
}

// Mock user database for demonstration
const mockUsers: { [email: string]: { name: string; role: 'patient' | 'doctor' | 'admin' } } = {
  'john@example.com': { name: 'John Doe', role: 'patient' },
  'sarah@doctor.com': { name: 'Dr. Sarah Johnson', role: 'doctor' },
  'admin@nexora.com': { name: 'Admin User', role: 'admin' },
  'michael@example.com': { name: 'Michael Chen', role: 'patient' },
  'emily@doctor.com': { name: 'Dr. Emily Rodriguez', role: 'doctor' },
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onAuthSuccess }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in our mock database
        const userData = mockUsers[firebaseUser.email || ''];
        
        const appUser: User = {
          id: firebaseUser.uid,
          name: userData?.name || firebaseUser.displayName || 'Anonymous User',
          email: firebaseUser.email || '',
          role: userData?.role || 'patient'
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // For demo purposes, we'll use mock authentication
      const userData = mockUsers[email];
      if (userData) {
        const mockUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: email,
          role: userData.role
        };
        setUser(mockUser);
        onAuthSuccess();
      } else {
        // Try Firebase auth as fallback
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      }
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Check if user exists in our mock database
      const userData = mockUsers[firebaseUser.email || ''];
      
      const appUser: User = {
        id: firebaseUser.uid,
        name: userData?.name || firebaseUser.displayName || 'Google User',
        email: firebaseUser.email || '',
        role: userData?.role || 'patient'
      };
      setUser(appUser);
      onAuthSuccess();
    } catch (error) {
      throw new Error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhone = async (phoneNumber: string) => {
    setLoading(true);
    try {
      // Note: This is a simplified version. In a real app, you'd need to handle the verification code
      await signInWithPhoneNumber(auth, phoneNumber);
      onAuthSuccess();
    } catch (error) {
      throw new Error('Phone login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async (name: string) => {
    setLoading(true);
    try {
      const guestUser: User = {
        id: `guest_${Date.now()}`,
        name: name,
        email: '',
        role: 'guest'
      };
      setUser(guestUser);
      onAuthSuccess();
    } catch (error) {
      throw new Error('Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: string }) => {
    setLoading(true);
    try {
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role as 'patient' | 'doctor' | 'admin'
      };
      
      // Add to mock database
      mockUsers[userData.email] = { name: userData.name, role: userData.role as 'patient' | 'doctor' | 'admin' };
      
      setUser(mockUser);
      onAuthSuccess();
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      onAuthSuccess();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    loginWithGoogle,
    loginWithPhone,
    loginAsGuest,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
