import { createContext, useReducer, useContext, Children } from "react";
import { ThemeReducer, defaultTheme } from "../reducer/themeReduce";

const ThemeContext = createContext();

export function ThemeSetting({ children }) {
  const [state, dispatch] = useReducer(ThemeReducer, defaultTheme);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}