import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantPage from "@/components/RestaurantPage";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/components/ui/Loading";

export default function Restaurant() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await api.get(`restaurants/${id}`);

                const data = response.data;
                if (data) {
                    data.image = "/restaurantImages/mcdonalds.jpg";
                    data.banner = "/restaurantImages/mcdonalds.jpg";
                    data.logo = "/avatars/mcdonalds.jpg";
                    setRestaurant(data);
                    setLoading(false);
                }
            } catch (error: any) {
                console.error(error);
                toast({ description: error.response.data.message });
            }
        };
        fetchRestaurant();
    }, [id]);

    return loading ? <Loading /> : restaurant ? <RestaurantPage restaurant={restaurant} /> : <p></p>;
}
