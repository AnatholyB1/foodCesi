// import { useParams } from "react-router-dom";

import Dropdown from "@/components/ui/Dropdown";
import MenuItem from "@/components/ui/MenuItem";
import { cn } from "@/lib/utils";

const order = {
    price: 8.9,
    address: "1 all. du Titane, 45100 Orléans",
    payment_method: "Carte bancaire",
    status: 1,
    items: [
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
    ],
};

const status = ["En attente de validation restaurateur", "En préparation", "En attente de livreur", "En cours de livraison", "Livré"];

const restaurant: Restaurant = {
    id: 1,
    name: "McDonald's",
    banner: "/restaurantImages/mcdonalds.jpg",
    logo: "/avatars/mcdonalds.jpg",
    categories: [
        {
            id: 1,
            name: "Frites",
        },
        {
            id: 2,
            name: "Burgers",
        },
        {
            id: 3,
            name: "Boissons",
        },
    ],
    items: [
        {
            id: 1,
            name: "Frites moyennes",
            description: "Moyenne portion de bâtonnets de pommes de terre frites.",
            price: "4.45",
            image_url: "/dishes/frites.png",
            MenuCategory: {
                category_id: 1,
            },
        },
        {
            id: 2,
            name: "Potatoes moyennes",
            description: "Moyenne portion de quartiers de pommes avec leur peau, épices, frits.",
            price: "4.45",
            image_url: "/dishes/potatoes.png",
            MenuCategory: {
                category_id: 1,
            },
        },
        {
            id: 3,
            name: "Big Mac",
            description: "Double steak haché, sauce spéciale, laitue, fromage, cornichons, oignons, dans un pain de sésame.",
            price: "5.90",
            image_url: "/dishes/bigmac.png",
            MenuCategory: {
                category_id: 2,
            },
        },
        {
            id: 4,
            name: "Coca-Cola",
            description: "Boisson gazeuse sucrée.",
            price: "2.00",
            image_url: "/dishes/coca-cola.png",
            MenuCategory: {
                category_id: 3,
            },
        },
    ],
};

export default function Commande() {
    // const { id } = useParams();

    return (
        <div className="w-full flex flex-col gap-2 w-full p-4 md:flex-row">
            <div className="w-full flex flex-col gap-1">
                <h2 className="text-lg font-bold">Récapitulatif de la commande</h2>
                <Dropdown icon={restaurant.logo} title={restaurant.name} defaultOpen={false}>
                    <div className="flex flex-col">
                        {order.items.map((item, index) => (
                            <MenuItem key={index} restaurant={restaurant} item={item} quantity={1} editable={false} />
                        ))}
                    </div>
                </Dropdown>
                <div className="flex flex-col gap-1 text-grey">
                    <p>Prix : {order.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                    <p>Adresse : {order.address}</p>
                    <p>Méthode de paiement : {order.payment_method}</p>
                </div>
            </div>
            <div className="w-full flex flex-col p-4">
                {status.map((statusText, i) => (
                    <div key={i} className="relative flex items-center py-4 gap-4 overflow-hidden">
                        {i > 0 && <div className={cn("absolute start-2 bottom-1/2 h-full w-[2px] -translate-x-1/2 bg-grey_light group-last:bottom-1/2", { "bg-primary": order.status >= i })}></div>}
                        {i < status.length - 1 && <div className={cn("absolute start-2 top-1/2 h-full w-[2px] -translate-x-1/2 bg-grey_light group-last:bottom-1/2", { "bg-primary": order.status >= i + 1 })}></div>}
                        <div className={cn("relative w-4 h-4 bg-grey_light rounded-full shrink-0", { "bg-primary": order.status >= i })}></div>
                        <p className={cn("text-grey font-medium", { "text-black": order.status >= i })}>{statusText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
