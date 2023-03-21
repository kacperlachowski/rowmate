import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode, useMemo, useState } from 'react';

export const ThemeModeContext = createContext({ toggleColorMode: () => {} });

type Mode = 'light' | 'dark';

const isMode = (value: string): value is Mode =>
  ['light', 'dark'].includes(value);

const getDefaultMode = (): Mode => {
  const value = localStorage.getItem('mode');
  if (value && isMode(value)) {
    return value;
  }
  return 'light';
};

const setDefaultMode = (mode: Mode) => {
  localStorage.setItem('mode', mode);
};

type Props = {
  children: ReactNode;
};

const ThemeModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Mode>(getDefaultMode());

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          setDefaultMode(newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
