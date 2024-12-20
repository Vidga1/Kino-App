import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../api/firebase/firebaseConfig';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
