import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RestaurantPage from "@/components/RestaurantPage";
import Loading from "@/components/ui/Loading";
import { logError } from "@/helpers/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface NewRestaurantType {
    name: string;
    banner: string;
    logo: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone_number: string;
    categories: string[];
}

const defaultNewRestaurant: NewRestaurantType = {
    name: "",
    banner: "",
    logo: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
    categories: [],
};

const HomeRestaurant = () => {
    const { user } = useAuth();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [categories, setCategories] = useState<RestaurantCategory[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState<NewRestaurantType>(defaultNewRestaurant);
    const [newRestaurantCategories, setNewRestaurantCategories] = useState<string>("");

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await api.get(`/restaurants/user/${user?.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setRestaurant(data[0]);
                }
                setIsLoaded(true);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchRestaurant();
    }, [user?.id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get(`/restaurant_categories`);

                if (!response.data) {
                    throw new Error("No data");
                }

                setCategories(response.data);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRestaurantCategoriesArray = newRestaurantCategories
            .split(",")
            .map((category) => categories.find((c) => c.name === category.trim())?.id?.toString())
            .filter((item) => item !== undefined);

        try {
            const response = await api.post(`/restaurants`, { user_id: user?.id, ...newRestaurant, categories: newRestaurantCategoriesArray });
            setRestaurant(response.data);
            toast({ description: "Restaurant ajouté" });
        } catch (error: any) {
            logError(error);
        }
    };

    const handleDelete = async () => {
        console.log("delete");

        try {
            const response = await api.delete(`/restaurants/${restaurant?.id}`);
            console.log(response);

            setRestaurant(null);
            toast({ description: "Restaurant supprimé" });
        } catch (error: any) {
            logError(error);
        }
    };

    const addImage = async (e: React.ChangeEvent<HTMLInputElement>, callback: (value: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post(`/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            callback(response.data.file.path);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isLoaded ? (
                restaurant ? (
                    <div className="flex flex-col gap-2 items-center">
                        <RestaurantPage restaurant={restaurant} restaurant_id={user?.id} />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="link">Supprimer le restaurant</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Etes vous sûr ?</AlertDialogTitle>
                                    <AlertDialogDescription>Cette action est définitive. Voulez vous vraiment supprimer votre restaurant ?</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
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
                                        {newRestaurant.banner && (
                                            <div className="w-full flex flex-col items-center py-2 px-4">
                                                <Label htmlFor="banner">
                                                    <img className="w-full h-auto rounded-2xl aspect-[3/1] max-h-40 object-cover" src={newRestaurant.banner} width="1200" height="800" alt="banière" />
                                                </Label>
                                                <div className="flex flex-col items-center -mt-10">
                                                    <Label htmlFor="logo">
                                                        <img className="w-20 h-20 rounded-full border-4 bg-white border-white md:w-24 md:h-24 lg:w-28 lg:h-28" src={newRestaurant.logo} width="72" height="72" alt="logo" />
                                                    </Label>
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="name">
                                                Nom
                                            </Label>
                                            <Input id="name" type="text" className="col-span-3" placeholder="Nom" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="banner">
                                                Image de banière
                                            </Label>
                                            <Input id="banner" type="file" className="col-span-3" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addImage(e, (value) => setNewRestaurant({ ...newRestaurant, banner: value }))} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="logo">
                                                Logo
                                            </Label>
                                            <Input id="logo" type="file" className="col-span-3" onChange={(e: React.ChangeEvent<HTMLInputElement>) => addImage(e, (value) => setNewRestaurant({ ...newRestaurant, logo: value }))} />
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
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label className="text-right" htmlFor="categories">
                                                Catégories
                                            </Label>
                                            <Input id="categories" type="text" className="col-span-3" placeholder="Catégories" value={newRestaurantCategories} onChange={(e) => setNewRestaurantCategories(e.target.value)} />
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
                <Loading />
            )}
        </>
    );
};

export default HomeRestaurant;
