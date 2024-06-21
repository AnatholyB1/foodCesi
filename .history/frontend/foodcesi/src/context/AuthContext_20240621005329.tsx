import { toast } from "@/components/ui/use-toast";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<true | undefined>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    username: string,
    sponsor_code: string,
    type: string
  ) => Promise<true | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.status !== 200) {
        console.log(response);
        toast({ description: "Echec de la connexion" });
        return;
      }

      let data: User = response.data;

      if (data.type === "restaurant") {
        const restaurantResponse = await api.get(
          `/restaurants/user/${response.data.id}`
        );

        if (restaurantResponse.status !== 200) {
          console.log(response);
          toast({ description: "Echec de la récupération du restaurant" });
          return;
        }
        const restaurant: Restaurant[] = restaurantResponse.data;

        if (restaurant.length === 0) {
          return;
        }

        data = { ...data, restaurant_id: restaurant[0].id };
      }

      if (data.type === "delivery") {
        const deliveryResponse = await api.get(
          `/delivery/user/${response.data.id}`
        );

        if (deliveryResponse.status !== 200) {
          console.log(response);
          toast({ description: "Echec de la récupération du livreur" });
          return;
        }
        const deliveries: Delivery[] = deliveryResponse.data;

        if (deliveries.length === 0) {
          return;
        }

        data = { ...data, delivery_id: deliveries[0].id };
      }
      setUser({ ...data });
      sessionStorage.setItem("user", JSON.stringify({ ...data }));
      return true;
    } catch (error: any) {
      logError(error);
      return;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    sponsor_code: string,
    type: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        username,
        sponsor_code,
        type,
      });

      let data: User = response.data;

      if (data.type === "restaurant") {
        const restaurantResponse = await api.get(
          `/restaurants/user/${response.data.id}`
        );

        if (restaurantResponse.status !== 200) {
          console.log(response);
          toast({ description: "Echec de la récupération du restaurant" });
          return;
        }
        const restaurant: Restaurant[] = restaurantResponse.data;

        if (restaurant.length === 0) {
          return;
        }

        data = { ...data, restaurant_id: restaurant[0].id };
      }

      if (data.type === "delivery") {
        const deliveryResponse = await api.get(
          `/delivery/user/${response.data.id}`
        );

        if (deliveryResponse.status !== 200) {
          console.log(response);
          toast({ description: "Echec de la récupération du livreur" });
          return;
        }
        const deliveries: Delivery[] = deliveryResponse.data;

        if (deliveries.length === 0) {
          return;
        }

        data = { ...data, delivery_id: deliveries[0].id };
      }
      setUser({ ...data });
      sessionStorage.setItem("user", JSON.stringify({ ...data }));
      return true;
    } catch (error) {
      logError(error);
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
