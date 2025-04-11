import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');  
    };


    const login = (user) => {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user)); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
