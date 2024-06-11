import Dropdown from "@/components/ui/Dropdown";
import FoodItem from "@/components/ui/FoodItem";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const restaurant = {
    icon: "/avatars/mcdonalds.jpg",
    title: "McDonald's",
};

const items = [
    {
        icon: "/dishes/frites.png",
        title: "Frites moyennes",
        description: "Moyenne portion de bâtonnets de pommes de terre frites.",
        price: 4.45,
        quantity: 1,
    },
    {
        icon: "/dishes/potatoes.png",
        title: "Potatoes moyennes",
        description: "Moyenne portion de quartiers de pommes avec leur peau, épices, frits.",
        price: 4.45,
        quantity: 1,
    },
];

export default function Panier() {
    return (
        <div className="flex flex-col gap-2 w-full min-h-full p-4 max-w-lg mx-auto">
            <div className="grow">
                <Dropdown icon={restaurant.icon} title={restaurant.title} defaultOpen={true}>
                    <div className="flex flex-col">
                        {items.map((item, i) => (
                            <FoodItem key={i} {...item} editable />
                        ))}
                    </div>
                </Dropdown>
            </div>
            <NavLink to="/checkout" className="w-full">
                <Button className="w-full text-lg font-normal">Passer la commande</Button>
            </NavLink>
        </div>
    );
}
