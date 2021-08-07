import React from 'react'

export type Mode = 'dark' | 'light';

interface ThemeContextState {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const ThemeContext = React.createContext<ThemeContextState>({
  mode: 'dark',
  setMode: () => {},
});

