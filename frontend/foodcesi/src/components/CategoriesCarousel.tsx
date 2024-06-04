import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface Category {
    id: number;
    name: string;
    icon: string;
}

const categories: Category[] = [
    { id: 1, name: "Burger", icon: "/categoryIcons/Burger.svg" },
    { id: 2, name: "Pizza", icon: "/categoryIcons/Pizza.svg" },
    { id: 3, name: "Frites", icon: "/categoryIcons/Frites.svg" },
    { id: 4, name: "Hot-dog", icon: "/categoryIcons/Hot-dog.svg" },
    { id: 5, name: "Pates", icon: "/categoryIcons/Pates.svg" },
    { id: 6, name: "Tacos", icon: "/categoryIcons/Tacos.svg" },
    { id: 7, name: "Sushi", icon: "/categoryIcons/Sushi.svg" },
    { id: 8, name: "Nouilles", icon: "/categoryIcons/Nouilles.svg" },
];

export default function CategoriesCarousel() {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {categories.map((category) => (
                    <CarouselItem key={category.id} className="basis-1/5">
                        <div className="flex flex-col items-center gap-1 bg-white rounded-2xl p-4 shadow-sm">
                            <img src={category.icon} alt={category.name} />
                            <p className="text-xs text-nowrap">{category.name}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
