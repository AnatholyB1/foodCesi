import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RestaurantItem from "@/components/RestaurantItem";

const addresses = [
    { id: 1, name: "Maison" },
    { id: 2, name: "Travail" },
];

const bestRestaurants = [
    { id: 1, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 2, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 3, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", categories: ["Burger", "Pizza"] },
];

export default function User() {
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    return (
        <div className="flex flex-col items-center gap-4 py-4 px-4">
            <h1 className="text-xl font-bold px-4">
                Commandez de <span className="text-primary">délicieux plats</span> près de chez vous
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-0 text-grey">
                        <span>{selectedAddress.name}</span>
                        <ChevronDown size="16" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup value={selectedAddress.name} onValueChange={(value) => setSelectedAddress(addresses.find((address) => address.name === value) || selectedAddress)}>
                        {addresses.map((address, index) => (
                            <DropdownMenuRadioItem key={index} value={address.name}>
                                {address.name}
                            </DropdownMenuRadioItem>
                        ))}
                        <NavLink to="/compte" className="p-2">
                            Ajouter une adresse
                        </NavLink>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <CategoriesCarousel />
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg font-bold">Les meilleurs restaurants</h2>
                    <Link to="/recherche">
                        <Button variant="ghost" className="text-primary pe-0">
                            Voir Tout
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <Carousel className="w-full" opts={{ align: "start" }}>
                    <CarouselContent>
                        {bestRestaurants.map((restaurant) => (
                            <CarouselItem key={restaurant.id} className="basis-1/2">
                                <RestaurantItem {...restaurant} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg font-bold">Les meilleurs restaurants</h2>
                    <Link to="/recherche">
                        <Button variant="ghost" className="text-primary pe-0">
                            Voir Tout
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <Carousel className="w-full" opts={{ align: "start" }}>
                    <CarouselContent>
                        {bestRestaurants.map((restaurant) => (
                            <CarouselItem key={restaurant.id} className="basis-1/2">
                                <RestaurantItem {...restaurant} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
