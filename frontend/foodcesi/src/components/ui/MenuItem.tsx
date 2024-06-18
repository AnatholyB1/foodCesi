import { Pencil, Trash2 } from "lucide-react";
import CustomNumberInput from "./CustomNumberInput";
import { Button } from "./button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { useCart } from "@/context/CartContext";

interface Props {
    restaurant: Restaurant;
    item: MenuItem;
    editable?: boolean;
    quantity?: number;
    editItem?: (item: MenuItem) => void;
    deleteItem?: (item: MenuItem) => void;
}

export default function MenuItem({ restaurant, item, editable, quantity, editItem, deleteItem }: Props) {
    const { getQuantity, updateCart } = useCart();

    const itemQuantity = editable ? getQuantity(restaurant, item) : quantity || 0;

    return (
        <div className="flex w-full bg-white p-4 gap-3 border-t-2 border-light rounded-lg">
            <img className="w-12 h-12 shrink-0" src={item.image_url} alt="logo" width="50" height="50" />
            <div className="flex flex-col grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-xs text-grey">{item.description}</p>
            </div>
            <div className="flex flex-col justify-between items-end gap-4 shrink-0">
                <p className="text-lg font-bold">{Number(item.price).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
                {editItem && deleteItem ? (
                    <div className="flex">
                        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => editItem(item)}>
                            <Pencil size="20" className="text-primary" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-8 h-8">
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
                                    <AlertDialogAction onClick={() => deleteItem(item)}>Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ) : (
                    <CustomNumberInput quantity={itemQuantity} quantityChange={editable ? (quantity) => updateCart(restaurant, item, quantity) : undefined} />
                )}
            </div>
        </div>
    );
}
