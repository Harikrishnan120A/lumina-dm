import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, Action, ThemeSettings, SiteContent } from '../types';
import { INITIAL_STATE, DEFAULT_CONTENT, DEFAULT_THEME } from '../constants';

const SiteContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: INITIAL_STATE, dispatch: () => null });

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: { ...state.theme, ...action.payload } };
    case 'UPDATE_CONTENT':
      return { ...state, content: { ...state.content, ...action.payload } };
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'RESET_DEFAULTS':
      return { ...state, content: DEFAULT_CONTENT, theme: DEFAULT_THEME };
    default:
      return state;
  }
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage
  const loadState = (): AppState => {
    try {
      const saved = localStorage.getItem('lumina_site_state');
      if (saved) {
        return { ...INITIAL_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return INITIAL_STATE;
  };

  const [state, dispatch] = useReducer(reducer, loadState());

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('lumina_site_state', JSON.stringify(state));
  }, [state]);

  // Apply theme variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', state.theme.primaryColor);
    root.style.setProperty('--color-secondary', state.theme.secondaryColor);
    root.style.setProperty('--color-accent', state.theme.accentColor);
    root.style.setProperty('--font-primary', state.theme.font);
    
    if (state.theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <SiteContext.Provider value={{ state, dispatch }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
