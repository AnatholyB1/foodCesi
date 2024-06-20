import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/CustomCard";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "./ui/use-toast";
import MenuItem from "./ui/MenuItem";

interface RestaurantPageProps {
    restaurant: Restaurant;
    restaurant_id?: number;
}

const defaultNewItem: NewMenuItem = { name: "", description: "", price: "", image_url: "", category_id: [], available: true };

const RestaurantPage = ({ restaurant, restaurant_id }: RestaurantPageProps) => {
    const [restaurantItemsCategories, setRestaurantItemsCategories] = useState<RestaurantItemsCategory[]>([]);
    const [categories, setCategories] = useState<RestaurantCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newItem, setNewItem] = useState<NewMenuItem>(defaultNewItem);
    const [editedItem, setEditedItem] = useState<NewMenuItem | null>(null);
    const [newItemDialogOpen, setNewItemDialogOpen] = useState(false);
    const [editItemDialogOpen, setEditItemDialogOpen] = useState(false);

    useEffect(() => {
        const fetchRestaurantItemsCategories = async () => {
            try {
                const response = await api.get(`menu_items/categories/restaurant/${restaurant.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setRestaurantItemsCategories(data);
                }
                setIsLoading(false);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchRestaurantItemsCategories();
    }, [restaurant]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get(`restaurant_categories`);

                const data = response.data;
                if (data.length > 0) {
                    setCategories(data);
                }
            } catch (error: any) {
                logError(error);
            }
        };
        fetchCategories();
    }, []);

    const startNewItem = (category: number | undefined | null) => {
        setNewItem({ ...defaultNewItem, category_id: category ? [category] : [] });
        setNewItemDialogOpen(true);
    };

    const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setNewItem({ ...newItem, image_url: response.data.file.path });
        } catch (error: any) {
            logError(error);
        }
    };

    const handleSubmitNewItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await api.post("/menu_items", { ...newItem, restaurant_id: restaurant.id });

            const data = response.data;
            if (!data) {
                toast({ description: "Echec de l'ajout de l'item" });
                return;
            }
            setRestaurantItemsCategories((prev) => {
                const newCategories = prev.map((category) => {
                    if (category.id === newItem.category_id[0]) {
                        return { ...category, MenuItems: [...category.MenuItems, { ...newItem, MenuCategory: { category_id: newItem.category_id[0] } }] };
                    }
                    return category;
                });
                return newCategories;
            });
            toast({ description: "Item ajouté avec succès" });
            setNewItemDialogOpen(false);
            setNewItem(defaultNewItem);
        } catch (error: any) {
            logError(error);
        }
    };

    const editItem = (item: MenuItem) => {
        setEditedItem({ ...item, category_id: [item.MenuCategory.category_id], available: true, restaurant_id: restaurant_id });
        setEditItemDialogOpen(true);
    };

    const handleSubmitEditItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editedItem) {
            toast({ description: "Cet item n'est pas complet." });
            return;
        }

        try {
            const response = await api.put(`menu_items/${editedItem.id}`, { ...editedItem });

            const data = response.data;
            if (!data) {
                toast({ description: "Echec de la modification de l'item" });
                return;
            }
            const newCategories = restaurantItemsCategories.map((category) => {
                const newItems = category.MenuItems.map((menuItem) => (menuItem.id === editedItem.id ? { ...editedItem, MenuCategory: { category_id: editedItem.category_id[0] } } : menuItem));
                return { ...category, MenuItems: newItems };
            });
            setRestaurantItemsCategories(newCategories);
            toast({ description: `${editedItem.name} modifié avec succès` });
            setEditItemDialogOpen(false);
            setEditedItem(null);
        } catch (error: any) {
            logError(error);
        }
    };

    const deleteItem = async (item: MenuItem) => {
        try {
            const response = await api.delete(`menu_items/${item.id}`);

            const data = response.data;
            if (!data) {
                toast({ description: "Echec de la suppression de l'item" });
                return;
            }
            setRestaurantItemsCategories((prev) => {
                const newCategories = prev.map((category) => {
                    const newItems = category.MenuItems.filter((menuItem) => menuItem.id !== item.id);
                    return { ...category, MenuItems: newItems };
                });
                return newCategories;
            });
            toast({ description: `${item.name} supprimé avec succès` });
        } catch (error: any) {
            logError(error);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col items-center py-2 px-4">
                <img className="w-full h-auto rounded-2xl aspect-[3/1] max-h-40 object-cover" src={restaurant.banner} width="1200" height="800" alt="banière" />
                <div className="flex flex-col items-center -mt-10">
                    <img className="w-20 h-20 rounded-full border-4 border-white md:w-24 md:h-24 lg:w-28 lg:h-28" src={restaurant.logo} width="72" height="72" alt="logo" />
                    <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">{restaurant.name}</h2>
                </div>
            </div>
            {restaurant_id && (
                <Button className="flex items-center gap-2 font-normal" onClick={() => startNewItem(null)}>
                    <span>Ajouter un item</span>
                    <CirclePlus size="16" />
                </Button>
            )}
            <div className="w-full grid grid-cols-1 gap-8 py-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-20" />
                        <CustomCard className="flex items-center space-x-4 p-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="grow space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </CustomCard>
                    </div>
                ) : (
                    restaurantItemsCategories.map((category, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold capitalize">{category.name}</h3>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    {category.MenuItems.map((menuItem, index) => (
                                        <CustomCard key={index}>{restaurant_id ? <MenuItem restaurant={restaurant} item={menuItem} editItem={editItem} deleteItem={deleteItem} /> : <MenuItem restaurant={restaurant} item={menuItem} editable />}</CustomCard>
                                    ))}
                                </div>
                                {restaurant_id && (
                                    <Button className="flex items-center gap-2 font-normal" onClick={() => startNewItem(category.id)}>
                                        <span>Ajouter un item {category.name}</span>
                                        <CirclePlus size="16" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Dialog open={newItemDialogOpen} onOpenChange={setNewItemDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form className="contents" onSubmit={handleSubmitNewItem}>
                        <DialogHeader>
                            <DialogTitle>Ajouter un item</DialogTitle>
                            <DialogDescription>Ajouter un nouveau item.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-grey">
                                    Catégorie
                                </Label>
                                <Select value={newItem.category_id[0]?.toString()} onValueChange={(value) => setNewItem({ ...newItem, category_id: [Number(value)] })} required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category, index) => (
                                            <SelectItem key={index} value={category.id?.toString() || ""}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="name">
                                    Nom
                                </Label>
                                <Input id="name" type="text" className="col-span-3" placeholder="Nom" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="description">
                                    Description
                                </Label>
                                <Input id="description" type="text" className="col-span-3" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="image">
                                    Image
                                </Label>
                                <Input id="image" type="file" className="col-span-2" onChange={addImage} />
                                <Label htmlFor="image">{newItem.image_url && <img className="w-16 h-16 object-contain object-center col-span-1" src={newItem.image_url} alt="Image" width="80" height="80" />}</Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="price">
                                    Prix
                                </Label>
                                <Input id="price" type="number" className="col-span-3" placeholder="Prix" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
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
            <Dialog open={editItemDialogOpen} onOpenChange={setEditItemDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form className="contents" onSubmit={handleSubmitEditItem}>
                        <DialogHeader>
                            <DialogTitle>Modifier un item</DialogTitle>
                            <DialogDescription>Mofifier un item.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-grey">
                                    Catégorie
                                </Label>
                                <Select value={editedItem?.category_id[0]?.toString()} onValueChange={(value) => editedItem && setEditedItem({ ...editedItem, category_id: [Number(value)] })} required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category, index) => (
                                            <SelectItem key={index} value={category.id?.toString() || ""}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="name">
                                    Nom
                                </Label>
                                <Input id="name" type="text" className="col-span-3" placeholder="Nom" value={editedItem?.name} onChange={(e) => editedItem && setEditedItem({ ...editedItem, name: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="description">
                                    Description
                                </Label>
                                <Input id="description" type="text" className="col-span-3" placeholder="Description" value={editedItem?.description} onChange={(e) => editedItem && setEditedItem({ ...editedItem, description: e.target.value })} required />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="image">
                                    Image
                                </Label>
                                <Input id="image" type="file" className="col-span-2" onChange={addImage} />
                                <Label htmlFor="image">{editedItem?.image_url && <img className="w-16 h-16 object-contain object-center col-span-1" src={editedItem?.image_url} alt="Image" width="80" height="80" />}</Label>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right" htmlFor="price">
                                    Prix
                                </Label>
                                <Input id="price" type="number" className="col-span-3" placeholder="Prix" value={editedItem?.price} onChange={(e) => editedItem && setEditedItem({ ...editedItem, price: e.target.value })} required />
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
        </>
    );
};

export default RestaurantPage;
