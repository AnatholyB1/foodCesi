import { useToast } from "@/components/ui/use-toast";
import api, { postData } from "@/helpers/api";
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
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    register: (email: string, password: string, username: string, type: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toast } = useToast();

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { email, password });

            if (response.status !== 200) {
                console.log(response);
            }
            setUser({ ...response.data });
            sessionStorage.setItem("user", JSON.stringify({ ...response.data }));
        } catch (error: any) {
            console.log(error);
            toast({ description: error.response.data.message });
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

    return <AuthContext.Provider value={{ user, setUser, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
