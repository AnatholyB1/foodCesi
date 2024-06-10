// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    refreshToken: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (email: string, password: string) => {
        console.log(email, password);

        const data = { id: 1, username: "Antoine Favereau", email: "email", role: "restaurant", refreshToken: "refreshToken" };

        setUser({ ...data });
        localStorage.setItem("user", JSON.stringify({ ...data }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
