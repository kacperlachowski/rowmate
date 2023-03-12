import { Data } from 'api/mutation/login';
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type AuthContextType = {
  isLoggedIn: Data | null;
  login: (value: Data) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<Data | null>(null);

  const login = useCallback((value: Data) => setIsLoggedIn(value), []);

  const logout = useCallback(() => setIsLoggedIn(null), []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
