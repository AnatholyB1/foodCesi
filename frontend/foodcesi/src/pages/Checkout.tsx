import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bitcoin, CreditCard, Pencil } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";
import MenuItem from "@/components/ui/MenuItem";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import api from "@/helpers/api";
import { useAuth } from "@/context/AuthContext";
import { logError } from "@/helpers/utils";
import { toast } from "@/components/ui/use-toast";

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

export default function Checkout() {
    const { user } = useAuth();
    const { cart, resetCart } = useCart();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(paymentMethods[0]);

    const restaurant = cart.restaurants[0];
    const pricesSum = restaurant?.items.reduce((acc, item) => acc + Number(item.item.price) * item.quantity, 0);
    const totalDiscount = 0;
    const total = pricesSum - totalDiscount;

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await api.get(`addresses/user/${user?.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setAddresses(data);
                    setSelectedAddress(data[0]);
                }
            } catch (error: any) {
                logError(error);
            }
        };
        fetchAddresses();
    }, [user]);

    const submitOrder = async () => {
        try {
            const response = await api.post("/order", {
                restaurant_id: restaurant.restaurant.id,
                user_id: user?.id,
                address_id: selectedAddress?.id,
                items: restaurant.items.map((item) => ({
                    menu_item_id: item.item.id,
                    quantity: item.quantity,
                    price: item.item.price,
                    total_price: item.quantity * Number(item.item.price),
                })),
            });

            if (response.status === 200) {
                toast({ description: "Commande passée avec succès !" });
                resetCart();
            }
        } catch (error: any) {
            logError(error);
        }
    };

    return cart.restaurants.length > 0 ? (
        <div className="flex flex-col gap-6 w-full min-h-full p-4">
            <div className="grow flex flex-col gap-6">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold">Adresse de livraison</h2>
                        <Link to="/addresses">
                            <Button size="icon" variant="ghost">
                                <Pencil size="16" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        {addresses.map((address, index) => (
                            <div key={index} className={cn("flex flex-col px-6 py-3 bg-white rounded-md shadow-sm border-black", { "border-2": address === selectedAddress })} onClick={() => setSelectedAddress(address)}>
                                <h3 className="font-bold">{address.name}</h3>
                                <p>{`${address.street}, ${address.zip_code}, ${address.city}, ${address.country}`}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold">Récapitulatif de la commande</h2>
                        <NavLink to="/panier">
                            <Button size="icon" variant="ghost">
                                <Pencil size="16" />
                            </Button>
                        </NavLink>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Dropdown icon={restaurant.restaurant.logo} title={restaurant.restaurant.name} defaultOpen={false}>
                            <div className="contents">
                                {restaurant.items.map((item, index) => (
                                    <MenuItem key={index} restaurant={restaurant.restaurant} item={item.item} quantity={item.quantity} />
                                ))}
                            </div>
                        </Dropdown>
                        <div className="flex justify-between items-center">
                            <p>Produits</p>
                            <p>{pricesSum.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Réductions</p>
                            <p>{totalDiscount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                        </div>
                        <div className="flex justify-between items-center font-bold">
                            <p>Total</p>
                            <p>{total.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                        </div>
                    </div>
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
            <Button className="w-full text-lg font-normal" onClick={submitOrder}>
                Payer {total.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
            </Button>
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
