import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const addresses = [
    { id: 1, name: "Adresse 1" },
    { id: 2, name: "Adresse 2" },
];

const categories = [
    { id: 1, name: "Burger", icon: "Burger.svg" },
    { id: 2, name: "Pizza", icon: "Pizza.svg" },
    { id: 3, name: "Frites", icon: "Frites.svg" },
    { id: 3, name: "Hot-dog", icon: "Hot-dog.svg" },
    { id: 3, name: "Pates", icon: "Pates.svg" },
    { id: 3, name: "Tacos", icon: "Tacos.svg" },
    { id: 3, name: "Sushi", icon: "Sushi.svg" },
    { id: 3, name: "Nouilles", icon: "Nouilles.svg" },
];

const bestRestaurants = [
    { id: 1, name: "McDonald's", image: "mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 2, name: "McDonald's", image: "mcdonalds.jpg", categories: ["Burger", "Pizza"] },
    { id: 3, name: "McDonald's", image: "mcdonalds.jpg", categories: ["Burger", "Pizza"] },
];

export default function Home() {
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    const iconsPath = "/categoryIcons/";
    const restaurantImagesPath = "/restaurantImages/";

    return (
        <div className="flex flex-col items-center gap-4 py-4 px-4">
            <h1 className="text-xl font-bold px-4 py-4">
                Commandez de <span className="text-primary">délicieux plats</span> près de chez vous
            </h1>
            <Select value={selectedAddress.name} onValueChange={(value) => setSelectedAddress(addresses.find((address) => address.name === value) || selectedAddress)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {addresses.map((address) => (
                            <SelectItem key={address.id} value={address.name}>
                                {address.name}
                            </SelectItem>
                        ))}
                        <Link to="/compte">Ajouter une adresse</Link>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Carousel className="w-full py-4">
                <CarouselContent>
                    {categories.map((category) => (
                        <CarouselItem key={category.id} className="basis-1/5">
                            <div className="flex flex-col items-center bg-white rounded-2xl p-4">
                                <img src={iconsPath + category.icon} alt={category.name} />
                                <p className="text-xs text-nowrap">{category.name}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
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
                                <div className="flex flex-col bg-white rounded-lg overflow-hidden">
                                    <img src={restaurantImagesPath + restaurant.image} alt={restaurant.name} />
                                    <div className="flex flex-col gap-2 bg-white p-4 pt-1">
                                        <p className="text-lg font-semibold text-nowrap">{restaurant.name}</p>
                                        <ul className="flex flex-wrap gap-1">
                                            {restaurant.categories.map((category) => (
                                                <li key={category}>
                                                    <Badge variant="secondary">{category}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
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
                                <div className="flex flex-col bg-white rounded-lg overflow-hidden">
                                    <img src={restaurantImagesPath + restaurant.image} alt={restaurant.name} />
                                    <div className="flex flex-col gap-2 bg-white p-4 pt-1">
                                        <p className="text-lg font-semibold text-nowrap">{restaurant.name}</p>
                                        <ul className="flex flex-wrap gap-1">
                                            {restaurant.categories.map((category) => (
                                                <li key={category}>
                                                    <Badge variant="secondary">{category}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
