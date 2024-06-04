import { useState } from "react";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Settings2 } from "lucide-react";
import RestaurantItem from "@/components/RestaurantItem";

const orders = ["pertinence", "asc", "desc"];

interface Restaurant {
    id: number;
    name: string;
    image: string;
    categories: string[];
}

const restaurants: Restaurant[] = [
    { id: 1, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 2, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 3, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
];

export default function Recherche() {
    const [order, setOrder] = useState("pertinence");

    return (
        <div className="flex flex-col items-start gap-4 py-4 px-4">
            <div className="w-full flex gap-4">
                <label htmlFor="search" className="grow flex items-center gap-2 px-4 py-3 bg-white rounded-md shadow-sm">
                    <Search size="20" className="text-grey" />
                    <input type="search" className="bg-transparent outline-none grow" id="search" placeholder="Rechercher un restaurant" />
                </label>
                <Button size="icon" variant="white" className="shadow-sm w-12 h-12 flex items-center justify-center">
                    <Settings2 />
                </Button>
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
            <div className="grid grid-cols-2 gap-4">
                {restaurants.map((restaurant, index) => (
                    <RestaurantItem key={index} {...restaurant} />
                ))}
            </div>
        </div>
    );
}
