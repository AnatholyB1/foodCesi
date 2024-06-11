import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Restaurant from "../Restaurant";

interface RestaurantType {
    id: number;
    name: string;
    image: string;
    avatar: string;
    items: any[];
}

interface NewRestaurantType {
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone_number: string;
    categories: string[];
}

const defaultNewRestaurant: NewRestaurantType = {
    name: "name",
    street: "street",
    city: "city",
    state: "state",
    zip_code: "zip_code",
    country: "country",
    phone_number: "phone_number",
    categories: ["1"],
};

const HomeRestaurant = () => {
    const { user } = useAuth();
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState<NewRestaurantType>(defaultNewRestaurant);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await api.get(`restaurants/user/${user?.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setRestaurant(data[0]);
                }
                setIsLoaded(true);
            } catch (error: any) {
                console.error(error);
                toast({ description: error.response.data.message });
            }
        };
        fetchRestaurant();
    }, [user?.id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await api.post(`/restaurants`, { user_id: user?.id, ...newRestaurant });
            setRestaurant(response.data);
            toast({ description: "Restaurant ajouté" });
        } catch (error: any) {
            console.log(error);
            toast({ description: error.response.data.message });
        }
    };

    return (
        <>
            {isLoaded ? (
                restaurant ? (
                    <Restaurant />
                ) : (
                    <div className="h-full flex flex-col gap-4 justify-center items-center">
                        <p>Vous n'avez pas encore de restaurant</p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Ajouter un restaurant</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form className="contents" onSubmit={handleSubmit}>
                                    <DialogHeader>
                                        <DialogTitle>Ajouter un restaurant</DialogTitle>
                                        <DialogDescription>Ajouter un nouveau restaurant.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="name">
                                                Nom
                                            </Label>
                                            <Input id="name" type="text" className="col-span-3" placeholder="Nom" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="street">
                                                Rue
                                            </Label>
                                            <Input id="street" type="text" className="col-span-3" placeholder="Rue" value={newRestaurant.street} onChange={(e) => setNewRestaurant({ ...newRestaurant, street: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="city">
                                                Ville
                                            </Label>
                                            <Input id="city" type="text" className="col-span-3" placeholder="Ville" value={newRestaurant.city} onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="state">
                                                Etat
                                            </Label>
                                            <Input id="state" type="text" className="col-span-3" placeholder="Etat" value={newRestaurant.state} onChange={(e) => setNewRestaurant({ ...newRestaurant, state: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="zip_code">
                                                Code postal
                                            </Label>
                                            <Input id="zip_code" type="text" className="col-span-3" placeholder="Code postal" value={newRestaurant.zip_code} onChange={(e) => setNewRestaurant({ ...newRestaurant, zip_code: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="country">
                                                Pays
                                            </Label>
                                            <Input id="country" type="text" className="col-span-3" placeholder="Pays" value={newRestaurant.country} onChange={(e) => setNewRestaurant({ ...newRestaurant, country: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="phone_number">
                                                Téléphone
                                            </Label>
                                            <Input id="phone_number" type="text" className="col-span-3" placeholder="Téléphone" value={newRestaurant.phone_number} onChange={(e) => setNewRestaurant({ ...newRestaurant, phone_number: e.target.value })} required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="link">Retour</Button>
                                        </DialogClose>
                                        <Button type="submit">Valider</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default HomeRestaurant;
