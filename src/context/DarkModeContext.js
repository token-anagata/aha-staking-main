import { useWeb3ModalTheme } from '@web3modal/wagmi/react';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DarkModeContext = createContext();

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, {
    darkMode: getInitialMode(),
  });

  //web3modal theme
  const { setThemeMode } = useWeb3ModalTheme()

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(state.darkMode ? 'light' : 'dark');
    root.classList.add(state.darkMode ? 'dark' : 'light');

    // set web3 modal theme
    setThemeMode(state.darkMode ? 'dark' : 'light')
    
    localStorage.setItem('dark', JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  function getInitialMode() {
    const isReturningUser = 'dark' in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = getPrefColorScheme();

    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
