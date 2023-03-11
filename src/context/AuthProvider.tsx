import { createContext, ReactNode, useCallback, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => setIsLoggedIn(true), []);

  const logout = useCallback(() => setIsLoggedIn(false), []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
