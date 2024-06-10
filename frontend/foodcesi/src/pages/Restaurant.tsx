import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/CustomCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { CirclePlus } from "lucide-react";

export default function Restaurant() {
    const { user } = useAuth();
    const restaurant = { id: 1, name: "McDonald's", image: "/restaurantImages/mcdonalds.jpg", avatar: "/avatars/mcdonalds.jpg", items: [] };

    const isOwner = user?.type === "restaurant";

    return (
        <>
            <div className="flex flex-col items-center py-2 px-4">
                <img className="w-full h-auto rounded-2xl aspect-[3/1] object-cover" src={restaurant.image} width="400" height="400" alt={restaurant.name} />
                <div className="flex flex-col items-center -mt-10">
                    <img className="rounded-full border-4 border-white" src={restaurant.avatar} width="72" height="72" alt={restaurant.name} />
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                </div>
            </div>
            <div className="flex flex-col gap-8 py-4 px-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Menus</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <CustomCard className="flex items-center space-x-4 p-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="grow space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </CustomCard>
                        </div>
                        {isOwner && (
                            <Button className="flex items-center gap-2 font-normal">
                                <span>Ajouter un menu</span>
                                <CirclePlus size="16" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
