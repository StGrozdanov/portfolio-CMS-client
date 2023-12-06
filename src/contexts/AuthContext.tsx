import { createContext, useState } from "react";
import { ContainerProps } from "./types";
import { LoginResponse } from '../services/interfaces/portfolio-service-interfaces';

interface AuthContextType {
    isAuthenticated: boolean,
    token: string,
    userLogin: (loginData: LoginResponse) => void,
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: '',
    userLogin: (_loginData: LoginResponse) => console.info('nothing here yet.')
});

export const AuthProvider = ({ children }: ContainerProps) => {
    const [authData, setAuthData] = useState({ isAuthenticated: false, token: '' });

    const userLogin = (loginData: LoginResponse) => {
        setAuthData({ isAuthenticated: true, token: loginData.token ? loginData.token : '' })
    };

    return (
        <AuthContext.Provider value={{ userLogin, isAuthenticated: authData.isAuthenticated, token: authData.token }}>
            {children}
        </AuthContext.Provider>
    );
}