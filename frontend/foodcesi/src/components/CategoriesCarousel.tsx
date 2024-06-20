import { useEffect, useState } from "react";
import CustomCard from "./ui/CustomCard";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";

export default function CategoriesCarousel() {
    const [categories, setCategories] = useState<RestaurantCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get(`/restaurant_categories`);

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

    return (
        <Carousel className="w-full">
            <CarouselContent>
                {categories.map((category) => (
                    <CarouselItem key={category.id} className="basis-1/5 md:basis-1/6">
                        <CustomCard className="flex flex-col items-center gap-1 rounded-2xl p-4">
                            <img src={`/categoryIcons/${category.name}.svg`} alt={category.name} />
                            <p className="text-xs text-nowrap">{category.name}</p>
                        </CustomCard>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
