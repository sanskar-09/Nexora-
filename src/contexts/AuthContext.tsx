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
  role: 'patient' | 'doctor' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phoneNumber: string) => Promise<void>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, onAuthSuccess }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Anonymous',
          email: firebaseUser.email || '',
          role: 'patient'
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
      await signInWithEmailAndPassword(auth, email, password);
      onAuthSuccess(); // Call success callback
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthSuccess(); // Call success callback
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
      onAuthSuccess(); // Call success callback
    } catch (error) {
      throw new Error('Phone login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: string }) => {
    setLoading(true);
    try {
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role as 'patient' | 'doctor' | 'admin'
      };
      setUser(mockUser);
      onAuthSuccess(); // Call success callback
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
      onAuthSuccess(); // Call success callback on logout to navigate to home
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
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
