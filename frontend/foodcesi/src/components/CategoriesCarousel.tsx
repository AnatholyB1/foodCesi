import { useEffect, useState } from "react";
import CustomCard from "./ui/CustomCard";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import api from "@/helpers/api";
import { logError } from "@/helpers/utils";
import { useNavigate } from "react-router-dom";

interface CategoryCarouselProps {
    onChange?: (category: number[]) => void;
}

export default function CategoriesCarousel({ onChange }: CategoryCarouselProps) {
    const navigate = useNavigate();

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
                    <CarouselItem key={category.id} className="basis-1/5 md:basis-1/6" onClick={() => (onChange ? onChange([category.id || 0]) : navigate(`/recherche?filter=${encodeURIComponent(JSON.stringify({ categories: [category.id || 0] }))} `))}>
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
