import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserRole = 'patient' | 'professional' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  title?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isPatient: boolean;
  isProfessional: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = useCallback((profile: UserProfile) => {
    setUser(profile);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
        isPatient: user?.role === 'patient',
        isProfessional: user?.role === 'professional',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
