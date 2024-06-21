import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import RestaurantItem from "@/components/RestaurantItem";
import CustomCard from "@/components/ui/CustomCard";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";

const orders = ["pertinence", "asc", "desc"];

export default function Recherche() {
    const navigate = useNavigate();
    const location = useLocation();

    const [order, setOrder] = useState("pertinence");
    const [name, setName] = useState("");
    const [categories, setCategories] = useState<number[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    // Mettre à jour l'URL le nom ou la catégorie change
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("filter", JSON.stringify({ name, categories }));
        navigate(`/recherche?${searchParams.toString()}`);
    }, [order, name, categories, navigate, location.search]);

    // Charger les restaurants lorsque l'URL change
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get(`/restaurants`);
                setRestaurants(response.data);
            } catch (error: any) {
                console.error(error);
                toast({ description: error.response.data.message });
            }
        };
        fetchRestaurants();
    }, []);

    const filteredRestaurants = restaurants.filter((restaurant) => {
        if (name && !restaurant.name.toLowerCase().includes(name.toLowerCase())) return false;
        if (categories.length > 0 && !categories.some((category) => restaurant.categories.map((c) => c.id!).includes(category))) return false;
        return true;
    });

    return (
        <div className="flex flex-col items-start gap-4 py-4 px-4">
            <div className="w-full flex gap-4">
                <label htmlFor="search" className="grow">
                    <CustomCard className="flex items-center gap-2 px-4 py-3">
                        <Search size="20" className="text-grey" />
                        <input type="search" id="search" className="bg-transparent outline-none grow" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rechercher un restaurant" />
                    </CustomCard>
                </label>
                {/* <CustomCard>
                    <Button size="icon" variant="white" className="w-12 h-12 flex items-center justify-center">
                        <Settings2 />
                    </Button>
                </CustomCard> */}
            </div>
            <CategoriesCarousel onChange={setCategories} />
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
                {filteredRestaurants.map((restaurant, index) => (
                    <RestaurantItem key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}
