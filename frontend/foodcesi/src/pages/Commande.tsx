import { useParams } from "react-router-dom";
import Dropdown from "@/components/ui/Dropdown";
import MenuItem from "@/components/ui/MenuItem";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { logError } from "@/helpers/utils";
import api from "@/helpers/api";
import Loading from "@/components/ui/Loading";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ws from "@/helpers/websocket";

const statuses: OrderStatus[] = [
    { key: "pending", text: "En attente de validation restaurateur" },
    { key: "validated", text: "En préparation" },
    { key: "pending delivery", text: "En attente de livreur" },
    { key: "delivery", text: "En cours de livraison" },
    { key: "delivered", text: "Livré" },
    { key: "completed", text: "Terminé" },
    { key: "cancelled", text: "Annulé" },
    { key: "revoke", text: "Révoqué" },
];
const userStatusKeys = ["pending", "validated", "delivery", "delivered", "completed", "cancelled", "revoke"];
const restaurantStatusKeys = ["pending", "validated", "pending delivery", "completed", "cancelled", "revoke"];
const deliveryStatusKeys = ["pending delivery", "delivery", "delivered", "completed", "cancelled", "revoke"];

function getStatusKeys(userType: string) {
    switch (userType) {
        case "user":
            return userStatusKeys;
        case "restaurant":
            return restaurantStatusKeys;
        case "delivery":
            return deliveryStatusKeys;
        default:
            return [];
    }
}

export default function Commande() {
    const { user } = useAuth();
    const { id } = useParams();

    const [order, setOrder] = useState<Order | null>(null);
    const [statusIndex, setStatusIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/order/${id}`);

                if (response.status !== 200) {
                    throw new Error("Error while fetching order");
                }

                const order = response.data;
                const orderStatusIndex = statuses.findIndex((status) => status.key === order.status);
                setOrder(order);
                setStatusIndex(orderStatusIndex);
                setIsLoading(false);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchOrder();
    }, [id]);

    const statusKeys = getStatusKeys(user?.type || "");
    const displayedStatuses = statuses.filter((status) => {
        if (status.key === "cancelled" || status.key === "revoke") {
            return status.key === order?.status;
        }
        return statusKeys.includes(status.key);
    });

    const acceptOrder = async () => {
        try {
            const message = {
                type: "orderResponse",
                data: {
                    order_id: order!.id,
                    response: "ok",
                },
            };
            ws.send(JSON.stringify(message));
            setOrder((prevOrder) => ({ ...prevOrder!, status: "validated" }));
            setStatusIndex(statuses.findIndex((status) => status.key === "validated"));
        } catch (error: any) {
            logError(error);
        }
    };

    const refuseOrder = async () => {
        try {
            const message = {
                type: "orderResponse",
                data: {
                    order_id: order!.id,
                    response: "no",
                },
            };
            ws.send(JSON.stringify(message));
            setOrder((prevOrder) => ({ ...prevOrder!, status: "cancelled" }));
            setStatusIndex(statuses.findIndex((status) => status.key === "cancelled"));
        } catch (error: any) {
            logError(error);
        }
    };

    return isLoading ? (
        <Loading />
    ) : order ? (
        <div className="flex flex-col gap-4 p-4 min-h-full">
            <div className="grow flex flex-col gap-2 w-full md:flex-row">
                <div className="w-full flex flex-col gap-1">
                    <h2 className="text-lg font-bold">Récapitulatif de la commande</h2>
                    <div className="flex flex-col gap-1">
                        <Dropdown icon={order.Restaurant.logo} title={order.Restaurant.name} defaultOpen={false}>
                            <div className="contents">
                                {order.OrderItems.map((item, index) => (
                                    <MenuItem key={index} restaurant={order.Restaurant} item={item.MenuItem} quantity={1} />
                                ))}
                            </div>
                        </Dropdown>
                        <p>Total : {Number(order.total_price).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                        <p>Adresse : {`${order.Address.street} ${order.Address.zip_code} ${order.Address.city}, ${order.Address.country}`}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col p-4">
                    {displayedStatuses.map((status, index) => (
                        <div key={index} className="relative flex items-center py-2 gap-4 overflow-hidden">
                            {index > 0 && <div className={cn("absolute start-2 bottom-1/2 h-full w-[2px] -translate-x-1/2 bg-grey_light group-last:bottom-1/2", { "bg-primary": statusIndex >= index })}></div>}
                            {index < displayedStatuses.length - 1 && <div className={cn("absolute start-2 top-1/2 h-full w-[2px] -translate-x-1/2 bg-grey_light group-last:bottom-1/2", { "bg-primary": statusIndex >= index + 1 })}></div>}
                            <div className={cn("relative w-4 h-4 bg-grey_light rounded-full shrink-0", { "bg-primary": statusIndex >= index })}></div>
                            <p className={cn("text-grey font-medium", { "text-black": statusIndex >= index })}>{status.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            {user?.type === "restaurant" && order.status === "pending" && (
                <div className="flex flex-col gap-2">
                    <Button variant="secondary" onClick={refuseOrder}>
                        Refuser la commande
                    </Button>
                    <Button onClick={acceptOrder}>Accepter la commande</Button>
                </div>
            )}
        </div>
    ) : (
        <p>Problème avec la commande</p>
    );
}
