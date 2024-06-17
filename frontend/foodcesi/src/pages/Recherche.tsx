import { useEffect, useState } from "react";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Settings2 } from "lucide-react";
import RestaurantItem from "@/components/RestaurantItem";
import CustomCard from "@/components/ui/CustomCard";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";

const orders = ["pertinence", "asc", "desc"];

export default function Recherche() {
    const [order, setOrder] = useState("pertinence");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get(`restaurants`);

                const data = response.data;
                if (data.length > 0) {
                    data.map((restaurant: Restaurant) => {
                        restaurant.image = "/restaurantImages/mcdonalds.jpg";
                        restaurant.banner = "/restaurantImages/mcdonalds.jpg";
                        restaurant.logo = "/avatars/mcdonalds.jpg";
                    });
                    setRestaurants(data);
                }
            } catch (error: any) {
                console.error(error);
                toast({ description: error.response.data.message });
            }
        };
        fetchRestaurants();
    }, []);

    return (
        <div className="flex flex-col items-start gap-4 py-4 px-4">
            <div className="w-full flex gap-4">
                <label htmlFor="search" className="grow">
                    <CustomCard className="flex items-center gap-2 px-4 py-3">
                        <Search size="20" className="text-grey" />
                        <input type="search" className="bg-transparent outline-none grow" id="search" placeholder="Rechercher un restaurant" />
                    </CustomCard>
                </label>
                <CustomCard>
                    <Button size="icon" variant="white" className="w-12 h-12 flex items-center justify-center">
                        <Settings2 />
                    </Button>
                </CustomCard>
            </div>
            <CategoriesCarousel />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-0 text-grey">
                        <span>{order}</span>
                        <ChevronDown size="16" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={order} onValueChange={(value) => setOrder(value)}>
                        {orders.map((order, index) => (
                            <DropdownMenuRadioItem key={index} value={order}>
                                {order}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {restaurants.map((restaurant, index) => (
                    <RestaurantItem key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}
