import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RestaurantsList from "@/components/RestaurantsList";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";

const addresses = [
    { id: 1, name: "Maison" },
    { id: 2, name: "Travail" },
];

export default function HomeUser() {
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
    const [bestRestaurants, setBestRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await api.get(`restaurants`);

                const data = response.data;
                if (data.length > 0) {
                    setBestRestaurants(data);
                }
            } catch (error: any) {
                console.error(error);
                toast({ description: error.response.data.message });
            }
        };
        fetchRestaurants();
    }, []);

    return (
        <div className="flex flex-col items-center gap-4 py-4 px-4">
            <h1 className="text-xl font-bold px-4 lg:text-3xl md:text-2xl lg:py-8 md-py-4">
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
            <RestaurantsList title="Les meilleurs restaurants" link="/recherche" restaurants={bestRestaurants} />
            <RestaurantsList title="Les meilleurs restaurants" link="/recherche" restaurants={bestRestaurants} />
        </div>
    );
}
