import { AuthResponse } from 'api/gql/graphql';
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type AuthContextType = {
  user: AuthResponse | null;
  login: (value: AuthResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

const setPersistUser = (value: AuthResponse | null) => {
  localStorage.setItem('user', JSON.stringify(value));
};

const getPersistUser = (): AuthResponse | null => {
  const token = localStorage.getItem('user');

  if (token) {
    return JSON.parse(token) as AuthResponse;
  }

  return null;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthResponse | null>(getPersistUser());

  const login = useCallback((value: AuthResponse) => {
    setPersistUser(value);
    setUser(value);
  }, []);

  const logout = useCallback(() => {
    setPersistUser(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
