import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { useEffect, useState } from "react";
import Commandes from "../Commandes";
import Loading from "@/components/ui/Loading";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomeDelivery = () => {
    const { user } = useAuth();
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [city, setCity] = useState<string>("");

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await api.get(`/delivery/user/${user?.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setDelivery(data[0]);
                }
                setIsLoaded(true);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchRestaurant();
    }, [user?.id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await api.post(`/delivery`, { user_id: user?.id, city: city, available: true });
            setDelivery(response.data);
            toast({ description: "Livreur ajouté" });
        } catch (error: any) {
            logError(error);
        }
    };

    return (
        <>
            {isLoaded ? (
                delivery ? (
                    <Commandes />
                ) : (
                    <Dialog open>
                        <DialogContent className="sm:max-w-[425px]">
                            <form className="contents" onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Choisissez une ville</DialogTitle>
                                    <DialogDescription>Vous devez choisir la ville dans laquelle vous allez effectuer les livraisons.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right" htmlFor="city">
                                            Ville
                                        </Label>
                                        <Input id="city" type="text" className="col-span-3" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Valider</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )
            ) : (
                <Loading />
            )}
        </>
    );
};

export default HomeDelivery;
