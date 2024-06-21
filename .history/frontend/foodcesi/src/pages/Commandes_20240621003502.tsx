import Order from "@/components/Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { useEffect, useState } from "react";

export default function Commandes() {
    const { user } = useAuth();
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const [pastOrders, setPastOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response;
                console.log(user);
                switch (user?.type) {
                    case "restaurant":
                        if (user?.restaurant_id === undefined) return;
                        response = await api.get(`/order/restaurant/${user?.restaurant_id}`);
                        break;
                    case "delivery":
                        response = await api.get(`/order/delivery/${user?.delivery_id}`);
                        break;
                    default:
                        response = await api.get(`/order/user/${user?.id}`);
                        break;
                }

                const orders = response.data;
                setActiveOrders(orders.filter((order: Order) => order.status !== "delivered"));
                setPastOrders(orders.filter((order: Order) => order.status === "delivered"));
            } catch (error: any) {
                logError(error);
            }
        };

        fetchOrders();
    }, [user?.delivery_id, user?.id, user?.restaurant_id, user?.type]);

    return (
        <Tabs className="w-full p-4 flex flex-col items-center gap-4 max-w-lg mx-auto" defaultValue="progress">
            <TabsList className="grid grid-cols-2">
                <TabsTrigger value="progress">En cours</TabsTrigger>
                <TabsTrigger value="past">Passées</TabsTrigger>
            </TabsList>
            <TabsContent value="progress" className="w-full flex flex-col items-center gap-2">
                {activeOrders.length ? activeOrders.map((order, index) => <Order key={index} order={order} />) : <p>Aucune commande en cours</p>}
            </TabsContent>
            <TabsContent value="past" className="w-full flex flex-col items-center gap-2">
                {pastOrders.length ? pastOrders.map((order, index) => <Order key={index} order={order} />) : <p>Pas encore de commandes passées</p>}
            </TabsContent>
        </Tabs>
    );
}
