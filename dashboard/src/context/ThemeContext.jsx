import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();  // Kontrollera att denna är unik

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem("darkMode");
        return storedTheme ? JSON.parse(storedTheme) : false;
    });

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
