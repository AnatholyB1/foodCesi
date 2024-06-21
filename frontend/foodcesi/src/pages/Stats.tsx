import CustomCard from "@/components/ui/CustomCard";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { useEffect, useState } from "react";

const Stats = () => {
    const { user } = useAuth();

    const [restaurantItemsCategories, setRestaurantItemsCategories] = useState<RestaurantItemsCategory[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchRestaurantItemsCategories = async () => {
            try {
                const response = await api.get(`menu_items/categories/restaurant/${user?.restaurant_id}`);

                const data = response.data;
                if (data.length > 0) {
                    setRestaurantItemsCategories(data);
                }
            } catch (error: any) {
                logError(error);
            }
        };
        fetchRestaurantItemsCategories();
    }, [user?.restaurant_id]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get(`/order/restaurant/${user?.restaurant_id}`);

                const responseOrders = response.data;
                setOrders(responseOrders);
            } catch (error: any) {
                logError(error);
            }
        };

        fetchOrders();
    }, [user?.restaurant_id]);

    const itemsCount = restaurantItemsCategories.reduce((acc, category) => acc + category.MenuItems.length, 0);
    const ordersCount = orders.length;

    return (
        <div className="flex flex-col p-4">
            <CustomCard className="flex flex-col gap-4 p-4">
                <p>{`Nombre d'articles : ${itemsCount}`}</p>
                <p>{`Nombre de commandes : ${ordersCount}`}</p>
            </CustomCard>
        </div>
    );
};

export default Stats;
