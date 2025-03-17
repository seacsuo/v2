import React from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});
