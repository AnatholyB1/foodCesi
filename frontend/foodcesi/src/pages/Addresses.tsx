import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import Loading from "@/components/ui/Loading";
import CustomCard from "@/components/ui/CustomCard";
import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const defaultNewAddress: Address = {
    name: "",
    street: "",
    city: "",
    zip_code: "",
    state: "",
    country: "",
};

const Addresses = () => {
    const { user } = useAuth();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState<Address>(defaultNewAddress);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await api.get(`addresses/user/${user?.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setAddresses(data);
                }
                setIsLoading(false);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchAddresses();
    }, [user]);

    const startNewAdress = () => {
        setNewAddress({ ...defaultNewAddress, user_id: user?.id });
        setNewAddressModalOpen(true);
    };

    const handleNewAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post(`/addresses`, { ...newAddress });

            const data: Address = response.data;
            if (!data) {
                toast({ description: "Echec de l'ajout de l'adresse" });
                return;
            }
            setAddresses([...addresses, data]);
            setNewAddress(defaultNewAddress);
            setNewAddressModalOpen(false);
            toast({ description: "Adresse ajoutée" });
        } catch (error: any) {
            logError(error);
        }
    };

    const handleDeleteAddress = async (address: Address) => {
        try {
            const response = await api.delete(`/addresses/${address.id}`);

            const data = response.data;
            if (!data) {
                toast({ description: "Echec de la suppression de l'adresse" });
                return;
            }
            setAddresses(addresses.filter((a) => a.id !== address.id));
            toast({ description: "Adresse supprimée" });
        } catch (error: any) {
            logError(error);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex flex-col items-center gap-4 py-4">
                        {addresses.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {addresses.map((address, index) => (
                                    <CustomCard key={index} className="flex flex-col px-6 py-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold">{address.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <Button variant="link" size="icon" className="w-6 h-6" onClick={() => console.log("Edit: " + address.id)}>
                                                    <Pencil size="20" className="text-primary" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="link" size="icon" className="w-6 h-6">
                                                            <Trash2 size="20" className="text-primary" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Etes vous sûr ?</AlertDialogTitle>
                                                            <AlertDialogDescription>Cette action est définitive. Voulez vous vraiment supprimer cet item ?</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteAddress(address)}>Confirmer</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <p>{`${address.street}, ${address.zip_code}, ${address.city}, ${address.country}`}</p>
                                    </CustomCard>
                                ))}
                            </div>
                        ) : (
                            <p>Vous n'avez pas encore ajouté d'adresses.</p>
                        )}
                        <Dialog open={newAddressModalOpen} onOpenChange={setNewAddressModalOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={startNewAdress}>Ajouter une adresse</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form className="contents" onSubmit={handleNewAddressSubmit}>
                                    <DialogHeader>
                                        <DialogTitle>Ajouter une adresse</DialogTitle>
                                        <DialogDescription>Ajouter une nouvelle adresse à votre profil</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Nom de l'adresse
                                            </Label>
                                            <Input id="name" className="col-span-3" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} placeholder="Nom" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="street" className="text-right">
                                                Rue
                                            </Label>
                                            <Input id="street" className="col-span-3" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} placeholder="Rue" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="city" className="text-right">
                                                Ville
                                            </Label>
                                            <Input id="city" className="col-span-3" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} placeholder="Ville" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="zip_code" className="text-right">
                                                Code postal
                                            </Label>
                                            <Input id="zip_code" className="col-span-3" value={newAddress.zip_code} onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })} placeholder="Code postal" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="state" className="text-right">
                                                Etat
                                            </Label>
                                            <Input id="state" className="col-span-3" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} placeholder="Etat" required />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="country" className="text-right">
                                                Pays
                                            </Label>
                                            <Input id="country" className="col-span-3" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} placeholder="Pays" required />
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
                </>
            )}
        </>
    );
};

export default Addresses;
