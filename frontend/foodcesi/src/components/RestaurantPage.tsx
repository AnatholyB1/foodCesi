import { Button } from "@/components/ui/button";
import CustomCard from "@/components/ui/CustomCard";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

interface RestaurantPageProps {
    restaurant: Restaurant;
    user_id?: number;
}

const RestaurantPage = ({ restaurant, user_id }: RestaurantPageProps) => {
    const [restaurantItemsCategories, setRestaurantItemsCategories] = useState<RestaurantItemsCategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRestaurantItemsCategories = async () => {
            try {
                const response = await api.get(`menu_items/categories/restaurant/${restaurant.id}`);

                const data = response.data;
                if (data.length > 0) {
                    setRestaurantItemsCategories(data);
                }
                setIsLoading(true);
            } catch (error: any) {
                logError(error);
            }
        };
        fetchRestaurantItemsCategories();
    }, [restaurant]);

    return (
        <>
            <div className="w-full flex flex-col items-center py-2 px-4">
                <img className="w-full h-auto rounded-2xl aspect-[3/1] max-h-40 object-cover" src={restaurant.banner} width="1200" height="800" alt="banière" />
                <div className="flex flex-col items-center -mt-10">
                    <img className="w-20 h-20 rounded-full border-4 border-white md:w-24 md:h-24 lg:w-28 lg:h-28" src={restaurant.logo} width="72" height="72" alt="logo" />
                    <h2 className="text-lg font-semibold md:text-xl lg:text-2xl">{restaurant.name}</h2>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-8 py-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading
                    ? "loading..."
                    : restaurantItemsCategories.map(
                          (category) =>
                              category.MenuItems.length > 0 && (
                                  <div className="flex flex-col">
                                      <h3 className="text-lg font-semibold">{category.name}</h3>
                                      <div className="flex flex-col gap-4">
                                          <div className="flex flex-col gap-2">
                                              {category.MenuItems.map((MenuItem) => (
                                                  <CustomCard className="flex items-center space-x-4 p-4">
                                                      <Skeleton className="h-12 w-12 rounded-full" />
                                                      <div className="grow space-y-2">
                                                          <Skeleton className="h-4 w-[100px]" />
                                                          <Skeleton className="h-4 w-full" />
                                                      </div>
                                                  </CustomCard>
                                              ))}
                                          </div>
                                          {user_id && (
                                              <Button className="flex items-center gap-2 font-normal">
                                                  <span>Ajouter un menu</span>
                                                  <CirclePlus size="16" />
                                              </Button>
                                          )}
                                      </div>
                                  </div>
                              )
                      )}
            </div>
        </>
    );
};

export default RestaurantPage;
