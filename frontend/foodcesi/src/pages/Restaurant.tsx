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
                <img className="w-full h-auto rounded-2xl aspect-[3/1] max-h-40 object-cover" src={restaurant.image} width="1200" height="800" alt={restaurant.name} />
                <div className="flex flex-col items-center -mt-10">
                    <img className="w-20 h-20 rounded-full border-4 border-white md:w-24 md:h-24 lg:w-28 lg:h-28" src={restaurant.avatar} width="72" height="72" alt={restaurant.name} />
                    <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">{restaurant.name}</h2>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-8 py-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
