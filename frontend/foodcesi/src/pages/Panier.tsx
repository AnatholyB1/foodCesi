import Dropdown from "@/components/ui/Dropdown";
import MenuItem from "@/components/ui/MenuItem";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const restaurant = {
    icon: "/avatars/mcdonalds.jpg",
    title: "McDonald's",
};

const items: MenuItem[] = [
    {
        name: "Frites moyennes",
        description: "Moyenne portion de bâtonnets de pommes de terre frites.",
        image_url: "/dishes/frites.png",
        price: "4.45",
        MenuCategory: {
            category_id: 1,
        },
    },
    {
        name: "Potatoes moyennes",
        description: "Moyenne portion de quartiers de pommes avec leur peau, épices, frits.",
        image_url: "/dishes/potatoes.png",
        price: "4.45",
        MenuCategory: {
            category_id: 1,
        },
    },
];

export default function Panier() {
    return (
        <div className="flex flex-col gap-2 w-full min-h-full p-4 max-w-lg mx-auto">
            <div className="grow">
                <Dropdown icon={restaurant.icon} title={restaurant.title} defaultOpen={true}>
                    <div className="flex flex-col">
                        {items.map((item, i) => (
                            <MenuItem key={i} item={item} quantity={1} editable />
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
