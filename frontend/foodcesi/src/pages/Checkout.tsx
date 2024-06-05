import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bitcoin, CreditCard, Pencil } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import FoodItem from "@/components/ui/FoodItem";
import { NavLink } from "react-router-dom";

interface Address {
    name: string;
    address: string;
}

const addresses: Address[] = [
    {
        name: "Maison",
        address: "1 rue de la Maison 45000 Orléans",
    },
    {
        name: "CESI",
        address: "1 all. du Titane 45100 Orléans",
    },
];

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

interface PaymentMethod {
    icon: JSX.Element;
    title: string;
}

const paymentMethods: PaymentMethod[] = [
    {
        icon: <CreditCard />,
        title: "Carte bancaire",
    },
    {
        icon: <Bitcoin />,
        title: "Bitcoin",
    },
];

const order = {
    price: 8.9,
    address: "1 all. du Titane, 45100 Orléans",
    payment_method: "Carte bancaire",
    status: 1,
    items: [
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
    ],
};

export default function Checkout() {
    const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(paymentMethods[0]);

    return (
        <div className="flex flex-col gap-6 w-full min-h-full p-4">
            <div className="grow">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold">Adresse de livraison</h2>
                        <Button size="icon" variant="ghost">
                            <Pencil size="16" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {addresses.map((address, index) => (
                            <div key={index} className={cn("flex flex-col px-6 py-3 bg-white rounded-md shadow-sm border-black", { "border-2": address === selectedAddress })} onClick={() => setSelectedAddress(address)}>
                                <h3 className="font-bold">{address.name}</h3>
                                <p>{address.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold">Récapitulatif de la commande</h2>
                        <Button size="icon" variant="ghost">
                            <Pencil size="16" />
                        </Button>
                    </div>
                    <Dropdown icon={restaurant.icon} title={restaurant.title} defaultOpen={false}>
                        <div className="flex flex-col">
                            {items.map((item, i) => (
                                <FoodItem key={i} {...item} editable />
                            ))}
                        </div>
                    </Dropdown>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold">Méthode de paiement</h2>
                        <Button size="icon" variant="ghost">
                            <Pencil size="16" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {paymentMethods.map((paymentMethod, index) => (
                            <div key={index} className={cn("flex flex gap-4 px-6 py-4 bg-white rounded-md shadow-sm border-black", { "border-2": paymentMethod === selectedPaymentMethod })} onClick={() => setSelectedPaymentMethod(paymentMethod)}>
                                {paymentMethod.icon}
                                <h3 className="font-semibold">{paymentMethod.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <NavLink to="/checkout" className="w-full">
                <Button className="w-full text-lg font-normal">Payer {order.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</Button>
            </NavLink>
        </div>
    );
}
