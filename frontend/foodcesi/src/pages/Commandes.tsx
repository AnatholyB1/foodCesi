import Order from "@/components/Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
    _id: number;
    image: string;
    title: string;
    description: string;
    link: string;
}

const orders: Order[] = [
    {
        _id: 1,
        image: "/avatars/mcdonalds.jpg",
        title: "McDonald's",
        description: "livraison en cours",
        link: "/commandes/1",
    },
    {
        _id: 2,
        image: "/avatars/mcdonalds.jpg",
        title: "McDonald's",
        description: "en attente de livraison",
        link: "/commandes/1",
    },
];

const pastOrders: Order[] = [];

export default function Commandes() {
    return (
        <Tabs className="w-full p-4 flex flex-col items-center gap-4 max-w-lg mx-auto" defaultValue="progress">
            <TabsList className="grid grid-cols-2">
                <TabsTrigger value="progress">En cours</TabsTrigger>
                <TabsTrigger value="past">Passées</TabsTrigger>
            </TabsList>
            <TabsContent value="progress" className="w-full flex flex-col items-center gap-2">
                {orders.length ? orders.map((order) => <Order key={order._id} {...order} />) : <p>Aucune commande en cours</p>}
            </TabsContent>
            <TabsContent value="past" className="w-full flex flex-col items-center gap-2">
                {pastOrders.length ? pastOrders.map((order) => <Order key={order._id} {...order} />) : <p>Pas encore de commandes passées</p>}
            </TabsContent>
        </Tabs>
    );
}
