import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserData } from '../services/firestoreService';
import { clearUserSession, getUserEmail, getUserId, getUserToken, saveUserSession, setProfileCompleted } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  isLoading: boolean;
  hasCompletedProfile: boolean;
  login: (token: string, userId: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  completeProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const [token, id, email] = await Promise.all([
        getUserToken(),
        getUserId(),
        getUserEmail()
      ]);
      
      if (token && id && email) {
        setIsAuthenticated(true);
        setUserId(id);
        setUserEmail(email);
        
        // Cek data di Firestore untuk verifikasi profile completion
        try {
          const userData = await getUserData(id);
          if (userData && userData.name && userData.nim) {
            await setProfileCompleted(true);
            setHasCompletedProfile(true);
          } else {
            setHasCompletedProfile(false);
          }
        } catch (error) {
          console.log('Data belum ada di Firestore');
          setHasCompletedProfile(false);
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setUserEmail(null);
        setHasCompletedProfile(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUserId(null);
      setUserEmail(null);
      setHasCompletedProfile(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, uid: string, email: string): Promise<void> => {
    try {
      await saveUserSession(token, uid, email);
      setIsAuthenticated(true);
      setUserId(uid);
      setUserEmail(email);
      
      // Cek apakah user sudah punya data di Firestore
      try {
        const userData = await getUserData(uid);
        if (userData && userData.name && userData.nim) {
          // Jika data sudah ada, tandai profile sudah lengkap
          await setProfileCompleted(true);
          setHasCompletedProfile(true);
        } else {
          // Jika belum ada data, user harus isi form
          setHasCompletedProfile(false);
        }
      } catch (error) {
        console.log('Data belum ada di Firestore, perlu isi form');
        setHasCompletedProfile(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await clearUserSession();
      setIsAuthenticated(false);
      setUserId(null);
      setUserEmail(null);
      setHasCompletedProfile(false);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const completeProfile = async (): Promise<void> => {
    try {
      await setProfileCompleted(true);
      setHasCompletedProfile(true);
    } catch (error) {
      console.error('Error completing profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userEmail, isLoading, hasCompletedProfile, login, logout, completeProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};