import { postData } from "@/helpers/api";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
    id: number;
    email: string;
    username: string;
    type: string;
    refreshToken: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string, username: string, type: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email: string, password: string) => {
        try {
            const data = await postData("/auth/login", { email, password });

            setUser({ ...data });
            sessionStorage.setItem("user", JSON.stringify({ ...data }));
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
    };

    const register = async (email: string, password: string, username: string, type: string) => {
        try {
            const data = await postData("/auth/register", { email, password, username, type });
            setUser({ ...data });
            sessionStorage.setItem("user", JSON.stringify({ ...data }));
        } catch (error) {
            console.log(error);
        }
    };

    return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
