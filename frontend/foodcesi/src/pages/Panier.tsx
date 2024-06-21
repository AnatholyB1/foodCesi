import Dropdown from "@/components/ui/Dropdown";
import MenuItem from "@/components/ui/MenuItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { NavLink } from "react-router-dom";

export default function Panier() {
    const { cart } = useCart();

    return cart.restaurants.length > 0 ? (
        <div className="flex flex-col gap-2 w-full min-h-full p-4 max-w-lg mx-auto">
            <div className="grow flex flex-col">
                <div className="flex flex-col gap-4">
                    {cart.restaurants.map((restaurant, index) => (
                        <Dropdown key={index} icon={restaurant.restaurant.logo} title={restaurant.restaurant.name} defaultOpen={true}>
                            <div className="contents">
                                {restaurant.items.map((item, index) => (
                                    <MenuItem key={index} restaurant={restaurant.restaurant} item={item.item} editable />
                                ))}
                            </div>
                        </Dropdown>
                    ))}
                </div>
            </div>
            <NavLink to="/checkout" className="w-full">
                <Button className="w-full text-lg font-normal">Passer la commande</Button>
            </NavLink>
        </div>
    ) : (
        <div className="w-full min-h-full flex flex-col justify-center items-center gap-2">
            <p>Votre panier est vide.</p>
            <NavLink to="/">
                <Button>Retourner à l'accueil</Button>
            </NavLink>
        </div>
    );
}
