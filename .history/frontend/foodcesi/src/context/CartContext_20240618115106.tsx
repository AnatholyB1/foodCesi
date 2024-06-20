import { ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

interface CartContextType {
    cart: Cart;
    setCart: (cart: Cart) => void;
    getQuantity: (restaurant: Restaurant, item: MenuItem) => number;
    updateCart: (restaurant: Restaurant, item: MenuItem, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState<Cart>(() => {
        const storedCart = sessionStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : { user_id: user?.id, restaurants: [] };
    });

    const getQuantity = (restaurant: Restaurant, item: MenuItem) => {
        const restaurantIndex = cart.restaurants.findIndex((r) => r.restaurant.id === restaurant.id);
        if (restaurantIndex !== -1) {
            const itemIndex = cart.restaurants[restaurantIndex].items.findIndex((i) => i.item.id === item.id);
            if (itemIndex !== -1) {
                return cart.restaurants[restaurantIndex].items[itemIndex].quantity;
            }
        }
        return 0;
    };

    const updateCart = (restaurant: Restaurant, item: MenuItem, quantity: number) => {
        const newCart = { ...cart };
        const restaurantIndex = newCart.restaurants.findIndex((r) => r.restaurant.id === restaurant.id);
        if (restaurantIndex === -1) {
            newCart.restaurants.push({
                restaurant,
                items: [{ item, quantity: quantity }],
            });
        } else {
            const itemIndex = newCart.restaurants[restaurantIndex].items.findIndex((i) => i.item.id === item.id);
            if (itemIndex === -1) {
                newCart.restaurants[restaurantIndex].items.push({ item, quantity: quantity });
            } else {
                if (quantity === 0) {
                    newCart.restaurants[restaurantIndex].items.splice(itemIndex, 1);
                    if (newCart.restaurants[restaurantIndex].items.length === 0) {
                        newCart.restaurants.splice(restaurantIndex, 1);
                    }
                } else {
                    newCart.restaurants[restaurantIndex].items[itemIndex].quantity = quantity;
                }
            }
        }
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
    };

    return <CartContext.Provider value={{ cart, setCart, getQuantity, updateCart }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
