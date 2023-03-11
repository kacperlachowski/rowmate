import { createContext, ReactNode, useCallback, useState } from "react";
import { AuthResponse } from "../api/gql/graphql";

export type AuthContextType = {
  isLoggedIn: AuthResponse | null;
  login: (value: AuthResponse) => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState<AuthResponse | null>(null);

  const login = useCallback((value: AuthResponse) => setIsLoggedIn(value), []);

  const logout = useCallback(() => setIsLoggedIn(null), []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
